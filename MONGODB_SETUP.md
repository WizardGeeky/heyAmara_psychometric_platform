# 🍃 MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free (no credit card required)
3. Choose: **Free Shared Cluster** (M0)

### Step 2: Create a Cluster

1. After signup, click: **Build a Database**
2. Choose: **M0 FREE** tier
3. Select: **Cloud Provider** (AWS recommended)
4. Select: **Region** (closest to your users)
5. Cluster Name: `psychometric-cluster` (or any name)
6. Click: **Create**

Wait 1-3 minutes for cluster creation.

### Step 3: Create Database User

1. Click: **Database Access** (left sidebar)
2. Click: **Add New Database User**
3. Authentication Method: **Password**
4. Username: `psychometric_user` (or any name)
5. Password: Click **Autogenerate Secure Password** (copy it!)
6. Database User Privileges: **Read and write to any database**
7. Click: **Add User**

**⚠️ IMPORTANT**: Save your password! You'll need it for the connection string.

### Step 4: Allow Network Access

1. Click: **Network Access** (left sidebar)
2. Click: **Add IP Address**
3. Choose: **Allow Access from Anywhere** (0.0.0.0/0)
   - This is safe for development and Vercel deployments
4. Click: **Confirm**

### Step 5: Get Connection String

1. Go back to: **Database** (left sidebar)
2. Click: **Connect** on your cluster
3. Choose: **Drivers**
4. Select: **Node.js** and latest version
5. Copy the connection string:
   ```
   mongodb+srv://psychometric_user:<password>@cluster.mongodb.net/
   ```
6. Replace `<password>` with your actual password
7. Add database name at the end:
   ```
   mongodb+srv://psychometric_user:YOUR_PASSWORD@cluster.mongodb.net/psychometric_platform
   ```

### Step 6: Update .env.local

Edit `.env.local` and add your connection string:

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

Then:
1. Go to http://localhost:3000
2. Complete an assessment
3. Check MongoDB Atlas:
   - Go to: **Database** → **Browse Collections**
   - You should see: `psychometric_platform` database
   - Collection: `users`
   - Your test data should be there! ✅

## Deploy to Vercel

### Add Environment Variable

1. Go to: https://vercel.com/dashboard
2. Select: Your project
3. Go to: **Settings** → **Environment Variables**
4. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
5. Click: **Save**

### Redeploy

```bash
git add .
git commit -m "Switch to MongoDB storage"
git push
```

Or redeploy from Vercel dashboard.

## MongoDB Atlas Dashboard

### View Your Data

1. Go to: **Database** → **Browse Collections**
2. Select: `psychometric_platform` database
3. Select: `users` collection
4. You'll see all user assessments!

### Monitor Usage

1. Go to: **Metrics** tab
2. View:
   - Connections
   - Operations per second
   - Storage usage
   - Network usage

### Free Tier Limits

- **Storage**: 512 MB
- **RAM**: Shared
- **Connections**: 500 concurrent
- **Perfect for**: Development and small to medium apps

## Data Structure

MongoDB will store documents like this:

```json
{
  "_id": "ObjectId(...)",
  "email": "user@example.com",
  "responses": {
    "cog1": 4,
    "cog2": 3,
    "beh1": 5,
    ...
  },
  "isCompleted": true,
  "timestamp": "2026-02-08T...",
  "scores": {
    "cognitive": 75,
    "behavior": 80,
    "motivation": 70,
    "collaboration": 85
  },
  "updatedAt": "2026-02-08T..."
}
```

## Advantages of MongoDB

✅ **Easy to use**: Simple document-based storage
✅ **Flexible schema**: Easy to add new fields
✅ **Free tier**: Generous 512 MB storage
✅ **Atlas UI**: Beautiful dashboard to view data
✅ **Scalable**: Easy to upgrade when needed
✅ **Backups**: Automatic backups included
✅ **Global**: Deploy clusters worldwide

## Security Best Practices

1. **Use strong passwords**: Auto-generated passwords are best
2. **Limit IP access**: Use specific IPs in production if possible
3. **Rotate credentials**: Change passwords periodically
4. **Monitor access**: Check Atlas logs regularly
5. **Use environment variables**: Never commit credentials to Git

## Troubleshooting

### "MongoServerError: bad auth"
→ Check username and password in connection string

### "Connection timeout"
→ Check Network Access allows your IP (0.0.0.0/0 for Vercel)

### "MONGODB_URI is not set"
→ Add environment variable in Vercel

### "Database not found"
→ Database is created automatically on first write

### Can't see data in Atlas
→ Go to Database → Browse Collections → Select database

## Useful MongoDB Atlas Features

### 1. Data Explorer
Browse and edit your data directly in the Atlas UI

### 2. Charts
Create visualizations of your assessment data

### 3. Triggers
Set up automated actions (e.g., send email on new user)

### 4. Search
Full-text search capabilities

### 5. Realm
Build mobile apps with MongoDB Realm

## Cost

**Free Tier (M0)**:
- 512 MB storage
- Shared RAM
- Shared vCPU
- Perfect for this application!

**Paid Tiers** (if you need more):
- M10: $0.08/hour (~$57/month)
- M20: $0.20/hour (~$144/month)
- M30: $0.54/hour (~$389/month)

For most psychometric platforms, the free tier is sufficient!

## Support

- **Documentation**: https://docs.mongodb.com/
- **Community**: https://community.mongodb.com/
- **Support**: Available in Atlas dashboard

---

**🎉 You're all set with MongoDB!**

Your psychometric platform now uses MongoDB Atlas for persistent, scalable data storage.
