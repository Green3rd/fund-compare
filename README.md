# Thai Fund Compare

เปรียบเทียบกองทุนรวมไทย - A web application for comparing Thai mutual fund NAV (Net Asset Value) with historical charts.

## Features

- 🔍 **Fund Search**: Search Thai mutual funds by name or code with autocomplete
- 📊 **Multi-Fund Comparison**: Compare up to 5 funds simultaneously
- 📈 **Historical Charts**: Interactive charts showing NAV trends over time
- 🔗 **Shareable Links**: Share fund comparisons via URL parameters
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Data Sources**: 
  - SEC Thailand API (for official fund data)
  - Yahoo Finance (for historical charts)
  - Mock data fallback when APIs unavailable

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fund-compare
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure:
- `SEC_API_BASE_URL`: SEC Thailand API endpoint
- `CACHE_TTL_SEC_API`: Cache duration for SEC API (default: 1800 seconds)
- `CACHE_TTL_YAHOO`: Cache duration for Yahoo Finance (default: 3600 seconds)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
fund-compare/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   ├── funds/         # Fund data endpoints
│   │   │   └── yahoo/         # Yahoo Finance endpoints
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── FundSearch.tsx     # Fund search with autocomplete
│   │   └── FundChart.tsx      # Chart visualization
│   ├── lib/                   # Utility libraries
│   │   ├── sec-api/           # SEC API client
│   │   ├── yahoo-finance/     # Yahoo Finance client
│   │   └── utils/             # Helper functions
│   └── types/                 # TypeScript type definitions
├── openspec/                  # OpenSpec change management
└── public/                    # Static assets
```

## API Endpoints

### Fund List
```
GET /api/funds/list
```
Returns list of all Thai mutual funds.

### Fund NAV
```
GET /api/funds/[code]/nav
```
Returns current NAV data for a specific fund.

### Historical Data
```
GET /api/funds/[code]/history?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns historical NAV data for a specific fund.

### Yahoo Finance Historical Data
```
GET /api/yahoo/[ticker]/history?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```
Returns historical price data from Yahoo Finance.

## Usage

1. **Search for Funds**: Type fund name or code in the search box
2. **Select Funds**: Click on search results to add funds (max 5)
3. **View Comparison**: Charts and metrics update automatically
4. **Share**: Copy URL to share your fund comparison
5. **Remove Funds**: Click "ลบ" button to remove funds from comparison

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **ESLint**: Configured with Next.js and Prettier rules
- **Prettier**: Code formatting
- **TypeScript**: Type safety

## Mock Data

The application includes mock data fallback when external APIs are unavailable. This allows development and testing without API access.

Mock funds include:
- K-CHINA (กองทุนเปิดกรุงศรีจีน)
- SCBSET50 (กองทุนเปิดไทยพาณิชย์ SET50)
- KFGBRAND (กองทุนเปิดกรุงศรีโกลบอลแบรนด์)
- TMBGQG (กองทุนเปิดทหารไทยโกลบอลควอลิตี้โกรท)
- SCBSET (กองทุนเปิดไทยพาณิชย์ SET)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- SEC Thailand for official fund data
- Yahoo Finance for historical market data
- Next.js team for the excellent framework

## Support

For issues or questions, please open an issue on GitHub.
