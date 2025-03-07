var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var view;
(function (view) {
    class VerPersonas {
        VerPersonasApi() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let data = yield d3.json("https://raw.githubusercontent.com/05JesusMoreno/json_document/refs/heads/main/src/view/personas.json");
                    data.forEach((persona) => {
                        this.PersonasMap.set(persona.id, persona);
                    });
                    this.lista();
                }
                catch (error) {
                    console.error("Error al obtener datos:", error);
                }
            });
        }
        constructor(container) {
            this.PersonasMap = new Map();
            this.ventana = new view.Ventana();
            this.ordenAscendenteNombre = true;
            this.mostrarLista(container);
        }
        mostrarLista(container) {
            container.append("h2").text("Lista de Personas Registradas").attr("id", "ContenedorLista");
            container.exit().remove();
            this.VerPersonasApi();
            var busqueda = container
                .append("div")
                .style("width", "80%")
                .style("display", "flex")
                .style("justify-content", "flex-start")
                .style("margin-bottom", "10px");
            this.inputbusqueda = busqueda
                .append("input")
                .attr("type", "text")
                .attr("placeholder", "Buscar Persona")
                .style("border-radius", "5px")
                .style("font-size", "16px")
                .on("keyup", () => {
                this.lista();
            });
            var buttonContainer = container
                .append("div")
                .style("width", "80%")
                .style("display", "flex")
                .style("justify-content", "flex-end")
                .style("margin-bottom", "10px");
            buttonContainer
                .append("button")
                .text("Agregar Persona")
                .style("padding", "8px 12px")
                .style("background-color", "#4CAF50")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "18px")
                .on("click", () => {
                var container_reg = this.ventana.obtenerContenedor();
                this.formulario(container_reg, null);
                this.ventana.mostrar();
            });
        }
        lista() {
            var _a;
            d3.select("#ContenedorLista").select("table").remove();
            var tabla = d3.select("#ContenedorLista").append("table");
            let data = Array.from(this.PersonasMap.values());
            var texto = (_a = this.inputbusqueda) === null || _a === void 0 ? void 0 : _a.property("value").toLowerCase();
            if (texto != " ") {
                data = data.filter((persona) => persona.nombre.toLowerCase().includes(texto) ||
                    persona.apellido.toLowerCase().includes(texto));
            }
            data = data.sort((a, b) => this.ordenAscendenteNombre
                ? a.edad - b.edad
                : b.edad - a.edad);
            data = data.sort((a, b) => this.ordenAscendenteNombre
                ? a.nombre.localeCompare(b.nombre)
                : b.nombre.localeCompare(a.nombre));
            this.ordenAscendenteNombre = !this.ordenAscendenteNombre;
            tabla.selectAll("tr")
                .data([["Id", "Nombre", "Apellidos", "Edad", "Correo", "Telefono", "Fecha de nacimiento", "Editar", "Eliminar"]])
                .enter()
                .append("tr")
                .selectAll("th")
                .data(d => d)
                .enter()
                .append("th")
                .text(d => d)
                .on("click", () => {
                this.lista();
            });
            let filas = tabla.selectAll("tr")
                .data(data);
            filas.exit().remove();
            let filas_nuevas = filas.enter().append("tr");
            filas_nuevas.selectAll("td")
                .data(d => [d.id, d.nombre, d.apellido, d.edad, d.correo, d.telefono, d.fechaN ? new Date(d.fechaN).toLocaleDateString() : ''])
                .enter()
                .append("td")
                .text(d => d);
            filas_nuevas.append("td")
                .append("button")
                .text("Editar")
                .style("background-color", "#3A0AD5")
                .style("color", "white")
                .style("cursor", "pointer")
                .style("padding", "5px 10px")
                .on("click", (event, d) => {
                let container_edit = this.ventana.obtenerContenedor();
                this.formulario(container_edit, d);
                this.ventana.mostrar();
            });
            filas_nuevas.append("td")
                .append("button")
                .text("Eliminar")
                .style("background-color", "red")
                .style("color", "white")
                .style("cursor", "pointer")
                .style("padding", "5px 10px")
                .on("click", (event, d) => {
                this.eliminar(d.id);
            });
            d3.selectAll("th")
                .style("border", "1px solid black")
                .style("text-align", "center")
                .style("font-size", "22px");
            d3.selectAll("td")
                .style("border", "1px solid black")
                .style("text-align", "center")
                .style("font-size", "22px");
        }
        formulario(container_form, persona = null) {
            container_form.selectAll("*").remove();
            container_form.append("h3")
                .text(persona ? "Editar Persona" : "Registrar Persona");
            container_form.append("label").text("Nombre");
            var inputNombre = container_form.append("input")
                .attr("type", "text")
                .property("value", persona ? persona.nombre : "");
            container_form.append("label").text("Apellidos");
            var inputApellidos = container_form.append("input")
                .attr("type", "text")
                .property("value", persona ? persona.apellido : "");
            container_form.append("label").text("Edad");
            var inputEdad = container_form
                .append("input").attr("type", "number")
                .property("value", persona ? persona.edad : "");
            container_form.append("label").text("Correo");
            var inputEmail = container_form.append("input")
                .attr("type", "email")
                .property("value", persona ? persona.correo : "");
            container_form.append("label").text("Teléfono");
            var inputTelefono = container_form.append("input")
                .attr("type", "number")
                .property("value", persona ? persona.telefono : "");
            container_form.append("label").text("Fecha de nacimiento");
            var inputFechaN = container_form.append("input")
                .attr("type", "date")
                .property("value", persona ? new Date(persona.fechaN).toISOString().split("T")[0] : "");
            var buttonContainer = container_form.append("div")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("gap", "10px")
                .style("margin-top", "10px");
            buttonContainer.append("button")
                .text(persona ? "Actualizar" : "Registrar")
                .style("background-color", persona ? "#FFA500" : "#4CAF50")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                var nombre = inputNombre.property("value");
                var apellidos = inputApellidos.property("value");
                var edad = parseInt(inputEdad.property("value"));
                var correo = inputEmail.property("value");
                var telefono = inputTelefono.property("value");
                var fechaN = new Date(inputFechaN.property("value"));
                if (nombre && apellidos && edad > 0 && correo && telefono && fechaN) {
                    if (persona) {
                        persona.nombre = nombre;
                        persona.apellido = apellidos;
                        persona.edad = edad;
                        persona.correo = correo;
                        persona.telefono = telefono;
                        persona.fechaN = fechaN;
                        alert("Persona actualizada correctamente");
                    }
                    else {
                        var id = this.PersonasMap.size > 0 ? Math.max(...Array.from(this.PersonasMap.keys())) + 1 : 1;
                        this.PersonasMap.set(id, { id, nombre, apellido: apellidos, edad, correo, telefono, fechaN });
                        alert("Persona agregada correctamente");
                    }
                    this.lista();
                    this.ventana.ocultar();
                }
                else {
                    alert("Todos los campos son obligatorios y la edad debe ser válida.");
                }
            });
            buttonContainer.append("button")
                .text("Cancelar")
                .style("background-color", "red")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                this.ventana.ocultar();
            });
            d3.selectAll("input").style("width", "60%").style("font-size", "20px").style("padding", "10px");
            d3.selectAll("label").style("font-size", "18px").style("padding", "8px");
        }
        eliminar(id) {
            const confirmar = window.confirm("¿Estás seguro de que deseas eliminar a esta persona?");
            if (!confirmar) {
                alert("Cancelaste eliminar a esta persona");
                return;
            }
            if (this.PersonasMap.delete(id)) {
                alert(`Eliminaste a la persona con ID ${id}.`);
                this.lista();
                console.log(`Persona con ID ${id} eliminada.`);
            }
            else {
                console.log(`No se encontró la persona con ID ${id}.`);
            }
        }
    }
    view.VerPersonas = VerPersonas;
})(view || (view = {}));
//# sourceMappingURL=listaPersonas.js.map