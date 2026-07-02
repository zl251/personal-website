import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Lightbulb, ExternalLink, Github } from 'lucide-react';
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

interface Paper {
  title: string;
  authors: string;
  journal: string;
  year: string;
  abstract: string;
  link?: string;
  github?: string;
  type: 'paper';
}

interface Patent {
  title: string;
  inventors: string;
  number: string;
  date: string;
  abstract: string;
  link: string;
  type: 'patent';
}

type ResearchItem = Paper | Patent;

const papers: Paper[] = [
  // {
  //   title: 'UD-SfPNet: An Underwater Descattering Shape-from-Polarization Network for 3D Normal Reconstruction',
  //   authors: 'Puyun Wang, Kaimin Yu, Huayang He, Feng Huang, Xianyu Wu, Yating Chen',
  //   journal: 'Information Fusion (一区Top，IF=15.7，With Editor）',
  //   year: '2026',
  //   abstract:
  //     'UD-SfPNet jointly performs polarization-based descattering and surface normal estimation in a unified framework with color embedding and detail enhancement. It achieves state-of-the-art accuracy (15.12° mean error) on MuS-Polar3D dataset.',
  //   // link: 'https://example.com/paper1',
  //   github: 'https://github.com/WangPuyun/UD-SfPNet.git',
  //   type: 'paper',
  // },
  // {
  //   title: 'MuS-Polar3D: A Benchmark Dataset for Computational Polarimetric 3D Imaging under Multi-Scattering Conditions',
  //   authors: 'Puyun Wang, Kaimin Yu, Huayang He, Xianyu Wu',
  //   journal: 'IEEE Transactions on Image Processing (一区Top，IF=13.7，Under Review）',
  //   year: '2025',
  //   abstract:
  //     'MuS-Polar3D is a benchmark for polarization-based underwater 3D imaging, featuring 42 objects under controlled scattering and multi-view conditions with precise ground truth. It enables fair evaluation across tasks, achieving 15.49° best mean angular error.',
  //   link: 'https://arxiv.org/abs/2512.21513',
  //   github: 'https://github.com/WangPuyun/MuS-Polar3D.git',
  //   type: 'paper',
  // },
  // {
  //   title: 'A Structured Learning Framework for Underwater Polarization-Based 3D Reconstruction',
  //   authors: 'Puyun Wang, Kaimin Yu, Huayang He, Xianyu Wu',
  //   journal: 'International Conference on Machine Learning (CCF-A，投稿中）',
  //   year: '2025',
  //   abstract:
  //     'This paper propose an end-to-end framework that jointly performs underwater polarization descattering and SfP normal estimation by coupling restoration with geometry learning. On MuS-Polar3D, it achieves 15.12° mean angular error and robust performance under varying scattering.',
  //   // link: 'https://example.com/paper1',
  //   type: 'paper',
  // },
  // {
  //   title: 'Structure-Aware Consistency Priors for Shape from Polarization in Complex Media',
  //   authors: 'Kaimin Yu, Puyun Wang, Huayang He, Xianyu Wu',
  //   journal: 'International Conference on Machine Learning (CCF-A，投稿中）',
  //   year: '2025',
  //   abstract:
  //     'This paper propose IceSfP, a dual-branch network that integrates structure-aware polarization priors with raw features via cross-modal attention for surface normal estimation in ice. It achieves 16.01° MAE, outperforming existing methods.',
  //   // link: 'https://example.com/paper1',
  //   type: 'paper',
  // },
  // {
  //   title: 'Recent Advances in Polarization-Based 3D Imaging: From Physics Models to Neural Implicit Representations',
  //   authors: 'Kaimin Yu, Puyun Wang, Fei Dong, Xu Li, Xianyu Wu, FengHuang',
  //   journal: 'Computational Visual Media (二区，IF=7.5，Major Revision）',
  //   year: '2025',
  //   abstract:
  //     'This survey reviews polarization-based 3D imaging, focusing on data-driven and neural implicit representation methods alongside physics-based approaches. It summarizes datasets, metrics, challenges, and future directions including generalization, system design, and deployment.',
  //   // link: 'https://example.com/paper1',
  //   type: 'paper',
  // },
  {
    title: 'A cross-modality feature fusion framework for low-light image enhancement',
    authors: 'Puyun Wang, Xianyu Wu, Jiacai Lin, FengHuang',
    journal: 'Applied Optics and Photonics China 2025 (AOPC2025), 2025, Beijing, China',
    year: '2025',
    abstract:
      'We propose a fusion-driven framework that enhances low-light images by integrating RGB and LWIR modalities through feature decomposition and GAN-based fusion. The method improves brightness, contrast, and detail, outperforming existing approaches across SSIM, PSNR, and LPIPS.',
    link: 'https://doi.org/10.1117/12.3078191',
    type: 'paper',
  },
  // {
  //   title: '仿生视觉信息处理在机器人导航中的应用',
  //   authors: '王朴匀, 等',
  //   journal: '机器人',
  //   year: '2024',
  //   abstract:
  //     '受生物视觉系统启发，设计了一种仿生视觉信息处理框架，应用于机器人自主导航任务。该方法能够有效处理复杂环境下的视觉信息，提高导航精度。',
  //   link: 'https://example.com/paper2',
  //   type: 'paper',
  // },
];

const patents: Record<Language, Patent[]> = {
  zh: [
    {
      title: '一种应用于平稳爬楼的送餐小车',
      inventors: '朱兆聚,王朴匀,黄海涛,曹泰源,陈栋,苏晨烨',
      number: 'CN116923583A',
      date: '2023',
      abstract:
        '本发明公开一种平稳爬楼送餐小车，包括主车架、两侧麦克纳姆轮及由升降机构驱动的前后分节车体，可承载大重量餐盒，实现跨楼层稳定送餐。',
      link: 'https://pss-system.cponline.cnipa.gov.cn/documents/detail?prevPageTit=changgui',
      type: 'patent',
    },
  ],
  en: [
    {
      title: 'A Stair-Climbing Food Delivery Cart for Stable Transport',
      inventors: 'Zhaoju Zhu, Puyun Wang, Haitao Huang, Taiyuan Cao, Dong Chen, Chenye Su',
      number: 'CN116923583A',
      date: '2023',
      abstract:
        'This invention discloses a stable stair-climbing food delivery cart with a main chassis, dual mecanum wheels, and a segmented body driven by a lifting mechanism, enabling heavy-load meal-box transport across floors.',
      link: 'https://pss-system.cponline.cnipa.gov.cn/documents/detail?prevPageTit=changgui',
      type: 'patent',
    },
  ],
};

function isPaper(item: ResearchItem): item is Paper {
  return item.type === 'paper';
}

interface ResearchProps {
  language: Language;
}

export default function Research({ language }: ResearchProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'papers' | 'patents'>('papers');
  const isEnglish = language === 'en';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research-title',
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
        '.research-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.research-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentItems: ResearchItem[] = activeTab === 'papers' ? papers : patents[language];

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="research-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Research <span className="text-gradient">Outputs</span>
              </>
            ) : (
              <>
                科研<span className="text-gradient">成果</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish ? 'Published papers and filed patents' : '发表的学术论文与申请的专利'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'papers'
                ? 'bg-neon-green text-dark-bg shadow-glow'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            {isEnglish ? 'Papers' : '学术论文'}
          </button>
          <button
            onClick={() => setActiveTab('patents')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'patents'
                ? 'bg-neon-purple text-white shadow-glow-purple'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            {isEnglish ? 'Patents' : '专利'}
          </button>
        </div>

        {/* Content Grid */}
        <div className="research-grid grid gap-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="research-card group glass rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-neon-cyan text-sm">
                      {isPaper(item) ? item.journal : item.number}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.year : item.date}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.authors : item.inventors}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {item.abstract}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {isPaper(item) && item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:border-neon-green/50 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">{isEnglish ? 'Code' : '代码'}</span>
                    </a>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">{isEnglish ? 'View' : '查看'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">{papers.length}</p>
            <p className="text-white/50 text-sm mt-1">{isEnglish ? 'Papers' : '学术论文'}</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">{patents[language].length}</p>
            <p className="text-white/50 text-sm mt-1">{isEnglish ? 'Patents' : '专利'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
