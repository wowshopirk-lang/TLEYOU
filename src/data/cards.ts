export interface Card {
  id: number;
  question: string;
  category: "self" | "feelings" | "desires" | "relationships" | "future";
}

export const cards: Card[] = [
  // День 1-6: Знакомство с собой
  { id: 1, question: "Когда ты последний раз делала что-то только для себя?", category: "self" },
  { id: 2, question: "Что бы ты сделала, если бы никто не узнал?", category: "desires" },
  { id: 3, question: "Какое слово лучше всего описывает тебя сегодня?", category: "feelings" },
  { id: 4, question: "За что ты благодарна себе?", category: "self" },
  { id: 5, question: "Что ты откладываешь на потом уже слишком долго?", category: "desires" },
  { id: 6, question: "Если бы твоё тело могло говорить, что бы оно сказало?", category: "feelings" },
  
  // День 7-12: Чувства и эмоции
  { id: 7, question: "Какую эмоцию ты чаще всего подавляешь?", category: "feelings" },
  { id: 8, question: "Что заставляет тебя чувствовать себя живой?", category: "feelings" },
  { id: 9, question: "Чего ты боишься больше всего?", category: "feelings" },
  { id: 10, question: "Когда ты плакала в последний раз и почему?", category: "feelings" },
  { id: 11, question: "Что даёт тебе ощущение безопасности?", category: "feelings" },
  { id: 12, question: "Какая часть твоей жизни требует больше честности?", category: "self" },
  
  // День 13-18: Желания и мечты
  { id: 13, question: "О чём ты мечтала в детстве?", category: "desires" },
  { id: 14, question: "Что бы ты изменила в своей жизни, если бы могла?", category: "desires" },
  { id: 15, question: "Какая версия себя тебе нравится больше всего?", category: "self" },
  { id: 16, question: "Что ты хочешь, но боишься попросить?", category: "desires" },
  { id: 17, question: "Какой навык ты хотела бы освоить?", category: "desires" },
  { id: 18, question: "Где бы ты хотела оказаться через год?", category: "future" },
  
  // День 19-24: Отношения
  { id: 19, question: "С кем ты чувствуешь себя настоящей?", category: "relationships" },
  { id: 20, question: "Какие отношения забирают твою энергию?", category: "relationships" },
  { id: 21, question: "Что ты хотела бы сказать, но молчишь?", category: "relationships" },
  { id: 22, question: "Кого тебе не хватает?", category: "relationships" },
  { id: 23, question: "За что ты ещё не простила себя?", category: "self" },
  { id: 24, question: "Какая граница требует защиты?", category: "relationships" },
  
  // День 25-30: Будущее и смыслы
  { id: 25, question: "Что придаёт твоей жизни смысл?", category: "future" },
  { id: 26, question: "Какое послание ты хотела бы оставить себе?", category: "future" },
  { id: 27, question: "Что ты выберешь: стабильность или свободу?", category: "future" },
  { id: 28, question: "Какой урок преподнёс тебе этот год?", category: "self" },
  { id: 29, question: "Что значит для тебя быть счастливой?", category: "future" },
  { id: 30, question: "Кем ты хочешь стать для себя?", category: "future" },
];

export const categoryNames: Record<Card["category"], string> = {
  self: "Познание себя",
  feelings: "Чувства",
  desires: "Желания",
  relationships: "Отношения",
  future: "Будущее",
};

export const categoryColors: Record<Card["category"], string> = {
  self: "var(--color-moss)",
  feelings: "var(--color-moss-light)",
  desires: "#a78bfa",
  relationships: "#f472b6",
  future: "#60a5fa",
};













