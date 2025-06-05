
# Career Vision Platform - Kenya

A comprehensive educational guidance platform designed for Kenya's Competency-Based Curriculum (CBC) and Competency-Based Assessment (CBA) framework.

## 🎯 Overview

The Career Vision Platform provides AI-powered guidance for students, parents, educators, and policymakers to navigate Kenya's educational landscape, including universities, polytechnics, and TVET institutions.

## 🌟 Features

### 🎓 Institutional Profiles
- **Universities**: 8 public and private universities
- **National Polytechnics**: 3 premier technical institutions
- **TVET Colleges**: 6 public and private technical colleges
- Real-time capacity and placement data
- KUCCPS integration and cut-off points
- HELB eligibility information

### 🤖 AI-Powered Assessment
- Competency-based evaluation aligned with CBC framework
- Personalized pathway recommendations
- Performance tracking and analysis
- Multi-role support (Students, Parents, Educators, Administrators)

### 📊 CBA Integration
- **Level 4**: Exceeding Expectation (17-20 marks)
- **Level 3**: Meeting Expectation (12-16 marks)
- **Level 2**: Approaching Expectation (07-11 marks)
- **Level 1**: Below Expectation (00-06 marks)

### 📈 Database & Reporting
- Comprehensive institutional database
- Downloadable CSV reports
- Detailed analytics
- Real-time placement insights

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-vision-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── institutions/
│   │   ├── CBALevelsCard.tsx
│   │   ├── AIRecommendationsPanel.tsx
│   │   ├── InstitutionFilters.tsx
│   │   ├── InstitutionCard.tsx
│   │   ├── PlacementInsightsPanel.tsx
│   │   ├── DatabaseReporting.tsx
│   │   └── institutionData.ts
│   ├── InstitutionalProfiles.tsx
│   ├── InteractiveAI.tsx
│   └── ui/ (shadcn/ui components)
├── pages/
│   ├── Institutions.tsx
│   ├── InteractiveAI.tsx
│   └── ...
└── App.tsx
```

## 🏫 Supported Institutions

### Universities (8)
- University of Nairobi
- Kenyatta University
- JKUAT
- Strathmore University
- Kabarak University
- Mount Kenya University
- USIU
- Catholic University of Eastern Africa

### National Polytechnics (3)
- Kenya Polytechnic University College
- Mombasa Polytechnic University College
- Eldoret National Polytechnic

### TVET Institutions (6)
- Machakos Institute of Technology
- Kisumu National Polytechnic
- Rift Valley Institute of Science & Technology
- St. Kizito Vocational Training Centre
- Kiambu Institute of Science & Technology
- Coast Institute of Technology

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

## 📱 Features by User Role

### Students
- AI-powered competency assessment
- Institution comparison and selection
- Real-time placement tracking
- Personalized pathway recommendations
- Gamification with skill badges

### Parents
- Child's competency results visibility
- Institution comparison tools
- Placement status tracking
- Educational journey support

### Educators
- Student competency insights
- Institutional trend analysis
- Guidance tools and resources
- Performance tracking

### Administrators
- Student bid dashboards
- Intake strategy tools
- Institutional profile management
- Capacity planning

### Policymakers
- Placement trend visibility
- Policy impact analysis
- Education planning data
- System-wide insights

## 📊 Database Schema

### Institution Interface
```typescript
interface Institution {
  id: number;
  name: string;
  sector: string;
  location: string;
  rating: number;
  students: string;
  kuccpsCode: string;
  cutoffPoints: { min: string; max: string; avg: string };
  cbaRequirement: string;
  openings: number;
  clusters: string[];
  programs: string[];
  helbEligible: boolean;
  scholarships: string[];
  facilities: string[];
}
```

## 🔄 Data Sources

- KUCCPS institutional data
- KNEC CBA framework guidelines
- HELB eligibility records
- Ministry of Education databases
- Institutional websites and profiles

## 📈 Analytics & Reporting

### Available Reports
- Institutional database (CSV format)
- Detailed analytics report
- Sector distribution analysis
- CBA level distribution
- Regional capacity analysis
- HELB eligibility statistics

### Key Metrics
- Total institutions: 17
- Total capacity: 45,000+ students
- Average rating: 4.2/5.0
- HELB eligible: 100%

## 🛡️ Privacy & Security

- Data anonymization protocols
- Secure student information handling
- GDPR-compliant data processing
- Ethical AI implementation
- Role-based access control

## 🎮 Gamification Features

- Skill badges for milestone completion
- Progress tracking and visualization
- Achievement unlocking system
- Leaderboards and competitions
- Reward and incentive programs

## 🔮 Future Enhancements

- Machine learning model improvements
- Additional institutional partnerships
- Mobile application development
- Advanced analytics dashboard
- Integration with more educational systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Refer to the troubleshooting documentation

## 🌍 Deployment

The platform can be deployed on various hosting platforms:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

## 📞 Contact

- Project Maintainer: Career Vision Team
- Email: support@careervision.ke
- Website: https://careervision.ke

---

**Built for Kenya's educational future with ❤️**
