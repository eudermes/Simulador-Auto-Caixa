// Esse componente serve de container para tudo
// relacionado a simulação

// Tranforma o componente em Client Component
"use client";

// importa Hooks
import { useContext, useState } from "react";

// Importa componentes
import {
  SeletorAgil,
  CarroSelecionado,
  CondicaoFinanciamento,
  SeletorCarro,
  SeletorEntrada,
} from "./exports";
import { SimulationContext } from "@/contexts/ContextoSimulacao";

export default function Simulador() {
  const [temCarroVelho, setTemCarroVelho] = useState<boolean>(false);

  const { setCarroVelho, setValorVendaCarroVelho } = useContext(
    SimulationContext
  );

  function handleTemCarroVelho(indicador: "Sim" | "Não") {
    if (indicador === "Sim") {
      setTemCarroVelho(true);
    }
    if (indicador === "Não") {
      setTemCarroVelho(false);
      setCarroVelho(null);
      setValorVendaCarroVelho(0);
    }
  }

  return (
    <>
      <div className="flex flex-col py-[8rem] gap-[6rem] px-2 container mx-auto">
        <h2 className="self-center text-3xl text-center max-w-sm text-azul-standart font-semibold">
          Por favor, selecione o veículo que você deseja financiar.
        </h2>
        <div className="flex flex-col gap-20 md:flex-row child:flex-1 items-center md:items-start md:justify-evenly">
          <SeletorCarro tipoCarro="carroNovo" />
          <CarroSelecionado tipoCarro="carroNovo" />
        </div>
      </div>
      <div className="flex flex-col py-[8rem] gap-[10rem] gradiente min-h-[500px] justify-center">
        <div className="flex justify-center items-center flex-col gap-12 container mx-auto">
          <h2 className="text-center max-w-sm self-center text-3xl text-white font-semibold p-2">
            Você deseja considerar a cotação de seu veículo atual nos cálculos
            do financiamento?
          </h2>
          <p className="text-white p-4">
            (ATENÇÃO: cotação com objetivo informativo, não há vínculo da Caixa
            na negociação de seu atual veículo.)
          </p>
          <div className="flex gap-12 self-center child:border child:px-6 child:py-3 child:rounded-md">
            <button
              onClick={() => handleTemCarroVelho("Sim")}
              className={`${
                temCarroVelho && "bg-white !text-azul-standart"
              } text-white font-semibold`}
            >
              Sim
            </button>
            <button
              onClick={() => handleTemCarroVelho("Não")}
              className={`${
                !temCarroVelho && "bg-white !text-azul-standart"
              } text-white font font-semibold`}
            >
              Não
            </button>
          </div>
        </div>
      </div>
      {temCarroVelho && (
        <div className="p-2 gap-20 mx-auto flex flex-col md:flex-row child:flex-1 items-center md:items-start md:justify-evenly container py-[8rem]">
          <SeletorCarro tipoCarro="carroVelho" />
          <CarroSelecionado tipoCarro="carroVelho" />
        </div>
      )}

      {temCarroVelho && <SeletorAgil />}

      <SeletorEntrada />
      <CondicaoFinanciamento />
    </>
  );
}
