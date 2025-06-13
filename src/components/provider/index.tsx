import { JotaiProvider } from './jotai-provider';
import QueryProvider from './query-provider';
import SonnerProvider from './sonner-provider';
// import ThemeProvider from './theme-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SonnerProvider />
      <QueryProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryProvider>
    </>
  );
}
