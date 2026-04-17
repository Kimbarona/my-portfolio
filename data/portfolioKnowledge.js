export const portfolioKnowledge = [
  {
    id: 1,
    category: 'personal',
    title: 'Developer Profile',
    content: 'Full Stack Developer and AI-Powered Application Developer with 8+ years of experience building scalable web applications and intelligent systems. Passionate about creating innovative solutions that leverage modern technologies.',
    keywords: ['full stack', 'developer', 'experience', 'profile', 'about']
  },
  {
    id: 2,
    category: 'experience',
    title: 'Years of Experience',
    content: 'Over 8 years of professional experience in full stack development. Specialized in building enterprise-level applications, RESTful APIs, and modern web interfaces.',
    keywords: ['experience', 'years', '8 years', 'professional', 'career']
  },
  {
    id: 3,
    category: 'skills',
    title: 'Frontend Technologies',
    content: 'Frontend Development: React, Vue.js, JavaScript, TypeScript, HTML5, CSS3, Next.js. Building responsive, user-friendly interfaces with modern frameworks and best practices.',
    keywords: ['frontend', 'react', 'vue', 'javascript', 'typescript', 'ui', 'interface']
  },
  {
    id: 4,
    category: 'skills',
    title: 'Backend Technologies',
    content: 'Backend Development: Laravel (PHP), Node.js, Express.js, Python. Building scalable server-side applications, REST APIs, and microservices architecture.',
    keywords: ['backend', 'laravel', 'node', 'node.js', 'php', 'python', 'express', 'server']
  },
  {
    id: 5,
    category: 'skills',
    title: 'Database Technologies',
    content: 'Database Management: MySQL, PostgreSQL, MongoDB, Redis, SQLite, Firebase. Experienced in database design, optimization, and data modeling for high-performance applications.',
    keywords: ['database', 'mysql', 'postgresql', 'mongodb', 'redis', 'firebase', 'sql']
  },
  {
    id: 6,
    category: 'skills',
    title: 'AI and Tools',
    content: 'AI & DevOps: OpenAI API integration, Prompt Engineering, Git, Docker, AWS, Vercel, CI/CD pipelines. Building intelligent applications and cloud-native solutions.',
    keywords: ['ai', 'artificial intelligence', 'openai', 'gpt', 'docker', 'aws', 'cloud', 'git', 'devops', 'tools']
  },
  {
    id: 7,
    category: 'skills',
    title: 'API Development',
    content: 'API Development: REST APIs, GraphQL, JSON, authentication (JWT, OAuth). Creating robust API endpoints with proper documentation and security measures.',
    keywords: ['api', 'rest', 'graphql', 'json', 'jwt', 'oauth', 'authentication', 'endpoint']
  },
  {
    id: 8,
    category: 'ai_focus',
    title: 'AI Integration Capabilities',
    content: 'AI-Powered Application Development: Building intelligent systems using OpenAI API, chatbot systems, RAG (Retrieval-Augmented Generation) systems, AI SaaS products, and prompt engineering for various business use cases.',
    keywords: ['ai', 'chatbot', 'rag', 'saas', 'openai', 'gpt', 'intelligent', 'automation']
  },
  {
    id: 9,
    category: 'projects',
    title: 'E-Commerce Platform',
    content: 'E-Commerce Platform: Full-featured online store with real-time inventory management, Stripe payment processing, analytics dashboard, and Redis caching for optimal performance. Tech: Laravel, Vue.js, MySQL, Stripe, Redis.',
    keywords: ['ecommerce', 'shop', 'payment', 'stripe', 'inventory', 'store', 'laravel', 'vue']
  },
  {
    id: 10,
    category: 'projects',
    title: 'Task Management System',
    content: 'Task Management System: Collaborative project management tool with real-time updates using WebSockets, Kanban boards, team communication, and Docker deployment. Tech: React, Node.js, PostgreSQL, Socket.io, Docker.',
    keywords: ['task', 'project', 'management', 'kanban', 'realtime', 'collaboration', 'react', 'node']
  },
  {
    id: 11,
    category: 'projects',
    title: 'AI Content Generator',
    content: 'AI Content Generator: Intelligent content creation platform powered by OpenAI API with custom prompt templates, SEO optimization, and content scheduling. Tech: Next.js, OpenAI API, Prisma, Tailwind CSS.',
    keywords: ['ai', 'content', 'generator', 'openai', 'seo', 'gpt', 'nextjs', 'blog']
  },
  {
    id: 12,
    category: 'projects',
    title: 'Healthcare Portal',
    content: 'Healthcare Portal: HIPAA-compliant patient management system with appointment scheduling, medical records management, and secure data handling. Tech: Laravel, React, MySQL, AWS, JWT.',
    keywords: ['healthcare', 'medical', 'patient', 'hipaa', 'appointment', 'health', 'laravel', 'react']
  },
  {
    id: 13,
    category: 'projects',
    title: 'Real Estate Marketplace',
    content: 'Real Estate Marketplace: Property listing platform with virtual tours, map integration, and automated lead management system. Tech: Vue.js, Node.js, MongoDB, Mapbox, AWS S3.',
    keywords: ['real estate', 'property', 'listing', 'map', 'virtual tour', 'marketplace', 'vue', 'node']
  },
  {
    id: 14,
    category: 'approach',
    title: 'Development Philosophy',
    content: 'Modern engineering mindset with focus on clean code, scalability, and maintainability. Following best practices in software development, including SOLID principles, test-driven development, and continuous integration.',
    keywords: ['philosophy', 'approach', 'clean code', 'scalable', 'maintainable', 'best practices', 'engineering']
  },
  {
    id: 15,
    category: 'availability',
    title: 'Availability',
    content: 'Available for new opportunities and freelance projects. Open to remote work and collaboration on innovative AI-powered applications and modern web solutions.',
    keywords: ['available', 'hire', 'remote', 'freelance', 'opportunity', 'collaboration', 'work']
  }
];

export const categories = [
  'personal',
  'experience',
  'skills',
  'ai_focus',
  'projects',
  'approach',
  'availability'
];

export function retrieveRelevantContext(query, maxResults = 4) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  const scoredResults = portfolioKnowledge.map(item => {
    let score = 0;

    // Exact category match
    if (queryLower.includes(item.category)) {
      score += 3;
    }

    // Keyword matching
    item.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (queryLower.includes(keywordLower)) {
        score += 2;
      }
      queryWords.forEach(word => {
        if (keywordLower.includes(word) || word.includes(keywordLower)) {
          score += 1;
        }
      });
    });

    // Title match
    if (item.title.toLowerCase().includes(queryLower) || queryLower.includes(item.title.toLowerCase())) {
      score += 4;
    }

    // Content match (basic)
    const contentWords = item.content.toLowerCase().split(/\s+/);
    queryWords.forEach(word => {
      if (contentWords.some(cw => cw.includes(word) || word.includes(cw))) {
        score += 0.5;
      }
    });

    return { ...item, score };
  });

  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ score, keywords, ...rest }) => rest);
}

export function formatContextForPrompt(contexts) {
  return contexts.map(ctx =>
    `[${ctx.title}]\n${ctx.content}`
  ).join('\n\n---\n\n');
}
