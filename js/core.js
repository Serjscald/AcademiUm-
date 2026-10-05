// ==========================================
// 🔊 ЗВУКОВАЯ СИСТЕМА
// ==========================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    try {
        if (type === 'success') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.15);
        } else if (type === 'error') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.2);
        }
    } catch(e) {}
}

// ==========================================
// 🎆 ФЕЙЕРВЕРКИ
// ==========================================
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let fireworks = [], particles = [], isAnimating = false, animationId;

function resizeCanvas() { 
    if (canvas) {
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    }
}
window.addEventListener('resize', resizeCanvas); 
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
        this.alpha = 1; this.decay = Math.random() * 0.015 + 0.005;
    }
    draw() {
        if (!ctx) return;
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    update() {
        this.velocity.y += 0.05; this.x += this.velocity.x; this.y += this.velocity.y;
        this.alpha -= this.decay; this.draw();
    }
}

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height / 2) + 50;
        this.speed = Math.random() * 3 + 4;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    }
    draw() { 
        if (!ctx) return;
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill(); 
    }
    update() {
        this.y -= this.speed; this.draw();
        if (this.y <= this.targetY) { this.explode(); return true; } return false;
    }
    explode() { for (let i = 0; i < 80; i++) particles.push(new Particle(this.x, this.y, this.color)); }
}

function animate() {
    if (!isAnimating || !ctx) return;
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.1) fireworks.push(new Firework());
    for (let i = fireworks.length - 1; i >= 0; i--) if (fireworks[i].update()) fireworks.splice(i, 1);
    for (let i = particles.length - 1; i >= 0; i--) { particles[i].update(); if (particles[i].alpha <= 0) particles.splice(i, 1); }
}

function startFireworks() {
    if (!canvas) return;
    canvas.style.display = 'block'; isAnimating = true; animate();
    playFireworkSound();
    setTimeout(stopFireworks, 5000);
}

function stopFireworks() {
    isAnimating = false; if (animationId) cancelAnimationFrame(animationId);
    if (canvas) {
        canvas.style.display = 'none'; ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    fireworks = []; particles = [];
}

function playFireworkSound() {
    if (!audioCtx) return;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.4);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.4);
            
            setTimeout(() => {
                const dur = 1.2; const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * dur, audioCtx.sampleRate);
                const d = buf.getChannelData(0);
                for(let j=0; j<d.length; j++) d[j] = (Math.random()*2-1) * Math.exp(-(j/audioCtx.sampleRate)*5);
                const src = audioCtx.createBufferSource(); src.buffer = buf;
                const flt = audioCtx.createBiquadFilter(); flt.type='lowpass';
                flt.frequency.setValueAtTime(4000, audioCtx.currentTime);
                flt.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + dur);
                const g = audioCtx.createGain(); g.gain.setValueAtTime(0.5, audioCtx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
                src.connect(flt); flt.connect(g); g.connect(audioCtx.destination); src.start();
            }, 400);
        }, i * 700);
    }
}

// ==========================================
// 🎮 ОБЩАЯ ЛОГИКА НАВИГАЦИИ
// ==========================================
function navigateTo(url) {
    playSound('success');
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

function handleTileClick(el, isSuccess, callback) {
    if (isSuccess) {
        el.classList.add('success');
        playSound('success');
        setTimeout(callback, 400);
    } else {
        el.classList.add('error');
        playSound('error');
        setTimeout(() => el.classList.remove('error'), 400);
    }
}
