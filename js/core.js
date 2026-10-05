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
// js/core.js (добавить в конец файла)

function renderStatisticsTask(taskIndex) {
    const task = statisticsTasks[taskIndex];
    if (!task) return;

    const container = document.getElementById('task-container'); // Убедись, что в statistics.html есть <div id="task-container"></div>
    if (!container) return;

    // 1. Заголовок и описание
    let html = `<h2>${task.title}</h2><p>${task.desc}</p>`;

    // 2. Таблица
    html += '<table class="stats-table"><thead><tr>';
    task.headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    task.rows.forEach((row, rIdx) => {
        html += `<tr><td>${row.l}</td>`;
        row.c.forEach((cell, cIdx) => {
            // Если у ячейки есть переменная (k), делаем её кликабельной
            if (cell.k) {
                html += `<td>
                            <span class="clickable-cell" 
                                  data-r="${rIdx}" 
                                  data-c="${cIdx}" 
                                  data-correct="${cell.k}"
                                  onclick="openVarSelector(this)">
                                ${cell.v}
                            </span>
                         </td>`;
            } else {
                html += `<td>${cell.v}</td>`;
            }
        });
        html += '</tr>';
    });
    html += '</tbody></table>';

    // 3. Кнопка решения (скрыта, пока не все выбрано)
    html += `<div id="solve-btn-area" style="margin-top:20px; text-align:center;">
                <button id="btn-solve" disabled onclick="showSolution(${taskIndex})">РЕШИТЬ ЗАДАЧУ</button>
             </div>`;
             
    // 4. Область решения (скрыта по умолчанию)
    html += `<div id="solution-area" style="display:none; margin-top:20px; border:1px solid #4CAF50; padding:15px; border-radius:8px;"></div>`;

    container.innerHTML = html;
    
    // Инициализация счетчика выбранных переменных
    window.selectedVars = {}; 
    updateSolveButton();
}

// Глобальная функция для открытия выбора переменной
function openVarSelector(element) {
    // Простая реализация через prompt для скорости. 
    // В продакшене лучше сделать красивое модальное окно или dropdown.
    const options = ["p0", "q0", "p1", "q1", "p0q0_th", "p1q1_th"];
    const choice = prompt(`Выберите переменную для числа ${element.innerText}:\n${options.join(', ')}`);
    
    if (options.includes(choice)) {
        element.dataset.userChoice = choice;
        element.style.border = "2px solid #2196F3"; // Подсветка выбранного
        element.style.backgroundColor = "#E3F2FD";
        element.innerText = `${choice} = ${element.innerText.split('=')[1] || element.innerText}`; // Обновляем текст
        
        // Сохраняем выбор
        const key = `${element.dataset.r}-${element.dataset.c}`;
        window.selectedVars[key] = choice;
        
        updateSolveButton();
    }
}

function updateSolveButton() {
    const btn = document.getElementById('btn-solve');
    if (!btn) return;
    
    // Считаем сколько уникальных ячеек выбрано
    const totalCells = Object.keys(window.selectedVars).length;
    // В каждой задаче 3 строки * 4 ячейки = 12 переменных (обычно)
    // Можно динамически считать, но для простоты проверим > 0
    btn.disabled = totalCells < 12; 
    btn.innerText = totalCells < 12 ? `Выбрано ${totalCells}/12` : "РЕШИТЬ ЗАДАЧУ";
}

function showSolution(taskIndex) {
    const task = statisticsTasks[taskIndex];
    const area = document.getElementById('solution-area');
    
    let solHtml = '<h3>Решение:</h3>';
    task.sol.forEach(step => {
        solHtml += `<p><strong>${step}</strong></p>`;
    });
    solHtml += `<hr><p style="color:#FFC107; font-weight:bold;">Вывод: ${task.conc}</p>`;
    
    area.innerHTML = solHtml;
    area.style.display = 'block';
    area.scrollIntoView({behavior: "smooth"});
}
// === РЕНДЕРИНГ ИНТЕРАКТИВНОЙ ЗАДАЧИ ПО СТАТИСТИКЕ ===
function renderStatisticsTask(taskIndex) {
    const task = statisticsTasks[taskIndex];
    if (!task) return;

    const wrapper = document.getElementById('task-wrapper');
    if (!wrapper) return;

    // Сброс состояния
    window.currentTaskVars = {};
    window.currentTaskTotalCells = 0;

    // Генерация HTML таблицы
    let tableHtml = `<table class="stats-table"><thead><tr>`;
    task.headers.forEach(h => tableHtml += `<th>${h}</th>`);
    tableHtml += `</tr></thead><tbody>`;

    task.rows.forEach((row, rIdx) => {
        tableHtml += `<tr><td>${row.label}</td>`;
        row.cells.forEach((cell, cIdx) => {
            if (cell.var) {
                window.currentTaskTotalCells++;
                tableHtml += `<td>
                    <span class="clickable-cell" 
                          data-r="${rIdx}" data-c="${cIdx}" 
                          data-correct="${cell.var}"
                          data-val="${cell.val}"
                          onclick="handleCellClick(event, this)">
                        ${cell.val}
                    </span>
                </td>`;
            } else {
                tableHtml += `<td>${cell.val}</td>`;
            }
        });
        tableHtml += `</tr>`;
    });
    tableHtml += `</tbody></table>`;

    // Сборка всего интерфейса задачи
    wrapper.innerHTML = `
        <h2 style="color:#fbbf24; text-align:center; margin-bottom:5px;">${task.title}</h2>
        <p style="text-align:center; color:#94a3b8; margin-bottom:20px;">${task.description}</p>
        ${tableHtml}
        <div class="progress-counter" id="task-progress">Назначено переменных: 0 / ${window.currentTaskTotalCells}</div>
        <div class="solve-btn-area">
            <button id="btn-solve-task" class="btn-solve" onclick="checkAndSolve(${taskIndex})">РЕШИТЬ ЗАДАЧУ</button>
        </div>
        <div id="solution-block" class="solution-area"></div>
        <div class="task-nav">
            <button class="btn-nav" onclick="loadRandomTask()">🔄 Другая задача</button>
            <button class="btn-nav" onclick="window.scrollTo({top:0, behavior:'smooth'})">⬆️ Наверх</button>
        </div>
    `;
}

// === ОБРАБОТКА КЛИКА ПО ЯЧЕЙКЕ ===
function handleCellClick(e, cellEl) {
    e.stopPropagation();
    
    // Удаляем старые попапы
    document.querySelectorAll('.var-selector-popup').forEach(p => p.remove());

    const options = ["p0", "q0", "p1", "q1", "p0q0_th", "p1q1_th"];
    const popup = document.createElement('div');
    popup.className = 'var-selector-popup';
    
    options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'var-option';
        div.textContent = opt;
        div.onclick = (ev) => {
            ev.stopPropagation();
            selectVariable(cellEl, opt);
            popup.remove();
        };
        popup.appendChild(div);
    });

    // Позиционирование попапа
    const rect = cellEl.getBoundingClientRect();
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    
    document.body.appendChild(popup);

    // Закрытие при клике вне
    setTimeout(() => {
        document.addEventListener('click', function closePopup() {
            popup.remove();
            document.removeEventListener('click', closePopup);
        }, { once: true });
    }, 10);
}

// === ВЫБОР ПЕРЕМЕННОЙ ===
function selectVariable(cellEl, variable) {
    const r = cellEl.dataset.r;
    const c = cellEl.dataset.c;
    const key = `${r}-${c}`;

    // Сохраняем выбор
    window.currentTaskVars[key] = variable;

    // Визуальное обновление ячейки
    cellEl.classList.add('selected');
    cellEl.classList.remove('error');
    cellEl.innerHTML = `<small style="display:block;font-size:0.7em;color:#94a3b8;margin-bottom:2px;">${variable}</small>${cellEl.dataset.val}`;

    // Обновляем счетчик
    const count = Object.keys(window.currentTaskVars).length;
    document.getElementById('task-progress').textContent = `Назначено переменных: ${count} / ${window.currentTaskTotalCells}`;

    // Активируем кнопку если все выбраны
    const btn = document.getElementById('btn-solve-task');
    if (count >= window.currentTaskTotalCells) {
        btn.classList.add('active');
    }
}

// === ПРОВЕРКА И ПОКАЗ РЕШЕНИЯ ===
function checkAndSolve(taskIndex) {
    const task = statisticsTasks[taskIndex];
    const cells = document.querySelectorAll('.clickable-cell');
    let allCorrect = true;

    cells.forEach(cell => {
        const r = cell.dataset.r;
        const c = cell.dataset.c;
        const key = `${r}-${c}`;
        const userChoice = window.currentTaskVars[key];
        const correct = cell.dataset.correct;

        if (userChoice !== correct) {
            allCorrect = false;
            cell.classList.add('error');
            cell.classList.remove('selected');
        }
    });

    if (!allCorrect) {
        alert('❌ Есть ошибки в назначении переменных! Исправьте красные ячейки.');
        return;
    }

    // Показываем решение
    const solBlock = document.getElementById('solution-block');
    let html = '';
    
    task.solution.steps.forEach(step => {
        html += `<div class="solution-step">
            <div class="step-title">${step.title}</div>
            <div class="step-text">${step.text}</div>
        </div>`;
    });

    html += `<div class="conclusion-box">
        <div class="conclusion-title">📝 Вывод:</div>
        <div>${task.solution.conclusion}</div>
    </div>`;

    solBlock.innerHTML = html;
    solBlock.style.display = 'block';
    solBlock.scrollIntoView({ behavior: 'smooth' });

    // Блокируем повторное нажатие
    document.getElementById('btn-solve-task').disabled = true;
    document.getElementById('btn-solve-task').textContent = '✅ Решено';
}
