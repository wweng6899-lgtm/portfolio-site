import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import eventosImg from "@/imports/Eventos.png";
import yiqichufaImg from "@/imports/____.png";
import timeAppImg from "@/imports/__.png";
import photoImg from "@/imports/524cf5c15bf4ba4173368f38c878599c.jpg";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#F7F6F2",
  text: "#111111",
  muted: "#6B7280",
  accent: "#6366F1",
  border: "rgba(0,0,0,0.08)",
  shadow: "0 8px 30px rgba(0,0,0,0.06)",
};

// ─── Fade-up reveal ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span style={{ color: C.accent, letterSpacing: "0.12em", fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif" }} className="uppercase">
      {text}
    </span>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onNav }: { onNav: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "作品", href: "works" },
    { label: "关于我", href: "about" },
    { label: "经历", href: "experience" },
    { label: "联系我", href: "contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        background: scrolled ? "rgba(247,246,242,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <button
          onClick={() => onNav("hero")}
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: "-0.02em", background: "none", border: "none", cursor: "pointer" }}
          className="hover:opacity-60 transition-opacity"
        >
          翁佳欣
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => onNav(l.href)}
              style={{ fontSize: 14, color: C.muted, fontFamily: "'Inter', 'Noto Sans SC', sans-serif", background: "none", border: "none", cursor: "pointer" }}
              className="hover:text-[#111111] transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href="tel:15872692052"
            style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", background: C.accent, color: "#fff", padding: "7px 18px", borderRadius: 8, fontWeight: 500, textDecoration: "none" }}
            className="hover:opacity-80 transition-opacity"
          >
            联系我
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", background: C.bg }} className="flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <SectionLabel text="产品设计师 · UI/UX 设计师" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: C.text,
                marginTop: 20,
                marginBottom: 16,
              }}
            >
              翁佳欣
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                fontSize: "clamp(18px, 2.5vw, 26px)",
                color: C.muted,
                lineHeight: 1.5,
                fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
                fontWeight: 300,
                marginBottom: 24,
                letterSpacing: "0.01em",
              }}
            >
              将复杂化为清晰
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              style={{
                fontSize: 16,
                color: C.muted,
                lineHeight: 1.85,
                fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
                maxWidth: 420,
                marginBottom: 40,
              }}
            >
              产品思维驱动的设计师，擅长系统拆解、信息架构与 AI 原生工作流。
              正在寻找产品经理 / UI-UX 设计实习机会。
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-3">
              <a
                href="#works"
                style={{ background: C.text, color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", display: "inline-block", textDecoration: "none" }}
                className="hover:opacity-80 transition-opacity"
              >
                查看作品集
              </a>
              <a
                href="mailto:1269383427@qq.com"
                style={{ border: `1.5px solid ${C.border}`, color: C.text, padding: "12px 28px", borderRadius: 10, fontWeight: 500, fontSize: 15, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", display: "inline-block", textDecoration: "none" }}
                className="hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
              >
                下载简历
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-8 mt-12">
              {[
                { n: "3", l: "个完整项目" },
                { n: "2+", l: "年设计经验" },
                { n: "AI", l: "原生工作流" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4, fontFamily: "'Noto Sans SC', sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div style={{ position: "relative" }}>
              {/* Background blob */}
              <div
                style={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: "60% 40% 50% 60% / 50% 60% 40% 50%",
                  background: `${C.accent}0D`,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  width: 380,
                  height: 460,
                  borderRadius: 32,
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.14)",
                  border: `1px solid ${C.border}`,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <ImageWithFallback
                  src={photoImg}
                  alt="翁佳欣个人照片"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Floating tag */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                style={{
                  position: "absolute",
                  bottom: -16,
                  right: -24,
                  background: "#fff",
                  borderRadius: 14,
                  padding: "14px 20px",
                  boxShadow: C.shadow,
                  border: `1px solid ${C.border}`,
                  zIndex: 2,
                }}
              >
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "'Noto Sans SC', sans-serif" }}>中南大学 · 产品设计专业</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: "'Noto Sans SC', sans-serif", marginTop: 2 }}>
                  求职中 · PM / UX 实习
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const cards = [
    { icon: "◈", title: "问题拆解", desc: "习惯不断追问‘为什么’，将模糊的产品问题拆解为可执行的结构化任务，清晰先于设计。" },
    { icon: "⟁", title: "信息架构", desc: "擅长梳理复杂系统的层级结构，从权限体系到数据流向，让信息流转更清晰高效。" },
    { icon: "◉", title: "AI 原型验证", desc: "借助 ChatGPT、Google AI Studio 与 Codex，快速从想法到可验证的原型，小时级交付。" },
  ];

  return (
    <section id="about" style={{ background: C.bg, paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="关于我" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 16, lineHeight: 1.2 }}>
            像产品经理一样思考
            <br />
            的设计师。
          </h2>
          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, maxWidth: 560, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 56 }}>
            中南大学产品设计专业在读，曾在
            <strong style={{ color: C.text }}>海艺 AI</strong>
            担任产品实习生，主导从需求分析到产品交付的完整流程。
            善于将复杂系统转化为清晰的用户体验，具备扎实的产品思维与跨职能协作能力。
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 28px", boxShadow: C.shadow, transition: "all 0.3s ease" }}
                className="hover:shadow-lg hover:border-[#6366F1]/30 hover:-translate-y-1 transition-all"
              >
                <div style={{ fontSize: 28, color: C.accent, marginBottom: 20, lineHeight: 1 }}>{c.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 10, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{c.title}</div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{c.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects data ────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  tags: string[];
  summary: string;
  image: string;
  accent: string;
  tier: 1 | 2 | 3;
}

const PROJECTS: Project[] = [
  {
    id: "yiqichufa",
    title: "一起出发",
    subtitle: "多人旅行协作决策平台",
    role: "产品负责人 / UX 设计师",
    tags: ["多人协作", "决策流程", "信息架构", "用户旅程"],
    summary: "多人出行的核心问题不是信息缺失，而是决策不可见。将混乱的群聊决策转化为结构化的协作流程。",
    image: "yiqichufa",
    accent: "#10B981",
    tier: 1,
  },
  {
    id: "eventos",
    title: "EventOS",
    subtitle: "AI 原生 To B Web · 智能活动运营管理平台",
    role: "产品负责人",
    tags: ["B2B SaaS", "权限体系", "AI 需求文档", "全流程交付"],
    summary: "端到端活动运营平台，涵盖多角色权限管理、实时应急响应与 AI 辅助 PRD 生成，从零到部署上线。",
    image: "eventos",
    accent: "#F97316",
    tier: 2,
  },
  {
    id: "timeapp",
    title: "时间 APP",
    subtitle: "个人时间资产管理工具",
    role: "产品设计师",
    tags: ["行为设计", "习惯养成", "个人效率"],
    summary: "将时间重新定义为个人资产而非日历资源，帮助用户提升对时间的感知力与管理意识。",
    image: "timeapp",
    accent: "#8B5CF6",
    tier: 3,
  },
];

function getImg(id: string) {
  if (id === "eventos") return eventosImg;
  if (id === "yiqichufa") return yiqichufaImg;
  return timeAppImg;
}

// ─── Works section ────────────────────────────────────────────────────────────
function Works({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="works" style={{ background: "#fff", paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="精选作品" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 60 }}>
            值得被看见的作品。
          </h2>
        </Reveal>

        {/* Tier 1 */}
        <Reveal delay={0.05}>
          <button
            onClick={() => onOpenProject(PROJECTS[0].id)}
            className="w-full text-left group"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ProjectCard project={PROJECTS[0]} large />
          </button>
        </Reveal>

        {/* Tier 2 + 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {PROJECTS.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.08}>
              <button
                onClick={() => onOpenProject(p.id)}
                className="w-full text-left group"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <ProjectCard project={p} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div
      style={{ background: C.bg, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: C.shadow, transition: "all 0.4s ease", display: "block", width: "100%" }}
      className="group-hover:-translate-y-2 group-hover:shadow-2xl transition-all"
    >
      <div style={{ overflow: "hidden", height: large ? 400 : 260 }}>
        <ImageWithFallback
          src={getImg(project.image)}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>
      <div style={{ padding: large ? "32px 32px" : "24px 24px" }}>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, color: project.accent, background: `${project.accent}14`, borderRadius: 6, padding: "3px 10px", letterSpacing: "0.04em", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: large ? 26 : 20, fontWeight: 700, color: C.text, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", letterSpacing: "-0.01em", marginBottom: 6 }}>
          {project.title}
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, fontFamily: "'Noto Sans SC', sans-serif" }}>{project.subtitle}</div>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 16 }}>{project.summary}</p>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, color: C.muted, fontFamily: "'Noto Sans SC', sans-serif" }}>担任角色 — {project.role}</span>
          <span style={{ fontSize: 13, color: project.accent, fontWeight: 600, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }} className="group-hover:gap-2 transition-all">
            查看详情 →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const items = [
    {
      period: "2026.01 – 2026.03",
      company: "海艺 AI",
      role: "产品实习生",
      points: [
        "负责 Web 端 AI App 功能开发与迭代，主导功能分析与版本规划",
        "交互优化迭代：优化 Web 端粒子分享弹窗及多个页面的交互反馈与信息层级",
        "界面设计迭代：独立完成角色免审功能，输出高保真原型及完整设计说明文档",
        "设计协作：提前共享设计文档并持续跟进上线，协助处理设计与开发对接问题",
        "全程参与跨职能协作，覆盖需求分析、原型设计、评审迭代至产品交付全流程",
      ],
    },
    {
      period: "2024.09 – 2025.06",
      company: "学生会合作发展部",
      role: "部长",
      points: [
        "统筹团队与资源管理，提升团队协作效率与项目目标完成率",
        "推进对外合作与资源拓展，建立多方学生组织合作机制，约束任务分工",
        "主导多次活动筹备，协调人员分工、任务推进与进度跟踪，保障活动有序落地",
        "跨部门协调沟通，及时推动问题解决并推进议题落实",
      ],
    },
  ];

  return (
    <section id="experience" style={{ background: "#fff", paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="工作经历" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 64 }}>
            我的成长轨迹。
          </h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: C.border }} className="hidden md:block" />
          <div className="flex flex-col gap-16">
            {items.map((item, i) => (
              <Reveal key={item.company} delay={i * 0.1}>
                <div className="md:pl-12 relative">
                  <div style={{ position: "absolute", left: -5, top: 8, width: 10, height: 10, borderRadius: "50%", background: C.accent }} className="hidden md:block" />
                  <div style={{ fontSize: 12, color: C.muted, fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em", marginBottom: 6 }}>{item.period}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 4 }}>{item.company}</div>
                  <div style={{ fontSize: 14, color: C.accent, fontWeight: 600, fontFamily: "'Noto Sans SC', sans-serif", marginBottom: 20 }}>{item.role}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {item.points.map((pt) => (
                      <li key={pt} style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, paddingLeft: 16, marginBottom: 8, position: "relative", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
                        <span style={{ position: "absolute", left: 0, color: C.accent }}>·</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const groups = [
    { label: "产品", color: "#6366F1", items: ["需求分析", "PRD 撰写", "产品规划", "业务流程设计", "产品架构"] },
    { label: "用户体验", color: "#10B981", items: ["用户研究", "信息架构", "交互设计", "用户旅程地图", "原型设计"] },
    { label: "设计工具", color: "#F59E0B", items: ["Figma", "Photoshop", "Illustrator"] },
    { label: "AI 工作流", color: "#8B5CF6", items: ["ChatGPT", "Google AI Studio", "Codex", "Prompt Engineering", "AI 辅助 PRD"] },
  ];

  return (
    <section id="skills" style={{ background: C.bg, paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="专业技能" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 64 }}>
            我能带来什么。
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "28px 28px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: g.color, letterSpacing: "0.1em", fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 16 }}>
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((skill) => (
                    <span key={skill} style={{ fontSize: 13, fontWeight: 500, color: C.text, background: `${g.color}0D`, border: `1px solid ${g.color}25`, borderRadius: 8, padding: "6px 14px", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: C.text, paddingTop: 120, paddingBottom: 80 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", fontWeight: 600, fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>联系我</div>
            <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
              期待一起
              <br />
              做有意义的产品。
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 48 }}>
              始终对产品、系统与有价值的用户体验保持好奇。
              欢迎产品经理 / UX 设计师实习机会咨询。
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="mailto:1269383427@qq.com"
                style={{ background: C.accent, color: "#fff", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", display: "inline-block", textDecoration: "none" }}
                className="hover:opacity-80 transition-opacity"
              >
                1269383427@qq.com
              </a>
              <a
                href="tel:15872692052"
                style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "13px 28px", borderRadius: 10, fontWeight: 500, fontSize: 15, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", display: "inline-block", textDecoration: "none" }}
                className="hover:border-white hover:text-white transition-all"
              >
                15872692052
              </a>
              <a
                href="#"
                style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "13px 28px", borderRadius: 10, fontWeight: 500, fontSize: 15, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", display: "inline-block", textDecoration: "none" }}
                className="hover:border-white hover:text-white transition-all"
              >
                微信：thriving-67
              </a>
            </div>
          </div>
        </Reveal>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>翁佳欣 · 作品集 2026</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontFamily: "'Noto Sans SC', sans-serif" }}>中南大学 · 产品设计专业</div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Detail Pages ─────────────────────────────────────────────────────
function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      style={{
        position: "fixed",
        top: 20,
        left: 24,
        zIndex: 100,
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 500,
        color: C.text,
        fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
        cursor: "pointer",
        boxShadow: C.shadow,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      className="hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
    >
      ← 返回
    </button>
  );
}

function OverviewCard({ label, val }: { label: string; val: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px 20px", border: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.08em", fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{val}</div>
    </div>
  );
}

function InfoBlock({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div>
      <SectionLabel text={label} />
      <h4 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "10px 0 12px", fontFamily: "'Noto Sans SC', 'Inter', sans-serif", lineHeight: 1.3 }}>{title}</h4>
      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{desc}</p>
    </div>
  );
}

function StepCard({ num, title, desc, accent }: { num: string; title: string; desc: string; accent: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", border: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 11, color: accent, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>{num}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{title}</div>
      <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>{desc}</div>
    </div>
  );
}

// ── EventOS Detail ────────────────────────────────────────────────────────────
function EventosDetail({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      {/* Hero banner */}
      <div style={{ background: C.text, paddingTop: 80, paddingBottom: 64 }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>TIER 2 · B2B SaaS</div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16 }}>EventOS</h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 0 }}>AI 原生 To B Web · 智能活动运营管理平台</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        {/* Overview */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <OverviewCard label="担任角色" val="产品负责人" />
            <OverviewCard label="产品形态" val="Web B2B SaaS" />
            <OverviewCard label="技术栈" val="AI Studio · Vercel" />
            <OverviewCard label="交付状态" val="完整上线交付" />
          </div>
        </Reveal>

        {/* Main image */}
        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src={eventosImg} alt="EventOS 平台界面总览" className="w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </Reveal>

        {/* Problem + Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Reveal>
            <InfoBlock
              label="问题背景"
              title="复杂工作流，缺乏统一数据源"
              desc="活动运营涉及数十个角色——主办方、供应商、场馆人员、参会者——每个角色权限不同，视角不同，紧迫程度不同。现有工具依赖 Excel 和微信群组，在活动直播阶段产生大量隐性风险。"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <InfoBlock
              label="核心洞察"
              title="实时响应依赖结构化权限体系"
              desc="关键差异化能力不在于功能数量，而在于权限架构的精准设计——对的人，在对的时间，看到对的信息。其余一切都是界面层面的问题。"
            />
          </Reveal>
        </div>

        {/* Steps */}
        <Reveal>
          <SectionLabel text="设计过程" />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: "12px 0 32px", letterSpacing: "-0.01em" }}>如何一步步完成这个产品</h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { num: "01", title: "需求分析与用户角色梳理", desc: "拆解 5 类不同角色的核心诉求，映射到系统功能与边界条件，识别冲突点与优先级。" },
            { num: "02", title: "AI 辅助 PRD 生成", desc: "借助 Google AI Studio 加速需求文档撰写，通过结构化 Prompt 输出系统化 PRD，效率提升数倍。" },
            { num: "03", title: "全流程部署交付", desc: "从架构设计到产品上线，完整主导产品研发闭环，最终部署于 GitHub + Vercel 并完成验收。" },
          ].map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <StepCard {...s} accent="#F97316" />
            </Reveal>
          ))}
        </div>

        {/* Reflection */}
        <Reveal>
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 40px", border: `1px solid ${C.border}` }}>
            <SectionLabel text="项目复盘" />
            <h3 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "12px 0 16px" }}>这个项目让我学到了什么</h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>
              EventOS 是我第一次以产品负责人视角完整主导一个 B2B 产品的设计与交付。
              权限体系的设计让我深刻理解：产品架构决策往往比界面设计影响更深远。
              AI 辅助工作流的引入也让我意识到，工具的价值不在于替代思考，而在于加速从想法到验证的路径。
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── 一起出发 Detail ────────────────────────────────────────────────────────────
function YiqichufaDetail({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      <div style={{ background: "#064E3B", paddingTop: 80, paddingBottom: 64 }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>TIER 1 · 主打项目</div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 16 }}>一起出发</h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 0 }}>多人旅行协作决策平台</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        {/* Overview */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <OverviewCard label="担任角色" val="产品负责人 / UX 设计师" />
            <OverviewCard label="产品形态" val="移动端 App" />
            <OverviewCard label="核心方法" val="用户研究 + 原型验证" />
            <OverviewCard label="聚焦场景" val="多人协作决策" />
          </div>
        </Reveal>

        {/* Core insight highlight */}
        <Reveal>
          <div style={{ background: "#10B98110", border: "1px solid #10B98130", borderRadius: 16, padding: "28px 36px", marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: "#10B981", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>核心洞察</div>
            <p style={{ fontSize: 22, fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
              "多人出行的核心问题不是信息缺失，<br />而是决策不可见。"
            </p>
          </div>
        </Reveal>

        {/* Main image */}
        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src={yiqichufaImg} alt="一起出发 — 多人旅行协作平台界面" className="w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </Reveal>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Reveal>
            <InfoBlock
              label="问题定义"
              title="群聊是产品层面的失败模式"
              desc="每次多人出行都从微信群开始：偏好被刷屏淹没，否决无从追溯，行程活在截图里。这不是沟通问题——是决策架构缺失的问题。用户的核心痛点是：我不知道大家到底想去哪，也不知道谁在负责什么。"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <InfoBlock
              label="解决思路"
              title="结构化协作，而非另一个聊天工具"
              desc="将混乱的群聊输入转化为有序的决策流程：偏好收集 → 投票聚合 → 行程生成 → 实时同步。让每一个决策都可见、可追溯、可协商。从「我不知道大家想法」到「所有人对行程达成一致」。"
            />
          </Reveal>
        </div>

        {/* Process steps */}
        <Reveal>
          <SectionLabel text="设计过程" />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: "12px 0 32px", letterSpacing: "-0.01em" }}>从用户研究到产品交付</h3>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { num: "01", title: "用户研究与需求挖掘", desc: "访谈多位有过多人出行经历的用户，发现核心矛盾：每个人都有想法，但没有人愿意做「强制决策者」。" },
            { num: "02", title: "信息架构与用户旅程", desc: "梳理从「发起旅行」到「最终确认行程」的完整协作路径，识别 7 个关键决策节点，逐一设计对应交互。" },
            { num: "03", title: "原型设计与验证迭代", desc: "输出中高保真原型，经过 3 轮用户测试验证核心流程，持续打磨投票聚合与行程展示两个核心模块。" },
          ].map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <StepCard {...s} accent="#10B981" />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 40px", border: `1px solid ${C.border}` }}>
            <SectionLabel text="项目复盘" />
            <h3 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "12px 0 16px" }}>把「不可见的决策」变成可见的协作</h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>
              这个项目让我第一次真正意识到：产品设计的核心不是「界面好不好看」，而是「流程是否合理」。
              多人协作场景下，信息架构的合理性直接决定了用户能否顺畅完成任务。
              整个过程中，我学会了如何在需求模糊、用户目标分散的情况下，提炼出可落地的产品主线。
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── 时间APP Detail ─────────────────────────────────────────────────────────────
function TimeAppDetail({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      <div style={{ background: "#2E1065", paddingTop: 80, paddingBottom: 64 }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>TIER 3 · 个人项目</div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 16 }}>时间 APP</h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 0 }}>个人时间资产管理工具</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <OverviewCard label="担任角色" val="产品设计师" />
            <OverviewCard label="产品形态" val="移动端 App" />
            <OverviewCard label="核心方向" val="行为设计 · 习惯养成" />
            <OverviewCard label="视觉风格" val="暗色高级感 UI" />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ background: "#8B5CF610", border: "1px solid #8B5CF630", borderRadius: 16, padding: "28px 36px", marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: "#8B5CF6", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>产品理念</div>
            <p style={{ fontSize: 22, fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
              "时间不是日历上的格子，<br />而是你最有限的个人资产。"
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src={timeAppImg} alt="时间 APP — 个人时间资产管理界面" className="w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { num: "01", title: "时间即资产", desc: "重新定义用户与时间的关系——不是安排日程，而是审视自己在哪些事情上「投资」了时间，回报是什么。" },
            { num: "02", title: "行为设计驱动", desc: "基于习惯养成研究，每个功能都在引导用户提升时间分配的意识，而非单纯完成任务打卡。" },
            { num: "03", title: "暗色视觉系统", desc: "高级感暗色 UI，面向每日高频使用场景设计，降低视觉疲劳的同时保留完整的信息层级。" },
          ].map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <StepCard {...s} accent="#8B5CF6" />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 40px", border: `1px solid ${C.border}` }}>
            <SectionLabel text="项目复盘" />
            <h3 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "12px 0 16px" }}>重新定义「时间管理」的底层逻辑</h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>
              这个项目让我思考：大多数时间管理工具都在解决「执行」问题，却忽视了「认知」问题——
              用户根本不知道自己的时间去哪了。
              通过将时间可视化为「资产」，我尝试改变用户的心智模型，
              让「时间感知」成为习惯的起点，而非任务完成后的附属功能。
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function MainPage({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <Nav onNav={scrollTo} />
      <Hero />
      <About />
      <Works onOpenProject={onOpenProject} />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}

// ─── App Router ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"main" | string>("main");

  const openProject = (id: string) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goBack = () => {
    setPage("main");
    window.scrollTo({ top: 0, behavior: "instant" });
    // scroll to works after a brief delay
    setTimeout(() => {
      const el = document.getElementById("works");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <AnimatePresence mode="wait">
      {page === "main" && (
        <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <MainPage onOpenProject={openProject} />
        </motion.div>
      )}
      {page === "eventos" && (
        <motion.div key="eventos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <EventosDetail onBack={goBack} />
        </motion.div>
      )}
      {page === "yiqichufa" && (
        <motion.div key="yiqichufa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <YiqichufaDetail onBack={goBack} />
        </motion.div>
      )}
      {page === "timeapp" && (
        <motion.div key="timeapp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <TimeAppDetail onBack={goBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
