import Image from "next/image";

import rapazNoCarro from "/public/rapazCarro.png";

export default function SecaoHero() {
  return (
    <div className="gradiente min-h-[380px] flex items-center px-4 py-12 md:py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
        <div className="text-white space-y-5 flex-[1.75]">
          <p>CAIXA › Para você › Crédito › Financiamentos › Crédito Auto CAIXA</p>

          <h2 className="text-4xl md:text-7xl">Crédito Auto CAIXA</h2>
          <p className="text-lg max-w-xl">
            Financie até 80% do seu veículo com taxa de juros pré-fixada e sem cobrança de tarifas
            adicionais.
          </p>
        </div>
        <div className="flex-[1]">
          <Image src={rapazNoCarro} width={450} height={450} alt="Rapaz no carro" />
        </div>
      </div>
    </div>
  );
}
