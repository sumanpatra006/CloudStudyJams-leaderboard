# Cloud Study Jams Leaderboard Dashboard

A beautiful, production-ready leaderboard dashboard for Cloud Study Jams at Veer Surendra Sai University of Technology.

## Features

- 📊 Real-time analytics dashboard
- 🎉 Confetti animation on page load
- 📋 Paginated leaderboard (20 entries per page)
- 🔍 Search functionality
- 👤 Detailed participant profiles
- 📱 Fully responsive design
- 🎨 Google-style UI with smooth animations
- ⚡ Production-ready

## Setup

### 1. Add Your CSV File

Place your CSV file at `public/data.csv`

### 2. Convert CSV to JSON

Run the conversion script:

\`\`\`bash
npm run convert-csv
\`\`\`

This will:
- Parse your CSV file
- Calculate analytics
- Generate `public/leaderboard-data.json`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000`

## Usage

### Updating Data

1. Replace `public/data.csv` with your updated CSV file
2. Run `npm run convert-csv`
3. The dashboard will automatically load the new data

### CSV Format

Your CSV should have these columns:
- User Name
- User Email
- Google Cloud Skills Boost Profile URL
- Profile URL Status
- Access Code Redemption Status
- All Skill Badges & Games Completed
- # of Skill Badges Completed
- Names of Completed Skill Badges
- # of Arcade Games Completed
- Names of Completed Arcade Games

## Deployment

### Deploy to Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Environment Variables

No environment variables required for this project.

## Production Checklist

- ✅ CSV to JSON conversion script
- ✅ Analytics pre-calculated
- ✅ Pagination implemented
- ✅ Search functionality
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Error handling
- ✅ Loading states
- ✅ TypeScript support
- ✅ SEO optimized

## File Structure

\`\`\`
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Homepage)
│   ├── leaderboard/
│   │   └── page.tsx (Leaderboard page)
│   └── globals.css
├── components/
│   ├── analytics-card.tsx
│   ├── participant-card.tsx
│   ├── participant-modal.tsx
│   └── confetti.tsx
├── scripts/
│   └── csv-to-json.ts
├── types/
│   └── index.ts
├── public/
│   ├── data.csv (Your CSV file)
│   └── leaderboard-data.json (Generated)
└── package.json
\`\`\`

## License

MIT
