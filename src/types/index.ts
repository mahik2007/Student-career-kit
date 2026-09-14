export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  completion_percentage: number;
}

export interface Education {
  id: string;
  user_id?: string;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  graduation_year: string;
  cgpa: string;
  class_10_percent?: string;
  class_12_percent?: string;
}

export interface SkillItem {
  id: string;
  user_id?: string;
  category: 'languages' | 'frameworks' | 'technologies' | 'tools' | 'other';
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export interface Experience {
  id: string;
  user_id?: string;
  organization: string;
  role: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  user_id?: string;
  name: string;
  description: string;
  problem_solved: string;
  technologies: string[];
  features: string[];
  role: string;
  github_url: string;
  live_demo_url: string;
}

export interface Achievement {
  id: string;
  user_id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface TargetGoal {
  id?: string;
  user_id?: string;
  target_role: string;
  target_field: string;
  target_industry: string;
  application_type: 'internship' | 'job' | 'research' | 'hackathon';
  target_company: string;
  job_description: string;
}

export interface CareerProfileData {
  profile: UserProfile;
  education: Education[];
  skills: SkillItem[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  targetGoal: TargetGoal;
}

export type DocumentType = 
  | 'resume' 
  | 'cover_letter' 
  | 'linkedin' 
  | 'outreach' 
  | 'project_desc' 
  | 'readme';

export interface DocumentRecord {
  id: string;
  user_id: string;
  type: DocumentType;
  title: string;
  content: Record<string, unknown>;
  metadata: {
    target_role?: string;
    company?: string;
    template?: string;
    tone?: string;
    created_via?: string;
    [key: string]: unknown;
  };
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  role: string;
  application_type: string;
  date_applied: string;
  deadline?: string;
  status: 'saved' | 'applied' | 'interview' | 'selected' | 'rejected' | 'on_hold';
  link?: string;
  notes?: string;
  follow_up_date?: string;
}

export type UserPlan = 'free' | 'essential' | 'complete';

export interface UserAccess {
  user_id: string;
  plan: UserPlan;
  is_active: boolean;
  updated_at: string;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  order_id: string;
  payment_id?: string;
  plan: 'essential' | 'complete';
  amount: number; // in INR e.g. 79 or 199
  currency: string;
  status: 'created' | 'pending' | 'captured' | 'failed' | 'refunded';
  created_at: string;
}
