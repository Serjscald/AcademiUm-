// ==========================================
// CORE.JS - Базовое ядро АкадемиУм v5.0.0
// Аудио, анимации, навигация и утилиты
// ==========================================

var audioCtx = null;
var isAudioInit = false;

function initAudio() {
    if (!isAudioInit) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            isAudioInit = true;
        } catch(e) { console.log('Web Audio API not supported'); }
    }
}

function playSound(type) {
    if (!audioCtx || !isAudioInit) return;
    
    var osc = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, audioCtx.currentTime + 0.1); // C6
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    }
}

function navigateTo(url) {
    window.location.href = url;
}

function handleTileClick(el, hasSubpage, callback) {
    el.classList.add('success');
    playSound('success');
    setTimeout(function() {
        if (callback) callback();
        else if (hasSubpage) { /* заглушка для курсов без подстраниц */ }
    }, 400);
}

// --- Fireworks Animation ---
var fireworksCanvas = document.getElementById('fireworks-canvas');
var fwCtx = fireworksCanvas ? fireworksCanvas.getContext('2d') : null;
var particles = [];
var animationId = null;

function resizeFireworks() {
    if (fireworksCanvas) {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
}

if (fireworksCanvas) {
    window.addEventListener('resize', resizeFireworks);
    resizeFireworks();
}

function createParticle(x, y, color) {
    var count = 30;
    for (var i = 0; i < count; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 4 + 2;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            color: color,
            size: Math.random() * 3 + 1
        });
    }
}

function updateFireworks() {
    if (!fwCtx) return;
    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life -= 0.02;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            fwCtx.globalAlpha = p.life;
            fwCtx.fillStyle = p.color;
            fwCtx.beginPath();
            fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            fwCtx.fill();
        }
    }
    
    if (particles.length > 0) {
        animationId = requestAnimationFrame(updateFireworks);
    } else {
        cancelAnimationFrame(animationId);
        fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
}

function startFireworks() {
    if (!fireworksCanvas) return;
    var colors = ['#fbbf24', '#38bdf8', '#4ade80', '#f472b6', '#c084fc'];
    var centerX = fireworksCanvas.width / 2;
    var centerY = fireworksCanvas.height / 2;
    
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            var x = centerX + (Math.random() - 0.5) * 300;
            var y = centerY + (Math.random() - 0.5) * 200;
            var color = colors[Math.floor(Math.random() * colors.length)];
            createParticle(x, y, color);
            if (particles.length <= 30) updateFireworks();
        }, i * 200);
    }
}
