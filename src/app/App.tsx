import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import eventosImg from "@/imports/Eventos.png";
import yiqichufaImg from "@/imports/____.png";
import timeAppImg from "@/imports/__.png";
import photoImg from "@/imports/524cf5c15bf4ba4173368f38c878599c.jpg";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#FAF9F7",
  text: "#171717",
  muted: "#5F5B59",
  accent: "#FFA3E0",
  border: "#E9E6E3",
  shadow: "0 8px 30px rgba(20,20,20,0.06)",
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
  const largeLabels = new Set(["关于我", "精选作品", "工作经历", "专业技能"]);

  return (
    <span style={{ color: C.text, letterSpacing: "0.14em", fontSize: largeLabels.has(text) ? 24 : 12, fontWeight: 700, fontFamily: "'Inter', sans-serif" }} className="uppercase editorial-label">
      {text}
    </span>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const contacts = [
    { label: "邮箱", value: "1269383427@qq.com", href: "mailto:1269383427@qq.com" },
    { label: "电话", value: "15872692052", href: "tel:15872692052" },
    { label: "微信", value: "thriving-67", href: "#" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(17, 17, 17, 0.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(92vw, 520px)",
          background: "rgba(255,255,255,0.92)",
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: "28px 24px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>联系我</div>
          <button onClick={onClose} style={{ background: C.text, border: "none", borderRadius: 999, cursor: "pointer", fontSize: 18, color: "#fff", width: 32, height: 32 }}>✕</button>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: "#fff",
                color: C.text,
                textDecoration: "none",
              }}
            >
              <span style={{ fontWeight: 700, color: C.text }}>{item.label}</span>
              <span style={{ fontWeight: 600 }}>{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onNav, onOpenContact }: { onNav: (id: string) => void; onOpenContact: () => void }) {
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
        background: "rgba(250,249,247,0.72)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        borderBottom: `1px solid rgba(233,230,227,0.75)`,
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-end">
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => onNav(l.href)}
              style={{ fontSize: 14, color: C.muted, fontFamily: "var(--font-ui)", background: "none", padding: 0, border: "none", cursor: "pointer" }}
              className="hover:text-[#171717] transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={onOpenContact}
            style={{ fontSize: 13, fontFamily: "var(--font-ui)", background: C.text, color: "#fff", padding: "9px 18px", borderRadius: 999, fontWeight: 600, border: "none", cursor: "pointer" }}
            className="hover:opacity-80 transition-opacity"
          >
            联系方式
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", background: C.bg, position: "relative", overflow: "hidden" }} className="flex items-center">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -50,
          left: -114,
          width: "clamp(220px, 31vw, 430px)",
          height: "auto",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <img
          src="/蝴蝶兰.png"
          alt=""
          style={{ width: "100%", height: "auto", display: "block", opacity: 0.92 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            background: "linear-gradient(90deg, rgba(250,249,247,0) 22%, rgba(250,249,247,0.2) 58%, rgba(250,249,247,0.46) 100%)",
            maskImage: "linear-gradient(90deg, transparent 22%, #000 68%, #000 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 22%, #000 68%, #000 100%)",
          }}
        />
      </div>
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 w-full pt-28 pb-20" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.8fr)] gap-14 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: "clamp(22px, 3vw, 32px)", color: C.text, fontWeight: 800, letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif", textTransform: "uppercase" }}>
                  翁佳欣
                </div>
                <div style={{ fontSize: 14, color: C.muted, fontWeight: 600, letterSpacing: "0.18em", fontFamily: "'Inter', sans-serif", textTransform: "uppercase" }}>
                  产品设计 · 用户体验 · AI 原型
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                fontFamily: "'Smiley Sans', 'HarmonyOS Sans SC', 'MiSans', 'Noto Sans SC', sans-serif",
                fontSize: "clamp(42px, 6.2vw, 82px)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                color: C.text,
                marginTop: 20,
                marginBottom: 16,
              }}
            >
              让复杂体验，<em style={{ color: C.accent, fontFamily: "inherit", fontWeight: 400, fontStyle: "normal", fontSize: "0.98em", letterSpacing: "-0.04em", WebkitTextStroke: "1px #FFFFFF", textShadow: "0 0 1px rgba(255,255,255,0.9)" }}>变得清晰。</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                fontSize: "clamp(18px, 2.1vw, 22px)",
                color: C.muted,
                lineHeight: 1.5,
                fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
                fontWeight: 300,
                marginBottom: 24,
                letterSpacing: "0.01em",
              }}
            >
              我擅长把复杂需求拆成清晰、顺手的界面与体验，长期关注用户思维、交互逻辑与视觉表达。
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-3">
              <a
                href="#works"
                style={{ background: C.accent, color: "#fff", padding: "13px 24px", borderRadius: 999, fontWeight: 600, fontSize: 15, fontFamily: "var(--font-ui)", display: "inline-block", textDecoration: "none" }}
                className="hover:opacity-80 transition-opacity"
              >
                查看作品集
              </a>
              <a
                href="/简历.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ background: "#fff", border: `1px solid ${C.accent}`, color: C.accent, padding: "13px 24px", borderRadius: 999, fontWeight: 500, fontSize: 15, fontFamily: "var(--font-ui)", display: "inline-block", textDecoration: "none" }}
                className="hover:bg-[#FFA3E0] hover:text-white transition-colors"
              >
                获取简历
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-8 mt-16 pt-5 border-t border-[#E9E6E3]">
              {[
                { n: "产品设计", l: "UI / UX 用户思维" },
                { n: "3", l: "完整项目案例" },
                { n: "Figma", l: "原型与协作" },
              ].map((s) => (
                <div key={s.l} style={{ minWidth: 120 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: s.l === "UI / UX 用户思维" ? C.accent : C.muted, marginTop: 6, fontFamily: "'Noto Sans SC', sans-serif" }}>{s.l}</div>
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
              <div
                style={{
                  width: 460,
                  height: 560,
                  borderRadius: 32,
                  overflow: "hidden",
                  boxShadow: "0 24px 60px rgba(20,20,20,0.12)",
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
                    background: C.accent,
                    borderRadius: 999,
                  padding: "14px 20px",
                  boxShadow: C.shadow,
                  border: `1px solid ${C.border}`,
                  zIndex: 2,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: "'Noto Sans SC', sans-serif" }}>中南大学 · 产品设计专业</div>
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
            以<span style={{ color: C.accent }}>用户思维</span>，做更清晰好用的界面体验。
          </h2>
          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, maxWidth: 620, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 56 }}>
            中南大学产品设计专业在读，曾在
            <strong style={{ color: C.text }}>海艺 AI、伊鸿健康</strong>
            接触产品实习与真实业务场景，持续打磨从用户研究到界面落地的完整思考路径。
            我更关注用户行为、信息层级与界面效率，让复杂需求变成清晰且可被轻松使用的体验。
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
  frameColor: string;
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
    accent: "#16A878",
    frameColor: "#DDF5EC",
    tier: 1,
  },
  {
    id: "eventos",
    title: "EventOS",
    subtitle: "AI Native To B Web",
    role: "产品负责人",
    tags: ["B2B SaaS", "权限体系", "AI 需求文档", "全流程交付"],
    summary: "端到端活动运营平台，涵盖多角色权限管理、实时应急响应与 AI 辅助 PRD 生成，从零到部署上线。",
    image: "eventos",
    accent: "#F28B45",
    frameColor: "#FDE1D0",
    tier: 2,
  },
  {
    id: "timeapp",
    title: "时域",
    subtitle: "个人时间资产管理工具",
    role: "产品设计师",
    tags: ["行为设计", "习惯养成", "个人效率"],
    summary: "将时间重新定义为个人资产而非日历资源，帮助用户提升对时间的感知力与管理意识。",
    image: "shiyu",
    accent: "#9D80D8",
    frameColor: "#E7DDF7",
    tier: 3,
  },
];

function getImg(id: string) {
  if (id === "eventos") return eventosImg;
  if (id === "yiqichufa") return yiqichufaImg;
  if (id === "shiyu") return "/时域.png";
  return timeAppImg;
}

// ─── Works section ────────────────────────────────────────────────────────────
function Works({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="works" style={{ background: "#fff", paddingTop: 140, paddingBottom: 140 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="精选作品" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 64, lineHeight: 1.2 }}>
            把思考，<span style={{ color: C.accent }}>做成作品。</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.05 + i * 0.08}>
              <button
                onClick={() => onOpenProject(p.id)}
                className="w-full h-full text-left group"
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{
        background: project.frameColor,
        borderRadius: 18,
        overflow: "hidden",
        border: `2px solid ${project.frameColor}`,
        boxShadow: `0 14px 28px ${project.frameColor}99`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "block",
        width: "100%",
        position: "relative",
      }}
      className="group-hover:scale-[1.025] group-hover:shadow-2xl transition-all"
    >
      <div style={{ position: "absolute", top: 7, right: 12, zIndex: 2, color: project.accent, fontSize: 22, lineHeight: 1, textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}>✦</div>
      <div style={{ padding: 10, paddingBottom: 0 }}>
        <div style={{ overflow: "hidden", height: 270, background: "#F5F3F0", borderRadius: "10px 10px 2px 2px", border: "1px solid rgba(23,23,23,0.08)" }}>
        <ImageWithFallback
          src={getImg(project.image)}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
        />
        </div>
      </div>
      <div style={{ padding: "22px 22px 24px", background: "#fff", margin: "10px", marginTop: 0, borderRadius: "2px 2px 10px 10px", minHeight: 210 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text, fontFamily: "'Noto Sans SC', 'Inter', sans-serif", letterSpacing: "-0.01em", marginBottom: 6, lineHeight: 1.5 }}>
          <span style={{ color: project.accent }}>{project.title}</span> · {project.subtitle}
        </div>
        <div className="flex flex-wrap gap-2" style={{ marginTop: 16, height: 48, alignContent: "flex-start", overflow: "hidden" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 11, color: project.accent, background: project.frameColor, borderRadius: 7, padding: "5px 10px", lineHeight: 1.2, fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 12, color: project.accent, fontSize: 13, fontWeight: 700 }}>
          <span>查看详情 →</span>
        </div>
      </div>
    </div>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const items = [
    {
      period: "2026.07 – 2026.09",
      company: "伊鸿健康",
      role: "产品实习生",
      points: [
        "需求挖掘管理：参与两款医疗软件迭代，对接业务需求，完成 15 + 项需求规划",
        "产品方案设计：重构业务操作链路，完善信息管理功能，输出产品文档",
        "跨职能推进上线：跟进产品全流程落地，协调团队问题，更新产品手册",
      ],
    },
    {
      period: "2026.01 – 2026.03",
      company: "海艺 AI",
      role: "产品实习生",
      points: [
        "用户分析与问题研判：梳理产品使用问题，分析用户路径，排定需求优先级，输出需求材料与业务流程图",
        "功能设计：完成 3 项功能从 0 到 1 设计，输出原型与产品文档，根据评审迭代方案",
        "跨职能协同与落地：对接各团队，跟进研发上线，基于反馈迭代优化",
      ],
    },
    {
      period: "2024.09 – 2025.06",
      company: "学生会办公室部",
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
            我的<span style={{ color: C.accent }}>成长轨迹。</span>
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
    { label: "设计工具", color: "#F06A8A", items: ["Figma", "Figma Make", "剪映", "Rhino", "Keyshot"] },
    { label: "用户体验", color: "#F58BB2", items: ["用户研究", "信息架构", "交互设计", "用户旅程地图", "原型设计"] },
    { label: "产品", color: "#E978B8", items: ["需求分析", "PRD 撰写", "产品规划", "业务流程设计", "产品架构"] },
    { label: "AI 工作流", color: "#B982D9", items: ["ChatGPT", "Google AI Studio", "Codex", "Prompt Engineering"] },
  ];

  return (
    <section id="skills" style={{ background: C.bg, paddingTop: 120, paddingBottom: 120 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionLabel text="专业技能" />
          <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em", color: C.text, marginTop: 12, marginBottom: 64 }}>
            我<span style={{ color: C.accent }}>掌握</span>了什么。
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "28px 28px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: g.color, letterSpacing: "0.1em", fontFamily: "'Noto Sans SC', 'Inter', sans-serif", marginBottom: 16 }}>
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
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", fontWeight: 600, fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>CONTACT</div>
            <h2 style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
              期待一起
              <br />
              做有意义的产品。
            </h2>
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="mailto:1269383427@qq.com"
                style={{ background: C.accent, color: "#fff", padding: "14px 20px", borderRadius: 999, fontWeight: 600, fontSize: 15, fontFamily: "var(--font-ui)", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", boxShadow: C.shadow }}
                className="hover:translate-y-[-2px] transition-transform"
              >
                <span style={{ fontSize: 14, fontWeight: 700 }}>邮箱</span>
                <span>1269383427@qq.com</span>
              </a>
              <a
                href="tel:15872692052"
                style={{ background: C.accent, color: "#fff", padding: "14px 20px", borderRadius: 999, fontWeight: 500, fontSize: 15, fontFamily: "var(--font-ui)", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", boxShadow: C.shadow }}
                className="hover:opacity-80 transition-opacity"
              >
                <span style={{ fontSize: 14, fontWeight: 700 }}>电话</span>
                <span>15872692052</span>
              </a>
              <div
                style={{ background: C.accent, color: "#fff", padding: "14px 20px", borderRadius: 999, fontWeight: 500, fontSize: 15, fontFamily: "var(--font-ui)", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: C.shadow }}
              >
                <span style={{ fontSize: 14, fontWeight: 700 }}>微信</span>
                <span>thriving-67</span>
              </div>
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
        background: C.accent,
        border: `1px solid ${C.accent}`,
        borderRadius: 10,
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 500,
        color: "#fff",
        fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
        cursor: "pointer",
        boxShadow: C.shadow,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      className="hover:opacity-80 transition-opacity"
    >
      ← 返回
    </button>
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

function ProjectQuickNav({ current, onOpenProject }: { current: string; onOpenProject: (id: string) => void }) {
  const items = [
    { id: "yiqichufa", label: "一起出发", accent: "#10B981" },
    { id: "eventos", label: "EventOS", accent: "#F97316" },
    { id: "timeapp", label: "时域", accent: "#8B5CF6" },
  ].filter((item) => item.id !== current);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onOpenProject(item.id)}
          style={{
            background: item.accent,
            border: `1px solid ${item.accent}`,
            borderRadius: 999,
            padding: "18px 26px",
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
            minWidth: 190,
            fontSize: 15,
            boxShadow: `0 20px 46px ${item.accent}40`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          查看 {item.label}
        </button>
      ))}
    </div>
  );
}

// ── EventOS Detail ────────────────────────────────────────────────────────────
function EventosDetail({ onBack, onOpenProject }: { onBack: () => void; onOpenProject: (id: string) => void }) {
  const eventosUrl = "https://eventos-zeta-khaki.vercel.app/";
  const [copied, setCopied] = useState(false);

  const copyEventosUrl = async () => {
    try {
      await navigator.clipboard.writeText(eventosUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <Reveal>
          <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: "30px 36px", border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(15,23,42,0.08)", marginBottom: 56 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: C.text, lineHeight: 1.1, marginBottom: 12 }}><span style={{ color: "#F97316" }}>EventOS</span> · AI Native To B Web</div>
              <div style={{ fontSize: 15, color: C.muted, maxWidth: 760, lineHeight: 1.8 }}>
                这是一个面向活动运营的智能协作平台，通过结构化权限与数据展示，让运营人员在复杂现场中保持对节点与风险的可控。
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, background: "#FFF4EC", borderRadius: 18, padding: "18px 20px", marginTop: 18, border: "1px solid #FAD7C1" }}>
              <a href={eventosUrl} target="_blank" rel="noreferrer" style={{ color: "#F97316", fontSize: 15, fontWeight: 700, textDecoration: "none", wordBreak: "break-all" }}>
                {eventosUrl}
              </a>
              <button onClick={copyEventosUrl} style={{ flexShrink: 0, background: "#F97316", border: "none", borderRadius: 999, color: "#fff", padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {copied ? "已复制" : "一键复制链接"}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src={eventosImg} alt="EventOS 平台界面总览" className="w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </Reveal>

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

        <ProjectQuickNav current="eventos" onOpenProject={onOpenProject} />
      </div>
    </div>
  );
}

// ── 一起出发 Detail ────────────────────────────────────────────────────────────
function YiqichufaDetail({ onBack, onOpenProject }: { onBack: () => void; onOpenProject: (id: string) => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <Reveal>
          <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: "30px 36px", border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(15,23,42,0.08)", marginBottom: 56 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: C.text, lineHeight: 1.1, marginBottom: 12 }}><span style={{ color: "#10B981" }}>一起出发</span> · 多人旅行协作决策平台</div>
              <div style={{ fontSize: 15, color: C.muted, maxWidth: 760, lineHeight: 1.8 }}>
                将群聊决策转化为结构化协作流程，让决策路径可视、角色分工明确，减少“我不知道大家想法”的旅行不确定性。
              </div>
            </div>
            <div style={{ background: "#10B98110", borderRadius: 18, padding: "22px 24px", marginTop: 18, border: "1px solid rgba(16,185,129,0.16)" }}>
              <div style={{ fontSize: 13, color: "#10B981", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>核心洞察</div>
              <div style={{ fontSize: 18, color: C.text, lineHeight: 1.8 }}>
                多人协作不是信息更多，而是决策更透明。真正的价值在于把“谁负责什么”与“谁看到什么”变成可追踪的体验节点。
              </div>
            </div>
          </div>
        </Reveal>

        {/* Main image */}
        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src={yiqichufaImg} alt="一起出发 — 多人旅行协作平台界面" className="w-full" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </Reveal>

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

        <ProjectQuickNav current="yiqichufa" onOpenProject={onOpenProject} />
      </div>
    </div>
  );
}

// ── 时域 Detail ────────────────────────────────────────────────────────────────
function TimeAppDetail({ onBack, onOpenProject }: { onBack: () => void; onOpenProject: (id: string) => void }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Noto Sans SC', 'Inter', sans-serif" }}>
      <BackButton onBack={onBack} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <Reveal>
          <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: "30px 36px", border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(15,23,42,0.08)", marginBottom: 56 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: C.text, lineHeight: 1.1, marginBottom: 12 }}><span style={{ color: "#8B5CF6" }}>时域</span> · 个人时间资产管理工具</div>
              <div style={{ fontSize: 15, color: C.muted, maxWidth: 760, lineHeight: 1.8 }}>
                这个项目把时间从“日历格子”转为“个人资产”，帮助用户看见自己的时间分配并形成更清晰的使用路径。
              </div>
            </div>
            <div style={{ background: "#8B5CF610", borderRadius: 18, padding: "22px 24px", marginTop: 18, border: "1px solid rgba(139,92,246,0.16)" }}>
              <div style={{ fontSize: 13, color: "#8B5CF6", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>核心洞察</div>
              <div style={{ fontSize: 18, color: C.text, lineHeight: 1.8 }}>
                真正高级的时间工具，不是任务列表，而是让用户看到“时间在哪里流走”，并把时间管理变成一种更自然的认知习惯。
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 16px 60px rgba(0,0,0,0.08)", marginBottom: 64 }}>
            <ImageWithFallback src="/时域.png" alt="时域 — 个人时间资产管理产品设计详情" className="w-full" style={{ objectFit: "contain", objectPosition: "top", display: "block" }} />
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

        <ProjectQuickNav current="timeapp" onOpenProject={onOpenProject} />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function MainPage({ onOpenProject, onOpenContact }: { onOpenProject: (id: string) => void; onOpenContact: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Noto Sans SC', 'Inter', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <Nav onNav={scrollTo} onOpenContact={onOpenContact} />
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
  const [contactOpen, setContactOpen] = useState(false);
  const mainScrollPosition = useRef(0);

  const openProject = (id: string) => {
    if (page === "main") {
      mainScrollPosition.current = window.scrollY;
    }
    setPage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goBack = () => {
    setPage("main");
    setTimeout(() => {
      window.scrollTo({ top: mainScrollPosition.current, behavior: "instant" });
    }, 100);
  };

  return (
    <>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <AnimatePresence mode="wait">
        {page === "main" && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <MainPage onOpenProject={openProject} onOpenContact={() => setContactOpen(true)} />
          </motion.div>
        )}
        {page === "eventos" && (
          <motion.div key="eventos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <EventosDetail onBack={goBack} onOpenProject={openProject} />
          </motion.div>
        )}
        {page === "yiqichufa" && (
          <motion.div key="yiqichufa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <YiqichufaDetail onBack={goBack} onOpenProject={openProject} />
          </motion.div>
        )}
        {page === "timeapp" && (
          <motion.div key="timeapp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TimeAppDetail onBack={goBack} onOpenProject={openProject} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
