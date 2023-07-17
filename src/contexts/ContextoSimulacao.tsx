// Componente de Contexto da Aplicação

// Tranforma o componente em Client Component
"use client";

// Importa os Hooks
import { createContext, useState } from "react";

// Tipagem do Carro Selecionado
export interface CarroSeleciodanoProps {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

// Cria o Contexto
export const SimulationContext = createContext<any>(null);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  // Estado do Carro Novo
  const [carroNovo, setCarroNovo] = useState<null | CarroSeleciodanoProps>(null);

  // Estado do Carro Velho
  const [carroVelho, setCarroVelho] = useState<null | CarroSeleciodanoProps>(null);

  // Estado da Entrada
  const [valorEntrada, setValorEntrada] = useState<number>(0);

  // Estado Valor de Venda Carro Velho
  const [valorVendaCarroVelho, setValorVendaCarroVelho] = useState<number>(0);

  // Estado do Valor Necessario
  const [valorNecessario, setValorNecessario] = useState<number>(0);

  return (
    <SimulationContext.Provider
      value={{
        carroNovo,
        setCarroNovo,
        carroVelho,
        setCarroVelho,
        valorEntrada,
        setValorEntrada,
        valorVendaCarroVelho,
        setValorVendaCarroVelho,
        valorNecessario,
        setValorNecessario,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}
