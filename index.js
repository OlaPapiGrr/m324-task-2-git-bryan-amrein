
const canvas = document.getElementById('linesCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const numLines = 30;

class SquigglyLine {
    constructor() {
        this.points = [];
        this.length = Math.floor(Math.random() * 5 + 5);
        this.speed = Math.random() * 2 + 0.5;

        // Generate initial points for the squiggly line
        for (let i = 0; i <= this.length; i++) {
            this.points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
    }

    update() {
        this.points.forEach((point, index) => {
            point.y += Math.sin(Date.now() * 0.002 + index * 0.5) * this.speed;
            point.x += Math.cos(Date.now() * 0.002 + index * 0.5) * this.speed;

            // Reset position if it goes out of bounds
            if (point.x > canvas.width) point.x = 0;
            if (point.x < 0) point.x = canvas.width;
            if (point.y > canvas.height) point.y = 0;
            if (point.y < 0) point.y = canvas.height;
        });
    }

    draw() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        this.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    }
}

function init() {
    for (let i = 0; i < numLines; i++) {
        lines.push(new SquigglyLine());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
        line.update();
        line.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();
