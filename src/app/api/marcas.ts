// Busca a lista das marcas de carro.
export async function buscarMarcas() {
  const res = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
  return res.json();
}
