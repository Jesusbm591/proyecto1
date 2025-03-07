var view;
(function (view) {
    class Inicio {
        constructor(container_inicio) {
            this.inicio(container_inicio);
        }
        inicio(container_inicio) {
            container_inicio
                .style("display", "flex")
                .style("align-items", "center")
                .style("flex-direction", "column")
                .style("width", "100%");
            container_inicio.append("p")
                .text("Bienvenidos a Carpinteria DMM")
                .style("font-size", "30px")
                .style("text-align", "center");
            var card = container_inicio.append("div")
                .style("border-radius", "5px")
                .style("width", "90%")
                .style("background", "#fff")
                .style("display", "grid")
                .style("grid-template-columns", "repeat(1, 1fr)")
                .style("gap", "15px")
                .style("padding", "10px")
                .style("box-shadow", "0px 0px 10px rgba(0,0,0,0.1)");
            const imagenes = [];
            imagenes.forEach(src => {
                card.append("img")
                    .attr("src", src)
                    .attr("alt", "mueble")
                    .style("width", "100%")
                    .style("height", "auto")
                    .style("border-radius", "5px")
                    .style("object-fit", "cover");
            });
        }
    }
    view.Inicio = Inicio;
})(view || (view = {}));
//# sourceMappingURL=inicio.js.map