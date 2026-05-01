import createGlobe from 'cobe'
import { animate } from 'motion';
import { useEffect, useRef } from 'react';

export default function Globe() {
    const canvasRef = useRef();
    const globeRef = useRef();
    const animationRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Recreate globe with new dimensions
            if (globeRef.current) {
                globeRef.current.destroy();
            }

            const globe = createGlobe(canvas, {
                devicePixelRatio: dpr,
                width: canvas.width,
                height: canvas.height,
                phi: 0,
                theta: 0.2,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [1, 1, 1],
                markerColor: [0, 0.96, 1],
                glowColor: [1, 1, 1],
                markers: [
                    { location: [37.78, -122.44], size: 0.03, id: 'sf' },
                    { location: [40.71, -74.01], size: 0.03, id: 'nyc' },
                    { location: [52.52, 13.41], size: 0.03, id: 'berlin' },
                    { location: [47.37, 8.55], size: 0.03, id: 'zurich' },
                    { location: [52.37, 4.89], size: 0.03, id: 'amsterdam' },
                    { location: [12.97, 77.59], size: 0.03, id: 'bangalore' },
                    { location: [28.61, 77.23], size: 0.03, id: 'newdelhi' },
                    { location: [19.08, 72.88], size: 0.03, id: 'mumbai' },
                    { location: [1.35, 103.82], size: 0.03, id: 'singapore' },
                    { location: [25.28, 55.37], size: 0.03, id: 'dubai' },
                ],
                arcs: [
                    // US to Europe
                    { from: [37.78, -122.44], to: [52.52, 13.41] },
                    { from: [40.71, -74.01], to: [47.37, 8.55] },
                    // US to Southeast Asia
                    { from: [37.78, -122.44], to: [1.35, 103.82] },
                    // Europe to India
                    { from: [52.52, 13.41], to: [28.61, 77.23] },
                    { from: [52.37, 4.89], to: [19.08, 72.88] },
                    // India to Southeast Asia
                    { from: [12.97, 77.59], to: [1.35, 103.82] },
                    // Middle East to Europe
                    { from: [25.28, 55.37], to: [52.52, 13.41] },
                    //Within US
                    { from: [37.78, -122.44], to: [40.71, -74.01] },
                ],
                arcColor: [0, 0.96, 1],
                arcWidth: 0.5,
                arcHeight: 0.3,
            });

            globeRef.current = globe;

            // Animate the globe
            let phi = 0;
            const animateGlobe = () => {
                phi += 0.005;
                globe.update({ phi });
                animationRef.current = requestAnimationFrame(animateGlobe);
            };
            animateGlobe();
        };

        updateCanvasSize();

        // Handle window resize
        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });

        resizeObserver.observe(canvas.parentElement);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (globeRef.current) {
                globeRef.current.destroy();
            }
        };
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '100%', zIndex: 0, transform: 'translateX(50%) translateY(0%)' }}
        ></canvas>
    )
}
