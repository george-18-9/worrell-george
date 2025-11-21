const form = document.getElementById("formEstudiante");
const lista = document.getElementById("listaEstudiantes");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");
const contador = document.getElementById("contador");

let estudiantes = [];

// Actualiza el contador
function actualizarContador() {
    let cantidad = estudiantes.length;
    contador.textContent =
        cantidad === 1 ? "1 estudiante" : `${cantidad} estudiantes`;
}

// Validaciones
function validar() {
    let nombre = nombreInput.value.trim();
    let apellido = apellidoInput.value.trim();
    let email = emailInput.value.trim();
    let edad = parseInt(edadInput.value);

    if (!nombre || !apellido || !email || !edad) {
        alert("Todos los campos obligatorios deben completarse.");
        return false;
    }

    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert("El correo no es válido.");
        return false;
    }

    if (edad < 18 || edad > 100) {
        alert("La edad debe estar entre 18 y 100 años.");
        return false;
    }

    return true;
}

const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const edadInput = document.getElementById("edad");
const carreraInput = document.getElementById("carrera");

// Mostrar tabla
function mostrarTabla() {
    lista.innerHTML = "";

    if (estudiantes.length === 0) {
        lista.innerHTML = `<tr><td colspan="7" class="noresult">No hay resultados.</td></tr>`;
        actualizarContador();
        return;
    }

    estudiantes.forEach((est, i) => {
        lista.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${est.nombre}</td>
            <td>${est.apellido}</td>
            <td>${est.email}</td>
            <td>${est.edad}</td>
            <td>${est.carrera || '-'}</td>
            <td><button onclick="eliminar(${i})" class="btn-rojo">Eliminar</button></td>
        </tr>
        `;
    });

    actualizarContador();
}

// Agregar
form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validar()) return;

    estudiantes.push({
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
        edad: edadInput.value,
        carrera: carreraInput.value
    });

    form.reset();
    mostrarTabla();
});

// Eliminar
function eliminar(index) {
    estudiantes.splice(index, 1);
    mostrarTabla();
}

// Borrar todo
btnBorrarTodo.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas eliminar todos los estudiantes?")) {
        estudiantes = [];
        mostrarTabla();
    }
});

// Limpiar formulario
btnLimpiar.addEventListener("click", () => form.reset());

// Estado inicial
mostrarTabla();
