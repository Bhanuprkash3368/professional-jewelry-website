# 🚀 DEPLOY TO GITHUB - STEP BY STEP

## **STEP 1: CREATE GITHUB ACCOUNT**
1. Go to https://github.com
2. Click "Sign up"
3. Create account with email
4. Verify email

---

## **STEP 2: CREATE NEW REPOSITORY**
1. Go to https://github.com/new
2. Repository name: `professional-jewelry-website`
3. Description: "Professional Jewelry Try-On Website"
4. Choose "Public" (for free hosting)
5. Click "Create repository"

---

## **STEP 3: PUSH CODE TO GITHUB**

Open PowerShell in your project folder:

```bash
cd c:\photoTRYON\professional-jewelry-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Professional Jewelry Website - Initial commit"

# Rename branch to main
git branch -M main

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/professional-jewelry-website.git

# Push to GitHub
git push -u origin main
```

---

## **STEP 4: ENABLE GITHUB PAGES (for static hosting)**

1. Go to your repository on GitHub
2. Click "Settings"
3. Click "Pages" (left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch
6. Select "/root" folder
7. Click "Save"

**Your site will be at:** `https://YOUR_USERNAME.github.io/professional-jewelry-website`

---

## **STEP 5: FOR DYNAMIC HOSTING (with Node.js)**

Use GitHub Actions + Heroku or Railway:

### **Option A: Deploy to Railway**
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select your repository
6. Railway auto-deploys!

### **Option B: Deploy to Heroku**
1. Go to https://heroku.com
2. Create account
3. Create new app
4. Connect GitHub
5. Enable auto-deploy
6. Deploy!

---

## **RESULT**

✅ Your code is on GitHub
✅ Website is live online
✅ Auto-deploy on every push

**Your website is now public! 🎉**

