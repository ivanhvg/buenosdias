// src/lib/reflections.ts

export interface DailyReflection {
  level: 'primaria' | 'secundaria';
  day: number; // Day of the month
  questions: string[];
}

export async function getDailyReflectionsForLevel(level: string, date: Date): Promise<string[]> {
  const month = date.toLocaleString('es-ES', { month: 'long' }).toLowerCase();
  const day = date.getDate();

  try {
    // Carga dinámica del archivo de reflexiones del mes correspondiente
    const monthModule = await import(`@/lib/reflections/${month}`);
    const dailyReflections: DailyReflection[] = monthModule.default;

    // Busca las reflexiones para el día y nivel específicos
    const foundReflection = dailyReflections.find(
      (r) => r.level === level && r.day === day
    );

    if (foundReflection) {
      return foundReflection.questions;
    }
  } catch (error) {
    console.warn(`No se encontró el archivo de reflexiones para: ${month}`, error);
  }

  // Devuelve un array vacío si no se encuentran reflexiones.
  return [];
}
