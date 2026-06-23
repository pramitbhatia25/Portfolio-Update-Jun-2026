import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = element => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = block => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = '.cursor-target',
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  cursorColor = '#ffffff',
  cursorColorOnTarget = cursorColor
}) => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const activeTargetRef = useRef(null);
  const containingBlockRef = useRef(null);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.12,
      ease: 'power3.out'
    });
  }, []);

  const setActiveTarget = useCallback(
    target => {
      if (activeTargetRef.current === target) return;
      activeTargetRef.current = target;

      if (!ringRef.current || !dotRef.current) return;

      gsap.to(ringRef.current, {
        width: target ? 54 : 34,
        height: target ? 54 : 34,
        borderColor: target ? cursorColorOnTarget : cursorColor,
        backgroundColor: target ? 'rgba(233, 168, 255, 0.1)' : 'rgba(246, 244, 240, 0.04)',
        duration: hoverDuration,
        ease: 'power3.out'
      });

      gsap.to(dotRef.current, {
        scale: target ? 0.75 : 1,
        backgroundColor: target ? cursorColorOnTarget : cursorColor,
        duration: hoverDuration,
        ease: 'power3.out'
      });
    },
    [cursorColor, cursorColorOnTarget, hoverDuration]
  );

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    containingBlockRef.current = getContainingBlock(cursorRef.current);
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const moveHandler = e => {
      moveCursor(e.clientX, e.clientY);
      const target = e.target instanceof Element ? e.target.closest(targetSelector) : null;
      setActiveTarget(target);
    };

    const leaveHandler = () => setActiveTarget(null);

    const mouseDownHandler = () => {
      if (!ringRef.current || !dotRef.current) return;
      gsap.to(ringRef.current, { scale: 0.86, duration: 0.16, ease: 'power2.out' });
      gsap.to(dotRef.current, { scale: 1.25, duration: 0.16, ease: 'power2.out' });
    };

    const mouseUpHandler = () => {
      if (!ringRef.current || !dotRef.current) return;
      gsap.to(ringRef.current, { scale: 1, duration: 0.18, ease: 'power2.out' });
      gsap.to(dotRef.current, { scale: activeTargetRef.current ? 0.75 : 1, duration: 0.18, ease: 'power2.out' });
    };

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursorRef.current);
    };

    window.addEventListener('mousemove', moveHandler, { passive: true });
    window.addEventListener('mouseleave', leaveHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseleave', leaveHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('resize', resizeHandler);
      gsap.killTweensOf([cursorRef.current, ringRef.current, dotRef.current]);
      document.body.style.cursor = originalCursor;
      activeTargetRef.current = null;
    };
  }, [hideDefaultCursor, isMobile, moveCursor, setActiveTarget, targetSelector]);

  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div ref={ringRef} className="target-cursor-ring" style={{ borderColor: cursorColor }} />
      <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} />
    </div>
  );
};

export default TargetCursor;
