// import ProfileCard from './ProfileCard'

// <ProfileCard
//   name="Javi A. Torres"
//   title="Software Engineer"
//   handle="javicodes"
//   status="Online"
//   contactText="Contact Me"
//   avatarUrl="/path/to/avatar.jpg"
//   showUserInfo={false}
//   enableTilt={true}
//   enableMobileTilt={false}
//   onContactClick={() => console.log('Contact clicked')}
//   behindGlowColor="rgba(125, 190, 255, 0.67)"
//   iconUrl="/assets/demo/iconpattern.png"
//   behindGlowEnabled
//   innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
// />



import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { useTheme } from './ThemeContext';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const getDepartmentIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('eng') || n.includes('dev') || n.includes('tech') || n.includes('code')) {
    return (
      <svg className="w-12 h-12 text-[#A78BFA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5))' }}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    );
  }
  if (n.includes('mark') || n.includes('sale') || n.includes('prom') || n.includes('ads')) {
    return (
      <svg className="w-12 h-12 text-[#F43F5E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.5))' }}>
        <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    );
  }
  if (n.includes('fin') || n.includes('pay') || n.includes('bill') || n.includes('mon')) {
    return (
      <svg className="w-12 h-12 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}>
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    );
  }
  return (
    <svg className="w-12 h-12 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

// Inject keyframes once
const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  onCardClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
  onCardClick
}) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(theme === 'dark');
      }
    };
    checkTheme();
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', checkTheme);
      return () => media.removeEventListener('change', checkTheme);
    }
  }, [theme]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number): void {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number): void {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter(): void {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number): void {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent(): { x: number; y: number; tx: number; ty: number } {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement): { x: number; y: number } => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = (): void => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<string>;
      };
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardRadius = '30px';

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': isDark
        ? (innerGradient ?? DEFAULT_INNER_GRADIENT)
        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(220, 235, 255, 0.75) 100%)',
      '--behind-glow-color': isDark
        ? (behindGlowColor ?? 'rgba(125, 190, 255, 0.67)')
        : 'rgba(59, 130, 246, 0.15)',
      '--behind-glow-size': behindGlowSize ?? '50%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-center': '0',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-opacity': '0',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-radius': cardRadius,
      '--sunpillar-1': 'hsl(2, 100%, 73%)',
      '--sunpillar-2': 'hsl(53, 100%, 69%)',
      '--sunpillar-3': 'hsl(93, 100%, 69%)',
      '--sunpillar-4': 'hsl(176, 100%, 76%)',
      '--sunpillar-5': 'hsl(228, 100%, 74%)',
      '--sunpillar-6': 'hsl(283, 100%, 73%)',
      '--sunpillar-clr-1': 'var(--sunpillar-1)',
      '--sunpillar-clr-2': 'var(--sunpillar-2)',
      '--sunpillar-clr-3': 'var(--sunpillar-3)',
      '--sunpillar-clr-4': 'var(--sunpillar-4)',
      '--sunpillar-clr-5': 'var(--sunpillar-5)',
      '--sunpillar-clr-6': 'var(--sunpillar-6)'
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize, cardRadius, isDark]
  );

  const handleContactClick = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    onContactClick?.();
  }, [onContactClick]);

  // Complex styles that require CSS variables and can't be done with Tailwind
  const shineStyle = {
    maskImage: 'var(--icon)',
    maskMode: 'luminance',
    maskRepeat: 'repeat',
    maskSize: '150%',
    maskPosition: 'top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))',
    filter: 'brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5)',
    animation: 'pc-holo-bg 18s linear infinite',
    animationPlayState: 'running' as const,
    mixBlendMode: 'color-dodge' as const,
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden' as const,
    zIndex: 3,
    background: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) 5%,
        var(--sunpillar-clr-2) 10%,
        var(--sunpillar-clr-3) 15%,
        var(--sunpillar-clr-4) 20%,
        var(--sunpillar-clr-5) 25%,
        var(--sunpillar-clr-6) 30%,
        var(--sunpillar-clr-1) 35%
      ),
      repeating-linear-gradient(
        -45deg,
        #0e152e 0%,
        hsl(180, 10%, 60%) 3.8%,
        hsl(180, 29%, 66%) 4.5%,
        hsl(180, 10%, 60%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0, 0%, 0%, 0.1) 12%,
        hsla(0, 0%, 0%, 0.15) 20%,
        hsla(0, 0%, 0%, 0.25) 120%
      )
    `.replace(/\s+/g, ' '),
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none' as const
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsl(248, 25%, 80%) 12%,
      hsla(207, 40%, 30%, 0.8) 90%
    )`,
    mixBlendMode: 'overlay',
    filter: 'brightness(0.8) contrast(1.2)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none'
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none cursor-pointer ${className}`.trim()}
      onClick={onCardClick}
      style={{ perspective: '500px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle } as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px) saturate(1.1)',
            opacity: 'calc(0.8 * var(--card-opacity))'
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1] group">
        <section
          className="grid relative overflow-hidden"
          style={{
            height: '440px',
            maxHeight: '440px',
            aspectRatio: '0.718',
            borderRadius: cardRadius,
            backgroundBlendMode: 'color-dodge, normal, normal, normal',
            boxShadow: isDark
              ? 'rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px'
              : 'rgba(0, 0, 0, 0.08) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px, 0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            transition: 'transform 1s ease, height 0.4s ease, width 0.4s ease, max-height 0.4s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            background: isDark ? 'rgba(10, 20, 16, 0.4)' : 'rgba(255, 255, 255, 0.55)',
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'height 0.4s ease, width 0.4s ease, max-height 0.4s ease';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            const shell = shellRef.current;
            const dur = shell?.classList.contains('entering') ? '180ms' : '1s';
            e.currentTarget.style.transition = `transform ${dur} ease-out, height 0.4s ease, width 0.4s ease, max-height 0.4s ease`;
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1'
            }}
          >
            {/* Shine layer */}
            {isDark && <div style={shineStyle} />}

            {/* Glare layer */}
            <div style={glareStyle} />

            {/* Avatar content */}
            <div
              className="overflow-visible"
              style={{
                mixBlendMode: 'luminosity',
                transform: 'translateZ(2px)',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                className="w-full absolute left-1/2 bottom-[-1px] will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: '50% 100%',
                  transform:
                    'translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))',
                  borderRadius: cardRadius,
                  backfaceVisibility: 'hidden'
                }}
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />
              {showUserInfo && (
                <div
                  className="absolute z-[2] flex items-center justify-between backdrop-blur-[30px] border border-white/10 pointer-events-auto"
                  style={
                    {
                      '--ui-inset': '20px',
                      '--ui-radius-bias': '6px',
                      bottom: 'var(--ui-inset)',
                      left: 'var(--ui-inset)',
                      right: 'var(--ui-inset)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)))',
                      padding: '12px 14px'
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full overflow-hidden border border-white/10 flex-shrink-0"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || 'User'} mini avatar`}
                        loading="lazy"
                        style={{ display: 'block', gridArea: 'auto', borderRadius: '50%', pointerEvents: 'auto' }}
                        onError={e => {
                          const t = e.target as HTMLImageElement;
                          t.style.opacity = '0.5';
                          t.src = avatarUrl;
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="text-sm font-medium text-white/90 leading-none">@{handle}</div>
                      <div className="text-sm text-white/70 leading-none">{status}</div>
                    </div>
                  </div>
                  <button
                    className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-white/90 cursor-pointer backdrop-blur-[10px] transition-all duration-200 ease-out hover:border-white/40 hover:-translate-y-px"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto', display: 'block', gridArea: 'auto', borderRadius: '8px' }}
                    type="button"
                    aria-label={`Contact ${name || 'user'}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            {/* Details content */}
            {!showUserInfo ? (
              <div
                className="absolute inset-0 flex flex-col justify-between p-6 text-left z-[5]"
                style={{
                  transform:
                    'translate3d(calc(var(--pointer-from-left) * -10px + 5px), calc(var(--pointer-from-top) * -10px + 5px), 2px)',
                  borderRadius: cardRadius,
                  pointerEvents: 'none'
                }}
              >
                {/* Top Section: Department Indicator */}
                <div className="flex justify-between items-center w-full">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors duration-300 ${isDark ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20' : 'text-purple-700 bg-purple-50 border border-purple-200'}`}>
                    Department
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Connected</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse transition-all duration-300 ${isDark ? 'shadow-[0_0_8px_#34d399]' : 'shadow-[0_0_6px_#059669]'}`} />
                  </div>
                </div>

                {/* Middle Section: Modern Neon Icon & Name */}
                <div className="flex flex-col items-center justify-center my-auto gap-4 w-full">
                  <div className={`p-4 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-white/[0.03] border-white/10 backdrop-blur-md shadow-2xl' : 'bg-black/[0.02] border-black/5 shadow-inner'}`}>
                    {getDepartmentIcon(name || "")}
                  </div>
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Bottom Section: Translucent Stats Badge */}
                <div className={`w-full border rounded-xl p-3.5 backdrop-blur-md flex items-center justify-around text-center transition-colors duration-300 ${isDark ? 'bg-black/40 border-white/5' : 'bg-white/70 border-black/5 shadow-sm'}`}>
                  <div>
                    <div className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-800'}`}>7</div>
                    <div className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>HAHA</div>
                  </div>
                  <div className={`w-px h-8 transition-colors duration-300 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                  <div>
                    <div className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>12</div>
                    <div className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Devices</div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="max-h-full overflow-hidden text-center relative z-[5]"
                style={{
                  transform:
                    'translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)',
                  mixBlendMode: 'luminosity',
                  gridArea: '1 / -1',
                  borderRadius: cardRadius,
                  pointerEvents: 'none'
                }}
              >
                <div className="w-full absolute flex flex-col" style={{ top: '3em', display: 'flex', gridArea: 'auto' }}>
                  <h3
                    className="font-semibold m-0"
                    style={{
                      fontSize: 'min(5svh, 3em)',
                      backgroundImage: 'linear-gradient(to bottom, #fff, #6f6fbe)',
                      backgroundSize: '1em 1.5em',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      display: 'block',
                      gridArea: 'auto',
                      borderRadius: '0',
                      pointerEvents: 'auto'
                    }}
                  >
                    {name}
                  </h3>
                  <p
                    className="font-semibold whitespace-nowrap mx-auto w-min"
                    style={{
                      position: 'relative',
                      top: '-12px',
                      fontSize: '16px',
                      margin: '0 auto',
                      backgroundImage: 'linear-gradient(to bottom, #fff, #4a4ac0)',
                      backgroundSize: '1em 1.5em',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      display: 'block',
                      gridArea: 'auto',
                      borderRadius: '0',
                      pointerEvents: 'auto'
                    }}
                  >
                    {title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
