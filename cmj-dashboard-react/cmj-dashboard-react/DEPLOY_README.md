# CMJ Performance Dashboard - Deployment Package

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Visit http://localhost:5173

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Netlify

**Option A: Drag & Drop**
1. Drag the `dist` folder to https://app.netlify.com/drop
2. Done! Get instant URL

**Option B: Git Deployment**
1. Push to GitHub
2. Connect repo to Netlify
3. Auto-deploy on every push

---

## 📁 Project Structure

```
cmj-dashboard/
├── src/
│   ├── CMJDashboard_Complete.jsx  ← Main component
│   ├── main.jsx                   ← React entry
│   └── index.css                  ← Tailwind styles
├── index.html                     ← HTML entry
├── package.json                   ← Dependencies
├── vite.config.js                 ← Build config
├── tailwind.config.js             ← Tailwind config
├── netlify.toml                   ← Netlify config
└── NETLIFY_DEPLOY.md              ← Full guide
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 📊 Features

✅ Position group filtering (10 positions)  
✅ Individual athlete profiles  
✅ Performance trends & charts  
✅ Position cohort analysis  
✅ Top performers leaderboards  
✅ Responsive design  
✅ Real BUFB data (30 athletes sample)

---

## 🔧 Customization

### Update Data
Edit `src/CMJDashboard_Complete.jsx`:
- Find `cmjDataFull` array
- Replace with your data
- Rebuild and deploy

### Styling
- Tailwind classes in component
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme

---

## 📖 Full Documentation

See `NETLIFY_DEPLOY.md` for:
- Detailed deployment steps
- Custom domain setup
- Password protection
- Loading full dataset (5,827 tests)
- Troubleshooting
- Performance optimization

---

## ✅ Pre-Deployment Checklist

- [ ] Tested locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Charts render correctly
- [ ] Mobile responsive
- [ ] Data displays properly

---

## 🆘 Troubleshooting

**Build fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Tailwind not working?**
```bash
npm install -D tailwindcss postcss autoprefixer
npm run build
```

**Charts not showing?**
- Check browser console
- Verify Recharts installed: `npm list recharts`

---

## 📞 Support

- Full Guide: `NETLIFY_DEPLOY.md`
- Netlify Docs: https://docs.netlify.com
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev

---

**Ready to deploy?**

```bash
npm install && npm run build
```

Then drag `dist` folder to Netlify! 🎉
