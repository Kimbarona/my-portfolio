import OpenAI from 'openai';
import { retrieveRelevantContext, formatContextForPrompt } from '../data/portfolioKnowledge.js';

const systemPrompt = `You are an AI assistant embedded in a developer portfolio website. Your role is to help visitors learn about the developer's skills, experience, and projects.

CRITICAL RULES:
1. ONLY use the provided context to answer questions
2. Do NOT make up information or guess
3. Do NOT use external knowledge or general AI capabilities
4. If the answer is not in the context, clearly state: "I don't have enough information in the portfolio to answer that question. Would you like me to help with something else?"
5. Be professional, helpful, and concise
6. Highlight the developer's 8+ years of experience and AI capabilities when relevant
7. Focus on selling the developer's strengths naturally

RESPONSE FORMAT:
- Keep responses concise and informative
- Use bullet points when listing multiple items
- Be conversational but professional
- If suggesting projects, mention specific tech stacks mentioned in the context`;

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 20;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function cleanOldRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

setInterval(cleanOldRateLimits, RATE_LIMIT_WINDOW);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message is too long' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key not configured');
    return res.status(500).json({
      error: 'AI service is temporarily unavailable. Please try again later.'
    });
  }

  try {
    const relevantContext = retrieveRelevantContext(message, 5);
    const contextText = formatContextForPrompt(relevantContext);

    const fullSystemPrompt = relevantContext.length > 0
      ? `${systemPrompt}\n\nRELEVANT CONTEXT FROM PORTFOLIO:\n\n${contextText}`
      : systemPrompt;

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: fullSystemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    return res.status(200).json({
      response,
      context_used: relevantContext.length > 0
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);

    if (error.status === 401) {
      return res.status(500).json({
        error: 'AI service configuration error. Please contact the developer.'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'AI service is experiencing high demand. Please try again shortly.'
      });
    }

    return res.status(500).json({
      error: 'Failed to generate response. Please try again.'
    });
  }
}
