var statisticsTasks = [
    // ==========================================
    // ТЕМА 1: ИНДЕКСЫ (СУЩЕСТВУЮЩИЕ ЗАДАЧИ)
    // ==========================================
    {
        topicId: "topic1",
        topicName: "Тема 1. Индексы выручки",
        id: "task_1_1",
        title: "ЗАДАЧА 1.1: МУЗЕЙ (КЛАССИЧЕСКАЯ)",
        description: "Музей предлагает три типа билетов. Все данные (цены и количество) даны явно. Оцените изменение выручки.",
        type: "index_table",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["I_pq = Σ(p₁q₁) / Σ(p₀q₀)", "I_p = Σ(p₁q₁) / Σ(p₀q₁)", "I_q = Σ(p₀q₁) / Σ(p₀q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1_1", "q1_1", "p0_2", "q0_2", "p1_2", "q1_2", "p0_3", "q0_3", "p1_3", "q1_3"],
        html: '<table style="width:100%; table-layout:fixed; border-collapse:collapse; background:#2d3748; color:white; border-radius:8px;"><tr><th style="width:22%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Тип<br>билета</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Янв:<br>цена<br>(руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Янв:<br>продано<br>(шт.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Мар:<br>цена<br>(руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Мар:<br>продано<br>(шт.)</th></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Взрослый</td><td class="var" data-var="p0_1" data-val="300" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">300</td><td class="var" data-var="q0_1" data-val="1200" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">1200</td><td class="var" data-var="p1_1" data-val="350" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">350</td><td class="var" data-var="q1_1" data-val="1100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">1100</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Льготный</td><td class="var" data-var="p0_2" data-val="150" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">150</td><td class="var" data-var="q0_2" data-val="800" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">800</td><td class="var" data-var="p1_2" data-val="180" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">180</td><td class="var" data-var="q1_2" data-val="750" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">750</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Детский</td><td class="var" data-var="p0_3" data-val="100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">100</td><td class="var" data-var="q0_3" data-val="500" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">500</td><td class="var" data-var="p1_3" data-val="120" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">120</td><td class="var" data-var="q1_3" data-val="600" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">600</td></tr></table>',
        solve: function(v) {
            var s_p0q0 = (v.p0_1*v.q0_1)+(v.p0_2*v.q0_2)+(v.p0_3*v.q0_3);
            var s_p1q1 = (v.p1_1*v.q1_1)+(v.p1_2*v.q1_2)+(v.p1_3*v.q1_3);
            var s_p0q1 = (v.p0_1*v.q1_1)+(v.p0_2*v.q1_2)+(v.p0_3*v.q1_3);
            var I_pq = (s_p1q1/s_p0q0*100).toFixed(1); var I_p = (s_p1q1/s_p0q1*100).toFixed(1); var I_q = (s_p0q1/s_p0q0*100).toFixed(1);
            var dT = s_p1q1-s_p0q0; var dP = s_p1q1-s_p0q1; var dQ = s_p0q1-s_p0q0;
            var c0='color:#60a5fa;', c1='color:#4ade80;', c2='color:#fbbf24;', c3='color:#c084fc;';

            var h = '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 1. Совокупные величины (Выручка)</h3>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">Σp₀q₀ (Январь) = (<span style="'+c0+'">'+v.p0_1+'</span>×<span style="'+c1+'">'+v.q0_1+'</span>) + ... = <b>'+s_p0q0+'</b> руб.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">Σp₁q₁ (Март) = (<span style="'+c2+'">'+v.p1_1+'</span>×<span style="'+c3+'">'+v.q1_1+'</span>) + ... = <b>'+s_p1q1+'</b> руб.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">Σp₀q₁ (Условная) = (<span style="'+c0+'">'+v.p0_1+'</span>×<span style="'+c3+'">'+v.q1_1+'</span>) + ... = <b>'+s_p0q1+'</b> руб.</p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-top:10px;">💡 Пояснение: Σp₀q₁ нужна, чтобы изолировать влияние изменения цен от изменения количества.</p></div>';

            h += '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 2. Индексы</h3>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">I_pq = <span style="'+c2+'">'+s_p1q1+'</span> / <span style="'+c1+'">'+s_p0q0+'</span> × 100 = <b>'+I_pq+'%</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Выручка в марте составила '+I_pq+'% от январской.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">I_p = <span style="'+c2+'">'+s_p1q1+'</span> / <span style="'+c3+'">'+s_p0q1+'</span> × 100 = <b>'+I_p+'%</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Эффект изменения цен при фиксированном количестве.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">I_q = <span style="'+c3+'">'+s_p0q1+'</span> / <span style="'+c1+'">'+s_p0q0+'</span> × 100 = <b>'+I_q+'%</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Эффект изменения количества при январских ценах.</p></div>';

            h += '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 3. Абсолютные изменения</h3>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">ΔОбщее = <b>'+dT+' руб.</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Реальное изменение кассы музея.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">ΔЦен = <b>'+dP+' руб.</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Вклад фактора цены в изменение выручки.</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">ΔКол-ва = <b>'+dQ+' руб.</b></p>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-left:20px;">→ Вклад фактора спроса (количества).</p></div>';

            var conclusionText = 'Выручка музея изменилась на '+dT+' руб. (индекс '+I_pq+'%). ';
            if (dP > 0) conclusionText += 'За счёт роста цен музей получил дополнительно '+dP+' руб. ';
            else conclusionText += 'Из-за снижения цен музей недополучил '+Math.abs(dP)+' руб. ';
            if (dQ > 0) conclusionText += 'За счёт увеличения числа посетителей выручка выросла ещё на '+dQ+' руб.';
            else conclusionText += 'Однако снижение числа посетителей уменьшило выручку на '+Math.abs(dQ)+' руб.';

            return { calc: h, conclusion: conclusionText };
        }
    },
    {
        topicId: "topic1",
        topicName: "Тема 1. Индексы выручки",
        id: "task_1_2",
        title: "ЗАДАЧА 1.2: МУЗЕЙ (НАЙТИ q₀)",
        description: "В январе дана выручка в тыс. руб. Сначала найдите количество проданных билетов (q₀), затем оцените изменение выручки.",
        type: "index_table",
        colors: { p0: "#60a5fa", p0q0: "#fb923c", p1: "#fbbf24", q1: "#c084fc" },
        formulas: ["q₀ = Выручка₀ / p₀", "I_pq = Σ(p₁q₁) / Σ(p₀q₀)"],
        requiredVars: ["p0_1", "p0q0_1", "p1_1", "q1_1", "p0_2", "p0q0_2", "p1_2", "q1_2", "p0_3", "p0q0_3", "p1_3", "q1_3"],
        html: '<table style="width:100%; table-layout:fixed; border-collapse:collapse; background:#2d3748; color:white; border-radius:8px;"><tr><th style="width:22%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Тип<br>билета</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Янв:<br>цена<br>(руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Янв:<br>выручка<br>(тыс.руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Мар:<br>цена<br>(руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Мар:<br>продано<br>(шт.)</th></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Взрослый</td><td class="var" data-var="p0_1" data-val="300" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">300</td><td class="var" data-var="p0q0_1" data-val="360" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">360</td><td class="var" data-var="p1_1" data-val="350" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">350</td><td class="var" data-var="q1_1" data-val="1100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">1100</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Льготный</td><td class="var" data-var="p0_2" data-val="150" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">150</td><td class="var" data-var="p0q0_2" data-val="120" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">120</td><td class="var" data-var="p1_2" data-val="180" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">180</td><td class="var" data-var="q1_2" data-val="750" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">750</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Детский</td><td class="var" data-var="p0_3" data-val="100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">100</td><td class="var" data-var="p0q0_3" data-val="50" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">50</td><td class="var" data-var="p1_3" data-val="120" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">120</td><td class="var" data-var="q1_3" data-val="600" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">600</td></tr></table>',
        solve: function(v) {
            var q0_1=(v.p0q0_1*1000)/v.p0_1; var q0_2=(v.p0q0_2*1000)/v.p0_2; var q0_3=(v.p0q0_3*1000)/v.p0_3;
            var s_p0q0=(v.p0_1*q0_1)+(v.p0_2*q0_2)+(v.p0_3*q0_3);
            var s_p1q1=(v.p1_1*v.q1_1)+(v.p1_2*v.q1_2)+(v.p1_3*v.q1_3);
            var s_p0q1=(v.p0_1*v.q1_1)+(v.p0_2*v.q1_2)+(v.p0_3*v.q1_3);
            var I_pq=(s_p1q1/s_p0q0*100).toFixed(1);
            var dT=s_p1q1-s_p0q0; var dP=s_p1q1-s_p0q1; var dQ=s_p0q1-s_p0q0;
            var c0='color:#60a5fa;', c_rev='color:#fb923c;', c2='color:#fbbf24;', c3='color:#c084fc;';

            var h = '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 1. Восстанавливаем q₀</h3>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-bottom:10px;"> q₀ = Выручка / Цена. Внимание: выручка в тыс. руб., умножаем на 1000!</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">q₀(взр) = <span style="'+c_rev+'">'+(v.p0q0_1*1000)+'</span> / <span style="'+c0+'">'+v.p0_1+'</span> = <b>'+q0_1.toFixed(0)+' шт.</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">q₀(льг) = <span style="'+c_rev+'">'+(v.p0q0_2*1000)+'</span> / <span style="'+c0+'">'+v.p0_2+'</span> = <b>'+q0_2.toFixed(0)+' шт.</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">q₀(дет) = <span style="'+c_rev+'">'+(v.p0q0_3*1000)+'</span> / <span style="'+c0+'">'+v.p0_3+'</span> = <b>'+q0_3.toFixed(0)+' шт.</b></p></div>';

            h += '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 2. Анализ</h3>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">Σp₀q₀ = <b>'+s_p0q0.toFixed(0)+'</b> | Σp₁q₁ = <b>'+s_p1q1+'</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">I_pq = <b>'+I_pq+'%</b> | ΔОбщее = <b>'+dT.toFixed(0)+' руб.</b></p></div>';

            var conclusionText = 'После восстановления данных: выручка изменилась на '+dT.toFixed(0)+' руб. (индекс '+I_pq+'%). ';
            if (dP > 0) conclusionText += 'Фактор цен сыграл положительную роль (+'+dP+' руб.). ';
            else conclusionText += 'Цены снизились, что уменьшило выручку на '+Math.abs(dP)+' руб. ';
            if (dQ > 0) conclusionText += 'Рост посещаемости добавил '+dQ.toFixed(0)+' руб.';
            else conclusionText += 'Падение спроса стоило музею '+Math.abs(dQ.toFixed(0))+' руб.';

            return { calc: h, conclusion: conclusionText };
        }
    },
    {
        topicId: "topic1",
        topicName: "Тема 1. Индексы выручки",
        id: "task_1_3",
        title: "ЗАДАЧА 1.3: ТЕАТР (НАЙТИ p₁)",
        description: "В апреле дана выручка в тыс. руб. Сначала найдите цену билета (p₁), затем оцените изменение выручки.",
        type: "index_table",
        colors: { p0: "#60a5fa", q0: "#4ade80", p1q1: "#fb923c", q1: "#c084fc" },
        formulas: ["p₁ = Выручка₁ / q₁", "I_pq = Σ(p₁q₁) / Σ(p₀q₀)"],
        requiredVars: ["p0_1", "q0_1", "p1q1_1", "q1_1", "p0_2", "q0_2", "p1q1_2", "q1_2", "p0_3", "q0_3", "p1q1_3", "q1_3"],
        html: '<table style="width:100%; table-layout:fixed; border-collapse:collapse; background:#2d3748; color:white; border-radius:8px;"><tr><th style="width:22%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Тип<br>билета</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Фев:<br>цена<br>(руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Фев:<br>продано<br>(шт.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Апр:<br>выручка<br>(тыс.руб.)</th><th style="width:19.5%; padding:15px 5px; border:1px solid #4a5568; color:#ecc94b; line-height:1.4; font-size:14px;">Апр:<br>продано<br>(шт.)</th></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Взрослый</td><td class="var" data-var="p0_1" data-val="500" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">500</td><td class="var" data-var="q0_1" data-val="1100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">1100</td><td class="var" data-var="p1q1_1" data-val="520" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">520</td><td class="var" data-var="q1_1" data-val="1300" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">1300</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Льготный</td><td class="var" data-var="p0_2" data-val="250" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">250</td><td class="var" data-var="q0_2" data-val="800" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">800</td><td class="var" data-var="p1q1_2" data-val="160" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">160</td><td class="var" data-var="q1_2" data-val="800" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">800</td></tr><tr><td style="padding:15px 5px; border:1px solid #4a5568; text-align:center; font-weight:bold;">Детский</td><td class="var" data-var="p0_3" data-val="100" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">100</td><td class="var" data-var="q0_3" data-val="600" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">600</td><td class="var" data-var="p1q1_3" data-val="90" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">90</td><td class="var" data-var="q1_3" data-val="600" style="padding:15px 5px; border:1px solid #4a5568; text-align:center; cursor:pointer; color:#63b3ed; text-decoration:underline; font-weight:bold;">600</td></tr></table>',
        solve: function(v) {
            var p1_1=(v.p1q1_1*1000)/v.q1_1; var p1_2=(v.p1q1_2*1000)/v.q1_2; var p1_3=(v.p1q1_3*1000)/v.q1_3;
            var s_p0q0=(v.p0_1*v.q0_1)+(v.p0_2*v.q0_2)+(v.p0_3*v.q0_3);
            var s_p1q1=(p1_1*v.q1_1)+(p1_2*v.q1_2)+(p1_3*v.q1_3);
            var s_p0q1=(v.p0_1*v.q1_1)+(v.p0_2*v.q1_2)+(v.p0_3*v.q1_3);
            var I_pq=(s_p1q1/s_p0q0*100).toFixed(1);
            var dT=s_p1q1-s_p0q0; var dP=s_p1q1-s_p0q1; var dQ=s_p0q1-s_p0q0;
            var c0='color:#60a5fa;', c1='color:#4ade80;', c_rev='color:#fb923c;', c3='color:#c084fc;', c_p1='color:#38bdf8;';

            var h = '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 1. Находим p₁</h3>';
            h += '<p style="color:#a0aec0; font-size:13px; margin-bottom:10px;">💡 p₁ = Выручка / Количество. Не забудьте перевести тыс. руб. в рубли!</p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">p₁(взр) = <span style="'+c_rev+'">'+(v.p1q1_1*1000)+'</span> / <span style="'+c3+'">'+v.q1_1+'</span> = <b style="'+c_p1+'">'+p1_1.toFixed(0)+' руб.</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">p₁(льг) = <span style="'+c_rev+'">'+(v.p1q1_2*1000)+'</span> / <span style="'+c3+'">'+v.q1_2+'</span> = <b style="'+c_p1+'">'+p1_2.toFixed(0)+' руб.</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">p₁(дет) = <span style="'+c_rev+'">'+(v.p1q1_3*1000)+'</span> / <span style="'+c3+'">'+v.q1_3+'</span> = <b style="'+c_p1+'">'+p1_3.toFixed(0)+' руб.</b></p></div>';

            h += '<div style="background:#1a202c; border:1px solid #48bb78; padding:20px; border-radius:12px; margin-bottom:20px;"><h3 style="color:#ecc94b; margin-top:0; border-bottom:1px solid #2d3748; padding-bottom:10px;">Шаг 2. Анализ</h3>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">Σp₀q₀ = <b>'+s_p0q0+'</b> | Σp₁q₁ = <b>'+s_p1q1.toFixed(0)+'</b></p>';
            h += '<p style="font-family:monospace; color:#e2e8f0; font-size:15px; margin:8px 0;">I_pq = <b>'+I_pq+'%</b> | ΔОбщее = <b>'+dT.toFixed(0)+' руб.</b></p></div>';

            var conclusionText = 'Выручка театра изменилась на '+dT.toFixed(0)+' руб. (индекс '+I_pq+'%). ';
            if (dP > 0) conclusionText += 'Изменение цен принесло театру +'+dP.toFixed(0)+' руб. ';
            else conclusionText += 'Снижение цен обошлось театру в '+Math.abs(dP.toFixed(0))+' руб. ';
            if (dQ > 0) conclusionText += 'А рост зрительского спроса добавил ещё '+dQ+' руб.';
            else conclusionText += 'Но падение интереса зрителей уменьшило сборы на '+Math.abs(dQ)+' руб.';

            return { calc: h, conclusion: conclusionText };
        }
    },

    // ==========================================
    // ТЕМА 2: СВОДКА И ГРУППИРОВКА (НОВЫЕ ЗАДАЧИ)
    // ==========================================
    {
        topicId: "topic2",
        topicName: "Тема 2. Статистическое наблюдение, сводка и группировка",
        id: "task_2_1",
        title: "ЗАДАЧА 2.1: ЛОГИЧЕСКИЙ КОНТРОЛЬ ПЕРЕПИСИ",
        description: "Проверьте взаимную согласованность ответов переписного листа. Для каждой пары сведений решите, требуется ли дополнительная проверка. Отмечайте возможные противоречия, а не пытайтесь угадать, какое отдельное поле ошибочно.",
        type: "logic_audit",
        status: "testing",
        source: "Тема 2. Статистическое наблюдение, сводка и группировка статистических данных — задача 1 (PDF преподавателя)",
        records: [
            {label: "а) Фамилия, имя, отчество", value: "Иванова Ирина Петровна"},
            {label: "б) Пол", value: "мужской"},
            {label: "в) Возраст", value: "5 лет"},
            {label: "г) Состоит ли в браке в настоящее время", value: "да"},
            {label: "д) Национальность", value: "русская"},
            {label: "е) Родной язык", value: "русский"},
            {label: "ж) Образование", value: "высшее"},
            {label: "з) Место работы", value: "детский сад"},
            {label: "и) Занятие по этому месту работы", value: "медицинская сестра"}
        ],
        checks: [
            {id: "name_gender", title: "ФИО ↔ пол", hint: "Иванова Ирина Петровна / мужской", expected: "review"},
            {id: "age_marriage", title: "Возраст ↔ брак", hint: "5 лет / состоит в браке", expected: "review"},
            {id: "age_education", title: "Возраст ↔ образование", hint: "5 лет / высшее", expected: "review"},
            {id: "age_work", title: "Возраст ↔ трудовая деятельность", hint: "5 лет / медицинская сестра", expected: "review"},
            {id: "language_nationality", title: "Национальность ↔ родной язык", hint: "русская / русский", expected: "compatible"},
            {id: "work_occupation", title: "Место работы ↔ занятие", hint: "детский сад / медицинская сестра", expected: "compatible"}
        ],
        guideSteps: [
            {
                title: "Понимаем задачу логического контроля",
                question: "Что мы должны искать: неправильные слова сами по себе или несогласованность сведений между собой?",
                body: "<p>Логический контроль — проверка <strong>взаимной согласованности</strong> ответов. Отдельная запись может выглядеть правдоподобно, но в сочетании с другой вызывать сомнения.</p><p class='logic-step-note'>Важно: мы определяем сведения, которые <strong>нужно уточнить</strong>, а не обвиняем опрашиваемого в ошибке.</p>"
            },
            {
                title: "Сравниваем ФИО и запись о поле",
                question: "Почему это сочетание привлекает внимание проверяющего, но ещё не является доказанной ошибкой?",
                body: "<p>Имя и отчество «Ирина Петровна» обычно воспринимаются как женские, тогда как указан мужской пол. При традиционной проверке переписного листа запись следует <strong>уточнить</strong>.</p><p class='logic-step-note'>Имя само по себе не определяет пол человека безошибочно. Поэтому корректный вывод — проверить сведения, а не автоматически заменить запись.</p>"
            },
            {
                title: "Проверяем возраст и семейное положение",
                question: "Согласуется ли возраст 5 лет с указанием, что человек состоит в браке?",
                body: "<p>Сочетание <strong>«5 лет» + «состоит в браке»</strong> требует проверки: такой возраст не соответствует обычному юридическому и жизненному контексту заключения брака.</p><p class='logic-step-note'>Нельзя заранее знать, ошибочно ли указан возраст или семейное положение. Проверяем исходную запись.</p>"
            },
            {
                title: "Сравниваем возраст, образование и занятость",
                question: "Какие сведения о пятилетнем ребёнке выглядят неправдоподобно?",
                body: "<p>Высшее образование и профессиональная занятость медицинской сестрой <strong>не согласуются</strong> с указанным возрастом 5 лет. Оба сочетания требуют уточнения.</p><p class='logic-step-note'>При этом само сочетание «детский сад + медицинская сестра» допустимо: в детском саду может работать медицинский специалист.</p>"
            },
            {
                title: "Отделяем сомнительные сочетания от согласованных",
                question: "Почему нельзя считать все девять строк переписного листа ошибочными?",
                body: "<p>Национальность «русская» и родной язык «русский» не противоречат друг другу. Место работы «детский сад» и занятие «медицинская сестра» тоже совместимы.</p><p><strong>Вывод:</strong> уточнения требуют сочетания ФИО и пола; возраста и брака; возраста и высшего образования; возраста и профессиональной занятости. Это <strong>не означает</strong>, что ошибка обязательно находится в каждом из соответствующих полей.</p>"
            }
        ]
    },
    {
        topicId: "topic2",
        topicName: "Тема 2. Статистическое наблюдение, сводка и группировка",
        id: "task_2_2",
        title: "ЗАДАЧА 2.2: ГРУППИРОВКА СОТРУДНИКОВ",
        status: "testing",
        type: "grouping_frequency",
        source: "Тема 2. Статистическое наблюдение, сводка и группировка статистических данных — задача 2 (PDF преподавателя)",
        description: "Рассмотрите сведения о 25 сотрудниках. Составьте две таблицы частот: по полу и по уровню образования. Укажите количество сотрудников в каждой группе.",
        employees: [
        {
                "number": 1,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 2,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 3,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 4,
                "education": "Незаконченное высшее",
                "gender": "Женщина"
        },
        {
                "number": 5,
                "education": "Среднее",
                "gender": "Мужчина"
        },
        {
                "number": 6,
                "education": "Среднее специальное",
                "gender": "Женщина"
        },
        {
                "number": 7,
                "education": "Среднее",
                "gender": "Мужчина"
        },
        {
                "number": 8,
                "education": "Среднее",
                "gender": "Женщина"
        },
        {
                "number": 9,
                "education": "Незаконченное высшее",
                "gender": "Женщина"
        },
        {
                "number": 10,
                "education": "Среднее специальное",
                "gender": "Женщина"
        },
        {
                "number": 11,
                "education": "Среднее специальное",
                "gender": "Женщина"
        },
        {
                "number": 12,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 13,
                "education": "Среднее специальное",
                "gender": "Мужчина"
        },
        {
                "number": 14,
                "education": "Высшее",
                "gender": "Женщина"
        },
        {
                "number": 15,
                "education": "Незаконченное высшее",
                "gender": "Мужчина"
        },
        {
                "number": 16,
                "education": "Высшее",
                "gender": "Женщина"
        },
        {
                "number": 17,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 18,
                "education": "Среднее",
                "gender": "Мужчина"
        },
        {
                "number": 19,
                "education": "Среднее специальное",
                "gender": "Мужчина"
        },
        {
                "number": 20,
                "education": "Высшее",
                "gender": "Мужчина"
        },
        {
                "number": 21,
                "education": "Среднее",
                "gender": "Женщина"
        },
        {
                "number": 22,
                "education": "Среднее специальное",
                "gender": "Мужчина"
        },
        {
                "number": 23,
                "education": "Среднее специальное",
                "gender": "Женщина"
        },
        {
                "number": 24,
                "education": "Незаконченное среднее",
                "gender": "Мужчина"
        },
        {
                "number": 25,
                "education": "Среднее специальное",
                "gender": "Мужчина"
        }
],
        categories: [
        {
                "id": "male",
                "category": "gender",
                "label": "Мужчины",
                "count": 15
        },
        {
                "id": "female",
                "category": "gender",
                "label": "Женщины",
                "count": 10
        },
        {
                "id": "higher",
                "category": "education",
                "label": "Высшее",
                "count": 8
        },
        {
                "id": "incompleteHigher",
                "category": "education",
                "label": "Незаконченное высшее",
                "count": 3
        },
        {
                "id": "secondary",
                "category": "education",
                "label": "Среднее",
                "count": 5
        },
        {
                "id": "vocational",
                "category": "education",
                "label": "Среднее специальное",
                "count": 8
        },
        {
                "id": "incompleteSecondary",
                "category": "education",
                "label": "Незаконченное среднее",
                "count": 1
        }
],
        guideSteps: [
        {
                "title": "Определяем признак группировки",
                "question": "Почему для одних и тех же сотрудников получатся две разные таблицы?",
                "body": "<p>В задании есть <strong>25 сотрудников</strong> и два признака: <strong>пол</strong> и <strong>уровень образования</strong>. Выполним <strong>две самостоятельные группировки</strong>: сначала посчитаем сотрудников каждого пола, затем — каждого уровня образования.</p><p class=\"group-step-note\">Единица наблюдения — один сотрудник. Каждый сотрудник должен быть учтён ровно один раз <em>в каждой</em> группировке.</p>"
        },
        {
                "title": "Группируем сотрудников по полу",
                "question": "Как проверить, что при подсчёте мужчин и женщин мы никого не пропустили?",
                "body": "<p><strong>Мужчины — 15 человек.</strong> Номера записей: 1, 2, 3, 5, 7, 12, 13, 15, 17, 18, 19, 20, 22, 24, 25.</p><p><strong>Женщины — 10 человек.</strong> Номера записей: 4, 6, 8, 9, 10, 11, 14, 16, 21, 23.</p><p class=\"group-formula\">15 + 10 = 25 человек</p><p class=\"group-step-note\">Общее число должно совпадать с количеством исходных наблюдений: 25.</p>"
        },
        {
                "title": "Группируем сотрудников по образованию",
                "question": "Сколько непересекающихся категорий образования встречается в исходном списке?",
                "body": "<p>В исходных сведениях встречаются <strong>пять категорий</strong>:</p><div class=\"group-guide-list\"><div><strong>Высшее — 8 чел.</strong><span>№ 1, 2, 3, 12, 14, 16, 17, 20</span></div><div><strong>Незаконченное высшее — 3 чел.</strong><span>№ 4, 9, 15</span></div><div><strong>Среднее — 5 чел.</strong><span>№ 5, 7, 8, 18, 21</span></div><div><strong>Среднее специальное — 8 чел.</strong><span>№ 6, 10, 11, 13, 19, 22, 23, 25</span></div><div><strong>Незаконченное среднее — 1 чел.</strong><span>№ 24</span></div></div><p class=\"group-step-note\">«Незаконченное высшее» и «незаконченное среднее» — отдельные группы; нельзя автоматически присоединять их к высшему или среднему образованию.</p>"
        },
        {
                "title": "Проверяем правильность сводки",
                "question": "Почему сумма по образованию тоже должна равняться 25, хотя мы уже получили 25 по полу?",
                "body": "<p>Мы группируем <strong>одних и тех же</strong> сотрудников по <strong>разным признакам</strong>. Поэтому каждая таблица должна включать всех 25 человек.</p><p class=\"group-formula\">По полу: 15 + 10 = 25</p><p class=\"group-formula\">По образованию: 8 + 3 + 5 + 8 + 1 = 25</p><p class=\"group-step-note\">Если сумма отличается от 25, значит, кого-то пропустили или учли дважды. Это простая, но важная контрольная проверка статистической сводки.</p>"
        },
        {
                "title": "Формулируем статистический вывод",
                "question": "Какие особенности структуры персонала можно увидеть по двум таблицам?",
                "body": "<p><strong>Из 25 сотрудников 15 мужчин и 10 женщин.</strong> Мужчин на пять человек больше.</p><p><strong>Наиболее многочисленные группы по образованию</strong> — с высшим и средним специальным образованием: по восемь человек в каждой.</p><p>Дополнительно можно рассчитать удельные веса: мужчины — 60%, женщины — 40%; каждая из двух самых многочисленных образовательных групп составляет 32% персонала.</p><p class=\"group-step-note\">В исходном задании преподаватель требует именно группировку по двум признакам. Доли здесь даны как дополнительное пояснение, чтобы лучше понять структуру сотрудников.</p>"
        }
]
    },
    {
        "topicId": "topic2",
        "topicName": "Тема 2. Статистическое наблюдение, сводка и группировка",
        "id": "task_2_3",
        "status": "testing",
        "title": "ЗАДАЧА 2.3: ГРУППИРОВКА РЕКЛАМНЫХ АГЕНТСТВ",
        "description": "Сгруппируйте 16 рекламных агентств по объёму печатной продукции в три группы. Для каждой группы определите число агентств, суммарный объём продукции и фонд заработной платы. Сделайте вывод.",
        "source": "Задачи сводка и группировка стат.данных.pdf, тема 2, задача 3, стр. 1–2",
        "type": "agency_intervals",
        "intervals": [
            {
                "label": "105 ≤ x < 205",
                "short": "105–205",
                "name": "Группа 1"
            },
            {
                "label": "205 ≤ x < 305",
                "short": "205–305",
                "name": "Группа 2"
            },
            {
                "label": "305 ≤ x ≤ 405",
                "short": "305–405",
                "name": "Группа 3"
            }
        ],
        "agencies": [
            {
                "number": 1,
                "production": 124.8,
                "wages": 19.8
            },
            {
                "number": 2,
                "production": 256.0,
                "wages": 38.4
            },
            {
                "number": 3,
                "production": 190.7,
                "wages": 31.3
            },
            {
                "number": 4,
                "production": 185.0,
                "wages": 31.4
            },
            {
                "number": 5,
                "production": 403.2,
                "wages": 56.4
            },
            {
                "number": 6,
                "production": 115.0,
                "wages": 19.6
            },
            {
                "number": 7,
                "production": 106.5,
                "wages": 17.2
            },
            {
                "number": 8,
                "production": 350.0,
                "wages": 49.7
            },
            {
                "number": 9,
                "production": 110.0,
                "wages": 17.7
            },
            {
                "number": 10,
                "production": 256.3,
                "wages": 40.9
            },
            {
                "number": 11,
                "production": 187.5,
                "wages": 30.7
            },
            {
                "number": 12,
                "production": 140.8,
                "wages": 23.2
            },
            {
                "number": 13,
                "production": 167.3,
                "wages": 27.0
            },
            {
                "number": 14,
                "production": 208.2,
                "wages": 32.2
            },
            {
                "number": 15,
                "production": 135.4,
                "wages": 21.9
            },
            {
                "number": 16,
                "production": 370.2,
                "wages": 51.8
            }
        ],
        "guideSteps": [
            {
                "title": "Определяем размах и ширину интервала",
                "question": "Почему мы выбрали именно такие границы для трёх групп?",
                "body": "<p>Минимальное значение — <strong>106,5 млн руб.</strong>, максимальное — <strong>403,2 млн руб.</strong> Размах: <strong>403,2 − 106,5 = 296,7 млн руб.</strong>.</p><p>Для трёх равных интервалов теоретическая ширина <strong>296,7 / 3 = 98,9 млн руб.</strong>. Для удобной записи округляем её до <strong>100 млн руб.</strong>, выбираем начало <strong>105</strong> и получаем три равных интервала: 105–205; 205–305; 305–405.</p><p class=\"agency-step-note\">Границы интервалов — наше учебное соглашение, поскольку преподаватель задал три группы, но не указал числовые границы. Левую границу включаем, правую не включаем (кроме последней).</p>"
            },
            {
                "title": "Распределяем агентства по интервалам",
                "question": "Как понять, в какую группу попадает каждое агентство?",
                "body": "<p><strong>105–205:</strong> № 1, 3, 4, 6, 7, 9, 11, 12, 13, 15 — <strong>10 агентств</strong>.</p><p><strong>205–305:</strong> № 2, 10, 14 — <strong>3 агентства</strong>.</p><p><strong>305–405:</strong> № 5, 8, 16 — <strong>3 агентства</strong>.</p><p class=\"agency-step-note\">Контроль полноты группировки: 10 + 3 + 3 = 16. Никто не потерян и не учтён дважды.</p>"
            },
            {
                "title": "Суммируем объём печатной продукции",
                "question": "Каким образом получить общий объём продукции внутри каждой группы?",
                "body": "<p><strong>Группа 1:</strong> 124,8 + 190,7 + 185,0 + 115,0 + 106,5 + 110,0 + 187,5 + 140,8 + 167,3 + 135,4 = <strong>1 463,0 млн руб.</strong></p><p><strong>Группа 2:</strong> 256,0 + 256,3 + 208,2 = <strong>720,5 млн руб.</strong></p><p><strong>Группа 3:</strong> 403,2 + 350,0 + 370,2 = <strong>1 123,4 млн руб.</strong></p><p class=\"agency-step-note\">Проверка: 1 463,0 + 720,5 + 1 123,4 = 3 306,9 млн руб. — общий объём продукции всех 16 агентств.</p>"
            },
            {
                "title": "Суммируем фонд заработной платы",
                "question": "Какие значения следует складывать при расчёте фонда заработной платы?",
                "body": "<p>Складываем <strong>столбец фонда оплаты труда</strong> тех же агентств, которые отнесены к соответствующим интервалам.</p><p><strong>Группа 1:</strong> 19,8 + 31,3 + 31,4 + 19,6 + 17,2 + 17,7 + 30,7 + 23,2 + 27,0 + 21,9 = <strong>239,8 млн руб.</strong></p><p><strong>Группа 2:</strong> 38,4 + 40,9 + 32,2 = <strong>111,5 млн руб.</strong></p><p><strong>Группа 3:</strong> 56,4 + 49,7 + 51,8 = <strong>157,9 млн руб.</strong></p><p class=\"agency-step-note\">Проверка: 239,8 + 111,5 + 157,9 = 509,2 млн руб. — фонд заработной платы всех агентств.</p>"
            },
            {
                "title": "Формулируем статистический вывод",
                "question": "Что показывает построенная группировка?",
                "body": "<p>В первой группе с выпуском продукции менее 205 млн руб. — <strong>10 из 16 агентств (62,5%)</strong>. При этом она выпускает 1 463,0 млн руб. продукции из 3 306,9 млн руб. совокупно (примерно 44,2%).</p><p>В двух более крупных по выпуску группах вместе — <strong>6 агентств</strong>, но на них приходится 1 843,9 млн руб. продукции (примерно 55,8%).</p><p><strong>Вывод:</strong> больше всего агентств находится в нижнем интервале, но меньшинство с более высоким выпуском обеспечивает большую часть общего объёма печатной продукции.</p><p class=\"agency-step-note\">Процентные доли здесь — дополнительные пояснения; в исходном задании требовались число, выпуск продукции, фонд заработной платы и вывод.</p>"
            }
        ]
    },
    {
        "topicId": "topic4",
        "topicName": "Тема 4. Абсолютные и относительные величины",
        "id": "task_4_1",
        "status": "testing",
        "type": "graduation_ratios",
        "title": "ЗАДАЧА 4.1: ВЫПУСКНИКИ УНИВЕРСИТЕТА",
        "description": "По плановым и фактическим данным о выпускниках университета за 2025 год определите общую численность выпускников, выполнение плана, структуру фактического выпуска и относительные величины координации. Представьте результаты в таблице и сформулируйте вывод.",
        "source": "Тема 4 Задачи абсолютные и относительные величины.pdf; задача 1, стр. 1",
        "categories": [
            {
                "id": "bachelor",
                "label": "Бакалавры",
                "plan": 2200,
                "actual": 2150
            },
            {
                "id": "specialist",
                "label": "Специалисты",
                "plan": 2000,
                "actual": 1980
            },
            {
                "id": "master",
                "label": "Магистры",
                "plan": 500,
                "actual": 550
            }
        ],
        "coordinationBase": "Бакалавры = 100 (учебное соглашение)"
    },
    {
        "topicId": "topic4",
        "topicName": "Тема 4. Абсолютные и относительные величины",
        "id": "task_4_2",
        "status": "testing",
        "type": "equipment_dynamics",
        "title": "ЗАДАЧА 4.2: ОБНОВЛЕНИЕ МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЙ БАЗЫ",
        "description": "По данным об обновлении материально-технического оснащения учреждений культуры за 2023 и 2024 годы определите динамику расходов по каждому виду оснащения и в целом, а также структуру расходов обоих лет. Составьте итоговую таблицу и сформулируйте вывод.",
        "source": "Тема 4 Задачи абсолютные и относительные величины.pdf, задача 2, стр. 1",
        "categories": [
            {
                "id": "repair",
                "label": "Ремонтные работы",
                "old": 50000,
                "recent": 51000
            },
            {
                "id": "computers",
                "label": "Компьютерная техника",
                "old": 28000,
                "recent": 25000
            },
            {
                "id": "furniture",
                "label": "Мебель",
                "old": 20000,
                "recent": 10800
            }
        ]
    },
    {
        topicId: "topic4",
        topicName: "Тема 4. Абсолютные и относительные величины",
        id: "task_4_3",
        status: "testing",
        type: "productivity_compound",
        title: "ЗАДАЧА 4.3: ПРОИЗВОДИТЕЛЬНОСТЬ ТРУДА",
        description: "В прошлом году уровень годовой производительности труда составил 170 млн руб. По плану он должен возрасти на 3,0%. План по уровню производительности труда перевыполнен на 2,0%. Определите фактический уровень производительности труда.",
        source: "Тема 4 Задачи абсолютные и относительные величины.pdf, задача 3, стр. 1",
        previousLevel: 170,
        planIncreasePercent: 3,
        planOverfulfilPercent: 2
    },
    {
        topicId: "topic5",
        topicName: "Тема 5. Средние статистические показатели",
        id: "task_5_1",
        status: "testing",
        type: "weighted_mean_rank",
        title: "ЗАДАЧА 5.1: СРЕДНИЙ РАЗРЯД СОТРУДНИКОВ",
        description: "По данным о квалификации сотрудников определите средний разряд. Учтите, что сотрудников с разными разрядами неодинаковое количество.",
        source: "Задачи  средние статистические показатели.pdf, тема 5, задача 1, стр. 1",
        ranks: [1, 2, 3, 4, 5, 6],
        counts: [36, 34, 33, 27, 24, 26]
    }    ,{
        topicId: "topic5",
        topicName: "Тема 5. Средние статистические показатели",
        id: "task_5_2",
        status: "testing",
        type: "bank_weighted_mean",
        title: "ЗАДАЧА 5.2: СРЕДНИЙ БАНКОВСКИЙ ВКЛАД",
        description: "По трём районам города известны число отделений банков, среднее количество вкладов в отделении и средний размер одного вклада (тыс. руб.). Определите средний размер вклада по всем трём районам.",
        source: "Задачи  средние статистические показатели.pdf, тема 5, задача 2, стр. 1",
        districts: [
            {name: "Ленинский", branches: 4, perBranch: 1376, average: 275},
            {name: "Жовтневый", branches: 9, perBranch: 1559, average: 293},
            {name: "Артемовский", branches: 5, perBranch: 1315, average: 268}
        ]
    }    ,{
        topicId: "topic5",
        topicName: "Тема 5. Средние статистические показатели",
        id: "task_5_3",
        status: "testing",
        type: "commute_grouped_distribution",
        title: "ЗАДАЧА 5.3: ВРЕМЯ ПРОЕЗДА НА РАБОТУ",
        description: "Затраты времени сотрудников на проезд к месту работы распределены по пяти интервалам. Определите средние затраты времени, моду и медиану распределения.",
        source: "Задачи  средние статистические показатели.pdf, тема 5, задача 3, стр. 1",
        intervals: [
            {left: 20, right: 30, count: 70},
            {left: 30, right: 40, count: 80},
            {left: 40, right: 50, count: 200},
            {left: 50, right: 60, count: 55},
            {left: 60, right: 70, count: 45}
        ]
    }    ,{
        topicId: "topic6",
        topicName: "Тема 6. Показатели вариации",
        id: "task_6_1",
        status: "testing",
        type: "variation_culture_grouped",
        title: "ЗАДАЧА 6.1: ПОСЕЩАЕМОСТЬ УЧРЕЖДЕНИЙ КУЛЬТУРЫ",
        description: "Учреждения культуры распределены по годовой посещаемости. Представьте распределение на графике. Определите размах, среднее линейное и среднее квадратическое отклонения, коэффициент вариации и сформулируйте вывод.",
        source: "Задачи показатели вариации.pdf, тема 6, задача 1, стр. 1",
        intervals: [
            {low:40,high:60,count:6},
            {low:60,high:80,count:17},
            {low:80,high:100,count:25},
            {low:100,high:120,count:33},
            {low:120,high:140,count:9}
        ]
    },
    {
        topicId: "topic6",
        topicName: "Тема 6. Показатели вариации",
        id: "task_6_2",
        status: "testing",
        type: "variation_ranks_discrete",
        title: "ЗАДАЧА 6.2: КВАЛИФИКАЦИЯ СОТРУДНИКОВ",
        description: "По разрядам 24 сотрудников учреждения постройте дискретный ряд и его графическое изображение. Вычислите показатели центра, вариации и формы распределения; сделайте вывод.",
        source: "Задачи показатели вариации.pdf, тема 6, задача 2, стр. 1",
        ranks: [4,3,6,4,4,2,3,5,4,4,5,2,3,4,4,5,2,3,6,5,4,2,4,3]
    },
    {
        topicId: "topic6",
        topicName: "Тема 6. Показатели вариации",
        id: "task_6_3",
        status: "testing",
        type: "variation_loan_rates",
        title: "ЗАДАЧА 6.3: КРЕДИТНЫЕ СТАВКИ БАНКОВ",
        description: "По распределению объёмов краткосрочных займов организаций сферы культуры по ставкам сравните средний уровень кредитной ставки в I и II кварталах и показатели вариации (размах, линейное отклонение, дисперсию и коэффициенты вариации). Сформулируйте выводы.",
        source: "Задачи показатели вариации.pdf, тема 6, задача 3, стр. 1",
        rows: [
            {label:"До 30%", q1:1, q2:5},
            {label:"30–40%", q1:4, q2:11},
            {label:"40–50%", q1:9, q2:8},
            {label:"50% и более", q1:6, q2:6}
        ],
        assumedMidpoints: [25,35,45,55],
        assumedBounds: [20,60],
        assumption: "Открытые крайние классы условно считаются 20–30% и 50–60% (шаг 10 п.п.). Это приближённая учебная модель, а не точные границы из исходных данных."
    }
    ,{
        topicId: "topic7",
        topicName: "Тема 7. Анализ интенсивности динамики",
        id: "task_7_1",
        status: "testing",
        type: "dynamics_costs",
        title: "ЗАДАЧА 7.1: ЗАТРАТЫ НА ПОДГОТОВКУ СПЕЦИАЛИСТА",
        description: "Для высшего учебного заведения сферы культуры известен фактический уровень затрат на подготовку одного специалиста в каждом году. Определите цепные и базисные абсолютные приросты, темпы роста и прироста, среднегодовой темп роста и средний уровень ряда. По цепным коэффициентам восстановите базисный коэффициент, сформулируйте вывод.",
        source: "Задачи анализ интенсивности динамики.pdf, тема 7, задача 1, стр. 1",
        series: [
            {year:2008,cost:162},{year:2009,cost:164},{year:2010,cost:167},
            {year:2011,cost:165},{year:2012,cost:164},{year:2013,cost:170},
            {year:2014,cost:167},{year:2015,cost:175},{year:2016,cost:178},
            {year:2017,cost:174},{year:2018,cost:176},{year:2019,cost:178},
            {year:2020,cost:179},{year:2021,cost:190},{year:2022,cost:200},
            {year:2023,cost:210}
        ]
    }
    ,{
        topicId: "topic7",
        topicName: "Тема 7. Анализ интенсивности динамики",
        id: "task_7_2",
        status: "testing",
        type: "dynamics_advertising",
        title: "ЗАДАЧА 7.2: ПРОИЗВОДСТВО РЕКЛАМНОЙ ПРОДУКЦИИ",
        description: "По данным о производстве рекламной продукции в городе определите цепные и базисные абсолютные приросты, темпы роста и прироста, средний уровень и среднегодовой темп роста за 2013–2022 годы. По цепным коэффициентам восстановите базисный. Отдельно оцените прогноз на 2024 год, учитывая отсутствие наблюдения за 2023 год.",
        source: "Задачи анализ интенсивности динамики.pdf, тема 7, задача 2, стр. 1–2",
        series: [
            {year:2013,value:7.3},{year:2014,value:7.4},{year:2015,value:7.5},
            {year:2016,value:8.0},{year:2017,value:8.5},{year:2018,value:8.7},
            {year:2019,value:8.9},{year:2020,value:9.2},{year:2021,value:9.5},
            {year:2022,value:10.0}
        ],
        forecast: {year:2024,value:12.0},
        unit: "млн руб."
    }
    ,{
        topicId: "topic8",
        topicName: "Тема 8. Анализ тенденций развития",
        id: "task_8_1",
        status: "testing",
        type: "trend_costs",
        title: "ЗАДАЧА 8.1: ТЕНДЕНЦИЯ ЗАТРАТ НА ПОДГОТОВКУ СПЕЦИАЛИСТА",
        description: "По годовому уровню затрат на подготовку одного специалиста за 2008–2023 годы постройте график, выполните аналитическое выравнивание по прямой, найдите теоретические уровни и проследите тенденцию методом скользящей средней. Сформулируйте выводы.",
        source: "Задачи анализ тенденций развития.pdf, тема 8, задача 1, стр. 1",
        // Преподаватель не задаёт окно скользящей средней: в уроке явно выбираем три года.
        movingAverageWindow: 3,
        series: [
            {year:2008,cost:162},{year:2009,cost:164},{year:2010,cost:167},
            {year:2011,cost:165},{year:2012,cost:164},{year:2013,cost:170},
            {year:2014,cost:167},{year:2015,cost:175},{year:2016,cost:178},
            {year:2017,cost:174},{year:2018,cost:176},{year:2019,cost:178},
            {year:2020,cost:179},{year:2021,cost:190},{year:2022,cost:200},
            {year:2023,cost:210}
        ]
    }    ,{
        topicId: "topic8",
        topicName: "Тема 8. Анализ тенденций развития",
        id: "task_8_2",
        status: "testing",
        type: "trend_advertising",
        title: "ЗАДАЧА 8.2: ТЕНДЕНЦИЯ ПРОИЗВОДСТВА РЕКЛАМНОЙ ПРОДУКЦИИ",
        description: "По фактическому объёму производства рекламной продукции за 2017–2026 годы постройте график, выполните аналитическое выравнивание по прямой и гиперболе второго порядка, найдите теоретические уровни, восстановите цепные темпы из базисных и изучите тенденцию методом укрупнения периодов. Прогноз на 2027 год рассматривайте отдельно.",
        source: "Задачи анализ тенденций развития.pdf, тема 8, задача 2, стр. 1–2",
        modelAssumption: "Гипербола второго порядка явно принята в форме y=a+b/t+c/t², t=1..10; длина интервала укрупнения — два года. Формы в исходном листе не уточнены.",
        series: [
            {year:2017,value:7.3},{year:2018,value:7.4},{year:2019,value:7.5},
            {year:2020,value:8.0},{year:2021,value:8.5},{year:2022,value:8.7},
            {year:2023,value:8.9},{year:2024,value:9.2},{year:2025,value:9.5},
            {year:2026,value:10.0}
        ],
        forecast: {year:2027,value:12.0}
    }
];
