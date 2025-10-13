# 🚀 Netlify Deployment Guide - CMJ Dashboard

## Quick Deploy (5 Minutes)

### Option 1: Drag & Drop (Easiest)

1. **Build the app locally first:**
   ```bash
   npm install
   npm run build
   ```

2. **Go to Netlify:**
   - Visit https://app.netlify.com/drop
   - Drag the `dist` folder onto the page
   - Done! You'll get a live URL instantly

### Option 2: Git-Based Deployment (Best for Updates)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CMJ Dashboard"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Automatic deploys:**
   - Every git push will automatically deploy!

---

## 📦 Project Setup

### File Structure
```
cmj-dashboard/
├── CMJDashboard_Complete.jsx    ← Your React component
├── package.json                 ← Dependencies
├── vite.config.js              ← Build config
├── index.html                  ← Entry point
├── README.md                   ← Documentation
└── netlify.toml                ← Netlify config
```

### Install Dependencies

```bash
npm install
```

This installs:
- React 18
- Recharts (for charts)
- Tailwind CSS (styling)
- Vite (fast build tool)

---

## 🛠️ Local Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Make Changes:
1. Edit `CMJDashboard_Complete.jsx`
2. Save file
3. Browser auto-refreshes

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain:

1. **In Netlify Dashboard:**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `cmj.yourschool.edu`

2. **Update DNS Records:**
   - Add CNAME record:
     ```
     Name: cmj
     Value: your-site-name.netlify.app
     ```

3. **Enable HTTPS:**
   - Netlify provides free SSL automatically
   - Takes ~24 hours to activate

---

## 🔐 Password Protection (Optional)

### Add Basic Auth:

Create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Basic-Auth = "username:password"
```

Or use **Netlify Identity** for more advanced auth:
- Enable in Netlify dashboard
- Add login UI to your app
- Manage users through Netlify

---

## 📊 Loading Real Data

### Current Setup:
- Sample data embedded in component (30 athletes)
- Perfect for testing and demo

### To Load All 5,827 Tests:

**Option 1: Static JSON Import**
```javascript
// In CMJDashboard_Complete.jsx
import cmjDataFull from './data/processed_cmj_data.json';
```

Create `public/data/` folder and add your JSON files.

**Option 2: API Endpoint**
```javascript
// Fetch from external API
useEffect(() => {
  fetch('https://api.yourschool.edu/cmj-data')
    .then(res => res.json())
    .then(data => setCmjData(data));
}, []);
```

**Option 3: Netlify Functions** (Recommended)
- Store data in Netlify's built-in database
- Create serverless function to serve data
- More secure, scales better

---

## 🔄 Updating Data

### Method 1: Git Push
```bash
# Update data file
# Commit and push
git add .
git commit -m "Update CMJ data"
git push

# Netlify auto-deploys!
```

### Method 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Method 3: Manual Upload
- Build locally: `npm run build`
- Drag `dist` folder to Netlify

---

## 📈 Performance Optimization

### Already Included:
✅ Vite for fast builds  
✅ React lazy loading ready  
✅ Tailwind CSS purging  
✅ Modern ES6+ code  

### Optional Improvements:
- **Code splitting:** Split by position/view
- **Image optimization:** Compress any images
- **CDN caching:** Netlify handles automatically
- **Compression:** Gzip enabled by default

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Charts Not Showing:
- Check browser console for errors
- Verify Recharts is installed: `npm list recharts`
- Ensure data format matches expected structure

### Styling Issues:
- Tailwind not loading? Check `index.html` includes CSS
- Run: `npm run build` to regenerate styles

### Deployment Issues:
- Check Netlify build logs in dashboard
- Verify `package.json` has correct scripts
- Ensure `dist` folder is being published

---

## 📞 Support Resources

### Netlify:
- Docs: https://docs.netlify.com
- Support: https://answers.netlify.com
- Status: https://www.netlifystatus.com

### React/Vite:
- Vite docs: https://vitejs.dev
- React docs: https://react.dev

### Recharts:
- Docs: https://recharts.org

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] All features work in `dist` preview
- [ ] Data loads correctly
- [ ] Charts render properly
- [ ] Mobile responsive (test on phone)
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Custom domain configured (if needed)
- [ ] Analytics added (optional)
- [ ] Team has access to Netlify dashboard

---

## 🎯 Next Steps After Deployment

1. **Share the URL** with your coaching staff
2. **Gather feedback** on features needed
3. **Update data** regularly (weekly/monthly)
4. **Monitor usage** via Netlify analytics
5. **Add features** based on needs:
   - Export to PDF/CSV
   - Email reports
   - User authentication
   - Database integration
   - Real-time data sync

---

## 💡 Pro Tips

1. **Enable branch previews:** Test changes before going live
2. **Set up notifications:** Get alerted on deploy status
3. **Use environment variables:** Store API keys securely
4. **Monitor performance:** Netlify provides analytics
5. **Backup your data:** Keep JSON files in version control

---

## 🚀 You're Ready!

Your CMJ Dashboard is production-ready and optimized for Netlify deployment.

**Deploy now:**
```bash
npm install
npm run build
# Then drag 'dist' folder to https://app.netlify.com/drop
```

**Live in 30 seconds!** 🎉
