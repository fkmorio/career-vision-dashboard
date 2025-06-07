
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CBCCompetency {
  id: string;
  name: string;
  description: string;
  level: 'Emerging' | 'Developing' | 'Proficient' | 'Exceeding';
  evidence: string[];
  assessmentDate: Date;
}

export interface CBCPathway {
  id: string;
  name: 'STEM' | 'Social Sciences & Arts' | 'Sports & Performing Arts' | 'TVET';
  tracks: CBCTrack[];
  description: string;
  coreSubjects: string[];
  careerOpportunities: string[];
}

export interface CBCTrack {
  id: string;
  name: string;
  subjects: string[];
  careers: string[];
  prerequisites: string[];
}

export interface CBCAssessment {
  id: string;
  type: 'CBA' | 'SBA' | 'National';
  subject: string;
  grade: number;
  competencyLevel: number;
  feedback: string;
  createdAt: Date;
  portfolio: string[];
}

interface CBCContextType {
  pathways: CBCPathway[];
  competencies: CBCCompetency[];
  assessments: CBCAssessment[];
  currentPathway: CBCPathway | null;
  setCurrentPathway: (pathway: CBCPathway) => void;
  addAssessment: (assessment: Omit<CBCAssessment, 'id' | 'createdAt'>) => void;
  updateCompetency: (competencyId: string, level: CBCCompetency['level'], evidence: string[]) => void;
  getPathwayRecommendations: (userProfile: any) => CBCPathway[];
}

const CBCContext = createContext<CBCContextType | undefined>(undefined);

export const useCBC = () => {
  const context = useContext(CBCContext);
  if (context === undefined) {
    throw new Error('useCBC must be used within a CBCProvider');
  }
  return context;
};

interface CBCProviderProps {
  children: ReactNode;
}

export const CBCProvider: React.FC<CBCProviderProps> = ({ children }) => {
  const [pathways] = useState<CBCPathway[]>([
    {
      id: 'stem',
      name: 'STEM',
      description: 'Science, Technology, Engineering & Mathematics pathway for innovation-driven careers',
      coreSubjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
      careerOpportunities: ['Medical Doctor', 'Software Engineer', 'Research Scientist', 'Data Scientist'],
      tracks: [
        {
          id: 'pure-sciences',
          name: 'Pure Sciences',
          subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
          careers: ['Medical Doctor', 'Pharmacist', 'Research Scientist', 'Lab Technologist'],
          prerequisites: ['Strong performance in Integrated Science', 'Mathematics proficiency']
        },
        {
          id: 'tech-engineering',
          name: 'Technology & Engineering',
          subjects: ['Computer Science', 'Engineering Sciences', 'Technical Drawing', 'Robotics'],
          careers: ['Software Engineer', 'Mechanical Engineer', 'Robotics Technician'],
          prerequisites: ['Mathematics excellence', 'Problem-solving skills']
        }
      ]
    },
    {
      id: 'social-arts',
      name: 'Social Sciences & Arts',
      description: 'Humanities, languages, and creative arts for cultural and social engagement',
      coreSubjects: ['History', 'Geography', 'Languages', 'Literature', 'Creative Arts'],
      careerOpportunities: ['Lawyer', 'Journalist', 'Teacher', 'Artist', 'Diplomat'],
      tracks: [
        {
          id: 'humanities',
          name: 'Humanities & Social Sciences',
          subjects: ['History', 'Government', 'Geography', 'Religious Education', 'Psychology'],
          careers: ['Lawyer', 'Policy Analyst', 'Social Worker', 'Diplomat'],
          prerequisites: ['Strong communication skills', 'Critical thinking ability']
        },
        {
          id: 'creative-arts',
          name: 'Creative Arts',
          subjects: ['Fine Art', 'Design', 'Music', 'Dance', 'Drama'],
          careers: ['Graphic Designer', 'Music Producer', 'Theatre Director', 'Art Curator'],
          prerequisites: ['Artistic talent', 'Creativity demonstrated']
        }
      ]
    },
    {
      id: 'sports-tvet',
      name: 'Sports & Performing Arts',
      description: 'Physical education, performance arts, and technical vocational skills',
      coreSubjects: ['Physical Education', 'Music', 'Dance', 'Theatre Arts', 'Technical Skills'],
      careerOpportunities: ['Sports Coach', 'Performer', 'Technical Specialist', 'Event Manager'],
      tracks: [
        {
          id: 'sports-science',
          name: 'Sports Science',
          subjects: ['Physical Education', 'Coaching', 'Physiology', 'Sports Management'],
          careers: ['Sports Coach', 'Physiotherapist', 'Sports Psychologist', 'Event Manager'],
          prerequisites: ['Physical fitness', 'Leadership skills']
        },
        {
          id: 'tvet',
          name: 'Technical & Vocational',
          subjects: ['Woodwork', 'Metalwork', 'Electrical', 'Building Construction', 'Plumbing'],
          careers: ['Electrician', 'Plumber', 'Carpenter', 'Welding Technician'],
          prerequisites: ['Practical skills', 'Manual dexterity']
        }
      ]
    },
    {
      id: 'tvet-standalone',
      name: 'TVET',
      description: 'Dedicated Technical and Vocational Education pathway',
      coreSubjects: ['Applied Technology', 'Home Science', 'Agriculture', 'Business Studies'],
      careerOpportunities: ['Technician', 'Artisan', 'Entrepreneur', 'Agriculture Specialist'],
      tracks: [
        {
          id: 'applied-tech',
          name: 'Applied Technology',
          subjects: ['Electrical Installation', 'Mechanical Technology', 'Building Technology'],
          careers: ['Electrical Technician', 'Mechanical Technician', 'Construction Supervisor'],
          prerequisites: ['Technical aptitude', 'Problem-solving skills']
        },
        {
          id: 'agriculture',
          name: 'Agricultural Education',
          subjects: ['Agribusiness', 'Animal Production', 'Crop Science', 'Food Technology'],
          careers: ['Agronomist', 'Farm Manager', 'Agro-Entrepreneur', 'Food Technologist'],
          prerequisites: ['Interest in agriculture', 'Environmental awareness']
        }
      ]
    }
  ]);

  const [competencies, setCompetencies] = useState<CBCCompetency[]>([
    {
      id: 'comm',
      name: 'Communication',
      description: 'Ability to express ideas clearly and listen effectively',
      level: 'Proficient',
      evidence: ['Classroom presentations', 'Written assignments'],
      assessmentDate: new Date('2024-06-01')
    },
    {
      id: 'critical',
      name: 'Critical Thinking',
      description: 'Analyzing information and making reasoned decisions',
      level: 'Developing',
      evidence: ['Problem-solving tasks', 'Research projects'],
      assessmentDate: new Date('2024-06-05')
    },
    {
      id: 'creativity',
      name: 'Creativity',
      description: 'Generating innovative solutions and artistic expression',
      level: 'Exceeding',
      evidence: ['Art projects', 'Innovation challenges'],
      assessmentDate: new Date('2024-06-10')
    }
  ]);

  const [assessments, setAssessments] = useState<CBCAssessment[]>([
    {
      id: 'cba1',
      type: 'CBA',
      subject: 'Integrated Science',
      grade: 8,
      competencyLevel: 3,
      feedback: 'Shows good understanding of scientific concepts',
      createdAt: new Date('2024-06-01'),
      portfolio: ['Science experiment video', 'Lab report']
    }
  ]);

  const [currentPathway, setCurrentPathway] = useState<CBCPathway | null>(null);

  const addAssessment = (assessmentData: Omit<CBCAssessment, 'id' | 'createdAt'>) => {
    const newAssessment: CBCAssessment = {
      ...assessmentData,
      id: `assessment-${Date.now()}`,
      createdAt: new Date()
    };
    setAssessments(prev => [newAssessment, ...prev]);
  };

  const updateCompetency = (competencyId: string, level: CBCCompetency['level'], evidence: string[]) => {
    setCompetencies(prev => prev.map(comp =>
      comp.id === competencyId
        ? { ...comp, level, evidence, assessmentDate: new Date() }
        : comp
    ));
  };

  const getPathwayRecommendations = (userProfile: any): CBCPathway[] => {
    if (!userProfile) return pathways;

    // AI-driven pathway recommendation logic
    const recommendations = pathways.map(pathway => {
      let score = 0;
      
      // Cluster alignment
      if (userProfile.cluster === 'STEM' && pathway.name === 'STEM') score += 40;
      if (userProfile.cluster === 'Arts & Sports' && pathway.name === 'Sports & Performing Arts') score += 40;
      if (userProfile.cluster === 'Technical' && pathway.name === 'TVET') score += 40;
      if (userProfile.cluster === 'Humanities' && pathway.name === 'Social Sciences & Arts') score += 40;
      
      // Competency score alignment
      if (userProfile.competencyScore >= 85) score += 20;
      if (userProfile.competencyScore >= 90 && pathway.name === 'STEM') score += 10;
      
      // Interest-based scoring (mock logic)
      if (pathway.name === 'STEM' && userProfile.interests?.includes('science')) score += 15;
      if (pathway.name === 'Social Sciences & Arts' && userProfile.interests?.includes('arts')) score += 15;

      return { ...pathway, recommendationScore: score };
    }).sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0));

    return recommendations;
  };

  return (
    <CBCContext.Provider value={{
      pathways,
      competencies,
      assessments,
      currentPathway,
      setCurrentPathway,
      addAssessment,
      updateCompetency,
      getPathwayRecommendations
    }}>
      {children}
    </CBCContext.Provider>
  );
};
