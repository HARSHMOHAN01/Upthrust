"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Image from "next/image";

interface CurveCanvasProps {
  modelPath?: string;
  activeIndex?: number;
  className?: string;
}

export default function CurveCanvas({
  modelPath = "/models/curve line with dark orange.glb",
  activeIndex = 0,
  className = "w-full h-full",
}: CurveCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let model: THREE.Group | null = null;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Warm reflective metallic orange highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xff5500, 4.0);
    warmLight.position.set(5, 5, 4);
    scene.add(warmLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5.2 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        scene.add(model);
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.warn("Could not load 3D curve model, using fallback image:", error);
        setLoadError(true);
      }
    );

    // 6. Animation loop
    const clock = new THREE.Clock();
    let currentTargetX = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (model) {
        // Shift horizontal position based on the selected service index (0 to 3)
        const targetX = (activeIndexRef.current - 1.5) * -0.6;
        currentTargetX += (targetX - currentTargetX) * 0.05;
        model.position.x = currentTargetX;

        // Subtle undulating wave rotation
        model.rotation.y = Math.sin(elapsedTime * 0.4) * 0.12;
        model.rotation.x = Math.cos(elapsedTime * 0.3) * 0.06;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div className={`relative ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className={`w-full h-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Fallback image */}
      {(!isLoaded || loadError) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <Image
            src="/designs/3d elements.jpg"
            alt="Winding 3D Orange Curve"
            width={900}
            height={300}
            className="w-full h-auto object-contain opacity-75"
          />
        </div>
      )}
    </div>
  );
}
