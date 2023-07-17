import "../style/globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { SimulationProvider } from "@/contexts/ContextoSimulacao";

export const metadata = {
  title: "Simulador Auto Caixa",
  description: "Está na hora de trocar de carro! Simule com a gente!",
  icons: {
    icon: "/caixa-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <SimulationProvider>{children}</SimulationProvider>
        <Footer />
      </body>
    </html>
  );
}
