interface ChromaticBlobProps {
  className?: string;
}

// Reusable white/light soft-edged blob with red+cyan chromatic aberration fringing.
// Used as hero background accent only. Do not add to other sections.
export default function ChromaticBlob({ className = '' }: ChromaticBlobProps) {
  return (
    <div aria-hidden className={`pointer-events-none select-none relative ${className}`}>
      {/* Red chromatic fringe — offset left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 48% 50%, rgba(255,70,50,0.17) 0%, transparent 68%)',
          filter: 'blur(55px)',
          transform: 'translateX(-16px) scaleX(1.08)',
        }}
      />
      {/* White luminous core */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.19) 0%, rgba(205,205,195,0.05) 52%, transparent 74%)',
          filter: 'blur(75px)',
        }}
      />
      {/* Cyan chromatic fringe — offset right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 52% 50%, rgba(20,210,255,0.17) 0%, transparent 68%)',
          filter: 'blur(55px)',
          transform: 'translateX(16px) scaleX(1.08)',
        }}
      />
    </div>
  );
}
