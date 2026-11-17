import React, { useState } from 'react';
import {
  FileText,
  Mail,
  Phone,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  GraduationCap,
  Terminal,
  Code2,
  Database,
} from 'lucide-react';
import { profileData } from '../../data/projects';

export const AboutChapter: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.emailPlaceholder);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (profileData.phone) {
      navigator.clipboard.writeText(profileData.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getCategoryIcon = (cat: string) => {
    if (cat.includes('Backend')) return <Terminal className="w-4 h-4 text-[var(--dynamic-accent)]" />;
    if (cat.includes('Frontend')) return <Code2 className="w-4 h-4 text-[var(--dynamic-accent)]" />;
    return <Database className="w-4 h-4 text-[var(--dynamic-accent)]" />;
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(-3800px)',
        transformStyle: 'preserve-3d',
      }}
      className="w-full max-w-5xl px-4 select-none pointer-events-auto"
    >
      {/* Chapter Indicator (z = 40px) */}
      <div
        style={{ transform: 'translateZ(40px)' }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
          <span>CHAPTER 03 // ARCHITECTURAL CORE</span>
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
          About &amp; Technical Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Bio Card (z = 10px) */}
        <div
          style={{ transform: 'translateZ(10px)' }}
          className="lg:col-span-7 p-6 rounded-2xl bg-canvas-card/90 border border-white/10 backdrop-blur-md"
        >
          <div className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)]" />
            <span>Verified Engineering Summary</span>
          </div>

          <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed mb-6 font-medium">
            "{profileData.bioSentence}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <GraduationCap className="w-4 h-4 text-[var(--dynamic-accent)] shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Academic Batch</div>
                <div className="text-white font-semibold">B.Tech 2026</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <MapPin className="w-4 h-4 text-[var(--dynamic-accent)] shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Location</div>
                <div className="text-white font-semibold">Hyderabad, India</div>
              </div>
            </div>
          </div>

          {/* Stacks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {profileData.skills.map((grp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 mb-2 font-mono text-[11px] text-white font-semibold uppercase">
                  {getCategoryIcon(grp.category)}
                  <span>{grp.category}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {grp.items.map((it) => (
                    <span
                      key={it}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Connectors (z = 30px) */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="lg:col-span-5 p-6 rounded-2xl bg-canvas-surface/90 border border-[var(--dynamic-accent)]/30 backdrop-blur-md space-y-3 font-mono text-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--dynamic-accent)] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--dynamic-accent)] animate-ping" />
              <span>Contact Transmission Channels</span>
            </span>
          </div>

          {/* Email */}
          <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                <span>Email Address</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-white text-xs font-semibold truncate">
              {profileData.emailPlaceholder}
            </div>
          </div>

          {/* Phone */}
          {profileData.phone && (
            <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                  <span>Direct Phone</span>
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                    className="text-[10px] text-[var(--dynamic-accent)] hover:underline"
                  >
                    Call
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <div className="text-white text-xs font-semibold truncate">
                {profileData.phone}
              </div>
            </div>
          )}

          {/* Resume PDF */}
          <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                <span>Resume Document</span>
              </span>
              <a
                href={profileData.resumePdfPlaceholder}
                download="Yuvaraju_Dharmana_Resume.pdf"
                className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Download</span>
              </a>
            </div>
            <div className="text-slate-300 text-xs truncate">
              Yuvaraju_Dharmana_Resume.pdf
            </div>
          </div>

          {/* LinkedIn */}
          <div className="p-3 rounded-xl bg-canvas-card border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
                <span>LinkedIn</span>
              </span>
              <a
                href={profileData.linkedinPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[var(--dynamic-accent)] hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Connect</span>
              </a>
            </div>
            <div className="text-slate-300 text-xs truncate">
              linkedin.com/in/yuvaraju-dharmana
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
