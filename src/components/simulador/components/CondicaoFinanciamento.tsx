// Mostra os parâmetros de financiamento com
// base nos carros escolhidos.

import { SimulationContext } from "@/contexts/ContextoSimulacao";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CondicaoFinanciamento() {
  const {
    carroNovo,
    carroVelho,
    valorEntrada,
    valorVendaCarroVelho,
    valorNecessario,
    setValorNecessario,
  } = useContext(SimulationContext);

  const [taxaJuros, setTaxaJuros] = useState(0);
  const [quotaMax, setQuotaMax] = useState(0);
  const [prazoMax, setPrazoMax] = useState(0);

  const [idadeCarroNovo, setIdadeCarroNovo] = useState(0);
  const [valorMaximoLiberado, setValorMaximoLiberado] = useState(0);
  const [diferancaMaximoNecessario, setDiferancaMaximoNecessario] = useState(0);

  const [prazoPersonalizado, setPrazoPersonalizado] = useState("");
  const [parcelaMinima, setParcelaMinima] = useState("");
  const [parcelaPersonalizada, setParcelaPersonalizada] = useState("");

  const [diferenca, setDiferenca] = useState(0);
  const [podeFinanciar, setPodeFinanciar] = useState<null | "sim" | "nao">(
    null
  );
  const [rendaMensal, setRendaMensal] = useState(0);
  const [rendaComprometida, setRendaComprometida] = useState(0);

  const [modal, setModal] = useState(false);

  // Tranforma o valor monetario em numero
  function paraNumerico(valor: string | number) {
    const resultado = parseFloat(
      String(valor).replace("R$", "").replace(/\./g, "").replace(",", ".")
    ).toFixed(2);
    return Number(resultado);
  }

  // Calcula as condicoes de financiamento
  function calcSimulation() {
    let letQuotaMax = 0;
    let letPrazoMax = 0;
    let letTaxaJuros = 0;

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    let letAnoAtual = anoAtual - carroNovo.AnoModelo;

    if (letAnoAtual <= 2) {
      letQuotaMax = 0.8;
      letPrazoMax = 60;
      letTaxaJuros = 2.92;
    } else if (letAnoAtual >= 3 && letAnoAtual <= 5) {
      letQuotaMax = 0.6;
      letPrazoMax = 60;
      letTaxaJuros = 3.05;
    } else if (letAnoAtual >= 6 && letAnoAtual <= 8) {
      letQuotaMax = 0.5;
      letPrazoMax = 48;
      letTaxaJuros = 2.34;
    } else if (letAnoAtual === 9) {
      letQuotaMax = 0.5;
      letPrazoMax = 36;
      letTaxaJuros = 2.34;
    } else if (letAnoAtual === 10) {
      letQuotaMax = 0.5;
      letPrazoMax = 24;
      letTaxaJuros = 2.34;
    } else if (letAnoAtual > 10) {
    }

    setQuotaMax(letQuotaMax);
    setPrazoMax(letPrazoMax);
    setTaxaJuros(letTaxaJuros);

    const valorCarroNovo = paraNumerico(carroNovo.Valor);

    const valorMaxLiberado = letQuotaMax * valorCarroNovo;
    const valorNecessitado =
      valorCarroNovo -
      (valorEntrada + paraNumerico(valorVendaCarroVelho.toString()));
    const diff = valorMaxLiberado - valorNecessitado;

    setIdadeCarroNovo(letAnoAtual);
    setDiferancaMaximoNecessario(diff);
    setValorMaximoLiberado(valorMaxLiberado);
    setValorNecessario(valorNecessitado);
    setPrazoPersonalizado(letPrazoMax.toString());

    const calcParcelaMinima = calcPrice(
      valorNecessitado,
      letTaxaJuros,
      letPrazoMax
    );
    setParcelaMinima(calcParcelaMinima);
  }

  // Lida com a mudança do slider
  function handlePrazoPersonalizado(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setPrazoPersonalizado(inputValue);
  }

  // Calcula Price
  function calcPrice(
    valorEmprestimo: number,
    taxaJuros: number,
    numeroParcelas: number
  ) {
    const iDecimal = taxaJuros / 100;
    const prestacaoMensal =
      (valorEmprestimo * iDecimal * Math.pow(1 + iDecimal, numeroParcelas)) /
      (Math.pow(1 + iDecimal, numeroParcelas) - 1);
    return prestacaoMensal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Calcula atualiza a parcela Personalizada
  useEffect(() => {
    const calcParcelaMinima = calcPrice(
      valorNecessario,
      taxaJuros,
      Number(prazoPersonalizado)
    );
    setParcelaPersonalizada(calcParcelaMinima);
  }, [prazoPersonalizado, parcelaMinima]);

  // Lida com inputs de compromisso
  function handleInputRendaMensal(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = paraNumerico(event.target.value);
    if (inputValue) {
      setRendaMensal(inputValue);
    } else setRendaMensal(0);
  }

  function handleInputRendaComprometida(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = paraNumerico(event.target.value);
    if (inputValue) {
      setRendaComprometida(inputValue);
    } else setRendaComprometida(0);
  }

  // Verifica condicoes de compromisso
  useEffect(() => {
    const rendaComprometivel =
      (paraNumerico(rendaMensal) * 30) / 100 - paraNumerico(rendaComprometida);
    const diferenca =
      Number(rendaComprometivel) - paraNumerico(parcelaPersonalizada);

    setDiferenca(diferenca);
    if (diferenca > 0) {
      setPodeFinanciar("sim");
    } else {
      setPodeFinanciar("nao");
    }
  }, [rendaMensal, rendaComprometida, parcelaPersonalizada]);

  //RENICIA A PÁGINA E VAI PARA O TOPO DA PAGINA
  const handleRestartClick = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-[5rem] items-center justify-center">
      <div className="flex flex-col w-full child:max-w-lg items-center gap-8 gradiente min-h-[800px] justify-center p-4">
        <h2 className="self-center text-3xl text-center max-w-sm text-white font-semibold py-[6rem]">
          Cenário para Simulação:
        </h2>

        <div className="table w-full rounded-md overflow-hidden">
          <div
            id="TABLE"
            className="table-row-group bg-azul-standart text-white"
          >
            <div className="table-row child:border child:p-2">
              <div className="table-cell w-[40%]">Modelo Veículo Desejado:</div>
              <div className="table-cell w-[60%]">
                {carroNovo?.Modelo ? carroNovo.Modelo : "Escolha seu modelo"}
              </div>
            </div>
            <div className="table-row child:border child:p-2">
              <div className="table-cell">Ano Veículo Desejado:</div>
              <div className="table-cell">
                {carroNovo?.AnoModelo
                  ? carroNovo.AnoModelo
                  : "Escolha seu modelo"}
              </div>
            </div>
            <div className="table-row child:border child:p-2">
              <div className="table-cell">Valor Veículo Desejado:</div>
              <div className="table-cell">
                {" "}
                {carroNovo?.Valor ? carroNovo.Valor : "R$ 0,00"}
              </div>
            </div>
            {carroVelho && (
              <>
                <div className="table-row child:border child:p-2 bg-azul-standart text-white">
                  <div className="table-cell">Modelo Veículo Atual:</div>
                  <div className="table-cell">{carroVelho?.Modelo}</div>
                </div>
                <div className="table-row child:border child:p-2 bg-azul-standart text-white">
                  <div className="table-cell">Venda Veículo Atual:</div>
                  <div className="table-cell">{valorVendaCarroVelho}</div>
                </div>
              </>
            )}

            <div className="table-row child:border child:p-2">
              <div className="table-cell">Valor Entrada:</div>
              <div className="table-cell">
                {valorEntrada.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          className="p-4 disabled:opacity-60 bg-laranja-standart text-white rounded-lg mb-[6rem]"
          onClick={calcSimulation}
          disabled={!carroNovo}
        >
          Simular
        </button>
      </div>
      {idadeCarroNovo > 10 || valorNecessario < 0 ? (
        <div className="pb-20">
          <div className="border border-red-700 bg-red-50 rounded-lg p-4 flex-1 w-full  max-w-md">
            <p className="flex items-center gap-2">
              <ExclamationCircleIcon className="w-10 h-10" />
              {idadeCarroNovo > 10 && (
                <p>
                  Financiamento para veículos acima de 10 anos não é aprovado.
                </p>
              )}
              {valorNecessario <= 0 && <p>Financiamento não necessário.</p>}
            </p>
          </div>
        </div>
      ) : (
        <>
          {diferancaMaximoNecessario < 0 ? (
            <div className="pb-20 space-y-10">
              <div
                id="TABLE"
                className="table w-full rounded-lg overflow-hidden max-w-lg bg-azul-standart text-white"
              >
                <div className="table-row child:border child:p-3">
                  <div className="table-cell w-[50%] text-left">
                    Valor Necessário:
                  </div>
                  <div className="table-cell w-[50%] text-left">
                    {valorNecessario.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>

                <div className="table-row child:border child:p-3">
                  <div className="table-cell w-[50%] text-left">
                    Máximo Liberado:
                  </div>
                  <div className="table-cell w-[50%] text-left">
                    {valorMaximoLiberado.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>

                <div className="table-row child:border child:p-3">
                  <div className="table-cell w-[50%] text-left">
                    Quota Máxima:
                  </div>
                  <div className="table-cell w-[50%] text-left">
                    {quotaMax * 100}%
                  </div>
                </div>
              </div>

              <div className="border border-red-700 bg-red-50 rounded-lg p-4 flex-1 w-full  max-w-md">
                <p className="flex items-start gap-2">
                  <ExclamationCircleIcon className="w-20 h-20" />
                  Para satisfazer os requisitos mínimos, você precisa
                  acrescentar pelo menos{" "}
                  {Math.abs(diferancaMaximoNecessario).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  em sua atual entrada e clicar em SIMULAR novamente.
                </p>
              </div>
            </div>
          ) : (
            <>
              {valorNecessario ? (
                <>
                  <div className="px-4 py-12 w-full gap-20  flex flex-col justify-center items-center">
                    <h2 className="self-center text-3xl text-center max-w-sm font-semibold text-azul-standart">
                      Parâmetros do Financiamento:
                    </h2>

                    <div
                      id="TABLE"
                      className="table w-full rounded-lg overflow-hidden max-w-lg border text-white bg-azul-standart"
                    >
                      <div className="table-row child:border child:p-3">
                        <div className="table-cell w-[50%] text-left">
                          Valor Necessário:
                        </div>
                        <div className="table-cell w-[50%] text-left">
                          {valorNecessario.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>

                      <div className="table-row child:border child:p-3">
                        <div className="table-cell w-[50%] text-left">
                          Máximo Liberado:
                        </div>
                        <div className="table-cell w-[50%] text-left">
                          {valorMaximoLiberado.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>

                      <div className="table-row child:border child:p-3">
                        <div className="table-cell w-[50%] text-left">
                          Quota Máxima:
                        </div>
                        <div className="table-cell w-[50%] text-left">
                          {quotaMax * 100}%
                        </div>
                      </div>

                      <div className="table-row-group">
                        <div className="table-row child:border child:p-3">
                          <div className="table-cell">Taxa juros: </div>
                          <div className="table-cell">{taxaJuros} %</div>
                        </div>
                      </div>

                      <div className="table-row-group">
                        <div className="table-row child:border child:p-3">
                          <div className="table-cell">Prazo Máximo: </div>
                          <div className="table-cell">{prazoMax} meses</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-12 w-full flex flex-col gap-20">
                    <h2 className="self-center text-3xl text-center max-w-sm font-semibold text-azul-standart">
                      Em quantos meses você pretende financiar{" "}
                      {valorNecessario.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      ?
                    </h2>

                    <div className="flex flex-col items-center gap-12 w-full p-4">
                      <div
                        id="TABLE"
                        className="table w-full rounded-lg overflow-hidden max-w-lg bg-azul-standart"
                      >
                        <div className="table-header-group bg-zinc-100">
                          <div className="table-row child:border child:p-3">
                            <div className="table-cell w-[50%] text-left">
                              Parcela Mínima {prazoMax} meses
                            </div>
                            <div className="table-cell w-[50%] text-left">
                              Parcela Personalizada
                            </div>
                          </div>
                        </div>
                        <div className="table-row-group text-white">
                          <div className="table-row child:border child:p-3">
                            <div className="table-cell">{parcelaMinima}</div>
                            <div className="table-cell">
                              {parcelaPersonalizada}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full max-w-xs px-5 flex flex-col items-center gap-4">
                        <p className="border rounded-md p-3 max-w-[120px] w-full text-center">
                          {prazoPersonalizado} meses
                        </p>
                        <input
                          type="range"
                          min={1}
                          max={prazoMax}
                          step={1}
                          className="w-full cursor-pointer"
                          name="rangeInput"
                          onChange={handlePrazoPersonalizado}
                          value={prazoPersonalizado}
                        />

                        <div className="flex w-full justify-between gap-2 flex-wrap child:border child:p-2 child:rounded-md text-sm">
                          <button
                            className="-ml-5"
                            onClick={() => setPrazoPersonalizado("1")}
                          >
                            01
                          </button>
                          <button
                            className="-mr-5"
                            onClick={() =>
                              setPrazoPersonalizado(prazoMax.toString())
                            }
                          >
                            {prazoMax}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-familiaCarro bg-cover w-full min-h-[700px] relative text-white flex flex-col items-center justify-center gap-20">
                    <div className="w-full h-full bg-zinc-900/80 absolute top-0 z-0" />

                    <h2 className="self-center text-3xl text-center max-w-lg font-semibold z-10 p-4 pt-20">
                      Gostaria de saber se a parcela simulada está compatível
                      com seu orçamento?
                      <button
                        onClick={() => setModal(true)}
                        className="border p-1 ml-3 text-sm font-normal rounded-lg hover:bg-white hover:text-black"
                      >
                        Saiba mais
                      </button>
                    </h2>

                    <div className="flex flex-col items-center justify-center flex-wrap gap-8 z-10 w-full max-w-md px-4">
                      <label htmlFor="rendamensal" className="space-y-2 w-full">
                        <p>Renda Mensal:</p>
                        <CurrencyInput
                          groupSeparator="."
                          decimalSeparator=","
                          prefix="R$"
                          placeholder="Renda mensal"
                          className="w-full  border p-4 text-black rounded-md"
                          id="rendamensal"
                          onChange={handleInputRendaMensal}
                          autoComplete="off"
                        />
                      </label>
                      <label
                        htmlFor="rendacomprometida"
                        className="space-y-2 w-full"
                      >
                        <p>
                          Somatório de pagamento mensal de empréstimos ou
                          financiamentos:
                        </p>
                        <CurrencyInput
                          groupSeparator="."
                          decimalSeparator=","
                          prefix="R$"
                          placeholder="Renda comprometida"
                          className="w-full  border p-4 text-black rounded-md"
                          id="rendacomprometida"
                          onChange={handleInputRendaComprometida}
                          autoComplete="off"
                        />
                      </label>

                      {rendaMensal && rendaComprometida >= 0 ? (
                        <div>
                          {podeFinanciar === "sim" ? (
                            <div className="border border-green-700 bg-green-200 rounded-lg p-4 flex-1 w-full  max-w-md text-black">
                              <p className="flex items-start gap-2">
                                <ExclamationCircleIcon className="w-20 h-20" />
                                OK! O valor da parcela escolhida NÃO irá
                                extrapolar seu comprometimento acima de 30%.
                              </p>
                            </div>
                          ) : (
                            <div className="border border-red-700 bg-red-200 rounded-lg p-4 flex-1 w-full  max-w-md text-black">
                              <p className="flex items-start gap-2">
                                <ExclamationCircleIcon className="w-20 h-20" />O
                                valor da parcela escolhida,e seus atuais
                                compromissos, extrapolaram{" "}
                                {diferenca < 0 &&
                                  `${Math.abs(diferenca).toLocaleString(
                                    "pt-BR",
                                    {
                                      style: "currency",
                                      currency: "BRL",
                                    }
                                  )}`}{" "}
                                dos 30% de comprometimento de sua renda mensal.
                              </p>
                            </div>
                          )}
                        </div>
                      ) : null}

                      <button
                        onClick={handleRestartClick}
                        className="p-4  bg-laranja-standart text-white rounded-lg mb-[6rem]"
                      >
                        Nova Simulação
                      </button>

                      {modal && (
                        <div className="fixed top-0 z-30 flex items-center justify-center w-screen h-screen">
                          <div
                            className="absolute w-full h-full bg-black/70 z-0"
                            onClick={() => setModal(false)}
                          />
                          <div className="bg-green-200 p-8 w-[90%] mx-auto max-w-sm text-black rounded-md relative flex">
                            <p className="flex-1 pr-2">
                              Economistas, profissionais do mundo das finanças e
                              algumas instituições financeiras, orientam que não
                              se deve comprometer mais do que 30% da renda
                              mensal para pagamento de empréstimos ou
                              financiamentos. Este critério poderá ser um dos
                              requisitos para consessão do crédito.
                            </p>

                            <XMarkIcon
                              className="w-10 h-10 font-bold cursor-pointer bg-gray-300 -mr-4 -mt-4"
                              onClick={() => setModal(false)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
