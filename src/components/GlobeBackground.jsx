import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobeBackground = ({ width, height }) => {
    const globeEl = useRef();
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        // Load polygon data on mount
        fetch('https://raw.githubusercontent.com/iamakulov/country-flags/master/data/countries.json')
            .then(res => res.json())
            .then(data => setCountries(data.features));
    }, []);

    const globeWidth = width || window.innerWidth;
    const globeHeight = height || window.innerHeight;

    useEffect(() => {
        let animationFrameId;

        if (globeEl.current) {
            globeEl.current.pointOfView({ lat: 1, lng: 0, altitude: 2.2 }, 0);
            const controls = globeEl.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = true;
        }

        const animate = () => {
            if (globeEl.current) {
                globeEl.current.controls().update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Globe
                ref={globeEl}
                width={globeWidth}
                height={globeHeight}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)" // Transparent background
                showAtmosphere={true}
                atmosphereColor="#0ff"
                atmosphereAltitude={0.15}
                polygonsData={countries || []}
                polygonAltitude={0.01}
                polygonCapColor={() => 'rgba(0,255,0,0.6)'}
                polygonSideColor={() => 'rgba(0,255,0,0.15)'}
                onPolygonHover={hover => {
                    if (hover && globeEl.current) {
                        globeEl.current.controls().autoRotate = false;
                        globeEl.current.controls().enableZoom = true;
                        globeEl.current.controls().enablePan = true;
                        const { ADMIN, POP_EST, CAPITAL } = hover.properties;
                        console.log(`🌍 ${ADMIN} | Capital: ${CAPITAL} | Pop: ${POP_EST}`);
                    } else if (globeEl.current) {
                        globeEl.current.controls().autoRotate = true;
                    }
                }}
            />
        </div>
    );
};

export default GlobeBackground;
