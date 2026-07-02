import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 设置场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 创建粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 创建环面扭结
    const torusGeometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, -1, 0);
    scene.add(torus);

    // 创建二十面体
    const icoGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b9d,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(-3.5, 1, 0);
    scene.add(ico);

    // 创建八面体
    const octGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const oct = new THREE.Mesh(octGeometry, octMaterial);
    oct.position.set(2, 2, 0);
    scene.add(oct);

    camera.position.z = 5;

    // 鼠标移动效果
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // 动画循环
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0001;

      torus.rotation.x += 0.003;
      torus.rotation.y += 0.002;

      ico.rotation.x -= 0.002;
      ico.rotation.y += 0.003;

      oct.rotation.x += 0.004;
      oct.rotation.z += 0.002;

      // 鼠标视差效果
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 窗口大小调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // 清理Three.js资源
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      octGeometry.dispose();
      octMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-[1]"
      />

      {/* 渐变背景层 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 92, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0, 212, 255, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(255, 107, 157, 0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* 网格叠加层 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[3] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
}
