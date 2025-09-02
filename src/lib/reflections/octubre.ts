// src/lib/reflections/octubre.ts
import type { DailyReflection } from '@/lib/reflections';

// Aquí puedes añadir las pistas de reflexión para el mes de octubre.
const dailyReflections: DailyReflection[] = [
  {
    level: 'secundaria',
    day: 1,
    questions: [
      'El texto sugiere marcarse un objetivo. ¿Qué te impide a veces cumplir las metas que te propones?',
      '¿De qué manera tus acciones diarias pueden influir positivamente en las personas que te rodean?',
      'Reflexiona sobre la última vez que te sentiste orgulloso/a de algo que lograste por tu propio esfuerzo. ¿Qué aprendiste de esa experiencia?'
    ]
  },
  {
    level: 'primaria',
    day: 1,
    questions: [
      'Octubre es un mes de otoño. ¿Qué es lo que más te gusta de esta estación del año?',
      'Mira a tu alrededor en clase. ¿Puedes encontrar tres cosas por las que dar las gracias hoy?',
      'Si pudieras pintar un cuadro sobre el otoño, ¿qué colores usarías y qué dibujarías?'
    ]
  }
];

export default dailyReflections;
