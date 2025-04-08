namespace view {
    export class Inicio {
        constructor(container_inicio: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
            this.inicio(container_inicio);
        }
        private inicio(container_inicio: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
            container_inicio
                .style("display", "flex")
                .style("align-items", "center")
                .style("flex-direction", "column")
                .style("width", "100%");
            container_inicio.append("p")
                .text("Bienvenidos a Consumiendo Servicio Rest")
                .style("font-size", "30px")
                .style("text-align", "center");

            container_inicio.append("img")
            .attr("src", "../bin/images/Rest.png")
            .attr("width", 700) 
            .attr("height", 500); 
        }
    }
}