import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

const MyGlobe = () => {
	const containerRef = useRef(null);
	const globeEl = useRef();
	const [globeSize, setGlobeSize] = useState(0);

	// Gen random data
	const N = 20;
	const arcsData = useMemo(
		() =>
			[...Array(N).keys()].map(() => ({
				startLat: (Math.random() - 0.5) * 180,
				startLng: (Math.random() - 0.5) * 360,
				endLat: (Math.random() - 0.5) * 180,
				endLng: (Math.random() - 0.5) * 360,
				color: ["#00f5ff", "#00f5ff"],
			})),
		[]
	);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const updateGlobeSize = (entry) => {
			const { width, height } = entry.contentRect;
			const minSide = Math.min(width, height);
			const scale = width < 640 ? 1 : width < 1024 ? 0.9 : 0.96;
			const nextSize = Math.round(Math.max(640, Math.min(minSide * scale, 900)));

			setGlobeSize((current) => (current === nextSize ? current : nextSize));
		};

		updateGlobeSize({ contentRect: container.getBoundingClientRect() });

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				updateGlobeSize(entry);
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (globeEl.current) {
			globeEl.current.controls().autoRotate = true;
			globeEl.current.controls().autoRotateSpeed = 0.5;
		}
	}, [globeSize]);

	return (
		<div
			ref={containerRef}
			style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
		>
			{globeSize > 0 && (
				<Globe
					ref={globeEl}
					width={globeSize}
					height={globeSize}
					backgroundColor={"#050810"}
					globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
					// backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
					arcsData={arcsData}
					arcColor={"color"}
					arcDashLength={() => Math.random()}
					arcDashGap={() => Math.random()}
					arcDashAnimateTime={() => Math.random() * 4000 + 500}
				/>
			)}
		</div>
	);
};

export default MyGlobe;
