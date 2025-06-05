
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
    { institution: 'Strathmore University', match: 75, reason: 'Leadership skills suit business programs', cbaLevel: 'level4' }
  ],
  competencyAlignment: {
    'Mathematics': 'Engineering & Technology Programs',
    'Sciences': 'Health Sciences & Research',
    'Languages': 'Law & International Relations'
  }
};
