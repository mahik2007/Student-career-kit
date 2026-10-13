<div align="center">

# 🎓 Student Career Kit

### Create once. Apply everywhere.

**One profile. Six career tools. Smarter applications.**

<p>
  <img src="./student-career-kit-logo.png" alt="Student Career Kit Logo" width="100" />
</p>

[![Next.js](https://img.shields.io/badge/Next.js-Framework-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange)](https://github.com/mahik2007/Student-career-kit)

[🌐 Live Demo](https://mahik2007.github.io/Student-career-kit/) · [💻 Repository](https://github.com/mahik2007/Student-career-kit) · [👩‍💻 Developer](https://github.com/mahik2007)

</div>

---

## 📌 01. Overview

**Student Career Kit** is a career-preparation platform for students and freshers. Create a career profile once and use it to prepare professional application materials.

| 🎯 Target users | 🛠️ Core tools | 💳 Planned pricing |
|---|---|---|
| Students & freshers | 6 generators | ₹79 / ₹199 one-time |

---

## 🔄 02. How It Works

```mermaid
flowchart TD
    A([👤 Start]) --> B[Create Career Profile]
    B --> C[Add Education, Skills & Projects]
    C --> D{Choose a Tool}
    D --> E[ATS Resume]
    D --> F[Cover Letter]
    D --> G[LinkedIn Content]
    D --> H[Outreach Email]
    D --> I[Project Description]
    D --> J[GitHub README]
    E & F & G & H & I & J --> K[Review & Edit]
    K --> L[Prepare Application]
    style A fill:#16a34a,color:#fff
    style D fill:#0b1220,color:#fff
    style L fill:#16a34a,color:#fff
```

---

## 🧰 03. Product Features

<table>
<tr>
<td width="50%">

### 📄 Resume Builder
- ATS-friendly structure
- Education and skills
- Projects and achievements

</td>
<td width="50%">

### ✉️ Cover Letter
- Role-focused drafts
- Professional structure
- Editable content

</td>
</tr>
<tr>
<td>

### 💼 LinkedIn Content
- About section
- Headlines
- Professional posts

</td>
<td>

### 📬 Outreach Email
- Recruiter emails
- Professor outreach
- Internship enquiries

</td>
</tr>
<tr>
<td>

### 🚀 Project Writer
- Clear project summaries
- Features and tech stack
- Resume-ready descriptions

</td>
<td>

### 🐙 GitHub README
- Project documentation
- Markdown structure
- Setup and feature sections

</td>
</tr>
</table>

---

## 🗺️ 04. Platform Architecture

```mermaid
flowchart LR
    U[👤 User] --> UI[Next.js Interface]
    UI --> P[Career Profile]
    P --> G[Generation Service]
    G --> R[Resume]
    G --> C[Cover Letter]
    G --> L[LinkedIn]
    G --> E[Emails]
    G --> D[Project Docs]
    UI -. Planned integration .-> S[(Supabase)]
    G -. Planned integration .-> AI[AI API]
    UI -. Planned integration .-> PAY[Payment Gateway]
    style U fill:#16a34a,color:#fff
    style UI fill:#0b1220,color:#fff
    style P fill:#d1fae5,color:#064e3b
```

---

## 📊 05. Product at a Glance

```mermaid
pie showData
    title Core Content Generators
    "Resume" : 1
    "Cover Letter" : 1
    "LinkedIn" : 1
    "Outreach Email" : 1
    "Project Description" : 1
    "GitHub README" : 1
```

> The chart represents the six planned core generator categories, not usage analytics or performance data.

---

## 🧑‍🎓 06. Career Profile

```mermaid
flowchart TD
    A[Career Profile] --> B[Personal Details]
    A --> C[Education]
    A --> D[Skills]
    A --> E[Experience]
    A --> F[Projects]
    A --> G[Achievements]
    A --> H[Target Role]
    B & C & D & E & F & G & H --> I[Application Materials]
```

A reusable profile helps keep application materials consistent while allowing each document to be edited for its purpose.

---

## 🛡️ 07. Accuracy First

Student Career Kit should:

- ✅ Use user-provided qualifications and experience.
- ✅ Keep generated content editable.
- ✅ Avoid invented skills, achievements, and metrics.
- ✅ Encourage users to verify every application before sending.

---

## 💻 08. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Web framework |
| React | UI components |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| Supabase | Planned authentication and database integration |
| AI API | Planned content-generation integration |
| Razorpay | Planned payment integration |
| PDF generation | Document export capability to verify |

---

## 🔐 09. Application Flow & Security

```mermaid
flowchart TD
    A[User Request] --> B[Validate Input]
    B --> C[Generate Draft]
    C --> D[User Reviews Content]
    D --> E{Accurate?}
    E -- No --> F[Edit Details]
    F --> C
    E -- Yes --> G[Export or Use Draft]
    style A fill:#0b1220,color:#fff
    style E fill:#d97706,color:#fff
    style G fill:#16a34a,color:#fff
```

**Production requirements**

- Server-side authentication and authorization
- Secure storage of API keys
- Server-verified payment status
- Server-side admin access checks
- Privacy-aware handling of career data

---

## 💳 10. Pricing Model

| Plan | Planned price | Intended offering |
|---|---:|---|
| Essential | ₹79 one-time | Core career generators |
| Complete Suite | ₹199 one-time | Advanced tailoring and career workspace |

<sub>Pricing and premium features are proposed and should not be considered available until confirmed in the live application.</sub>

---

## 📈 11. Roadmap

```mermaid
flowchart LR
    A[Core UI] --> B[Real Authentication]
    B --> C[Secure Profile Storage]
    C --> D[Verified AI Generation]
    D --> E[PDF Export]
    E --> F[Verified Payments]
    F --> G[Job Matching]
    G --> H[Application Tracker]
    style A fill:#16a34a,color:#fff
    style H fill:#0b1220,color:#fff
```

| Feature | Status |
|---|---|
| Core interface | In development |
| Real authentication | To verify |
| Persistent database | To verify |
| AI integrations | To verify |
| Payment verification | To verify |
| Job matching | Planned / to verify |
| Application tracker | Planned |

---

## ⚙️ 12. Run Locally

### Prerequisites
- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/mahik2007/Student-career-kit.git
cd Student-career-kit
npm install
npm run dev
```

Open `http://localhost:3000`.

### Available commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

<sub>Run only the scripts defined in the project's package.json.</sub>

---

## 📁 13. Project Structure

```text
Student-career-kit/
├── public/
├── src/
│   └── app/
├── package.json
├── tsconfig.json
├── next.config.*
├── tailwind.config.*
└── README.md
```

<sub>Illustrative structure; verify exact filenames and directories in the current repository.</sub>

---

## 🎨 14. Design System

| Element | Value |
|---|---|
| Primary background | `#0B1220` |
| Accent green | `#16A34A` |
| Hover green | `#15803D` |
| Light background | `#F8F9FF` |
| Font | Plus Jakarta Sans |

**Design goals:** clear navigation · readable documents · responsive layouts · focused workflows.

---

## 🌟 15. What Makes It Useful?

```mermaid
mindmap
  root((Student Career Kit))
    Reusable Profile
    Career Documents
      Resume
      Cover Letter
      LinkedIn
    Communication
      Recruiter Email
      Professor Email
    Project Presence
      Project Description
      GitHub README
    Future Tools
      Job Matching
      Application Tracking
```

- One profile for multiple career materials
- Student-focused workflows
- Editable drafts
- Emphasis on truthful representation

---

## 🧭 16. Product Principle

> **Create once. Apply everywhere.**
>
> Spend less time formatting repetitive career documents and more time improving the work they represent.

---

## 👩‍💻 17. Author

**Mahima Kumari**  
BS–MS Artificial Intelligence & Cybersecurity student at IIT Patna

- GitHub: [@mahik2007](https://github.com/mahik2007)
- Portfolio: [mahima-portfolio](https://mahik2007.github.io/mahima-portfolio/)

---

<div align="center">

### 🎓 Student Career Kit

**Your career profile. Your story. Your next opportunity.**

[⭐ Star the Repository](https://github.com/mahik2007/Student-career-kit)

<sub>Built for students and freshers · Features and integrations may change during development.</sub>

</div>

