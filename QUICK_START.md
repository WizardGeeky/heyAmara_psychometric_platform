# 🚀 Quick Start Guide - MongoDB Setup

## ✅ What You Need

Your psychometric platform now uses **MongoDB Atlas** (free tier) for data storage.

## 📋 Setup Steps (10 minutes)

### Step 1: Create MongoDB Atlas Account (2 min)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free, no credit card required)
3. Choose: **Free M0 Cluster**

### Step 2: Create Cluster (3 min)

1. Click: **Build a Database**
2. Choose: **M0 FREE** (512 MB storage)
3. Provider: **AWS** (recommended)
4. Region: Choose closest to you
5. Cluster Name: `psychometric-cluster`
6. Click: **Create**

Wait 1-3 minutes for cluster creation.

### Step 3: Create Database User (1 min)

1. Click: **Database Access** (left sidebar)
2. Click: **Add New Database User**
3. Username: `psychometric_user`
4. Password: Click **Autogenerate** and **COPY IT!**
5. Privileges: **Read and write to any database**
6. Click: **Add User**

⚠️ **SAVE YOUR PASSWORD!**

### Step 4: Allow Network Access (1 min)

1. Click: **Network Access** (left sidebar)
2. Click: **Add IP Address**
3. Click: **Allow Access from Anywhere** (0.0.0.0/0)
4. Click: **Confirm**

### Step 5: Get Connection String (2 min)

1. Go to: **Database** (left sidebar)
2. Click: **Connect** on your cluster
3. Choose: **Drivers**
4. Select: **Node.js**
5. Copy connection string:
   ```
   mongodb+srv://psychometric_user:<password>@cluster.mongodb.net/
   ```
6. Replace `<password>` with your actual password
7. Add database name:
   ```
   mongodb+srv://psychometric_user:YOUR_PASSWORD@cluster.mongodb.net/psychometric_platform
   ```

### Step 6: Update .env.local (1 min)

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://psychometric_user:YOUR_PASSWORD@cluster.mongodb.net/psychometric_platform
```

**Example**:
```env
MONGODB_URI=mongodb+srv://psychometric_user:Abc123XYZ@cluster0.abc123.mongodb.net/psychometric_platform
```

### Step 7: Test Locally

```bash
npm run dev
```

1. Go to: http://localhost:3000
2. Complete an assessment
3. Check MongoDB Atlas:
   - Database → Browse Collections
   - See `psychometric_platform` database
   - See `users` collection
   - Your data is there! ✅

## 🚀 Deploy to Vercel

### Add Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Select: **heyamara-platform** project
3. Go to: **Settings** → **Environment Variables**
4. Click: **Add New**
5. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
6. Click: **Save**

### Also Add Email Variables

- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = Your Gmail
- `SMTP_PASS` = Your Gmail app password
- `EMAIL_FROM` = `HeyAmara <noreply@heyamara.ai>`
- `NEXT_PUBLIC_APP_URL` = `https://heyamara-platform.vercel.app`

### Redeploy

```bash
git add .
git commit -m "Switch to MongoDB storage"
git push
```

Or click **Redeploy** in Vercel dashboard.

## ✅ Verify It Works

After deployment:

1. Visit: https://heyamara-platform.vercel.app
2. Complete an assessment
3. Check MongoDB Atlas → Browse Collections
4. See your data! ✅
5. Return with same email
6. Should show existing results! ✅

## 🎯 Why MongoDB?

✅ **Free 512 MB** - Perfect for this app
✅ **Easy setup** - 10 minutes total
✅ **Beautiful UI** - View data in Atlas dashboard
✅ **Document-based** - Perfect for user assessments
✅ **Automatic backups** - Data is safe
✅ **Scalable** - Upgrade when needed

## 📊 View Your Data

1. Go to: https://cloud.mongodb.com/
2. Click: **Database** → **Browse Collections**
3. Select: `psychometric_platform` → `users`
4. See all user assessments!

## 🆘 Troubleshooting

### "MongoServerError: bad auth"
→ Check password in connection string

### "Connection timeout"
→ Check Network Access allows 0.0.0.0/0

### "MONGODB_URI is not set"
→ Add environment variable in Vercel

### Can't see data
→ Database → Browse Collections → psychometric_platform

## 📚 Full Documentation

For detailed instructions, see:
- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - Complete setup guide
- **[README.md](./README.md)** - Project documentation

---

**🎉 You're all set!**

Your psychometric platform now uses MongoDB Atlas for persistent, scalable storage.

**Next**: Add your email credentials and you're ready to go! 🚀
