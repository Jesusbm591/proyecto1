var view;
(function (view) {
    class formulario {
        constructor(container_form) {
            this.PersonasMap = new Map();
            this.ventana = new view.Ventana();
            this.lista = new view.VerPersonas(d3.select("#container_body"));
            this.formulario(container_form);
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
                    this.lista.lista();
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
    }
    view.formulario = formulario;
})(view || (view = {}));
//# sourceMappingURL=formulario.js.map