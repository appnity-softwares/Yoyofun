package services

import (
	"yoyo-server/internal/config"
	"yoyo-server/internal/repositories"

	"gorm.io/gorm"
)

type Services struct {
	Auth      *AuthService
	Tickets   *TicketService
	Bookings  *BookingService
	Contacts  *ContactService
	Settings  *SettingsService
	Dashboard *DashboardService
	Users     *AdminUserService
	Audit     *AuditService
	Razorpay  *RazorpayService
	Uploads   *UploadService
}

func New(cfg *config.Config, db *gorm.DB, repos *repositories.Repositories) *Services {
	audit := NewAuditService(repos.AuditLogs)
	razorpay := NewRazorpayService(cfg)
	return &Services{
		Auth:      NewAuthService(cfg, repos.AdminUsers),
		Tickets:   NewTicketService(repos.Tickets, audit),
		Bookings:  NewBookingService(db, repos.Tickets, repos.Bookings, razorpay, audit),
		Contacts:  NewContactService(repos.Messages, audit),
		Settings:  NewSettingsService(repos.Settings, audit),
		Dashboard: NewDashboardService(repos.Tickets, repos.Bookings, repos.Messages),
		Users:     NewAdminUserService(cfg, repos.AdminUsers, audit),
		Audit:     audit,
		Razorpay:  razorpay,
		Uploads:   NewUploadService(cfg),
	}
}
