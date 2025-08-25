// src/lib/texts.ts

export interface DailyText {
  level: 'infantil-primaria' | 'secundaria';
  date: string; // YYYY-MM-DD
  text: string;
}

// Aquí es donde puedes añadir todos los textos.
// Asegúrate de que el formato de la fecha sea AAAA-MM-DD.
const dailyTexts: DailyText[] = [
  {
    level: 'infantil-primaria',
    date: '2025-08-26',
    text: 'Texto de ejemplo para Infantil y Primaria del 26 de agosto de 2025.',
  },
  {
    level: 'secundaria',
    date: '2025-08-26',
    text: 'Texto de ejemplo para Secundaria del 26 de agosto de 2025.',
  },
  // Añade más textos aquí...
  {
    level: 'infantil-primaria',
    date: '2025-08-27',
    text: 'Otro texto para Infantil y Primaria del 27 de agosto de 2025.',
  },
  {
    level: 'secundaria',
    date: '2025-08-27',
    text: 'Otro texto para Secundaria del 27 de agosto de 2025.',
  },
];

export function getDailyTextForLevel(level: string, date: Date): string {
  const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
  const foundText = dailyTexts.find(
    (t) => t.level === level && t.date === dateString
  );
  
  if (foundText) {
    return foundText.text;
  }

  // Texto por defecto si no se encuentra uno para la fecha y nivel específicos.
  return "No hay un texto disponible para el nivel y la fecha seleccionados. Por favor, selecciona otro nivel o vuelve mañana.";
}

export function getInitialDailyText(): string {
  return "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.";
}
