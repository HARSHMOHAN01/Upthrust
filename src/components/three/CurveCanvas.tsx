"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
    let curveGroup: THREE.Group | null = null;
    let isVisible = true;

    // 1. Scene & Root Group
    const scene = new THREE.Scene();
    curveGroup = new THREE.Group();
    scene.add(curveGroup);

    // 2. Camera
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 3. Renderer with mobile optimizations
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting tailored for glossy metallic orange lacquer
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Vibrant warm key light
    const keyLight = new THREE.DirectionalLight(0xff6a00, 4.5);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    // Crisp white specular rim light to make the curve edges pop
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight.position.set(-6, 3, 4);
    scene.add(rimLight);

    // Warm underside fill light
    const fillLight = new THREE.DirectionalLight(0xff3300, 2.5);
    fillLight.position.set(0, -4, 3);
    scene.add(fillLight);

    // Subtle center point light for depth
    const centerPointLight = new THREE.PointLight(0xff7722, 2.5, 12);
    centerPointLight.position.set(0, 0, 3.5);
    scene.add(centerPointLight);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Apply 90-degree X-rotation so loops stand vertically upright (matching design elements)
        model.rotation.x = Math.PI / 2;
        model.updateMatrixWorld(true);

        // Apply high-gloss, deep metallic copper-orange physical material
        const curveMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#ea580c"),
          emissive: new THREE.Color("#7c2d12"),
          emissiveIntensity: 0.25,
          metalness: 0.62,
          roughness: 0.18,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = curveMaterial;
          }
        });

        // Center and scale model within the parent curveGroup
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5.6 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        if (curveGroup) {
          curveGroup.add(model);
        }
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.warn("Could not load 3D curve model, using fallback:", error);
        setLoadError(true);
      }
    );

    // 6. IntersectionObserver to avoid rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // 7. ResizeObserver to keep canvas and camera responsive to parent element size
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

    // 8. Animation loop with smooth horizontal translation on tab changes & gentle float
    const clock = new THREE.Clock();
    let currentTargetX = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Save GPU cycles when offscreen

      const elapsedTime = clock.getElapsedTime();

      if (curveGroup) {
        const targetX = (activeIndexRef.current - 1.5) * -0.5;
        currentTargetX += (targetX - currentTargetX) * 0.05;
        curveGroup.position.x = currentTargetX;

        // Organic floating and subtle 3D rotational tilt
        curveGroup.position.y = Math.sin(elapsedTime * 0.7) * 0.12;
        curveGroup.rotation.y = Math.sin(elapsedTime * 0.35) * 0.1;
        curveGroup.rotation.x = -0.06 + Math.cos(elapsedTime * 0.25) * 0.04;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
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

      {/* Stylized fallback visual if WebGL fails */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-30">
          <svg className="w-full h-48 text-brand-orange" viewBox="0 0 1000 200" fill="none">
            <path
              d="M0 100 Q 250 10, 500 100 T 1000 100"
              stroke="currentColor"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
