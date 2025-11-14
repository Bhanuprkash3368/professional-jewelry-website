@echo off
REM Professional Jewelry Website - Deployment Script

echo.
echo ========================================
echo Professional Jewelry Website Deployment
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Initializing Git repository...
git init

echo [2/5] Adding all files...
git add .

echo [3/5] Creating initial commit...
git commit -m "Professional Jewelry Website - Initial commit"

echo [4/5] Renaming branch to main...
git branch -M main

echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: professional-jewelry-website
echo 3. Copy the repository URL
echo 4. Run this command:
echo    git remote add origin [YOUR_REPO_URL]
echo    git push -u origin main
echo.
echo 5. Go to https://vercel.com
echo 6. Click "Import Project"
echo 7. Select your GitHub repository
echo 8. Click "Deploy"
echo.
echo Your website will be live in minutes!
echo.
pause

