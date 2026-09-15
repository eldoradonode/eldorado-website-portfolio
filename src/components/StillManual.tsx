import React from 'react';
import { motion } from 'motion/react';
import { manualBottlenecks } from '../data/content';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const StillManual = () => {
  return (
    <section id="bottlenecks" className="py-20 sm:py-28 md:py-32 bg-bg-alt/50 relative border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-12 sm:mb-20"
        >
          <span className="section-label">Operational Reality Check</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Still Doing This <span className="text-gold-gradient">Manually?</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed mb-4">
            These aren't just isolated tasks. They are recurring business processes that drain your team's energy, introduce avoidable errors, and delay customer turnaround.
          </p>
          <p className="text-gold text-sm sm:text-base md:text-lg font-tech font-bold uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={18} />
            That's where intelligent automation comes in.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {manualBottlenecks.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass p-6 sm:p-8 border-gold/10 hover:border-gold/30 transition-all group flex flex-col justify-between rounded-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-tech font-bold text-gold/60 uppercase tracking-widest">
                    Bottleneck #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <AlertCircle size={16} className="text-gold/40 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>
              <div className="pt-4 border-t border-gold/10">
                <span className="text-[0.7rem] font-tech text-gold font-bold uppercase tracking-wider block">
                  Hidden Cost: {item.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 sm:p-8 md:p-12 border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 rounded-3xl"
        >
          <div>
            <h4 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-text mb-2 text-center md:text-left">
              Recognize any of these bottlenecks in your day-to-day operations?
            </h4>
            <p className="text-muted text-sm sm:text-base font-light text-center md:text-left">
              Most of these can be turned into automated systems that run quietly in the background without human intervention.
            </p>
          </div>
          <a
            href="https://cal.com/eldoradoautomate/free-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black min-h-[48px] px-8 py-3.5 sm:py-4 rounded-2xl font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold-light transition-all flex-shrink-0 shadow-lg shadow-gold/20 w-full sm:w-auto text-center cursor-pointer"
          >
            <span>Find What to Automate</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
