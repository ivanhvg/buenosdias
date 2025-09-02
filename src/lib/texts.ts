// src/lib/texts.ts

export interface DailyText {
  level: 'primaria' | 'secundaria';
  day: number; // Day of the month
  text: string;
}

// Función para obtener la fecha de hoy
function getToday() {
    return new Date();
}

// Función para obtener la fecha en formato YYYY-MM-DD
function getTodayDateString() {
    const today = getToday();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export async function getDailyTextForLevel(level: string, date: Date): Promise<string> {
  const month = date.toLocaleString('es-ES', { month: 'long' }).toLowerCase();
  const day = date.getDate();

  try {
    // Carga dinámica del archivo del mes correspondiente
    const monthModule = await import(`@/lib/texts/${month}`);
    const dailyTexts: DailyText[] = monthModule.default;

    // Busca un texto para el día y nivel específicos
    const foundText = dailyTexts.find(
      (t) => t.level === level && t.day === day
    );

    if (foundText) {
      return foundText.text;
    }
  } catch (error) {
    console.warn(`No se encontró el archivo de textos para: ${month}`, error);
  }

  // Texto por defecto si no se encuentra uno para la fecha y nivel específicos.
  return "No hay un texto disponible para el nivel y la fecha seleccionados. Por favor, selecciona otro nivel o vuelve mañana.";
}


export function getInitialDailyText(): string {
  // Este texto inicial es un marcador de posición y se reemplaza en el cliente.
  return "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the a, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.";
}
