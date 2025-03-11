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
        OrdenaNombre() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.ordenAscendenteNombre ? a[1].nombre.localeCompare(b[1].nombre) : b[1].nombre.localeCompare(a[1].nombre);
            }));
            this.ordenAscendenteNombre = !this.ordenAscendenteNombre;
            this.lista();
        }
        OrdenaApellido() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.OrdenAscendenteApellido ? a[1].apellido.localeCompare(b[1].apellido) : b[1].apellido.localeCompare(a[1].apellido);
            }));
            this.OrdenAscendenteApellido = !this.OrdenAscendenteApellido;
            this.lista();
        }
        OrdenaEdad() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.OrdenAscendenteEdad ? a[1].edad - b[1].edad : b[1].edad - a[1].edad;
            }));
            this.OrdenAscendenteEdad = !this.OrdenAscendenteEdad;
            this.lista();
        }
        OrdenaCorreo() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.OrdenAscendenteCorreo ? a[1].correo.localeCompare(b[1].correo) : b[1].correo.localeCompare(a[1].correo);
            }));
            this.OrdenAscendenteCorreo = !this.OrdenAscendenteCorreo;
            this.lista();
        }
        OrdenaTelefono() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.OrdenAscendenteTelefono ? a[1].telefono - b[1].telefono : b[1].telefono - a[1].telefono;
            }));
            this.OrdenAscendenteTelefono = !this.OrdenAscendenteTelefono;
            this.lista();
        }
        OrdenaFechaN() {
            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                return this.OrdenAscendenteFechaN ? new Date(a[1].fechaN).getTime() - new Date(b[1].fechaN).getTime() : new Date(b[1].fechaN).getTime() - new Date(a[1].fechaN).getTime();
            }));
            this.OrdenAscendenteFechaN = !this.OrdenAscendenteFechaN;
            this.lista();
        }
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
            this.OrdenAscendenteApellido = true;
            this.OrdenAscendenteEdad = true;
            this.OrdenAscendenteCorreo = true;
            this.OrdenAscendenteTelefono = true;
            this.OrdenAscendenteFechaN = true;
            this.mostrarLista(container);
        }
        mostrarLista(container) {
            var busqueda = container
                .append("div")
                .attr("class", "busqueda");
            this.inputbusqueda = busqueda
                .append("input")
                .attr("type", "text")
                .attr("placeholder", "Buscar Persona")
                .style("border-radius", "5px")
                .style("font-size", "24px")
                .on("keyup", () => {
                this.lista();
            });
            var buttonContainer = container
                .append("div")
                .style("width", "45%")
                .style("display", "flex")
                .style("justify-content", "flex-end")
                .style("margin-bottom", "10px");
            buttonContainer
                .append("button")
                .text("Agregar Persona")
                .attr("class", "agregar")
                .on("click", () => {
                var container_reg = this.ventana.obtenerContenedor();
                this.formulario(container_reg, null);
                this.ventana.mostrar();
            });
            container.append("h2").text("Lista de Personas Registradas")
                .attr("id", "ContenedorLista")
                .attr("class", "h2");
            this.VerPersonasApi();
        }
        lista() {
            var _a;
            d3.select("#ContenedorLista").select("table").remove();
            var tabla = d3.select("#ContenedorLista").append("table").attr("class", "tabla");
            let data = Array.from(this.PersonasMap.values());
            var texto = (_a = this.inputbusqueda) === null || _a === void 0 ? void 0 : _a.property("value").toLowerCase();
            if (texto != " ") {
                data = data.filter((persona) => persona.nombre.toLowerCase().includes(texto));
            }
            tabla.selectAll("tr")
                .data([["Id", "Nombre", "Apellidos", "Edad", "Correo", "Telefono", "Fecha de nacimiento", "Editar", "Eliminar"]])
                .enter()
                .append("tr")
                .selectAll("th")
                .data(d => d)
                .enter()
                .append("th")
                .text(d => d)
                .each((d, i, nodes) => {
                d3.select(nodes[i]).style("cursor", "pointer").on("click", () => {
                    switch (d) {
                        case "Nombre":
                            this.OrdenaNombre();
                            break;
                        case "Apellidos":
                            this.OrdenaApellido();
                            break;
                        case "Edad":
                            this.OrdenaEdad();
                            break;
                        case "Correo":
                            this.OrdenaCorreo();
                            break;
                        case "Telefono":
                            this.OrdenaTelefono();
                            break;
                        case "Fecha de nacimiento":
                            this.OrdenaFechaN();
                            break;
                        default:
                            this.lista();
                            break;
                    }
                });
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
            filas_nuevas.append("td").append("button")
                .text("Editar")
                .attr("class", "editarBtn")
                .on("click", (event, d) => {
                let container_edit = this.ventana.obtenerContenedor();
                this.formulario(container_edit, d);
                this.ventana.mostrar();
            });
            filas_nuevas.append("td").append("button")
                .text("Eliminar")
                .attr("class", "cancelar")
                .on("click", (event, d) => {
                this.eliminar(d.id);
            });
            d3.selectAll("th")
                .attr("class", "th");
            d3.selectAll("td")
                .attr("class", "tr");
        }
        formulario(container_form, persona = null) {
            container_form.selectAll("*").remove();
            container_form.append("h3")
                .text(persona ? "Editar Persona" : "Registrar Persona");
            container_form.append("label").text("Nombre");
            var inputNombre = container_form.append("input")
                .attr("type", "text").attr("class", "input")
                .property("value", persona ? persona.nombre : "");
            container_form.append("label").text("Apellidos");
            var inputApellidos = container_form.append("input")
                .attr("type", "text").attr("class", "input")
                .property("value", persona ? persona.apellido : "");
            container_form.append("label").text("Edad");
            var inputEdad = container_form
                .append("input").attr("type", "number").attr("class", "input")
                .property("value", persona ? persona.edad : "");
            container_form.append("label").text("Correo");
            var inputEmail = container_form.append("input")
                .attr("type", "email").attr("class", "input")
                .property("value", persona ? persona.correo : "");
            container_form.append("label").text("Teléfono");
            var inputTelefono = container_form.append("input")
                .attr("type", "number").attr("class", "input")
                .property("value", persona ? persona.telefono : "");
            container_form.append("label").text("Fecha de nacimiento");
            var inputFechaN = container_form.append("input")
                .attr("type", "date").attr("class", "input")
                .property("value", persona ? new Date(persona.fechaN).toISOString().split("T")[0] : "");
            var buttonContainer = container_form.append("div")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("gap", "10px")
                .style("margin-top", "10px");
            buttonContainer.append("button")
                .text(persona ? "Actualizar" : "Registrar")
                .style("background-color", persona ? "#FFA500" : "#4CAF50")
                .attr("class", "actualizar")
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
                .attr("class", "cancelar")
                .on("click", () => {
                this.ventana.ocultar();
            });
            d3.selectAll("label").style("font-size", "18px").style("padding", "8px");
        }
        eliminar(id) {
            var MensajeEliminar = this.ventana.obtenerContenedor();
            MensajeEliminar.selectAll("*").remove();
            MensajeEliminar.append("h3").text("Eliminar Persona");
            MensajeEliminar.append("p").text(`¿Estás seguro de eliminar a la persona con ID ${id}?`);
            this.ventana.mostrar();
            MensajeEliminar.append("div")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("gap", "10px")
                .style("margin-top", "10px");
            MensajeEliminar.select("div").append("button")
                .text("Eliminar")
                .attr("class", "cancelar")
                .on("click", () => {
                if (this.PersonasMap.delete(id)) {
                    alert(`Eliminaste a la persona con ID ${id}.`);
                    this.lista();
                    this.ventana.ocultar();
                    console.log(`Persona con ID ${id} eliminada.`);
                }
                else {
                    console.log(`No se encontró la persona con ID ${id}.`);
                }
            });
            MensajeEliminar.select("div").append("button")
                .text("Cancelar")
                .attr("class", "cancela")
                .on("click", () => {
                this.ventana.ocultar();
            });
        }
    }
    view.VerPersonas = VerPersonas;
})(view || (view = {}));
//# sourceMappingURL=listaPersonas.js.map