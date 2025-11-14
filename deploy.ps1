# Professional Jewelry Website - Deployment Script
# Run this script to deploy to GitHub and Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Professional Jewelry Website Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is installed
Write-Host "[1/6] Checking Git installation..." -ForegroundColor Yellow
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Red
    exit
}

# Step 2: Initialize git
Write-Host "[2/6] Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Git initialized" -ForegroundColor Green

# Step 3: Add all files
Write-Host "[3/6] Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green

# Step 4: Create commit
Write-Host "[4/6] Creating initial commit..." -ForegroundColor Yellow
git commit -m "Professional Jewelry Website - Initial commit"
Write-Host "✅ Commit created" -ForegroundColor Green

# Step 5: Rename branch
Write-Host "[5/6] Renaming branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch renamed" -ForegroundColor Green

# Step 6: Instructions
Write-Host "[6/6] Deployment instructions..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Create repository: professional-jewelry-website" -ForegroundColor White
Write-Host "3. Copy the repository URL" -ForegroundColor White
Write-Host ""
Write-Host "4. Run these commands:" -ForegroundColor Yellow
Write-Host "   git remote add origin [YOUR_REPO_URL]" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Go to https://vercel.com" -ForegroundColor White
Write-Host "6. Click 'Import Project'" -ForegroundColor White
Write-Host "7. Select your GitHub repository" -ForegroundColor White
Write-Host "8. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "✅ Your website will be live in minutes!" -ForegroundColor Green
Write-Host ""

