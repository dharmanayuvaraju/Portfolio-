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
    if (cat.includes('Backend')) return <Terminal className="w-4 h-4 text-accent" />;
    if (cat.includes('Frontend')) return <Code2 className="w-4 h-4 text-accent" />;
    return <Database className="w-4 h-4 text-accent" />;
  };

  return (
    <section id="about" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Profile &amp; Technical Capabilities</span>
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
          About
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Bio & Skills */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121520] border border-white/10 space-y-6">
          <div>
            <h3 className="font-sans font-bold text-xl text-white mb-3">
              Engineering Background
            </h3>
            <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed">
              "{profileData.bioSentence}"
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <GraduationCap className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-slate-400 text-xs font-mono">Academic Batch</div>
                <div className="text-white font-semibold text-sm">B.Tech 2026</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-slate-400 text-xs font-mono">Location</div>
                <div className="text-white font-semibold text-sm">Hyderabad, India</div>
              </div>
            </div>
          </div>

          {/* Technical Skills Categories */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
              Technical Skills
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profileData.skills.map((grp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2.5 font-mono text-xs text-white font-semibold">
                    {getCategoryIcon(grp.category)}
                    <span>{grp.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.items.map((it) => (
                      <span
                        key={it}
                        className="font-mono text-xs px-2 py-0.5 rounded bg-[#0a0b10] text-slate-200 border border-white/10"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Direct Contact & Resources */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#121520] border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Direct Channels</span>
            </span>
          </div>

          {/* Email (mailto: link + Copy button) */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-accent" />
                <span>Email</span>
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-accent hover:underline flex items-center gap-1 min-h-[44px] min-w-[44px] justify-end"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${profileData.emailPlaceholder}`}
              className="text-white text-sm font-sans font-semibold hover:text-accent transition-colors flex items-center min-h-[44px] truncate"
            >
              {profileData.emailPlaceholder}
            </a>
          </div>

          {/* Phone (tel: link + Copy button) */}
          {profileData.phone && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>Phone</span>
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                    className="text-accent hover:underline min-h-[44px] min-w-[44px] px-3.5 inline-flex items-center justify-center"
                  >
                    Call
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="text-accent hover:underline inline-flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-3.5"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <a
                href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                className="text-white text-sm font-sans font-semibold hover:text-accent transition-colors flex items-center min-h-[44px] truncate"
              >
                {profileData.phone}
              </a>
            </div>
          )}

          {/* Resume PDF Download */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-accent" />
                <span>Resume</span>
              </span>
              <a
                href={profileData.resumePdfPlaceholder}
                download="Yuvaraju_Dharmana_Resume.pdf"
                className="text-accent hover:underline flex items-center gap-1 min-h-[44px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
            <div className="text-white text-sm font-sans truncate">
              Yuvaraju_Dharmana_Resume.pdf
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-accent" />
                <span>LinkedIn</span>
              </span>
              <a
                href={profileData.linkedinPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 min-h-[44px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Connect</span>
              </a>
            </div>
            <div className="text-white text-sm font-sans truncate">
              linkedin.com/in/yuvaraju-dharmana
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
