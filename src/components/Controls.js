// Controls.js
import React, { useEffect } from 'react';

function Controls() {
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    document.dispatchEvent(new CustomEvent('changeDirection', { detail: event.key }));
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
}

export default Controls;
