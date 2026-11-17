import React, { useState } from 'react';
import {
  Github,
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUp,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { profileData } from '../../data/projects';

interface ContactChapterProps {
  onRewindToTop: () => void;
}

export const ContactChapter: React.FC<ContactChapterProps> = ({
  onRewindToTop,
}) => {
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

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(-5200px)',
        transformStyle: 'preserve-3d',
      }}
      className="w-full max-w-4xl px-4 select-none pointer-events-auto text-center"
    >
      {/* Title Depth Layer (z = 40px) */}
      <div style={{ transform: 'translateZ(40px)' }} className="mb-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--dynamic-accent)] uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dynamic-accent)] animate-pulse" />
          <span>CHAPTER 04 // CONNECTION TERMINUS</span>
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
          Initiate Transmission
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
          Reach out for engineering roles, technical collaboration in Python backend, ML systems, or questions regarding the project lab.
        </p>
      </div>

      {/* Terminal Transmission Box Depth Layer (z = 10px) */}
      <div
        style={{ transform: 'translateZ(10px)' }}
        className="rounded-2xl bg-canvas-card/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md text-left max-w-2xl mx-auto shadow-2xl"
      >
        <div className="space-y-3 font-mono text-xs">
          {/* GitHub */}
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 rounded-xl bg-canvas-surface hover:bg-white/10 border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-[var(--dynamic-accent)]" />
              <div>
                <div className="text-slate-400 text-[10px]">GitHub Repository Index</div>
                <div className="text-white font-semibold">github.com/dharmanayuvaraju</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          {/* Email */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-canvas-surface border border-white/10">
            <div className="flex items-center gap-3 truncate">
              <Mail className="w-5 h-5 text-[var(--dynamic-accent)] shrink-0" />
              <div className="truncate">
                <div className="text-slate-400 text-[10px]">Email Dispatch</div>
                <div className="text-white font-semibold truncate">{profileData.emailPlaceholder}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="ml-2 px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[var(--dynamic-accent)] flex items-center gap-1 shrink-0"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Phone */}
          {profileData.phone && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-canvas-surface border border-white/10">
              <div className="flex items-center gap-3 truncate">
                <Phone className="w-5 h-5 text-[var(--dynamic-accent)] shrink-0" />
                <div className="truncate">
                  <div className="text-slate-400 text-[10px]">Direct Phone Coordinate</div>
                  <a href={`tel:${profileData.phone.replace(/\s+/g, '')}`} className="text-white font-semibold hover:underline block truncate">
                    {profileData.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <a
                  href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                  className="px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[var(--dynamic-accent)]"
                >
                  Call
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[var(--dynamic-accent)] flex items-center gap-1"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Location & Timezone Strip */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
              <span className="text-slate-300">Hyderabad, India</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[var(--dynamic-accent)]" />
              <span className="text-slate-300">IST (UTC +05:30)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rewind to Top Button (z = 50px) */}
      <div style={{ transform: 'translateZ(50px)' }} className="mt-8">
        <button
          onClick={onRewindToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--dynamic-accent)] text-canvas-deep font-mono text-xs font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--dynamic-accent-dim)]"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Rewind Camera to Signal Origin ↑</span>
        </button>
      </div>
    </div>
  );
};
