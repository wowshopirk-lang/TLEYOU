import { NextRequest, NextResponse } from 'next/server';

// Character system prompts
const characterPrompts: Record<string, string> = {
  veles: `Ты — Велес, мудрый олень-хранитель древнего леса. Ты говоришь спокойно, философски, используя метафоры леса и природы. Ты мудр и терпелив, всегда выслушиваешь и даёшь глубокие, вдумчивые ответы. 

Правила:
- Отвечай на ЛЮБЫЕ вопросы пользователя — будь то проблемы в отношениях, работе, жизни, или просто разговоры
- Давай конкретные советы и поддержку, не отделывайся общими фразами
- Используй метафоры леса и природы в своей речи
- Будь эмпатичным и заботливым
- Пиши на русском языке
- Не упоминай что ты AI или языковая модель — ты Велес, хранитель леса
- Отвечай кратко, но содержательно (2-4 предложения)`,

  mudra: `Ты — Мудра, древняя сова из глубины леса. Ты аналитична и глубока, любишь задавать вопросы, которые помогают человеку самому найти ответ. Ты видишь то, что скрыто от других.

Правила:
- Отвечай на ЛЮБЫЕ вопросы — помогай разобраться в ситуациях, отношениях, решениях
- Задавай глубокие вопросы, но также давай и ответы
- Используй мудрость и интуицию в своих ответах
- Иногда отвечай вопросом на вопрос, чтобы помочь человеку задуматься
- Пиши на русском языке
- Не упоминай что ты AI — ты Мудра, древняя сова
- Отвечай кратко, но глубоко (2-4 предложения)`,

  liska: `Ты — Лиска, весёлая и хитрая лисица из лесной чащи. Ты позитивная, с лёгким чувством юмора, умеешь найти светлую сторону в любой ситуации. Ты хитра и изобретательна в решении проблем.

Правила:
- Отвечай на ЛЮБЫЕ вопросы — помогай с проблемами, поддерживай в трудностях
- Используй лёгкий юмор и позитив, но будь искренней в поддержке
- Предлагай нестандартные решения и взгляды на проблемы
- Умей подбодрить и развеселить, когда это уместно
- Пиши на русском языке
- Не упоминай что ты AI — ты Лиска, рыжая лисица
- Отвечай живо и легко (2-4 предложения)`,

  grey: `Ты — Серый, сильный волк-одиночка. Ты прямолинеен и честен, не ходишь вокруг да около. Ты мотивируешь действовать, даёшь силу и уверенность. Ты знаешь, что такое преодолевать трудности.

Правила:
- Отвечай на ЛЮБЫЕ вопросы — давай честные, прямые советы
- Мотивируй действовать, не жалеть себя
- Будь прямолинеен, но не грубым — поддерживай силой
- Говори о преодолении, силе воли, действии
- Пиши на русском языке
- Не упоминай что ты AI — ты Серый, волк из стаи
- Отвечай коротко и по делу (2-4 предложения)`,
};

export async function POST(request: NextRequest) {
  try {
    const { message, character, history } = await request.json();

    if (!message || !character) {
      return NextResponse.json(
        { error: 'Message and character are required' },
        { status: 400 }
      );
    }

    const systemPrompt = characterPrompts[character];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Invalid character' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      // Fallback to smart responses if no API key
      return NextResponse.json({
        response: getFallbackResponse(message, character),
        fallback: true,
      });
    }

    // Build messages array with history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []).slice(-10).map((msg: { text: string; isBot: boolean }) => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tleyou.ru',
        'X-Title': 'TLEYOU Forest Chat',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      
      // Fallback on API error
      return NextResponse.json({
        response: getFallbackResponse(message, character),
        fallback: true,
      });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || getFallbackResponse(message, character);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Fallback responses when API is not available
function getFallbackResponse(message: string, character: string): string {
  const lowerMessage = message.toLowerCase();
  
  const responses: Record<string, Record<string, string[]>> = {
    veles: {
      sad: [
        'Грусть — как осенний дождь в лесу. Он питает землю для новых цветов. Позволь себе прочувствовать её.',
        'Я вижу тяжесть в твоих словах. Помни — даже самая долгая ночь заканчивается рассветом.',
      ],
      anxiety: [
        'Тревога — это ветер, который качает деревья. Но корни крепки. Дыши глубже, ты в безопасности.',
        'Когда лес тревожится, он замирает и слушает. Попробуй и ты — замри, вдохни, прислушайся к себе.',
      ],
      relationship: [
        'Отношения — как два дерева рядом. Им нужно пространство, чтобы расти, но корни могут переплетаться.',
        'В лесу каждое существо находит свою пару в своё время. Доверься течению жизни.',
      ],
      default: [
        'Расскажи мне больше. Я слушаю тебя внимательно, как лес слушает шёпот ветра.',
        'Каждое твоё слово важно. Продолжай — я здесь, чтобы понять и поддержать.',
      ],
    },
    mudra: {
      sad: [
        'Откуда растёт эта грусть? Что она пытается тебе сказать?',
        'Грусть часто указывает на что-то важное. Что ты потеряла или боишься потерять?',
      ],
      anxiety: [
        'Что именно тревожит тебя больше всего? Давай разберём это вместе.',
        'Тревога часто связана с неизвестностью. Что ты можешь контролировать в этой ситуации?',
      ],
      relationship: [
        'Какой урок эти отношения пытаются тебе преподать?',
        'Что ты на самом деле ищешь в этих отношениях? Ответ внутри тебя.',
      ],
      default: [
        'Интересно... А что ты сама думаешь об этом?',
        'Давай копнём глубже. Что стоит за этими словами?',
      ],
    },
    liska: {
      sad: [
        'Эй, знаешь что? Грусть — это просто облачко, которое закрыло солнце. Оно уже двигается!',
        'Бывает... Но я знаю хитрость — найди одну маленькую радость прямо сейчас. Даже крошечную!',
      ],
      anxiety: [
        'Ох, тревога — это как белка, которая носится кругами. Давай её поймаем и разберёмся, чего она хочет!',
        'Знаешь что? Большинство страхов — это просто тени. Давай посветим на них фонариком!',
      ],
      relationship: [
        'Ох уж эти отношения! Знаешь, иногда нужно немного лисьей хитрости — и всё встанет на места.',
        'А ты пробовала посмотреть на это с другой стороны? У лис всегда есть запасной выход!',
      ],
      default: [
        'Ого, интересно! Рассказывай дальше, я вся во внимании!',
        'Хм-м, а что если попробовать вот так... Впрочем, давай обсудим!',
      ],
    },
    grey: {
      sad: [
        'Грусть — это нормально. Но не позволяй ей остановить тебя. Вставай и двигайся вперёд.',
        'Волки тоже знают боль. Но мы не сдаёмся. Ты сильнее, чем думаешь.',
      ],
      anxiety: [
        'Страх — это сигнал. Не убегай от него, посмотри ему в глаза. Что ты видишь?',
        'Хватит бояться. Действуй. Даже маленький шаг лучше, чем стоять на месте.',
      ],
      relationship: [
        'В отношениях нужна честность. Ты сказала то, что думаешь? Если нет — скажи.',
        'Не трать время на тех, кто не ценит тебя. Ты заслуживаешь настоящего.',
      ],
      default: [
        'Говори прямо. Что тебе нужно?',
        'Я слушаю. Давай без лишних слов — в чём суть?',
      ],
    },
  };

  const charResponses = responses[character] || responses.veles;
  
  let category = 'default';
  if (lowerMessage.includes('груст') || lowerMessage.includes('плохо') || lowerMessage.includes('тоск') || lowerMessage.includes('плач')) {
    category = 'sad';
  } else if (lowerMessage.includes('тревог') || lowerMessage.includes('страш') || lowerMessage.includes('боюсь') || lowerMessage.includes('паник')) {
    category = 'anxiety';
  } else if (lowerMessage.includes('отношен') || lowerMessage.includes('парен') || lowerMessage.includes('девушк') || lowerMessage.includes('муж') || lowerMessage.includes('жен') || lowerMessage.includes('любо') || lowerMessage.includes('расстал')) {
    category = 'relationship';
  }

  const categoryResponses = charResponses[category] || charResponses.default;
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}



