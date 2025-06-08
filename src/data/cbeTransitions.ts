
// CBE Pathway Transitions and Examination Bodies Data
export interface ExaminationBody {
  id: string;
  name: string;
  acronym: string;
  role: string;
  targetGroup: string;
  assessmentType: string;
  credentialsIssued: string[];
  responsibilities: string[];
  focus: string[];
}

export interface TransitionPathway {
  id: string;
  fromLevel: string;
  toLevel: string;
  requirements: string[];
  assessmentCriteria: string;
  placementMechanism: string;
  examinationBody: string;
  timeframe: string;
}

export interface TertiaryInstitution {
  id: string;
  name: string;
  type: 'University' | 'TVET' | 'Polytechnic' | 'Professional College';
  pathwaysAccepted: string[];
  entryRequirements: string[];
  programs: string[];
  certificationLevel: string;
}

export const examinationBodies: ExaminationBody[] = [
  {
    id: 'knec',
    name: 'Kenya National Examinations Council',
    acronym: 'KNEC',
    role: 'Sole examining and certification body for Basic Education (Grades 1–12) under CBC',
    targetGroup: 'Grade 1–12 learners',
    assessmentType: 'CBA, SBA, Summative Exams',
    credentialsIssued: ['SSCE', 'KPSEA', 'Transition Certificates'],
    responsibilities: [
      'Develops and administers Classroom-Based Assessments (CBA)',
      'Manages School-Based Assessments (SBA)',
      'Conducts KPSEA (Grade 6), Grade 9 transition, Grade 12 exit exams',
      'Certifies Senior School Certificate of Education (SSCE)'
    ],
    focus: ['Competency-based assessments in foundational academic education']
  },
  {
    id: 'tvet-cdacc',
    name: 'Technical and Vocational Education and Training CDACC',
    acronym: 'TVET CDACC',
    role: 'Curriculum development, assessment, and certification for CBET in TVET institutions',
    targetGroup: 'TVET learners',
    assessmentType: 'CBET modular assessments',
    credentialsIssued: ['Competency Certificate', 'CBET Transcript'],
    responsibilities: [
      'Develops Occupational Standards with industries',
      'Designs Competency-Based Curricula',
      'Trains and accredits Assessors and Verifiers',
      'Administers competency-based assessments (modular)',
      'Issues CBET certificates and transcripts'
    ],
    focus: [
      'Practical, industry-aligned skills',
      'Mastery of workplace competencies',
      'Modular progression for flexible learning'
    ]
  },
  {
    id: 'nita',
    name: 'National Industrial Training Authority',
    acronym: 'NITA',
    role: 'Industrial training and certification for artisans and technicians',
    targetGroup: 'Informal/Artisan sector',
    assessmentType: 'Trade Tests',
    credentialsIssued: ['NITA Grade I, II, III Certificates'],
    responsibilities: [
      'Registers and regulates industrial trainers',
      'Conducts trade tests for levels I, II, III',
      'Issues NITA trade test certificates',
      'Coordinates Recognition of Prior Learning (RPL)'
    ],
    focus: [
      'Blue-collar and semi-formal sector skill certification',
      'Trades: masonry, tailoring, plumbing, welding'
    ]
  },
  {
    id: 'kasneb',
    name: 'Kenya Accountants and Secretaries National Examinations Board',
    acronym: 'KASNEB',
    role: 'Professional certification in business and finance',
    targetGroup: 'Business & Finance professionals',
    assessmentType: 'Modular & Professional Exams',
    credentialsIssued: ['CPA', 'ATD', 'CS', 'DICT'],
    responsibilities: [
      'Examines and certifies professionals in Accounting, Auditing, Finance, ICT, Business',
      'Administers Certificate → Diploma → Professional progression',
      'Maintains professional standards'
    ],
    focus: [
      'Competency-Based Curricula alignment',
      'Employability and self-employment enhancement'
    ]
  }
];

export const transitionPathways: TransitionPathway[] = [
  {
    id: 'jss-to-sss',
    fromLevel: 'Junior Secondary School (Grade 9)',
    toLevel: 'Senior Secondary School (Grade 10)',
    requirements: [
      'Complete JSS curriculum (Grades 7-9)',
      'Competency demonstration in core areas',
      'Career guidance participation',
      'Pathway preference submission'
    ],
    assessmentCriteria: '60% School-Based Assessments + 40% KNEC National Assessment',
    placementMechanism: 'Pathway-based placement using strengths, interests, and performance',
    examinationBody: 'KNEC',
    timeframe: 'End of Grade 9'
  },
  {
    id: 'sss-to-university',
    fromLevel: 'Senior Secondary School (Grade 12)',
    toLevel: 'University Education',
    requirements: [
      'SSCE with pathway-relevant subjects',
      'Minimum cluster points for specific programs',
      'KUCCPS application completion'
    ],
    assessmentCriteria: '60% Continuous Assessment (Grades 10-12) + 40% National Exit Exams',
    placementMechanism: 'KUCCPS centralized placement system',
    examinationBody: 'KNEC',
    timeframe: 'After Grade 12 completion'
  },
  {
    id: 'sss-to-tvet',
    fromLevel: 'Senior Secondary School (Grade 12)',
    toLevel: 'TVET Institutions',
    requirements: [
      'SSCE certificate',
      'Relevant pathway background',
      'Institution-specific requirements'
    ],
    assessmentCriteria: 'SSCE performance + practical skill demonstration',
    placementMechanism: 'KUCCPS with increased flexibility for TVET',
    examinationBody: 'TVET CDACC',
    timeframe: 'After Grade 12 or direct entry'
  },
  {
    id: 'sss-to-polytechnic',
    fromLevel: 'Senior Secondary School (Grade 12)',
    toLevel: 'National Polytechnics',
    requirements: [
      'High-performing STEM or TVET background',
      'Technical aptitude demonstration',
      'Meet polytechnic entry standards'
    ],
    assessmentCriteria: 'SSCE + technical competency assessment',
    placementMechanism: 'Competitive selection with practical tests',
    examinationBody: 'TVET CDACC',
    timeframe: 'After Grade 12'
  }
];

export const tertiaryInstitutions: TertiaryInstitution[] = [
  {
    id: 'public-universities',
    name: 'Public Universities',
    type: 'University',
    pathwaysAccepted: ['STEM', 'Social Sciences & Arts'],
    entryRequirements: [
      'SSCE with minimum grade requirements',
      'Cluster points for specific programs',
      'KUCCPS placement'
    ],
    programs: [
      'Medicine', 'Engineering', 'Law', 'Business', 'Education',
      'Computer Science', 'Agriculture', 'Veterinary Medicine'
    ],
    certificationLevel: 'Bachelor\'s, Master\'s, PhD'
  },
  {
    id: 'tvet-colleges',
    name: 'TVET Colleges',
    type: 'TVET',
    pathwaysAccepted: ['TVET', 'Sports & Performing Arts', 'All pathways with interest'],
    entryRequirements: [
      'SSCE or equivalent',
      'Basic competency in chosen field',
      'Practical skill demonstration'
    ],
    programs: [
      'Electrical Installation', 'Plumbing', 'Carpentry', 'Welding',
      'Fashion Design', 'Catering', 'Auto Mechanics', 'ICT'
    ],
    certificationLevel: 'Certificate, Diploma, Higher Diploma'
  },
  {
    id: 'national-polytechnics',
    name: 'National Polytechnics',
    type: 'Polytechnic',
    pathwaysAccepted: ['STEM', 'TVET'],
    entryRequirements: [
      'High SSCE performance',
      'Strong technical foundation',
      'Competitive entrance assessment'
    ],
    programs: [
      'Civil Engineering Technology', 'Mechanical Engineering Technology',
      'Electrical Engineering Technology', 'ICT', 'Mechatronics'
    ],
    certificationLevel: 'Diploma, Higher Diploma, Bachelor of Technology'
  },
  {
    id: 'professional-colleges',
    name: 'Professional Colleges',
    type: 'Professional College',
    pathwaysAccepted: ['Social Sciences & Arts', 'STEM'],
    entryRequirements: [
      'SSCE with relevant subjects',
      'Professional aptitude assessment',
      'Interview process'
    ],
    programs: [
      'Nursing', 'Clinical Medicine', 'Teaching', 'Journalism',
      'Pharmacy', 'Laboratory Technology'
    ],
    certificationLevel: 'Certificate, Diploma, Bachelor\'s'
  }
];

export const responsibleAIGuidelines = {
  principles: [
    'Fairness: All AI recommendations are explainable and auditable',
    'Transparency: Learners can view why a pathway was recommended',
    'Non-discrimination: No bias based on gender, region, or school type',
    'Human oversight: Final decisions reviewed by teachers/counselors',
    'Privacy: Student data protection and consent enforcement',
    'Accuracy: Regular validation of AI predictions and recommendations'
  ],
  ethicalConsiderations: [
    'Ensure diverse training data representation',
    'Regular bias testing and mitigation',
    'Clear explanation of AI decision-making process',
    'Option for human review of all AI recommendations',
    'Transparent data usage and storage policies'
  ],
  safeguards: [
    'Multiple validation layers for recommendations',
    'Parental consent for underage learners',
    'Data anonymization and encryption',
    'Regular algorithm audits for fairness',
    'Clear opt-out mechanisms for AI features'
  ]
};
