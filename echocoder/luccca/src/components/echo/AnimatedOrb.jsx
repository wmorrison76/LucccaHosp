function AnimatedOrb({ status = "connecting", onClick, visible = true }) {
  const ring =
    status === "online" ? "orb--ok" :
    status === "local"  ? "orb--local" :
    status === "connecting" ? "orb--wait" : "orb--down";

  return (
    <button
      aria-label="Ask Echo"
      onClick={onClick}
      className={`echo-orb ${ring}`}
      style={{
        position: "absolute",
        top: 12, right: 14,
        transform: visible ? "none" : "translateY(-6px)",
        opacity: visible ? 1 : 0.25,
        transition: "opacity .25s ease, transform .25s ease",
        pointerEvents: "auto",
      }}
    />
  );
}
