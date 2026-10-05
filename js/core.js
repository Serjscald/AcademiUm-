// Заглушка для аудио, чтобы избежать ошибки ReferenceError
function initAudio() {
    console.log("Audio system disabled for debugging");
}



/**
 * CORE.JS - Ядро платформы АкадемиУм!
 * Версия: 5.1.0 (Статистика Tasks Update)
 */

// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
var currentTaskVars = {}; // Хранит выбор пользователя { "row-col": "p0" }
var currentTaskTotalCells = 0; // Общее количество кликабельных ячеек в текущей задаче

// === ФУНКЦИИ РЕНДЕРИНГА ЗАДАЧ ПО СТАТИСТИКЕ ===

/**
 * Отрисовывает интерактивную задачу на странице statistics.html
 * @param {number} taskIndex - Индекс задачи в массиве statisticsTasks
 */
function renderStatisticsTask(taskIndex) {
    // Проверка наличия данных
    if (typeof statisticsTasks === 'undefined' || !statisticsTasks[taskIndex]) {
        console.error("Ошибка: задача не найдена или данные не загружены.");
        return;
    }

    const task = statisticsTasks[taskIndex];
    const container = document.getElementById('task-container');
    if (!container) return;

    // Сброс состояния перед новой задачей
    currentTaskVars = {};
    currentTaskTotalCells = 0;

    // 1. Генерация заголовка и описания
    let html = `<div class="task-header">
                    <h2 style="color:#fbbf24; margin-bottom:5px;">${task.title}</h2>
                    <p style="color:#94a3b8; font-size:0.95em;">${task.description}</p>
                </div>`;

    // 2. Генерация таблицы
    html += `<table class="stats-table"><thead><tr>`;
    task.headers.forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;

    task.rows.forEach((row, rIdx) => {
        html += `<tr><td class="row-label">${row.label}</td>`;
        
        row.cells.forEach((cell, cIdx) => {
            // Если у ячейки есть переменная (var), делаем её интерактивной
            if (cell.var) {
                currentTaskTotalCells++;
                html += `<td>
                            <span class="clickable-cell" 
                                  data-r="${rIdx}" 
                                  data-c="${cIdx}" 
                                  data-correct="${cell.var}" 
                                  data-val="${cell.val}"
                                  onclick="handleCellClick(event, this)">
                                ${cell.val}
                            </span>
                         </td>`;
            } else {
                // Обычная ячейка без выбора
                html += `<td>${cell.val}</td>`;
            }
        });
        html += `</tr>`;
    });
    html += `</tbody></table>`;

    // 3. Прогресс и кнопка решения
    html += `<div class="task-controls">
                <div id="var-counter" style="color:#94a3b8; margin-bottom:10px;">
                    Назначено переменных: 0 / ${currentTaskTotalCells}
                </div>
                <button id="btn-solve-task" class="btn-solve" disabled onclick="checkAndSolve(${taskIndex})">
                    РЕШИТЬ ЗАДАЧУ
                </button>
             </div>`;

    // 4. Блок решения (скрыт по умолчанию)
    html += `<div id="solution-block" class="solution-area"></div>`;

    // 5. Навигация
    html += `<div class="task-nav">
                <button class="btn-nav" onclick="loadRandomTask()">🔄 Следующая задача</button>
             </div>`;

    container.innerHTML = html;
}

/**
 * Обработчик клика по ячейке таблицы
 * Открывает всплывающее меню выбора переменной
 */
function handleCellClick(e, cellEl) {
    e.stopPropagation();
    
    // Удаляем старые открытые меню, если есть
    const oldPopup = document.querySelector('.var-selector-popup');
    if (oldPopup) oldPopup.remove();

    // Доступные варианты переменных
    const options = ["p0", "q0", "p1", "q1", "p0q0_th", "p1q1_th"];
    
    // Создаем попап
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

    // Позиционирование попапа рядом с ячейкой
    const rect = cellEl.getBoundingClientRect();
    popup.style.left = `${Math.min(rect.left, window.innerWidth - 160)}px`; // Не даем уйти за экран справа
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    
    document.body.appendChild(popup);

    // Автозакрытие при клике вне меню
    setTimeout(() => {
        document.addEventListener('click', function closeHandler() {
            if (popup.parentNode) popup.remove();
            document.removeEventListener('click', closeHandler);
        }, { once: true });
    }, 10);
}

/**
 * Сохраняет выбор пользователя и обновляет UI
 */
function selectVariable(cellEl, variable) {
    const r = cellEl.dataset.r;
    const c = cellEl.dataset.c;
    const key = `${r}-${c}`;

    // Сохраняем выбор
    currentTaskVars[key] = variable;

    // Визуальное обновление ячейки
    cellEl.classList.add('selected');
    cellEl.classList.remove('error');
    // Показываем выбранную переменную над числом
    cellEl.innerHTML = `<small class="var-label">${variable}</small>${cellEl.dataset.val}`;

    // Обновляем счетчик
    const count = Object.keys(currentTaskVars).length;
    const counterEl = document.getElementById('var-counter');
    if (counterEl) {
        counterEl.textContent = `Назначено переменных: ${count} / ${currentTaskTotalCells}`;
        counterEl.style.color = count >= currentTaskTotalCells ? '#22c55e' : '#94a3b8';
    }

    // Активируем кнопку "Решить", если все ячейки заполнены
    const btn = document.getElementById('btn-solve-task');
    if (btn && count >= currentTaskTotalCells) {
        btn.disabled = false;
        btn.classList.add('active');
    }
}

/**
 * Проверяет правильность выбора и показывает решение
 */
function checkAndSolve(taskIndex) {
    const task = statisticsTasks[taskIndex];
    const cells = document.querySelectorAll('.clickable-cell');
    let hasErrors = false;

    // Проверка каждой ячейки
    cells.forEach(cell => {
        const r = cell.dataset.r;
        const c = cell.dataset.c;
        const key = `${r}-${c}`;
        const userChoice = currentTaskVars[key];
        const correctVar = cell.dataset.correct;

        if (userChoice !== correctVar) {
            hasErrors = true;
            cell.classList.add('error');
            cell.classList.remove('selected');
        }
    });

    if (hasErrors) {
        alert('❌ Есть ошибки в назначении переменных!\nИсправьте ячейки, подсвеченные красным.');
        return;
    }

    // Если всё верно — показываем решение
    const solBlock = document.getElementById('solution-block');
    let html = '<h3 style="color:#22c55e; margin-top:0;">✅ Решение задачи</h3>';
    
    // Выводим шаги
    if (task.solution && task.solution.steps) {
        task.solution.steps.forEach(step => {
            html += `<div class="solution-step">
                        <div class="step-title">${step.title}</div>
                        <div class="step-text">${step.text.replace(/\n/g, '<br>')}</div>
                     </div>`;
        });
    }

    // Вывод
    if (task.solution && task.solution.conclusion) {
        html += `<div class="conclusion-box">
                    <div class="conclusion-title">📝 Вывод:</div>
                    <div>${task.solution.conclusion}</div>
                 </div>`;
    }

    solBlock.innerHTML = html;
    solBlock.style.display = 'block';
    
    // Плавная прокрутка к решению
    solBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Блокируем кнопку после успешного решения
    const btn = document.getElementById('btn-solve-task');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'РЕШЕНО';
        btn.style.background = '#166534';
    }
}

/**
 * Загружает случайную задачу (для кнопки "Следующая")
 */
function loadRandomTask() {
    if (typeof statisticsTasks === 'undefined') {
        alert("Ошибка: данные задач не загружены!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * statisticsTasks.length);
    renderStatisticsTask(randomIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === БАЗОВЫЕ УТИЛИТЫ ПЛАТФОРМЫ ===

/**
 * Переключение вкладок (Обучение / Контроль / Задачи)
 */
function switchTab(tabName) {
    // Скрываем все контенты
    document.querySelectorAll('.mode-content').forEach(el => el.classList.remove('active'));
    // Деактивируем все кнопки
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    // Показываем нужный контент
    const content = document.getElementById(`tab-${tabName}`);
    if (content) content.classList.add('active');
    
    // Активируем кнопку
    // Находим кнопку по атрибуту onclick или data-mode
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        }
    });

    // Если открыли вкладку задач и там пусто — грузим задачу
    if (tabName === 'tasks') {
        const container = document.getElementById('task-container');
        if (container && !container.querySelector('.stats-table')) {
            loadRandomTask();
        }
    }
}

// Инициализация при загрузке страницы (если нужно)
document.addEventListener('DOMContentLoaded', () => {
    console.log("АкадемиУм! Core v5.1.0 loaded");
});
