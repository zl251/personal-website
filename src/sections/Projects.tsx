import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Target, Briefcase } from 'lucide-react';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
    title: '双模态特种伪装目标检测',
    category: '学术会议',
    description:
      '参与“2025第六届世界光子大会（World Photonics Conference 2025）”，通过大会报告与分会场学术交流，深入了解光学与光子学领域的最新研究成果及发展趋势，并在会议上发表学术论文1篇，介绍相关研究工作，与参会专家学者进行了深入交流。',
    technologies: ['参会地点：北京 国家会议中心', '发表EI论文1篇'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/AOPC1.jpg"),withBase("./images/AOPC2.jpg")],
  },
    {
    title: '反无人机',
    category: '学术会议',
    description:
      '参与“2024第十六届设计与制造前沿国际会议（ICFDM 2024）”，系统学习了设计与制造领域的最新研究进展，聆听多位国内外专家学者的学术报告，了解先进制造技术、智能设计方法等前沿研究方向，并与参会学者进行交流讨论，拓展了学术视野。',
    technologies: ['参会地点：厦门 国际会议中心'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/Amoy Conference_1.jpg"),withBase("./images/Amoy Conference_2.jpg")],
  },
  {
    title: '福建省低空经济保障体系发展战略研究           ',
    category: '硕士项目',
    description:
      '本系统融合YOLO算法与高精度二轴云台，实现多目标“群体感知”视觉追踪：单目标时锁定画面中心；多目标时计算全体目标的虚拟中心点并驱动云台平滑跟随，使群体始终处于最佳视野。其亮点在于检测算法与伺服控制深度融合，为全视角智能监控提供新方案。',
    technologies: ['PyTorch', 'OpenCV', 'CUDA', 'STM32'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/object_tracking.gif")],
  },
  {
    title: '2022中国大学生电动方程式大赛全国一等奖',
    category: '兴趣爱好',
    description:
      '基于 STM32 复现智能桌面宠物项目，实现语音识别控制OLED表情显示及舵机动作，并通过蓝牙模块实现远程运动控制，构建具有良好交互体验的嵌入式系统。',
    technologies: ['STM32','C语言', 'ROS', 'SolidWorks'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("./images/smart_desktop_pet.gif")],
  },
  {
    title: '超分',
    category: '本科毕业设计',
    description:
      '针对夜间低可见度场景，引入可见光-红外图像融合技术，集成TIF/TGFuse/SwinFusion三种算法，将融合图像作为YOLOv5s输入。相比纯可见光检测，融合后夜间mAP@0.5从72%提升至95.8%，漏检率降低60%，实现日夜连续稳定作业。',
    technologies: ['PyQT', 'PyTorch', 'STM32'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    videos: [withBase("./videos/graduation_design.mp4")],
  },
  {
    title: '汽车离合器',
    category: '毕业设计辅导',
    description:
      '针对传统阈值式STM32报警系统难适应复杂工况的局限，提出智能算法架构：STM32采集环境数据，上位机基于BP神经网络对实时数据做火灾预测，验证集准确率97.25%、召回率99.3%、F1达0.9463，实现从"规则驱动"到"数据驱动"的火灾判别范式升级。',
    technologies: ['PyQT', 'BP神经网络', 'PyTorch', 'STM32'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    images: [withBase("./images/Intelligent_fire_alarm_system.png"),withBase("./images/Intelligent_fire_alarm_system_workflow.png"),withBase("./images/Intelligent_fire_alarm_system_effect.png")],
  },
  {
    title: '糕点切片机',
    category: '毕业设计辅导',
    description:
      '基于MATLAB开发零件实时拣选系统，以标准硬币为参照物标定尺寸，构建灰度化→高斯滤波→Canny边缘检测→孔洞填充→轮廓提取的图像处理流水线，实现零件最小外接矩形拟合与尺寸测量，单帧检测耗时约350ms。',
    technologies: ['高斯滤波', '边缘检测', '空洞填充', '视觉测量'],
    icon: Briefcase,
    color: 'from-orange-400 to-red-500',
    videos: [withBase("./videos/Parts_picking_system.mp4")],
  },
  
  {
    title: '志愿者服务',
    category: '学生活动',
    description:
      '在本科及硕士阶段积极参与志愿服务，主动投身校园及社会公益实践，多次参加校园活动保障、社区服务及公益宣传等工作。服务过程中认真负责，积极配合团队完成任务，展现出良好的社会责任感和奉献精神。',
    technologies: [],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("./images/volunteer1.jpg"),withBase("./images/volunteer2.jpg")],
  },

];

const projectTranslationsEn: Array<{
  title: string;
  category: string;
  description: string;
  technologies: string[];
}> = [
  {
    title: '6th World Photonics Conference',
    category: 'Academic Conference',
    description:
      'Participated in the 2025 World Photonics Conference, followed keynote talks and technical sessions, and presented one EI-indexed paper while exchanging ideas with researchers in optics and photonics.',
    technologies: ['Venue: Beijing National Convention Center', '1 EI paper presented'],
  },
  {
    title: '16th International Conference on Frontier Design and Manufacturing',
    category: 'Academic Conference',
    description:
      'Participated in ICFDM 2024, learned recent advances in design and manufacturing, attended expert talks, and discussed frontier directions including advanced manufacturing and intelligent design.',
    technologies: ['Venue: Xiamen International Conference Center'],
  },
  {
    title: 'YOLO-Based Multi-Target Adaptive Gimbal Tracking Servo System',
    category: 'Master Project',
    description:
      'Built a high-precision dual-axis gimbal system with YOLO-based group-aware tracking. It locks onto a single target or follows the virtual center of multiple targets for smooth and stable field-of-view control.',
    technologies: ['PyTorch', 'OpenCV', 'CUDA', 'STM32'],
  },
  {
    title: 'STM32 Smart Desktop Pet',
    category: 'Personal Interest',
    description:
      'Recreated an STM32-based smart desktop pet with voice-controlled OLED expressions and servo actions, plus remote motion control through a Bluetooth module.',
    technologies: ['STM32', 'C', 'ROS', 'SolidWorks'],
  },
  {
    title: 'Water-Surface Buoy Detection for Multirotor UAV Vision',
    category: 'Undergraduate Thesis',
    description:
      'Introduced visible-infrared fusion for low-visibility night scenarios and integrated TIF, TGFuse, and SwinFusion before YOLOv5s detection, improving night mAP@0.5 from 72% to 95.8%.',
    technologies: ['PyQT', 'PyTorch', 'STM32'],
  },
  {
    title: 'Embedded Fire Early-Warning System with BP Neural Network',
    category: 'Thesis Mentorship',
    description:
      'Designed a data-driven fire warning pipeline: STM32 collects environmental data and a host-side BP neural network predicts fire risk in real time, reaching 97.25% accuracy and 99.3% recall.',
    technologies: ['PyQT', 'BP Neural Network', 'PyTorch', 'STM32'],
  },
  {
    title: 'Machine Vision-Based Part Picking System',
    category: 'Thesis Mentorship',
    description:
      'Developed a MATLAB real-time picking system with grayscale conversion, Gaussian filtering, Canny edges, hole filling, and contour extraction for dimension measurement with ~350 ms per frame.',
    technologies: ['Gaussian Filtering', 'Edge Detection', 'Hole Filling', 'Vision Measurement'],
  },
  {
    title: 'Parallel SCARA Robot Motion Control System (Project Lead)',
    category: 'Undergraduate Course Project',
    description:
      'Led STM32 lower-controller development for a five-bar parallel SCARA robot, including inverse kinematics, interpolation algorithms, G-code parsing, and automatic homing.',
    technologies: ['STM32', 'Interpolation Algorithms', 'Kinematics Programming', 'Stepper Motor Control', 'C# Host Software'],
  },
  {
    title: 'Intelligent Delivery Cart During COVID-19 (Project Lead)',
    category: 'Undergraduate Research Training Program',
    description:
      'Led design of a three-section mecanum-wheel delivery cart. Built virtual/physical prototypes and deployed a YOLOv5 house-number recognizer, improving inference latency from 50 ms to 4 ms with TensorRT.',
    technologies: ['SolidWorks', 'Adams Simulation', 'YOLO'],
  },
  {
    title: 'Concept Design and Prototype of a 3R Parallel Delta Robot',
    category: 'Undergraduate Course Project',
    description:
      'Implemented forward and inverse kinematics in MATLAB, validated workspace and joint dimensions, and analyzed mobility via screw theory with verification against the Kutzbach-Grübler formula.',
    technologies: ['SolidWorks', 'MATLAB Simulation', 'Robot Workspace Analysis'],
  },
  {
    title: 'Bionic Multi-Leg Worm Robot',
    category: 'Mechanical Design Innovation Competition',
    description:
      'Designed a biomimetic robot using servos and swing arms to mimic worm-like motion over complex terrain, integrated camera and IR sensors, and won a provincial second prize.',
    technologies: ['SolidWorks', 'Arduino'],
  },
  {
    title: 'Volunteer Service',
    category: 'Student Activities',
    description:
      'Actively participated in campus and social volunteer activities during undergraduate and graduate study, including event support, community service, and public-interest outreach.',
    technologies: [],
  },
];

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const videoPostersRef = useRef<Record<string, string>>({});
  const posterWarmupRef = useRef<Record<string, boolean>>({});
  const isTouchDeviceRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMedia, setActiveMedia] = useState<Record<number, number>>({});
  const [videoPosters, setVideoPosters] = useState<Record<string, string>>({});
  const isEnglish = language === 'en';
  const projectItems = isEnglish
    ? projects.map((project, index) => ({
        ...project,
        ...projectTranslationsEn[index],
      }))
    : projects;

  const captureVideoPoster = (video: HTMLVideoElement, src: string) => {
    if (videoPostersRef.current[src]) return;
    if (!video.videoWidth || !video.videoHeight) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const poster = canvas.toDataURL('image/jpeg', 0.82);
      setVideoPosters((prev) => (prev[src] ? prev : { ...prev, [src]: poster }));
    } catch {
      // Ignore poster extraction failures and keep gradient fallback.
    }
  };

  const warmupVideoPoster = async (video: HTMLVideoElement, src: string) => {
    if (!isTouchDeviceRef.current) return;
    if (videoPostersRef.current[src] || posterWarmupRef.current[src]) return;
    posterWarmupRef.current[src] = true;

    try {
      video.muted = true;
      video.playsInline = true;
      await video.play().catch(() => {});
      video.pause();

      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        await new Promise<void>((resolve) => {
          let finished = false;
          const done = () => {
            if (finished) return;
            finished = true;
            resolve();
          };
          const timer = window.setTimeout(done, 1500);
          video.addEventListener(
            'loadeddata',
            () => {
              window.clearTimeout(timer);
              done();
            },
            { once: true }
          );
        });
      }

      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.duration > 0 &&
        video.currentTime < 0.04
      ) {
        await new Promise<void>((resolve) => {
          let finished = false;
          const done = () => {
            if (finished) return;
            finished = true;
            resolve();
          };
          const timer = window.setTimeout(done, 900);
          video.addEventListener(
            'seeked',
            () => {
              window.clearTimeout(timer);
              done();
            },
            { once: true }
          );
          try {
            video.currentTime = Math.min(0.06, Math.max(video.duration - 0.01, 0));
          } catch {
            window.clearTimeout(timer);
            done();
          }
        });
      }

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        captureVideoPoster(video, src);
      }
    } finally {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Ignore browsers that block currentTime reset.
      }
    }
  };

  const handleVideoLoadedData = (
    event: SyntheticEvent<HTMLVideoElement>,
    src: string
  ) => {
    const video = event.currentTarget;
    captureVideoPoster(video, src);
    void warmupVideoPoster(video, src);
  };

  // Control video playback based on card hover state
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      if (hoveredIndex === Number(key)) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [hoveredIndex]);

  useEffect(() => {
    videoPostersRef.current = videoPosters;
  }, [videoPosters]);

  useEffect(() => {
    isTouchDeviceRef.current =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
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
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Project <span className="text-gradient">Experience</span>
              </>
            ) : (
              <>
                项目<span className="text-gradient">经历</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish
              ? 'Engineering projects, competitions, course designs, and graduation works'
              : '工程项目、竞赛、课程设计与毕业设计'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6">
          {projectItems.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Media area */}
              <div className="relative aspect-video overflow-hidden">
                {(() => {
                  // Combine all media items: videos first, then images
                  const mediaItems: { type: 'video' | 'image'; src: string }[] = [
                    ...(project.videos || []).map((v) => ({ type: 'video' as const, src: v })),
                    ...(project.images || []).map((img) => ({ type: 'image' as const, src: img })),
                  ];
                  const currentIndex = activeMedia[index] || 0;
                  const currentItem = mediaItems[currentIndex];
                  const hasMedia = mediaItems.length > 0 && currentItem &&
                    !currentItem.src.includes('project'); // skip placeholder strings like 'project2-1'

                  if (hasMedia && currentItem.type === 'video') {
                    const posterSrc = videoPosters[currentItem.src];
                    const shouldShowVideo = Boolean(posterSrc) || hoveredIndex === index;
                    return (
                      <>
                        {!posterSrc && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-25`}
                          />
                        )}
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                            if (el) {
                              void warmupVideoPoster(el, currentItem.src);
                            }
                          }}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            shouldShowVideo ? 'opacity-100' : 'opacity-0'
                          }`}
                          src={currentItem.src}
                          poster={posterSrc}
                          preload="auto"
                          muted
                          loop
                          playsInline
                          onLoadedMetadata={(event) => {
                            void warmupVideoPoster(event.currentTarget, currentItem.src);
                          }}
                          onLoadedData={(event) => handleVideoLoadedData(event, currentItem.src)}
                        />
                      </>
                    );
                  } else if (hasMedia && currentItem.type === 'image') {
                    return (
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={currentItem.src}
                        alt={project.title}
                        loading="lazy"
                      />
                    );
                  } else {
                    // Fallback: icon placeholder
                    return (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <project.icon
                              className={`w-16 h-16 mx-auto mb-2 bg-gradient-to-br ${project.color} bg-clip-text`}
                              style={{
                                color: 'transparent',
                                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                              }}
                            />
                            <p className="text-white/30 text-sm">{isEnglish ? 'Project Preview' : '项目图片'}</p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })()}

                {/* Media carousel dots (when multiple valid media) */}
                {(() => {
                  const mediaItems = [
                    ...(project.videos || []),
                    ...(project.images || []),
                  ].filter((src) => !src.includes('project'));
                  if (mediaItems.length <= 1) return null;
                  const currentIndex = activeMedia[index] || 0;
                  return (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {mediaItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMedia((prev) => ({ ...prev, [index]: i }));
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentIndex
                              ? 'bg-white w-4'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  );
                })()}



                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
              />
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
              { value: '10+', label: isEnglish ? 'Project Entries' : '项目经历' },
              { value: '3', label: isEnglish ? 'Thesis Projects' : '毕业设计' },
              { value: '2', label: isEnglish ? 'Competition Projects' : '竞赛项目' },
              { value: '5+', label: isEnglish ? 'Core Toolsets' : '技术栈' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
