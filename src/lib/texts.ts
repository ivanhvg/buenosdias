// src/lib/texts.ts

export interface DailyText {
  level: 'primaria' | 'secundaria';
  day: number; // Day of the month
  text: string;
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
  return "Hoy no hay lectura para la etapa seleccionada. Por favor, vuelve mañana.";
}


export function getInitialDailyText(): string {
  // Este texto inicial es un marcador de posición y se reemplaza en el cliente.
  return "Cargando texto del día...";
}