// Busca o carro selecionado.
export async function buscarCarro(codigoMarca: string, codigoModelo: string, codigoAno: string) {
  if (codigoMarca && codigoModelo && codigoAno) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`;
    const res = await fetch(url);

    return res.json();
  } else return null;
}
