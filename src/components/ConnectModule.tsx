import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  CheckCircle2,
  Send,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import gsap from "gsap";

const Particles = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speedMultiplier = active ? 5 : 1;

      particles.forEach((p, i) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 192, 192, ${p.alpha})`;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 192, 192, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};

export function ConnectModule() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [copied, setCopied] = useState(false);

  const [emailClicks, setEmailClicks] = useState(0);
  const [showEmailEasterEgg, setShowEmailEasterEgg] = useState(false);
  const [wembyEasterEgg, setWembyEasterEgg] = useState(false);

  const copyBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-save drafts
  useEffect(() => {
    const savedDraft = localStorage.getItem("connect_draft");
    if (savedDraft) {
      try {
        const { name, email, message } = JSON.parse(savedDraft);
        if (name || email || message) {
          setName(name || "");
          setEmail(email || "");
          setMessage(message || "");
          setDraftRestored(true);
          setTimeout(() => setDraftRestored(false), 4000);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "connect_draft",
        JSON.stringify({ name, email, message }),
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }, [name, email, message]);

  const handleTagClick = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);

    // Check for WEMBY easter egg
    if (message.toUpperCase().includes("WEMBY")) {
      setWembyEasterEgg(true);
    } else {
      setWembyEasterEgg(false);
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.removeItem("connect_draft");
      setName("");
      setEmail("");
      setMessage("");
      setSendCopy(false);
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("braverocky@proton.me");
    setCopied(true);
    if (navigator.vibrate) navigator.vibrate(8);

    if (copyBtnRef.current) {
      gsap.fromTo(
        copyBtnRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      );
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailIconClick = () => {
    setEmailClicks((prev) => prev + 1);
    if (emailClicks + 1 >= 3) {
      setShowEmailEasterEgg(true);
      setTimeout(() => {
        setShowEmailEasterEgg(false);
        setEmailClicks(0);
      }, 5000);
    }
  };

  return (
    <div id="Connect" className="col-span-12 h-full flex flex-col relative">
      <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 md:p-16 relative overflow-hidden flex-1 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--accent-pink)_0%,_transparent_40%),_radial-gradient(ellipse_at_bottom_left,_var(--accent-cyan)_0%,_transparent_40%)] opacity-10 pointer-events-none" />
        <Particles active={isSubmitting || isSuccess} />

        {/* Top Hero Section */}
        <div className="relative z-10 mb-16 text-center mx-auto max-w-3xl">
          <h2 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-none">
            Open a Signal.
          </h2>
          <p className="text-[#AAA] text-lg md:text-xl font-medium mb-8">
            Open to frontend, design engineering, AI interface, and creative web
            collaborations.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono tracking-widest uppercase text-white font-bold shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
            SYSTEM ONLINE / ALWAYS LISTENING
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 relative z-10 max-w-5xl mx-auto">
          {/* Left Side: Message Area (58%) */}
          <div className="flex-1 md:w-[60%]">
            <AnimatePresence>
              {draftRestored && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 text-[10px] font-mono font-bold uppercase tracking-wider text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/20 px-3 py-2 rounded-lg inline-block shadow-[0_0_15px_rgba(0,255,65,0.1)]"
                >
                  Draft restored from local cache.
                </motion.div>
              )}
            </AnimatePresence>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#666]">
                      Alias
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[var(--accent-pink)] transition-colors placeholder:text-[#555] text-white focus:bg-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#666]">
                      Return Signal
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="braverocky@proton.me"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[var(--accent-pink)] transition-colors placeholder:text-[#555] text-white focus:bg-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#666]">
                    Transmission Payload
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[var(--accent-pink)] transition-colors placeholder:text-[#555] text-white focus:bg-[#1a1a1a] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#333]">
                  <p className="text-[10px] text-[#666] font-mono font-bold uppercase tracking-wider">
                    SECURE CHANNEL / NO TRACKING
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email || !message}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black font-space font-bold text-lg rounded-xl hover:bg-[var(--accent-pink)] hover:text-white transition-all outline-none focus:ring-4 focus:ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting...</span>
                    ) : (
                      "Send Signal"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/60 rounded-3xl border border-[var(--lab-border)]"
              >
                <div className="w-16 h-16 bg-[var(--color-rainbow-green)]/10 text-[var(--color-rainbow-green)] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--lab-text)]">
                  Message received!
                </h3>
                <p className="text-[var(--lab-text-soft)] text-sm mb-6">
                  Looking forward to hearing back from you~
                </p>
                {wembyEasterEgg && (
                  <div className="mb-6 px-4 py-2 bg-[var(--color-rainbow-purple)]/10 border border-[var(--color-rainbow-purple)]/30 rounded-lg text-[var(--color-rainbow-purple)] text-sm">
                    Received! Bonus Reward: Your Wemby MVP prediction has been
                    recorded 👽
                  </div>
                )}
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-4 py-2 bg-white/70 hover:bg-white rounded-lg text-sm transition-colors text-[var(--lab-text)] border border-[var(--lab-border)]"
                  >
                    Send another message
                  </button>
                  <p className="text-xs text-[var(--lab-text-muted)] mt-4">
                    Meanwhile, feel free to{" "}
                    <a
                      href="#Watering"
                      className="text-[var(--color-rainbow-green)] underline"
                    >
                      water my tree 🌱
                    </a>{" "}
                    or check out my{" "}
                    <a
                      href="#GameMedia"
                      className="text-[var(--color-rainbow-cyan)] underline"
                    >
                      Spotify playlist
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Side: Contact Details (42%) */}
          <div className="md:w-[40%] flex flex-col gap-8 border-t md:border-t-0 md:border-l border-[#333] pt-8 md:pt-0 md:pl-10">
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#666] mb-4">
                Direct Communication
              </h4>
              <div className="bg-[#111] border border-[#333] rounded-2xl p-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-pointer relative border border-[#333] hover:border-[var(--accent-pink)] transition-colors"
                    onClick={handleEmailIconClick}
                  >
                    <Mail size={18} className="text-white" />
                    <AnimatePresence>
                      {showEmailEasterEgg && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-full mb-2 right-0 w-48 bg-[#0a0a0a] text-white border border-[#333] text-xs p-4 rounded-xl shadow-2xl z-50 pointer-events-none"
                        >
                          ProtonMail: Security First.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">
                      braverocky@proton.me
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-mono text-[#666] mt-1">
                      Secure Channel
                    </p>
                  </div>
                </div>

                <button
                  ref={copyBtnRef}
                  onClick={handleCopyEmail}
                  className={`w-full py-3 rounded-xl border text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
                    copied
                      ? "bg-[#00ff41] text-black border-transparent shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                      : "bg-[#1a1a1a] hover:bg-[#222] text-white border-[#333]"
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} /> Sequence Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Address
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#666] mb-4">
                Known Coordinates
              </h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: Twitter,
                    label: "Twitter/X",
                    url: "https://twitter.com",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://linkedin.com",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/RockyBabcock",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#666] hover:text-white hover:border-[var(--accent-pink)] hover:bg-[#1a1a1a] hover:shadow-[0_0_15px_rgba(255,20,147,0.2)] transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
