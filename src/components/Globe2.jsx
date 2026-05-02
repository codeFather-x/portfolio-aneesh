import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const MyGlobe = () => {
	const globeEl = useRef();
	// Gen random data
	const N = 20;
	const arcsData = [...Array(N).keys()].map(() => ({
		startLat: (Math.random() - 0.5) * 180,
		startLng: (Math.random() - 0.5) * 360,
		endLat: (Math.random() - 0.5) * 180,
		endLng: (Math.random() - 0.5) * 360,
		// color: [
		// 	["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
		// 	["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
		// ],
        color: ["#00f5ff","#00f5ff"]
	}));
	useEffect(() => {
		// Configure controls once the globe is initialized
		if (globeEl.current) {
			globeEl.current.controls().autoRotate = true;
			globeEl.current.controls().autoRotateSpeed = 0.5;
		}
	}, []);

	return (
		<Globe
			ref={globeEl}
			globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
			// backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={arcsData}
            arcColor={'color'}
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 500}
		/>
	);
};

export default MyGlobe;
