(() => {
    const App = (() => {

        // ============================
        //   1. REFERENCIAS HTML
        // ============================
        const htmlElements = {
            form: document.querySelector("#formEstudiante"),
            lista: document.querySelector("#listaEstudiantes"),
            btnLimpiar: document.querySelector("#btnLimpiar"),
            btnBorrarTodo: document.querySelector("#btnBorrarTodo"),
            contador: document.querySelector("#contador"),

            nombre: document.querySelector("#nombre"),
            apellido: document.querySelector("#apellido"),
            email: document.querySelector("#email"),
            edad: document.querySelector("#edad"),
            carrera: document.querySelector("#carrera"),
        };

        // ============================
        //   2. ESTADO GLOBAL
        // ============================
        const state = {
            estudiantes: []
        };

        // ============================
        //   3. TEMPLATES
        // ============================
        const templates = {
            row: (est, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${est.nombre}</td>
                    <td>${est.apellido}</td>
                    <td>${est.email}</td>
                    <td>${est.edad}</td>
                    <td>${est.carrera || "-"}</td>
                    <td><button class="btn-rojo delete" data-id="${index}">Eliminar</button></td>
                </tr>
            `,

            noResults: () => `
                <tr>
                    <td colspan="7" class="noresult">No hay resultados.</td>
                </tr>
            `,

            contador: (cantidad) =>
                cantidad === 1
                    ? "1 estudiante"
                    : `${cantidad} estudiantes`,
        };

        // ============================
        //   4. VALIDACIONES
        // ============================
        const utils = {
            validar() {
                const nombre = htmlElements.nombre.value.trim();
                const apellido = htmlElements.apellido.value.trim();
                const email = htmlElements.email.value.trim();
                const edad = parseInt(htmlElements.edad.value);

                if (!nombre || !apellido || !email || !edad) {
                    alert("Todos los campos obligatorios deben completarse.");
                    return false;
                }

                let emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(email)) {
                    alert("Correo no válido.");
                    return false;
                }

                if (edad < 18 || edad > 100) {
                    alert("Edad fuera de rango (18-100).");
                    return false;
                }

                return true;
            },

            actualizarContador() {
                htmlElements.contador.textContent =
                    templates.contador(state.estudiantes.length);
            },

            attachDeleteButtons() {
                const botones = htmlElements.lista.querySelectorAll(".delete");

                botones.forEach(btn => {
                    btn.addEventListener("click", handlers.onDeleteClick);
                });
            }
        };

        // ============================
        //   5. RENDERIZADO
        // ============================
        const render = {
            tabla() {
                htmlElements.lista.innerHTML = "";

                if (state.estudiantes.length === 0) {
                    htmlElements.lista.innerHTML = templates.noResults();
                    utils.actualizarContador();
                    return;
                }

                state.estudiantes.forEach((est, i) => {
                    htmlElements.lista.innerHTML += templates.row(est, i);
                });

                utils.attachDeleteButtons();
                utils.actualizarContador();
            }
        };

        // ============================
        //   6. HANDLERS
        // ============================
        const handlers = {
            onFormSubmit(e) {
                e.preventDefault();

                if (!utils.validar()) return;

                state.estudiantes.push({
                    nombre: htmlElements.nombre.value,
                    apellido: htmlElements.apellido.value,
                    email: htmlElements.email.value,
                    edad: htmlElements.edad.value,
                    carrera: htmlElements.carrera.value
                });

                htmlElements.form.reset();
                render.tabla();
            },

            onDeleteClick(e) {
                const index = e.target.getAttribute("data-id");
                state.estudiantes.splice(index, 1);
                render.tabla();
            },

            onBorrarTodo() {
                if (confirm("¿Eliminar todos los estudiantes?")) {
                    state.estudiantes = [];
                    render.tabla();
                }
            },

            onLimpiarForm() {
                htmlElements.form.reset();
            }
        };

        // ============================
        //   7. INIT
        // ============================
        return {
            init() {
                render.tabla();

                htmlElements.form.addEventListener("submit", handlers.onFormSubmit);
                htmlElements.btnBorrarTodo.addEventListener("click", handlers.onBorrarTodo);
                htmlElements.btnLimpiar.addEventListener("click", handlers.onLimpiarForm);
            }
        };

    })();

    App.init();
})();
