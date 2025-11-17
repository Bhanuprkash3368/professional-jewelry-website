@echo off
REM Push to GitHub with Personal Access Token

echo.
echo ========================================
echo GitHub Push - Authentication Required
echo ========================================
echo.

echo To push your code, you need to authenticate with GitHub.
echo.
echo OPTION 1: Use GitHub Web Authentication (Recommended)
echo Run this command and follow the browser prompts:
echo.
echo   git push -u origin main
echo.
echo OPTION 2: Use Personal Access Token
echo 1. Go to https://github.com/settings/tokens
echo 2. Click "Generate new token"
echo 3. Name: "jewelry-website"
echo 4. Select "repo" scope
echo 5. Click "Generate token"
echo 6. Copy the token
echo 7. Run this command:
echo    git remote remove origin
echo    git remote add origin https://TOKEN@github.com/Bhanuprkash3368/professional-jewelry-website.git
echo    git push -u origin main
echo.
echo Replace TOKEN with your actual token.
echo.
echo ========================================
echo.

cd c:\photoTRYON\professional-jewelry-website
"C:\Program Files\Git\bin\git.exe" push -u origin main

pause

