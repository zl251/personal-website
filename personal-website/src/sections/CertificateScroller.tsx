// import React, { useEffect, useMemo, useRef } from "react";
// import { animate, scroll } from "motion";

// export type CertificateItem = {
//   title: string;
//   src: string; // 例如："/certificates/cert-1.jpg"
//   org?: string;
//   date?: string;
// };

// type Props = {
//   certificates: CertificateItem[];
//   sectionHeightVh?: number; // 越大滚动越“慢”
//   viewportHeightVh?: number; // sticky 视窗高度
//   gapPx?: number;
// };

// export default function CertificateScroller({
//   certificates,
//   sectionHeightVh = 20,
//   viewportHeightVh = 30,
//   gapPx = 24,
// }: Props) {
//   const containerRef = useRef<HTMLElement | null>(null);
//   const trackRef = useRef<HTMLUListElement | null>(null);

//   const uid = useMemo(
//     () => `cert-scroll-${Math.random().toString(16).slice(2)}`,
//     []
//   );

//   useEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;
//     if (!container || !track) return;

//     // 设置卡片间距
//     track.style.gap = `${gapPx}px`;

//     let cleanup = () => {};

//     const setup = () => {
//       const maxX = Math.max(0, track.scrollWidth - container.clientWidth);

//       // 直接修改 transform 样式
//       const animation = (progress: number) => {
//         const translateX = -maxX * (1 - progress);
//         track.style.transform = `translateX(${translateX}px)`;
//       };

//       // scroll 联动（模板同款思路）
//       const sc = scroll(animation, { target: container });

//       // 统一做一个安全清理（兼容不同返回类型）
//       cleanup = () => {
//         try {
//           // animate() 返回的一般有 stop()
//           (animation as any)?.stop?.();
//         } catch {}

//         try {
//           // scroll() 有的版本返回 function，有的返回 controls
//           if (typeof sc === "function") sc();
//           else (sc as any)?.stop?.();
//         } catch {}
//       };
//     };

//     setup();

//     const onResize = () => {
//       cleanup();
//       setup();
//     };

//     window.addEventListener("resize", onResize);

//     // 图片加载后会影响 scrollWidth，加载完成后重算一次
//     const imgs = Array.from(track.querySelectorAll("img"));
//     const onImgLoad = () => onResize();
//     imgs.forEach((img) => img.addEventListener("load", onImgLoad));

//     return () => {
//       window.removeEventListener("resize", onResize);
//       imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
//       cleanup();
//     };
//   }, [certificates, gapPx]);

//   if (!certificates?.length) return null;

//   return (
//     <article id={uid} className="w-full">
//       <div className="mb-4">
//         <h3 className="text-white text-xl font-bold">奖状展示</h3>
//         <p className="text-white/50 text-sm mt-1">向下滚动：奖状横向移动</p>
//       </div>

//       <section
//         ref={(el) => {
//           containerRef.current = el;
//         }}
//         className="relative"
//         style={{ height: `${sectionHeightVh}vh` }}
//       >
//         <div
//           className="sticky top-0 overflow-hidden"
//           style={{ height: `${viewportHeightVh}vh` }}
//         >
//           <ul
//             ref={(el) => {
//               trackRef.current = el;
//             }}
//             className="flex items-center h-full px-2"
//           >
//             {certificates.map((c, i) => (
//               <li
//                 key={`${c.src}-${i}`}
//                 className="shrink-0"
//                 style={{ width: "clamp(220px, 30vw, 360px)" }}
//               >
//                 <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition">
//                   <div className="aspect-[4/3] bg-white/5 overflow-hidden">
//                     <img
//                       src={c.src}
//                       alt={c.title}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>

//                   <div className="p-4">
//                     <div className="text-white font-semibold truncate">
//                       {c.title}
//                     </div>
//                     <div className="text-white/55 text-sm mt-1 truncate">
//                       {c.org || ""}
//                       {c.date ? (c.org ? ` · ${c.date}` : c.date) : ""}
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </article>
//   );
// }
