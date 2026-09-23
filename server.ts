import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  // Initialize Gemini SDK server-side
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // ----------------------------------------------------
  // 1. AI Mentor Chat API
  // ----------------------------------------------------
  app.post('/api/mentor/chat', async (req: Request, res: Response) => {
    try {
      const { message, profile, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (ai) {
        const systemInstruction = `You are LifeOS AI Mentor, an empathetic, hyper-competent personal career and technical growth advisor for students, freshers, and professionals.
User Profile:
- Name: ${profile?.name || 'User'}
- Current Level: ${profile?.level || 'Final-Year CS Student'}
- Target Role: ${profile?.targetRole || 'Full Stack Developer'}
- Current Skills: ${Array.isArray(profile?.skills) ? profile.skills.map((s: any) => typeof s === 'string' ? s : s.name).join(', ') : 'React, JavaScript, Java, SQL'}
- Skill Gaps: ${Array.isArray(profile?.skillGaps) ? profile.skillGaps.map((s: any) => typeof s === 'string' ? s : s.name).join(', ') : 'Node.js, Docker, AWS'}
- Career Goal: ${profile?.careerGoal || 'Land a Full Stack Developer role'}

Guidelines:
1. Provide actionable, concise, structured advice grounded in their exact target role and current skill gaps.
2. If the user asks in Hindi or Hinglish (e.g. "आज मुझे क्या पढ़ना चाहिए?"), respond warmly in fluent natural Hindi/Hinglish or English with key technical terms in English.
3. Keep answers clear, structured with bullet points or numbered steps when giving study tips or plans.
4. Recommend concrete next actions (e.g., "Step 1: Build a JWT auth middleware", "Step 2: Add refresh token rotation").`;

        const prompt = `Conversation history:
${history.slice(-6).map((h: any) => `${h.role === 'user' ? 'User' : 'LifeOS Mentor'}: ${h.text}`).join('\n')}

User's new message:
${message}

Please provide your intelligent LifeOS Mentor guidance.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'Keep progressing! Focus on your priority skill gaps.';
        return res.json({ reply });
      } else {
        // Fallback context-aware response if API key is not attached
        let fallbackReply = `Great question! Based on your target role as **${profile?.targetRole || 'Full Stack Developer'}**, your highest priority gap right now is **Node.js & Backend Architecture**.\n\nHere is your recommended focus today:\n1. **Core Concept**: Implement REST API authentication using JWT and bcrypt.\n2. **Hands-on Practice**: Build a protected route middleware in Express.\n3. **Quick Test**: Test login, token expiry, and refresh flows in Postman.\n\nOnce this is done, you'll be one step closer to closing the backend gap on your LifeOS roadmap!`;

        if (message.toLowerCase().includes('hindi') || message.includes('पढ़ना') || message.includes('आज')) {
          fallbackReply = `नमस्ते ${profile?.name || ''}! आपके target role **${profile?.targetRole || 'Full Stack Developer'}** के आधार पर आज आपको **Node.js Authentication & JWT Middleware** पढ़ना चाहिए।\n\n**आज का 3-Step Action Plan:**\n1. **Express Auth Middleware**: JWT token verification logic समझें और implement करें।\n2. **Security**: Password hashing के लिए bcrypt का use करें।\n3. **Practice**: Postman पर Login & Register endpoints test करें।\n\nयह टॉपिक पूरा होते ही आपका Backend Skill Gap 35% से बढ़कर 50% हो जाएगा!`;
        }

        return res.json({ reply: fallbackReply });
      }
    } catch (err: any) {
      console.error('Error in /api/mentor/chat:', err);
      res.status(500).json({ error: err.message || 'Failed to process mentor chat' });
    }
  });

  // ----------------------------------------------------
  // 2. Resume Intelligence Analyzer API
  // ----------------------------------------------------
  app.post('/api/resume/analyze', async (req: Request, res: Response) => {
    try {
      const { resumeText, targetRole = 'Full Stack Developer' } = req.body;

      if (!resumeText || resumeText.trim().length < 20) {
        return res.status(400).json({ error: 'Valid resume content is required for analysis.' });
      }

      if (ai) {
        const prompt = `You are LifeOS Resume Intelligence AI. Analyze this resume against the target role: "${targetRole}".
Resume Text:
"""
${resumeText}
"""

Return a strictly formatted JSON object with this exact structure:
{
  "scores": {
    "technicalSkills": number (0-100),
    "projects": number (0-100),
    "experience": number (0-100),
    "atsKeywords": number (0-100),
    "overall": number (0-100)
  },
  "summary": "2-3 sentences diagnostic summary",
  "strengths": ["string", "string", "string"],
  "criticalGaps": ["string", "string", "string"],
  "missingKeywords": ["string", "string", "string", "string", "string"],
  "bulletImprovements": [
    {
      "original": "Weak bullet or generic description from resume",
      "improved": "Action-verb + metric + tech stack quantified improvement",
      "reason": "Why this change improves ATS and recruiter perception"
    }
  ],
  "actionPlan": ["Step 1...", "Step 2...", "Step 3..."]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const jsonText = response.text || '{}';
        const parsed = JSON.parse(jsonText);
        return res.json(parsed);
      } else {
        // Fallback diagnostic analysis
        return res.json({
          scores: {
            technicalSkills: 82,
            projects: 75,
            experience: 60,
            atsKeywords: 68,
            overall: 74,
          },
          summary: `Your resume demonstrates solid frontend foundation with React and modern JavaScript. However, for a competitive ${targetRole} position, you need stronger evidence of backend architectures (Node.js, Docker), database optimizations, and quantifiable impact metrics.`,
          strengths: [
            'Clean project demonstrations highlighting React and component design',
            'Strong foundation in core computer science fundamentals and data structures',
            'Clear educational qualifications and technical coursework',
          ],
          criticalGaps: [
            'Limited backend production metrics (e.g., RPS, latency, API design)',
            'Missing DevOps & cloud deployment highlights (Docker, AWS, CI/CD)',
            'Project bullet points lack XYZ format (Accomplished [X] measured by [Y] by doing [Z])',
          ],
          missingKeywords: ['Node.js', 'Express', 'Docker', 'AWS EC2/S3', 'RESTful APIs', 'JWT Authentication', 'PostgreSQL / MongoDB', 'CI/CD Pipelines'],
          bulletImprovements: [
            {
              original: 'Built a web application using React and Firebase for managing tasks.',
              improved: 'Architected responsive TaskOps web app using React 19 and Node.js REST APIs; reduced task synchronization latency by 42% for 500+ active sessions.',
              reason: 'Replaces passive phrasing with strong engineering verbs and measurable latency metrics.',
            },
            {
              original: 'Worked on database queries and backend features.',
              improved: 'Designed normalized PostgreSQL schema and optimized index queries, reducing average API response times from 340ms to 95ms.',
              reason: 'Demonstrates deep database understanding and quantitative system performance improvement.',
            },
          ],
          actionPlan: [
            'Incorporate missing backend keywords: Node.js, Express, Docker, and AWS',
            'Rewrite 3 project bullet points using quantifiable metrics (latency, user count, load reduction)',
            'Add a dedicated "Cloud & DevOps" skill subset displaying Docker & GitHub Actions',
          ],
        });
      }
    } catch (err: any) {
      console.error('Error in /api/resume/analyze:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze resume' });
    }
  });

  // ----------------------------------------------------
  // 3. AI Skill Gap Analyzer API
  // ----------------------------------------------------
  app.post('/api/skill-gap/analyze', async (req: Request, res: Response) => {
    try {
      const { jobDescription, userSkills = [] } = req.body;

      if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
      }

      if (ai) {
        const skillsList = userSkills.map((s: any) => typeof s === 'string' ? s : s.name).join(', ');
        const prompt = `You are LifeOS Skill Gap Analyzer.
Compare the user's current skills against this Job Description.

User Skills:
${skillsList || 'React, JavaScript, HTML/CSS, Java, SQL, Git'}

Job Description:
"""
${jobDescription}
"""

Return a strictly formatted JSON object:
{
  "matchPercentage": number (0-100),
  "matchedSkills": ["Skill 1", "Skill 2"],
  "missingSkills": ["Skill 1", "Skill 2"],
  "priorityBreakdown": [
    {
      "priority": 1,
      "skill": "Skill Name",
      "reason": "Why this is top priority for this job",
      "timeToLearn": "e.g. 1-2 weeks",
      "recommendedResource": "Suggested topic/project"
    }
  ],
  "overallVerdict": "High Compatibility / Moderate Gap / Significant Gap",
  "readinessTimeline": "Estimated weeks to become interview-ready (e.g. 4-6 weeks)",
  "strategySummary": "Short 2-sentence actionable bridging roadmap"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const jsonText = response.text || '{}';
        return res.json(JSON.parse(jsonText));
      } else {
        // Fallback skill gap output
        return res.json({
          matchPercentage: 62,
          matchedSkills: ['React', 'JavaScript (ES6+)', 'SQL', 'Git & GitHub'],
          missingSkills: ['Node.js', 'MongoDB', 'Docker', 'AWS'],
          priorityBreakdown: [
            {
              priority: 1,
              skill: 'Node.js & Express',
              reason: 'Core backend requirement for 85% of Full Stack job descriptions; needed to build full API servers.',
              timeToLearn: '2 weeks',
              recommendedResource: 'Build a REST API with JWT Auth and MongoDB/PostgreSQL',
            },
            {
              priority: 2,
              skill: 'MongoDB / NoSQL Database',
              reason: 'Required for dynamic document storage in modern MERN and fullstack stacks.',
              timeToLearn: '1 week',
              recommendedResource: 'Mongoose ODM schema design and aggregation pipelines',
            },
            {
              priority: 3,
              skill: 'Docker',
              reason: 'Standard industry tool for containerizing applications across dev and prod environments.',
              timeToLearn: '1 week',
              recommendedResource: 'Multi-stage Dockerfile for React + Node.js backend',
            },
            {
              priority: 4,
              skill: 'AWS Cloud Basics',
              reason: 'Required to deploy and maintain cloud infrastructure (EC2, S3, RDS).',
              timeToLearn: '1-2 weeks',
              recommendedResource: 'AWS Free Tier deployment with custom domain and SSL',
            },
          ],
          overallVerdict: 'Moderate Gap - High Conversion Potential',
          readinessTimeline: '4 - 6 weeks',
          strategySummary: 'You have solid frontend foundations. By dedicating the next 4 weeks to Node.js backend architecture and containerization, you will match 90%+ of requirements for this role.',
        });
      }
    } catch (err: any) {
      console.error('Error in /api/skill-gap/analyze:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze skill gap' });
    }
  });

  // ----------------------------------------------------
  // 4. Personalized Learning Roadmap Generator API
  // ----------------------------------------------------
  app.post('/api/roadmap/generate', async (req: Request, res: Response) => {
    try {
      const { targetRole, currentSkills = [], durationWeeks = 12 } = req.body;

      if (ai) {
        const skillsList = currentSkills.map((s: any) => typeof s === 'string' ? s : s.name).join(', ');
        const prompt = `Create a detailed, step-by-step personalized learning roadmap for:
Target Role: ${targetRole || 'Full Stack Developer'}
Current Skills: ${skillsList || 'React, JavaScript, SQL'}
Total Duration: ${durationWeeks} Weeks

Return a strictly formatted JSON object:
{
  "title": "${durationWeeks}-Week ${targetRole || 'Full Stack Developer'} Career Roadmap",
  "overview": "2 sentence roadmap strategy summary",
  "targetRole": "${targetRole || 'Full Stack Developer'}",
  "totalWeeks": ${durationWeeks},
  "weeks": [
    {
      "weekNumber": 1,
      "title": "Module Title",
      "focus": "Core focus of the week",
      "topics": ["Topic 1", "Topic 2", "Topic 3"],
      "handsOnTask": "Practical project/task to complete",
      "deliverable": "Concrete git repo or feature build",
      "status": "completed | in-progress | pending"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const jsonText = response.text || '{}';
        return res.json(JSON.parse(jsonText));
      } else {
        // Fallback 12-week roadmap
        return res.json({
          title: `12-Week ${targetRole || 'Full Stack Developer'} Roadmap`,
          overview: 'A high-impact engineering roadmap designed to bridge your backend and DevOps gaps while leveraging your existing React strengths.',
          targetRole: targetRole || 'Full Stack Developer',
          totalWeeks: 12,
          weeks: [
            {
              weekNumber: 1,
              title: 'JavaScript Deep Dive & Asynchronous Programming',
              focus: 'Event Loop, Promises, Async/Await, Closures, Prototypes',
              topics: ['Event Loop & Microtask queue', 'Promise chaining & concurrency', 'Memory management & Garbage Collection'],
              handsOnTask: 'Build custom Promise polyfill and async task queue with concurrency limiter',
              deliverable: 'github.com/user/js-async-runtime',
              status: 'completed',
            },
            {
              weekNumber: 2,
              title: 'Advanced React Patterns & State Architectures',
              focus: 'Hooks internals, context optimization, performance profiling',
              topics: ['Custom hooks composition', 'useMemo/useCallback optimization', 'Virtual DOM & Fiber reconciler'],
              handsOnTask: 'Refactor state management with React 19 useActionState & optimistics',
              deliverable: 'High-performance data grid component',
              status: 'completed',
            },
            {
              weekNumber: 3,
              title: 'Node.js Runtime & Architecture',
              focus: 'Node.js architecture, libuv, Streams, Buffers, File System',
              topics: ['V8 & libuv thread pool', 'Node.js event-driven architecture', 'Streams, Pipes & Buffers'],
              handsOnTask: 'Write a high-throughput log parser stream processing 1GB CSV logs',
              deliverable: 'CLI streaming log parser',
              status: 'in-progress',
            },
            {
              weekNumber: 4,
              title: 'Express Framework & Middleware Pipeline',
              focus: 'Routing, middleware chains, error handling, input validation',
              topics: ['Middleware lifecycle', 'Zod schema validation', 'Centralized error handler & logging'],
              handsOnTask: 'Build structured Express boilerplate with rate-limiting and Winston logging',
              deliverable: 'Production-ready Express starter template',
              status: 'pending',
            },
            {
              weekNumber: 5,
              title: 'Relational Database Engineering with PostgreSQL',
              focus: 'Schema design, indexing strategies, ACID transactions, Prisma ORM',
              topics: ['Relational schema normalization (3NF)', 'B-Tree Indexing & EXPLAIN ANALYZE', 'Transactions & isolation levels'],
              handsOnTask: 'Design an e-commerce ledger schema with inventory locking transactions',
              deliverable: 'PostgreSQL schema with automated migration scripts',
              status: 'pending',
            },
            {
              weekNumber: 6,
              title: 'NoSQL & Document Modeling with MongoDB',
              focus: 'Mongoose ODM, aggregation framework, indexing, document embeds vs references',
              topics: ['Document schema patterns', 'Aggregation pipeline stages', 'Compound and TTL indexes'],
              handsOnTask: 'Build analytics dashboard API using multi-stage MongoDB aggregations',
              deliverable: 'Real-time analytics aggregator service',
              status: 'pending',
            },
            {
              weekNumber: 7,
              title: 'Authentication, Authorization & Security',
              focus: 'JWT tokens, refresh rotation, bcrypt, OAuth2, RBAC',
              topics: ['JWT access & refresh token lifecycle', 'HttpOnly secure cookies & CSRF defense', 'Role-Based Access Control (RBAC)'],
              handsOnTask: 'Implement end-to-end auth service with email verification and session revocation',
              deliverable: 'Secure authentication microservice',
              status: 'pending',
            },
            {
              weekNumber: 8,
              title: 'RESTful API Design, WebSockets & Integration',
              focus: 'API versioning, OpenAPI/Swagger, pagination, WebSockets for real-time events',
              topics: ['REST best practices & HTTP status codes', 'Cursor-based vs offset pagination', 'Socket.io real-time notifications'],
              handsOnTask: 'Build collaborative workspace backend with real-time presence indicators',
              deliverable: 'Real-time collaborative API server',
              status: 'pending',
            },
            {
              weekNumber: 9,
              title: 'Docker & Containerization',
              focus: 'Dockerfiles, multi-stage builds, Docker Compose, container networking',
              topics: ['Docker engine architecture', 'Multi-stage build optimization', 'Docker Compose multi-service orchestration'],
              handsOnTask: 'Dockerize fullstack React + Node.js + PostgreSQL + Redis stack in single compose file',
              deliverable: 'docker-compose.yml with healthchecks and volume persistence',
              status: 'pending',
            },
            {
              weekNumber: 10,
              title: 'Cloud Infrastructure & AWS Basics',
              focus: 'AWS EC2, S3 bucket storage, RDS managed DB, VPC & Security Groups',
              topics: ['EC2 instance provisioning & SSH configuration', 'S3 pre-signed URLs for file uploads', 'RDS deployment & automated backups'],
              handsOnTask: 'Deploy containerized app on AWS EC2 with Nginx reverse proxy and Let\'s Encrypt SSL',
              deliverable: 'Live HTTPS deployed application on AWS',
              status: 'pending',
            },
            {
              weekNumber: 11,
              title: 'Full Stack Capstone Portfolio Project',
              focus: 'End-to-end integration: React UI, Node backend, Database, Docker, Cloud hosting',
              topics: ['System architecture design', 'End-to-end integration testing', 'Automated CI/CD with GitHub Actions'],
              handsOnTask: 'Build LifeOS AI / SaaS platform with full authentication, dashboard, and API',
              deliverable: 'Production live URL + polished GitHub README',
              status: 'pending',
            },
            {
              weekNumber: 12,
              title: 'Technical Interview Prep & ATS Resume Optimization',
              focus: 'System design fundamentals, coding interview drills, portfolio review',
              topics: ['System design for freshers (scaling, caching, load balancers)', 'Common fullstack coding interview questions', 'ATS keyword alignment on LinkedIn & Resume'],
              handsOnTask: 'Complete 10 mock interview technical assessments and update portfolio',
              deliverable: 'Polished portfolio, updated resume, active job applications',
              status: 'pending',
            },
          ],
        });
      }
    } catch (err: any) {
      console.error('Error in /api/roadmap/generate:', err);
      res.status(500).json({ error: err.message || 'Failed to generate roadmap' });
    }
  });

  // ----------------------------------------------------
  // 5. AI Project Generator API
  // ----------------------------------------------------
  app.post('/api/project/generate', async (req: Request, res: Response) => {
    try {
      const { prompt: userIdea, targetRole = 'Full Stack Developer', currentSkills = [] } = req.body;

      if (ai) {
        const skillsList = currentSkills.map((s: any) => typeof s === 'string' ? s : s.name).join(', ');
        const prompt = `You are LifeOS Project Generator AI. Create an industry-grade, resume-worthy project specification.
User Request / Focus: ${userIdea || 'Give me a project that will improve my resume and cover my skill gaps in Node.js, Docker, and SQL.'}
Target Role: ${targetRole}
Current Skills: ${skillsList || 'React, SQL, Java'}

Return a strictly formatted JSON object:
{
  "projectName": "Name of the Project",
  "tagline": "One-line catchy summary",
  "problemStatement": "Detailed real-world problem solved",
  "targetUsers": ["Audience 1", "Audience 2"],
  "techStack": {
    "frontend": "React 19, TypeScript, Tailwind CSS",
    "backend": "Node.js, Express, TypeScript",
    "database": "PostgreSQL with Prisma / MongoDB",
    "devops": "Docker, Docker Compose, AWS EC2 / Render",
    "auth": "JWT with refresh token rotation"
  },
  "architectureOverview": "3-4 sentence architecture explanation",
  "features": [
    {
      "name": "Feature Name",
      "description": "What it does and how it proves engineering skill"
    }
  ],
  "databaseSchema": [
    {
      "table": "users",
      "columns": ["id UUID PK", "email VARCHAR UNIQUE", "password_hash VARCHAR", "created_at TIMESTAMP"]
    },
    {
      "table": "projects",
      "columns": ["id UUID PK", "user_id UUID FK", "title VARCHAR", "status VARCHAR"]
    }
  ],
  "apiEndpoints": [
    {
      "method": "POST",
      "path": "/api/v1/auth/login",
      "description": "Authenticate user and issue JWT pair"
    },
    {
      "method": "GET",
      "path": "/api/v1/projects",
      "description": "Fetch user projects with cursor pagination"
    }
  ],
  "uiPages": ["Landing Page", "Authentication Modal", "Main Dashboard", "Project Workspace", "Analytics & Export"],
  "developmentTasks": [
    { "id": "task-1", "title": "Setup React 19 Frontend with Tailwind", "category": "Frontend", "status": "COMPLETED" },
    { "id": "task-2", "title": "Setup Express TypeScript Backend Server", "category": "Backend", "status": "IN PROGRESS" },
    { "id": "task-3", "title": "Design Database Schema & Setup Prisma", "category": "Database", "status": "TODO" },
    { "id": "task-4", "title": "Implement JWT Auth & Cookie Handling", "category": "Auth", "status": "TODO" },
    { "id": "task-5", "title": "Build Core Business Logic APIs", "category": "Backend", "status": "TODO" },
    { "id": "task-6", "title": "Integrate Frontend with Backend APIs", "category": "Integration", "status": "TODO" },
    { "id": "task-7", "title": "Containerize with Docker & Docker Compose", "category": "DevOps", "status": "TODO" },
    { "id": "task-8", "title": "Deploy to Cloud with SSL & Domain", "category": "Deployment", "status": "TODO" }
  ],
  "deploymentPlan": "Step-by-step deployment steps",
  "resumeDescription": [
    "Engineered [Project Name] using React 19 and Node.js micro-architecture...",
    "Implemented secure JWT authentication with refresh rotation...",
    "Dockerized multi-container setup reducing setup time by 80%..."
  ],
  "githubReadme": "# Markdown text of a complete GitHub README.md"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const jsonText = response.text || '{}';
        return res.json(JSON.parse(jsonText));
      } else {
        // Fallback high-impact project spec
        return res.json({
          projectName: 'DevPulse - Distributed Microservice Health & API Gateway',
          tagline: 'High-availability monitoring platform with automated failover and telemetry analytics.',
          problemStatement: 'Modern engineering teams deploy microservices across distributed nodes with disparate health monitoring, resulting in undetected API degradations and manual incident resolution.',
          targetUsers: ['DevOps Engineers', 'Backend Developers', 'Startup Engineering Teams'],
          techStack: {
            frontend: 'React 19, TypeScript, Tailwind CSS, Lucide Icons',
            backend: 'Node.js, Express, TypeScript, Zod',
            database: 'PostgreSQL (Relational metrics & audit logs) + Redis (Cache)',
            devops: 'Docker, Docker Compose, Nginx Reverse Proxy',
            auth: 'JWT with Refresh Token Rotation and RBAC',
          },
          architectureOverview: 'Client React app communicates through an Express API Gateway. Worker background tasks poll registered endpoints, recording latency and status codes into PostgreSQL with Redis caching for instant dashboard metrics.',
          features: [
            {
              name: 'Real-time API Heartbeat & Latency Radar',
              description: 'Continuous health checking with sub-second WebSocket updates to the React client.',
            },
            {
              name: 'Automated Incident Alerting & Webhooks',
              description: 'Dispatches instant notifications to Discord/Slack when error rates exceed threshold.',
            },
            {
              name: 'Multi-Tenant RBAC & Team Spaces',
              description: 'Enforces secure tenant isolation with role-based permissions (Admin, Member, Viewer).',
            },
            {
              name: 'Exportable SLA & Uptime Compliance Reports',
              description: 'Generates tabular uptime logs and downloadable audit reports with 99.9% precision.',
            },
          ],
          databaseSchema: [
            {
              table: 'users',
              columns: ['id UUID PK', 'email VARCHAR UNIQUE', 'password_hash VARCHAR', 'role VARCHAR', 'created_at TIMESTAMP'],
            },
            {
              table: 'monitored_services',
              columns: ['id UUID PK', 'user_id UUID FK', 'name VARCHAR', 'endpoint_url VARCHAR', 'interval_sec INT', 'status VARCHAR'],
            },
            {
              table: 'latency_logs',
              columns: ['id BIGSERIAL PK', 'service_id UUID FK', 'status_code INT', 'response_time_ms INT', 'recorded_at TIMESTAMP'],
            },
          ],
          apiEndpoints: [
            { method: 'POST', path: '/api/v1/auth/register', description: 'Register new user account with hashed password' },
            { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate user and set secure HttpOnly cookie' },
            { method: 'GET', path: '/api/v1/services', description: 'List all registered endpoints with live status' },
            { method: 'POST', path: '/api/v1/services', description: 'Register new endpoint for automated monitoring' },
            { method: 'GET', path: '/api/v1/services/:id/metrics', description: 'Retrieve 24-hour latency logs and uptime percentage' },
          ],
          uiPages: ['Marketing Landing', 'Sign In / Register', 'Operations Dashboard', 'Service Detail & Telemetry', 'Alert Configuration'],
          developmentTasks: [
            { id: 'task-1', title: 'Setup React 19 Frontend with Tailwind & Lucide', category: 'Frontend', status: 'COMPLETED' },
            { id: 'task-2', title: 'Setup Express TypeScript Backend Server', category: 'Backend', status: 'IN PROGRESS' },
            { id: 'task-3', title: 'Design PostgreSQL Schema & Migrations', category: 'Database', status: 'TODO' },
            { id: 'task-4', title: 'Implement JWT Auth & Cookie Handling', category: 'Auth', status: 'TODO' },
            { id: 'task-5', title: 'Build Background Poller & Health Check Worker', category: 'Backend', status: 'TODO' },
            { id: 'task-6', title: 'Build Interactive Dashboard Charts & Grids', category: 'Frontend', status: 'TODO' },
            { id: 'task-7', title: 'Dockerize Frontend & Backend with Docker Compose', category: 'DevOps', status: 'TODO' },
            { id: 'task-8', title: 'Deploy to Cloud with Automated CI/CD Pipeline', category: 'Deployment', status: 'TODO' },
          ],
          deploymentPlan: '1. Build multi-stage Docker images. 2. Configure Docker Compose with PostgreSQL container and volume mount. 3. Provision Cloud EC2 instance. 4. Configure Nginx reverse proxy with SSL certificate.',
          resumeDescription: [
            'Architected DevPulse, a distributed microservice monitoring platform using React 19, TypeScript, Node.js, and PostgreSQL.',
            'Engineered automated background polling engine monitoring 50+ endpoints with sub-100ms Redis-cached latency dashboards.',
            'Containerized application using Docker Compose with multi-stage builds, reducing production image footprint by 65%.',
          ],
          githubReadme: `# DevPulse\n\n> Real-time Distributed Microservice Health & API Gateway Monitor\n\n## 🚀 Tech Stack\n- Frontend: React 19, TypeScript, Tailwind CSS\n- Backend: Node.js, Express, TypeScript\n- Database: PostgreSQL, Redis\n- DevOps: Docker, Docker Compose, Nginx\n\n## 📦 Quick Start\n\`\`\`bash\ngit clone https://github.com/yourname/devpulse.git\ncd devpulse\ndocker-compose up -d\n\`\`\`\n\nVisit \`http://localhost:3000\` to view the dashboard!`,
        });
      }
    } catch (err: any) {
      console.error('Error in /api/project/generate:', err);
      res.status(500).json({ error: err.message || 'Failed to generate project' });
    }
  });

  // ----------------------------------------------------
  // 6. Personal Knowledge Brain (RAG) Query API
  // ----------------------------------------------------
  app.post('/api/brain/query', async (req: Request, res: Response) => {
    try {
      const { query, documents = [] } = req.body;

      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      // Compile indexed document context
      const docContext = documents
        .map((d: any) => `DOCUMENT [${d.title}] (Type: ${d.type}, Tags: ${d.tags?.join(', ')}):\n${d.contentSnippet || d.summary}`)
        .join('\n\n');

      if (ai) {
        const prompt = `You are LifeOS Personal Knowledge Brain RAG engine.
The user is querying their uploaded personal notes, textbooks, study material, and career documents.

Available Indexed Documents:
"""
${docContext || 'Default Core CS Documents: DBMS Normalization, Operating Systems, System Design Principles, React Documentation'}
"""

User Query:
"${query}"

Instructions:
1. Answer the query thoroughly using the context from the user's indexed documents.
2. If the user asked in Hindi/Hinglish (e.g. "DBMS में normalization समझाओ"), explain the technical concepts clearly in bilingual/Hinglish format with crisp bullet points.
3. Cite which document(s) you drew the answer from (e.g. [Document: DBMS Normalization Notes]).
4. Provide practical exam/interview takeaways or code snippets where applicable.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.2,
          },
        });

        return res.json({
          answer: response.text,
          sources: documents.map((d: any) => ({ title: d.title, type: d.type })),
        });
      } else {
        // High quality fallback RAG response
        let answer = `Based on your uploaded study notes on **DBMS Normalization & Indexing**:\n\n### What is Normalization?\nNormalization is the systematic process of organizing data in a relational database to **reduce data redundancy** and **eliminate update, insertion, and deletion anomalies**.\n\n### Normal Forms Breakdown:\n1. **1NF (First Normal Form)**:\n   - Every column must hold atomic (indivisible) values.\n   - No repeating groups or arrays.\n\n2. **2NF (Second Normal Form)**:\n   - Must be in 1NF.\n   - No **partial dependencies**: Every non-key attribute must fully depend on the complete Primary Key.\n\n3. **3NF (Third Normal Form)**:\n   - Must be in 2NF.\n   - No **transitive dependencies**: Non-key attributes must not depend on other non-key attributes ($X \\to Y$ where $Y$ is non-prime).\n\n4. **BCNF (Boyce-Codd Normal Form)**:\n   - Strict 3NF: For every functional dependency $X \\to Y$, $X$ must be a Super Key.\n\n**Key Interview Takeaway**: In real-world production databases (e.g., PostgreSQL for your Full Stack projects), companies typically normalize up to **3NF / BCNF** for write-heavy OLTP systems, and intentionally denormalize in read-heavy analytics (OLAP) for faster query joins.`;

        if (query.toLowerCase().includes('react') || query.toLowerCase().includes('hook')) {
          answer = `Based on your uploaded **FullStack Architecture & React Notes**:\n\n### React Hooks & State Management Essentials:\n1. **useState & useReducer**: For component-level state transitions.\n2. **useEffect vs useLayoutEffect**: ` + "`useEffect`" + ` runs asynchronously after render paint, whereas ` + "`useLayoutEffect`" + ` runs synchronously before the browser repaints the screen.\n3. **useMemo & useCallback**: Memoize expensive computations and stable function references to prevent unnecessary child re-renders.\n4. **React 19 Actions**: Native handling of pending states, optimistic updates, and form actions without manual loading state booleans.\n\n**Interview Tip**: Mention that premature memoization adds memory overhead; only wrap functions in ` + "`useCallback`" + ` when passed to memoized children (` + "`React.memo`" + `).`;
        }

        return res.json({
          answer,
          sources: [
            { title: 'DBMS Normalization & Indexing Notes.pdf', type: 'PDF' },
            { title: 'FullStack_System_Design_Principles.md', type: 'Markdown' },
          ],
        });
      }
    } catch (err: any) {
      console.error('Error in /api/brain/query:', err);
      res.status(500).json({ error: err.message || 'Failed to query knowledge brain' });
    }
  });

  // ----------------------------------------------------
  // 7. Profile Evaluation & Career Twin API
  // ----------------------------------------------------
  app.post('/api/profile/generate-insights', async (req: Request, res: Response) => {
    try {
      const { profile } = req.body;

      if (ai) {
        const prompt = `You are LifeOS Career Digital Twin Engine.
Analyze the user's career profile:
${JSON.stringify(profile, null, 2)}

Return a strictly formatted JSON object:
{
  "currentLevel": "e.g. Final-Year CS Student / Pre-Grad",
  "targetRole": "${profile?.targetRole || 'Full Stack Developer'}",
  "readinessScore": number (0-100),
  "currentSkills": ["Skill 1", "Skill 2"],
  "skillGaps": ["Gap 1", "Gap 2", "Gap 3"],
  "recommendedPath": "React → Node.js → SQL → Docker → AWS",
  "radarMetrics": {
    "coreCS": number (0-100),
    "frontend": number (0-100),
    "backend": number (0-100),
    "cloudDevOps": number (0-100),
    "systemDesign": number (0-100),
    "interviewReadiness": number (0-100)
  },
  "nextBestAction": "1 concrete high-yield action to execute today"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const jsonText = response.text || '{}';
        return res.json(JSON.parse(jsonText));
      } else {
        return res.json({
          currentLevel: profile?.level || 'Final-Year Computer Science Student',
          targetRole: profile?.targetRole || 'Full Stack Developer',
          readinessScore: 78,
          currentSkills: ['Java', 'Python', 'React', 'SQL', 'Git', 'JavaScript'],
          skillGaps: ['Node.js', 'Docker', 'AWS', 'System Design'],
          recommendedPath: 'React → Node.js → SQL → Docker → AWS',
          radarMetrics: {
            coreCS: 85,
            frontend: 88,
            backend: 58,
            cloudDevOps: 42,
            systemDesign: 52,
            interviewReadiness: 66,
          },
          nextBestAction: 'Complete Node.js Authentication & Express Middleware project to bridge your primary backend gap.',
        });
      }
    } catch (err: any) {
      console.error('Error in /api/profile/generate-insights:', err);
      res.status(500).json({ error: err.message || 'Failed to generate profile insights' });
    }
  });

  // ----------------------------------------------------
  // Static & SPA Serving
  // ----------------------------------------------------
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LifeOS AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
