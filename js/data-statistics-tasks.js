var statisticsTasks = [
    {
        id: "task_museum_1", title: "ЗАДАЧА: ВЫРУЧКА МУЗЕЯ (ЯНВАРЬ → МАРТ)",
        description: "Музей предлагает три типа билетов. Оцените изменение выручки в марте по сравнению с январём и разложите его на факторы.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)", "I_p = Σ(p₁×q₁) / Σ(p₀×q₁)", "I_q = Σ(p₀×q₁) / Σ(p₀×q₀)", "ΔВыручка = Σ(p₁×q₁) - Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Янв: цена (руб.)</th><th style="width:18.75%">Янв: продано (шт.)</th><th style="width:18.75%">Мар: цена (руб.)</th><th style="width:18.75%">Мар: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="300">300</td><td class="var" data-var="q0_1" data-val="1200">1200</td><td class="var" data-var="p1_1" data-val="350">350</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="150">150</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="p1_2" data-val="180">180</td><td class="var" data-var="q1_2" data-val="750">750</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="500">500</td><td class="var" data-var="p1_3" data-val="120">120</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Совокупные величины</h3>';
            html += '<p>Σp₀q₀ = (<span style="color:#60a5fa">'+v.p0_1+'</span>×<span style="color:#4ade80">'+v.q0_1+'</span>) + (<span style="color:#60a5fa">'+v.p0_2+'</span>×<span style="color:#4ade80">'+v.q0_2+'</span>) + (<span style="color:#60a5fa">'+v.p0_3+'</span>×<span style="color:#4ade80">'+v.q0_3+'</span>) = <b>'+p0q0+' руб.</b></p>';
            html += '<p>Σp₁q₁ = (<span style="color:#fbbf24">'+v.p1_1+'</span>×<span style="color:#c084fc">'+v.q1_1+'</span>) + (<span style="color:#fbbf24">'+v.p1_2+'</span>×<span style="color:#c084fc">'+v.q1_2+'</span>) + (<span style="color:#fbbf24">'+v.p1_3+'</span>×<span style="color:#c084fc">'+v.q1_3+'</span>) = <b>'+p1q1+' руб.</b></p>';
            html += '<p>Σp₀q₁ = (<span style="color:#60a5fa">'+v.p0_1+'</span>×<span style="color:#c084fc">'+v.q1_1+'</span>) + (<span style="color:#60a5fa">'+v.p0_2+'</span>×<span style="color:#c084fc">'+v.q1_2+'</span>) + (<span style="color:#60a5fa">'+v.p0_3+'</span>×<span style="color:#c084fc">'+v.q1_3+'</span>) = <b>'+p0q1+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Индексы и абсолютные изменения</h3>';
            html += '<p>I_pq = '+p1q1+' / '+p0q0+' × 100 = <b>'+(p1q1/p0q0*100).toFixed(1)+'%</b></p>';
            html += '<p>I_p = '+p1q1+' / '+p0q1+' × 100 = <b>'+(p1q1/p0q1*100).toFixed(1)+'%</b></p>';
            html += '<p>I_q = '+p0q1+' / '+p0q0+' × 100 = <b>'+(p0q1/p0q0*100).toFixed(1)+'%</b></p><br>';
            html += '<p>ΔОбщее = '+p1q1+' - '+p0q0+' = <b>'+dpq+' руб.</b></p>';
            html += '<p>ΔЦен = '+p1q1+' - '+p0q1+' = <b>'+dp+' руб.</b></p>';
            html += '<p>ΔКол-ва = '+p0q1+' - '+p0q0+' = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка музея изменилась на '+dpq+' руб. (индекс '+ (p1q1/p0q0*100).toFixed(1) +'%). За счёт изменения цен выручка изменилась на '+dp+' руб., за счёт изменения количества проданных билетов — на '+dq+' руб.' };
        }
    },
    {
        id: "task_theater_2", title: "ЗАДАЧА: ВЫРУЧКА ТЕАТРА (ФЕВРАЛЬ → АПРЕЛЬ)",
        description: "Театр продаёт билеты трёх типов. Оцените изменение выручки в апреле по сравнению с февралём и разложите его на факторы.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)", "I_p = Σ(p₁×q₁) / Σ(p₀×q₁)", "I_q = Σ(p₀×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Фев: цена (руб.)</th><th style="width:18.75%">Фев: продано (шт.)</th><th style="width:18.75%">Апр: цена (руб.)</th><th style="width:18.75%">Апр: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="1100">1100</td><td class="var" data-var="p1_1" data-val="400">400</td><td class="var" data-var="q1_1" data-val="1300">1300</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="250">250</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="p1_2" data-val="200">200</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="600">600</td><td class="var" data-var="p1_3" data-val="150">150</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Совокупные величины</h3>';
            html += '<p>Σp₀q₀ = <b>'+p0q0+' руб.</b> | Σp₁q₁ = <b>'+p1q1+' руб.</b> | Σp₀q₁ = <b>'+p0q1+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Индексы и изменения</h3>';
            html += '<p>I_pq = <b>'+(p1q1/p0q0*100).toFixed(1)+'%</b> | I_p = <b>'+(p1q1/p0q1*100).toFixed(1)+'%</b> | I_q = <b>'+(p0q1/p0q0*100).toFixed(1)+'%</b></p>';
            html += '<p>ΔОбщее = <b>'+dpq+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка театра изменилась на '+dpq+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    },
    {
        id: "task_circus_3", title: "ЗАДАЧА: ВЫРУЧКА ЦИРКА (ИЮНЬ → ИЮЛЬ)",
        description: "Цирк предлагает три типа билетов. Оцените изменение выручки в июле по сравнению с июнем.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)", "ΔВыручка = Σ(p₁×q₁) - Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Июн: цена (руб.)</th><th style="width:18.75%">Июн: продано (шт.)</th><th style="width:18.75%">Июл: цена (руб.)</th><th style="width:18.75%">Июл: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="800">800</td><td class="var" data-var="q0_1" data-val="1000">1000</td><td class="var" data-var="p1_1" data-val="750">750</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="500">500</td><td class="var" data-var="q0_2" data-val="500">500</td><td class="var" data-var="p1_2" data-val="500">500</td><td class="var" data-var="q1_2" data-val="600">600</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="400">400</td><td class="var" data-var="q0_3" data-val="1200">1200</td><td class="var" data-var="p1_3" data-val="450">450</td><td class="var" data-var="q1_3" data-val="800">800</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка цирка изменилась на '+dpq+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    },
    {
        id: "task_cinema_4", title: "ЗАДАЧА: ВЫРУЧКА КИНОТЕАТРА (МАЙ → ИЮЛЬ)",
        description: "Кинотеатр предлагает три типа билетов. Оцените изменение выручки в июле по сравнению с маем.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)", "ΔВыручка = Σ(p₁×q₁) - Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Май: цена (руб.)</th><th style="width:18.75%">Май: продано (шт.)</th><th style="width:18.75%">Июл: цена (руб.)</th><th style="width:18.75%">Июл: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="500">500</td><td class="var" data-var="p1_1" data-val="600">600</td><td class="var" data-var="q1_1" data-val="600">600</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="400">400</td><td class="var" data-var="q0_2" data-val="600">600</td><td class="var" data-var="p1_2" data-val="400">400</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="300">300</td><td class="var" data-var="q0_3" data-val="550">550</td><td class="var" data-var="p1_3" data-val="350">350</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка кинотеатра изменилась на '+dpq+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    },
    {
        id: "task_museum_5", title: "ЗАДАЧА: МУЗЕЙ (НАЙТИ q₀)",
        description: "В январе дана выручка в тыс. руб. Найдите количество проданных билетов в январе (q₀) и оцените изменение выручки.",
        colors: { p0: "#60a5fa", rev0: "#fb923c", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["q₀ = Выручка₀ / p₀", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "rev0_1", "p1_1", "q1_1", "p0_2", "rev0_2", "p1_2", "q1_2", "p0_3", "rev0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Янв: цена (руб.)</th><th style="width:18.75%">Янв: выручка (тыс.руб.)</th><th style="width:18.75%">Мар: цена (руб.)</th><th style="width:18.75%">Мар: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="300">300</td><td class="var" data-var="rev0_1" data-val="360">360</td><td class="var" data-var="p1_1" data-val="350">350</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="150">150</td><td class="var" data-var="rev0_2" data-val="120">120</td><td class="var" data-var="p1_2" data-val="180">180</td><td class="var" data-var="q1_2" data-val="750">750</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="rev0_3" data-val="50">50</td><td class="var" data-var="p1_3" data-val="120">120</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var q0_1 = v.rev0_1*1000/v.p0_1, q0_2 = v.rev0_2*1000/v.p0_2, q0_3 = v.rev0_3*1000/v.p0_3;
            var p0q0 = v.p0_1*q0_1 + v.p0_2*q0_2 + v.p0_3*q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим q₀</h3>';
            html += '<p>q₀(взр) = <span style="color:#fb923c">'+(v.rev0_1*1000)+'</span> / <span style="color:#60a5fa">'+v.p0_1+'</span> = <b>'+q0_1.toFixed(0)+' шт.</b></p>';
            html += '<p>q₀(льг) = <span style="color:#fb923c">'+(v.rev0_2*1000)+'</span> / <span style="color:#60a5fa">'+v.p0_2+'</span> = <b>'+q0_2.toFixed(0)+' шт.</b></p>';
            html += '<p>q₀(дет) = <span style="color:#fb923c">'+(v.rev0_3*1000)+'</span> / <span style="color:#60a5fa">'+v.p0_3+'</span> = <b>'+q0_3.toFixed(0)+' шт.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0.toFixed(0)+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка музея изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_theater_6", title: "ЗАДАЧА: ТЕАТР (НАЙТИ q₀)",
        description: "В феврале дана выручка в тыс. руб. Найдите количество проданных билетов в феврале (q₀).",
        colors: { p0: "#60a5fa", rev0: "#fb923c", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["q₀ = Выручка₀ / p₀", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "rev0_1", "p1_1", "q1_1", "p0_2", "rev0_2", "p1_2", "q1_2", "p0_3", "rev0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Фев: цена (руб.)</th><th style="width:18.75%">Фев: выручка (тыс.руб.)</th><th style="width:18.75%">Апр: цена (руб.)</th><th style="width:18.75%">Апр: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="rev0_1" data-val="550">550</td><td class="var" data-var="p1_1" data-val="400">400</td><td class="var" data-var="q1_1" data-val="1300">1300</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="250">250</td><td class="var" data-var="rev0_2" data-val="200">200</td><td class="var" data-var="p1_2" data-val="200">200</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="rev0_3" data-val="60">60</td><td class="var" data-var="p1_3" data-val="150">150</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var q0_1 = v.rev0_1*1000/v.p0_1, q0_2 = v.rev0_2*1000/v.p0_2, q0_3 = v.rev0_3*1000/v.p0_3;
            var p0q0 = v.p0_1*q0_1 + v.p0_2*q0_2 + v.p0_3*q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим q₀</h3>';
            html += '<p>q₀(взр) = <b>'+q0_1.toFixed(0)+' шт.</b> | q₀(льг) = <b>'+q0_2.toFixed(0)+' шт.</b> | q₀(дет) = <b>'+q0_3.toFixed(0)+' шт.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0.toFixed(0)+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка театра изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_circus_7", title: "ЗАДАЧА: ЦИРК (НАЙТИ q₁)",
        description: "В июле дана выручка в тыс. руб. Найдите количество проданных билетов в июле (q₁).",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", rev1: "#fb923c" },
        formulas: ["q₁ = Выручка₁ / p₁", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "rev1_1", "p0_2", "q0_2", "p1_2", "rev1_2", "p0_3", "q0_3", "p1_3", "rev1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Июн: цена (руб.)</th><th style="width:18.75%">Июн: продано (шт.)</th><th style="width:18.75%">Июл: цена (руб.)</th><th style="width:18.75%">Июл: выручка (тыс.руб.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="800">800</td><td class="var" data-var="q0_1" data-val="1000">1000</td><td class="var" data-var="p1_1" data-val="750">750</td><td class="var" data-var="rev1_1" data-val="825">825</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="500">500</td><td class="var" data-var="q0_2" data-val="500">500</td><td class="var" data-var="p1_2" data-val="500">500</td><td class="var" data-var="rev1_2" data-val="300">300</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="400">400</td><td class="var" data-var="q0_3" data-val="1200">1200</td><td class="var" data-var="p1_3" data-val="450">450</td><td class="var" data-var="rev1_3" data-val="360">360</td></tr></table>',
        solve: function(v) {
            var q1_1 = v.rev1_1*1000/v.p1_1, q1_2 = v.rev1_2*1000/v.p1_2, q1_3 = v.rev1_3*1000/v.p1_3;
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*q1_1 + v.p1_2*q1_2 + v.p1_3*q1_3;
            var p0q1 = v.p0_1*q1_1 + v.p0_2*q1_2 + v.p0_3*q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим q₁</h3>';
            html += '<p>q₁(взр) = <b>'+q1_1.toFixed(0)+' шт.</b> | q₁(льг) = <b>'+q1_2.toFixed(0)+' шт.</b> | q₁(дет) = <b>'+q1_3.toFixed(0)+' шт.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1.toFixed(0)+'</b> | Σp₀q₁ = <b>'+p0q1.toFixed(0)+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка цирка изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_cinema_8", title: "ЗАДАЧА: КИНОТЕАТР (НАЙТИ q₁)",
        description: "В июле дана выручка в тыс. руб. Найдите количество проданных билетов в июле (q₁).",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", rev1: "#fb923c" },
        formulas: ["q₁ = Выручка₁ / p₁", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "rev1_1", "p0_2", "q0_2", "p1_2", "rev1_2", "p0_3", "q0_3", "p1_3", "rev1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Май: цена (руб.)</th><th style="width:18.75%">Май: продано (шт.)</th><th style="width:18.75%">Июл: цена (руб.)</th><th style="width:18.75%">Июл: выручка (тыс.руб.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="500">500</td><td class="var" data-var="p1_1" data-val="600">600</td><td class="var" data-var="rev1_1" data-val="360">360</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="400">400</td><td class="var" data-var="q0_2" data-val="600">600</td><td class="var" data-var="p1_2" data-val="400">400</td><td class="var" data-var="rev1_2" data-val="320">320</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="300">300</td><td class="var" data-var="q0_3" data-val="550">550</td><td class="var" data-var="p1_3" data-val="350">350</td><td class="var" data-var="rev1_3" data-val="210">210</td></tr></table>',
        solve: function(v) {
            var q1_1 = v.rev1_1*1000/v.p1_1, q1_2 = v.rev1_2*1000/v.p1_2, q1_3 = v.rev1_3*1000/v.p1_3;
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*q1_1 + v.p1_2*q1_2 + v.p1_3*q1_3;
            var p0q1 = v.p0_1*q1_1 + v.p0_2*q1_2 + v.p0_3*q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим q₁</h3>';
            html += '<p>q₁(взр) = <b>'+q1_1.toFixed(0)+' шт.</b> | q₁(льг) = <b>'+q1_2.toFixed(0)+' шт.</b> | q₁(дет) = <b>'+q1_3.toFixed(0)+' шт.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1.toFixed(0)+'</b> | Σp₀q₁ = <b>'+p0q1.toFixed(0)+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка кинотеатра изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_museum_9", title: "ЗАДАЧА: МУЗЕЙ (НАЙТИ p₀)",
        description: "В январе дана выручка в тыс. руб. Найдите цену билета в январе (p₀).",
        colors: { rev0: "#fb923c", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["p₀ = Выручка₀ / q₀", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["rev0_1", "q0_1", "p1_1", "q1_1", "rev0_2", "q0_2", "p1_2", "q1_2", "rev0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Янв: выручка (тыс.руб.)</th><th style="width:18.75%">Янв: продано (шт.)</th><th style="width:18.75%">Мар: цена (руб.)</th><th style="width:18.75%">Мар: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="rev0_1" data-val="360">360</td><td class="var" data-var="q0_1" data-val="1200">1200</td><td class="var" data-var="p1_1" data-val="350">350</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="rev0_2" data-val="120">120</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="p1_2" data-val="180">180</td><td class="var" data-var="q1_2" data-val="750">750</td></tr><tr><td>Детский</td><td class="var" data-var="rev0_3" data-val="50">50</td><td class="var" data-var="q0_3" data-val="500">500</td><td class="var" data-var="p1_3" data-val="120">120</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p0_1 = v.rev0_1*1000/v.q0_1, p0_2 = v.rev0_2*1000/v.q0_2, p0_3 = v.rev0_3*1000/v.q0_3;
            var p0q0 = p0_1*v.q0_1 + p0_2*v.q0_2 + p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = p0_1*v.q1_1 + p0_2*v.q1_2 + p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим p₀</h3>';
            html += '<p>p₀(взр) = <b>'+p0_1.toFixed(0)+' руб.</b> | p₀(льг) = <b>'+p0_2.toFixed(0)+' руб.</b> | p₀(дет) = <b>'+p0_3.toFixed(0)+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0.toFixed(0)+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1.toFixed(0)+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка музея изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_theater_10", title: "ЗАДАЧА: ТЕАТР (НАЙТИ p₁)",
        description: "В апреле дана выручка в тыс. руб. Найдите цену билета в апреле (p₁).",
        colors: { p0: "#60a5fa", q0: "#4ade80", rev1: "#fb923c", q1: "#c084fc" },
        formulas: ["p₁ = Выручка₁ / q₁", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "rev1_1", "q1_1", "p0_2", "q0_2", "rev1_2", "q1_2", "p0_3", "q0_3", "rev1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Фев: цена (руб.)</th><th style="width:18.75%">Фев: продано (шт.)</th><th style="width:18.75%">Апр: выручка (тыс.руб.)</th><th style="width:18.75%">Апр: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="1100">1100</td><td class="var" data-var="rev1_1" data-val="520">520</td><td class="var" data-var="q1_1" data-val="1300">1300</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="250">250</td><td class="var" data-var="q0_2" data-val="800">800</td><td class="var" data-var="rev1_2" data-val="160">160</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="600">600</td><td class="var" data-var="rev1_3" data-val="90">90</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p1_1 = v.rev1_1*1000/v.q1_1, p1_2 = v.rev1_2*1000/v.q1_2, p1_3 = v.rev1_3*1000/v.q1_3;
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = p1_1*v.q1_1 + p1_2*v.q1_2 + p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим p₁</h3>';
            html += '<p>p₁(взр) = <b>'+p1_1.toFixed(0)+' руб.</b> | p₁(льг) = <b>'+p1_2.toFixed(0)+' руб.</b> | p₁(дет) = <b>'+p1_3.toFixed(0)+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1.toFixed(0)+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка театра изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    },
    {
        id: "task_circus_11", title: "ЗАДАЧА: ЦИРК (НАЙТИ p₀)",
        description: "В июне дана выручка в тыс. руб. Найдите цену билета в июне (p₀).",
        colors: { rev0: "#fb923c", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["p₀ = Выручка₀ / q₀", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["rev0_1", "q0_1", "p1_1", "q1_1", "rev0_2", "q0_2", "p1_2", "q1_2", "rev0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Июн: выручка (тыс.руб.)</th><th style="width:18.75%">Июн: продано (шт.)</th><th style="width:18.75%">Июл: цена (руб.)</th><th style="width:18.75%">Июл: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="rev0_1" data-val="800">800</td><td class="var" data-var="q0_1" data-val="1000">1000</td><td class="var" data-var="p1_1" data-val="750">750</td><td class="var" data-var="q1_1" data-val="1100">1100</td></tr><tr><td>Льготный</td><td class="var" data-var="rev0_2" data-val="250">250</td><td class="var" data-var="q0_2" data-val="500">500</td><td class="var" data-var="p1_2" data-val="500">500</td><td class="var" data-var="q1_2" data-val="600">600</td></tr><tr><td>Детский</td><td class="var" data-var="rev0_3" data-val="480">480</td><td class="var" data-var="q0_3" data-val="1200">1200</td><td class="var" data-var="p1_3" data-val="450">450</td><td class="var" data-var="q1_3" data-val="800">800</td></tr></table>',
        solve: function(v) {
            var p0_1 = v.rev0_1*1000/v.q0_1, p0_2 = v.rev0_2*1000/v.q0_2, p0_3 = v.rev0_3*1000/v.q0_3;
            var p0q0 = p0_1*v.q0_1 + p0_2*v.q0_2 + p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = p0_1*v.q1_1 + p0_2*v.q1_2 + p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим p₀</h3>';
            html += '<p>p₀(взр) = <b>'+p0_1.toFixed(0)+' руб.</b> | p₀(льг) = <b>'+p0_2.toFixed(0)+' руб.</b> | p₀(дет) = <b>'+p0_3.toFixed(0)+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0.toFixed(0)+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1.toFixed(0)+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq.toFixed(0)+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка цирка изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq.toFixed(0)+' руб.' };
        }
    },
    {
        id: "task_cinema_12", title: "ЗАДАЧА: КИНОТЕАТР (НАЙТИ p₁)",
        description: "В июле дана выручка в тыс. руб. Найдите цену билета в июле (p₁).",
        colors: { p0: "#60a5fa", q0: "#4ade80", rev1: "#fb923c", q1: "#c084fc" },
        formulas: ["p₁ = Выручка₁ / q₁", "I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "rev1_1", "q1_1", "p0_2", "q0_2", "rev1_2", "q1_2", "p0_3", "q0_3", "rev1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">Май: цена (руб.)</th><th style="width:18.75%">Май: продано (шт.)</th><th style="width:18.75%">Июл: выручка (тыс.руб.)</th><th style="width:18.75%">Июл: продано (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="500">500</td><td class="var" data-var="rev1_1" data-val="360">360</td><td class="var" data-var="q1_1" data-val="600">600</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="400">400</td><td class="var" data-var="q0_2" data-val="600">600</td><td class="var" data-var="rev1_2" data-val="320">320</td><td class="var" data-var="q1_2" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="300">300</td><td class="var" data-var="q0_3" data-val="550">550</td><td class="var" data-var="rev1_3" data-val="210">210</td><td class="var" data-var="q1_3" data-val="600">600</td></tr></table>',
        solve: function(v) {
            var p1_1 = v.rev1_1*1000/v.q1_1, p1_2 = v.rev1_2*1000/v.q1_2, p1_3 = v.rev1_3*1000/v.q1_3;
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = p1_1*v.q1_1 + p1_2*v.q1_2 + p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Шаг 1. Находим p₁</h3>';
            html += '<p>p₁(взр) = <b>'+p1_1.toFixed(0)+' руб.</b> | p₁(льг) = <b>'+p1_2.toFixed(0)+' руб.</b> | p₁(дет) = <b>'+p1_3.toFixed(0)+' руб.</b></p></div>';
            html += '<div class="step"><h3>Шаг 2. Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1.toFixed(0)+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq.toFixed(0)+' руб.</b> | ΔЦен = <b>'+dp.toFixed(0)+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка кинотеатра изменилась на '+dpq.toFixed(0)+' руб. За счёт цен: '+dp.toFixed(0)+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    },
    {
        id: "task_theater_old", title: "ЗАДАЧА: ТЕАТР (БАЗОВАЯ)",
        description: "Базовая задача для отработки индексного метода.",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁×q₁) / Σ(p₀×q₀)", "ΔВыручка = Σ(p₁×q₁) - Σ(p₀×q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table class="task-table"><tr><th style="width:25%">Тип билета</th><th style="width:18.75%">p₀ (руб.)</th><th style="width:18.75%">q₀ (шт.)</th><th style="width:18.75%">p₁ (руб.)</th><th style="width:18.75%">q₁ (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-var="p0_1" data-val="500">500</td><td class="var" data-var="q0_1" data-val="1000">1000</td><td class="var" data-var="p1_1" data-val="600">600</td><td class="var" data-var="q1_1" data-val="1200">1200</td></tr><tr><td>Льготный</td><td class="var" data-var="p0_2" data-val="250">250</td><td class="var" data-var="q0_2" data-val="500">500</td><td class="var" data-var="p1_2" data-val="300">300</td><td class="var" data-var="q1_2" data-val="600">600</td></tr><tr><td>Детский</td><td class="var" data-var="p0_3" data-val="100">100</td><td class="var" data-var="q0_3" data-val="300">300</td><td class="var" data-var="p1_3" data-val="150">150</td><td class="var" data-var="q1_3" data-val="400">400</td></tr></table>',
        solve: function(v) {
            var p0q0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
            var p1q1 = v.p1_1*v.q1_1 + v.p1_2*v.q1_2 + v.p1_3*v.q1_3;
            var p0q1 = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
            var dpq = p1q1 - p0q0, dp = p1q1 - p0q1, dq = p0q1 - p0q0;
            var html = '<div class="step"><h3>Расчёт</h3><p>Σp₀q₀ = <b>'+p0q0+'</b> | Σp₁q₁ = <b>'+p1q1+'</b> | Σp₀q₁ = <b>'+p0q1+'</b></p><p>ΔОбщее = <b>'+dpq+' руб.</b> | ΔЦен = <b>'+dp+' руб.</b> | ΔКол-ва = <b>'+dq+' руб.</b></p></div>';
            return { calc: html, conclusion: 'Выручка изменилась на '+dpq+' руб. За счёт цен: '+dp+' руб., за счёт кол-ва: '+dq+' руб.' };
        }
    }
];
