import mascota from './mascota.js';

document.addEventListener("DOMContentLoaded", function () {
  // Manipulación de la estructura de datos en mascota
  document.getElementById("nombre-mascota").textContent = mascota.nombre;
  document.getElementById("edad-mascota").textContent = mascota.edad;
  document.getElementById("imagen-mascota").src = mascota.imagen;
  document.getElementById("descripcion-mascota").textContent = mascota.descripcion;

  const editarBtn = document.getElementById("editar-btn");
  editarBtn.addEventListener("click", editarInformacion);
});

function editarInformacion() {
  const nuevoNombre = prompt("Nuevo nombre de la mascota:", mascota.nombre);
  const nuevaEdad = prompt("Nueva edad de la mascota:", mascota.edad);
  const nuevaDescripcion = prompt("Nueva descripción de la mascota:", mascota.descripcion);

  // Actualiza la información de la mascota
  mascota.nombre = nuevoNombre || mascota.nombre;
  mascota.edad = nuevaEdad || mascota.edad;
  mascota.descripcion = nuevaDescripcion || mascota.descripcion;

  // Actualiza la interfaz con la nueva información
  document.getElementById("nombre-mascota").textContent = mascota.nombre;
  document.getElementById("edad-mascota").textContent = mascota.edad;
  document.getElementById("descripcion-mascota").textContent = mascota.descripcion;
}
