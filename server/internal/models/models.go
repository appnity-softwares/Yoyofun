package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type AdminRole string

const (
	RoleSuperAdmin AdminRole = "super_admin"
	RoleAdmin      AdminRole = "admin"
	RoleModerator  AdminRole = "moderator"
	RoleStaff      AdminRole = "staff"
)

type PaymentStatus string

const (
	PaymentPending  PaymentStatus = "pending"
	PaymentPaid     PaymentStatus = "paid"
	PaymentFailed   PaymentStatus = "failed"
	PaymentRefunded PaymentStatus = "refunded"
)

type BookingStatus string

const (
	BookingPending   BookingStatus = "pending"
	BookingConfirmed BookingStatus = "confirmed"
	BookingCancelled BookingStatus = "cancelled"
	BookingRefunded  BookingStatus = "refunded"
)

type MessageStatus string

const (
	MessageNew      MessageStatus = "new"
	MessageRead     MessageStatus = "read"
	MessageReplied  MessageStatus = "replied"
	MessageArchived MessageStatus = "archived"
)

type AdminUser struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Name         string         `gorm:"size:120;not null" json:"name"`
	Email        string         `gorm:"size:180;uniqueIndex;not null" json:"email"`
	PasswordHash string         `gorm:"not null" json:"-"`
	Role         AdminRole      `gorm:"type:varchar(30);not null;default:'staff'" json:"role"`
	IsActive     bool           `gorm:"not null;default:true" json:"is_active"`
	LastLogin    *time.Time     `json:"last_login"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type Ticket struct {
	ID            uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Title         string         `gorm:"size:160;not null" json:"title"`
	Slug          string         `gorm:"size:180;uniqueIndex;not null" json:"slug"`
	Description   string         `gorm:"type:text" json:"description"`
	Price         int64          `gorm:"not null" json:"price"`
	OriginalPrice *int64         `json:"original_price"`
	Category      string         `gorm:"size:80;index" json:"category"`
	Features      datatypes.JSON `gorm:"type:jsonb;default:'[]'::jsonb" json:"features"`
	Validity      string         `gorm:"size:120" json:"validity"`
	Stock         int            `gorm:"not null;default:0" json:"stock"`
	SoldCount     int            `gorm:"not null;default:0" json:"sold_count"`
	IsActive      bool           `gorm:"not null;default:true;index" json:"is_active"`
	SortOrder     int            `gorm:"not null;default:0;index" json:"sort_order"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

type Booking struct {
	ID                uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	BookingID         string         `gorm:"size:40;uniqueIndex;not null" json:"booking_id"`
	CustomerName      string         `gorm:"size:140;not null" json:"customer_name"`
	CustomerEmail     string         `gorm:"size:180;not null;index" json:"customer_email"`
	CustomerPhone     string         `gorm:"size:30;not null;index" json:"customer_phone"`
	TicketID          uuid.UUID      `gorm:"type:uuid;not null;index" json:"ticket_id"`
	Ticket            Ticket         `gorm:"constraint:OnUpdate:CASCADE,OnDelete:RESTRICT" json:"ticket"`
	Quantity          int            `gorm:"not null" json:"quantity"`
	Amount            int64          `gorm:"not null" json:"amount"`
	PaymentStatus     PaymentStatus  `gorm:"type:varchar(30);not null;default:'pending';index" json:"payment_status"`
	RazorpayOrderID   string         `gorm:"size:120;index" json:"razorpay_order_id"`
	RazorpayPaymentID string         `gorm:"size:120;index" json:"razorpay_payment_id"`
	RazorpaySignature string         `gorm:"size:255" json:"razorpay_signature"`
	VisitDate         time.Time      `gorm:"type:date;index" json:"visit_date"`
	Status            BookingStatus  `gorm:"type:varchar(30);not null;default:'pending';index" json:"status"`
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
	DeletedAt         gorm.DeletedAt `gorm:"index" json:"-"`
}

type ContactMessage struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Name      string         `gorm:"size:140;not null" json:"name"`
	Email     string         `gorm:"size:180;not null;index" json:"email"`
	Phone     string         `gorm:"size:30" json:"phone"`
	Subject   string         `gorm:"size:180" json:"subject"`
	Message   string         `gorm:"type:text;not null" json:"message"`
	Status    MessageStatus  `gorm:"type:varchar(30);not null;default:'new';index" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type SiteSetting struct {
	ID              uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	SiteName        string         `gorm:"size:140;not null" json:"site_name"`
	LogoURL         string         `gorm:"type:text" json:"logo_url"`
	ContactEmail    string         `gorm:"size:180" json:"contact_email"`
	PhoneNumbers    datatypes.JSON `gorm:"type:jsonb;default:'[]'::jsonb" json:"phone_numbers"`
	Address         string         `gorm:"type:text" json:"address"`
	SocialLinks     datatypes.JSON `gorm:"type:jsonb;default:'{}'::jsonb" json:"social_links"`
	SEOTitle        string         `gorm:"size:180" json:"seo_title"`
	SEODescription  string         `gorm:"type:text" json:"seo_description"`
	RazorpayEnabled bool           `gorm:"not null;default:true" json:"razorpay_enabled"`
	MaintenanceMode bool           `gorm:"not null;default:false" json:"maintenance_mode"`
	FeatureToggles  datatypes.JSON `gorm:"type:jsonb;default:'{}'::jsonb" json:"feature_toggles"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
}

type AuditLog struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	AdminUserID *uuid.UUID     `gorm:"type:uuid;index" json:"admin_user_id"`
	AdminUser   *AdminUser     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"admin_user,omitempty"`
	Action      string         `gorm:"size:120;not null;index" json:"action"`
	Module      string         `gorm:"size:120;not null;index" json:"module"`
	Metadata    datatypes.JSON `gorm:"type:jsonb;default:'{}'::jsonb" json:"metadata"`
	IPAddress   string         `gorm:"size:80" json:"ip_address"`
	CreatedAt   time.Time      `json:"created_at"`
}

type HeroSlide struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	ImageURL    string    `gorm:"type:text;not null" json:"image_url"`
	Headline    string    `gorm:"size:255;not null" json:"headline"`
	Subheadline string    `gorm:"size:255" json:"subheadline"`
	CTAUrl      string    `gorm:"size:255" json:"cta_url"`
	CTAText     string    `gorm:"size:100" json:"cta_text"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	SortOrder   int       `gorm:"default:0" json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ContentPage struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Slug        string         `gorm:"size:180;uniqueIndex;not null" json:"slug"`
	Title       string         `gorm:"size:255;not null" json:"title"`
	Content     string         `gorm:"type:text" json:"content"`
	IsPublished bool           `gorm:"not null;default:true" json:"is_published"`
	UpdatedAt   time.Time      `json:"updated_at"`
	CreatedAt   time.Time      `json:"created_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (m *AdminUser) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *Ticket) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *Booking) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *ContactMessage) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *SiteSetting) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *AuditLog) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *HeroSlide) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func (m *ContentPage) BeforeCreate(tx *gorm.DB) error {
	setUUID(&m.ID)
	return nil
}

func setUUID(id *uuid.UUID) {
	if *id == uuid.Nil {
		*id = uuid.New()
	}
}
