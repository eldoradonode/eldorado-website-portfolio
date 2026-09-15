import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, GitBranch, RefreshCw, XCircle } from 'lucide-react';

export const RealProof = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<number>(0);

  const workflows = [
    {
      title: 'Inbound Lead Qualification & CRM Sync',
      manual: {
        steps: [
          'Lead fills web form; notification sits in inbox for hours',
          'Rep manually opens spreadsheet and researches prospect domain',
          'Rep copies details line by line into CRM database',
          'Rep emails back and forth trying to find an open meeting slot'
        ],
        drawbacks: 'Leads cool down, high drop-off rate, ~20 mins wasted per lead'
      },
      automated: {
        steps: [
          'Form submission triggers webhook into n8n instantly',
          'Automated enrichment calculates 5D qualification score in seconds',
          'High-tier prospects immediately receive instant Cal.com scheduling link',
          'Slack notification alerts rep with full dossier & ClickUp tasks created'
        ],
        benefits: 'Instant qualification, zero manual data re-entry, immediate calendar booking'
      }
    },
    {
      title: 'E-Commerce Order Fulfillment & Returns',
      manual: {
        steps: [
          'Morning order export from Shopify to CSV',
          'Manually copy-pasting addresses into shipping carrier portal',
          'Pasting tracking codes back into Shopify and customer emails',
          'Handling returns manually across support tickets and warehouse sheets'
        ],
        drawbacks: 'Prone to typing errors, courier label delays, hours of routine admin'
      },
      automated: {
        steps: [
          'Paid Shopify order automatically sends parcel specs to Shippo API',
          'Shipping label prints automatically and tracking updates customer instantly',
          'Return portal captures requests and evaluates refund conditions via logic rules',
          'Error watchdog monitors all API endpoints in Slack for zero downtime'
        ],
        benefits: 'Zero-touch order fulfillment, standardized return protocol, real-time alert watchdog'
      }
    },
    {
      title: '24/7 Customer Support & Inquiry Triage',
      manual: {
        steps: [
          'Support inbox flooded with basic questions on pricing, hours, and policies',
          'Staff spend hours copy-pasting the same answers repeatedly',
          'After-hours and weekend inquiries sit unanswered until Monday',
          'High-priority sales questions get buried under routine tickets'
        ],
        drawbacks: 'Slow response times, frustrated buyers, burnt-out support staff'
      },
      automated: {
        steps: [
          'WhatsApp / Web assistant receives inquiry and parses intent immediately',
          'Retrieves factual answers strictly from verified company knowledge base',
          'Gives accurate, instantaneous responses around the clock',
          'Automatically flags complex or high-value inquiries for direct human staff handoff'
        ],
        benefits: 'Instantaneous response 24/7, zero hallucination, prioritized human escalation'
      }
    }
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-bg-alt relative overflow-hidden border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-14 sm:mb-20"
        >
          <span className="section-label mx-auto">Proof Through Systems</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Built Around <span className="text-gold-gradient">Real Business Problems</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Side-by-side breakdowns showing how error-prone manual handoffs transform into resilient, production-grade automated pipelines.
          </p>
        </motion.div>

        {/* Workflow Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {workflows.map((wf, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflow(idx)}
              className={`min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center text-center ${
                activeWorkflow === idx
                  ? 'bg-gold text-black shadow-lg shadow-gold/20'
                  : 'glass text-muted hover:text-gold border-gold/10 hover:border-gold/30'
              }`}
            >
              {wf.title}
            </button>
          ))}
        </div>

        {/* Before vs After Comparison Card */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {/* Manual Process */}
          <motion.div 
            key={`manual-${activeWorkflow}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 sm:p-8 md:p-10 border-red-500/20 bg-red-950/5 relative rounded-3xl"
          >
            <div className="flex items-center gap-3 text-red-400 font-tech font-bold text-xs uppercase tracking-widest mb-6">
              <XCircle size={18} />
              Manual Bottleneck (Before)
            </div>
            <h3 className="font-display font-bold text-2xl mb-6 text-text">
              The Costly Manual Method
            </h3>
            <ul className="space-y-4 mb-8">
              {workflows[activeWorkflow].manual.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-muted text-base font-light">
                  <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-tech font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-tech font-bold uppercase tracking-wider">
              Drawback: {workflows[activeWorkflow].manual.drawbacks}
            </div>
          </motion.div>

          {/* Automated System */}
          <motion.div 
            key={`auto-${activeWorkflow}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 sm:p-8 md:p-10 border-gold/40 bg-gold/5 relative rounded-3xl"
          >
            <div className="flex items-center gap-3 text-gold font-tech font-bold text-xs uppercase tracking-widest mb-6">
              <CheckCircle2 size={18} />
              Automated Pipeline (After)
            </div>
            <h3 className="font-display font-bold text-2xl mb-6 text-text">
              The Reliable System
            </h3>
            <ul className="space-y-4 mb-8">
              {workflows[activeWorkflow].automated.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-text text-base font-light">
                  <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs font-tech font-bold uppercase tracking-wider">
              Advantage: {workflows[activeWorkflow].automated.benefits}
            </div>
          </motion.div>
        </div>

        {/* 4 Architectural Standards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <GitBranch className="text-gold" size={24} />,
              title: 'Process Mapping First',
              desc: 'I map every decision branch and data field before writing a single automation workflow.'
            },
            {
              icon: <Cpu className="text-gold" size={24} />,
              title: 'Native API Connections',
              desc: 'Direct webhooks and official REST endpoints to ensure fast, reliable synchronization.'
            },
            {
              icon: <ShieldCheck className="text-gold" size={24} />,
              title: 'Fail-Safe Monitoring',
              desc: 'Built-in error catching and watchdog alerts in Slack so unexpected anomalies are caught immediately.'
            },
            {
              icon: <RefreshCw className="text-gold" size={24} />,
              title: 'Human-in-the-Loop',
              desc: 'Automates routine tasks while seamlessly surfacing edge cases to your team when human judgment is best.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass p-6 sm:p-8 border-gold/10 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="font-display font-bold text-xl mb-3 text-text">{item.title}</h4>
              <p className="text-muted text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
