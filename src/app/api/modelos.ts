// Busca a lista dos modelos de carro.
export async function buscarModelos(codigoMarca: string) {
  if (codigoMarca) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`;
    const res = await fetch(url);

    const data = await res.json();
    return data.modelos;
  } else return null;
}
