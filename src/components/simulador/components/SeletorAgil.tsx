// Seleciona o quanto acima ou abaixo da
// tabela fipe o carro velho será vendido.

// Tranforma o componente em Client Component
"use client";

// Import os Hooks
import { useContext, useEffect, useState } from "react";

// Importa o Contexto
import { SimulationContext } from "@/contexts/ContextoSimulacao";

export default function SeletorAgil() {
  // Acessa as informaçõees do Contexto
  const {
    carroVelho,
    valorVendaCarroVelho,
    setValorVendaCarroVelho,
  } = useContext(SimulationContext);

  const [valorAgil, setValorAgil] = useState<number>(0);

  // Lida com a Mudança do Agil
  function handleSliderChange(agil: string) {
    setValorAgil(Number(agil));
  }
  function handleButtonClick(buttonValue: string) {
    setValorAgil(Number(buttonValue));
  }

  // Calcula o Valor de Venda do Carro Velho
  useEffect(() => {
    if (carroVelho) {
      const valorCarroVelhoNumerico =
        parseFloat(carroVelho?.Valor.replace(/\D/g, "").replace(",", ".")) /
        100;
      const valorVenda =
        valorCarroVelhoNumerico -
        (valorCarroVelhoNumerico * Number(valorAgil * -1)) / 100;

      setValorVendaCarroVelho(
        valorVenda.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      );
    }
  }, [carroVelho, valorAgil]);

  return (
    <div className="flex flex-col py-[6rem] gap-16 bg-zinc-100">
      <h2 className="self-center text-3xl text-center max-w-sm text-azul-standart font-semibold">
        Qual é a sua expectativa de venda de seu veículo atual em relação a
        tabela FIPE?
      </h2>

      <div className="flex flex-col items-center gap-12">
        <div
          id="TABLE"
          className="table w-full rounded-lg overflow-hidden max-w-md px-4"
        >
          <div className="table-header-group bg-white">
            <div className="table-row child:border child:p-3">
              <div className="table-cell w-[50%] text-left">
                Valor na Tabela
              </div>
              <div className="table-cell w-[50%] text-left">
                Expectativa de Venda
              </div>
            </div>
          </div>
          <div className="table-row-group">
            <div className="table-row child:border child:p-3 bg-azul-standart text-white">
              <div className="table-cell">
                {carroVelho?.Valor ? carroVelho?.Valor : "R$ 0,00"}
              </div>
              <div className="table-cell">
                {valorVendaCarroVelho.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs px-5 flex flex-col items-center gap-4">
          <p className="border rounded-md p-3 max-w-[80px] w-full text-center">
            {valorAgil}%
          </p>
          <input
            type="range"
            min="-20"
            max="20"
            value={valorAgil}
            step={1}
            onChange={(event) => handleSliderChange(event.target.value)}
            className="w-full cursor-pointer"
            name="rangeInput"
          />

          <div className="flex w-full justify-between gap-2 flex-wrap child:border child:p-2 child:rounded-md text-sm">
            <button onClick={() => handleButtonClick("-20")} className="-ml-5">
              -20%
            </button>
            <button onClick={() => handleButtonClick("20")} className="-mr-5">
              20%
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
