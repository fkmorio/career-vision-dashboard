
export const interests = [
  { id: 'science', label: 'Science & Technology', icon: '🔬' },
  { id: 'mathematics', label: 'Mathematics', icon: '📊' },
  { id: 'arts', label: 'Arts & Design', icon: '🎨' },
  { id: 'sports', label: 'Sports & Physical Education', icon: '⚽' },
  { id: 'social', label: 'Social Studies', icon: '🌍' },
  { id: 'languages', label: 'Languages & Literature', icon: '📚' },
  { id: 'business', label: 'Business & Entrepreneurship', icon: '💼' },
  { id: 'agriculture', label: 'Agriculture & Environment', icon: '🌱' }
];

export const pathways = [
  {
    id: 'stem',
    title: 'Science, Technology, Engineering & Mathematics (STEM)',
    description: 'Focus on scientific and technical disciplines',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Engineering'],
    careers: ['Engineer', 'Doctor', 'Scientist', 'IT Specialist', 'Researcher', 'Mathematician'],
    duration: '4-6 years',
    icon: '🔬',
    minKcseGrade: 'B (60-79%)',
    competencyLevel: 'Very Good'
  },
  {
    id: 'social',
    title: 'Social Sciences',
    description: 'Study of society, human behavior, and relationships',
    subjects: ['History', 'Geography', 'Economics', 'Psychology', 'Sociology', 'Political Science'],
    careers: ['Lawyer', 'Economist', 'Social Worker', 'Diplomat', 'Journalist', 'Public Administrator'],
    duration: '3-5 years',
    icon: '🌍',
    minKcseGrade: 'C (50-59%)',
    competencyLevel: 'Good - Fairly Competent'
  },
  {
    id: 'arts-sports',
    title: 'Arts & Sports Science',
    description: 'Creative arts, sports, and physical education',
    subjects: ['Art & Design', 'Music', 'Drama', 'Physical Education', 'Sports Science', 'Literature'],
    careers: ['Artist', 'Musician', 'Coach', 'Sports Therapist', 'Designer', 'Writer'],
    duration: '3-4 years',
    icon: '🎨',
    minKcseGrade: 'C (50-59%)',
    competencyLevel: 'Good - Fairly Competent'
  }
];

export const institutionTypes = [
  {
    id: 'university',
    title: 'Universities',
    description: 'Public and private universities offering degree programs',
    examples: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'USIU-Africa'],
    programs: ['Bachelor\'s Degrees', 'Master\'s Programs', 'PhD Programs'],
    duration: '4-6 years',
    requirements: 'KCSE Grade B (60-79%) - Very Good Competency',
    gradingAlignment: 'CBC Grade B and above for most programs'
  },
  {
    id: 'tvet',
    title: 'TVET Institutions',
    description: 'Technical and Vocational Education and Training colleges',
    examples: ['Kenya Institute of Management', 'Rift Valley Institute', 'Coast Institute of Technology'],
    programs: ['Diplomas', 'Certificates', 'Artisan Courses'],
    duration: '1-3 years',
    requirements: 'KCSE Grade D (40-49%) - Sufficient/Pass Competency',
    gradingAlignment: 'CBC Grade D minimum - basic competency required'
  },
  {
    id: 'polytechnic',
    title: 'National Polytechnics',
    description: 'Technical institutions focusing on engineering and applied sciences',
    examples: ['Kenya Polytechnic', 'Mombasa Polytechnic', 'Eldoret Polytechnic'],
    programs: ['Engineering Diplomas', 'Applied Sciences', 'Technical Certificates'],
    duration: '2-4 years',
    requirements: 'KCSE Grade C (50-59%) - Good/Fairly Competent',
    gradingAlignment: 'CBC Grade C for technical programs - fair competency in core subjects'
  }
];

export const cbcGradingSystem = {
  grades: [
    {
      grade: 'A',
      markRange: '80% and above',
      quality: 'Excellent',
      competency: 'Competent',
      description: 'Exceptional performance demonstrating mastery of competencies'
    },
    {
      grade: 'B',
      markRange: '60-79%',
      quality: 'Very Good',
      competency: 'Competent',
      description: 'Above average performance with good grasp of competencies'
    },
    {
      grade: 'C',
      markRange: '50-59%',
      quality: 'Good',
      competency: 'Fairly Competent',
      description: 'Satisfactory performance with adequate understanding'
    },
    {
      grade: 'D',
      markRange: '40-49%',
      quality: 'Sufficient/Pass',
      competency: 'Fairly Competent',
      description: 'Minimum acceptable performance for progression'
    },
    {
      grade: 'E',
      markRange: 'Below 40%',
      quality: 'Not Sufficient/Fail',
      competency: 'Not Yet Competent',
      description: 'Below minimum standards, requires intervention'
    }
  ]
};

export const steps = [
  { id: 1, title: 'Interests', description: 'Discover your passions' },
  { id: 2, title: 'Pathway', description: 'Choose academic direction' },
  { id: 3, title: 'Institution', description: 'Select institution type' },
  { id: 4, title: 'Goals', description: 'Set career objectives' },
  { id: 5, title: 'Action Plan', description: 'Your roadmap to success' }
];
