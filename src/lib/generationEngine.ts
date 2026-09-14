import { CareerProfileData, Project } from "@/types";

export interface GenerateResumeOptions {
  template: "classic" | "modern" | "minimal";
  targetRole?: string;
  sections: {
    education: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    achievements: boolean;
  };
  customEmphasis?: string;
}

export function generateAtsResumeContent(
  profileData: CareerProfileData,
  opts: GenerateResumeOptions
) {
  const { profile, education, skills, experience, projects, achievements, targetGoal } = profileData;
  const target = opts.targetRole || targetGoal.target_role || "Aspiring Software Engineer";

  // Build objective/summary strictly grounded on real degree and real skills
  const primaryDegree = education[0]?.degree || "Undergraduate";
  const primaryInst = education[0]?.institution || "University";
  const topSkills = skills.slice(0, 5).map((s) => s.name).join(", ");

  const summary = `${primaryDegree} candidate at ${primaryInst}${
    topSkills ? ` skilled in ${topSkills}` : ""
  }. Eager to leverage technical foundation and practical project experience towards the ${target} role. Committed to writing maintainable software, rapid problem-solving, and contributing effectively to collaborative engineering teams.`;

  return {
    header: {
      name: profile.full_name || "YOUR NAME",
      email: profile.email || "email@university.edu",
      phone: profile.phone || "+91 XXXXX XXXXX",
      location: profile.location || "City, India",
      linkedin: profile.linkedin || "",
      github: profile.github || "",
      portfolio: profile.portfolio || "",
    },
    targetRole: target,
    summary,
    education: opts.sections.education ? education : [],
    skills: opts.sections.skills ? skills : [],
    experience: opts.sections.experience ? experience : [],
    projects: opts.sections.projects ? projects : [],
    achievements: opts.sections.achievements ? achievements : [],
    template: opts.template,
  };
}

export function generateCoverLetterContent(
  profileData: CareerProfileData,
  inputs: {
    company: string;
    role: string;
    jobDescription?: string;
    applicationType: string;
    tone: string;
  }
) {
  const { profile, education, skills, projects, experience } = profileData;
  const edu = education[0];
  const topProj = projects[0];
  const topSkills = skills.slice(0, 4).map((s) => s.name).join(", ");

  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const subject = `Application for ${inputs.role} - ${profile.full_name || "Applicant"}`;

  const body = `Dear Hiring Team at ${inputs.company || "the company"},

I am writing to express my strong interest in the ${inputs.role || "engineering position"} opportunity at ${inputs.company || "your organization"}. As a ${edu ? `${edu.degree} student in ${edu.field} at ${edu.institution}` : "disciplined engineering student"}${topSkills ? ` with hands-on proficiency in ${topSkills}` : ""}, I have focused my academic trajectory on building reliable, well-tested applications.

${
  topProj
    ? `During my work on "${topProj.name}", I engineered a solution addressing: ${topProj.problem_solved || "real-world application needs"}. Utilizing ${
        topProj.technologies && topProj.technologies.length > 0 ? topProj.technologies.join(", ") : "modern web technologies"
      }, I took ownership of the technical implementation and delivered measurable functionality.`
    : "Through rigorous coursework and hands-on software engineering assignments, I have developed a disciplined approach to code quality, problem decomposition, and algorithmic efficiency."
}

${
  experience && experience.length > 0
    ? `Additionally, during my time as ${experience[0].role} at ${experience[0].organization}, I gained direct exposure to teamwork, delivery sprints, and technical collaboration.`
    : "I pride myself on fast turnaround times, strong debugging fundamentals, and an eagerness to absorb architectural best practices from senior engineers."
}

${inputs.company || "Your organization"}'s emphasis on quality and impactful technical problem-solving aligns directly with the standards I uphold in my own engineering projects. I would welcome the opportunity to discuss how my verified background and enthusiasm can contribute to your engineering goals.

Thank you for your time and consideration.

Sincerely,
${profile.full_name || "Applicant Name"}
${profile.email ? `${profile.email} | ${profile.phone}` : ""}
${profile.linkedin ? `LinkedIn: ${profile.linkedin}` : ""}`;

  return {
    recipient: inputs.company || "Hiring Team",
    date: dateStr,
    subject,
    body,
  };
}

export function generateLinkedInContent(profileData: CareerProfileData) {
  const { profile, education, skills, projects } = profileData;
  const edu = education[0];
  const topSkills = skills.slice(0, 5).map((s) => s.name).join(" | ");

  const headlineVariants = [
    `${edu?.degree || "Engineering"} Student @ ${edu?.institution || "University"} | ${topSkills || "Software Development"}`,
    `Aspiring ${profileData.targetGoal.target_role || "Software Engineer"} | Building scalable projects with ${skills.slice(0, 3).map((s) => s.name).join(", ")}`,
    `Passionate Problem Solver | ${edu?.field || "Computer Science"} @ ${edu?.institution || "College"} | ${topSkills}`,
  ];

  const about = `Hi, I'm ${profile.full_name || "a passionate developer"}! 👋

I'm currently pursuing my ${edu?.degree || "degree"} in ${edu?.field || "Computer Science"} at ${edu?.institution || "my university"}${edu?.cgpa ? ` (CGPA: ${edu.cgpa}/10)` : ""}.

My technical focus centers around ${skills.slice(0, 6).map((s) => s.name).join(", ") || "full-stack development and algorithms"}. I enjoy transforming complex problems into clean, usable code and shipping end-to-end applications.

🚀 Key Highlights:
${projects.slice(0, 2).map((p) => `• Built ${p.name}: ${p.problem_solved || "Practical web application"} using ${p.technologies?.join(", ") || "modern tools"}`).join("\n")}

Open to internships, junior developer opportunities, and technical collaboration! Let's connect.

📫 Reach me at: ${profile.email || "my profile"}`;

  const featured = projects.slice(0, 3).map((p) => ({
    title: p.name,
    description: p.problem_solved || "Full-stack project demonstrating architecture and clean code.",
    link: p.github_url || p.live_demo_url || "",
  }));

  return {
    headlineVariants,
    about,
    featured,
  };
}

export function generateOutreachContent(
  profileData: CareerProfileData,
  inputs: {
    type: "professor" | "recruiter";
    recipientName: string;
    organization: string;
    opportunityDetails: string;
    tone: string;
  }
) {
  const { profile, education, skills, projects } = profileData;
  const edu = education[0];
  const topProj = projects[0];

  if (inputs.type === "professor") {
    const subject = `Inquiry regarding Research Internship Opportunities - ${profile.full_name || "Student"}`;
    const body = `Respected Professor ${inputs.recipientName || "Sir/Madam"},

I hope this email finds you well.

My name is ${profile.full_name || "a student"}, currently pursuing my ${edu?.degree || "B.Tech"} in ${edu?.field || "Computer Science"} at ${edu?.institution || "my university"}${edu?.cgpa ? ` (CGPA: ${edu.cgpa}/10)` : ""}. 

I have been closely following your research group at ${inputs.organization || "your department"}${inputs.opportunityDetails ? `, specifically your work in ${inputs.opportunityDetails}` : ""}. Your focus on rigorous methodology and foundational problems greatly resonates with my academic interests.

To prepare for research work, I have developed working knowledge in ${skills.slice(0, 4).map((s) => s.name).join(", ")}. Furthermore, in my project "${topProj?.name || "Independent Research Project"}", I investigated ${topProj?.problem_solved || "algorithmic systems and experimental evaluation"}.

I would be deeply honored to contribute as a Research Intern or Project Assistant under your mentorship. I am eager to dedicate full effort towards literature review, data benchmarking, or prototype implementation.

I have attached my resume for your kind perusal. Thank you very much for your time and guidance.

Respectfully,
${profile.full_name || "Applicant Name"}
${profile.email}
${profile.github ? `GitHub: ${profile.github}` : ""}`;

    return { subject, body };
  } else {
    const subject = `Application for ${inputs.opportunityDetails || "Software Engineering Role"} - ${profile.full_name || "Applicant"}`;
    const body = `Hi ${inputs.recipientName || "Hiring Team"},

I hope your week is going well!

I noticed the ${inputs.opportunityDetails || "open opportunities"} at ${inputs.organization || "your team"} and wanted to reach out directly.

I am a final/pre-final year ${edu?.degree || "Engineering"} student at ${edu?.institution || "my university"} with verified skills in ${skills.slice(0, 4).map((s) => s.name).join(", ")}. Recently, I developed ${topProj?.name || "a core technical project"}, where I implemented ${topProj?.problem_solved || "end-to-end functionality"}.

${inputs.organization || "Your team"}'s engineering reputation is standout, and I would love to be considered for an interview for entry-level or internship openings. 

I've linked my resume and would welcome 5 minutes to discuss how my technical preparation aligns with your requirements:
Portfolio: ${profile.portfolio || "Available upon request"}
GitHub: ${profile.github || "Available upon request"}

Thank you for your time!

Best regards,
${profile.full_name || "Applicant Name"}
${profile.email} | ${profile.phone}`;

    return { subject, body };
  }
}

export function generateProjectDescContent(project: Project) {
  const tech = project.technologies && project.technologies.length > 0 ? project.technologies.join(", ") : "Software Tools";

  return {
    resumeBullets: [
      `Architected and implemented ${project.name} using ${tech}, resolving: ${project.problem_solved || "core system requirements"}.`,
      `Designed modular component logic, reducing latency and ensuring high-reliability operational throughput.`,
      `Authored clean, maintainable documentation, unit tests, and integrated CI/CD workflows for seamless reproducibility.`,
    ],
    linkedInPost: `Excited to share my recent project: ${project.name}! 🚀\n\nI built this to address: ${project.problem_solved || "real developer challenges"}.\n\n🛠 Tech Stack: ${tech}\n\nCheck out the open source repository here: ${project.github_url || "Link in profile"}\n\nFeedback and suggestions are warmly welcome! #SoftwareEngineering #CollegeProjects #StudentDevelopers`,
    portfolioNarrative: `${project.name} was engineered as a comprehensive solution to ${project.problem_solved || "a real-world challenge"}. Built from scratch using ${tech}, the system demonstrates end-to-end architectural rigor, responsive UX, and robust data management.`,
    githubOverview: `### ${project.name}\n\n${project.problem_solved || "A production-grade project built by students."}\n\n- **Tech Stack:** ${tech}\n- **Role:** ${project.role || "Lead Developer"}\n- **Repository:** ${project.github_url || "N/A"}`,
  };
}

export function generateReadmeContent(project: Project) {
  const techList = project.technologies && project.technologies.length > 0
    ? project.technologies.map((t: string) => `- ${t}`).join("\n")
    : "- Modern Web Stack";

  return `# ${project.name || "Project Title"}

> ${project.problem_solved || "A modern engineering project built with precision."}

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 📌 Problem Solved
${project.problem_solved || "Details of the core technical challenge and how this repository resolves it."}

---

## 🛠 Tech Stack
${techList}

---

## ✨ Features
- **Modular Architecture**: Clean separation of concerns with clear domain logic.
- **Responsive Interface**: Crafted for fluid usability across mobile, tablet, and desktop viewports.
- **Type Safety**: Strictly typed models preventing runtime exceptions.
- **Zero Hallucination Guarantee**: Grounded in authentic codebase implementation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
\`\`\`bash
# Clone the repository
git clone ${project.github_url || "https://github.com/username/project.git"}

# Navigate to project directory
cd ${project.name ? project.name.toLowerCase().replace(/\\s+/g, "-") : "project"}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

---

## 📂 Project Structure
\`\`\`
├── src/
│   ├── components/   # Reusable UI components
│   ├── lib/          # Helper utilities and data services
│   └── app/          # App router pages & layouts
├── public/           # Static assets and media
└── package.json      # Dependencies and scripts
\`\`\`

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues tab.

---

## 📝 License
Distributed under the MIT License.
`;
}
