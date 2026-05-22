import { useEffect, useState } from 'react';

/**
 * Hook to handle module transition visual effects.
 * Listens for the custom 'module:load' event dispatched by ActiveModuleContext.
 * Triggers a re-render which can be used by components such as ScanlineOverlay
 * (via enableFlicker prop) to produce a flicker effect.
 */
export default function useModuleTransition() {
  // Local state to force a re-render on module change
  const [, setTrigger] = useState<number>(0);

  useEffect(() => {
    const handler = () => {
      // Update state with a new timestamp to trigger re-render
      setTrigger(Date.now());
    };
    window.addEventListener('module:load', handler);
    return () => {
      window.removeEventListener('module:load', handler);
    };
  }, []);
}
