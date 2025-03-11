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
                .text("Bienvenidos")
                .style("font-size", "30px")
                .style("text-align", "center");
        }
    }
    view.Inicio = Inicio;
})(view || (view = {}));
//# sourceMappingURL=inicio.js.map