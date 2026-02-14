import React, { useEffect, useRef } from "react";

export const HeartBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const hearts: Heart[] = [];

    class Heart {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 100;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#ffccd5"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -50) {
          this.y = canvas!.height + 50;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        // top left curve
        ctx.bezierCurveTo(
          this.x,
          this.y,
          this.x - this.size / 2,
          this.y,
          this.x - this.size / 2,
          this.y + topCurveHeight
        );
        // bottom left curve
        ctx.bezierCurveTo(
          this.x - this.size / 2,
          this.y + (this.size + topCurveHeight) / 2,
          this.x,
          this.y + (this.size + topCurveHeight) / 2,
          this.x,
          this.y + this.size
        );
        // bottom right curve
        ctx.bezierCurveTo(
          this.x,
          this.y + (this.size + topCurveHeight) / 2,
          this.x + this.size / 2,
          this.y + (this.size + topCurveHeight) / 2,
          this.x + this.size / 2,
          this.y + topCurveHeight
        );
        // top right curve
        ctx.bezierCurveTo(
          this.x + this.size / 2,
          this.y,
          this.x,
          this.y,
          this.x,
          this.y + topCurveHeight
        );
        ctx.fill();
        ctx.closePath();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hearts.length = 0;
      for (let i = 0; i < 30; i++) {
        hearts.push(new Heart());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none bg-rose-50"
    />
  );
};
