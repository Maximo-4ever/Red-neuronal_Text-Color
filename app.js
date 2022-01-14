const inputColor = document.getElementById("inputColor");
const containerColor = document.getElementById("containerColor");
// Inicia la red Neuronal
var network = new brain.NeuralNetwork();
// Se entrena con ejemplos
network.train([
  //Fondo negro (entrada en 0s) = texto blanco (salida = 1)
  { input: { rojo: 0, verde: 0, azul: 0 }, output: { color: 1 } },
  //Fondo blanco (entrada en 1s) = texto negro (salida = 0)
  { input: { rojo: 1, verde: 1, azul: 1 }, output: { color: 0 } },
  //Fondo verde, texto negro
  { input: { rojo: 0, verde: 1, azul: 0 }, output: { color: 0 } },
  //Fondo azul, texto blanco
  { input: { rojo: 0, verde: 0.43, azul: 1 }, output: { color: 1 } },
  //Fondo rojo, texto blanco
  { input: { rojo: 1, verde: 0, azul: 0 }, output: { color: 1 } },
  //Fondo naranja, texto blanco
  { input: { rojo: 1, verde: 0.4, azul: 0.1 }, output: { color: 1 } },
]);

const update = (color) => {
  const rgb = [color.channels.r, color.channels.g, color.channels.b];
  const entrada = {rojo: rgb[0] / 255, verde: rgb[1] / 255, azul: rgb[2] / 255};
  const resultado = network.run(entrada);

  // Actualiza el Fondo
  containerColor.style.backgroundColor = color.toHEXString();

  // Elige el Color de texto
  if (resultado.color > 0.5) {
    containerColor.style.color = "#fff";
  } else {
    containerColor.style.color = "#000";
  }
};
