const Selecciones = ["Argentina", "Alemania", "Brasil", "Portugal", "Japón", "Perú"];

function esCampeon(seleccion) {
  const campeones = ["Argentina", "Alemania", "Brasil"];
  return campeones.includes(seleccion);
}

let seleccion = prompt("Ingresa el nombre de una selección:");
if (esCampeon(seleccion)) {
  console.log("Es campeona del mundo");
} else {
  console.log("No es campeona del mundo");
}