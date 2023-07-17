import { ChangeEvent, useContext } from "react";

import { SimulationContext } from "@/contexts/ContextoSimulacao";

import CurrencyInput from "react-currency-input-field";

export default function SeletorEntrada() {
  // Acessa as informações do Contexto
  const { setValorEntrada } = useContext(SimulationContext);

  // Lida com a mudança na Entrada
  function handleValorEntrada(event: ChangeEvent<HTMLInputElement>) {
    const valorInputEntrada = event.target.value;

    const valorNumericoEntrada = parseFloat(
      valorInputEntrada.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );

    if (valorNumericoEntrada) {
      setValorEntrada(valorNumericoEntrada);
    } else setValorEntrada(0);
  }

  // Calcular

  return (
    <div className="flex flex-col py-[6rem] gap-16 items-center justify-center bg-casalCarro bg-cover bg-right-top relative min-h-[700px] ">
      <div className="absolute w-full h-full bg-zinc-900/80 top-0" />
      <div className="z-50">
        <h2 className="self-center text-3xl text-center max-w-sm text-white font-semibold mb-10 p-2">
          DESCONSIDERANDO o valor de venda de seu atual veículo, qual é o valor
          disponível para entrada no financiamento?
        </h2>
        <form className="flex flex-col items-center gap-12">
          <CurrencyInput
            className="border p-3 rounded-md border-cinza-standart"
            groupSeparator="."
            decimalSeparator=","
            prefix="R$"
            onChange={handleValorEntrada}
            placeholder="Entrada"
            required
          />
        </form>
      </div>
    </div>
  );
}
