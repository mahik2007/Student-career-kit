# Student Career Kit — Career Application Platform

<p align="center">
  <strong>Create once. Apply everywhere.</strong><br />
  <sub>One career profile · Multiple professional application assets · Student-focused</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Student%20Careers-16A34A?style=for-the-badge" alt="Student careers" />
  <img src="https://img.shields.io/badge/Next.js-16-0B1220?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-16A34A?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-0B1220?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-16A34A?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <img src="./student-career-kit-logo.png" alt="Student Career Kit" width="90" />
</p>

---

# 01 · THE GAP

Students repeatedly enter the same information into resumes, LinkedIn, cover letters, internship applications, recruiter emails, portfolios, and GitHub repositories.

The information already exists.

The problem is the **repetition, inconsistency, and time required to turn it into professional application material.**

```mermaid
flowchart LR
    S[Student<br/>Career Information] --> G{APPLICATION GAP}

    G --> R[Repeated Resume Editing]
    G --> L[LinkedIn Rewriting]
    G --> C[Cover Letter Writing]
    G --> E[Recruiter / Professor Emails]
    G --> P[Project Description Writing]
    G --> GH[GitHub README Writing]

    R --> SK[STUDENT CAREER KIT]
    L --> SK
    C --> SK
    E --> SK
    P --> SK
    GH --> SK

Student Career Kit
│
├── Landing Page
│
├── Authentication
│   ├── Login
│   └── Signup
│
├── Career Workspace
│   ├── Dashboard
│   ├── Career Profile
│   ├── My Documents
│   ├── Application Tracker
│   └── Settings
│
├── Generators
│   ├── Resume
│   ├── Cover Letter
│   ├── LinkedIn
│   ├── Outreach
│   ├── Project Descriptions
│   └── GitHub README
│
├── Advanced Tools
│   ├── Job Match
│   └── Complete Suite
│
├── Payments
│   ├── Checkout
│   ├── Payment Success
│   └── Payment Failed
│
└── Administration
    └── Admin Workspace

16 · ROUTE MAP
Public
/
 /login
 /signup
 /pricing

Career Workspace
/dashboard
/profile
/documents
/settings
/tracker

Generators
/generate/resume
/generate/cover-letter
/generate/linkedin
/generate/outreach
/generate/projects
/generate/github-readme

Advanced Tools
/tools/job-match
/complete-suite

Payments
/checkout
/payment/success
/payment/failed

Administration
/admin
