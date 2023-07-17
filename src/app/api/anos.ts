// Busca a lista dos anos do carro.
export async function buscarAnos(codigoMarca: string, codigoModelo: string) {
  if (codigoMarca && codigoModelo) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`;
    const res = await fetch(url);

    return res.json();
  } else return null;
}
