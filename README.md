# FRA Atlas & WebGIS Decision Support System

A production-ready AI-powered Forest Rights Act (FRA) Atlas and WebGIS Decision Support System designed to support integrated monitoring and transparent implementation of the Forest Rights Act in **Madhya Pradesh, Tripura, Odisha, and Telangana**.

## 🌟 Features

### 1. **Interactive WebGIS Map Component**
- **Leaflet-based mapping** with layer controls
- **Real-time FRA claims visualization** across four target states
- **Multiple map layers:**
  - Forest Cover overlay
  - FRA Claims markers (color-coded by status)
  - Satellite Imagery (toggle between street and satellite view)
  - Change Detection zones
- **Interactive popups** with detailed claim information
- **Legend** for easy status interpretation

### 2. **Comprehensive Dashboard**
- **Analytics cards** showing:
  - Total Claims
  - Pending Claims
  - Approved Claims
  - Average Processing Time
- **Visual charts:**
  - Claims by Status (progress bars)
  - State Distribution analysis
- **Recent Activity feed** with latest claim submissions
- **Real-time statistics** and trend indicators

### 3. **Mobile-Responsive Data Collection Forms**
- **Offline capability** with sync-when-online functionality
- **Comprehensive form fields:**
  - Claimant information (name, contact, location)
  - Claim details (type, land area, GPS coordinates)
  - Supporting document uploads
- **Field officer optimized** for mobile and tablet devices
- **Draft saving** functionality
- **Real-time validation** and error handling

### 4. **Admin Dashboard**
- **Priority Queue** highlighting high-priority pending claims
- **Advanced filtering:**
  - Search by claim ID, claimant name, or village
  - Filter by state and status
- **Claim management table** with actions:
  - View claim details
  - Approve claims
  - Reject claims
- **Data export** functionality (CSV format)
- **Bulk operations** support

### 5. **ML-Powered Change Detection**
- **AI-driven satellite imagery analysis**
- **Automated change detection** for:
  - Deforestation
  - Land use changes
  - Encroachment detection
- **Confidence scoring** for each detection
- **Visual comparison** (before/after imagery)
- **Area impact calculation**
- **Severity classification** (High, Medium, Low)

### 6. **Satellite Imagery Time Series**
- **Interactive timeline slider** for temporal analysis
- **Play/pause controls** for automated playback
- **Metrics visualization:**
  - NDVI (Normalized Difference Vegetation Index)
  - Forest Cover Percentage
  - Cloud Cover
- **Trend analysis** with visual indicators
- **Multiple satellite sources** (Sentinel-2)

### 7. **Multilingual Support**
- **5 Languages supported:**
  - English
  - Hindi (हिन्दी)
  - Odia (ଓଡ଼ିଆ)
  - Telugu (తెలుగు)
  - Bengali (বাংলা)
- **Real-time language switching**
- **Fully translated UI** including forms, buttons, and messages

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/UI
- **Mapping:** Leaflet + React Leaflet
- **Internationalization:** i18next + react-i18next
- **Date Handling:** date-fns
- **Icons:** Lucide React
- **Notifications:** Sonner

## 📦 Installation

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ml/
│   │       ├── change-detection/
│   │       │   └── route.ts          # ML change detection API
│   │       └── satellite-imagery/
│   │           └── route.ts          # Satellite imagery API
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main application page
├── components/
│   ├── ui/                           # Shadcn UI components
│   ├── AdminPanel.tsx                # Admin dashboard
│   ├── Dashboard.tsx                 # Main dashboard
│   ├── DataCollectionForm.tsx        # Mobile data entry form
│   ├── I18nProvider.tsx              # i18n wrapper
│   ├── LanguageSwitcher.tsx          # Language selector
│   ├── MLChangeDetection.tsx         # ML insights component
│   ├── Navigation.tsx                # Main navigation
│   ├── SatelliteTimeline.tsx         # Satellite time series
│   └── WebGISMap.tsx                 # Interactive map
├── lib/
│   ├── data/
│   │   └── fra-claims.ts             # Sample FRA claims data
│   └── i18n.ts                       # i18n configuration
└── hooks/
    └── use-toast.ts                  # Toast notification hook
```

## 🎯 Usage Guide

### Dashboard View
- Navigate to the **Dashboard** to see overview statistics
- View claims distribution by state and status
- Monitor recent activity and processing times

### WebGIS Map View
- Click **WebGIS Map** in navigation
- Toggle layers using checkboxes:
  - Forest Cover
  - FRA Claims
  - Satellite Imagery
  - Change Detection
- Click on claim markers to view details
- Use the **Satellite Timeline** to analyze temporal changes
- Review **ML Change Detection** alerts

### Data Collection
- Navigate to **Data Collection** for field data entry
- Toggle **Offline Mode** for areas without connectivity
- Fill in claimant information and claim details
- Add GPS coordinates (manually or via device GPS)
- Upload supporting documents
- Save as draft or submit claim

### Admin Panel
- Access **Admin Panel** for claim management
- Review **Priority Queue** for urgent claims
- Use filters to find specific claims
- Approve or reject claims with one click
- Export data for external analysis

### Language Selection
- Click the **Globe icon** in the top-right corner
- Select your preferred language from the dropdown

## 📊 API Endpoints

### Change Detection API
```
GET  /api/ml/change-detection
POST /api/ml/change-detection
```

**POST Request Body:**
```json
{
  "coordinates": [21.8047, 80.1897],
  "startDate": "2023-09-01",
  "endDate": "2024-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "changes": [...],
    "summary": {
      "totalChanges": 2,
      "highSeverity": 1,
      "totalAreaAffected": 3.7
    }
  }
}
```

### Satellite Imagery API
```
GET /api/ml/satellite-imagery?state=Madhya Pradesh&coordinates=21.8047,80.1897
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {...},
    "imagery": [...],
    "analysis": {
      "forestCoverChange": -4.0,
      "ndviChange": -0.10,
      "trend": "Declining"
    }
  }
}
```

## 🌐 Target States Data

The system includes sample data for:
- **Madhya Pradesh** - Districts: Balaghat, Mandla, Chhindwara
- **Tripura** - Districts: West Tripura, Dhalai
- **Odisha** - Districts: Mayurbhanj, Koraput, Sundargarh
- **Telangana** - Districts: Adilabad, Khammam

## 🔒 Role-Based Access (Mock)

The application simulates different user roles:
- **Field Officers** - Data collection and submission
- **Administrators** - Claim review and management
- **Analysts** - Analytics and reporting access

## 🎨 UI/UX Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic theme detection and manual toggle
- **Accessibility** - WCAG compliant with keyboard navigation
- **Loading States** - Smooth transitions and skeleton loaders
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback for user actions

## 📈 Future Enhancements

- Real database integration (PostgreSQL/PostGIS recommended)
- User authentication system (OAuth, JWT)
- Real-time collaboration features
- Advanced analytics and reporting
- Mobile app (React Native)
- Integration with official satellite imagery APIs
- Real ML model integration (TensorFlow, PyTorch)
- Offline-first architecture with service workers

## 🤝 Contributing

This is a demonstration project showcasing a production-capable FRA Atlas system. For production deployment, consider:

1. Setting up a proper database with PostGIS for spatial data
2. Implementing secure authentication
3. Integrating with official satellite imagery providers
4. Training custom ML models on actual FRA data
5. Setting up proper CI/CD pipelines
6. Implementing comprehensive testing

## 📄 License

This project is built as a demonstration. Please ensure compliance with local regulations when deploying for actual FRA monitoring.

## 🙏 Acknowledgments

Built with modern web technologies to support transparent implementation of the Forest Rights Act and empower indigenous communities in exercising their forest rights.

---

**Note:** This application uses mock data and simulated ML endpoints for demonstration purposes. For production use, integrate with real databases, authentication systems, and satellite imagery APIs.