export type ModuleTab =
  | 'dashboard'
  | 'mentor'
  | 'profile'
  | 'resume'
  | 'skill-gap'
  | 'roadmap'
  | 'projects'
  | 'opportunities'
  | 'knowledge-brain'
  | 'digital-twin';

export interface UserSkill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  percentage: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Core CS' | 'Tools';
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  education: string;
  degree: string;
  cgpa: string;
  graduationYear: string;
  currentLevel: string;
  targetRole: string;
  locationPreference: string;
  careerGoal: string;
  currentSkills: UserSkill[];
  skillGaps: string[];
  recommendedPath: string;
  profileCompletion: number;
  marketReadiness: number;
  streakDays: number;
  totalXp: number;
}

export interface TodayTask {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  estimatedMinutes: number;
}

export interface ResumeScore {
  technicalSkills: number;
  projects: number;
  experience: number;
  atsKeywords: number;
  overall: number;
}

export interface ResumeBulletImprovement {
  original: string;
  improved: string;
  reason: string;
}

export interface ResumeAnalysis {
  scores: ResumeScore;
  summary: string;
  strengths: string[];
  criticalGaps: string[];
  missingKeywords: string[];
  bulletImprovements: ResumeBulletImprovement[];
  actionPlan: string[];
}

export interface SkillGapPriority {
  priority: number;
  skill: string;
  reason: string;
  timeToLearn: string;
  recommendedResource: string;
}

export interface SkillGapAnalysis {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  priorityBreakdown: SkillGapPriority[];
  overallVerdict: string;
  readinessTimeline: string;
  strategySummary: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  focus: string;
  topics: string[];
  handsOnTask: string;
  deliverable: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface LearningRoadmap {
  title: string;
  overview: string;
  targetRole: string;
  totalWeeks: number;
  weeks: RoadmapWeek[];
}

export interface ProjectTask {
  id: string;
  title: string;
  category: string;
  status: 'TODO' | 'IN PROGRESS' | 'COMPLETED';
}

export interface ProjectFeature {
  name: string;
  description: string;
}

export interface DbSchemaTable {
  table: string;
  columns: string[];
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
}

export interface ProjectSpec {
  projectName: string;
  tagline: string;
  problemStatement: string;
  targetUsers: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    devops: string;
    auth: string;
  };
  architectureOverview: string;
  features: ProjectFeature[];
  databaseSchema: DbSchemaTable[];
  apiEndpoints: ApiEndpoint[];
  uiPages: string[];
  developmentTasks: ProjectTask[];
  deploymentPlan: string;
  resumeDescription: string[];
  githubReadme: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Internship' | 'Hackathon' | 'Freelance';
  location: string;
  stipendOrSalary: string;
  deadline: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  readinessVerdict: 'High Match' | 'Good' | 'Needs Preparation';
  recommendedAction: string;
  applied: boolean;
}

export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Selected'
  | 'Rejected'
  | 'Offer';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: ApplicationStatus;
  interviewDate?: string;
  notes: string;
  salaryRange?: string;
}

export interface BrainDocument {
  id: string;
  title: string;
  type: 'PDF' | 'Markdown' | 'Notes' | 'Certificate';
  size: string;
  tags: string[];
  summary: string;
  contentSnippet: string;
  uploadedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  actionPrompt?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'Milestone' | 'Consistency' | 'Skills' | 'Career';
  iconType: 'project' | 'streak' | 'resume' | 'roadmap' | 'skill' | 'application' | 'knowledge';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  rewardXp: number;
  criteria: string;
}
