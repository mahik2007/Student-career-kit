import { CareerProfileData } from "@/types";

export const INITIAL_PROFILE: CareerProfileData = {
  profile: {
    id: "user-default",
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    completion_percentage: 0,
  },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  achievements: [],
  targetGoal: {
    target_role: "",
    target_field: "",
    target_industry: "",
    application_type: "internship",
    target_company: "",
    job_description: "",
  },
};

export function calculateCompletion(data: CareerProfileData): number {
  let score = 0;
  // Personal: 25%
  if (data.profile.full_name?.trim()) score += 10;
  if (data.profile.email?.trim()) score += 5;
  if (data.profile.phone?.trim()) score += 4;
  if (data.profile.location?.trim()) score += 2;
  if (data.profile.linkedin?.trim() || data.profile.github?.trim()) score += 4;

  // Education: 20%
  if (data.education && data.education.length > 0) {
    score += 15;
    if (data.education[0].cgpa || data.education[0].class_12_percent) score += 5;
  }

  // Skills: 15%
  if (data.skills && data.skills.length >= 3) score += 15;
  else if (data.skills && data.skills.length > 0) score += 8;

  // Projects: 20%
  if (data.projects && data.projects.length >= 2) score += 20;
  else if (data.projects && data.projects.length === 1) score += 12;

  // Experience / Achievements: 10%
  if (data.experience && data.experience.length > 0) score += 6;
  if (data.achievements && data.achievements.length > 0) score += 4;

  // Target Goal: 10%
  if (data.targetGoal?.target_role?.trim()) score += 10;

  return Math.min(100, score);
}

// Development allowlist
export const ADMIN_ALLOWLIST = [
  "mahimak2010@gmail.com",
  "mahima.iitp2007@gmail.com",
];

export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_ALLOWLIST.includes(email.toLowerCase().trim());
}
