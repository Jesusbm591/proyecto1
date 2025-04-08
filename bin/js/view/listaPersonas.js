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
                    let data = yield d3.json("http://192.168.15.79/PersonasService.svc/ObtenerPersonas");
                    data.forEach((persona) => {
                        this.PersonasMap.set(persona.Id, persona);
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
            this.OrdenAscendenteId = true;
            this.mostrarLista(container);
            setInterval(() => {
                this.VerPersonasApi();
            }, 2500);
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
            container.append("h2").text("Personas Registradas")
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
            if (texto.trim() !== "") {
                data = data.filter((persona) => persona.Nombre.toLowerCase().includes(texto));
            }
            tabla.selectAll("tr")
                .data([["Id", "Nombre", "ApellidoP", "ApellidoM", "Edad", "Correo", "Telefono", "Fecha de nacimiento", "Fecha de Registro", "Estado", "Editar", "Eliminar"]])
                .enter()
                .append("tr")
                .selectAll("th")
                .data(data => data)
                .enter()
                .append("th")
                .text(data => data)
                .each((data, i, nodes) => {
                d3.select(nodes[i]).style("cursor", "pointer").on("click", () => {
                    switch (data) {
                        case "Id":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteId ? a[1].Id - b[1].Id : b[1].Id - a[1].Id;
                            }));
                            this.OrdenAscendenteId = !this.OrdenAscendenteId;
                            this.lista();
                            break;
                        case "Nombre":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.ordenAscendenteNombre ? a[1].Nombre.localeCompare(b[1].Nombre) : b[1].Nombre.localeCompare(a[1].Nombre);
                            }));
                            this.ordenAscendenteNombre = !this.ordenAscendenteNombre;
                            this.lista();
                            break;
                        case "ApellidoP":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteApellido ? a[1].ApellidoP.localeCompare(b[1].ApellidoP) : b[1].ApellidoP.localeCompare(a[1].ApellidoP);
                            }));
                            this.OrdenAscendenteApellido = !this.OrdenAscendenteApellido;
                            this.lista();
                            break;
                        case "ApellidoM":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteApellido ? a[1].ApellidoM.localeCompare(b[1].ApellidoM) : b[1].ApellidoM.localeCompare(a[1].ApellidoM);
                            }));
                            this.OrdenAscendenteApellido = !this.OrdenAscendenteApellido;
                            this.lista();
                            break;
                        case "Edad":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteEdad ? a[1].Edad - b[1].Edad : b[1].Edad - a[1].Edad;
                            }));
                            this.OrdenAscendenteEdad = !this.OrdenAscendenteEdad;
                            this.lista();
                            break;
                        case "Correo":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteCorreo ? a[1].Correo.localeCompare(b[1].Correo) : b[1].Correo.localeCompare(a[1].Correo);
                            }));
                            this.OrdenAscendenteCorreo = !this.OrdenAscendenteCorreo;
                            this.lista();
                            break;
                        case "Telefono":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteTelefono ? a[1].Telefono - b[1].Telefono : b[1].Telefono - a[1].Telefono;
                            }));
                            this.OrdenAscendenteTelefono = !this.OrdenAscendenteTelefono;
                            this.lista();
                            break;
                        case "Fecha de nacimiento":
                            this.PersonasMap = new Map([...this.PersonasMap.entries()].sort((a, b) => {
                                return this.OrdenAscendenteFechaN ? new Date(a[1].FechaN).getTime() - new Date(b[1].FechaN).getTime() : new Date(b[1].FechaN).getTime() - new Date(a[1].FechaN).getTime();
                            }));
                            this.OrdenAscendenteFechaN = !this.OrdenAscendenteFechaN;
                            this.lista();
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
                .data(data => [data.Id, data.Nombre, data.ApellidoP, data.ApellidoM, data.Edad, data.Correo, data.Telefono, data.FechaN ? new Date(data.FechaN).toLocaleDateString() : '', data.FechaRegistro ? new Date(data.FechaRegistro).toLocaleDateString() : '', data.Estado])
                .enter()
                .append("td")
                .text(data => data);
            filas_nuevas.classed("fila-inactiva", data => data.Estado === "Inactivo");
            // filas_nuevas.append("td").append("button")
            //     .text(d => d.Estado === "Activo" ? "Activo" : "Inactivo") 
            //     .attr("class", "estadoBtn")
            //     .on("click", (event, d) => {
            //         let nuevoEstado = d.Estado === "Activo" ? "Inactivo" : "Activo"; 
            //         this.cambiarEstadoUsuario(d.Id, nuevoEstado, event.target);
            //         this.lista()
            //     });
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
                this.eliminar(d.Id);
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
                .property("value", persona ? persona.Nombre : "");
            container_form.append("label").text("Apellido Paterno");
            var inputApellidoP = container_form.append("input")
                .attr("type", "text").attr("class", "input")
                .property("value", persona ? persona.ApellidoP : "");
            container_form.append("label").text("Apellido Materno");
            var inputApellidoM = container_form.append("input")
                .attr("type", "text").attr("class", "input")
                .property("value", persona ? persona.ApellidoM : "");
            container_form.append("label").text("Edad");
            var inputEdad = container_form.append("input")
                .attr("type", "number").attr("class", "input")
                .property("value", persona ? persona.Edad : "");
            container_form.append("label").text("Correo");
            var inputEmail = container_form.append("input")
                .attr("type", "email").attr("class", "input")
                .property("value", persona ? persona.Correo : "");
            container_form.append("label").text("Teléfono");
            var inputTelefono = container_form.append("input")
                .attr("type", "number").attr("class", "input")
                .property("value", persona ? persona.Telefono : "");
            container_form.append("label").text("Fecha de nacimiento");
            var inputFechaN = container_form.append("input")
                .attr("type", "date").attr("class", "input")
                .property("value", persona ? new Date(persona.FechaN).toISOString().split("T")[0] : "");
            container_form.append("label").text("Fecha de Registro");
            var inputFechaR = container_form.append("input")
                .attr("type", "date").attr("class", "input")
                .property("value", persona ? new Date(persona.FechaRegistro).toISOString().split("T")[0] : "");
            container_form.append("label").text("Estado");
            var inputEstado = container_form.append("input")
                .attr("type", "text").attr("class", "input")
                .property("value", persona ? persona.Estado : "");
            var buttonContainer = container_form.append("div")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("gap", "10px")
                .style("margin-top", "10px");
            buttonContainer.append("button")
                .text(persona ? "Actualizar" : "Registrar")
                .attr("class", "agregar")
                .on("click", () => __awaiter(this, void 0, void 0, function* () {
                var ultimoid = this.PersonasMap.size > 0 ? Math.max(...Array.from(this.PersonasMap.keys())) + 1 : 1;
                const datosPersona = {
                    Id: persona ? persona.Id : ultimoid,
                    Nombre: inputNombre.property("value"),
                    ApellidoP: inputApellidoP.property("value"),
                    ApellidoM: inputApellidoM.property("value"),
                    Edad: parseInt(inputEdad.property("value")),
                    Correo: inputEmail.property("value"),
                    Telefono: parseInt(inputTelefono.property("value")),
                    FechaN: new Date(inputFechaN.property("value")),
                    FechaRegistro: new Date(inputFechaR.property("value")),
                    Estado: inputEstado.property("value")
                };
                try {
                    let url = persona ? "http://192.168.15.79/PersonasService.svc/editar" : "http://192.168.15.79/PersonasService.svc/agregar";
                    const respuesta = yield fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(datosPersona)
                    });
                    if (!respuesta.ok)
                        throw new Error("Error al guardar persona");
                    console.log("Persona guardada correctamente");
                    if (!persona) {
                        this.PersonasMap.set(datosPersona.Id, datosPersona);
                    }
                    else {
                        this.PersonasMap.set(datosPersona.Id, datosPersona);
                    }
                    this.lista();
                    this.ventana.ocultar();
                }
                catch (error) {
                    console.error("Error al guardar:", error);
                }
            }));
            buttonContainer.append("button")
                .text("Cancelar")
                .attr("class", "cancelar")
                .on("click", () => {
                this.ventana.ocultar();
            });
            d3.selectAll("label").style("font-size", "18px").style("padding", "8px");
        }
        cambiarEstadoUsuario(id, nuevoEstado, boton) {
            fetch(`http://192.168.15.79/PersonasService.svc/cambiarEstado`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Id: id, NuevoEstado: nuevoEstado }),
            })
                .then(response => response.json())
                .then(data => {
                if (data.Success) {
                    d3.select(boton)
                        .text(nuevoEstado === "activo" ? "Desactivar" : "Activar")
                        .attr("data-estado", nuevoEstado);
                }
                else {
                    alert("Error al actualizar el estado.");
                }
            })
                .catch(error => console.error("Error:", error));
        }
        eliminar(Id) {
            var MensajeEliminar = this.ventana.obtenerContenedor();
            MensajeEliminar.selectAll("*").remove();
            MensajeEliminar.append("h3").text("Eliminar Persona");
            MensajeEliminar.append("p").text(`¿Estás seguro de eliminar a la persona con ID ${Id}?`);
            this.ventana.mostrar();
            MensajeEliminar.append("div")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("gap", "10px")
                .style("margin-top", "10px");
            MensajeEliminar.select("div").append("button")
                .text("Eliminar")
                .attr("class", "cancelar")
                .on("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const url = "http://192.168.15.79/PersonasService.svc/eliminar";
                    const respuesta = yield fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ Id })
                    });
                    const resultado = yield respuesta.json();
                    if (respuesta.ok) {
                        this.PersonasMap.delete(Id);
                        alert(`Eliminaste a la persona con ID ${Id}.`);
                        this.lista();
                        this.ventana.ocultar();
                    }
                    else {
                        alert(`No se pudo eliminar la persona: ${resultado}`);
                    }
                }
                catch (error) {
                    console.error("Error al eliminar:", error);
                }
            }));
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