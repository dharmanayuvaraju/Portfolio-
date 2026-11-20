import React, { useState, useEffect } from 'react';
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
  Linkedin,
  Eye,
} from 'lucide-react';
import { profileData } from '../../data/projects';
import { getVisitorCount } from '../../utils/supabase';

interface ContactChapterProps {
  onRewindToTop: () => void;
}

export const ContactChapter: React.FC<ContactChapterProps> = ({
  onRewindToTop,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    getVisitorCount().then((count) => {
      if (count !== null) setVisitorCount(count);
    });
  }, []);

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
    <section id="contact" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center scroll-mt-20">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Get In Touch</span>
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight mb-3">
          Contact
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
          Reach out for AI &amp; ML engineering roles, backend systems, Python development, or collaboration.
        </p>
      </div>

      {/* Main Contact Card (Solid Flat Card, No glassmorphism) */}
      <div className="rounded-2xl bg-[#121520] border border-white/10 p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4">
        {/* Email */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <div className="min-w-0">
              <div className="text-slate-400 text-xs font-mono">Email Address</div>
              <a
                href={`mailto:${profileData.emailPlaceholder}`}
                className="text-white font-semibold text-sm sm:text-base hover:text-accent transition-colors flex items-center min-h-[44px] truncate"
              >
                {profileData.emailPlaceholder}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="ml-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-accent text-xs font-mono flex items-center gap-1.5 shrink-0 min-h-[44px] min-w-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Copy email address"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Direct Phone */}
        {profileData.phone && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <div className="min-w-0">
                <div className="text-slate-400 text-xs font-mono">Phone</div>
                <a
                  href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                  className="text-white font-semibold text-sm sm:text-base hover:text-accent transition-colors flex items-center min-h-[44px] truncate"
                >
                  {profileData.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <a
                href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-accent text-xs font-mono min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Call
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-accent text-xs font-mono inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* GitHub Profile */}
        <a
          href={profileData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="flex items-center gap-3">
            <Github className="w-5 h-5 text-accent" />
            <div>
              <div className="text-slate-400 text-xs font-mono">GitHub Profile</div>
              <div className="text-white font-semibold text-sm">github.com/dharmanayuvaraju</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </a>

        {/* LinkedIn Profile */}
        <a
          href={profileData.linkedinPlaceholder}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-accent" />
            <div>
              <div className="text-slate-400 text-xs font-mono">LinkedIn</div>
              <div className="text-white font-semibold text-sm">linkedin.com/in/dharmana-yuvaraju</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </a>

        {/* Location & Timezone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span className="text-slate-300">Hyderabad, India</span>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-accent shrink-0" />
            <span className="text-slate-300">IST (UTC +05:30)</span>
          </div>
        </div>
      </div>

      {/* Rewind to Top Button */}
      <div className="mt-8 mb-12">
        <button
          type="button"
          onClick={onRewindToTop}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-black font-sans font-semibold text-sm min-h-[44px] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to top ↑</span>
        </button>
      </div>

      {/* Footer with Supabase Visitor Counter */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          © 2026 {profileData.name} · AI &amp; ML Engineer
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
          <Eye className="w-3.5 h-3.5 text-accent" />
          <span className="text-white font-semibold">
            {visitorCount !== null ? `${visitorCount.toLocaleString()} visits` : '... visits'}
          </span>
        </div>
      </footer>
    </section>
  );
};
