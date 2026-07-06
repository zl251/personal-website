import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Image,
  Video,
  Music,
  Code,
  Box,
  Calculator,
  Palette,
  Film,
  Guitar,
  Microchip,
  Terminal,
  Layers,
} from 'lucide-react';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Photoshop',
    category: 'design',
    level: 85,
    icon: Image,
    description: '图像处理与设计',
    color: 'from-blue-400 to-cyan-500',
    images: [withBase("/images/personal_photo.jpg"), withBase("/images/firework.jpg"), withBase("/images/afternoon_tea.jpg")],
  },
  {
    name: '剪映',
    category: 'video',
    level: 80,
    icon: Video,
    description: '视频剪辑与后期',
    color: 'from-purple-400 to-pink-500',
    videos: [withBase("/videos/UAV.mp4"), withBase("/videos/firework.mp4"), withBase("/videos/firework2.mp4"), withBase("/videos/HappyNewYear.mp4")],
  },
  {
    name: '吉他',
    category: 'music',
    level: 75,
    icon: Music,
    description: '音乐演奏',
    color: 'from-orange-400 to-red-500',
    videos: [withBase("/videos/guitar.mp4")],
  },
  {
    name: 'Keil',
    category: 'programming',
    level: 90,
    icon: Microchip,
    description: '嵌入式开发',
    color: 'from-neon-green to-emerald-500',
    videos: [withBase("/videos/object_tracking.mp4"), withBase("/videos/SCARA-1.mp4"), withBase("/videos/SCARA-2.mp4")],
  },
  {
    name: 'VScode/PyCharm',
    category: 'programming',
    level: 95,
    icon: Terminal,
    description: 'Python开发',
    color: 'from-yellow-400 to-orange-500',
    images: [withBase("/images/PyQT.png"), withBase("/images/PyQT.jpg")]
  },
  {
    name: 'SolidWorks',
    category: 'design',
    level: 88,
    icon: Box,
    description: '3D建模与设计',
    color: 'from-red-400 to-pink-500',
    videos: [withBase("/videos/tracked_vehicle.mp4"), withBase("/videos/worm_SW.mp4")],
  },
  {
    name: 'MATLAB',
    category: 'programming',
    level: 92,
    icon: Calculator,
    description: '科学计算与仿真',
    color: 'from-neon-cyan to-blue-500',
    videos: [withBase("/videos/delta.mp4"), withBase("/videos/SCARA_MATLAB.mp4"), withBase("/videos/SCARA_MATLAB2.mp4")],
  },
];

const skillTranslationsEn: Array<{ name: string; description: string }> = [
  { name: 'Photoshop', description: 'Image editing and design' },
  { name: 'CapCut', description: 'Video editing and post-production' },
  { name: 'Guitar', description: 'Music performance' },
  { name: 'Keil', description: 'Embedded development' },
  { name: 'VSCode / PyCharm', description: 'Python development' },
  { name: 'SolidWorks', description: '3D modeling and design' },
  { name: 'MATLAB', description: 'Scientific computing and simulation' },
];

interface SkillsProps {
  language: Language;
}

export default function Skills({ language }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const isEnglish = language === 'en';
  const skillItems = isEnglish
    ? skills.map((skill, index) => ({ ...skill, ...skillTranslationsEn[index] }))
    : skills;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.skill-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate progress bars
      gsap.fromTo(
        '.skill-progress',
        { width: '0%' },
        {
          width: (_, target) => target.dataset.level + '%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentSkill = skillItems.find((s) => s.name === (hoveredSkill || activeSkill));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-neon-green/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="skills-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Related <span className="text-gradient">Skills</span>
              </>
            ) : (
              <>
                相关<span className="text-gradient">技能</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish ? 'A showcase of design, programming, and creative skills' : '设计、编程与创意技能展示'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills List */}
          <div className="skills-list space-y-4">
            {skillItems.map((skill, index) => (
              <div
                key={index}
                className="skill-item group glass rounded-xl p-4 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() =>
                  setActiveSkill(activeSkill === skill.name ? null : skill.name)
                }
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                  >
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold group-hover:text-gradient transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-white/50 text-sm">{skill.level}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`skill-progress h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview Area */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="glass rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
              {currentSkill ? (
                <div className="text-center w-full">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${currentSkill.color} flex items-center justify-center`}
                  >
                    <currentSkill.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentSkill.name}
                  </h3>
                  <p className="text-white/60 mb-6">{currentSkill.description}</p>

                  {/* Preview content based on skill type */}
                  {currentSkill.images && (
                    <div className="grid grid-cols-3 gap-3">
                      {currentSkill.images.map((src, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-white/5 overflow-hidden"
                        >
                          <img
                            src={src}
                            alt={`${currentSkill.name}-${i}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      ))}

                    </div>
                  )}

                  {currentSkill.videos && (
                    <div className="space-y-3">
                      {currentSkill.videos?.length > 0 && (
                        <div className="space-y-3">
                          {currentSkill.videos.map((src, i) => {
                            const isLikelyVideoPath =
                              typeof src === "string" &&
                              (src.startsWith("/") || src.startsWith("http")) &&
                              /\.(mp4|webm|ogg)$/i.test(src);

                            return (
                              <div
                                key={src ?? i}
                                className="aspect-video rounded-lg bg-white/5 overflow-hidden flex items-center justify-center"
                              >
                                {isLikelyVideoPath ? (
                                  <video
                                    src={src}
                                    className="w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                    playsInline
                                    onError={(e) => {
                                      // 播放失败时隐藏 video，露出下面的占位（你也可以改成 setState 方案）
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <Film className="w-12 h-12 text-white/20" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  )}

                  {!currentSkill.images && !currentSkill.videos && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                        <Code className="w-10 h-10 text-white/20" />
                      </div>
                      <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                        <Layers className="w-10 h-10 text-white/20" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center">
                    <Palette className="w-12 h-12 text-white/30" />
                  </div>
                  <p className="text-white/40 text-lg">
                    {isEnglish ? 'Hover or click a skill to view details' : '悬停或点击技能查看详情'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { name: isEnglish ? 'Design' : '设计', icon: Palette, count: 2 },
            { name: isEnglish ? 'Video' : '视频', icon: Film, count: 1 },
            { name: isEnglish ? 'Music' : '音乐', icon: Guitar, count: 1 },
            { name: isEnglish ? 'Programming' : '编程', icon: Code, count: 3 },
          ].map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass"
            >
              <category.icon className="w-4 h-4 text-neon-green" />
              <span className="text-white/80 text-sm">{category.name}</span>
              <span className="text-white/40 text-sm">({category.count})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
