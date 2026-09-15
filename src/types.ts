import React from 'react';

export interface Project {
  id: string;
  icon: React.ReactNode;
  industry: string;
  title: string;
  desc: string;
  businessProblem: string;
  systemBuilt: string;
  howItWorks: string;
  tools: string[];
  businessValue: string[];
  images: string[];
  videoUrl?: string;
  timeline?: string;
  efficiency?: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  businessOutcome: string;
  span: string;
}

export interface ManualBottleneck {
  title: string;
  description: string;
  impact: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
