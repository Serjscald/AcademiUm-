var statisticsDB = {
    topic1: [
        { word: "Индекс", trans: "Относительная величина, показывающая изменение явления во времени или пространстве." },
        { word: "Индивидуальный индекс", trans: "Характеризует изменение одного элемента совокупности (например, цена одного товара)." },
        { word: "Общий (агрегатный) индекс", trans: "Характеризует изменение всей совокупности в целом (например, всех цен)." },
        { word: "Базисный индекс", trans: "Сравнивает текущий уровень с одним и тем же базисным периодом." },
        { word: "Цепной индекс", trans: "Сравнивает текущий уровень с предыдущим периодом." },
        { word: "Формула Ласпейреса", trans: "Агрегатный индекс с весами базисного периода (q0)." },
        { word: "Формула Пааше", trans: "Агрегатный индекс с весами отчётного периода (q1)." },
        { word: "Факторный анализ", trans: "Разложение общего изменения результативного показателя на влияние отдельных факторов." },
        { word: "Абсолютное изменение", trans: "Разница между числителем и знаменателем индекса (в рублях, штуках)." },
        { word: "p0", trans: "Цена (или себестоимость) в базисном периоде." },
        { word: "p1", trans: "Цена (или себестоимость) в отчётном периоде." },
        { word: "q0", trans: "Количество (объём) в базисном периоде." },
        { word: "q1", trans: "Количество (объём) в отчётном периоде." },
        { word: "p1q1", trans: "Выручка (товарооборот) в отчётном периоде." },
        { word: "Темп роста", trans: "Отношение текущего уровня к базисному, выраженное в процентах." },
        { word: "Темп прироста", trans: "Темп роста минус 100%. Показывает, на сколько процентов изменилось явление." }
    ],
    tasks: [
        {
            id: "theater",
            title: "Задача: Выручка театра",
            formulas: [
                "Выручка = Σ(p × q)",
                "Цена отчётного периода p₁ = (p₁q₁) / q₁",
                "Индекс выручки I_pq = Σ(p1×q1) / Σ(p0×q0)",
                "Индекс цен I_p = Σ(p1×q1) / Σ(p0×q1)",
                "Индекс объёма I_q = Σ(p0×q1) / Σ(p0×q0)",
                "ΔВыручка = Σ(p1×q1) - Σ(p0×q0)"
            ],
            html: '<p>Театр продаёт билеты трёх типов. Оцените изменение выручки в апреле по сравнению с февралём и разложите его на факторы.</p><table class="stat-table"><tr><th>Тип билета</th><th>Цена фев (руб.)</th><th>Продано фев (шт.)</th><th>Продано апр (тыс. руб.)</th><th>Продано апр (шт.)</th></tr><tr><td>Взрослый</td><td class="var" data-correct="p0" data-val="500">500</td><td class="var" data-correct="q0" data-val="1100">1100</td><td class="var" data-correct="p1q1" data-val="520000">520</td><td class="var" data-correct="q1" data-val="1300">1300</td></tr><tr><td>Льготный</td><td class="var" data-correct="p0" data-val="250">250</td><td class="var" data-correct="q0" data-val="800">800</td><td class="var" data-correct="p1q1" data-val="160000">160</td><td class="var" data-correct="q1" data-val="800">800</td></tr><tr><td>Детский</td><td class="var" data-correct="p0" data-val="100">100</td><td class="var" data-correct="q0" data-val="600">600</td><td class="var" data-correct="p1q1" data-val="90000">90</td><td class="var" data-correct="q1" data-val="600">600</td></tr></table>',
            varLabels: { 
                p0: "p₀ (цена базисного периода)", 
                q0: "q₀ (кол-во базисного периода)", 
                p1q1: "p₁q₁ (выручка отчётного периода)", 
                q1: "q₁ (кол-во отчётного периода)" 
            },
            varColors: {
                p0: "#fbbf24",
                q0: "#22c55e",
                p1: "#38bdf8",
                q1: "#a78bfa",
                p1q1: "#f97316"
            },
            solve: function(v) {
                var p1_1 = v.p1q1_1 / v.q1_1;
                var p1_2 = v.p1q1_2 / v.q1_2;
                var p1_3 = v.p1q1_3 / v.q1_3;
                
                var rev0 = v.p0_1*v.q0_1 + v.p0_2*v.q0_2 + v.p0_3*v.q0_3;
                var rev1 = v.p1q1_1 + v.p1q1_2 + v.p1q1_3;
                var revQ = v.p0_1*v.q1_1 + v.p0_2*v.q1_2 + v.p0_3*v.q1_3;
                
                var dRev = rev1 - rev0;
                var dP = rev1 - revQ;
                var dQ = revQ - rev0;
                var iRev = (rev1/rev0*100).toFixed(1);
                var iP = (rev1/revQ*100).toFixed(1);
                var iQ = (revQ/rev0*100).toFixed(1);
                
                var c = this.varColors;
                var calc = '';
                
                // Шаг 1
                calc += '<div style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #334155">';
                calc += '<b style="color:var(--gold)">Шаг 1. Определение цен апреля (p₁)</b><br>';
                calc += '<span style="color:' + c.p1 + ';font-family:monospace">p₁ = (p₁q₁) / q₁</span><br>';
                calc += '<span style="color:' + c.p1 + '">p₁</span> (взр) = <span style="color:' + c.p1q1 + '">520000</span> / <span style="color:' + c.q1 + '">1300</span> = <b style="color:' + c.p1 + '">' + p1_1 + ' руб.</b><br>';
                calc += '<span style="color:' + c.p1 + '">p₁</span> (льг) = <span style="color:' + c.p1q1 + '">160000</span> / <span style="color:' + c.q1 + '">800</span> = <b style="color:' + c.p1 + '">' + p1_2 + ' руб.</b><br>';
                calc += '<span style="color:' + c.p1 + '">p₁</span> (дет) = <span style="color:' + c.p1q1 + '">90000</span> / <span style="color:' + c.q1 + '">600</span> = <b style="color:' + c.p1 + '">' + p1_3 + ' руб.</b>';
                calc += '</div>';
                
                // Шаг 2
                calc += '<div style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #334155">';
                calc += '<b style="color:var(--gold)">Шаг 2. Совокупные величины</b><br>';
                calc += '<span style="font-family:monospace">Σ<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span> = Σ(<span style="color:' + c.p0 + '">p₀</span> × <span style="color:' + c.q0 + '">q₀</span>)</span><br>';
                calc += 'Σ<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span> = (<span style="color:' + c.p0 + '">500</span>×<span style="color:' + c.q0 + '">1100</span>) + (<span style="color:' + c.p0 + '">250</span>×<span style="color:' + c.q0 + '">800</span>) + (<span style="color:' + c.p0 + '">100</span>×<span style="color:' + c.q0 + '">600</span>) = <b>' + rev0 + ' руб.</b><br><br>';
                calc += '<span style="font-family:monospace">Σ<span style="color:' + c.p1q1 + '">p₁q₁</span> = Σ(<span style="color:' + c.p1q1 + '">p₁q₁</span>)</span><br>';
                calc += 'Σ<span style="color:' + c.p1q1 + '">p₁q₁</span> = <span style="color:' + c.p1q1 + '">520000</span> + <span style="color:' + c.p1q1 + '">160000</span> + <span style="color:' + c.p1q1 + '">90000</span> = <b>' + rev1 + ' руб.</b><br><br>';
                calc += '<span style="font-family:monospace">Σ<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span> = Σ(<span style="color:' + c.p0 + '">p₀</span> × <span style="color:' + c.q1 + '">q₁</span>)</span><br>';
                calc += 'Σ<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span> = (<span style="color:' + c.p0 + '">500</span>×<span style="color:' + c.q1 + '">1300</span>) + (<span style="color:' + c.p0 + '">250</span>×<span style="color:' + c.q1 + '">800</span>) + (<span style="color:' + c.p0 + '">100</span>×<span style="color:' + c.q1 + '">600</span>) = <b>' + revQ + ' руб.</b>';
                calc += '</div>';
                
                // Шаг 3
                calc += '<div style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #334155">';
                calc += '<b style="color:var(--gold)">Шаг 3. Индексы</b><br>';
                calc += '<span style="font-family:monospace">I_pq = Σ(<span style="color:' + c.p1q1 + '">p₁q₁</span>) / Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span>)</span><br>';
                calc += 'I_pq = <span style="color:' + c.p1q1 + '">' + rev1 + '</span> / <span style="color:' + c.p0 + '">' + rev0 + '</span> = <b>' + iRev + '%</b><br><br>';
                calc += '<span style="font-family:monospace">I_p = Σ(<span style="color:' + c.p1q1 + '">p₁q₁</span>) / Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span>)</span><br>';
                calc += 'I_p = <span style="color:' + c.p1q1 + '">' + rev1 + '</span> / <span style="color:' + c.p0 + '">' + revQ + '</span> = <b>' + iP + '%</b><br><br>';
                calc += '<span style="font-family:monospace">I_q = Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span>) / Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span>)</span><br>';
                calc += 'I_q = <span style="color:' + c.p0 + '">' + revQ + '</span> / <span style="color:' + c.p0 + '">' + rev0 + '</span> = <b>' + iQ + '%</b>';
                calc += '</div>';
                
                // Шаг 4
                calc += '<div>';
                calc += '<b style="color:var(--gold)">Шаг 4. Абсолютные изменения</b><br>';
                calc += '<span style="font-family:monospace">ΔОбщее = Σ(<span style="color:' + c.p1q1 + '">p₁q₁</span>) - Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span>)</span><br>';
                calc += 'ΔОбщее = <span style="color:' + c.p1q1 + '">' + rev1 + '</span> - <span style="color:' + c.p0 + '">' + rev0 + '</span> = <b>' + dRev + ' руб.</b><br><br>';
                calc += '<span style="font-family:monospace">ΔЦен = Σ(<span style="color:' + c.p1q1 + '">p₁q₁</span>) - Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span>)</span><br>';
                calc += 'ΔЦен = <span style="color:' + c.p1q1 + '">' + rev1 + '</span> - <span style="color:' + c.p0 + '">' + revQ + '</span> = <b>' + dP + ' руб.</b><br><br>';
                calc += '<span style="font-family:monospace">ΔКол-ва = Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q1 + '">q₁</span>) - Σ(<span style="color:' + c.p0 + '">p₀</span><span style="color:' + c.q0 + '">q₀</span>)</span><br>';
                calc += 'ΔКол-ва = <span style="color:' + c.p0 + '">' + revQ + '</span> - <span style="color:' + c.p0 + '">' + rev0 + '</span> = <b>' + dQ + ' руб.</b>';
                calc += '</div>';
                
                var dir = (dRev < 0) ? 'снизилась' : 'выросла';
                var mainFactor = (Math.abs(dP) > Math.abs(dQ)) ? 'цен' : 'количества';
                var conclusion = 'Выручка театра ' + dir + ' на ' + Math.abs(dRev) + ' руб. (индекс выручки ' + iRev + '%). Увеличение количества проданных билетов добавило ' + dQ + ' руб., однако изменение цен принесло ' + dP + ' руб. Преобладающим оказалось влияние фактора ' + mainFactor + ': именно оно и определило итоговую динамику выручки.';
                
                return { calc: calc, conclusion: conclusion };
            }
        }
    ]
};
