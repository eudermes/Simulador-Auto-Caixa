// Componente que Exibe as informações do carro selecionado.

// Tranforma o componente em Client Component
"use client";

import Image from "next/image";

// Importa o Array de imagens
import { imagensCarros } from "@/data/imagensCarros";

// Importa os Hooks
import { useContext, useEffect, useState } from "react";

// Importa o Contexto
import { SimulationContext } from "@/contexts/ContextoSimulacao";

// Tipagem das Props do componente
interface SeletorCarroProps {
  tipoCarro: "carroVelho" | "carroNovo";
}

// Importa a tipagem do carroEscolhido
import { CarroSeleciodanoProps } from "@/contexts/ContextoSimulacao";

export default function CarroSelecionado({ tipoCarro }: SeletorCarroProps) {
  // Acessando Variáveis do Contexto
  const { carroVelho, carroNovo } = useContext(SimulationContext);

  // Estado do Carro a ser Mostrado
  const [carroEscolhido, setCarroEscolhido] = useState<null | CarroSeleciodanoProps>(null);

  // Estado da Imagem do carro a ser Mostrado
  const [imagemEmBreve, setImagemEmBreve] = useState("/carroEmPreparacao.png");

  // Atualiza informações e Imagem do Carro escolhido
  useEffect(() => {
    let carroAtualizado: any;

    if (tipoCarro === "carroNovo") {
      carroAtualizado = carroNovo;
    } else if (tipoCarro === "carroVelho") {
      carroAtualizado = carroVelho;
    }
    setCarroEscolhido(carroAtualizado);

    // Busca a Imagem no Array de Urls
    const carroCorrespondente = imagensCarros.find(
      (carroDoArray) =>
        carroAtualizado &&
        carroAtualizado.Marca.toLowerCase().includes(carroDoArray.marca.toLowerCase()) &&
        carroAtualizado.Modelo.toLowerCase().includes(carroDoArray.modelo.toLowerCase())
    );

    if (carroCorrespondente) {
      setImagemEmBreve(carroCorrespondente.url);
    } else {
      setImagemEmBreve("/carroEmPreparacao.png");
    }
  }, [carroNovo, carroVelho, tipoCarro]);

  // Lida com links Quebrados
  function handleImagemQuebrou() {
    setImagemEmBreve("/carroEmPreparacao.png");
  }

  return (
    <div className="max-w-sm rounded-md overflow-hidden ">
      <Image
        src={imagemEmBreve}
        alt="Imagem em breve"
        width={500}
        height={500}
        className="w-full md:max-h-60 object-cover object-center p-2 border"
        priority
        onError={handleImagemQuebrou}
      />

      <div id="TABLE" className="table w-full max-w-sm bg-azul-standart text-white">
        <div className="table-row-group">
          <div className="table-row child:border child:p-3">
            <div className="table-cell">Código Fipe:</div>
            <div className="table-cell">{carroEscolhido?.CodigoFipe}</div>
          </div>
        </div>

        <div className="table-row-group">
          <div className="table-row child:border child:p-3">
            <div className="table-cell w-[40%]">Marca:</div>
            <div className="table-cell w-[60%]">{carroEscolhido?.Marca}</div>
          </div>
        </div>

        <div className="table-row-group">
          <div className="table-row child:border child:p-3">
            <div className="table-cell">Modelo:</div>
            <div className="table-cell">{carroEscolhido?.Modelo}</div>
          </div>
        </div>

        <div className="table-row-group">
          <div className="table-row child:border child:p-3">
            <div className="table-cell">Ano:</div>
            <div className="table-cell">{carroEscolhido?.AnoModelo}</div>
          </div>
        </div>

        <div className="table-row-group">
          <div className="table-row child:border child:p-3">
            <div className="table-cell">Preço Médio:</div>
            <div className="table-cell">{carroEscolhido?.Valor}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
