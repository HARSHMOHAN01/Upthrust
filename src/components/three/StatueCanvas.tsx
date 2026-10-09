"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { StatueFallback } from "@/components/visuals/StatueFallback";

interface StatueCanvasProps {
  modelPath?: string;
  className?: string;
}

export default function StatueCanvas({
  modelPath = "/models/Updated statue.glb",
  className = "w-full h-full",
}: StatueCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let model: THREE.Group | null = null;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;
    let isVisible = true;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const statueGroup = new THREE.Group();
    scene.add(statueGroup);

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 3. Renderer setup with mobile GPU optimization
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Iridescent highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.DirectionalLight(0xff4500, 3.8);
    orangeKeyLight.position.set(4, 3, 4);
    scene.add(orangeKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    cyanRimLight.position.set(-4, -2, 2);
    scene.add(cyanRimLight);

    const purpleBackLight = new THREE.PointLight(0xa855f7, 3.2, 10);
    purpleBackLight.position.set(0, -2, -2);
    scene.add(purpleBackLight);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.45 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        statueGroup.add(model);
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.warn("Could not load 3D GLB model, falling back to static visual:", error);
        setLoadError(true);
      }
    );

    // 6. Interactive Mouse Tracking
    const handleMouseMove = (event: MouseEvent) => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. IntersectionObserver to pause loop when scrolled out of view (Performance saving)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // ResizeObserver for reliable dimension handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Animation loop with visibility throttling
    const clock = new THREE.Clock();
    const baseRotY = -0.65; // Orient face to 3/4 left profile matching the design screenshot

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip rendering when out of viewport

      const elapsedTime = clock.getElapsedTime();
      if (statueGroup) {
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;

        statueGroup.rotation.y = baseRotY + currentRotationY + Math.sin(elapsedTime * 0.6) * 0.05;
        statueGroup.rotation.x = currentRotationX + Math.cos(elapsedTime * 0.8) * 0.03;
        statueGroup.position.y = Math.sin(elapsedTime * 1.0) * 0.04;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
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

      {/* Instant fallback while 3D GLB is loading or if WebGL is disabled */}
      {(!isLoaded || loadError) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <StatueFallback className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
