package controllers

import (
	"yoyo-server/internal/services"
	"yoyo-server/internal/utils"

	"github.com/gin-gonic/gin"
)

type AdminSEOController struct {
	services *services.Services
}

func NewAdminSEOController(s *services.Services) *AdminSEOController {
	return &AdminSEOController{services: s}
}

func (ctl *AdminSEOController) List(c *gin.Context) {
	pages, err := ctl.services.SEO.ListAdmin(c.Request.Context())
	if err != nil {
		utils.InternalError(c, "Failed to fetch SEO pages.", err.Error())
		return
	}
	utils.OK(c, "SEO pages fetched.", pages)
}

func (ctl *AdminSEOController) Save(c *gin.Context) {
	var input services.SEOInput
	if err := c.ShouldBindJSON(&input); err != nil {
		utils.BadRequest(c, "Invalid SEO data.", err.Error())
		return
	}
	page, err := ctl.services.SEO.Save(c.Request.Context(), input, *currentAdminID(c), c.ClientIP())
	if err != nil {
		utils.InternalError(c, "Failed to save SEO data.", err.Error())
		return
	}
	utils.OK(c, "SEO data saved.", page)
}
