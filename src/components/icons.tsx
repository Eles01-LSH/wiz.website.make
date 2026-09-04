type IconProps = {
  className?: string;
};

export function CameraIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 8a2 2 0 0 1 2-2h1.2a1 1 0 0 0 .8-.4l1-1.3a1 1 0 0 1 .8-.4h4.4a1 1 0 0 1 .8.4l1 1.3a1 1 0 0 0 .8.4H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

export function MotionIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6" />
      <circle cx="4" cy="15" r="1" />
      <circle cx="20" cy="9" r="1" />
    </svg>
  );
}

export function LiveIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 19v-6" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7.5 6.5a7 7 0 0 0 0 10M16.5 6.5a7 7 0 0 1 0 10" />
    </svg>
  );
}

export function MediaIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

export function StarIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9 2.6-5.5Z" />
    </svg>
  );
}

export function BookIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 5.5c2-1 4.5-1 7 .5v13c-2.5-1.5-5-1.5-7-.5V5.5Z" />
      <path d="M20 5.5c-2-1-4.5-1-7 .5v13c2.5-1.5 5-1.5 7-.5V5.5Z" />
    </svg>
  );
}

export function SmartphoneIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10.5 9v6l5-3-5-3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DisplayIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="8" height="6" rx="1" />
      <rect x="13" y="4" width="8" height="6" rx="1" />
      <rect x="3" y="12" width="8" height="6" rx="1" />
      <rect x="13" y="12" width="8" height="6" rx="1" />
    </svg>
  );
}

export function PuzzleIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4.5h3a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 0 3 0V5h1a2 2 0 0 1 2 2v1a1.5 1.5 0 0 0 0 3v1a2 2 0 0 1-2 2h-1.5a1.5 1.5 0 0 0-3 0H9a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function ApertureIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 6 3 5.2M9.5 6l-3 5.2M6.5 17l3-5.2M17.5 17l-3-5.2M9.5 18h5" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3.5 19 6.5v5c0 5-3 8.2-7 9.5-4-1.3-7-4.5-7-9.5v-5L12 3.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

export function LayersIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  );
}

export function CpuIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" />
    </svg>
  );
}

export function MonitorPlayIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16.5V20" />
      <path d="M10.5 8.2v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10v4a1 1 0 0 0 1 1h2l4.5 3.5a1 1 0 0 0 1.6-.8V6.3a1 1 0 0 0-1.6-.8L6 9H4a1 1 0 0 0-1 1Z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19.5 6a9 9 0 0 1 0 12" />
    </svg>
  );
}

export function SlidersIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClapperboardIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.5 10.5 4.3 8h15.4l.8 2.5H3.5Z" />
      <path d="M4.3 8 6 4.5l3 1.5-2 3M9.7 8l1.7-3.5 3 1.5-1.7 3M15.1 8l1.7-3.5 3 1.5-1.7 3" />
      <rect x="3.5" y="10.5" width="17" height="9" rx="1" />
    </svg>
  );
}

export function MicIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="3.5" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v3.5M9 20.5h6" />
    </svg>
  );
}

export function TypeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 5.5h14M12 5.5v13M9 18.5h6" />
    </svg>
  );
}

export function LoopIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12a8 8 0 0 1 14-5.2M20 12a8 8 0 0 1-14 5.2" />
      <path d="M18 3.5v3.5h-3.5M6 20.5V17h3.5" />
    </svg>
  );
}

export function SpeakerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z" />
      <path d="M16 9.5a3.3 3.3 0 0 1 0 5M18.5 7a6.8 6.8 0 0 1 0 10" />
    </svg>
  );
}

export function SignalIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 18h2.5v-4H4v4ZM8.75 18h2.5V9h-2.5v9ZM13.5 18H16V6h-2.5v12ZM18.25 18h2.5V3h-2.5v15Z" />
    </svg>
  );
}

export function SwitchIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="5" width="16" height="4.5" rx="1" />
      <rect x="4" y="14.5" width="16" height="4.5" rx="1" />
      <circle cx="8" cy="7.25" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16.75" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlayIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21s7-6.1 7-11.5S16.4 3 12 3 5 4.6 5 9.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PaperclipIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16.5 6.5 8.9 14.1a3 3 0 0 0 4.24 4.24l7.6-7.6a5 5 0 0 0-7.07-7.07l-7.6 7.6a7 7 0 0 0 9.9 9.9" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}
