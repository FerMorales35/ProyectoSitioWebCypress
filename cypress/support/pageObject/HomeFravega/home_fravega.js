require("cypress-xpath");
class Home_Fravega {

  visitarSitio() {

    let tiempo = 2000
    

    before(() => {
      cy.visit("https://www.fravega.com/");
      cy.title("eq","Frávega: Electrodomésticos, Tecnología y Artículos para el hogar")
      cy.wait(tiempo)
      cy.fixture('datosFravega').then((data) => {globalThis.data = data})
    })
  }

  buscarProducto(producto) {
    let tiempo = 2000

    //Cerrar Pop up de codigo Postal
    cy.xpath("//button[@data-test-id='close-modal-button']").click()
    cy.wait(tiempo)
    //Validamos caja de busqueda e Ingresamos el producto a buscar.Presionamos Enter
    cy.get('[style="grid-area:search"] > .sc-higWrZ > .sc-gTgzoy').should("be.visible").then(() => {
      cy.get('[style="grid-area:search"] > .sc-higWrZ > .sc-gTgzoy').type(producto).type("{enter}")
       cy.wait(tiempo)
    })
    //Validar titulo de la seccion del producto seleccionado
    cy.xpath("//h1[contains(text(),'Heladera')]").should("contains.text",producto)
  }

  //ACA QUEDE
  /* seleccionarTipoProducto(tipoProducto, busqueda) {

    let tiempo = 2000
    let enlace 

    //listado de tipos de productos
    cy.xpath("//body[1]/div[1]/div[2]/div[3]/div[4]").each(($el) => {
         cy.log("Listado: " + $el)
         for(let enlace in $el.text()){
           if(enlace.includes(tipoProducto)){
            cy.wrap(enlace).click()
            cy.log("Parametro enviado: " + tipoProducto)
            cy.log("Hizo click en:" +enlace)
            cy.get('.categorySlug__TitleCategory-shopping-ui__sc-1l2p1q1-6').should("contains.text", busqueda) 
            break
          }
       }   
   })
}
       

  seleccionarMarca(marcaSeleccionada, titulo) {

    let tiempo = 2000
    //Seleccionar la opcion ver todos
    cy.get(".BrandFilter__Hyperlink-shopping-ui__sc-1f2zp6r-0").click()
    //Filtrar por marca seleccionada
    cy.get(".styled__SearchInput-shopping-ui__sc-pa3x91-2").type(marcaSeleccionada)
    //Clickear sobre el enlace
    cy.get("#filterItempatrick").click()
    cy.get("#apply").click()
    //Validar el titulo de la seccion = Producto + marca
    cy.get(".categorySlug__TitleCategory-shopping-ui__sc-1l2p1q1-6").should("have.text",titulo)
    cy.wait(tiempo)

  }

  validarMarcaPorProductoyCantidad(marca){

      cy.xpath("//ul[@data-test-id='results-list']/li/article/a/div/div/span").each(($el,$index,$list) =>{   
           cy.log("Producto: " + $el.text())
           cy.wait(tiempo)
           cy.get($el).should("contains.text",marca)  
      })
   }  */
}
//cy.log("Producto: " + $el.text())
//cy.get($el).should("contains.text",marca)  
//cy.get("//span[contains(text(),'Siguiente >')]").should("be.visible")


export default Home_Fravega
