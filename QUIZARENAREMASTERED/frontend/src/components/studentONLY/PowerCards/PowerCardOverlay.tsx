'use client';

import type { ReactNode } from 'react';

interface PowerCardOverlayProps {
  children: ReactNode;
  locked?: boolean;
  onClose?: () => void;
  className?: string;
}

export function PowerCardOverlay({ children, locked = false, onClose, className = '' }: PowerCardOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[powerCardFadeIn_220ms_ease-out] ${className}`}
      onClick={locked ? undefined : onClose}
    >
      <div
        className="relative flex max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col items-center gap-6 overflow-y-auto p-8 animate-[powerCardRise_420ms_cubic-bezier(.2,.8,.2,1)]"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
      <style>{`@keyframes powerCardFadeIn{from{opacity:0}to{opacity:1}}@keyframes powerCardRise{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    </div>
  );
}

export default PowerCardOverlay;
