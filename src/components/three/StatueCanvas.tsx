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

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Chromatic & iridescent highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.DirectionalLight(0xff4500, 3.5);
    orangeKeyLight.position.set(4, 3, 4);
    scene.add(orangeKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    cyanRimLight.position.set(-4, -2, 2);
    scene.add(cyanRimLight);

    const purpleBackLight = new THREE.PointLight(0xa855f7, 3, 10);
    purpleBackLight.position.set(0, -2, -2);
    scene.add(purpleBackLight);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        // Center the model in view
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.2;
        model.position.z = -center.z * scale;

        scene.add(model);
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
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (model) {
        // Idle gentle float and smooth lerp to mouse
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;

        model.rotation.y = currentRotationY + Math.sin(elapsedTime * 0.6) * 0.08;
        model.rotation.x = currentRotationX + Math.cos(elapsedTime * 0.8) * 0.04;
        model.position.y = -0.2 + Math.sin(elapsedTime * 1.2) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

      {/* Instant fallback while 3D GLB is loading or if WebGL is disabled */}
      {(!isLoaded || loadError) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <StatueFallback className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
