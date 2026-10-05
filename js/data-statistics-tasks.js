var statisticsTasks = [
    {
        id: "task_theater_full",
        title: "ЗАДАЧА: ВЫРУЧКА ТЕАТРА",
        description: "Театр продаёт билеты трёх типов. Оцените изменение выручки в апреле по сравнению с февралём и разложите его на факторы.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1q1: "#fb923c", q1: "#c084fc" },
        formulas: [
            "Выручка = Σ(p × q)",
            "Цена отчётного периода p₁ = (p₁q₁) / q₁",
            "Индекс выручки I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)",
            "Индекс цен I_p = Σ(p₁×q₁) / Σ(p₀×q₁)",
            "Индекс объёма I_q = Σ(p₀×q₁) / Σ(p₀×q₀)",
            "ΔВыручка = Σ(p₁×q₁) - Σ(p₀×q₀)"
        ],
        requiredVars: ["p0_1", "q0_1", "p1q1_1", "q1_1", "p0_2", "q0_2", "p1q1_2", "q1_2", "p0_3", "q0_3", "p1q1_3", "q1_3"],
        html: '<table class="task-table"><thead><tr><th>Тип билета</th><th>Цена фев (руб.)</th><th>Продано фев (шт.)</th><th>Продано апр (тыс. руб.)</th><th>Продано апр (шт.)</th></tr></thead><tbody><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="1100">1100</td><td class="var" data-var="p1q1_1" data-val="520">520</td><td class="var" data-var="q1_1" data-val="1300">1300</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="250">250</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="p1q1_2" data-val="160">160</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="600">600</td><td class="var" data-var="p1q1_3" data-val="90">90</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></tbody></table>',
        solve: function(v) {
            // Шаг 1: Находим p1
            var p1_1 = (v.p1q1_1 * 1000) / v.q1_1;
            var p1_2 = (v.p1q1_2 * 1000) / v.q1_2;
            var p1_3 = (v.p1q1_3 * 1000) / v.q1_3;

            // Шаг 2: Суммы
            var sum_p0q0 = (v.p0_1 * v.q0_1) + (v.p0_2 * v.q0_2) + (v.p0_3 * v.q0_3);
            var sum_p1q1 = (v.p1q1_1 * 1000) + (v.p1q1_2 * 1000) + (v.p1q1_3 * 1000);
            var sum_p0q1 = (v.p0_1 * v.q1_1) + (v.p0_2 * v.q1_2) + (v.p0_3 * v.q1_3);

            // Шаг 3: Индексы
            var I_pq = (sum_p1q1 / sum_p0q0 * 100).toFixed(1);
            var I_p = (sum_p1q1 / sum_p0q1 * 100).toFixed(1);
            var I_q = (sum_p0q1 / sum_p0q0 * 100).toFixed(1);

            // Шаг 4: Абсолютные изменения
            var dTotal = sum_p1q1 - sum_p0q0;
            var dPrice = sum_p1q1 - sum_p0q1;
            var dQty = sum_p0q1 - sum_p0q0;

            var html = '';
            
            // Блок 1
            html += '<div class="step-block">';
            html += '<h3>Шаг 1. Определение цен апреля (p₁)</h3>';
            html += '<p class="formula">p₁ = (p₁q₁) / q₁</p>';
            html += '<p>p₁ (взр) = <span style="color:#fb923c">' + (v.p1q1_1*1000) + '</span> / <span style="color:#c084fc">' + v.q1_1 + '</span> = <b style="color:#60a5fa">' + p1_1.toFixed(0) + ' руб.</b></p>';
            html += '<p>p₁ (льг) = <span style="color:#fb923c">' + (v.p1q1_2*1000) + '</span> / <span style="color:#c084fc">' + v.q1_2 + '</span> = <b style="color:#60a5fa">' + p1_2.toFixed(0) + ' руб.</b></p>';
            html += '<p>p₁ (дет) = <span style="color:#fb923c">' + (v.p1q1_3*1000) + '</span> / <span style="color:#c084fc">' + v.q1_3 + '</span> = <b style="color:#60a5fa">' + p1_3.toFixed(0) + ' руб.</b></p>';
            html += '</div>';

            // Блок 2
            html += '<div class="step-block">';
            html += '<h3>Шаг 2. Совокупные величины</h3>';
            html += '<p class="formula">Σp₀q₀ = Σ(p₀ × q₀)</p>';
            html += '<p>Σp₀q₀ = (<span style="color:#60a5fa">' + v.p0_1 + '</span>×<span style="color:#4ade80">' + v.q0_1 + '</span>) + (<span style="color:#60a5fa">' + v.p0_2 + '</span>×<span style="color:#4ade80">' + v.q0_2 + '</span>) + (<span style="color:#60a5fa">' + v.p0_3 + '</span>×<span style="color:#4ade80">' + v.q0_3 + '</span>) = <b>' + sum_p0q0 + ' руб.</b></p>';
            html += '<br><p class="formula">Σp₁q₁ = Σ(p₁q₁)</p>';
            html += '<p>Σp₁q₁ = <span style="color:#fb923c">' + (v.p1q1_1*1000) + '</span> + <span style="color:#fb923c">' + (v.p1q1_2*1000) + '</span> + <span style="color:#fb923c">' + (v.p1q1_3*1000) + '</span> = <b>' + sum_p1q1 + ' руб.</b></p>';
            html += '<br><p class="formula">Σp₀q₁ = Σ(p₀ × q₁)</p>';
            html += '<p>Σp₀q₁ = (<span style="color:#60a5fa">' + v.p0_1 + '</span>×<span style="color:#c084fc">' + v.q1_1 + '</span>) + (<span style="color:#60a5fa">' + v.p0_2 + '</span>×<span style="color:#c084fc">' + v.q1_2 + '</span>) + (<span style="color:#60a5fa">' + v.p0_3 + '</span>×<span style="color:#c084fc">' + v.q1_3 + '</span>) = <b>' + sum_p0q1 + ' руб.</b></p>';
            html += '</div>';

            // Блок 3
            html += '<div class="step-block">';
            html += '<h3>Шаг 3. Индексы</h3>';
            html += '<p class="formula">I_pq = Σ(p₁q₁) / Σ(p₀q₀)</p>';
            html += '<p>I_pq = <span style="color:#fb923c">' + sum_p1q1 + '</span> / <span style="color:#4ade80">' + sum_p0q0 + '</span> = <b>' + I_pq + '%</b></p>';
            html += '<br><p class="formula">I_p = Σ(p₁q₁) / Σ(p₀q₁)</p>';
            html += '<p>I_p = <span style="color:#fb923c">' + sum_p1q1 + '</span> / <span style="color:#c084fc">' + sum_p0q1 + '</span> = <b>' + I_p + '%</b></p>';
            html += '<br><p class="formula">I_q = Σ(p₀q₁) / Σ(p₀q₀)</p>';
            html += '<p>I_q = <span style="color:#c084fc">' + sum_p0q1 + '</span> / <span style="color:#4ade80">' + sum_p0q0 + '</span> = <b>' + I_q + '%</b></p>';
            html += '</div>';

            // Блок 4
            html += '<div class="step-block">';
            html += '<h3>Шаг 4. Абсолютные изменения</h3>';
            html += '<p class="formula">ΔОбщее = Σ(p₁q₁) - Σ(p₀q₀)</p>';
            html += '<p>ΔОбщее = <span style="color:#fb923c">' + sum_p1q1 + '</span> - <span style="color:#4ade80">' + sum_p0q0 + '</span> = <b>' + dTotal + ' руб.</b></p>';
            html += '<br><p class="formula">ΔЦен = Σ(p₁q₁) - Σ(p₀q₁)</p>';
            html += '<p>ΔЦен = <span style="color:#fb923c">' + sum_p1q1 + '</span> - <span style="color:#c084fc">' + sum_p0q1 + '</span> = <b>' + dPrice + ' руб.</b></p>';
            html += '<br><p class="formula">ΔКол-ва = Σ(p₀q₁) - Σ(p₀q₀)</p>';
            html += '<p>ΔКол-ва = <span style="color:#c084fc">' + sum_p0q1 + '</span> - <span style="color:#4ade80">' + sum_p0q0 + '</span> = <b>' + dQty + ' руб.</b></p>';
            html += '</div>';

            return { 
                calc: html, 
                conclusion: 'Выручка театра снизилась на ' + Math.abs(dTotal) + ' руб. (индекс выручки ' + I_pq + '%). Увеличение количества проданных билетов добавило ' + dQty + ' руб., однако изменение цен принесло ' + dPrice + ' руб. Преобладающим оказалось влияние фактора цен: именно оно и определило итоговую динамику выручки.' 
            };
        }
    }
];
