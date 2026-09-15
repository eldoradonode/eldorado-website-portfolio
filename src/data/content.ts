import React from 'react';
import { 
  Zap, ShoppingCart, MessageSquare, LayoutGrid, Cpu, 
  Clock, Database, Users, Bell, FileSpreadsheet, Calendar,
  RefreshCw, Layers, CheckCircle2, Bot
} from 'lucide-react';
import { Service, FAQItem, ManualBottleneck } from '../types';

export const manualBottlenecks: ManualBottleneck[] = [
  {
    title: 'Lead Follow-Ups',
    description: 'Leads going cold because replies take hours instead of seconds.',
    impact: 'Lost revenue to faster competitors'
  },
  {
    title: 'Customer Enquiries',
    description: 'Answering the same repetitive product, order, and pricing questions by hand.',
    impact: 'Hours wasted on routine answers'
  },
  {
    title: 'Data Entry',
    description: 'Manually copying contact details between web forms, spreadsheets, and databases.',
    impact: 'Typos, missed records, and fatigue'
  },
  {
    title: 'Order Processing',
    description: 'Creating courier shipping labels, generating tracking codes, and updating stores.',
    impact: 'Shipping delays during sales spikes'
  },
  {
    title: 'Reporting & Analytics',
    description: 'Spending entire Friday afternoons pulling CSVs and pasting numbers into spreadsheets.',
    impact: 'Delayed decision-making'
  },
  {
    title: 'Internal Notifications',
    description: 'Teams left out of the loop instead of receiving real-time alerts in Slack or Teams.',
    impact: 'Operational miscommunication'
  },
  {
    title: 'Scheduling & Bookings',
    description: 'Endless back-and-forth emails just to confirm a 30-minute discovery call.',
    impact: 'Friction before clients even meet you'
  },
  {
    title: 'CRM Updates',
    description: 'Sales pipelines left unmaintained because reps hate manual record keeping.',
    impact: 'Inaccurate revenue forecasting'
  },
  {
    title: 'Document Processing',
    description: 'Manually reviewing receipts, invoices, onboarding PDFs, and contracts.',
    impact: 'Administrative bottlenecks'
  },
  {
    title: 'Repetitive Admin',
    description: 'Routine administrative tasks eating up valuable hours that should go to growth.',
    impact: 'Team burnout and stalled growth'
  }
];

export const services: Service[] = [
  {
    icon: React.createElement(LayoutGrid),
    title: '1. Operations Automation',
    desc: 'Automate repetitive internal processes, data movement, reporting and administrative work.',
    businessOutcome: 'Connect your internal tools, eliminate manual data copying, and deliver automated weekly KPI reports directly to leadership.',
    span: 'col-span-12 md:col-span-6'
  },
  {
    icon: React.createElement(Zap),
    title: '2. Lead & Sales Automation',
    desc: 'Capture, qualify, route and follow up with leads without relying on manual follow-up.',
    businessOutcome: 'Score inbound inquiries across key criteria, auto-route priority accounts to calendar booking, and trigger persistent multi-touch follow-up.',
    span: 'col-span-12 md:col-span-6'
  },
  {
    icon: React.createElement(MessageSquare),
    title: '3. Customer Support Automation',
    desc: 'Build AI-powered support systems for websites, WhatsApp and internal customer workflows.',
    businessOutcome: 'Resolve repetitive inquiries instantly 24/7 with context-aware AI grounded in your business documentation, with seamless escalation to human staff.',
    span: 'col-span-12 md:col-span-4'
  },
  {
    icon: React.createElement(ShoppingCart),
    title: '4. E-commerce Automation',
    desc: 'Automate orders, fulfilment, customer communication, refunds, reporting and operational workflows.',
    businessOutcome: 'Connect Shopify, shipping carriers, and customer support so that orders process, labels print, and return requests evaluate automatically.',
    span: 'col-span-12 md:col-span-4'
  },
  {
    icon: React.createElement(Cpu),
    title: '5. Custom AI Systems',
    desc: 'Connect AI, APIs and business tools to automate processes unique to your company.',
    businessOutcome: 'Bespoke automation blueprints engineered around your company\'s proprietary workflows, legacy software, and specialized APIs.',
    span: 'col-span-12 md:col-span-4'
  }
];

export const verifiedStats = [
  { 
    number: 'Up to 40 hrs/wk', 
    label: 'Manual Work Eliminated',
    desc: 'Estimated manual time saved per automated workflow'
  },
  { 
    number: '40+', 
    label: 'Processes Automated',
    desc: 'Production systems built across e-commerce, sales, and operations'
  },
  { 
    number: 'Multiple', 
    label: 'Business Workflows',
    desc: 'Spanning CRM, dispatch, support, and financial reporting'
  },
  { 
    number: 'Cross-Platform', 
    label: 'Tool Integrations',
    desc: 'n8n, Make, Shopify, HubSpot, Slack, WhatsApp, and APIs'
  }
];

export const faqs: FAQItem[] = [
  {
    q: 'Do I need to be technical?',
    a: 'No. I handle the technical side. I start by understanding your current process, then identify where automation can remove repetitive work.'
  },
  {
    q: 'How long does an automation project take?',
    a: 'It depends on the complexity of the workflow. Simple automations can be built quickly, while larger systems require more planning, testing and integration.'
  },
  {
    q: 'What tools do you use?',
    a: 'I choose the tools based on the business process. This can include n8n, Make, APIs, OpenAI, Claude, Gemini, CRMs, databases, WhatsApp and other business platforms.'
  },
  {
    q: 'How much does automation cost?',
    a: 'Pricing depends on the workflow, integrations and complexity. The first conversation is about understanding the process and determining whether automation is actually worth implementing.'
  },
  {
    q: 'What happens after I book a call?',
    a: 'We identify the repetitive or costly process you\'re dealing with, map how it currently works, and determine whether automation can realistically improve it. If there is a good opportunity, I can then recommend the appropriate system.'
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, absolutely. My systems run on global platforms like Shopify, HubSpot, n8n, Make, and cloud APIs widely used across the US, UK, Canada, Europe, and Australia. I communicate clearly in English and collaborate comfortably across time zones.'
  }
];
