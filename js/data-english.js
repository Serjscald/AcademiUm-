var englishDB = {
    topicTitles: {
        topic1: "Topic 1: Greetings & Basics",
        topic2: "Topic 2: To Be & Present Simple",
        topic3: "Topic 3: Countable & Uncountable Words",
        topic4: "Topic 4: Quantifiers & Practice",
        topic5: "Topic 5: Cooking & Measurements"
    },

    topic1: [
        { word: "Hello!", trans: "Здравствуйте!", note: "Нейтральное приветствие. Более официальная ситуация может потребовать Good morning / Good afternoon.", example: "Hello, Anna! — Здравствуй, Анна!" },
        { word: "Hi!", trans: "Привет!", note: "Неформальное приветствие друзьям и знакомым.", example: "Hi, Max! — Привет, Макс!" },
        { word: "Good morning!", trans: "Доброе утро!", note: "Приветствие утром.", example: "Good morning, everyone! — Доброе утро всем!" },
        { word: "Good afternoon!", trans: "Добрый день!", note: "Приветствие днём, обычно после полудня.", example: "Good afternoon, Professor! — Добрый день, профессор!" },
        { word: "Good evening!", trans: "Добрый вечер!", note: "Приветствие вечером, не прощание.", example: "Good evening, everyone! — Добрый вечер всем!" },
        { word: "Goodbye!", trans: "До свидания!", note: "Нейтральное прощание.", example: "Goodbye, see you tomorrow! — До свидания, до завтра!" },
        { word: "Bye!", trans: "Пока!", note: "Неформальное прощание.", example: "Bye, Kate! — Пока, Катя!" },
        { word: "See you later!", trans: "Увидимся позже!", note: "Дружелюбное прощание, предполагающее новую встречу.", example: "See you later, Ben! — Увидимся позже, Бен!" },
        { word: "How are you?", trans: "Как дела?", note: "Обычный вопрос о самочувствии и делах.", example: "How are you today? — Как у тебя сегодня дела?" },
        { word: "I'm fine, thanks.", trans: "У меня всё хорошо, спасибо.", note: "Типичный ответ на How are you?.", example: "I'm fine, thanks. And you? — Всё хорошо, спасибо. А у тебя?" },
        { word: "What's your name?", trans: "Как тебя зовут?", note: "Неформальный вопрос об имени. Для вежливого обращения к незнакомому взрослому можно использовать May I ask your name?.", example: "What's your name? — My name is Alex. — Как тебя зовут? — Меня зовут Алекс." },
        { word: "My name is…", trans: "Меня зовут…", note: "После is назовите своё имя.", example: "My name is Maria. — Меня зовут Мария." },
        { word: "Nice to meet you!", trans: "Приятно познакомиться!", note: "Говорят при знакомстве.", example: "Nice to meet you, Tom! — Приятно познакомиться, Том!" },
        { word: "Thank you!", trans: "Спасибо!", note: "Thanks! — более разговорный вариант.", example: "Thank you for your help! — Спасибо за помощь!" },
        { word: "You're welcome!", trans: "Пожалуйста!", note: "Используется в ответ на благодарность; не равнозначно please при просьбе.", example: "Thank you! — You're welcome! — Спасибо! — Пожалуйста!" },
        { word: "Please.", trans: "Пожалуйста.", note: "Вежливое слово при просьбе.", example: "Please, help me. — Пожалуйста, помоги мне." },
        { word: "Excuse me.", trans: "Извините.", note: "Часто используется, чтобы привлечь внимание или вежливо обратиться с вопросом.", example: "Excuse me, where is the station? — Извините, где находится вокзал?" },
        { word: "I'm sorry.", trans: "Извините. / Мне жаль.", note: "Выражает извинение за действие, ошибку или сочувствие. Значение зависит от ситуации.", example: "I'm sorry I'm late. — Извините, что я опоздал." },
        { word: "Yes.", trans: "Да.", note: "Утвердительный ответ.", example: "Yes, I understand. — Да, я понимаю." },
        { word: "No.", trans: "Нет.", note: "Отрицательный ответ.", example: "No, thank you. — Нет, спасибо." },
        { word: "Maybe.", trans: "Может быть.", note: "Выражает неуверенность или возможность.", example: "Maybe tomorrow. — Может быть, завтра." },
        { word: "I don't understand.", trans: "Я не понимаю.", note: "Можно использовать, если смысл сказанного непонятен.", example: "Sorry, I don't understand. — Извините, я не понимаю." },
        { word: "Could you repeat that, please?", trans: "Не могли бы вы повторить?", note: "Вежливая просьба повторить. Can you repeat, please? — более прямой вариант.", example: "Could you repeat that, please? — Не могли бы вы повторить?" },
        { word: "How do you say … in English?", trans: "Как сказать … по-английски?", note: "Используйте, когда хотите узнать английский эквивалент слова или выражения.", example: "How do you say «книга» in English? — Как сказать «книга» по-английски?" }
    ],

    topic2: [
        {"word":"I am (I'm)","trans":"Я …","note":"Форма to be с I. В русском настоящем времени связка часто опускается.","example":"I'm a student. — Я студент."},
        {"word":"You are (You're)","trans":"Ты / вы …","note":"Форма to be с you (ты/вы).","example":"You're right. — Ты прав."},
        {"word":"He is (He's)","trans":"Он …","note":"Форма to be с he.","example":"He's tall. — Он высокий."},
        {"word":"She is (She's)","trans":"Она …","note":"Форма to be с she.","example":"She's smart. — Она умная."},
        {"word":"It is (It's)","trans":"Это …","note":"Форма to be с it для предметов и животных.","example":"It's a cat. — Это кошка."},
        {"word":"We are (We're)","trans":"Мы …","note":"Форма to be с we.","example":"We're friends. — Мы друзья."},
        {"word":"They are (They're)","trans":"Они …","note":"Форма to be с they.","example":"They're here. — Они здесь."},
        {"word":"am not / isn't / aren't","trans":"Отрицание to be","note":"Для отрицаний: I am not, he/she/it isn't, you/we/they aren't.","example":"He isn't ready. — Он не готов."},
        {"word":"Am I...? / Is he...? / Are you...?","trans":"Вопросительные формы to be","note":"В вопросе глагол to be ставится перед подлежащим.","example":"Are you a student? — Ты студент?"},
        {"word":"Present Simple","trans":"Настоящее простое время","note":"Present Simple описывает привычки, факты, расписания.","example":"I work every day. — Я работаю каждый день."},
        {"word":"I / you / we / they + V","trans":"Форма Present Simple для I / you / we / they","note":"С I/you/we/they используется основная форма смыслового глагола.","example":"They study English. — Они изучают английский."},
        {"word":"he / she / it + V-s","trans":"Форма Present Simple для he / she / it","note":"С he/she/it добавляется -s/-es; написание иногда меняется.","example":"She watches films. — Она смотрит фильмы."},
        {"word":"do / does","trans":"Вспомогательные глаголы для вопросов","note":"Do для I/you/we/they, does для he/she/it; после does смысловой глагол без -s.","example":"Does he work here? — Он здесь работает?"},
        {"word":"don't / doesn't","trans":"Вспомогательные глаголы для отрицаний","note":"Отрицание Present Simple: don't/doesn't + основная форма глагола.","example":"She doesn't work on Sundays. — Она не работает по воскресеньям."},
        {"word":"always / usually / often","trans":"Всегда / обычно / часто","note":"Наречия частотности: всегда, обычно, часто.","example":"He often reads. — Он часто читает."},
        {"word":"sometimes / rarely / never","trans":"Иногда / редко / никогда","note":"Иногда, редко, никогда. Never уже содержит отрицание.","example":"I never drink coffee. — Я никогда не пью кофе."},
        {"word":"every day / every week","trans":"Каждый день / каждую неделю","note":"Регулярность действий: каждый день / каждую неделю.","example":"We study every week. — Мы занимаемся каждую неделю."},
        {"word":"on Mondays / in the morning","trans":"По понедельникам / утром","note":"On + дни недели; in + части суток, кроме at night.","example":"I read on Mondays in the morning. — Я читаю по понедельникам утром."},
        {"word":"like / love / hate","trans":"Нравиться / любить / ненавидеть","note":"Глаголы предпочтений: нравиться / любить / ненавидеть.","example":"She likes music. — Ей нравится музыка."},
        {"word":"want / need / have","trans":"Хотеть / нуждаться / иметь","note":"Want — хотеть; need — нуждаться; have — иметь. Для he/she/it: wants, needs, has.","example":"He has a notebook. — У него есть блокнот."}
    ],

    topic3: [
        {"word":"Countable nouns","trans":"Исчисляемые существительные","note":"Имеют единственное и множественное число, употребляются с many/few и a/an (в ед. числе).","example":"Two carrots are on the table. — На столе две моркови."},
        {"word":"carrot","trans":"морковь","note":"Это можно посчитать поштучно: a/an + существительное в единственном числе, или числительное + множественное число.","example":"I bought three carrots. — Я купил три моркови."},
        {"word":"apricot","trans":"абрикос","note":"Это можно посчитать поштучно: a/an + существительное в единственном числе, или числительное + множественное число.","example":"She ate an apricot. — Она съела абрикос."},
        {"word":"melon","trans":"дыня","note":"Это можно посчитать поштучно: a/an + существительное в единственном числе, или числительное + множественное число.","example":"This melon is sweet. — Эта дыня сладкая."},
        {"word":"cucumber","trans":"огурец","note":"Это можно посчитать поштучно: a/an + существительное в единственном числе, или числительное + множественное число.","example":"We have two cucumbers. — У нас два огурца."},
        {"word":"lemon","trans":"лимон","note":"Это можно посчитать поштучно: a/an + существительное в единственном числе, или числительное + множественное число.","example":"Add one lemon. — Добавьте один лимон."},
        {"word":"Uncountable nouns","trans":"Неисчисляемые существительные","note":"В значении вещества или массы обычно не имеют множественного числа; с ними употребляют much/little.","example":"We need some water. — Нам нужна вода."},
        {"word":"wine","trans":"вино","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"There is some wine in the glass. — В бокале есть вино."},
        {"word":"lemonade","trans":"лимонад","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Would you like some lemonade? — Хочешь лимонада?"},
        {"word":"vegetable oil","trans":"растительное масло","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Add some vegetable oil. — Добавьте растительное масло."},
        {"word":"vinegar","trans":"уксус","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"We need some vinegar. — Нам нужен уксус."},
        {"word":"cocoa","trans":"какао","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"She drinks cocoa. — Она пьёт какао."},
        {"word":"soda","trans":"газировка","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Would you like some soda? — Хочешь газировки?"},
        {"word":"food","trans":"еда","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"We need more food. — Нам нужно больше еды."},
        {"word":"ham","trans":"ветчина","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"I'd like some ham. — Я бы хотел ветчины."},
        {"word":"fish","trans":"рыба (как пища)","note":"Как продукт fish обычно неисчисляемо; отдельные рыбы исчисляемы, plural fish.","example":"We ate fish. — Мы ели рыбу."},
        {"word":"pasta","trans":"паста","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"I cook pasta. — Я готовлю пасту."},
        {"word":"fruit","trans":"фрукты (собирательно)","note":"Fruit в общем значении обычно неисчисляемо; fruits бывает в значении видов фруктов.","example":"Eat more fruit. — Ешь больше фруктов."},
        {"word":"flour","trans":"мука","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"We need flour. — Нам нужна мука."},
        {"word":"butter","trans":"масло (сливочное)","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Put some butter on the bread. — Намажь хлеб маслом."},
        {"word":"meat","trans":"мясо","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"There isn't much meat left. — Мяса осталось мало."},
        {"word":"bread","trans":"хлеб","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"I'd like some bread. — Я бы хотел хлеба."},
        {"word":"cheese","trans":"сыр","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Add some cheese. — Добавьте сыра."},
        {"word":"salt","trans":"соль","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"This soup needs salt. — Этому супу нужна соль."},
        {"word":"mushroom","trans":"гриб","note":"Отдельный mushroom исчисляемый: one mushroom, two mushrooms; исправлена исходная ошибка.","example":"We found three mushrooms. — Мы нашли три гриба."},
        {"word":"pepper","trans":"перец; перечная приправа","note":"Pepper как специя неисчисляемо; a pepper как овощ — исчисляемо.","example":"Add some black pepper. — Добавьте чёрного перца."},
        {"word":"honey","trans":"мёд","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"There's honey in the jar. — В банке есть мёд."},
        {"word":"sugar","trans":"сахар","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Do you take sugar in tea? — Ты кладёшь сахар в чай?"},
        {"word":"rice","trans":"рис","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"We eat rice. — Мы едим рис."},
        {"word":"porridge","trans":"каша","note":"Porridge означает кашу вообще, не только овсяную.","example":"I have porridge for breakfast. — Я ем кашу на завтрак."},
        {"word":"buckwheat","trans":"гречка","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"We cooked buckwheat. — Мы приготовили гречку."},
        {"word":"oatmeal","trans":"овсянка / овсяные хлопья","note":"Oatmeal — овсяная каша или хлопья; овёс как культура — oats.","example":"I eat oatmeal in the morning. — Я ем овсянку утром."},
        {"word":"semolina","trans":"манка","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"This porridge is made with semolina. — Эта каша приготовлена из манки."},
        {"word":"pearl barley","trans":"перловка","note":"Pearl barley пишется без дефиса.","example":"Add pearl barley to the soup. — Добавьте перловку в суп."},
        {"word":"barley","trans":"ячмень","note":"В приведённом значении обычно рассматривается как название продукта или вещества; исчисляемость может зависеть от контекста.","example":"Barley is a cereal grain. — Ячмень — злак."},
        {"word":"lentil","trans":"чечевичная зерновка","note":"Lentil исчисляемо; lentils во множественном числе часто обозначает чечевицу как еду.","example":"I made lentil soup. — Я приготовил чечевичный суп."},
        {"word":"green pea","trans":"зелёная горошина","note":"Green pea исчисляемо; green peas — зелёный горошек как овощ.","example":"There are green peas in the soup. — В супе есть зелёный горошек."},
        {"word":"wheat","trans":"пшеница","note":"Пшено — millet, а wheat — пшеница. Исправлен исходный ошибочный перевод.","example":"Wheat is used to make flour. — Из пшеницы делают муку."},
        {"word":"a bar of chocolate","trans":"плитка шоколада","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"She bought a bar of chocolate. — Она купила плитку шоколада."},
        {"word":"a bar of soap","trans":"кусок мыла","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"There's a bar of soap by the sink. — У раковины лежит кусок мыла."},
        {"word":"a chunk of","trans":"большой кусок чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"He cut a chunk of cheese. — Он отрезал большой кусок сыра."},
        {"word":"a bottle of water","trans":"бутылка воды","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"I need a bottle of water. — Мне нужна бутылка воды."},
        {"word":"a bowl of soup","trans":"миска супа","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"She ate a bowl of soup. — Она съела миску супа."},
        {"word":"a plate of meat","trans":"порция мяса","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"He ordered a plate of meat. — Он заказал тарелку мяса."},
        {"word":"a slice of bread","trans":"ломтик хлеба","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Can I have a slice of bread? — Можно мне ломтик хлеба?"},
        {"word":"a carton of milk","trans":"упаковка молока","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"We bought a carton of milk. — Мы купили пакет молока."},
        {"word":"a bag of chips","trans":"пачка чипсов","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"She opened a bag of chips. — Она открыла пачку чипсов."},
        {"word":"a packet of","trans":"пачка / упаковка чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"I bought a packet of biscuits. — Я купил пачку печенья."},
        {"word":"a bucket of","trans":"ведро чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"They carried a bucket of water. — Они несли ведро воды."},
        {"word":"a crate of","trans":"ящик чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"A crate of apples arrived. — Привезли ящик яблок."},
        {"word":"a drop of","trans":"капля чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Add a drop of oil. — Добавьте каплю масла."},
        {"word":"a bunch of","trans":"гроздь / букет чего-либо","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"He gave her a bunch of flowers. — Он подарил ей букет цветов."},
        {"word":"a cup of coffee","trans":"чашка кофе","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"I'd like a cup of coffee. — Я бы хотел чашку кофе."},
        {"word":"a game of chess","trans":"партия в шахматы","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Let's play a game of chess. — Сыграем в шахматы."},
        {"word":"a glass of wine","trans":"бокал вина","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"He ordered a glass of wine. — Он заказал бокал вина."},
        {"word":"a jar of jam","trans":"банка варенья","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"There's a jar of jam. — Там банка варенья."},
        {"word":"a jug of lemonade","trans":"кувшин лимонада","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"We made a jug of lemonade. — Мы приготовили кувшин лимонада."},
        {"word":"a can of cola","trans":"банка колы","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"She bought a can of cola. — Она купила банку колы."},
        {"word":"a tin","trans":"консервная банка","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Open a tin of beans. — Открой банку фасоли."},
        {"word":"a loaf of bread","trans":"буханка хлеба","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"We bought a loaf of bread. — Мы купили буханку хлеба."},
        {"word":"a piece of cheese","trans":"кусок сыра","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Would you like a piece of cheese? — Хочешь кусок сыра?"},
        {"word":"a sheet of paper","trans":"лист бумаги","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"Take a sheet of paper. — Возьми лист бумаги."},
        {"word":"a kilo of meat","trans":"килограмм мяса","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"She needs a kilo of meat. — Ей нужен килограмм мяса."},
        {"word":"a litre of water","trans":"литр воды","note":"Это единица измерения, порция или тара; она помогает назвать количество вещества.","example":"We drank a litre of water. — Мы выпили литр воды."}
    ],

    topic4: [
        {"word":"much / little","trans":"Много / мало (неисчисляемые)","note":"Much относится к неисчисляемым; little означает «мало».","example":"We don't have much time. — У нас немного времени."},
        {"word":"many / few","trans":"Много / мало (исчисляемые)","note":"Many относится к исчисляемым; few означает «мало».","example":"There are many books here. — Здесь много книг."},
        {"word":"a little","trans":"Немного (есть некоторое количество)","note":"A little — немного, но некоторое количество есть.","example":"I have a little time. — У меня есть немного времени."},
        {"word":"little","trans":"Мало (недостаточно)","note":"Little — мало, зачастую недостаточно.","example":"I have little time. — У меня мало времени."},
        {"word":"a few","trans":"Несколько (есть некоторое количество)","note":"A few — несколько, некоторое количество есть.","example":"She has a few friends. — У неё есть несколько друзей."},
        {"word":"few","trans":"Мало (почти нет)","note":"Few — мало, почти нет.","example":"She has few friends. — У неё мало друзей."},
        {"word":"a lot of / lots of","trans":"Много","note":"A lot of и lots of применимы с исчисляемыми и неисчисляемыми существительными.","example":"We have a lot of books. — У нас много книг."},
        {"word":"some","trans":"Некоторое количество / немного","note":"Some часто в утверждениях; также в предложениях и просьбах.","example":"Would you like some tea? — Хотите чаю?"},
        {"word":"any","trans":"Какое-нибудь количество / никакого","note":"Any обычно в вопросах и отрицаниях; в утверждениях может означать «любой».","example":"Do you have any questions? — У вас есть вопросы?"},
        {"word":"Let us take ___ friends with us. (несколько)","trans":"a few","note":"Для друзей (исчисляемое) выбрано a few: несколько друзей.","example":"Let us take a few friends with us. — Возьмём с собой нескольких друзей."},
        {"word":"There are ___ fruit-trees in our garden. (много)","trans":"a lot of","note":"Для множества деревьев используем a lot of; в других контекстах many также допустимо.","example":"There are a lot of fruit trees in our garden. — У нас в саду много фруктовых деревьев."},
        {"word":"We have very ___ copy-books at home. (мало)","trans":"few","note":"После very, когда речь о малом числе, используем few.","example":"We have very few notebooks. — У нас очень мало тетрадей."},
        {"word":"My sister has ___ books. (много)","trans":"a lot of","note":"A lot of обозначает большое количество; many books тоже грамматически возможно.","example":"My sister has a lot of books. — У моей сестры много книг."},
        {"word":"Let us take ___ of them. (несколько)","trans":"a few","note":"A few of them означает «несколько из них».","example":"Let us take a few of them. — Давай возьмём несколько из них."},
        {"word":"Our children have very ___ lessons today. (мало)","trans":"few","note":"Very few — очень мало, lessons — исчисляемое.","example":"Our children have very few lessons today. — Сегодня у детей очень мало уроков."},
        {"word":"She always makes ___ mistakes in her letters. (много)","trans":"a lot of","note":"A lot of mistakes — много ошибок; many mistakes тоже возможно.","example":"She makes a lot of mistakes. — Она делает много ошибок."},
        {"word":"We have very ___ towers in London. (мало)","trans":"few","note":"Very few используется с исчисляемым towers.","example":"There are very few towers here. — Здесь очень мало башен."},
        {"word":"There are ___ new words in the text. (несколько)","trans":"a few","note":"A few new words — несколько новых слов.","example":"There are a few new words in the text. — В тексте есть несколько новых слов."},
        {"word":"I can't see ___ chalk at the blackboard. (any/some)","trans":"any","note":"В отрицании I can't ... обычно any; chalk здесь неисчисляемо.","example":"I can't see any chalk on the blackboard. — Я не вижу мела на доске."},
        {"word":"There ___ no glue in the bottle. (is/are)","trans":"is","note":"Glue неисчисляемое; there is, не there are.","example":"There is no glue in the bottle. — В бутылке нет клея."},
        {"word":"This ___ pencil case and these ___ pens. (is/are)","trans":"is / are","note":"This требует is; these требует are.","example":"This is a pencil case and these are pens. — Это пенал, а это ручки."},
        {"word":"There are ___ pencils in the pencil case. (few/little)","trans":"few","note":"Pencils исчисляемые; few означает «мало», a few — «несколько».","example":"There are few pencils in the pencil case. — В пенале мало карандашей."},
        {"word":"There was ___ paper in the backpack yesterday. (few/little)","trans":"little","note":"Paper в значении материала неисчисляемо; little paper — мало бумаги.","example":"There was little paper in the backpack. — В рюкзаке было мало бумаги."},
        {"word":"The spectacles ___ on the shelf. (is/are)","trans":"are","note":"Spectacles в значении очков имеет форму множественного числа: are.","example":"The spectacles are on the shelf. — Очки лежат на полке."},
        {"word":"There are not very ___ students in this college. (many/much)","trans":"many","note":"Предложение с not допускает и many, и any; это упражнение уточнено ниже для однозначной проверки.","example":"There are not many students here. — Здесь немного студентов."},
        {"word":"The pair of socks ___ behind the bed. (was/were)","trans":"was","note":"Главное слово подлежащего — pair (пара), поэтому в единственном числе было was.","example":"The pair of socks was behind the bed. — Пара носков была за кроватью."},
        {"word":"У меня есть много друзей.","trans":"I have many friends.","note":"Many или a lot of возможны; здесь закрепляем a lot of.","example":"I have a lot of friends. — У меня много друзей."},
        {"word":"На улице много снега.","trans":"There is much snow in the street.","note":"Snow неисчисляемо. Нейтрально: a lot of snow, особенно в утвердительном предложении.","example":"There is a lot of snow outside. — На улице много снега."},
        {"word":"На дереве сидит несколько птиц.","trans":"There are a few birds in the tree.","note":"A few указывает, что на дереве несколько птиц.","example":"There are a few birds in the tree. — На дереве несколько птиц."},
        {"word":"У меня мало денег (денег недостаточно).","trans":"I have little money.","note":"Little money — мало денег; a little money означает «немного денег есть». Эти значения нельзя считать одинаковыми.","example":"I have little money. — У меня мало денег."},
        {"word":"У вас есть какие-либо вопросы?","trans":"Do you have any questions?","note":"Any используется в вопросе о наличии.","example":"Do you have any questions? — У вас есть вопросы?"},
        {"word":"В этой книге мало упражнений.","trans":"There are few exercises in this book.","note":"Few + исчисляемое exercises.","example":"There are few exercises in this book. — В этой книге мало упражнений."},
        {"word":"Я не пью много кофе.","trans":"I don't drink much coffee.","note":"Much coffee в отрицании; a lot of тоже возможно.","example":"I don't drink much coffee. — Я не пью много кофе."},
        {"word":"Я вижу много полезных книг на этой полке.","trans":"I see many useful books on this shelf.","note":"Many + исчисляемое books.","example":"I see many useful books on this shelf. — На этой полке я вижу много полезных книг."},
        {"word":"В моем чае много молока.","trans":"There is much milk in my tea.","note":"Milk неисчисляемо; a lot of milk — много молока.","example":"There is a lot of milk in my tea. — В моём чае много молока."},
        {"word":"Как много у тебя друзей?","trans":"How many friends do you have?","note":"How many для исчисляемых friends.","example":"How many friends do you have? — Сколько у тебя друзей?"},
        {"word":"Сколько сахара у тебя есть?","trans":"How much sugar do you have?","note":"How much для неисчисляемого sugar.","example":"How much sugar do you have? — Сколько у тебя сахара?"},
        {"word":"If two witches were watching two watches, which witch would watch which watch?","trans":"Если две ведьмы смотрели бы на двое часов, то какая ведьма смотрела бы на какие часы?","note":"Скороговорка тренирует различение звуков /w/ и /tʃ/ и слова witch / watch.","example":"Which witch would watch which watch? — Какая ведьма смотрела бы на какие часы?"}
    ],
    topic5: [
        {
            "word": "gram",
            "trans": "грамм",
            "note": "Единица массы, сокращение g.",
            "example": "Add 100 grams of flour. — Добавьте 100 граммов муки."
        },
        {
            "word": "kilogram",
            "trans": "килограмм",
            "note": "Тысяча граммов; сокращение kg.",
            "example": "We need one kilogram of potatoes. — Нам нужен килограмм картофеля."
        },
        {
            "word": "milligram",
            "trans": "миллиграмм",
            "note": "Одна тысячная грамма; сокращение mg.",
            "example": "The tablet contains 500 milligrams. — Таблетка содержит 500 миллиграммов."
        },
        {
            "word": "milliliter",
            "trans": "миллилитр",
            "note": "Одна тысячная литра; британское написание millilitre.",
            "example": "Add 50 milliliters of milk. — Добавьте 50 миллилитров молока."
        },
        {
            "word": "liter",
            "trans": "литр",
            "note": "Единица объёма; британское написание litre.",
            "example": "Pour one liter of water into the pot. — Налейте литр воды в кастрюлю."
        },
        {
            "word": "teaspoon",
            "trans": "чайная ложка",
            "note": "Мера объёма в рецептах, часто tsp; обычно 5 мл.",
            "example": "Add a teaspoon of sugar. — Добавьте чайную ложку сахара."
        },
        {
            "word": "tablespoon",
            "trans": "столовая ложка",
            "note": "Мера объёма в рецептах, tbsp; часто 15 мл (зависит от страны).",
            "example": "Use a tablespoon of oil. — Возьмите столовую ложку масла."
        },
        {
            "word": "cup",
            "trans": "чашка; мерный стакан",
            "note": "В рецептах cup — мера объёма; её значение зависит от страны.",
            "example": "Add a cup of flour. — Добавьте чашку муки."
        },
        {
            "word": "pinch",
            "trans": "щепотка",
            "note": "Небольшое количество, которое можно захватить пальцами.",
            "example": "Add a pinch of salt. — Добавьте щепотку соли."
        },
        {
            "word": "dash",
            "trans": "капля; чуть-чуть",
            "note": "Очень небольшое количество приправы или жидкости; мера приблизительная.",
            "example": "Add a dash of pepper. — Добавьте немного перца."
        },
        {
            "word": "drop",
            "trans": "капля",
            "note": "Отдельная маленькая капля жидкости.",
            "example": "Add a drop of vanilla extract. — Добавьте каплю ванильного экстракта."
        },
        {
            "word": "handful",
            "trans": "горсть",
            "note": "Столько, сколько помещается в ладони.",
            "example": "Add a handful of nuts. — Добавьте горсть орехов."
        },
        {
            "word": "clove",
            "trans": "зубчик (чеснока)",
            "note": "В кулинарии a clove of garlic — один зубчик чеснока.",
            "example": "Peel a clove of garlic. — Очистите зубчик чеснока."
        },
        {
            "word": "bunch",
            "trans": "пучок; гроздь",
            "note": "О растениях: пучок зелени; о винограде: гроздь.",
            "example": "Chop a bunch of parsley. — Нарежьте пучок петрушки."
        },
        {
            "word": "sprig",
            "trans": "веточка",
            "note": "Небольшой побег пряной зелени.",
            "example": "Add a sprig of thyme. — Добавьте веточку тимьяна."
        },
        {
            "word": "cube",
            "trans": "кубик",
            "note": "Небольшой предмет кубической формы.",
            "example": "Put a cube of ice in the glass. — Положите кубик льда в стакан."
        },
        {
            "word": "scoop",
            "trans": "совок; шарик (мороженого)",
            "note": "Scoop — порция, взятая специальной ложкой или совком.",
            "example": "I want a scoop of ice cream. — Я хочу шарик мороженого."
        },
        {
            "word": "dollop",
            "trans": "ложка (густого продукта)",
            "note": "Небольшая порция густой массы, например сливок или сметаны.",
            "example": "Add a dollop of cream. — Добавьте ложку густых сливок."
        },
        {
            "word": "pour",
            "trans": "наливать",
            "note": "Переливать жидкость из одной ёмкости в другую.",
            "example": "Pour the milk into the bowl. — Налейте молоко в миску."
        },
        {
            "word": "sprinkle",
            "trans": "посыпать",
            "note": "Рассыпать немного ингредиента по поверхности.",
            "example": "Sprinkle cheese on top. — Посыпьте сверху сыром."
        },
        {
            "word": "chop",
            "trans": "нарезать; рубить",
            "note": "Резать продукт на кусочки, обычно ножом; размер может различаться.",
            "example": "Chop the onions. — Нарежьте лук."
        },
        {
            "word": "slice",
            "trans": "нарезать ломтиками",
            "note": "Разрезать на тонкие плоские кусочки.",
            "example": "Slice the cucumber. — Нарежьте огурец ломтиками."
        },
        {
            "word": "dice",
            "trans": "нарезать мелкими кубиками",
            "note": "Резать на небольшие кубики, обычно более ровные, чем при chop.",
            "example": "Dice the carrots. — Нарежьте морковь мелкими кубиками."
        },
        {
            "word": "grate",
            "trans": "натереть",
            "note": "Измельчить продукт на тёрке.",
            "example": "Grate the cheese. — Натрите сыр."
        },
        {
            "word": "peel",
            "trans": "очистить (от кожуры)",
            "note": "Снять кожуру или внешнюю оболочку продукта.",
            "example": "Peel the potatoes. — Очистите картофель."
        },
        {
            "word": "crush",
            "trans": "раздавить; растолочь",
            "note": "Раздавить продукт, например чеснок или специи.",
            "example": "Crush the garlic. — Раздавите чеснок."
        },
        {
            "word": "beat",
            "trans": "взбить",
            "note": "Энергично перемешивать ингредиент до нужной консистенции.",
            "example": "Beat the eggs with a fork. — Взбейте яйца вилкой."
        },
        {
            "word": "whisk",
            "trans": "взбить венчиком",
            "note": "Взбивать венчиком, часто вводя воздух в смесь.",
            "example": "Whisk the cream. — Взбейте сливки венчиком."
        },
        {
            "word": "knead",
            "trans": "замесить (тесто)",
            "note": "Разминать и складывать тесто руками или миксером.",
            "example": "Knead the dough for five minutes. — Месите тесто пять минут."
        },
        {
            "word": "roll out",
            "trans": "раскатать",
            "note": "Сделать тесто тонким и плоским с помощью скалки.",
            "example": "Roll out the dough. — Раскатайте тесто."
        },
        {
            "word": "bake",
            "trans": "выпекать; запекать",
            "note": "Готовить в духовке, особенно хлеб, пироги и другие изделия.",
            "example": "Bake the bread for 30 minutes. — Выпекайте хлеб 30 минут."
        },
        {
            "word": "fry",
            "trans": "жарить",
            "note": "Готовить на сковороде или в масле.",
            "example": "Fry the onions in oil. — Обжарьте лук в масле."
        },
        {
            "word": "boil",
            "trans": "варить; кипятить",
            "note": "Готовить в кипящей воде или доводить жидкость до кипения.",
            "example": "Boil the potatoes. — Сварите картофель."
        },
        {
            "word": "simmer",
            "trans": "тушить на слабом огне; томить",
            "note": "Готовить жидкое блюдо при слабом кипении, ниже интенсивного boil.",
            "example": "Simmer the soup for 20 minutes. — Томите суп 20 минут на слабом огне."
        },
        {
            "word": "roast",
            "trans": "запекать в духовке",
            "note": "Готовить мясо или овощи сухим жаром, часто до румяной корочки.",
            "example": "Roast the chicken in the oven. — Запеките курицу в духовке."
        },
        {
            "word": "season",
            "trans": "приправлять",
            "note": "Добавлять соль, перец, травы и другие приправы.",
            "example": "Season the soup with salt. — Приправьте суп солью."
        },
        {
            "word": "garnish",
            "trans": "украшать (блюдо)",
            "note": "Добавлять съедобное украшение перед подачей.",
            "example": "Garnish with fresh herbs. — Украсьте блюдо свежей зеленью."
        },
        {
            "word": "add",
            "trans": "добавить",
            "note": "Положить дополнительный ингредиент в смесь или блюдо.",
            "example": "Add two eggs. — Добавьте два яйца."
        },
        {
            "word": "mix",
            "trans": "смешать",
            "note": "Соединить несколько ингредиентов.",
            "example": "Mix flour and water. — Смешайте муку и воду."
        },
        {
            "word": "stir",
            "trans": "размешать; помешивать",
            "note": "Перемешивать круговыми движениями, обычно ложкой.",
            "example": "Stir the soup gently. — Осторожно помешивайте суп."
        }
    ]
};
