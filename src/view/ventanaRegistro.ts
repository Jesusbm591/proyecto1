namespace view {
    export class Ventana {
        private ventana: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
        private contenedorClase: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
        constructor() {
            this.ventana = d3.select("body").append("div")
                .attr("id", "VentanaFlotante")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("width", "600px")
                .style("height", "900px")
                .style("background-color", "lightgrey")
                .style("border", "2px solid #000")
                .style("display", "none")
                .style("z-index", "1000")
                .style("padding", "10px")
                .style("cursor", "move")
                .style("flex-direction", "column")
                .style("align-items", "center")
                .style("justify-content", "space-between");
    
            this.ventana.append("button")
                .text("X")
                .style("color", "red")
                .style("position", "absolute")
                .style("right", "10px")
                .style("border-radius", "5px")
                .style("cursor", "pointer")
                .on("click", () =>
                     this.ocultar()
                );
            
            this.contenedorClase = this.ventana.append("div")
                .attr("id", "contenidoFigura")
                .style("margin-top", "5%")
                .style("width", "100%")
                .style("background-color", "#ccc")
                .style("height", "90%")
                .style("display", "flex")
                .style("align-items", "center")
                .style("flex-direction", "column");
    
            d3.drag<HTMLElement, unknown>()
                .on("drag", (mouse) => {
                    let left = parseFloat(this.ventana.style("left")) + mouse.dx;
                    let top = parseFloat(this.ventana.style("top")) + mouse.dy;
                    this.ventana.style("left", `${left}px`).style("top", `${top}px`);
                })(this.ventana);
        }

        mostrar() {
            this.ventana.style("display", "block");
        }
        ocultar() {
            this.ventana.style("display", "none");
        }
        obtenerContenedor() {  
            return this.contenedorClase;
        }
    }
}