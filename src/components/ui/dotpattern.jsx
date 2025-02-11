import "../ui/DotPatternDemo.css";

export function DotPattern({ className }) {
    return (
      <div
        className={`absolute inset-0 bg-dot-pattern ${className}`}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    );
  }
  