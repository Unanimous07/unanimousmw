# Unanimous MW - Production Build Script
# This script builds the Angular app for production deployment

Write-Host "Starting production build for Unanimous MW..." -ForegroundColor Green

# Clean previous builds
Write-Host "`nCleaning previous build files..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "Previous build files removed." -ForegroundColor Green
}

# Run production build
Write-Host "`nBuilding for production..." -ForegroundColor Yellow
ng build --configuration production

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Build completed successfully!" -ForegroundColor Green
    Write-Host "`nBuild output location:" -ForegroundColor Cyan
    Write-Host "  - Browser files: dist/unanimousmw/browser/" -ForegroundColor White
    Write-Host "  - Server files:  dist/unanimousmw/server/" -ForegroundColor White
    
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. For static hosting: Deploy the 'browser' folder" -ForegroundColor White
    Write-Host "  2. For SSR hosting: Deploy both 'browser' and 'server' folders" -ForegroundColor White
    Write-Host "  3. Recommended platforms: Vercel, Netlify, or Node.js server" -ForegroundColor White
} else {
    Write-Host "`n✗ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host "`nDeployment build complete!" -ForegroundColor Green
