import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TypewriterName({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));

      if (i === text.length) {
        clearInterval(interval);
      }
    }, 120); // speed control

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        fontSize: "clamp(20px, 5vw, 44px)",
        color: "#78350f",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "0 10px",
        minHeight: "1.5em",
        wordBreak: "break-word",
      }}
    >
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          background: "#78350f",
          marginLeft: "4px",
          animation: "blink 0.8s infinite",
        }}
      />
    </div>
  );
}
/* -------- Rotating Text -------- */
function RotatingText({ en, te }) {
  const [showTelugu, setShowTelugu] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setShowTelugu((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "1.4em" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showTelugu ? "te" : "en"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%" }}
        >
          {showTelugu ? te : en}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------- Main Component -------- */
export default function WeddingWebsite() {
  const weddingDate = new Date("2026-08-16T00:23:00+05:30");
  const [timeLeft, setTimeLeft] = useState({});

  const invitedName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("name")?.toUpperCase() || "DEAR GUEST";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        secs: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const stars = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 6 + Math.random() * 6,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);
  return (
    <>
      <div style={styles.page}>
        {stars.map((s, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: "#fff",

              boxShadow: `
        0 0 6px rgba(255,255,255,0.8),
        0 0 12px rgba(212,175,55,0.6),
        0 0 20px rgba(212,175,55,0.4)
      `,

              opacity: 0.7,
              pointerEvents: "none",
              zIndex: 1,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          />
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.card}>

          <div
            style={{
              marginBottom: "50px",
              padding: "30px 22px",
              borderRadius: "22px",
              border: "1px solid rgba(212,175,55,0.35)",
              background: "#fffef9",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ✨ soft glow background */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "220px",
                height: "140px",
                background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent)",
                filter: "blur(50px)",
              }}
            />

            {/* ✨ floating subtle shine */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "-60%",
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
                transform: "skewX(-20deg)",
              }}
              animate={{ left: ["-60%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Invite text (English + Telugu rotating) */}
            <div
              style={{
                fontSize: "15px",
                color: "#7a5c2e",
                letterSpacing: "1px",
                marginBottom: "14px",
                minHeight: "1.5em",
              }}
            >
              <RotatingText
                en="Together with our families, we warmly invite"
                te="మా కుటుంబ సభ్యులతో కలిసి, మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము"
              />
            </div>

            {/* Guest Name */}
            <motion.div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "18px 14px",
                margin: "24px auto",
                maxWidth: "100%",
                overflow: "hidden",
                isolation: "isolate", // 🔥 prevents blending with other layers
              }}
            >
              {/* Glow border layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "18px",
                  border: "1px solid rgba(212,175,55,0.35)",
                  boxShadow: "0 0 25px rgba(212,175,55,0.15)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                  backdropFilter: "blur(6px)",
                  zIndex: 0,
                }}
              />

              {/* Shine layer */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-80%",
                  width: "60%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
                  transform: "skewX(-20deg)",
                  zIndex: 1,
                }}
                animate={{ left: ["-80%", "120%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <TypewriterName text={invitedName} />
            </motion.div>

            {/* Telugu subline */}
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#9a7b4f",
                minHeight: "1.4em",
              }}
            >
              <RotatingText
                en="to grace the occasion with your presence"
                te="మా ఆనందకర వేడుకకు విచ్చేసి ఆశీర్వదించండి"
              />
            </div>

            {/* Divider */}
            <div
              style={{
                width: "70px",
                height: "2px",
                background: "#d4af37",
                margin: "18px auto 0",
              }}
            />
          </div>
          {/* ✨ BRIDE & GROOM PORTRAITS */}
          <motion.div
            style={{
              margin: "30px auto 25px", position: "relative",
              width: "100%",
              maxWidth: "760px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 10px 20px", boxSizing: "border-box",
              overflow: "visible",
            }}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            {/* ================================================= */}
            {/* SOFT GOLDEN GLOW */}
            {/* ================================================= */}

            <div
              style={{
                position: "absolute",
                width: "min(520px, 100vw)",
                height: "280px",
                left: "50%",
                top: "45%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)",
                filter: "blur(25px)",
                pointerEvents: "none",
              }}
            />

            {/* ================================================= */}
            {/* TOP DECORATION */}
            {/* ================================================= */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(6px, 2vw, 10px)",
                marginBottom: "clamp(16px, 4vw, 22px)",
                color: "#d4af37",
                width: "100%",
              }}
            >
              <span
                style={{
                  width: "clamp(30px, 12vw, 55px)",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #d4af37)",
                }}
              />

              <span
                style={{
                  fontSize: "clamp(11px, 3vw, 14px)",
                }}
              >
                ✦
              </span>

              <span
                style={{
                  width: "clamp(30px, 12vw, 55px)",
                  height: "1px",
                  background:
                    "linear-gradient(to left, transparent, #d4af37)",
                }}
              />
            </div>

            {/* ================================================= */}
            {/* COUPLE ROW */}
            {/* ================================================= */}

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "clamp(5px, 2vw, 22px)",
                position: "relative",
                zIndex: 2,
                padding: "0 2px",
                boxSizing: "border-box",
              }}
            >
              {/* ================================================= */}
              {/* GROOM */}
              {/* ================================================= */}

              <motion.div
                whileHover={{
                  y: -10,
                  rotate: -2,
                  scale: 1.025,
                }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  position: "relative",

                  /*
                   * Responsive width:
                   * Desktop  -> max 220px
                   * Mobile   -> around 28vw
                   */
                  width: "clamp(100px, 29vw, 220px)",

                  /*
                   * Prevent flex from making it smaller than intended.
                   */
                  flexShrink: 1,

                  /*
                   * Important for mobile.
                   */
                  minWidth: 0,

                  transform: "rotate(-4deg)",
                  boxSizing: "border-box",
                }}
              >
                {/* GOLD FRAME */}
                <div
                  style={{
                    padding: "clamp(4px, 1.5vw, 8px)",
                    borderRadius: "clamp(14px, 4vw, 23px)",
                    background:
                      "linear-gradient(135deg, #8f6508, #f5dc8b, #d4af37, #fff2b8, #a8780c)",
                    boxShadow:
                      "0 16px 35px rgba(91,70,54,0.20), 0 0 25px rgba(212,175,55,0.18)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      padding: "clamp(2px, 1vw, 5px)",
                      borderRadius: "clamp(10px, 3vw, 18px)",
                      background: "#fffdf7",
                      border: "1px solid rgba(180,134,20,0.45)",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="/groomphoto.jpg"
                      alt="Ganesh"
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        borderRadius: "clamp(7px, 2vw, 13px)",

                        /*
                         * Helps browser render image cleanly.
                         */
                        imageRendering: "auto",
                      }}
                    />
                  </div>
                </div>

                {/* CORNER TOP LEFT */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(-6px, -1.5vw, -8px)",
                    left: "clamp(-6px, -1.5vw, -8px)",
                    width: "clamp(18px, 6vw, 30px)",
                    height: "clamp(18px, 6vw, 30px)",
                    borderTop: "2px solid #d4af37",
                    borderLeft: "2px solid #d4af37",
                    borderRadius: "9px 0 0 0",
                    boxSizing: "border-box",
                  }}
                />

                {/* CORNER BOTTOM RIGHT */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(-6px, -1.5vw, -8px)",
                    right: "clamp(-6px, -1.5vw, -8px)",
                    width: "clamp(18px, 6vw, 30px)",
                    height: "clamp(18px, 6vw, 30px)",
                    borderBottom: "2px solid #d4af37",
                    borderRight: "2px solid #d4af37",
                    borderRadius: "0 0 9px 0",
                    boxSizing: "border-box",
                  }}
                />

                {/* NAME */}
                <div
                  style={{
                    marginTop: "clamp(8px, 2.5vw, 14px)",
                    textAlign: "center",
                    padding: "clamp(5px, 1.5vw, 7px) clamp(4px, 2vw, 8px)",
                    borderRadius: "clamp(9px, 3vw, 13px)",
                    background:
                      "linear-gradient(180deg, #fffdf7, #fff8e9)",
                    border: "1px solid rgba(212,175,55,0.28)",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'Playfair Display', Georgia, serif",

                      /*
                       * Responsive name.
                       */
                      fontSize: "clamp(12px, 4vw, 18px)",

                      /*
                       * Smaller letter spacing on phones.
                       */
                      letterSpacing: "clamp(1px, 0.7vw, 2.5px)",

                      color: "#7c2d12",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    GANESH
                  </div>

                  <div
                    style={{
                      marginTop: "clamp(2px, 1vw, 4px)",
                      fontSize: "clamp(9px, 2.8vw, 13px)",
                      color: "#a16207",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <RotatingText
                      en="THE GROOM"
                      te="పెళ్లికొడుకు"
                    />
                  </div>
                </div>
              </motion.div>

              {/* ================================================= */}
              {/* HEART — COMPLETELY BETWEEN PHOTOS */}
              {/* ================================================= */}

              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  flexShrink: 0,

                  /*
                   * Responsive heart.
                   */
                  width: "clamp(34px, 10vw, 58px)",
                  height: "clamp(34px, 10vw, 58px)",

                  borderRadius: "50%",
                  background:
                    "linear-gradient(145deg, #fffdf7, #fff1cf)",
                  border: "2px solid #d4af37",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  zIndex: 5,

                  boxShadow:
                    "0 7px 22px rgba(91,70,54,0.18), 0 0 22px rgba(212,175,55,0.25)",

                  boxSizing: "border-box",

                  /*
                   * Keep heart vertically aligned with
                   * the upper portion of photos.
                   */
                  marginTop: "clamp(45px, 12vw, 95px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(15px, 5vw, 26px)",
                    color: "#a33b12",
                    lineHeight: 1,
                  }}
                >
                  ♥
                </span>
              </motion.div>

              {/* ================================================= */}
              {/* BRIDE */}
              {/* ================================================= */}

              <motion.div
                whileHover={{
                  y: -10,
                  rotate: 2,
                  scale: 1.025,
                }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
                style={{
                  position: "relative",

                  /*
                   * Same responsive width as groom.
                   */
                  width: "clamp(100px, 29vw, 220px)",

                  flexShrink: 1,
                  minWidth: 0,

                  transform: "rotate(4deg)",
                  boxSizing: "border-box",
                }}
              >
                {/* GOLD FRAME */}
                <div
                  style={{
                    padding: "clamp(4px, 1.5vw, 8px)",
                    borderRadius: "clamp(14px, 4vw, 23px)",
                    background:
                      "linear-gradient(135deg, #8f6508, #f5dc8b, #d4af37, #fff2b8, #a8780c)",
                    boxShadow:
                      "0 16px 35px rgba(91,70,54,0.20), 0 0 25px rgba(212,175,55,0.18)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      padding: "clamp(2px, 1vw, 5px)",
                      borderRadius: "clamp(10px, 3vw, 18px)",
                      background: "#fffdf7",
                      border: "1px solid rgba(180,134,20,0.45)",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="/bridephoto.jpg"
                      alt="Maithili"
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        borderRadius: "clamp(7px, 2vw, 13px)",
                        imageRendering: "auto",
                      }}
                    />
                  </div>
                </div>

                {/* CORNER TOP RIGHT */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(-6px, -1.5vw, -8px)",
                    right: "clamp(-6px, -1.5vw, -8px)",
                    width: "clamp(18px, 6vw, 30px)",
                    height: "clamp(18px, 6vw, 30px)",
                    borderTop: "2px solid #d4af37",
                    borderRight: "2px solid #d4af37",
                    borderRadius: "0 9px 0 0",
                    boxSizing: "border-box",
                  }}
                />

                {/* CORNER BOTTOM LEFT */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(-6px, -1.5vw, -8px)",
                    left: "clamp(-6px, -1.5vw, -8px)",
                    width: "clamp(18px, 6vw, 30px)",
                    height: "clamp(18px, 6vw, 30px)",
                    borderBottom: "2px solid #d4af37",
                    borderLeft: "2px solid #d4af37",
                    borderRadius: "0 0 0 9px",
                    boxSizing: "border-box",
                  }}
                />

                {/* NAME */}
                <div
                  style={{
                    marginTop: "clamp(8px, 2.5vw, 14px)",
                    textAlign: "center",
                    padding: "clamp(5px, 1.5vw, 7px) clamp(4px, 2vw, 8px)",
                    borderRadius: "clamp(9px, 3vw, 13px)",
                    background:
                      "linear-gradient(180deg, #fffdf7, #fff8e9)",
                    border: "1px solid rgba(212,175,55,0.28)",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(12px, 4vw, 18px)",
                      letterSpacing: "clamp(1px, 0.7vw, 2.5px)",
                      color: "#7c2d12",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    MAITHILI
                  </div>

                  <div
                    style={{
                      marginTop: "clamp(2px, 1vw, 4px)",
                      fontSize: "clamp(9px, 2.8vw, 13px)",
                      color: "#a16207",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <RotatingText
                      en="THE BRIDE"
                      te="పెళ్లికూతురు"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ================================================= */}
            {/* BOTTOM DECORATION */}
            {/* ================================================= */}

            <div
              style={{
                marginTop: "clamp(20px, 6vw, 28px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(5px, 2vw, 8px)",
                color: "#d4af37",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(8px, 2.5vw, 10px)",
                }}
              >
                ✧
              </span>

              <span
                style={{
                  width: "clamp(25px, 9vw, 35px)",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #d4af37)",
                }}
              />

              <span
                style={{
                  fontSize: "clamp(9px, 3vw, 12px)",
                }}
              >
                ✦
              </span>

              <span
                style={{
                  width: "clamp(25px, 9vw, 35px)",
                  height: "1px",
                  background:
                    "linear-gradient(to left, transparent, #d4af37)",
                }}
              />

              <span
                style={{
                  fontSize: "clamp(8px, 2.5vw, 10px)",
                }}
              >
                ✧
              </span>
            </div>
          </motion.div>


          {/* Names Section */}
          <div style={styles.namesWrapper}>

            {/* Border Top */}
            <div style={styles.border} />

            <motion.img
              src="/ganesh.png"
              alt="center-img"
              style={styles.centerImage}
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Quote */}
            <div style={styles.quote}>
              Two souls, one sacred journey, united in love and destiny.
            </div>

            {/* LOVE BACKGROUND */}
            <div style={styles.loveBg}>♡</div>

            {/* Names */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={styles.name} >
                <RotatingText
                  en="BALA GANESHWARA SWAMI"
                  te="బాల గణేశ్వర స్వామి"
                />              </div>

              <div style={styles.weds}>
                <RotatingText en="weds" te="వివాహం" />
              </div>

              <div style={styles.name}>
                <RotatingText
                  en="LAKSHMI MAITHILI"
                  te="లక్ష్మి మైథిలి"
                />              </div>
            </div>

            {/* Border Bottom */}
            <div style={styles.border} />
          </div>
          <div style={styles.inviteLine}>
            <RotatingText
              en="cordially invites you to join the occasion of their joyous commitment on"
              te="మా ఆనందకర వివాహ వేడుకకు మిమ్మల్ని ఆహ్వానిస్తున్నాము"
            />
          </div>
          {/* Date Section */}
          <motion.div
            style={styles.dateWrap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Line */}
            <div style={styles.line} />

            {/* Day */}
            <div style={styles.day}>
              <RotatingText
                en="SUNDAY"
                te="ఆదివారం"
              />
            </div>

            {/* Main Date */}
            <div style={styles.mainDate}>
              <span style={styles.big}>16</span>

              <div style={styles.side}>
                <RotatingText
                  en="AUGUST"
                  te="ఆగస్టు"
                />

                <span style={styles.year}>
                  2026
                </span>
              </div>
            </div>

            {/* Time */}
            <div style={styles.time}>
              <RotatingText
                en="12:23 AM"
                te="రాత్రి 12:23"
              />
            </div>

            {/* Bottom Line */}
            <div style={styles.line} />
          </motion.div>

          {/* Countdown */}
          {/* Countdown */}
          <div style={styles.countdownWrap}>
            {["days", "hours", "minutes", "secs"].map((k) => (
              <motion.div
                key={k}
                style={styles.countdownBox}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div style={styles.countNumber}>
                  {String(timeLeft[k] || 0).padStart(2, "0")}
                </div>
                <div style={styles.countLabel}>{k.toUpperCase()}</div>
              </motion.div>
            ))}
          </div>



          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "60px",
            }}
          >
            {/* WEDDING */}
            <motion.div
              style={{
                position: "relative",
                padding: "32px 26px",
                borderRadius: "28px",
                background:
                  "linear-gradient(145deg, #fffdf8 0%, #fff8ed 100%)",
                border: "1px solid rgba(180, 83, 9, 0.18)",
                boxShadow:
                  "0 15px 40px rgba(91, 70, 54, 0.10), inset 0 0 30px rgba(212,175,55,0.05)",
                textAlign: "center",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Decorative corners */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  width: "35px",
                  height: "35px",
                  borderTop: "2px solid rgba(180,83,9,0.35)",
                  borderLeft: "2px solid rgba(180,83,9,0.35)",
                  borderRadius: "12px 0 0 0",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "35px",
                  height: "35px",
                  borderTop: "2px solid rgba(180,83,9,0.35)",
                  borderRight: "2px solid rgba(180,83,9,0.35)",
                  borderRadius: "0 12px 0 0",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  width: "35px",
                  height: "35px",
                  borderBottom: "2px solid rgba(180,83,9,0.35)",
                  borderLeft: "2px solid rgba(180,83,9,0.35)",
                  borderRadius: "0 0 0 12px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "35px",
                  height: "35px",
                  borderBottom: "2px solid rgba(180,83,9,0.35)",
                  borderRight: "2px solid rgba(180,83,9,0.35)",
                  borderRadius: "0 0 12px 0",
                }}
              />



              {/* Title */}
              <h3
                style={{
                  fontSize: "15px",
                  letterSpacing: "4px",
                  color: "#a16207",
                  margin: "0 0 18px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                <RotatingText
                  en="WEDDING CEREMONY"
                  te="కళ్యాణ వేడుక"
                />
              </h3>

              {/* Gold divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    width: "45px",
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, #d4af37)",
                  }}
                />

                <span
                  style={{
                    color: "#d4af37",
                    fontSize: "13px",
                  }}
                >
                  ✦
                </span>

                <span
                  style={{
                    width: "45px",
                    height: "1px",
                    background:
                      "linear-gradient(to left, transparent, #d4af37)",
                  }}
                />
              </div>

              {/* Date */}
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  color: "#5b4636",
                  margin: "0 0 7px",
                  letterSpacing: "0.5px",
                  fontFamily: "Georgia, serif",
                }}
              >
                <RotatingText
                  en="16 August 2026"
                  te="16-08-2026"
                />
              </p>

              {/* Day & Time */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#8b6f3d",
                  margin: "0 0 22px",
                  letterSpacing: "0.4px",
                }}
              >
                <RotatingText
                  en="Sunday · 7:00 PM onwards"
                  te="ఆదివారం · రాత్రి 7:00 గంటల నుండి"
                />
              </p>

              {/* Venue Card */}
              <div
                style={{
                  position: "relative",
                  padding: "20px 16px",
                  borderRadius: "20px",
                  background:
                    "rgba(255,247,237,0.85)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  boxShadow:
                    "0 5px 18px rgba(139,111,61,0.06)",
                }}
              >


                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#6b4f1d",
                    margin: "0 0 6px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <RotatingText
                    en="Kalyana Vedika"
                    te="కళ్యాణ వేదిక"
                  />
                </h4>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#8b6f3d",
                    margin: "0 0 5px",
                  }}
                >
                  <RotatingText
                    en="Wedding Ceremony"
                    te="వివాహ వేడుక"
                  />
                </p>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#9a7b4f",
                    margin: "0 0 16px",
                  }}
                >
                  <RotatingText
                    en="Dinner / Feast"
                    te="విందు"
                  />
                </p>

                {/* Location Button */}
                <a
                  href="https://maps.app.goo.gl/Dks2vHY5PLKayPuq9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    padding: "10px 18px",
                    borderRadius: "30px",
                    background:
                      "linear-gradient(135deg, #b45309, #d97706)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    textDecoration: "none",
                    letterSpacing: "0.8px",
                    boxShadow:
                      "0 5px 14px rgba(180,83,9,0.22)",
                    transition: "all 0.3s ease",
                  }}
                >
                  📍
                  <span>View Location</span>
                </a>
              </div>

              {/* Bottom blessing */}
              <p
                style={{
                  margin: "20px 0 0",
                  fontSize: "12px",
                  color: "#a0835c",
                  fontStyle: "italic",
                  letterSpacing: "0.5px",
                }}
              >
                <RotatingText
                  en="Your presence is our blessing"
                  te="మీ రాకే మా ఆశీర్వాదం"
                />
              </p>
            </motion.div>


          </div>

          <motion.div
            style={{
              marginTop: "90px",
              padding: "50px 30px",
              borderRadius: "26px",
              background: "#fffef9",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.05)",
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: "18px",
                letterSpacing: "4px",
                color: "#a16207",
                marginBottom: "30px",
              }}
            >
              <RotatingText
                en="With heartfelt invitation from"
                te="మనస్ఫూర్తిగా ఆహ్వానించువారు"
              />          </h3>

            {/* Divider */}
            <div
              style={{
                width: "70px",
                height: "2px",
                background: "#d4af37",
                margin: "0 auto 40px",
              }}
            />

            {/* GRID (main fix for tightness) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "40px",
                alignItems: "start",
              }}
            >
              {/* Groom Side */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#5b4636",
                    lineHeight: "1.6",
                  }}
                >
                  <RotatingText
                    en="Guthula Srinivas (Late)"
                    te="గుత్తుల శ్రీనివాస్ (లేట్)"
                  />
                </p>

                <p
                  style={{
                    fontSize: "20px",
                    color: "#7a5c2e",
                    marginTop: "6px",
                  }}
                >
                  <RotatingText
                    en="& Anantha Lakshmi"
                    te="& అనంత లక్ష్మి"
                  />
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#5a3e17",
                    letterSpacing: "1px",
                  }}
                >
                  <RotatingText
                    en="Groom’s Parents"
                    te="వరుడి తల్లిదండ్రులు"
                  />
                </p>
              </div>

              {/* Bride Side */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#5b4636",
                    lineHeight: "1.6",
                  }}
                >
                  <RotatingText
                    en="Gudaala Nageswara Rao (Late)"
                    te="గూడాల నాగేశ్వర రావు (లేట్)"
                  />
                </p>

                <p
                  style={{
                    fontSize: "20px",
                    color: "#7a5c2e",
                    marginTop: "6px",
                  }}
                >
                  <RotatingText
                    en="& Padmavathi"
                    te="& పద్మావతి"
                  />
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#5a3e17",
                    letterSpacing: "1px",
                  }}
                >
                  <RotatingText
                    en="Bride’s Parents"
                    te="వధువు తల్లిదండ్రులు"
                  />
                </p>
              </div>
            </div>

            {/* Brother (separate = better spacing) */}
            {/* Brother */}
            {/* <div style={{ marginTop: "45px" }}>
              <p
                style={{
                  fontSize: "15px",
                  color: "#7a5c2e",
                  letterSpacing: "1px",
                }}
              >
                <RotatingText
                  en="Along with"
                  te="వారితో పాటు"
                />
              </p>

              <p
                style={{
                  fontSize: "20px",
                  color: "#5b4636",
                  marginTop: "8px",
                  lineHeight: "1.6",
                }}
              >
                <RotatingText
                  en="Bhanu Prakash (Balu)"
                  te="భాను ప్రకాష్ (బాలు)"
                />
              </p>
            </div> */}
          </motion.div>


        </motion.div>

      </div>
      <motion.div
        style={{
          marginTop: "75px",
          padding: "30px 15px 35px",
          textAlign: "center",
          position: "relative",
          fontFamily: "'Cormorant Garamond', serif",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        {/* Top divider */}
        <div
          style={{
            width: "100%",
            maxWidth: "240px",
            height: "1px",
            margin: "0 auto 20px",
            background:
              "linear-gradient(to right, transparent, #d4af37, transparent)",
          }}
        />

        {/* Decorative symbol */}
        <div
          style={{
            color: "#d4af37",
            fontSize: "17px",
            marginBottom: "8px",
          }}
        >
          ✦
        </div>

        {/* Designed text */}
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#8b6f3d",
            letterSpacing: "1.5px",
          }}
        >
          Designed with love by
        </p>

        {/* Name */}
        <motion.a
          href="https://www.instagram.com/VINAY_ROXX/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          style={{
            display: "block",
            marginTop: "6px",
            fontFamily:
              "'Playfair Display', Georgia, serif",
            fontSize: "21px",
            fontWeight: 700,
            letterSpacing: "3px",
            textDecoration: "none",
            background:
              "linear-gradient(90deg, #8f6508, #d4af37, #a8780c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VINAY
        </motion.a>

        {/* Instagram ID directly below name */}
        <motion.a
          href="https://www.instagram.com/VINAY_ROXX/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
          }}
          style={{
            display: "block",
            marginTop: "5px",
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            color: "#c13584",
            letterSpacing: "1px",
            textDecoration: "none",
          }}
        >
          @VINAY_ROXX
        </motion.a>

        {/* Bottom divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "18px",
          }}
        >
          <span
            style={{
              width: "35px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, #d4af37)",
            }}
          />

          <span
            style={{
              color: "#d4af37",
              fontSize: "10px",
            }}
          >
            ✧
          </span>

          <span
            style={{
              width: "35px",
              height: "1px",
              background:
                "linear-gradient(to left, transparent, #d4af37)",
            }}
          />
        </div>

        {/* Heart */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            marginTop: "12px",
            fontSize: "15px",
            color: "#b45309",
          }}
        >
          ♥
        </motion.div>
      </motion.div>
    </>
  );
}

/* -------- Styles -------- */
const styles = {



  centerImage: {
    width: "clamp(120px, 25vw, 220px)", // responsive size
    height: "auto",
    animation: "glowPulse 2.5s ease-in-out infinite",
  },



  title: {
    fontSize: "20px",
    letterSpacing: "2px",
    color: "#b45309",
    marginBottom: "8px",
  },

  date: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#6b4f1d",
  },

  time: {
    fontSize: "15px",
    color: "#7a5c2e",
  },

  place: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#7a5c2e",
  },

  nextDay: {
    fontSize: "14px",
    padding: "6px 14px",
    borderRadius: "20px",
    background: "#fde68a",
    color: "#92400e",
    fontWeight: "600",
    zIndex: 1,
  },

  /* Shine animation overlay */
  shine: {
    position: "absolute",
    top: 0,
    left: "-75%",
    width: "50%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
    transform: "skewX(-20deg)",
    animation: "shineMove 4s infinite",
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fffaf5, #fde68a, #fff7ed)", display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(12px,4vw,24px)",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    padding: "clamp(20px,5vw,40px)",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  },

  inviteLine: {
    marginTop: "30px",
    marginBottom: "10px",
    fontSize: "clamp(14px,3.5vw,20px)",
    color: "#7a5c2e",
    textAlign: "center",
    maxWidth: "600px",
    marginInline: "auto",
    lineHeight: "1.6",
    fontStyle: "italic",
    minHeight: "2.5em",
  },
  invite: {
    fontSize: "clamp(16px,3.5vw,20px)",
    color: "#7a5c2e",
  },

  guest: {
    fontSize: "clamp(26px,6vw,40px)",
    color: "#a16207",
    marginBottom: "15px",
  },

  namesWrapper: {
    position: "relative",
    margin: "clamp(70px,14vw,110px) 0", // increased vertical breathing room
  },

  border: {
    width: "100%",
    height: "2px",
    background: "linear-gradient(to right, transparent, #d4af37, transparent)",
    margin: "15px 0",
  },

  quote: {
    fontSize: "clamp(14px,4vw,22px)",
    color: "#7c2d12",
    fontStyle: "italic",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "30px", // add spacing
    position: "relative",
    zIndex: 2,
  },

  loveBg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "clamp(120px, 25vw, 260px)",
    color: "rgba(212,175,55,0.08)",
    pointerEvents: "none",
    zIndex: 0,
  },

  name: {
    fontSize: "clamp(22px, 6vw, 52px)",
    color: "#7c2d12",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "600",
    letterSpacing: "1px",
    lineHeight: "1.2",
    wordBreak: "break-word",
  },

  weds: {
    fontSize: "clamp(18px,4vw,26px)",
    margin: "12px 0",
    color: "#b45309",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
  },

  dateWrap: {
    margin: "60px 0",
    textAlign: "center",
  },

  line: {
    height: "1px",
    width: "60%",
    margin: "12px auto",
    background: "linear-gradient(to right, transparent, #d4af37, transparent)",
  },

  day: {
    fontSize: "clamp(14px,3vw,18px)",
    letterSpacing: "3px",
    color: "#7a5c2e",
    minHeight: "1.4em",
  },

  mainDate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    margin: "10px 0",
  },

  big: {
    fontSize: "clamp(42px,10vw,72px)",
    color: "#b45309",
    fontWeight: "600",
    lineHeight: "1",
  },

  side: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "clamp(14px,3vw,18px)",
    color: "#6b4f1d",
    minHeight: "1.4em",
  },

  year: {
    fontSize: "clamp(12px,2.5vw,14px)",
    letterSpacing: "2px",
  },

  time: {
    fontSize: "clamp(16px,4vw,20px)",
    color: "#92400e",
    marginTop: "6px",
    letterSpacing: "1px",
    minHeight: "1.4em",
  },

  countdownWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(70px, 1fr))",
    gap: "12px",
    marginTop: "25px",
    padding: "0 10px",
  },

  countdownBox: {
    background: "rgba(255, 243, 205, 0.7)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: "18px",
    padding: "14px 10px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },

  countNumber: {
    fontSize: "clamp(22px, 5vw, 34px)",
    fontWeight: "700",
    color: "#b45309",
    lineHeight: "1.1",
  },

  countLabel: {
    marginTop: "6px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#7a5c2e",
  },

  box: {
    width: "clamp(70px,22vw,90px)",
    height: "clamp(70px,22vw,90px)",
    background: "#fff3cd",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  venue: {
    marginTop: "20px",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "20px",
    background: "#b45309",
    color: "#fff",
    textDecoration: "none",
  },

};