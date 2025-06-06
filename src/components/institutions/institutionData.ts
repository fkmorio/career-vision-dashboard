
export interface Institution {
  id: number;
  name: string;
  logo: string;
  sector: string;
  location: string;
  rating: number;
  students: string;
  description: string;
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

export const kenyanInstitutions: Institution[] = [
  // Universities (existing)
  {
    id: 1,
    name: 'University of Nairobi',
    logo: '/placeholder.svg',
    sector: 'Public University',
    location: 'Nairobi',
    rating: 4.6,
    students: '84,000+',
    description: 'Kenya\'s premier university offering comprehensive programs across all disciplines.',
    kuccpsCode: '01100',
    cutoffPoints: { min: 'C+', max: 'A-', avg: 'B' },
    cbaRequirement: 'level3',
    openings: 8500,
    clusters: ['Medicine & Health Sciences', 'Engineering', 'Business', 'Arts & Humanities'],
    programs: ['Medicine', 'Engineering', 'Law', 'Business', 'Education'],
    helbEligible: true,
    scholarships: ['Government Scholarships', 'Merit-based Awards', 'Need-based Support'],
    facilities: ['Research Labs', 'Digital Library', 'Teaching Hospital', 'Innovation Hub']
  },
  {
    id: 2,
    name: 'Kenyatta University',
    logo: '/placeholder.svg',
    sector: 'Public University',
    location: 'Kahawa, Nairobi',
    rating: 4.4,
    students: '70,000+',
    description: 'Leading institution in education, health sciences, and applied sciences.',
    kuccpsCode: '01200',
    cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
    cbaRequirement: 'level3',
    openings: 7200,
    clusters: ['Education', 'Health Sciences', 'Pure & Applied Sciences', 'Economics & Business'],
    programs: ['Education', 'Nursing', 'Medicine', 'Engineering', 'Business'],
    helbEligible: true,
    scholarships: ['HELB Loans', 'University Scholarships', 'Research Grants'],
    facilities: ['Teaching Hospital', 'Science Labs', 'Sports Complex', 'Conference Centre']
  },
  {
    id: 3,
    name: 'Jomo Kenyatta University (JKUAT)',
    logo: '/placeholder.svg',
    sector: 'Public University',
    location: 'Juja, Kiambu',
    rating: 4.5,
    students: '40,000+',
    description: 'Technology-focused university specializing in engineering, technology, and agriculture.',
    kuccpsCode: '01300',
    cutoffPoints: { min: 'B-', max: 'A-', avg: 'B' },
    cbaRequirement: 'level3',
    openings: 5800,
    clusters: ['Engineering', 'Agriculture', 'Health Sciences', 'Architecture & Building Sciences'],
    programs: ['Engineering', 'ICT', 'Agriculture', 'Architecture', 'Medicine'],
    helbEligible: true,
    scholarships: ['STEM Scholarships', 'Innovation Awards', 'Industry Partnerships'],
    facilities: ['Engineering Labs', 'Research Centers', 'Incubation Hub', 'Modern Library']
  },
  {
    id: 4,
    name: 'Strathmore University',
    logo: '/placeholder.svg',
    sector: 'Private University',
    location: 'Nairobi',
    rating: 4.8,
    students: '15,000+',
    description: 'Premier private university known for business, ICT, and professional programs.',
    kuccpsCode: '02100',
    cutoffPoints: { min: 'B', max: 'A', avg: 'B+' },
    cbaRequirement: 'level4',
    openings: 3200,
    clusters: ['Business & Economics', 'ICT', 'Law', 'Humanities & Social Sciences'],
    programs: ['Business', 'ICT', 'Law', 'Actuarial Science', 'Development Studies'],
    helbEligible: true,
    scholarships: ['Merit Scholarships', 'Needs-based Bursaries', 'Alumni Scholarships'],
    facilities: ['Business Incubator', 'ICT Labs', 'Moot Court', 'Executive Centre']
  },
  {
    id: 5,
    name: 'Kabarak University',
    logo: '/placeholder.svg',
    sector: 'Private University',
    location: 'Nakuru',
    rating: 4.3,
    students: '12,000+',
    description: 'Faith-based university offering holistic education with strong moral foundation.',
    kuccpsCode: '02200',
    cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
    cbaRequirement: 'level2',
    openings: 2800,
    clusters: ['Education', 'Business', 'Health Sciences', 'Engineering & Technology'],
    programs: ['Education', 'Business', 'Nursing', 'Engineering', 'Computer Science'],
    helbEligible: true,
    scholarships: ['Church Scholarships', 'Academic Excellence Awards', 'Sports Scholarships'],
    facilities: ['Modern Labs', 'Teaching Hospital', 'Conference Center', 'Sports Complex']
  },
  {
    id: 6,
    name: 'Mount Kenya University',
    logo: '/placeholder.svg',
    sector: 'Private University',
    location: 'Thika (Multiple Campuses)',
    rating: 4.2,
    students: '45,000+',
    description: 'Fast-growing private university with multiple campuses across Kenya.',
    kuccpsCode: '02300',
    cutoffPoints: { min: 'C', max: 'B', avg: 'C+' },
    cbaRequirement: 'level2',
    openings: 6500,
    clusters: ['Business', 'Health Sciences', 'Education', 'Pure & Applied Sciences'],
    programs: ['Business', 'Medicine', 'Nursing', 'Education', 'Agriculture'],
    helbEligible: true,
    scholarships: ['Merit Scholarships', 'Regional Bursaries', 'Professional Development Awards'],
    facilities: ['Multiple Campuses', 'Clinical Training Sites', 'Research Centers', 'Digital Library']
  },
  {
    id: 7,
    name: 'United States International University',
    logo: '/placeholder.svg',
    sector: 'Private University',
    location: 'Nairobi',
    rating: 4.7,
    students: '8,000+',
    description: 'American-style liberal arts university offering international standard education.',
    kuccpsCode: '02400',
    cutoffPoints: { min: 'B-', max: 'A', avg: 'B' },
    cbaRequirement: 'level3',
    openings: 1800,
    clusters: ['Business', 'Liberal Arts', 'ICT', 'International Relations'],
    programs: ['International Business', 'Psychology', 'ICT', 'International Relations'],
    helbEligible: true,
    scholarships: ['Academic Merit Scholarships', 'International Exchange Programs', 'Leadership Awards'],
    facilities: ['American-style Campus', 'Modern Library', 'Student Center', 'Research Labs']
  },
  {
    id: 8,
    name: 'Catholic University of Eastern Africa',
    logo: '/placeholder.svg',
    sector: 'Private University',
    location: 'Nairobi',
    rating: 4.4,
    students: '10,000+',
    description: 'Catholic university providing quality education with ethical foundation.',
    kuccpsCode: '02500',
    cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
    cbaRequirement: 'level2',
    openings: 2200,
    clusters: ['Arts & Social Sciences', 'Education', 'Business', 'Theology'],
    programs: ['Social Work', 'Education', 'Business', 'Theology', 'Development Studies'],
    helbEligible: true,
    scholarships: ['Catholic Church Scholarships', 'Social Justice Awards', 'Academic Excellence'],
    facilities: ['Chapel', 'Community Service Centers', 'Library', 'Research Centers']
  },

  // National Polytechnics
  {
    id: 9,
    name: 'Kenya Polytechnic University College',
    logo: '/placeholder.svg',
    sector: 'National Polytechnic',
    location: 'Nairobi',
    rating: 4.1,
    students: '25,000+',
    description: 'Premier national polytechnic offering technical and vocational education.',
    kuccpsCode: '03100',
    cutoffPoints: { min: 'C-', max: 'B-', avg: 'C' },
    cbaRequirement: 'level2',
    openings: 4500,
    clusters: ['Engineering Technology', 'ICT', 'Business Technology', 'Applied Sciences'],
    programs: ['Mechanical Engineering Technology', 'Electrical Engineering', 'ICT', 'Business Studies'],
    helbEligible: true,
    scholarships: ['TVET Scholarships', 'Industry Partnerships', 'Skills Development Grants'],
    facilities: ['Engineering Workshops', 'ICT Labs', 'Innovation Center', 'Industry Links']
  },
  {
    id: 10,
    name: 'Mombasa Polytechnic University College',
    logo: '/placeholder.svg',
    sector: 'National Polytechnic',
    location: 'Mombasa',
    rating: 4.0,
    students: '18,000+',
    description: 'Leading coastal polytechnic specializing in marine and port technology.',
    kuccpsCode: '03200',
    cutoffPoints: { min: 'C-', max: 'C+', avg: 'C' },
    cbaRequirement: 'level2',
    openings: 3200,
    clusters: ['Marine Technology', 'Port Management', 'Engineering Technology', 'Business'],
    programs: ['Marine Engineering', 'Port Operations', 'Logistics', 'Mechanical Technology'],
    helbEligible: true,
    scholarships: ['Coastal Development Fund', 'Maritime Scholarships', 'Port Authority Grants'],
    facilities: ['Marine Workshops', 'Port Simulation Lab', 'Engineering Labs', 'Research Center']
  },
  {
    id: 11,
    name: 'Eldoret National Polytechnic',
    logo: '/placeholder.svg',
    sector: 'National Polytechnic',
    location: 'Eldoret',
    rating: 3.9,
    students: '15,000+',
    description: 'Regional polytechnic focusing on agricultural and engineering technology.',
    kuccpsCode: '03300',
    cutoffPoints: { min: 'D+', max: 'C+', avg: 'C-' },
    cbaRequirement: 'level2',
    openings: 2800,
    clusters: ['Agricultural Technology', 'Engineering', 'Business Studies', 'Applied Sciences'],
    programs: ['Agricultural Engineering', 'Food Technology', 'Civil Engineering', 'Business'],
    helbEligible: true,
    scholarships: ['Agricultural Development Fund', 'Regional Scholarships', 'Farmer Support Grants'],
    facilities: ['Agricultural Labs', 'Food Processing Plant', 'Engineering Workshops', 'Demo Farm']
  },

  // Public TVET Institutions
  {
    id: 12,
    name: 'Machakos Institute of Technology',
    logo: '/placeholder.svg',
    sector: 'Public TVET',
    location: 'Machakos',
    rating: 3.8,
    students: '8,000+',
    description: 'Public TVET institution offering practical technical skills training.',
    kuccpsCode: '04100',
    cutoffPoints: { min: 'D', max: 'C', avg: 'D+' },
    cbaRequirement: 'level1',
    openings: 1800,
    clusters: ['Engineering Technology', 'ICT', 'Building & Construction', 'Business'],
    programs: ['Electrical Installation', 'Plumbing', 'Computer Studies', 'Accounting'],
    helbEligible: true,
    scholarships: ['TVET Bursaries', 'Skills Development Fund', 'County Scholarships'],
    facilities: ['Technical Workshops', 'Computer Labs', 'Construction Yard', 'Business Center']
  },
  {
    id: 13,
    name: 'Kisumu National Polytechnic',
    logo: '/placeholder.svg',
    sector: 'Public TVET',
    location: 'Kisumu',
    rating: 4.0,
    students: '12,000+',
    description: 'Western Kenya\'s leading TVET institution for technical education.',
    kuccpsCode: '04200',
    cutoffPoints: { min: 'D+', max: 'C+', avg: 'C-' },
    cbaRequirement: 'level2',
    openings: 2500,
    clusters: ['Engineering Technology', 'ICT', 'Applied Sciences', 'Business Technology'],
    programs: ['Mechanical Engineering', 'Electronics', 'Laboratory Technology', 'Hospitality'],
    helbEligible: true,
    scholarships: ['Lake Region Development Fund', 'Technical Skills Grants', 'Industry Partnerships'],
    facilities: ['Modern Workshops', 'Science Labs', 'Hospitality Training Center', 'ICT Center']
  },
  {
    id: 14,
    name: 'Rift Valley Institute of Science & Technology',
    logo: '/placeholder.svg',
    sector: 'Public TVET',
    location: 'Nakuru',
    rating: 3.7,
    students: '10,000+',
    description: 'Regional TVET college specializing in science and technology programs.',
    kuccpsCode: '04300',
    cutoffPoints: { min: 'D', max: 'C', avg: 'D+' },
    cbaRequirement: 'level1',
    openings: 2200,
    clusters: ['Applied Sciences', 'Engineering Technology', 'ICT', 'Agriculture Technology'],
    programs: ['Laboratory Technology', 'Environmental Science', 'Automotive Technology', 'ICT'],
    helbEligible: true,
    scholarships: ['Science & Technology Fund', 'Regional Bursaries', 'Skills Enhancement Grants'],
    facilities: ['Science Laboratories', 'Automotive Workshop', 'Environmental Lab', 'ICT Suite']
  },

  // Private TVET Institutions
  {
    id: 15,
    name: 'St. Kizito Vocational Training Centre',
    logo: '/placeholder.svg',
    sector: 'Private TVET',
    location: 'Nairobi',
    rating: 4.2,
    students: '3,500+',
    description: 'Faith-based TVET institution providing quality vocational training.',
    kuccpsCode: '05100',
    cutoffPoints: { min: 'D', max: 'C+', avg: 'C-' },
    cbaRequirement: 'level1',
    openings: 800,
    clusters: ['Engineering Technology', 'ICT', 'Business Studies', 'Social Work'],
    programs: ['Electrical Technology', 'Computer Studies', 'Accounting', 'Social Work'],
    helbEligible: true,
    scholarships: ['Church Scholarships', 'Need-based Support', 'Academic Merit Awards'],
    facilities: ['Technical Workshops', 'Computer Lab', 'Chapel', 'Community Outreach Center']
  },
  {
    id: 16,
    name: 'Kiambu Institute of Science & Technology',
    logo: '/placeholder.svg',
    sector: 'Private TVET',
    location: 'Kiambu',
    rating: 3.9,
    students: '5,000+',
    description: 'Private technical college offering industry-focused training programs.',
    kuccpsCode: '05200',
    cutoffPoints: { min: 'D', max: 'C', avg: 'D+' },
    cbaRequirement: 'level1',
    openings: 1200,
    clusters: ['Engineering Technology', 'ICT', 'Business Technology', 'Health Technology'],
    programs: ['Mechanical Technology', 'Information Technology', 'Business Management', 'Medical Technology'],
    helbEligible: true,
    scholarships: ['Private Scholarships', 'Industry Sponsorships', 'Merit-based Awards'],
    facilities: ['Modern Workshops', 'IT Labs', 'Medical Technology Lab', 'Business Simulation Center']
  },
  {
    id: 17,
    name: 'Coast Institute of Technology',
    logo: '/placeholder.svg',
    sector: 'Private TVET',
    location: 'Mombasa',
    rating: 3.8,
    students: '4,200+',
    description: 'Coastal technical college specializing in marine and hospitality training.',
    kuccpsCode: '05300',
    cutoffPoints: { min: 'D', max: 'C+', avg: 'C-' },
    cbaRequirement: 'level1',
    openings: 950,
    clusters: ['Marine Technology', 'Hospitality & Tourism', 'ICT', 'Business Studies'],
    programs: ['Marine Engineering', 'Hotel Management', 'Tourism Management', 'ICT'],
    helbEligible: true,
    scholarships: ['Tourism Board Scholarships', 'Marine Industry Grants', 'Coastal Development Fund'],
    facilities: ['Marine Training Center', 'Hospitality Training Kitchen', 'Computer Labs', 'Tourism Center']
  },
  {
    id: 18,
    name: 'Kabarak University TVET',
    logo: '/placeholder.svg',
    sector: 'Private TVET',
    location: 'Nakuru',
    rating: 4.3,
    students: '3,800+',
    description: 'Faith-based technical training institution with emphasis on practical skills and ethical leadership.',
    kuccpsCode: '05400',
    cutoffPoints: { min: 'D+', max: 'C', avg: 'C-' },
    cbaRequirement: 'level2',
    openings: 1050,
    clusters: ['Technical Education', 'Hospitality & Tourism', 'Agriculture Technology', 'Business Technology'],
    programs: ['Technical Education', 'Hospitality Management', 'Agricultural Technology', 'Business Technology'],
    helbEligible: true,
    scholarships: ['Faith-based Scholarships', 'Skills Development Fund', 'Leadership Awards'],
    facilities: ['Modern Technical Labs', 'Hospitality Training Center', 'Agricultural Technology Center', 'Business Innovation Hub']
  }
];

export const cbaLevels = {
  level4: { range: '17-20', performance: 'Exceeding Expectation', color: 'bg-green-100 text-green-800' },
  level3: { range: '12-16', performance: 'Meeting Expectation', color: 'bg-blue-100 text-blue-800' },
  level2: { range: '07-11', performance: 'Approaching Expectation', color: 'bg-yellow-100 text-yellow-800' },
  level1: { range: '00-06', performance: 'Below Expectation', color: 'bg-red-100 text-red-800' }
};

export const aiRecommendations = {
  topMatches: [
    { institution: 'University of Nairobi', match: 92, reason: 'Strong STEM performance aligns with Engineering programs', cbaLevel: 'level4' },
    { institution: 'JKUAT', match: 88, reason: 'Technology interests match university specialization', cbaLevel: 'level3' },
    { institution: 'Strathmore University', match: 75, reason: 'Leadership skills suit business programs', cbaLevel: 'level4' },
    { institution: 'Kenya Polytechnic University College', match: 85, reason: 'Practical skills align with technical programs', cbaLevel: 'level2' },
    { institution: 'Machakos Institute of Technology', match: 70, reason: 'Hands-on learning suits vocational interests', cbaLevel: 'level1' }
  ],
  competencyAlignment: {
    'Mathematics & Sciences': 'Engineering & Technology Programs',
    'Practical Skills': 'TVET & Polytechnic Programs',
    'Languages & Communication': 'Business & Social Sciences',
    'Creative Arts': 'Design & Media Programs'
  }
};

// Database and reporting data
export const institutionalDatabase = {
  totalInstitutions: kenyanInstitutions.length,
  sectorBreakdown: {
    'Public University': kenyanInstitutions.filter(i => i.sector === 'Public University').length,
    'Private University': kenyanInstitutions.filter(i => i.sector === 'Private University').length,
    'National Polytechnic': kenyanInstitutions.filter(i => i.sector === 'National Polytechnic').length,
    'Public TVET': kenyanInstitutions.filter(i => i.sector === 'Public TVET').length,
    'Private TVET': kenyanInstitutions.filter(i => i.sector === 'Private TVET').length,
  },
  totalCapacity: kenyanInstitutions.reduce((sum, inst) => sum + inst.openings, 0),
  averageRating: (kenyanInstitutions.reduce((sum, inst) => sum + inst.rating, 0) / kenyanInstitutions.length).toFixed(1),
  helbEligibleCount: kenyanInstitutions.filter(i => i.helbEligible).length,
  cbaLevelDistribution: {
    'level4': kenyanInstitutions.filter(i => i.cbaRequirement === 'level4').length,
    'level3': kenyanInstitutions.filter(i => i.cbaRequirement === 'level3').length,
    'level2': kenyanInstitutions.filter(i => i.cbaRequirement === 'level2').length,
    'level1': kenyanInstitutions.filter(i => i.cbaRequirement === 'level1').length,
  },
  regionalDistribution: {
    'Nairobi': kenyanInstitutions.filter(i => i.location.includes('Nairobi')).length,
    'Central Kenya': kenyanInstitutions.filter(i => ['Kiambu', 'Thika', 'Machakos'].some(region => i.location.includes(region))).length,
    'Coast': kenyanInstitutions.filter(i => i.location.includes('Mombasa')).length,
    'Western': kenyanInstitutions.filter(i => i.location.includes('Kisumu')).length,
    'Rift Valley': kenyanInstitutions.filter(i => ['Nakuru', 'Eldoret'].some(region => i.location.includes(region))).length,
  }
};
