
// Competency Based Assessment (CBA) data structure for CBC system
export interface CompetencyLevel {
  level: number;
  performance: string;
  markRange: string;
  description: string;
  recommendations: string[];
}

export interface LearningArea {
  id: string;
  name: string;
  description: string;
  keyCompetencies: string[];
  careerPathways: string[];
}

export interface AssessmentResult {
  learningAreaId: string;
  score: number;
  level: CompetencyLevel;
  strengths: string[];
  improvementAreas: string[];
}

export interface StudentProfile {
  upiNumber: string;
  name: string;
  grade: number;
  school: string;
  assessmentHistory: AssessmentResult[];
  interests: string[];
  parentalSupport: 'high' | 'medium' | 'low';
  specialNeeds?: string[];
}

export interface PathwayPrediction {
  pathwayId: string;
  confidence: number;
  reasoning: string[];
  requirements: string[];
  futureOpportunities: string[];
  improvementPlan: string[];
}

// CBC Competency Levels (Senior Secondary School)
export const competencyLevels: CompetencyLevel[] = [
  {
    level: 4,
    performance: 'Exceeding Expectation',
    markRange: '17-20 marks',
    description: 'Learner demonstrates mastery and can apply knowledge creatively',
    recommendations: [
      'Consider advanced pathways in this area',
      'Mentor other students',
      'Pursue leadership opportunities'
    ]
  },
  {
    level: 3,
    performance: 'Meeting Expectation',
    markRange: '12-16 marks',
    description: 'Learner demonstrates solid understanding and application',
    recommendations: [
      'Continue building on strengths',
      'Explore related career pathways',
      'Consider specialization in this area'
    ]
  },
  {
    level: 2,
    performance: 'Approaching Expectation',
    markRange: '07-11 marks',
    description: 'Learner shows developing understanding with support needed',
    recommendations: [
      'Focus on foundational skills',
      'Seek additional support from teachers',
      'Practice with real-world applications'
    ]
  },
  {
    level: 1,
    performance: 'Below Expectation',
    markRange: '00-06 marks',
    description: 'Learner requires significant intervention and support',
    recommendations: [
      'Intensive remedial support needed',
      'Alternative assessment methods',
      'Consider different learning approaches'
    ]
  }
];

// Learning Areas under CBC
export const learningAreas: LearningArea[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Numerical reasoning, problem-solving, and logical thinking',
    keyCompetencies: ['Problem Solving', 'Critical Thinking', 'Analytical Skills'],
    careerPathways: ['Engineering', 'Computer Science', 'Finance', 'Research']
  },
  {
    id: 'sciences',
    name: 'Integrated Science',
    description: 'Scientific inquiry, experimentation, and understanding of natural phenomena',
    keyCompetencies: ['Scientific Inquiry', 'Experimentation', 'Analysis'],
    careerPathways: ['Medicine', 'Engineering', 'Research', 'Environmental Science']
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Communication, literacy, and linguistic competence',
    keyCompetencies: ['Communication', 'Literacy', 'Cultural Awareness'],
    careerPathways: ['Journalism', 'Translation', 'Education', 'Diplomacy']
  },
  {
    id: 'social_studies',
    name: 'Social Studies',
    description: 'Understanding society, culture, and human relationships',
    keyCompetencies: ['Social Awareness', 'Cultural Competence', 'Civic Responsibility'],
    careerPathways: ['Law', 'Social Work', 'Public Administration', 'International Relations']
  },
  {
    id: 'creative_arts',
    name: 'Creative Arts',
    description: 'Artistic expression, creativity, and aesthetic appreciation',
    keyCompetencies: ['Creativity', 'Artistic Expression', 'Innovation'],
    careerPathways: ['Fine Arts', 'Design', 'Entertainment', 'Cultural Preservation']
  },
  {
    id: 'physical_education',
    name: 'Physical Education',
    description: 'Physical fitness, sports, and health awareness',
    keyCompetencies: ['Physical Fitness', 'Teamwork', 'Health Awareness'],
    careerPathways: ['Sports Medicine', 'Coaching', 'Recreation', 'Health Promotion']
  }
];

// AI Prediction Algorithm
export class CompetencyPredictor {
  private static instance: CompetencyPredictor;
  
  public static getInstance(): CompetencyPredictor {
    if (!CompetencyPredictor.instance) {
      CompetencyPredictor.instance = new CompetencyPredictor();
    }
    return CompetencyPredictor.instance;
  }

  // Secure data handling with anonymization
  private anonymizeData(profile: StudentProfile): Partial<StudentProfile> {
    return {
      grade: profile.grade,
      assessmentHistory: profile.assessmentHistory,
      interests: profile.interests,
      parentalSupport: profile.parentalSupport,
      specialNeeds: profile.specialNeeds
    };
  }

  // Main prediction algorithm
  public predictPathways(profile: StudentProfile): PathwayPrediction[] {
    const anonymizedProfile = this.anonymizeData(profile);
    const predictions: PathwayPrediction[] = [];

    // Analyze competency patterns
    const strengthAreas = this.identifyStrengths(profile.assessmentHistory);
    const interestAlignment = this.analyzeInterestAlignment(profile.interests, strengthAreas);
    
    // Generate predictions for each pathway
    learningAreas.forEach(area => {
      const confidence = this.calculateConfidence(area, profile.assessmentHistory, profile.interests);
      const reasoning = this.generateReasoning(area, profile.assessmentHistory, profile.interests);
      const requirements = this.getRequirements(area, profile.assessmentHistory);
      const opportunities = this.getFutureOpportunities(area);
      const improvementPlan = this.createImprovementPlan(area, profile.assessmentHistory);

      predictions.push({
        pathwayId: area.id,
        confidence,
        reasoning,
        requirements,
        futureOpportunities: opportunities,
        improvementPlan
      });
    });

    // Sort by confidence (highest first)
    return predictions.sort((a, b) => b.confidence - a.confidence);
  }

  private identifyStrengths(assessmentHistory: AssessmentResult[]): string[] {
    return assessmentHistory
      .filter(result => result.level.level >= 3)
      .map(result => result.learningAreaId);
  }

  private analyzeInterestAlignment(interests: string[], strengthAreas: string[]): number {
    // Simple alignment calculation - can be enhanced with ML
    const commonAreas = interests.filter(interest => 
      strengthAreas.some(strength => 
        interest.toLowerCase().includes(strength.toLowerCase())
      )
    );
    return commonAreas.length / Math.max(interests.length, 1);
  }

  private calculateConfidence(
    area: LearningArea, 
    assessmentHistory: AssessmentResult[], 
    interests: string[]
  ): number {
    const relevantAssessment = assessmentHistory.find(a => a.learningAreaId === area.id);
    
    let confidence = 0;
    
    // Assessment performance weight (60%)
    if (relevantAssessment) {
      confidence += (relevantAssessment.level.level / 4) * 0.6;
    }
    
    // Interest alignment weight (30%)
    const interestMatch = interests.some(interest => 
      area.careerPathways.some(pathway => 
        pathway.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(pathway.toLowerCase())
      )
    );
    if (interestMatch) confidence += 0.3;
    
    // Competency alignment weight (10%)
    const competencyMatch = interests.some(interest =>
      area.keyCompetencies.some(comp =>
        comp.toLowerCase().includes(interest.toLowerCase())
      )
    );
    if (competencyMatch) confidence += 0.1;
    
    return Math.min(confidence * 100, 100);
  }

  private generateReasoning(
    area: LearningArea,
    assessmentHistory: AssessmentResult[],
    interests: string[]
  ): string[] {
    const reasoning: string[] = [];
    const relevantAssessment = assessmentHistory.find(a => a.learningAreaId === area.id);
    
    if (relevantAssessment) {
      reasoning.push(`Your ${relevantAssessment.level.performance} performance in ${area.name}`);
      if (relevantAssessment.strengths.length > 0) {
        reasoning.push(`Strong in: ${relevantAssessment.strengths.join(', ')}`);
      }
    }
    
    const matchingInterests = interests.filter(interest =>
      area.careerPathways.some(pathway =>
        pathway.toLowerCase().includes(interest.toLowerCase())
      )
    );
    
    if (matchingInterests.length > 0) {
      reasoning.push(`Aligns with your interests: ${matchingInterests.join(', ')}`);
    }
    
    return reasoning;
  }

  private getRequirements(area: LearningArea, assessmentHistory: AssessmentResult[]): string[] {
    const relevantAssessment = assessmentHistory.find(a => a.learningAreaId === area.id);
    const requirements: string[] = [];
    
    if (!relevantAssessment || relevantAssessment.level.level < 3) {
      requirements.push('Improve competency level to Meeting Expectation or above');
      requirements.push('Complete additional practice in foundational concepts');
    }
    
    requirements.push('Maintain consistent performance across all related subjects');
    requirements.push('Develop practical application skills through projects');
    
    return requirements;
  }

  private getFutureOpportunities(area: LearningArea): string[] {
    return [
      ...area.careerPathways,
      'Further education opportunities in specialized institutions',
      'Scholarship possibilities for high performers',
      'Industry partnerships and internships'
    ];
  }

  private createImprovementPlan(area: LearningArea, assessmentHistory: AssessmentResult[]): string[] {
    const relevantAssessment = assessmentHistory.find(a => a.learningAreaId === area.id);
    const plan: string[] = [];
    
    if (relevantAssessment && relevantAssessment.level.level < 3) {
      plan.push('Focus on foundational concepts and skills');
      plan.push('Seek additional support from teachers and peers');
      plan.push('Practice with real-world problem-solving scenarios');
      
      if (relevantAssessment.improvementAreas.length > 0) {
        plan.push(`Specific areas to improve: ${relevantAssessment.improvementAreas.join(', ')}`);
      }
    } else {
      plan.push('Continue building on current strengths');
      plan.push('Explore advanced concepts and applications');
      plan.push('Consider leadership roles in related activities');
    }
    
    return plan;
  }
}

// Security and privacy utilities
export class SecureAssessmentHandler {
  // Input validation for assessment data
  public static validateAssessmentInput(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    
    // Validate required fields
    const requiredFields = ['score', 'learningAreaId'];
    for (const field of requiredFields) {
      if (!(field in data)) return false;
    }
    
    // Validate score range
    if (typeof data.score !== 'number' || data.score < 0 || data.score > 20) {
      return false;
    }
    
    return true;
  }
  
  // Secure data sanitization
  public static sanitizeInput(input: string): string {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/[<>'"]/g, '');
  }
  
  // Access control check
  public static hasAccessPermission(userRole: string, operation: string): boolean {
    const permissions = {
      'student': ['view_own_data', 'take_assessment'],
      'teacher': ['view_class_data', 'upload_scores', 'view_predictions'],
      'parent': ['view_child_data'],
      'admin': ['view_all_data', 'manage_assessments', 'export_data']
    };
    
    return permissions[userRole]?.includes(operation) || false;
  }
}
