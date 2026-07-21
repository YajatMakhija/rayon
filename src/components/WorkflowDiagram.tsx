/** Minimal yellow glow art for the hero — background accent only. */
export function WorkflowDiagram() {
  return (
    <svg
      viewBox="0 0 420 360"
      className="pointer-events-none h-auto w-full select-none opacity-40"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5c400" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5c400" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft ambient wash */}
      <circle cx="210" cy="180" r="140" fill="url(#core)" opacity="0.35" />

      {/* Outer ring */}
      <circle
        cx="210"
        cy="180"
        r="92"
        fill="none"
        stroke="#f5c400"
        strokeWidth="1"
        strokeOpacity="0.35"
        filter="url(#soft-glow)"
        className="animate-pulse-node"
      />

      {/* Inner ring */}
      <circle
        cx="210"
        cy="180"
        r="48"
        fill="none"
        stroke="#f5c400"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        filter="url(#soft-glow)"
        className="animate-pulse-node"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Core blink */}
      <circle
        cx="210"
        cy="180"
        r="10"
        fill="#f5c400"
        filter="url(#soft-glow)"
        className="animate-pulse-node"
        style={{ animationDelay: "0.2s" }}
      />

      {/* Three faint orbit dots */}
      <circle cx="210" cy="88" r="3.5" fill="#f5c400" opacity="0.55" className="animate-pulse-node" />
      <circle
        cx="290"
        cy="230"
        r="3.5"
        fill="#f5c400"
        opacity="0.45"
        className="animate-pulse-node"
        style={{ animationDelay: "0.9s" }}
      />
      <circle
        cx="130"
        cy="230"
        r="3.5"
        fill="#f5c400"
        opacity="0.45"
        className="animate-pulse-node"
        style={{ animationDelay: "1.4s" }}
      />
    </svg>
  );
}
