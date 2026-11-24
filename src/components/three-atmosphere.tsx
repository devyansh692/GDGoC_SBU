"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeAtmosphere() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.z = 9;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    root.appendChild(renderer.domElement);

    const count = window.innerWidth < 700 ? 52 : 116;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      speeds[i] = 0.08 + Math.random() * 0.16;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xD58A55, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true, depthWrite: false });
    const motes = new THREE.Points(geometry, material);
    scene.add(motes);

    const resize = () => {
      const width = root.clientWidth || window.innerWidth;
      const height = root.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    let frame = 0;
    const draw = () => {
      const points = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const y = i * 3 + 1;
        points[y] += speeds[i] * 0.003;
        points[i * 3] += Math.sin(frame * 0.004 + i) * 0.0007;
        if (points[y] > 4.5) points[y] = -4.5;
      }
      geometry.attributes.position.needsUpdate = true;
      motes.rotation.z = Math.sin(frame * 0.001) * 0.012;
      renderer.render(scene, camera);
      frame += 1;
    };
    if (reduced) draw();
    else renderer.setAnimationLoop(draw);

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="three-atmosphere" aria-hidden="true" />;
}
