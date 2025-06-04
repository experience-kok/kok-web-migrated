import QueryProvider from './query-provider';
import SonnerProvider from './sonner-provider';
import ThemeProvider from './theme-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SonnerProvider />
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
