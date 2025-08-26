import { DailyReflectionPage } from '@/components/daily-reflection-page';

export default async function Home() {
  // Dado que los textos ahora se cargan en el cliente,
  // ya no es necesario cargarlos inicialmente en el servidor.
  // El componente DailyReflectionPage se encargará de todo.
  return <DailyReflectionPage initialText="" initialQuestions={[]} />;
}
