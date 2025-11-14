@echo off
REM Configure Git and Initialize Repository

echo.
echo ========================================
echo Git Configuration & Repository Setup
echo ========================================
echo.

REM Configure Git
echo [1/5] Configuring Git...
"C:\Program Files\Git\bin\git.exe" config --global user.name "Jewelry Developer"
"C:\Program Files\Git\bin\git.exe" config --global user.email "jewelry@example.com"
echo ✓ Git configured

REM Initialize repository
echo [2/5] Initializing Git repository...
"C:\Program Files\Git\bin\git.exe" init
echo ✓ Repository initialized

REM Add all files
echo [3/5] Adding all files...
"C:\Program Files\Git\bin\git.exe" add .
echo ✓ Files added

REM Create commit
echo [4/5] Creating initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Professional Jewelry Website - Initial commit"
echo ✓ Commit created

REM Rename branch
echo [5/5] Renaming branch to main...
"C:\Program Files\Git\bin\git.exe" branch -M main
echo ✓ Branch renamed

echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create repository: professional-jewelry-website
echo 3. Copy the repository URL
echo 4. Run this command:
echo    git remote add origin [YOUR_REPO_URL]
echo    git push -u origin main
echo.
echo 5. Go to https://vercel.com
echo 6. Deploy your repository
echo.
echo Your website will be live in minutes!
echo.
pause

