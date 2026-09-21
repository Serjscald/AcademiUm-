// ==========================================
// 📚 БАЗА ДАННЫХ: АНГЛИЙСКИЙ ЯЗЫК
// ==========================================
const englishDB = {
    topic1: [
        // Слова-исключения (7 карточек)
        { word: "good — better — (the) best", trans: "хороший — лучше — самый лучший" },
        { word: "bad — worse — (the) worst", trans: "плохой — хуже — самый плохой" },
        { word: "little — less — (the) least", trans: "маленький — меньше — наименьший" },
        { word: "much/many — more — (the) most", trans: "много — больше — больше всего" },
        { word: "far — farther/further — (the) farthest/furthest", trans: "далёкий — дальше — самый дальний" },
        { word: "old — older/elder — (the) oldest/eldest", trans: "старый — старше — самый старый" },
        { word: "late — later/latter — (the) latest/last", trans: "поздний — более поздний — самый поздний" },
        
        // Степени сравнения (5 карточек)
        { word: "Односложные: long — longer — the longest", trans: "длинный — длиннее — самый длинный" },
        { word: "Односложные: large — larger — the largest", trans: "большой — больше — самый большой" },
        { word: "Односложные: easy — easier — the easiest", trans: "лёгкий — легче — самый лёгкий" },
        { word: "Многосложные: beautiful — more beautiful — the most beautiful", trans: "красивый — более красивый — самый красивый" },
        { word: "Многосложные: impossible — more impossible — the most impossible", trans: "невозможный — более невозможный — самый невозможный" },
        
        // Сравнительные конструкции (4 карточки)
        { word: "than", trans: "The result is much better than that of the previous one." },
        { word: "as ... as", trans: "This result is as good as that one." },
        { word: "not so ... as", trans: "This result is not so good as that one." },
        { word: "the (more) ... the (less)", trans: "The more we study the less we know." },
        
        // Слова о характере (30 карточек)
        { word: "Easy-going", trans: "ЛЁГКИЙ ХАРАКТЕР" },
        { word: "Positive", trans: "ПОЗИТИВНЫЙ" },
        { word: "Curious", trans: "ЛЮБОПЫТНЫЙ" },
        { word: "Dull", trans: "СКУЧНЫЙ, УНЫЛЫЙ" },
        { word: "Jealous", trans: "РЕВНИВЫЙ" },
        { word: "Patient", trans: "ТЕРПЕЛИВЫЙ" },
        { word: "Calm", trans: "СПОКОЙНЫЙ" },
        { word: "Generous", trans: "ЩЕДРЫЙ" },
        { word: "Arrogant", trans: "ВЫСОКОМЕРНЫЙ" },
        { word: "Cruel", trans: "ЖЕСТОКИЙ" },
        { word: "Clever", trans: "УМНЫЙ" },
        { word: "Careful", trans: "ЗАБОТЛИВЫЙ / ОСТОРОЖНЫЙ" },
        { word: "Modest", trans: "СКРОМНЫЙ" },
        { word: "Envious", trans: "ЗАВИСТЛИВЫЙ" },
        { word: "Angry", trans: "ЗЛОЙ / НЕДОВОЛЬНЫЙ" },
        { word: "Hard-working", trans: "ТРУДОЛЮБИВЫЙ" },
        { word: "Honest", trans: "ЧЕСТНЫЙ" },
        { word: "Competitive", trans: "СКЛОННЫЙ К СОПЕРНИЧЕСТВУ" },
        { word: "Touchy", trans: "ОБИДЧИВЫЙ" },
        { word: "Rude", trans: "ГРУБЫЙ" },
        { word: "Kind", trans: "ДОБРЫЙ" },
        { word: "Giving", trans: "ЩЕДРЫЙ" },
        { word: "Lazy", trans: "ЛЕНИВЫЙ" },
        { word: "Polite", trans: "ВЕЖЛИВЫЙ" },
        { word: "Sly", trans: "ХИТРЫЙ" },
        { word: "Friendly", trans: "ДРУЖЕЛЮБНЫЙ" },
        { word: "Cheerful", trans: "ВЕСЁЛЫЙ / БОДРЫЙ" },
        { word: "Indifferent", trans: "БЕЗРАЗЛИЧНЫЙ" },
        { word: "Impolite", trans: "НЕВЕЖЛИВЫЙ" },
        { word: "Selfish", trans: "ЭГОИСТИЧНЫЙ" }
    ],
    topic2: [
        // Внешность и телосложение (16 карточек)
        { word: "Slim", trans: "ХУДОЙ" },
        { word: "Thin", trans: "ТОНКИЙ" },
        { word: "Skinny", trans: "ТОЩИЙ (НЕОДОБР.)" },
        { word: "Slender", trans: "СТРОЙНЫЙ" },
        { word: "Plump", trans: "ПУХЛЫЙ" },
        { word: "Chubby", trans: "ПУХЛЕНЬКИЙ (О ДЕТЯХ)" },
        { word: "Muscular", trans: "МУСКУЛИСТЫЙ" },
        { word: "Athletic", trans: "СПОРТИВНЫЙ" },
        { word: "Well-built", trans: "ХОРОШО СЛОЖЕННЫЙ" },
        { word: "Curvy", trans: "С ФОРМАМИ (ЖЕН.)" },
        { word: "Young", trans: "МОЛОДОЙ" },
        { word: "Old", trans: "СТАРЫЙ" },
        { word: "Elderly", trans: "ПОЖИЛОЙ (ВЕЖЛИВО)" },
        { word: "Scarred", trans: "СО ШРАМАМИ" },
        { word: "Middle-aged", trans: "СРЕДНЕГО ВОЗРАСТА" },
        { word: "Teenaged / In his 20s", trans: "ПОДРОСТКОВЫЙ / ЕМУ 20+" },
        
        // Волосы и цвета (14 карточек)
        { word: "Straight", trans: "ПРЯМЫЕ" },
        { word: "Wavy", trans: "ВОЛНИСТЫЕ" },
        { word: "Curly", trans: "КУДРЯВЫЕ" },
        { word: "Black", trans: "БРЮНЕТ" },
        { word: "Brown", trans: "ШАТЕН" },
        { word: "Blonde", trans: "СВЕТЛЫЕ ВОЛОСЫ" },
        { word: "Red", trans: "РЫЖИЙ" },
        { word: "Ginger", trans: "РЫЖЕВАТЫЙ" },
        { word: "Grey", trans: "СЕДЫЕ" },
        { word: "White", trans: "БЕЛЫЕ" },
        { word: "Good-looking", trans: "ПРИВЛЕКАТЕЛЬНЫЙ" },
        { word: "Handsome", trans: "КРАСИВЫЙ" },
        { word: "Pretty", trans: "КРАСИВАЯ" },
        { word: "Beautiful", trans: "КРАСИВАЯ (О ЖЕН.)" },
        
        // Привлекательность и детали (11 карточек)
        { word: "Attractive", trans: "ПРИВЛЕКАТЕЛЬНЫЙ" },
        { word: "Cute", trans: "МИЛЫЙ" },
        { word: "Gorgeous", trans: "ВЕЛИКОЛЕПНЫЙ" },
        { word: "Stunning", trans: "ПОТРЯСАЮЩИЙ" },
        { word: "Unattractive", trans: "НЕПРИВЛЕКАТЕЛЬНЫЙ" },
        { word: "Ordinary", trans: "ОБЫЧНЫЙ" },
        { word: "Scruffy", trans: "НЕРЯШЛИВЫЙ" },
        { word: "Untidy", trans: "НЕАКУРАТНЫЙ" },
        { word: "Neat", trans: "АККУРАТНЫЙ" },
        { word: "Well-dressed", trans: "ХОРОШО ОДЕТЫЙ" },
        { word: "Tattooed", trans: "С ТАТУ" },
        { word: "Pierced", trans: "С ПИРСИНГОМ" },
        { word: "Bespectacled", trans: "В ОЧКАХ" },
        { word: "Bearded", trans: "С БОРОДОЙ" }
    ]
};
