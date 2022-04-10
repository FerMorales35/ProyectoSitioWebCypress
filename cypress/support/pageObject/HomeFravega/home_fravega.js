require("cypress-xpath");
class Home_Fravega {

  buscarProducto(producto) {
    let tiempo = 2000;

    //Cerrar Pop up de codigo Postal
    cy.xpath("//button[@data-test-id='close-modal-button']").click();
    cy.wait(tiempo)
    //Validamos caja de busqueda e Ingresamos el producto a buscar.Presionamos Enter
    cy.get('[style="grid-area:search"] > .sc-higWrZ > .sc-gTgzoy').should("be.visible")
    .then(() => {
        cy.get('[style="grid-area:search"] > .sc-higWrZ > .sc-gTgzoy').type(producto).type("{enter}")
        cy.wait(tiempo)
        //Validar titulo de la seccion del producto seleccionado
        cy.get(".sc-ad9dc01-6").should("contains.text",producto)
      })
  }

  seleccionarTipoProducto(tipoProducto, busqueda) {
    let tiempo = 2000

    //listado de tipos de productos
    cy.xpath("//div[@class='sc-ad9dc01-1 iakjIl']/div/ul/li/h4/a").each(($el) => {
        cy.log("enlace: " + $el.text())
        if ($el.text().includes(tipoProducto)) {
          cy.wrap($el).click()
          cy.log("Hizo click en : " + $el.text())
          return false
        }
      }).then(() => {
        cy.get(".sc-ad9dc01-6").should("contains.text", busqueda)
      })
  }

  seleccionarMarca(marcaSeleccionada, titulo) {
    let tiempo = 2000

    //Seleccionar la opcion ver todos
    cy.get(".sc-8de229fa-0").click()
    //Filtrar por marca seleccionada 
    cy.xpath("//div[@class='sc-c0f66744-4 drldtH']/label").each(($el) => {
      cy.log("enlace: " + $el.text())
      if($el.text().includes(marcaSeleccionada)){
        cy.wrap($el).click()
        cy.log("Hizo click en : " + $el.text())
        return false
      }
   }).then(() => {
     cy.get("#apply").should("be.visible").click()
     //Validar el titulo de la seccion = Producto + marca
    cy.get(".sc-ad9dc01-6").should("have.text",titulo)
    cy.wait(tiempo)
   })
}

  validarMarcaPorProductoyCantidad(marca){

      cy.xpath("//ul[@data-test-id='results-list']/li/article/a/div/div/span").each(($el) =>{   
           cy.log("Producto: " + $el.text())
           cy.get($el).should("contains.text",marca)  
      })
   }  
}

export default Home_Fravega
