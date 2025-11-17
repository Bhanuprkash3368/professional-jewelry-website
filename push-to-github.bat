@echo off
REM Push code to GitHub

echo.
echo ========================================
echo Pushing to GitHub
echo ========================================
echo.

REM Add remote
echo [1/2] Adding GitHub remote...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Bhanuprkash3368/professional-jewelry-website.git
echo ✓ Remote added

REM Push to GitHub
echo [2/2] Pushing code to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ========================================
echo SUCCESS!
echo ========================================
echo.
echo Your code is now on GitHub!
echo Repository: https://github.com/Bhanuprkash3368/professional-jewelry-website
echo.
echo NEXT STEP: Deploy to Vercel
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Click "Import Project"
echo 4. Select your repository
echo 5. Click "Deploy"
echo.
echo Your website will be live in minutes!
echo.
pause

