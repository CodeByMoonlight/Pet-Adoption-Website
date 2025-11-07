import { useState, useEffect } from 'react';

interface LoadingProps {
    duration?: number;
    isDataLoading?: boolean;
    onComplete?: () => void;
}

export default function Loading({
    duration = 8000,
    isDataLoading = false,
    onComplete,
}: LoadingProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [startFadeOut, setStartFadeOut] = useState(false);

    useEffect(() => {
        // Set minimum time elapsed after duration
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    useEffect(() => {
        // Start fade out animation when conditions are met
        if (minTimeElapsed && !isDataLoading) {
            setStartFadeOut(true);

            const fadeOutTimer = setTimeout(() => {
                setIsVisible(false);
                if (onComplete) onComplete();
            }, 1200);

            return () => clearTimeout(fadeOutTimer);
        }
    }, [minTimeElapsed, isDataLoading, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`loading bg-tertiary-light fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center ${startFadeOut ? 'fade-out' : ''}`}
        >
            <img
                src="/images/loading.gif"
                alt="loading animation"
                className="loading-icon h-120 w-120 object-contain"
            />
        </div>
    );
}
