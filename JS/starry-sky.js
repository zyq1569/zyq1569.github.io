// starry-sky.js
const canvas = document.createElement("canvas");
canvas.id = "starryCanvas";
document.body.prepend(canvas); // 放到页面最前面
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 星星
const stars = [];
for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02
    });
}

// 流星
const meteors = [];
for (let i = 0; i < 5; i++) {
    meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        len: Math.random() * 100 + 50,
        speed: Math.random() * 10 + 4,
        angle: Math.PI / 4
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制星星
    stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // 绘制流星
    meteors.forEach(m => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len * Math.cos(m.angle), m.y - m.len * Math.sin(m.angle));
        ctx.stroke();

        m.x += m.speed;
        m.y += m.speed * Math.tan(m.angle);
        if (m.x > canvas.width || m.y > canvas.height) {
            m.x = Math.random() * canvas.width / 2;
            m.y = Math.random() * canvas.height / 2;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();