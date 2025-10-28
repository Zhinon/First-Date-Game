import { CardCategory, CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: CardCategory.PERSONAL,
    label: 'Personales',
    prompt: "Genera una pregunta personal interesante y que invite a la reflexión para una primera cita. Debe ser apropiada pero reveladora. La pregunta debe estar en español. Responde ÚNICAMENTE con la pregunta, sin texto introductorio, explicaciones, ni comillas.",
    color: 'bg-rose-500 hover:bg-rose-600',
    gradient: 'from-rose-400 to-pink-500',
    icon: '❤️',
  },
  {
    id: CardCategory.PHILOSOPHICAL,
    label: 'Filosóficas',
    prompt: "Genera una pregunta filosófica profunda pero accesible para iniciar una conversación en una cita. Debe ser estimulante y no demasiado académica. La pregunta debe estar en español. Responde ÚNICAMENTE con la pregunta, sin texto introductorio, explicaciones, ni comillas.",
    color: 'bg-indigo-500 hover:bg-indigo-600',
    gradient: 'from-indigo-400 to-purple-500',
    icon: '🤔',
  },
  {
    id: CardCategory.IDEOLOGICAL,
    label: 'Ideológicas',
    prompt: "Genera una pregunta sobre ideología o valores que sea respetuosa y abra el debate de forma positiva. Evita temas políticos polarizantes. La pregunta debe estar en español. Responde ÚNICAMENTE con la pregunta, sin texto introductorio, explicaciones, ni comillas.",
    color: 'bg-teal-500 hover:bg-teal-600',
    gradient: 'from-teal-400 to-cyan-500',
    icon: '⚖️',
  },
  {
    id: CardCategory.FUNNY,
    label: 'Graciosas',
    prompt: "Genera una pregunta divertida, hipotética y ligera para romper el hielo en una cita. Debe ser creativa. La pregunta debe estar en español. Responde ÚNICAMENTE con la pregunta, sin texto introductorio, explicaciones, ni comillas.",
    color: 'bg-amber-500 hover:bg-amber-600',
    gradient: 'from-amber-400 to-orange-500',
    icon: '😂',
  },
  {
    id: CardCategory.SPICY,
    label: 'Picantes',
    prompt: "Genera una prenda o pregunta picante y juguetona para una primera cita. Debe ser coqueta pero respetuosa. La pregunta debe estar en español. Responde ÚNICAMENTE con el texto de la prenda o pregunta, sin texto introductorio, explicaciones, ni comillas.",
    color: 'bg-red-600 hover:bg-red-700',
    gradient: 'from-red-500 to-orange-600',
    icon: '🔥',
  },
  {
    id: CardCategory.RANDOM,
    label: 'Aleatorio',
    prompt: "Elige una categoría al azar y genera una pregunta de esa categoría.",
    color: 'bg-slate-500 hover:bg-slate-600',
    gradient: 'from-slate-400 to-gray-500',
    icon: '🎲',
  },
];