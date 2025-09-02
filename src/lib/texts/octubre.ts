// src/lib/texts/octubre.ts
import type { DailyText } from '@/lib/texts';

// Aquí puedes añadir todos los textos para el mes de octubre.
// El sistema los cargará automáticamente según el día.
const dailyTexts: DailyText[] = [
  {
    level: 'primaria',
    day: 1, // Corresponde al 1 de octubre
    text: 'Octubre nos trae nuevos colores en la naturaleza. Miremos a nuestro alrededor y demos gracias por las cosas bonitas que vemos cada día.'
  },
  {
    level: 'secundaria',
    day: 1, // Corresponde al 1 de octubre
    text: 'Comienza un nuevo mes, una página en blanco. ¿Qué pequeño objetivo realista te puedes marcar para estas próximas semanas? Piensa en algo que dependa de ti.'
  },
  {
    level: 'primaria',
    day: 2,
    text: 'Ayudar a un compañero cuando no entiende algo es como darle un pequeño regalo. Hoy, busca la oportunidad de ser amable y ayudar a alguien en clase.'
  },
  {
    level: 'secundaria',
    day: 2,
    text: 'La empatía es la capacidad de ponerse en el lugar del otro. Hoy, antes de juzgar la acción de un compañero o amigo, intenta pensar qué puede estar sintiendo o por qué actúa de esa manera.'
  }
  // Puedes seguir añadiendo más textos para otros días y niveles aquí...
];

export default dailyTexts;
