// ==========================================
// CORE.JS - Базовое ядро АкадемиУм v5.0.0
// Аудио, анимации, навигация и утилиты
// ==========================================

var audioCtx = null;
var isAudioInit = false;

// В Safari/iOS Web Audio иногда возвращается в suspended/interrupted
// после блокировки экрана или переключения вкладки.
function initAudio() {
    try {
        if (!audioCtx) {
            var AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return null;
            audioCtx = new AudioContextClass();
            isAudioInit = true;
        }

        if (audioCtx.state === 'suspended' || audioCtx.state === 'interrupted') {
            var resumePromise = audioCtx.resume();
            if (resumePromise && typeof resumePromise.then === 'function') {
                resumePromise.then(function() { statisticsWarmupAudio(); }).catch(function(e) {
                    console.warn('Аудио ещё заблокировано браузером:', e);
                });
            }
            return resumePromise;
        }
        statisticsWarmupAudio();
        return null;
    } catch (e) {
        console.warn('Не удалось активировать звук:', e);
        return null;
    }
}

// Дополнительное пробуждение графа Web Audio для Safari.
// Односэмпловый беззвучный буфер не создаёт слышимого щелчка,
// но помогает браузеру инициализировать аудиовыход после жеста.
function statisticsWarmupAudio() {
    var ctx = audioCtx;
    if (!ctx || ctx.state !== 'running' || ctx.statisticsOutputPrimed) return;
    try {
        var buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
        var node = ctx.createBufferSource();
        var gain = ctx.createGain();
        gain.gain.value = 0;
        node.buffer = buffer;
        node.connect(gain);
        gain.connect(ctx.destination);
        node.start(0);
        node.onended = function() {
            try { node.disconnect(); gain.disconnect(); } catch (e) {}
        };
        ctx.statisticsOutputPrimed = true;
    } catch (e) {
        console.warn('Подготовка аудиовыхода не удалась:', e);
    }
}

// Не вмешивается в жест пользователя, лишь разблокирует аудиоконтекст.
['pointerdown', 'touchend', 'keydown', 'click'].forEach(function(eventName) {
    document.addEventListener(eventName, initAudio, {capture: true, passive: true});
});

function emitTone(ctx, type) {
    if (!ctx || ctx.state !== 'running') return;

    var osc = ctx.createOscillator();
    var gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    var t = ctx.currentTime;
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.1); // C6
        gainNode.gain.setValueAtTime(0.3, t);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(100, t + 0.2);
        gainNode.gain.setValueAtTime(0.2, t);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
    }
    osc.onended = function() {
        try { osc.disconnect(); gainNode.disconnect(); } catch(e) {}
    };
}

function playSound(type) {
    if (type !== 'success' && type !== 'error') return;

    var resumePromise = initAudio();
    var ctx = audioCtx;
    if (!ctx) return;

    if (ctx.state === 'running') {
        emitTone(ctx, type);
    } else if (resumePromise && typeof resumePromise.then === 'function') {
        resumePromise.then(function() {
            if (ctx.state === 'running') emitTone(ctx, type);
        }).catch(function() {
            // Браузер разрешит звук после следующего жеста пользователя.
        });
    }
}


// Независимая кнопка проверки звука, только на странице практики.
// Её клик — непосредственное действие пользователя, необходимое Safari.
function statisticsMountAudioTest() {
    if (document.getElementById('statistics-audio-test')) return;
    var button = document.createElement('button');
    button.id = 'statistics-audio-test';
    button.type = 'button';
    button.textContent = '🔊';
    button.setAttribute('aria-label', 'Включить и проверить звук задач');
    button.style.cssText = 'position:fixed;right:12px;top:12px;z-index:150;' +
        'border:1px solid #64748b;background:#263952;color:#fff;' +
        'border-radius:12px;padding:8px;min-height:44px;min-width:44px;' +
        'font:600 14px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;' +
        'box-shadow:0 3px 16px #0009;cursor:pointer;' ;
    var notice = document.createElement('div');
    notice.id = 'statistics-audio-status';
    notice.setAttribute('role','status');
    notice.setAttribute('aria-live','polite');
    notice.style.cssText = 'position:fixed;right:12px;top:65px;z-index:151;' +
        'max-width:min(275px,calc(100vw - 24px));background:#172a3e;color:#fff;' +
        'border:1px solid #64748b;border-radius:10px;padding:10px 12px;' +
        'font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;' +
        'box-shadow:0 3px 14px #0008;display:none;';
    var noticeTimer = null;
    function showNotice(msg) {
        notice.textContent = msg;
        notice.style.display = 'block';
        if (noticeTimer !== null) window.clearTimeout(noticeTimer);
        noticeTimer = window.setTimeout(function() { notice.style.display='none'; }, 6500);
    }
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var promise = initAudio();
        function test() {
            if (audioCtx && audioCtx.state === 'running') {
                statisticsWarmupAudio();
                playSound('success');
                showNotice('Пробный сигнал отправлен. Если его не слышно, проверь громкость Mac и настройки Safari для этого сайта.');
            } else {
                showNotice('Safari пока не разрешил звук. Нажми кнопку ещё раз.');
            }
        }
        if (promise && typeof promise.then === 'function') {
            promise.then(test).catch(function() {
                showNotice('Safari заблокировал звук. Проверь разрешения сайта и нажми снова.');
            });
        } else {
            test();
        }
    });
    document.body.appendChild(button);
    document.body.appendChild(notice);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', statisticsMountAudioTest, {once:true});
} else {
    statisticsMountAudioTest();
}

// --- Fireworks Sound (Web Audio, no external files) ---
// A soft ascending whistle, followed by several pops with short sparkles.
// Playback must be unlocked by an actual user gesture in Safari/iOS.
var lastFireworksSoundAt = -100000;

function playFireworksSound() {
    var resumePromise = initAudio();
    var ctx = audioCtx;
    if (!ctx) return;

    function scheduleFireworksSound() {
        if (!ctx || ctx.state !== 'running') return;
        // Ignore accidental repeated triggers in the same celebration.
        if (ctx.currentTime - lastFireworksSoundAt < 1.5) return;
        lastFireworksSoundAt = ctx.currentTime;
        var t = ctx.currentTime + 0.02;

        function chirp(at, duration, fromHz, toHz, volume) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(fromHz, at);
            osc.frequency.exponentialRampToValueAtTime(toHz, at + duration);
            gain.gain.setValueAtTime(0.0001, at);
            gain.gain.linearRampToValueAtTime(volume, at + Math.min(0.04, duration / 3));
            gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(at);
            osc.stop(at + duration);
            osc.onended = function() {
                try { osc.disconnect(); gain.disconnect(); } catch(e) {}
            };
        }

        function noiseBurst(at, duration, frequency, volume) {
            var length = Math.max(1, Math.floor(ctx.sampleRate * duration));
            var buffer = ctx.createBuffer(1, length, ctx.sampleRate);
            var data = buffer.getChannelData(0);
            for (var j = 0; j < length; j++) {
                data[j] = (Math.random() * 2 - 1) * (1 - j / length);
            }

            var source = ctx.createBufferSource();
            var filter = ctx.createBiquadFilter();
            var gain = ctx.createGain();
            source.buffer = buffer;
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(frequency, at);
            filter.frequency.exponentialRampToValueAtTime(Math.max(220, frequency / 2), at + duration);
            gain.gain.setValueAtTime(0.0001, at);
            gain.gain.linearRampToValueAtTime(volume, at + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            source.start(at);
            source.stop(at + duration);
            source.onended = function() {
                try { source.disconnect(); filter.disconnect(); gain.disconnect(); } catch(e) {}
            };
        }

        // Ascending launch whistle.
        chirp(t, 0.44, 410, 1280, 0.07);
        // Firework explosions, offset to match the visual bursts.
        [0.36, 0.57, 0.79, 1.02, 1.23].forEach(function(offset, index) {
            noiseBurst(t + offset, 0.20, 1000 + index * 160, 0.075);
            chirp(t + offset + 0.05, 0.18, 1450 + index * 160, 710, 0.018);
        });
    }

    if (ctx.state === 'running') {
        scheduleFireworksSound();
    } else if (resumePromise && typeof resumePromise.then === 'function') {
        resumePromise.then(scheduleFireworksSound).catch(function() {
            // A browser may require another user gesture to resume audio.
        });
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
// Canvas остаётся скрытым между салютами; при запуске мы явно показываем его.
// Раньше CSS содержал display:none, из-за чего анимация была невидимой.
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
    animationId = null;
    if (!fwCtx || !fireworksCanvas) return;

    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
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
    fwCtx.globalAlpha = 1;

    if (particles.length > 0) {
        animationId = requestAnimationFrame(updateFireworks);
    } else {
        fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        fireworksCanvas.style.display = 'none';
    }
}

function startFireworks() {
    if (!fwCtx || !fireworksCanvas) return;
    playFireworksSound();
    var colors = ['#fbbf24', '#38bdf8', '#4ade80', '#f472b6', '#c084fc'];

    fireworksCanvas.style.display = 'block';
    var centerX = fireworksCanvas.width / 2;
    var centerY = fireworksCanvas.height / 2;

    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            // Повторно показываем canvas даже при задержанных таймерах в Safari.
            fireworksCanvas.style.display = 'block';
            var x = centerX + (Math.random() - 0.5) * 300;
            var y = centerY + (Math.random() - 0.5) * 200;
            var color = colors[Math.floor(Math.random() * colors.length)];
            createParticle(x, y, color);
            if (animationId === null) updateFireworks();
        }, i * 200);
    }
}
