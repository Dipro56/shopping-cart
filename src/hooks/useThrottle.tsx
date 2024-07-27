import { useState, useRef, useCallback } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const [lastCall, setLastCall] = useState(0);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const lastArgs = useRef<any[]>([]);

    const throttledFunction = useCallback((...args: any[]) => {
        const now = Date.now();
        lastArgs.current = args;

        if (now - lastCall >= delay) {
            setLastCall(now);
            callback(...args);
        } else {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                setLastCall(Date.now());
                callback(...lastArgs.current);
            }, delay - (now - lastCall));
        }
    }, [lastCall, callback, delay]);

    return throttledFunction;
};