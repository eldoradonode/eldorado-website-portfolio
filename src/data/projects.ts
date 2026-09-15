import React from 'react';
import { 
  ShoppingCart, Mail, ShieldCheck, Zap, Utensils, Search, 
  Paintbrush, Bike, MessageSquare, RefreshCw 
} from 'lucide-react';
import { Project } from '../types';

export const projects: Project[] = [
  // 1. Lead & Sales Automation (Top Commercial Priority)
  {
    id: 'crm-pipe',
    icon: React.createElement(Zap),
    industry: 'Lead & Sales Automation',
    title: '5D Lead Scoring & Automated Sales CRM Pipeline',
    desc: 'Automates inbound lead qualification, multi-factor scoring, and instant calendar booking to stop high-value leads from slipping away.',
    businessProblem: 'Sales teams waste hours reviewing unqualified leads and manually copying contact details into CRMs. High-intent prospects sit for days waiting for follow-up emails, dropping conversion rates.',
    systemBuilt: 'An automated 5-dimensional qualification engine that captures inbound leads, evaluates them against budget, authority, need, and timeline criteria, and auto-routes priority accounts.',
    howItWorks: 'When a lead submits a form, the system scores their profile instantly in Airtable, notifies the sales rep in Slack, generates a Cal.com booking link, and provisions follow-up tasks in ClickUp.',
    tools: ['n8n', 'Airtable', 'Cal.com', 'ClickUp', 'Slack API', 'Webhooks'],
    businessValue: [
      'Workflow designed to eliminate manual lead qualification and data entry',
      'Instant routing of high-tier prospects directly to calendar booking',
      'Automated follow-up sequences for leads that do not immediately schedule',
      'Estimated manual work reduction: up to 10-15 hours weekly per sales rep'
    ],
    images: [
      'https://i.ibb.co/C3CpW9ps/Video-Screen1771172981589.png',
      'https://i.ibb.co/Z6gzvNNr/Video-Screen1771173052860.png',
      'https://i.ibb.co/qMDspZb2/Screen-Shot-2026-02-15-at-14-47-38.png',
      'https://i.ibb.co/W4P46vW2/Screen-Shot-2026-02-16-at-00-29-40.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/XmjvyugFOsE',
    timeline: '10 - 14 Days',
    efficiency: 'Automated 5D Scoring'
  },
  {
    id: 'hunter-engine',
    icon: React.createElement(Mail),
    industry: 'Outreach & Sales Systems',
    title: 'The Hunter Engine: Automated HR Recruitment Outreach System',
    desc: 'An automated pipeline that monitors target listings, discovers decision-maker contacts, and sends timely, personalized outreach.',
    businessProblem: 'Manually browsing job boards, hunting down verified recruiter emails, and writing custom pitches takes 4+ hours every single day, leading to inconsistent outreach.',
    systemBuilt: 'An end-to-end recruitment outreach system that discovers opportunities, identifies verified contact details, writes context-aware emails, and tracks responses.',
    howItWorks: 'Daily jobs are aggregated via SerpAPI; Hunter & Apollo APIs extract verified emails; Groq AI drafts personalized pitches delivered at 9:00 AM in the recipient\'s local timezone with automated 7-day follow-ups.',
    tools: ['n8n', 'SerpAPI', 'Hunter.io', 'Apollo.io', 'Groq AI', 'Gmail API', 'Google Sheets'],
    businessValue: [
      'Workflow designed to eliminate hours of daily manual searching and drafting',
      'Timezone-synchronized email delivery for maximum inbox visibility',
      'Automated thread and fresh-inbox reply tracking with 7-day sequences',
      'Daily executive pipeline summary delivered directly to email every morning'
    ],
    images: [
      'https://i.ibb.co/S76Psr8k/Video-Screen1773412408296.png',
      'https://i.ibb.co/gZfP45CS/image.png',
      'https://i.ibb.co/7dNgH3Zz/Video-Screen1773412926111.png',
      'https://i.ibb.co/zVxbZqbx/Video-Screen1773412452757.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/q0LJb63FeXg',
    timeline: '5 - 7 Days',
    efficiency: 'Hands-off Pipeline'
  },

  // 2. Operations & E-Commerce Automation
  {
    id: 'ecom-auto',
    icon: React.createElement(ShoppingCart),
    industry: 'E-Commerce Operations',
    title: 'E-Commerce Order Fulfillment & Returns System',
    desc: 'Automates Shopify fulfillment, shipping label generation, return processing, and financial logging without manual data re-entry.',
    businessProblem: 'Store operators spend several hours each morning copying customer orders between Shopify, courier portals, and spreadsheets. Return requests and refunds require slow manual intervention.',
    systemBuilt: 'A connected five-flow operations system handling order fulfillment, shipping calculation, return intake, automated refund evaluation, and management BI reporting.',
    howItWorks: 'New paid Shopify orders trigger Shippo API for instant label calculation; return forms via Tally trigger automated refund logic; daily activity is compiled into executive reports with Slack error watchdog monitoring.',
    tools: ['n8n', 'Shopify API', 'Shippo API', 'Airtable', 'Slack', 'Tally Webhooks'],
    businessValue: [
      'Workflow designed to eliminate repetitive order copying and shipping label creation',
      'Standardized return and refund handling connected directly to store APIs',
      'Automated monthly operations reports sent to leadership inbox',
      'Slack-based watchdog alerts that notify the team of fulfillment errors immediately'
    ],
    images: [
      'https://i.ibb.co/B2G9TsvF/Video-Screen1771890701727.png',
      'https://i.ibb.co/spHTf5Rq/Screen-Shot-2026-02-22-at-18-14-36.png',
      'https://i.ibb.co/prMT0C3Y/Video-Screen1772573168282.png',
      'https://i.ibb.co/Csng4H8X/Video-Screen1771949222880.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/yW2igOZGBaI',
    timeline: '7 - 10 Days',
    efficiency: 'Zero Data Re-entry'
  },

  // 3. Customer Support & WhatsApp AI
  {
    id: 'biz-assist',
    icon: React.createElement(MessageSquare),
    industry: 'Customer Support Automation',
    title: 'WhatsApp Business Support & Inquiry Assistant',
    desc: 'Handles repetitive customer inquiries, appointment booking, and basic support 24/7 on WhatsApp with escalation to human staff.',
    businessProblem: 'Businesses receive repetitive messages asking about pricing, opening hours, booking availability, and order status. Responding manually takes staff away from higher-value work.',
    systemBuilt: 'An intelligent WhatsApp support assistant connected to business documentation that answers customer questions in natural language and captures consultation bookings.',
    howItWorks: 'Customer WhatsApp messages are processed through n8n, checked against company knowledge base, answered with verified business facts, and escalated to human staff when complex cases arise.',
    tools: ['n8n', 'DeepSeek', 'Twilio / Green API', 'WhatsApp Business', 'Google Sheets'],
    businessValue: [
      'Workflow designed to resolve repetitive customer inquiries immediately, day and night',
      'Reduces response lag from hours down to seconds for warm prospective clients',
      'Direct integration with calendar scheduling and customer inquiry logs',
      'Clean human handoff protocol when high-touch assistance is needed'
    ],
    images: [
      'https://i.ibb.co/5XcCHDft/Video-Screen1768827490128.png',
      'https://i.ibb.co/3mBz9Lnc/image.png',
      'https://i.ibb.co/MTJpkQp/Screenshot-20260308-125708-Whats-App-Business.jpg',
      'https://i.ibb.co/5XcCHDft/Video-Screen1768827490128.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/nmP3Bvyn0BA',
    timeline: '5 - 7 Days',
    efficiency: '24/7 Response'
  },
  {
    id: 'insur-bot',
    icon: React.createElement(ShieldCheck),
    industry: 'Financial & Advisory Automation',
    title: 'Enterprise Insurance Advisory & Policy Assistant',
    desc: 'Automates insurance policy inquiries, regulatory fact-checking, and preliminary claims intake through secure WhatsApp messaging.',
    businessProblem: 'Clients frequently call or message agents with basic policy wording questions, premium checks, and compliance questions, consuming expensive advisor billable hours.',
    systemBuilt: 'A retrieval-augmented WhatsApp assistant equipped with insurance regulatory frameworks and internal product documentation for rapid, compliant responses.',
    howItWorks: 'Inquiries are matched against approved insurance documentation using retrieval search, formulating structured policy explanations and collecting preliminary claim information.',
    tools: ['n8n', 'Gemini', 'Green API', 'WhatsApp Business', 'Vector Knowledge Base'],
    businessValue: [
      'Workflow designed to handle routine policy inquiries without human advisor intervention',
      'Instant answers grounded in verified insurance guidelines and product documents',
      'Standardized intake for claims and policy renewal requests',
      'Frees licensed advisors to focus on closing high-value commercial accounts'
    ],
    images: [
      'https://i.ibb.co/N2GTt3Bv/Video-Screen1772065904760.png',
      'https://i.ibb.co/TMHVCY4C/Video-Screen1772065874982.png',
      'https://i.ibb.co/7xSzZkp2/Video-Screen1772065972101.png',
      'https://i.ibb.co/v6bsMGmd/photo-5837177172123127115-y.jpg'
    ],
    videoUrl: 'https://www.youtube.com/embed/0OOF8VdBdh8',
    timeline: '7 - 10 Days',
    efficiency: 'Instant Policy Lookups'
  },

  // 4. Logistics & Food Ordering Operations
  {
    id: 'rider-dispatch',
    icon: React.createElement(Bike),
    industry: 'Logistics & Dispatch',
    title: 'GPS-Based Rider Dispatch & Order Routing Engine',
    desc: 'Calculates courier distance, assigns delivery orders to the nearest available rider, and updates customers in real time.',
    businessProblem: 'Dispatch managers manually call riders and guess who is closest to the pickup point. Orders get delayed, customers get frustrated, and fuel is wasted.',
    systemBuilt: 'An automated dispatch engine that calculates exact geographic coordinates, dispatches tasks via WhatsApp to the closest rider, and logs delivery milestones.',
    howItWorks: 'Incoming delivery tickets compute distances using coordinate calculations. The nearest idle rider receives an acceptance link on WhatsApp, updating store dispatch sheets automatically.',
    tools: ['n8n', 'Twilio API', 'WhatsApp', 'Haversine Coordinates', 'Google Sheets'],
    businessValue: [
      'System built to automate courier assignment based on proximity rather than manual guessing',
      'Automated dispatch notices and turn-by-turn pickup instructions sent to drivers',
      'Customers receive instant notifications when delivery is on route',
      'Reduces dispatch desk overhead during peak rush hours'
    ],
    images: [
      'https://i.ibb.co/TB4dn43C/Video-Screen1769371312340.png',
      'https://i.ibb.co/Xf5z8YsL/Video-Screen1769376299963.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/Rn2bN5CXgQA',
    timeline: '7 - 10 Days',
    efficiency: 'Proximity Dispatch'
  },
  {
    id: 'food-order',
    icon: React.createElement(Utensils),
    industry: 'Food & Hospitality',
    title: 'Automated Food Ordering & Payment Processing System',
    desc: 'Enables customers to browse menus, customize items, and pay securely via messaging with real-time kitchen ticket generation.',
    businessProblem: 'Restaurants lose take-out revenue when phone lines are busy or staff are occupied during meal rush. Manual order-taking frequently leads to missed modifications and cashier errors.',
    systemBuilt: 'A conversational ordering system that guides diners through menu selection, calculates add-ons, generates payment links via Paystack, and pushes orders to the kitchen.',
    howItWorks: 'Customers order through an automated chat interface; payment is verified via webhook; the ticket updates kitchen spreadsheets and prints directly for preparation.',
    tools: ['Make.com', 'Telegram Bot API', 'Paystack API', 'Google Sheets'],
    businessValue: [
      'Captures orders automatically during peak hours without tying up front-of-house staff',
      'Direct payment verification before tickets reach preparation queue',
      'Real-time order confirmation and estimated ready time sent to customer',
      'Eliminates order miscommunication and cashier transcription mistakes'
    ],
    images: [
      'https://i.ibb.co/whWRMHrc/image.png',
      'https://i.ibb.co/7J9pGDs3/image.png',
      'https://i.ibb.co/b5CVtTJQ/image.png',
      'https://i.ibb.co/k23fj7Vv/image.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/mbe8OkRdfE8',
    timeline: '5 - 7 Days',
    efficiency: 'Instant Payments'
  },

  // 5. Specialized Systems
  {
    id: 'research-engine',
    icon: React.createElement(Search),
    industry: 'Market Intelligence',
    title: 'Automated Business & Account Research Engine',
    desc: 'Extracts public company data, synthesizes competitive information, and delivers structured account profiles to sales and analyst teams.',
    businessProblem: 'Account executives spend 30 to 45 minutes manually researching each prospect before outreach calls, cutting into actual selling time.',
    systemBuilt: 'An automated market research workflow that pulls data from target company domains, runs deep queries via Perplexity, and populates formatted briefings.',
    howItWorks: 'A company domain or name entered into a spreadsheet triggers automated web search, summarizes business model, tech stack, and key executives, and logs the briefing into Google Sheets.',
    tools: ['n8n', 'Perplexity', 'Google Sheets', 'OpenRouter API'],
    businessValue: [
      'Reduces account preparation time from 30+ minutes down to 2 minutes per lead',
      'Standardized company dossiers for sales calls and investment analysis',
      'Enriches CRM records with up-to-date market intelligence automatically'
    ],
    images: [
      'https://i.ibb.co/wFB4RfwN/Screen-Shot-2026-02-28-at-13-53-54.png',
      'https://i.ibb.co/352tNp02/Screen-Shot-2026-02-28-at-13-52-27.png',
      'https://i.ibb.co/tPQqFtTD/Screen-Shot-2026-02-28-at-13-53-00.png',
      'https://i.ibb.co/zVLwBJYt/Video-Screen1769694535025.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/BcItWgvSp1M',
    timeline: '3 - 5 Days',
    efficiency: 'Rapid Research'
  },
  {
    id: 'ad-gen',
    icon: React.createElement(Paintbrush),
    industry: 'Marketing Operations',
    title: 'Automated Product Ad Variation Generator',
    desc: 'Transforms single product photography into multi-format ad assets formatted for Google, Instagram, and Facebook campaigns.',
    businessProblem: 'Creating dozens of aspect ratios and background variants for product catalogs requires expensive graphic design cycles and delays campaign launches.',
    systemBuilt: 'An image pipeline that takes raw product imagery, extracts key selling angles, generates styled ad backgrounds, and outputs ready-to-run marketing dimensions.',
    howItWorks: 'Product photos uploaded to Cloudinary trigger vision analysis and styled generation, automatically exporting standardized social and banner formats.',
    tools: ['n8n', 'Gemini', 'FLUX.1', 'Cloudinary API'],
    businessValue: [
      'Automates multi-channel ad variant creation from single master product shots',
      'Enables rapid creative testing without waiting weeks for design turnaround',
      'Standardized dimensions for stories, feeds, and display placements'
    ],
    images: [
      'https://i.ibb.co/rRXrywVd/Screen-Shot-2026-02-19-at-16-01-38.png',
      'https://i.ibb.co/PzV9Fb9L/Screen-Shot-2026-02-19-at-15-03-12.png',
      'https://i.ibb.co/C5wtNkWB/Screen-Shot-2026-02-19-at-15-00-37.png',
      'https://i.ibb.co/LXqDpp7f/Screen-Shot-2026-02-19-at-15-04-04.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/11HwALwo1-Q',
    timeline: '3 - 5 Days',
    efficiency: 'Automated Creative'
  },
  {
    id: 'backup-sys',
    icon: React.createElement(RefreshCw),
    industry: 'Infrastructure & Reliability',
    title: 'Mission-Critical Workflow Versioning & Backup System',
    desc: 'Automatically versions, archives, and audits production n8n workflows to GitHub with disaster recovery and instant status alerts.',
    businessProblem: 'When teams modify automation workflows without version control, broken scripts can bring operations down with zero history or quick rollback ability.',
    systemBuilt: 'A continuous DevOps workflow that exports production automation definitions, pushes timestamped backups to GitHub repositories, and alerts administrators.',
    howItWorks: 'Scheduled triggers call automation instance APIs, commit JSON workflow definitions to private Git repositories, and ping Telegram channels with backup confirmations.',
    tools: ['n8n API', 'GitHub API', 'Telegram API', 'Cron Triggers'],
    businessValue: [
      'Guarantees version history and rollback capability for all business automations',
      'Protects critical workflows against accidental edits or server corruption',
      'Automated daily disaster-recovery checks delivered to team chat'
    ],
    images: [
      'https://i.ibb.co/7dHwM33Q/Video-Screen1770845448274.png',
      'https://i.ibb.co/2Y5ftT6J/image.png',
      'https://i.ibb.co/Q7MckzdJ/image.png',
      'https://i.ibb.co/Z6f0tQsb/image.png'
    ],
    timeline: '1 - 2 Days',
    efficiency: 'Automated Rollback'
  }
];
