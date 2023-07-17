// Componente que Seleciona o carro de
// acordo com a tabela fipe.

// Tranforma o componente em Client Component
"use client";

//Importa os Hooks
import { useEffect, useState, useContext, ChangeEvent } from "react";

// Importa o Contexto
import { SimulationContext } from "@/contexts/ContextoSimulacao";

// Importa funções de chamada para API
import { buscarAnos } from "@/app/api/anos";
import { buscarMarcas } from "@/app/api/marcas";
import { buscarModelos } from "@/app/api/modelos";
import { buscarCarro } from "@/app/api/carroSelecionado";

// Importa Ícones
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Tipagem das Props do componente
interface SeletorCarroProps {
  tipoCarro: "carroVelho" | "carroNovo";
}

// Tipagem dos Objetos que API retorna
interface Data {
  nome: string;
  codigo: string;
}

export default function SeletorCarro({ tipoCarro }: SeletorCarroProps) {
  // Estados das listas
  const [listaMarcas, setListaMarcas] = useState<null | Array<Data>>(null);
  const [listaModelos, setListaModelos] = useState<null | Array<Data>>(null);
  const [listaAnos, setListaAnos] = useState<null | Array<Data>>(null);

  // Estados das listas Filtradas
  const [listaMarcasFiltradas, setListaMarcasFiltradas] = useState<null | Array<Data>>(null);
  const [listaModelosFiltradas, setListaModelosFiltradas] = useState<null | Array<Data>>(null);
  const [listaAnosFiltradas, setListaAnosFiltradas] = useState<null | Array<Data>>(null);

  // Estados Marca, Modelo e Ano Selecionado
  const [marcaSelecionada, setMarcaSelecionada] = useState<string>("");
  const [modeloSelecionado, setModeloSelecionado] = useState<string>("");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("");

  // Estados Opções Abertas ou Fechadas
  const [opcoesMarcaAbertas, setOpcoesMarcaAbertas] = useState<boolean>(false);
  const [opcoesModeloAbertas, setOpcoesModeloAbertas] = useState<boolean>(false);
  const [opcoesAnoAbertas, setOpcoesAnoAbertas] = useState<boolean>(false);

  // Estados dos Labels
  const [marcaLabel, setMarcaLabel] = useState<string>("");
  const [modeloLabel, setModeloLabel] = useState<string>("");
  const [anoLabel, setAnoLabel] = useState<string>("");

  // Acessando funções do Contexto
  const { setCarroNovo, setCarroVelho } = useContext(SimulationContext);

  // Procura marcas
  useEffect(() => {
    async function procurarDados() {
      const listaMarcas = await buscarMarcas();
      setListaMarcas(listaMarcas);
      setListaMarcasFiltradas(listaMarcas);
    }
    procurarDados();
  }, []);

  // Procura Modelos
  useEffect(() => {
    async function procurarDados() {
      const listaModelos = await buscarModelos(marcaSelecionada);
      setListaModelos(listaModelos);
      setListaModelosFiltradas(listaModelos);
    }
    procurarDados();
  }, [marcaSelecionada]);

  // Procura Anos
  useEffect(() => {
    async function procurarDados() {
      const listaAnos = await buscarAnos(marcaSelecionada, modeloSelecionado);
      setListaAnos(listaAnos);
      setListaAnosFiltradas(listaAnos);
    }
    procurarDados();
  }, [modeloSelecionado]);

  // Procura Carro
  useEffect(() => {
    async function procurarDados() {
      const carroSelecionado = await buscarCarro(
        marcaSelecionada,
        modeloSelecionado,
        anoSelecionado
      );
      if (tipoCarro === "carroNovo") {
        setCarroNovo(carroSelecionado);
      } else if (tipoCarro === "carroVelho") {
        setCarroVelho(carroSelecionado);
      }
    }
    procurarDados();
  }, [anoSelecionado]);

  // Lida com opções selecionadas
  function handleSelecioneiMarca(marca: Data) {
    setMarcaSelecionada(marca.codigo);
    setModeloSelecionado("");
    setAnoSelecionado("");
    setMarcaLabel(marca.nome);
    setModeloLabel("");
    setAnoLabel("");
    setOpcoesMarcaAbertas(false);
    setListaMarcasFiltradas(listaMarcas);
  }
  function handleSelecioneiModelo(modelo: Data) {
    setModeloSelecionado(modelo.codigo);
    setAnoSelecionado("");
    setModeloLabel(modelo.nome);
    setAnoLabel("");
    setOpcoesModeloAbertas(false);
    setListaModelosFiltradas(listaModelos);
  }
  function handleSelecioneiAno(ano: Data) {
    setAnoSelecionado(ano.codigo);
    setAnoLabel(ano.nome);
    setOpcoesAnoAbertas(false);
    setListaAnosFiltradas(listaAnos);
  }

  // Lida com Abir e Fechar Opções
  function handleAbrirFecharMarca() {
    setOpcoesMarcaAbertas((estado) => !estado);
    setOpcoesModeloAbertas(false);
    setOpcoesAnoAbertas(false);
  }
  function handleAbrirFecharModelo() {
    setOpcoesMarcaAbertas(false);
    setOpcoesModeloAbertas((estado) => !estado);
    setOpcoesAnoAbertas(false);
  }
  function handleAbrirFecharAno() {
    setOpcoesMarcaAbertas(false);
    setOpcoesModeloAbertas(false);
    setOpcoesAnoAbertas((estado) => !estado);
  }

  // Lida com a filtragem das listas
  function handleFiltrarMarcas(event: ChangeEvent<HTMLInputElement>) {
    const inputMarcas = event.target.value;

    if (listaMarcas) {
      const listaMarcasFiltrada = listaMarcas.filter((marca: Data) =>
        marca.nome.toLowerCase().includes(inputMarcas.toLowerCase())
      );

      setListaMarcasFiltradas(listaMarcasFiltrada);
    }
  }

  function handleFiltrarModelos(event: ChangeEvent<HTMLInputElement>) {
    const inputModelos = event.target.value;

    if (listaModelos) {
      const listaModelosFiltrada = listaModelos.filter((modelo: Data) =>
        modelo.nome.toLowerCase().includes(inputModelos.toLowerCase())
      );

      setListaModelosFiltradas(listaModelosFiltrada);
    }
  }

  function handleFiltrarAnos(event: ChangeEvent<HTMLInputElement>) {
    const inputAnos = event.target.value;

    if (listaAnos) {
      const listaAnosFiltrada = listaAnos.filter((marca: Data) =>
        marca.nome.toLowerCase().includes(inputAnos.toLowerCase())
      );

      setListaAnosFiltradas(listaAnosFiltrada);
    }
  }

  return (
    <div className="max-w-lg w-full space-y-4 flex flex-col justify-center">
      <div
        id="SELECIONAR MARCAS"
        className="border rounded-md bg-gradient-to-r from-azul-standart to-cyan-500 text-white"
      >
        <label
          htmlFor={`${tipoCarro + "marcas"}`}
          onClick={handleAbrirFecharMarca}
          className="cursor-pointer"
        >
          <p className="p-4 flex items-center justify-between">
            {marcaLabel ? marcaLabel : "Digite ou selecione a Marca"}
            <ChevronDownIcon
              className={`w-h h-5 transition-all ${opcoesMarcaAbertas && "rotate-180"}`}
            />
          </p>
        </label>
        {opcoesMarcaAbertas && (
          <div className="p-4 space-y-4">
            <input
              id={`${tipoCarro + "marcas"}`}
              type="text"
              className="border p-2 w-full bg-transparent outline-none"
              autoComplete="off"
              onChange={handleFiltrarMarcas}
            />
            <ul className="max-h-36 overflow-y-scroll space-y-2 child:border child:p-2">
              {listaMarcasFiltradas ? (
                listaMarcasFiltradas.map((marca: Data) => (
                  <li
                    key={marca.codigo}
                    onClick={() => handleSelecioneiMarca(marca)}
                    className="cursor-pointer"
                  >
                    {marca.nome}
                  </li>
                ))
              ) : (
                <li>Carregando Marcas...</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div
        id="SELECIONAR MODELOS"
        className="border rounded-md bg-gradient-to-r from-azul-standart to-cyan-500 text-white"
      >
        <label
          htmlFor={`${tipoCarro + "modelos"}`}
          onClick={handleAbrirFecharModelo}
          className={`cursor-pointer ${!marcaSelecionada && "pointer-events-none"}`}
        >
          <p className="p-4 flex items-center justify-between">
            {modeloLabel ? modeloLabel : "Digite ou selecione o Modelo"}
            <ChevronDownIcon
              className={`w-h h-5 transition-all ${opcoesModeloAbertas && "rotate-180"}`}
            />
          </p>
        </label>
        {opcoesModeloAbertas && (
          <div className="p-4 space-y-4">
            <input
              id={`${tipoCarro + "modelos"}`}
              type="text"
              className="border p-2 w-full bg-transparent outline-none"
              autoComplete="off"
              onChange={handleFiltrarModelos}
            />
            <ul className="max-h-36 overflow-y-scroll space-y-2 child:border child:p-2">
              {listaModelosFiltradas ? (
                listaModelosFiltradas.map((modelo: Data) => (
                  <li
                    key={modelo.codigo}
                    onClick={() => handleSelecioneiModelo(modelo)}
                    className="cursor-pointer"
                  >
                    {modelo.nome}
                  </li>
                ))
              ) : (
                <li>Carregando Modelos...</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div
        id="SELECIONAR ANO"
        className="border rounded-md bg-gradient-to-r from-azul-standart to-cyan-500 text-white"
      >
        <label
          htmlFor={`${tipoCarro + "anos"}`}
          onClick={handleAbrirFecharAno}
          className={`cursor-pointer ${
            (!marcaSelecionada || !modeloSelecionado) && "pointer-events-none"
          }`}
        >
          <p className="p-4 flex items-center justify-between">
            {anoLabel ? anoLabel : "Digite ou selecione o Ano"}
            <ChevronDownIcon
              className={`w-h h-5 transition-all ${opcoesAnoAbertas && "rotate-180"}`}
            />
          </p>
        </label>
        {opcoesAnoAbertas && (
          <div className="p-4 space-y-4">
            <input
              id={`${tipoCarro + "anos"}`}
              type="text"
              className="border p-2 w-full bg-transparent outline-none"
              autoComplete="off"
              onChange={handleFiltrarAnos}
            />
            <ul className="max-h-36 overflow-y-scroll space-y-4 child:border child:p-2">
              {listaAnosFiltradas ? (
                listaAnosFiltradas.map((ano: Data) => (
                  <li
                    key={ano.codigo}
                    onClick={() => handleSelecioneiAno(ano)}
                    className="cursor-pointer"
                  >
                    {ano.nome}
                  </li>
                ))
              ) : (
                <li>Carregando Anos...</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
