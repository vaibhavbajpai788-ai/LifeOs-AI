import {
  UserProfile,
  TodayTask,
  ResumeAnalysis,
  LearningRoadmap,
  ProjectSpec,
  OpportunityItem,
  JobApplication,
  BrainDocument,
  ChatMessage,
  AchievementBadge,
} from '../types';

export const initialProfile: UserProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.edu',
  title: 'Final-Year Computer Science Student',
  education: 'National Institute of Technology (NIT)',
  degree: 'B.Tech in Computer Science & Engineering',
  cgpa: '8.4 / 10.0',
  graduationYear: '2026',
  currentLevel: 'Final-Year Computer Science Student',
  targetRole: 'Full Stack Developer',
  locationPreference: 'Bengaluru, India / Remote',
  careerGoal: 'Land a high-growth Full Stack Software Engineer role at a top product tech company or funded startup within 6 months.',
  currentSkills: [
    { id: '1', name: 'React 19 & Hooks', level: 'Advanced', percentage: 85, category: 'Frontend' },
    { id: '2', name: 'JavaScript (ES6+)', level: 'Advanced', percentage: 82, category: 'Frontend' },
    { id: '3', name: 'Java & OOP', level: 'Intermediate', percentage: 76, category: 'Core CS' },
    { id: '4', name: 'SQL & Database Design', level: 'Intermediate', percentage: 70, category: 'Database' },
    { id: '5', name: 'Git & GitHub Workflows', level: 'Intermediate', percentage: 78, category: 'Tools' },
    { id: '6', name: 'HTML5 & Tailwind CSS', level: 'Advanced', percentage: 88, category: 'Frontend' },
    { id: '7', name: 'Python Basics & Scripting', level: 'Intermediate', percentage: 65, category: 'Core CS' },
  ],
  skillGaps: ['Node.js & Express', 'Docker & Containers', 'AWS Cloud Infrastructure', 'System Design & Scalability', 'MongoDB / NoSQL'],
  recommendedPath: 'React → Node.js → SQL → Docker → AWS',
  profileCompletion: 82,
  marketReadiness: 74,
  streakDays: 5,
  totalXp: 1800,
};

export const initialTodayTasks: TodayTask[] = [
  {
    id: 't-1',
    title: 'React 19 State Management & Custom Hooks Practice',
    category: 'Frontend',
    priority: 'High',
    completed: true,
    estimatedMinutes: 45,
  },
  {
    id: 't-2',
    title: 'Implement Node.js JWT Authentication & Refresh Tokens',
    category: 'Backend',
    priority: 'High',
    completed: false,
    estimatedMinutes: 60,
  },
  {
    id: 't-3',
    title: 'Review System Design: Database Sharding vs Replication',
    category: 'Architecture',
    priority: 'Medium',
    completed: false,
    estimatedMinutes: 30,
  },
  {
    id: 't-4',
    title: 'Update LinkedIn profile with LifeOS DevPulse Capstone',
    category: 'Career',
    priority: 'Low',
    completed: false,
    estimatedMinutes: 20,
  },
];

export const sampleResumeText = `AARAV SHARMA
Email: aarav.sharma@example.edu | Phone: +91 98765 43210 | GitHub: github.com/aaravsharma
Bengaluru, India

EDUCATION
National Institute of Technology (NIT)
B.Tech in Computer Science & Engineering | CGPA: 8.4 / 10.0 | Expected Graduation: May 2026
Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks

TECHNICAL SKILLS
Languages: Java, Python, JavaScript (ES6+), SQL, HTML5, CSS3
Frameworks & Libraries: React, Tailwind CSS, Express (Basic)
Databases & Tools: PostgreSQL, MySQL, Git, GitHub, VS Code, Postman

PROJECTS
1. TaskOps - Collaborative Task Management Platform (React, Tailwind, LocalStorage)
- Built a web application using React for managing tasks and team sprints.
- Implemented drag-and-drop kanban boards and dark mode styling.
- Handled state management using React Context API and hooks.

2. Campus Placement Portal (Java, Servlet, MySQL)
- Developed student registration and company drive management application.
- Wrote SQL queries and schema models for storing student records and CGPA criteria.

3. Algorithm Visualizer (JavaScript, HTML5 Canvas)
- Created interactive visualization of sorting algorithms including QuickSort and MergeSort.`;

export const initialResumeAnalysis: ResumeAnalysis = {
  scores: {
    technicalSkills: 82,
    projects: 75,
    experience: 60,
    atsKeywords: 68,
    overall: 74,
  },
  summary: 'Your resume shows strong foundational frontend execution with React and clean computer science background. However, for a competitive Full Stack Developer role, it severely lacks production backend metrics, containerization (Docker), and cloud deployments (AWS).',
  strengths: [
    'Clear educational pedigree with solid CGPA (8.4) and relevant CS core courses',
    'Demonstrated frontend fluency with React component composition and state management',
    'Clean formatting with identifiable sections and active GitHub profile presence',
  ],
  criticalGaps: [
    'No production metrics in project descriptions (e.g. latency, user sessions, throughput)',
    'Missing cloud and DevOps presence: zero mentions of Docker, AWS, CI/CD pipelines',
    'Work experience section is missing; needs internship, open-source or freelance projects',
  ],
  missingKeywords: [
    'Node.js',
    'Docker',
    'AWS EC2 / S3',
    'REST APIs',
    'JWT Authentication',
    'PostgreSQL',
    'CI/CD Pipelines',
    'Microservices',
  ],
  bulletImprovements: [
    {
      original: 'Built a web application using React for managing tasks and team sprints.',
      improved: 'Architected TaskOps web application using React 19 and custom hooks; optimized render cycles reducing re-renders by 38% across 1,000+ mock sprint tasks.',
      reason: 'Replaces passive verb with strong technical action and quantifies component performance improvement.',
    },
    {
      original: 'Wrote SQL queries and schema models for storing student records and CGPA criteria.',
      improved: 'Designed 3NF normalized PostgreSQL schema with composite indexing, cutting complex search query response times from 320ms to 48ms.',
      reason: 'Proves database optimization skills with before/after latency metrics.',
    },
  ],
  actionPlan: [
    'Add Node.js & Docker to Technical Skills and build a live API project',
    'Quantify every project bullet point with latency, users, or dataset size',
    'Host TaskOps or DevPulse live on AWS/Render with a working live demo link',
  ],
};

export const initialRoadmap: LearningRoadmap = {
  title: '12-Week Full Stack Developer Roadmap',
  overview: 'Systematic sprint to elevate you from frontend proficiency to full-stack production readiness with Node.js, PostgreSQL, Docker, and AWS.',
  targetRole: 'Full Stack Developer',
  totalWeeks: 12,
  weeks: [
    {
      weekNumber: 1,
      title: 'JavaScript Advanced & Async Patterns',
      focus: 'Event Loop, Microtasks, Closures, Prototypes, Garbage Collection',
      topics: ['V8 Execution Context & Call Stack', 'Promises, Async/Await & Microtask queue', 'Memory Leaks & Profiling in Chrome DevTools'],
      handsOnTask: 'Build custom Promise implementation and async task worker queue',
      deliverable: 'github.com/aarav/js-concurrency-worker',
      status: 'completed',
    },
    {
      weekNumber: 2,
      title: 'Modern React 19 Architecture',
      focus: 'Custom Hooks, Context Performance, Suspense & Server Components',
      topics: ['Reconciliation & Fiber internals', 'React 19 Actions & useOptimistic', 'Complex memoization vs render overhead'],
      handsOnTask: 'Build infinite-scroll virtualized data table without external libraries',
      deliverable: 'Virtual grid component with 60 FPS scrolling',
      status: 'completed',
    },
    {
      weekNumber: 3,
      title: 'Node.js Core Runtime & Architecture',
      focus: 'libuv, Event Loop phases, Streams, Buffers, File System',
      topics: ['Node.js single-thread vs worker threads', 'Readable/Writable Streams & Backpressure', 'Buffer manipulation & binary data'],
      handsOnTask: 'Build high-throughput streaming CSV parser for 500MB logs',
      deliverable: 'CLI streaming log parser repository',
      status: 'in-progress',
    },
    {
      weekNumber: 4,
      title: 'Express Framework & Middleware Pipeline',
      focus: 'Router architecture, middleware lifecycle, Zod validation, error handling',
      topics: ['Custom middleware execution stack', 'Schema validation with Zod / Joi', 'Centralized error handler & structured logging'],
      handsOnTask: 'Develop production-ready Express boilerplate with rate-limiting & Winston',
      deliverable: 'Reusable backend starter template on GitHub',
      status: 'pending',
    },
    {
      weekNumber: 5,
      title: 'Relational Database Engineering with PostgreSQL',
      focus: 'Schema design, normalization (1NF-BCNF), B-Tree Indexing, Transactions',
      topics: ['Relational schema normalization', 'EXPLAIN ANALYZE & query optimization', 'ACID properties & row-level locking'],
      handsOnTask: 'Design e-commerce multi-vendor schema with inventory reservation transactions',
      deliverable: 'PostgreSQL migration scripts & index benchmarks',
      status: 'pending',
    },
    {
      weekNumber: 6,
      title: 'NoSQL & Document Modeling with MongoDB',
      focus: 'Mongoose ODM, aggregation pipelines, document embeds vs references',
      topics: ['Document schema patterns', 'Multi-stage aggregation pipeline', 'Compound indexing and performance caveats'],
      handsOnTask: 'Create real-time telemetry metrics aggregation API',
      deliverable: 'MongoDB analytical reporting service',
      status: 'pending',
    },
    {
      weekNumber: 7,
      title: 'Authentication, Authorization & Security',
      focus: 'JWT tokens, refresh rotation, bcrypt, OAuth2, HttpOnly cookies, RBAC',
      topics: ['Access & Refresh token rotation', 'CSRF, XSS and CORS defense vectors', 'Role-Based Access Control (Admin, Editor, User)'],
      handsOnTask: 'Build standalone Auth microservice with session revocation',
      deliverable: 'Secure authentication service with Postman test collection',
      status: 'pending',
    },
    {
      weekNumber: 8,
      title: 'RESTful API Standards & WebSockets',
      focus: 'Idempotency, HTTP status codes, cursor pagination, Socket.io events',
      topics: ['REST best practices & API versioning', 'Cursor-based vs offset pagination', 'Bi-directional WebSockets for live notifications'],
      handsOnTask: 'Build live collaborative room backend with presence detection',
      deliverable: 'Real-time WebSocket & REST server',
      status: 'pending',
    },
    {
      weekNumber: 9,
      title: 'Docker & Containerization',
      focus: 'Dockerfiles, multi-stage builds, Docker Compose, bridge networking',
      topics: ['Docker layer caching & build optimization', 'Multi-stage container footprints', 'Compose orchestration with health checks'],
      handsOnTask: 'Dockerize React + Node.js + PostgreSQL + Redis in single compose file',
      deliverable: 'Production-ready docker-compose.yml configuration',
      status: 'pending',
    },
    {
      weekNumber: 10,
      title: 'Cloud Deployment & AWS Basics',
      focus: 'AWS EC2, S3 bucket storage, RDS managed databases, Security Groups',
      topics: ['EC2 instance provisioning & SSH hardening', 'S3 pre-signed upload URLs', 'Nginx reverse proxy & Let\'s Encrypt SSL'],
      handsOnTask: 'Deploy containerized full-stack application to AWS EC2 with automated SSL',
      deliverable: 'Live HTTPS accessible cloud deployment',
      status: 'pending',
    },
    {
      weekNumber: 11,
      title: 'Full-Stack Capstone Project (DevPulse)',
      focus: 'End-to-end integration: React UI, Node backend, PostgreSQL, Docker, AWS',
      topics: ['System architecture design', 'End-to-end integration testing', 'Automated CI/CD deployment with GitHub Actions'],
      handsOnTask: 'Finalize full-stack SaaS platform with metrics dashboard and alert dispatch',
      deliverable: 'Live web app + polished GitHub repository + demo video',
      status: 'pending',
    },
    {
      weekNumber: 12,
      title: 'Interview Mastery & ATS Portfolio Alignment',
      focus: 'System design for freshers, mock technical interviews, resume finalization',
      topics: ['System design fundamentals (Load balancers, caching, CDN)', 'Top 50 full-stack coding interview questions', 'LinkedIn branding & outbound recruiter outreach'],
      handsOnTask: 'Conduct 5 peer mock interviews and submit 25 targeted job applications',
      deliverable: 'Targeted applications submitted with tailored resumes',
      status: 'pending',
    },
  ],
};

export const initialProjectSpec: ProjectSpec = {
  projectName: 'DevPulse - Distributed Micro-SaaS Health & API Gateway',
  tagline: 'High-availability monitoring platform with automated failover and telemetry analytics.',
  problemStatement: 'Distributed engineering teams lack unified visibility into API latency and service degradations across multi-cloud endpoints, causing undetected downtime and manual troubleshooting.',
  targetUsers: ['Full Stack Developers', 'DevOps & SRE Engineers', 'Fast-Growing Startups'],
  techStack: {
    frontend: 'React 19, TypeScript, Tailwind CSS, Lucide Icons',
    backend: 'Node.js, Express, TypeScript, Zod',
    database: 'PostgreSQL (Metrics & Users) + Redis (Cache & Rate Limiting)',
    devops: 'Docker, Docker Compose, AWS EC2, Nginx',
    auth: 'JWT with Refresh Token Rotation & HttpOnly Cookies',
  },
  architectureOverview: 'Client web app interfaces via an Express API Gateway. Background workers poll registered health endpoints at scheduled intervals, logging latency metrics to PostgreSQL with Redis caching for instant sub-second dashboard rendering.',
  features: [
    {
      name: 'Real-Time Endpoint Health Monitoring',
      description: 'Automated background pinging with sub-second WebSocket updates showing live latency and status.',
    },
    {
      name: 'Instant Webhook Incident Alerts',
      description: 'Automated notification dispatch to Slack/Discord when an endpoint fails 3 consecutive healthchecks.',
    },
    {
      name: 'Multi-Tenant RBAC & Team Spaces',
      description: 'Strict workspace isolation with granular permissions for Team Admins, Members, and Viewers.',
    },
    {
      name: '99.9% Uptime & SLA Export Reports',
      description: 'Automated generation of audit-ready compliance logs and downloadable CSV latency reports.',
    },
  ],
  databaseSchema: [
    {
      table: 'users',
      columns: ['id UUID PRIMARY KEY', 'email VARCHAR(255) UNIQUE', 'password_hash VARCHAR(255)', 'role VARCHAR(32)', 'created_at TIMESTAMP'],
    },
    {
      table: 'monitored_services',
      columns: ['id UUID PRIMARY KEY', 'user_id UUID REFERENCES users(id)', 'name VARCHAR(128)', 'endpoint_url TEXT', 'interval_sec INT', 'status VARCHAR(20)'],
    },
    {
      table: 'latency_logs',
      columns: ['id BIGSERIAL PRIMARY KEY', 'service_id UUID REFERENCES monitored_services(id)', 'status_code INT', 'response_time_ms INT', 'recorded_at TIMESTAMP'],
    },
  ],
  apiEndpoints: [
    { method: 'POST', path: '/api/v1/auth/register', description: 'Create user account with hashed credentials' },
    { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate user & issue JWT token pair' },
    { method: 'GET', path: '/api/v1/services', description: 'List all user monitored endpoints with current status' },
    { method: 'POST', path: '/api/v1/services', description: 'Register a new endpoint for automated monitoring' },
    { method: 'GET', path: '/api/v1/services/:id/metrics', description: 'Retrieve 24-hour latency series and uptime percentage' },
  ],
  uiPages: ['Marketing Landing', 'Sign In / Register', 'Operations Dashboard', 'Service Detail & Telemetry', 'Alert Settings'],
  developmentTasks: [
    { id: 'task-1', title: 'Setup React 19 Frontend with Tailwind & Lucide', category: 'Frontend', status: 'COMPLETED' },
    { id: 'task-2', title: 'Setup Express TypeScript Backend Server', category: 'Backend', status: 'COMPLETED' },
    { id: 'task-3', title: 'Design PostgreSQL Schema & Migrations', category: 'Database', status: 'IN PROGRESS' },
    { id: 'task-4', title: 'Implement JWT Auth & Cookie Handling', category: 'Auth', status: 'IN PROGRESS' },
    { id: 'task-5', title: 'Build Background Poller & Health Check Worker', category: 'Backend', status: 'TODO' },
    { id: 'task-6', title: 'Build Interactive Dashboard Charts & Grids', category: 'Frontend', status: 'TODO' },
    { id: 'task-7', title: 'Dockerize Frontend & Backend with Docker Compose', category: 'DevOps', status: 'TODO' },
    { id: 'task-8', title: 'Deploy to Cloud with Automated CI/CD Pipeline', category: 'Deployment', status: 'TODO' },
  ],
  deploymentPlan: '1. Multi-stage Docker builds. 2. Provision PostgreSQL container with persistent volume. 3. AWS EC2 t3.micro provisioning. 4. Nginx reverse proxy with automated Let\'s Encrypt SSL renewal.',
  resumeDescription: [
    'Architected DevPulse, a distributed microservice health monitoring platform using React 19, TypeScript, Node.js, and PostgreSQL.',
    'Engineered background worker monitoring 50+ remote HTTP/TCP endpoints with sub-100ms Redis-cached telemetry queries.',
    'Dockerized full-stack multi-container system with Docker Compose, reducing environment provisioning time by 80%.',
  ],
  githubReadme: `# DevPulse ⚡\n\n> Real-Time Distributed Microservice Health & API Gateway Monitor\n\n## ✨ Features\n- 🛰️ Real-time endpoint pinging and latency visualization\n- 🔐 JWT Auth with HttpOnly cookie rotation and RBAC\n- 🐳 Full Docker & Docker Compose setup\n- 📊 Automated SLA & Uptime calculations\n\n## 🛠️ Stack\n- Frontend: React 19, TypeScript, Tailwind CSS\n- Backend: Node.js, Express, TypeScript\n- Database: PostgreSQL, Redis\n- DevOps: Docker, Docker Compose, Nginx\n\n## 🚀 Quickstart\n\`\`\`bash\ngit clone https://github.com/aaravsharma/devpulse.git\ncd devpulse\ndocker-compose up -d\n\`\`\`\n\nOpen \`http://localhost:3000\` in your browser.`,
};

export const initialOpportunities: OpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Software Developer Intern',
    company: 'Stripe',
    type: 'Internship',
    location: 'Bengaluru / Hybrid',
    stipendOrSalary: '₹85,000 / month',
    deadline: 'In 12 days',
    matchScore: 88,
    matchedSkills: ['React', 'JavaScript', 'SQL', 'Git & GitHub', 'Java'],
    missingSkills: ['Docker Basics'],
    readinessVerdict: 'High Match',
    recommendedAction: 'Apply immediately + brush up Docker container fundamentals.',
    applied: false,
  },
  {
    id: 'opp-2',
    title: 'Full Stack Engineer (Fresher)',
    company: 'Razorpay',
    type: 'Full-time',
    location: 'Bengaluru, Karnataka',
    stipendOrSalary: '₹14 - 18 LPA',
    deadline: 'In 18 days',
    matchScore: 76,
    matchedSkills: ['React', 'JavaScript (ES6+)', 'SQL', 'Database Design'],
    missingSkills: ['Node.js Backend APIs', 'AWS Cloud Basics'],
    readinessVerdict: 'Good',
    recommendedAction: 'Complete Week 4 Express module on your roadmap before applying.',
    applied: false,
  },
  {
    id: 'opp-3',
    title: 'Frontend Engineer - Platform',
    company: 'Postman',
    type: 'Full-time',
    location: 'Remote, India',
    stipendOrSalary: '₹16 - 22 LPA',
    deadline: 'In 7 days',
    matchScore: 92,
    matchedSkills: ['React 19', 'JavaScript', 'Tailwind CSS', 'Git Workflows', 'API Integration'],
    missingSkills: [],
    readinessVerdict: 'High Match',
    recommendedAction: 'Perfect match for your existing skills! Highlight TaskOps and component architecture.',
    applied: true,
  },
  {
    id: 'opp-4',
    title: 'Cloud & Backend Associate',
    company: 'InnovateX Labs',
    type: 'Full-time',
    location: 'Hyderabad / Remote',
    stipendOrSalary: '₹10 - 14 LPA',
    deadline: 'In 24 days',
    matchScore: 58,
    matchedSkills: ['Java', 'SQL', 'Git'],
    missingSkills: ['Node.js', 'Docker', 'AWS EC2', 'System Design'],
    readinessVerdict: 'Needs Preparation',
    recommendedAction: 'Requires 4 more weeks of backend and containerization study before submitting.',
    applied: false,
  },
  {
    id: 'opp-5',
    title: 'Smart India Hackathon 2026',
    company: 'Ministry of Education & AICTE',
    type: 'Hackathon',
    location: 'Nationwide, India',
    stipendOrSalary: '₹1,00,000 Prize + Direct PPO',
    deadline: 'In 15 days',
    matchScore: 90,
    matchedSkills: ['React', 'JavaScript', 'Java', 'SQL', 'Problem Solving'],
    missingSkills: ['Production Deployment'],
    readinessVerdict: 'High Match',
    recommendedAction: 'Form team with college batchmates; pitch your DevPulse / LifeOS prototype.',
    applied: false,
  },
];

export const initialApplications: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Postman',
    role: 'Frontend Engineer - Platform',
    dateApplied: '2026-09-18',
    status: 'Assessment',
    interviewDate: '2026-09-28',
    notes: 'Completed initial take-home coding assessment on React component performance. Waiting for Round 1 technical interview.',
    salaryRange: '₹16 - 22 LPA',
  },
  {
    id: 'app-2',
    company: 'Stripe',
    role: 'Software Developer Intern',
    dateApplied: '2026-09-21',
    status: 'Applied',
    notes: 'Referred by NIT alumni on LinkedIn. Tailored resume submitted with TaskOps and CS coursework.',
    salaryRange: '₹85,000 / month',
  },
  {
    id: 'app-3',
    company: 'Swiggy',
    role: 'Associate Software Engineer',
    dateApplied: '2026-09-10',
    status: 'Interview',
    interviewDate: '2026-09-25',
    notes: 'Cleared DSA online assessment (2/2 questions solved). System design & live coding round scheduled for this Friday.',
    salaryRange: '₹15 - 19 LPA',
  },
  {
    id: 'app-4',
    company: 'Cred',
    role: 'Frontend Engineering Intern',
    dateApplied: '2026-08-28',
    status: 'Rejected',
    notes: 'Heavy emphasis on WebGL and mobile animation micro-interactions. Added to learning backlog.',
    salaryRange: '₹60,000 / month',
  },
];

export const initialBrainDocuments: BrainDocument[] = [
  {
    id: 'doc-1',
    title: 'DBMS Normalization & Indexing Notes.pdf',
    type: 'PDF',
    size: '1.4 MB',
    tags: ['DBMS', 'SQL', 'Normalization', 'Indexes'],
    summary: 'Comprehensive notes on 1NF, 2NF, 3NF, BCNF, functional dependencies, B-Tree vs Hash index performance, and ACID properties.',
    contentSnippet: `NORMALIZATION IN RELATIONAL DATABASES
1NF: Attributes must be atomic. No repeating groups.
2NF: In 1NF and no partial dependencies. Every non-prime attribute must depend on the whole candidate key.
3NF: In 2NF and no transitive dependencies (X -> Y where Y is non-prime, X must be superkey).
BCNF: For every functional dependency X -> Y, X must be a super key.
INDEXING: B-Tree indexes provide O(log N) lookup, range query capability. Hash indexes provide O(1) exact match but no range scans.
ACID: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrency control levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable), Durability (WAL commits written to disk).`,
    uploadedDate: '2026-09-12',
  },
  {
    id: 'doc-2',
    title: 'Operating Systems & Concurrency CheatSheet.pdf',
    type: 'PDF',
    size: '850 KB',
    tags: ['OS', 'Concurrency', 'Threads', 'Memory'],
    summary: 'Core notes covering Process vs Thread, CPU scheduling algorithms, Deadlocks (Coffman conditions), Semaphores, and Virtual Memory paging.',
    contentSnippet: `OPERATING SYSTEMS & CONCURRENCY
Process: Instance of a program in execution with independent address space.
Thread: Light-weight unit of execution sharing process address space (heap, code, data), with private stack & registers.
Deadlock 4 Conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait.
Virtual Memory: Paging splits memory into fixed-size frames, translates logical address to physical using Page Table with TLB cache.
Page Replacement Algorithms: FIFO, LRU (Least Recently Used), Optimal.`,
    uploadedDate: '2026-09-15',
  },
  {
    id: 'doc-3',
    title: 'FullStack_System_Design_Principles.md',
    type: 'Markdown',
    size: '340 KB',
    tags: ['System Design', 'Architecture', 'Caching', 'Scalability'],
    summary: 'High-level architecture concepts: Load balancing, Horizontal vs Vertical scaling, Redis caching strategies, Database sharding, and CDN.',
    contentSnippet: `SYSTEM DESIGN FUNDAMENTALS
Scaling: Vertical (scale-up bigger machine) vs Horizontal (scale-out more commodity nodes).
Load Balancers: Round-robin, Weighted round-robin, Least connections, IP Hash. Layer 4 (Transport) vs Layer 7 (Application).
Caching: Cache-Aside (Lazy loading), Write-Through, Write-Back. Eviction policies: LRU, LFU, FIFO.
Database Partitioning: Vertical partitioning (split tables by columns) vs Horizontal partitioning (sharding by user_id/hash key).
CAP Theorem: In a distributed data store, you can only guarantee 2 of Consistency, Availability, and Partition Tolerance.`,
    uploadedDate: '2026-09-19',
  },
  {
    id: 'doc-4',
    title: 'Aarav_Sharma_Resume_v3.pdf',
    type: 'PDF',
    size: '210 KB',
    tags: ['Resume', 'Career', 'Profile'],
    summary: 'Active resume submitted to job portals featuring React, TaskOps project, NIT B.Tech coursework, and placement track record.',
    contentSnippet: `Aarav Sharma - Final Year Computer Science Student at NIT. Target: Full Stack Developer. Strong skills in React, JavaScript, Java, SQL. Built TaskOps, Algorithm Visualizer, and Placement Portal.`,
    uploadedDate: '2026-09-20',
  },
  {
    id: 'doc-5',
    title: 'AWS Cloud Practitioner & Docker Notes.pdf',
    type: 'PDF',
    size: '1.1 MB',
    tags: ['AWS', 'Docker', 'DevOps', 'Cloud'],
    summary: 'Summary of AWS services (EC2, S3, RDS, VPC, IAM) and Docker fundamentals (Images, Containers, Volumes, Networking).',
    contentSnippet: `AWS & DOCKER FOUNDATIONS
Docker: Container vs VM (shares host kernel vs runs hypervisor with full guest OS).
Dockerfile directives: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD/ENTRYPOINT.
AWS Core: EC2 (Virtual computing instances), S3 (Object storage with 99.999999999% durability), RDS (Managed relational database engine for Postgres/MySQL), IAM (Identity & Access Management policies).`,
    uploadedDate: '2026-09-22',
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'mentor',
    text: 'Good morning, Aarav! 🚀 I am your LifeOS AI Mentor. I have synced your profile (Final-Year CS Student, target: Full Stack Developer). How can I assist your career and technical growth today?',
    timestamp: '09:00 AM',
  },
  {
    id: 'm-2',
    sender: 'user',
    text: 'आज मुझे क्या पढ़ना चाहिए?',
    timestamp: '09:02 AM',
  },
  {
    id: 'm-3',
    sender: 'mentor',
    text: `नमस्ते Aarav! आपके current target **Full Stack Developer** और 12-Week Roadmap के Week 3–4 के आधार पर, आज आपका priority topic **Node.js Authentication & JWT Middleware** होना चाहिए।

**आज का 3-Step Action Plan:**
1. **Express Auth Middleware**: JWT token verification logic समझें और ` + "`req.user`" + ` inject करें।
2. **Password Security**: Plain text password कभी store न करें; ` + "`bcrypt`" + ` (salt rounds 10) का use करें।
3. **Hands-on Verification**: Postman से Login, Register और Protected Route endpoints test करें।

यह complete करने से आपका backend skill readiness score **74% से 79%** jump कर जाएगा! क्या आप इसके लिए 1-hour practice session शुरू करना चाहते हैं?`,
    timestamp: '09:03 AM',
    actionPrompt: 'Start Node.js Auth Practice',
  },
];

export const initialAchievements: AchievementBadge[] = [
  {
    id: 'badge-project-1',
    title: 'First Project Finished',
    description: 'Completed a production-ready software project milestone with documented architecture.',
    category: 'Milestone',
    iconType: 'project',
    unlocked: true,
    unlockedDate: '2026-09-15',
    progress: 1,
    maxProgress: 1,
    rewardXp: 500,
    criteria: 'Complete at least 1 production project development milestone',
  },
  {
    id: 'badge-streak-7',
    title: 'Learning Streak 7 Days',
    description: 'Consistently engaged with LifeOS action items and technical milestones for 7 straight days.',
    category: 'Consistency',
    iconType: 'streak',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    rewardXp: 750,
    criteria: 'Maintain an active daily learning streak for 7 consecutive days',
  },
  {
    id: 'badge-sprint-finisher',
    title: 'Sprint Finisher',
    description: 'Successfully completed 2+ comprehensive engineering modules in your roadmap.',
    category: 'Milestone',
    iconType: 'roadmap',
    unlocked: true,
    unlockedDate: '2026-09-20',
    progress: 2,
    maxProgress: 2,
    rewardXp: 400,
    criteria: 'Complete at least 2 full roadmap weeks',
  },
  {
    id: 'badge-ats-master',
    title: 'ATS Resume Master',
    description: 'Calibrated your resume to pass tier-1 applicant tracking systems and recruiter filters.',
    category: 'Career',
    iconType: 'resume',
    unlocked: true,
    unlockedDate: '2026-09-18',
    progress: 74,
    maxProgress: 75,
    rewardXp: 350,
    criteria: 'Attain a resume score of 75% or higher in Resume Intelligence',
  },
  {
    id: 'badge-skill-bridger',
    title: 'Skill Gap Conqueror',
    description: 'Bridged your primary target skill gap by completing hands-on backend practice.',
    category: 'Skills',
    iconType: 'skill',
    unlocked: false,
    progress: 1,
    maxProgress: 2,
    rewardXp: 600,
    criteria: 'Complete Node.js Auth & Express middleware exercises',
  },
  {
    id: 'badge-first-application',
    title: 'Market Contender',
    description: 'Submitted and tracked real job or internship applications in the pipeline tracker.',
    category: 'Career',
    iconType: 'application',
    unlocked: true,
    unlockedDate: '2026-09-21',
    progress: 2,
    maxProgress: 1,
    rewardXp: 300,
    criteria: 'Track at least 1 job application in the pipeline',
  },
  {
    id: 'badge-rag-scholar',
    title: 'Knowledge Synthesizer',
    description: 'Indexed study notes and conducted semantic RAG queries across your Knowledge Brain.',
    category: 'Skills',
    iconType: 'knowledge',
    unlocked: true,
    unlockedDate: '2026-09-22',
    progress: 5,
    maxProgress: 5,
    rewardXp: 250,
    criteria: 'Index at least 5 study documents into your Knowledge Brain',
  },
];
