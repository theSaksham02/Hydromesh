import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Database, Laptop, Sparkles, X, Shield, ArrowRight } from "lucide-react";
import type { StoredSubmission } from "../services/forms";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: StoredSubmission | null;
  onAction?: () => void;
}

export function SubmissionModal({ isOpen, onClose, submission, onAction }: SubmissionModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire celebration confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#002456", "#0284C7", "#10B981", "#F59E0B"],
        });
      } catch (e) {
        // Fallback gracefully if canvas is blocked
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !submission) return null;

  const isPilot = submission.type === "pilot";
  const isNewsletter = submission.type === "newsletter";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001838]/70 p-4 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-lg overflow-hidden border border-[#002456]/20 bg-white p-6 sm:p-8 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#64748B] hover:bg-[#F3F1EC] hover:text-[#002456] transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Icon Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#002456]/10 px-2.5 py-0.5 text-[0.75rem] font-medium text-[#002456]">
              <Sparkles className="h-3 w-3 text-[#0284C7]" />
              {isNewsletter ? "Joined Network" : isPilot ? "Pilot Recorded" : "Message Sent"}
            </div>
            <p className="text-[0.75rem] text-[#64748B] mt-0.5">
              Verified & Synchronized
            </p>
          </div>
        </div>

        {/* Modal Heading */}
        <h3 className="mt-4 font-display text-[1.5rem] sm:text-[1.75rem] font-semibold text-[#002456] leading-tight">
          {isNewsletter && "You're Officially on the List!"}
          {isPilot && "Municipal Pilot Application Received!"}
          {!isNewsletter && !isPilot && "Message Stored & Delivered!"}
        </h3>

        <p className="mt-2 text-[0.925rem] font-light text-[#334155] leading-relaxed">
          {isNewsletter &&
            `Welcome to HydroMesh, ${submission.name.split(" ")[0]}! Your subscription has been stored in our Supabase cloud database and remembered on this device.`}
          {isPilot &&
            `Thank you, ${submission.name}. Your deployment intake has been safely stored in Supabase. Our field operations team will inspect your jurisdiction details within 24 hours.`}
          {!isNewsletter && !isPilot &&
            `Thank you, ${submission.name}. Your inquiry has been stored in Supabase and alerted to the founding team.`}
        </p>

        {/* Storage Verification Box */}
        <div className="mt-6 border border-[#002456]/15 bg-[#F8FAFC] p-4 text-left">
          <div className="flex items-center justify-between border-b border-[#002456]/10 pb-2">
            <span className="text-[0.75rem] font-semibold uppercase tracking-wider text-[#002456]">
              Storage Confirmation
            </span>
            <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-[#10B981]">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
              Live Sync
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[0.85rem]">
            <div className="flex items-center gap-2 text-[#002456]">
              <Database className="h-4 w-4 text-[#0284C7]" />
              <span className="font-medium">Supabase Database:</span>
              <span className="text-[#334155]">Record synced</span>
            </div>
            <div className="flex items-center gap-2 text-[#002456]">
              <Laptop className="h-4 w-4 text-[#10B981]" />
              <span className="font-medium">Website Storage:</span>
              <span className="text-[#334155]">Persisted locally in session</span>
            </div>
            <div className="flex items-center gap-2 text-[#002456]">
              <Shield className="h-4 w-4 text-[#6366F1]" />
              <span className="font-medium">Registered Identifier:</span>
              <span className="font-mono text-[0.75rem] text-[#64748B]">{submission.email}</span>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
          {onAction && (
            <button
              onClick={() => {
                onAction();
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#002456] px-5 py-2.5 text-[0.875rem] font-medium text-[#002456] hover:bg-[#F3F1EC] transition-colors"
            >
              Explore Network Roadmap
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#002456] px-6 py-2.5 text-[0.875rem] font-medium text-white hover:bg-[#001838] transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
