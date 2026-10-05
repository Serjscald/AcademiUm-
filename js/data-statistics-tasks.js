var statisticsTasks = [
    {
        id: "task_museum_1", title: "Музей: январь → март",
        colors: { p0: "#38bdf8", q0: "#4ade80", p1: "#fbbf24", q1: "#f472b6" },
        formulas: [
            { text: "Iqp = Σ(p₁q₁) / Σ(p₀q₀)", vars: ["p1", "q1", "p0", "q0"] },
            { text: "Ip = Σ(p₁q₁) / Σ(p₀q₁)", vars: ["p1", "q1", "p0", "q1"] },
            { text: "Iq = Σ(p₀q₁) / Σ(p₀q₀)", vars: ["p0", "q1", "p0", "q0"] },
            { text: "Δpq = Σ(p₁q₁) − Σ(p₀q₀)", vars: ["p1", "q1", "p0", "q0"] },
            { text: "Δp = Σ(p₁q₁) − Σ(p₀q₁)", vars: ["p1", "q1", "p0", "q1"] },
            { text: "Δq = Σ(p₀q₁) − Σ(p₀q₀)", vars: ["p0", "q1", "p0", "q0"] }
        ],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th>Тип билета</th><th>p₀ (руб.)</th><th>q₀ (шт.)</th><th>p₁ (руб.)</th><th>q₁ (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="300">300</td><td class="var" data-var="q0_1" data-val="1200">1200</td><td class="var" data-var="p1_1" data-val="350">350</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="150">150</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="p1_2" data-val="180">180</td><td class="var" data-var="q1_2" data-val="750">750</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="500">500</td><td class="var" data-var="p1_3" data-val="120">120</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0; var dp = p1q1 - p0q1; var dq = p0q1 - p0q0;
            return {
                calc: 'Σ(p₀q₀) = ' + p0q0 + ' руб.\nΣ(p₁q₁) = ' + p1q1 + ' руб.\nΣ(p₀q₁) = ' + p0q1 + ' руб.\n\nIqp = (' + p1q1 + ' / ' + p0q0 + ') × 100 = ' + (p1q1/p0q0*100).toFixed(2) + '%\nIp = (' + p1q1 + ' / ' + p0q1 + ') × 100 = ' + (p1q1/p0q1*100).toFixed(2) + '%\nIq = (' + p0q1 + ' / ' + p0q0 + ') × 100 = ' + (p0q1/p0q0*100).toFixed(2) + '%\n\nΔpq = ' + p1q1 + ' − ' + p0q0 + ' = ' + dpq + ' руб.\nΔp = ' + p1q1 + ' − ' + p0q1 + ' = ' + dp + ' руб.\nΔq = ' + p0q1 + ' − ' + p0q0 + ' = ' + dq + ' руб.',
                conclusion: 'Выручка музея изменилась на ' + dpq + ' руб. За счёт изменения цен выручка изменилась на ' + dp + ' руб., за счёт изменения количества проданных билетов — на ' + dq + ' руб.'
            };
        }
    },
    {
        id: "task_museum_5", title: "Музей: выручка в янв (найти q₀)",
        colors: { p0: "#38bdf8", rev0: "#a78bfa", p1: "#fbbf24", q1: "#f472b6", q0_calc: "#4ade80" },
        formulas: [
            { text: "q₀ = Выручка₀ / p₀", vars: ["rev0", "p0", "q0_calc"] },
            { text: "Iqp = Σ(p₁q₁) / Σ(p₀q₀)", vars: ["p1", "q1", "p0", "q0_calc"] }
        ],
        requiredVars: ["p0_1", "rev0_1", "p1_1", "q1_1", "p0_2", "rev0_2", "p1_2", "q1_2", "p0_3", "rev0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th>Тип билета</th><th>p₀ (руб.)</th><th>Выручка₀ (тыс.руб.)</th><th>p₁ (руб.)</th><th>q₁ (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="300">300</td><td class="var" data-var="rev0_1" data-val="360">360</td><td class="var" data-var="p1_1" data-val="350">350</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="150">150</td><td class="var" data-var="rev0_2" data-val="120">120</td><td class="var" data-var="p1_2" data-val="180">180</td><td class="var" data-var="q1_2" data-val="750">750</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="rev0_3" data-val="50">50</td><td class="var" data-var="p1_3" data-val="120">120</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var q0_1 = v.rev0_1 * 1000 / v.p0_1; var q0_2 = v.rev0_2 * 1000 / v.p0_2; var q0_3 = v.rev0_3 * 1000 / v.p0_3;
            var p0q0 = v.p0_1*q0_1 + v.p0_2*q0_2 + v.p0_3*q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0; var dp = p1q1 - p0q1; var dq = p0q1 - p0q0;
            return {
                calc: 'Сначала найдём q₀:\nq₀(взр) = 360000 / 300 = ' + q0_1.toFixed(0) + ' шт.\nq₀(льг) = 120000 / 150 = ' + q0_2.toFixed(0) + ' шт.\nq₀(дет) = 50000 / 100 = ' + q0_3.toFixed(0) + ' шт.\n\nΣ(p₀q₀) = ' + p0q0.toFixed(0) + ' руб.\nΣ(p₁q₁) = ' + p1q1 + ' руб.\nΣ(p₀q₁) = ' + p0q1 + ' руб.\n\nΔpq = ' + dpq.toFixed(0) + ' руб.\nΔp = ' + dp + ' руб.\nΔq = ' + dq.toFixed(0) + ' руб.',
                conclusion: 'Выручка музея изменилась на ' + dpq.toFixed(0) + ' руб. За счёт изменения цен выручка изменилась на ' + dp + ' руб., за счёт изменения количества проданных билетов — на ' + dq.toFixed(0) + ' руб.'
            };
        }
    }
];
