import { useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

interface Props {
    value: number;
}

export const AnimatedCounter = ({ value }: Props) => {
    const motionValue = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: 0.8,
            onUpdate: latest => setDisplayValue(Math.floor(latest)),
        });

        return controls.stop;
    }, [value]);

    return <span>{displayValue}</span>;
};
