package routes

import (
	"net/http"
	"time"

	"yoyo-server/internal/config"
	"yoyo-server/internal/controllers"
	"yoyo-server/internal/middleware"
	"yoyo-server/internal/models"
	"yoyo-server/internal/repositories"
	"yoyo-server/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(router *gin.Engine, cfg *config.Config, db *gorm.DB, repos *repositories.Repositories, svc *services.Services) {
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.SecurityHeaders())
	router.Use(middleware.BodyLimit(cfg.RequestBodyLimitBytes))
	router.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.CORSAllowedOrigins,
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPatch, http.MethodDelete, http.MethodOptions},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Razorpay-Signature"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.Use(middleware.RateLimit(cfg.RateLimitPerMinute, time.Minute))
	router.Static("/uploads", cfg.UploadDir)

	authCtl := controllers.NewAuthController(svc.Auth, svc.Audit)
	publicCtl := controllers.NewPublicController(svc.Tickets, svc.Bookings, svc.Contacts, svc.Settings)
	adminCtl := controllers.NewAdminController(svc)
	webhookCtl := controllers.NewWebhookController(svc.Razorpay, svc.Bookings)

	api := router.Group("/api")
	api.GET("/health", func(c *gin.Context) {
		sqlDB, err := db.DB()
		if err != nil || sqlDB.PingContext(c.Request.Context()) != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"success": false, "message": "database unavailable"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"success": true, "message": "YOYO API healthy"})
	})

	api.GET("/tickets", publicCtl.Tickets)
	api.GET("/tickets/:slug", publicCtl.TicketBySlug)
	api.POST("/contact", middleware.RateLimit(cfg.ContactRateLimitPerHour, time.Hour), publicCtl.Contact)
	api.GET("/settings/public", publicCtl.PublicSettings)
	api.POST("/bookings/create-order", middleware.RateLimit(cfg.PaymentRateLimitPerHour, time.Hour), publicCtl.CreateOrder)
	api.POST("/bookings/verify-payment", middleware.RateLimit(cfg.PaymentRateLimitPerHour, time.Hour), publicCtl.VerifyPayment)
	api.POST("/webhooks/razorpay", webhookCtl.Razorpay)

	adminAuth := api.Group("/admin/auth")
	adminAuth.POST("/login", middleware.RateLimit(cfg.LoginRateLimitPerHour, time.Hour), authCtl.Login)

	admin := api.Group("/admin")
	admin.Use(middleware.AdminAuth(cfg, repos.AdminUsers))
	adminAuthProtected := admin.Group("/auth")
	adminAuthProtected.GET("/me", authCtl.Me)
	adminAuthProtected.POST("/logout", authCtl.Logout)

	admin.GET("/dashboard/stats", adminCtl.DashboardStats)

	admin.GET("/tickets", adminCtl.ListTickets)
	admin.POST("/tickets", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.CreateTicket)
	admin.GET("/tickets/:id", adminCtl.GetTicket)
	admin.PATCH("/tickets/:id", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.UpdateTicket)
	admin.DELETE("/tickets/:id", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.DeleteTicket)
	admin.PATCH("/tickets/:id/toggle-status", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin, models.RoleModerator), adminCtl.ToggleTicketStatus)

	admin.GET("/bookings", adminCtl.ListBookings)
	admin.GET("/bookings/:id", adminCtl.GetBooking)
	admin.PATCH("/bookings/:id/status", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin, models.RoleModerator), adminCtl.UpdateBookingStatus)

	admin.GET("/messages", adminCtl.ListMessages)
	admin.GET("/messages/:id", adminCtl.GetMessage)
	admin.PATCH("/messages/:id/status", adminCtl.UpdateMessageStatus)
	admin.DELETE("/messages/:id", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin, models.RoleModerator), adminCtl.DeleteMessage)

	admin.GET("/settings", adminCtl.GetSettings)
	admin.PATCH("/settings", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.UpdateSettings)

	admin.GET("/users", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.ListUsers)
	admin.POST("/users", middleware.RequireRoles(models.RoleSuperAdmin), adminCtl.CreateUser)
	admin.PATCH("/users/:id", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.UpdateUser)
	admin.DELETE("/users/:id", middleware.RequireRoles(models.RoleSuperAdmin), adminCtl.DeleteUser)

	admin.GET("/audit-logs", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.ListAuditLogs)
	admin.POST("/uploads", middleware.RequireRoles(models.RoleSuperAdmin, models.RoleAdmin), adminCtl.Upload)
}
