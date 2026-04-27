package services

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"yoyo-server/internal/config"

	"github.com/google/uuid"
)

type UploadService struct {
	cfg *config.Config
}

type UploadResult struct {
	URL      string `json:"url"`
	FileName string `json:"file_name"`
	Storage  string `json:"storage"`
}

func NewUploadService(cfg *config.Config) *UploadService {
	return &UploadService{cfg: cfg}
}

func (s *UploadService) Save(ctx context.Context, fileHeader *multipart.FileHeader) (*UploadResult, error) {
	_ = ctx
	ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
	if !allowedUploadExt(ext) {
		return nil, fmt.Errorf("unsupported file type")
	}
	if fileHeader.Size > 5<<20 {
		return nil, fmt.Errorf("file exceeds 5MB limit")
	}

	source, err := fileHeader.Open()
	if err != nil {
		return nil, err
	}
	defer source.Close()

	if err := os.MkdirAll(s.cfg.UploadDir, 0o755); err != nil {
		return nil, err
	}

	fileName := uuid.NewString() + ext
	targetPath := filepath.Join(s.cfg.UploadDir, fileName)
	target, err := os.Create(targetPath)
	if err != nil {
		return nil, err
	}
	defer target.Close()

	if _, err := io.Copy(target, source); err != nil {
		return nil, err
	}

	return &UploadResult{
		URL:      "/uploads/" + fileName,
		FileName: fileName,
		Storage:  "local",
	}, nil
}

func allowedUploadExt(ext string) bool {
	switch ext {
	case ".jpg", ".jpeg", ".png", ".webp", ".svg":
		return true
	default:
		return false
	}
}
