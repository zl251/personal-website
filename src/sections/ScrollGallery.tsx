// ScrollGallery.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { animate, scroll } from "motion";
import type { Language } from '@/types/language';

interface GalleryItem {
  src: string;
  label: string;
}

interface ScrollGalleryProps {
  items: GalleryItem[];
  language: Language;
}

// 控制滚动速度感受：越大滚得越慢
const VH_PER_VW = 1.2;
const MIN_HEIGHT_VH = 150;

export default function ScrollGallery({ items, language }: ScrollGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [containerHeight, setContainerHeight] = useState(MIN_HEIGHT_VH);
  const cleanupRef = useRef<(() => void) | null>(null);
  const isEnglish = language === 'en';

  const initScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgGroup = container.querySelector(".img-group") as HTMLElement;
    if (!imgGroup) return;

    const scrollWidth = imgGroup.scrollWidth;
    const viewportWidth = window.innerWidth;
    // 用视口宽度的比例作为缓冲，大屏大缓冲、小屏小缓冲，比例统一
    const rightBuffer = viewportWidth * 0.6;
    const overflowWidth = Math.max(0, scrollWidth - viewportWidth + rightBuffer);

    if (overflowWidth <= 0) return;

    // 根据实际溢出宽度反算容器高度
    const neededVh = Math.max(
      MIN_HEIGHT_VH,
      (overflowWidth / viewportWidth) * 100 * VH_PER_VW + 100
    );
    setContainerHeight(neededVh);

    // 双重 rAF：确保 React 将新高度写入 DOM 后再绑定动画
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 防止组件已卸载
        if (!containerRef.current) return;

        const controls1 = scroll(
          animate(".img-group", {
            transform: ["none", `translateX(-${overflowWidth}px)`],
          }),
          { target: container }
        );

        const controls2 = scroll(
          animate(".progress", { scaleX: [0, 1] }),
          { target: container }
        );

        cleanupRef.current = () => {
          if (typeof controls1 === "object" && "stop" in controls1) {
            (controls1 as { stop: () => void }).stop();
          }
          if (typeof controls2 === "object" && "stop" in controls2) {
            (controls2 as { stop: () => void }).stop();
          }
        };
      });
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    const tryInit = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        initScroll();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        tryInit();
      } else {
        img.addEventListener("load", tryInit, { once: true });
        img.addEventListener("error", tryInit, { once: true });
      }
    });

    if (images.length === 0) {
      initScroll();
    }

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [items.length, initScroll]);

  return (
    <>
      {/* Gallery Title */}
      <div className="text-center mt-20 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white/80">
          {isEnglish ? (
            <>
              Certificate <span className="text-gradient">Gallery</span>
            </>
          ) : (
            <>
              证书<span className="text-gradient">展示</span>
            </>
          )}
        </h3>
        <p className="text-white/40 text-sm mt-2">
          {isEnglish ? 'Horizontal scrolling view' : '横向滚动浏览'}
        </p>
      </div>

      <section
        ref={containerRef}
        className="img-group-container"
        style={{ height: `${containerHeight}vh` }}
      >
        <div>
          <ul className="img-group">
            {items.map((item, i) => (
              <li key={i} className="img-container">
                <div className="img-wrapper">
                  <img src={item.src} alt={item.label || (isEnglish ? `Certificate ${i + 1}` : `证书 ${i + 1}`)} />
                </div>
                {item.label && <h3>{item.label}</h3>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 进度条 */}
      <div className="gallery-progress-track">
        <div className="progress" />
      </div>
    </>
  );
}
