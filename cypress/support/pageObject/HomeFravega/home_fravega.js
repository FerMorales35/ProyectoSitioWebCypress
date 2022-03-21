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
    cy.get('[style="grid-area:search"] > .sc-laRQdt > .sc-jgHCSr').should("be.visible").then(() => {
      cy.get('[style="grid-area:search"] > .sc-laRQdt > .sc-jgHCSr').type(producto).type("{enter}")
       cy.wait(tiempo)
    })
    //Validar titulo de la seccion del producto seleccionado
    cy.xpath("//h1[contains(text(),'Heladera')]").should("contains.text",producto)
  }

  seleccionarTipoProducto(tipoProducto, busqueda) {

    let tiempo = 2000
    let producto

    //listado de tipos de productos
    cy.xpath("//ul/li/h4/a[@class='CategoriesFilter__A-shopping-ui__sc-ind2zf-0 cZJNKd']").each(($el) => {
        //Obetner datos de cada tipo de producto
        producto = $el.text()
        cy.log(producto)
        cy.wait(tiempo)
      }).then(() => {
        //Seleccionar el tipo de producto por parametro
        if (producto.includes(tipoProducto)) {
          cy.wrap($el).click()
        }
      })
      cy.wait(tiempo)
      cy.xpath("//h1[contains(text(),'Heladera')]").should("contains.text", busqueda)
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
    cy.get(".categorySlug__TitleCategory-shopping-ui__sc-1l2p1q1-6").should("have.text", titulo)
    cy.wait(tiempo)

  }

  validarMarcaPorProductoyCantidad(marca) {

    let cantidadTotal = 27 
    let contadorIncial = 0
    let contador = 0


    cy.xpath("//ul[@data-test-id='results-list']/li/article/a/div/div/span").each(($el,$list) =>{
         //Validar que cada elemento del listado contanga la marca enviada por parametro
          cy.log("Producto: " + $el.text())
           cy.get($el).should("contains.text", marca)
            contadorIncial = $list + 1
             contador = $list + 1
              if(contador == 15 && cantidadTotal > contador){
                cy.xpath("//span[contains(text(),'Siguiente >')]").click()
                 cy.xpath("//ul[@data-test-id='results-list']/li/article/a/div/div/span").each(($el,$list) =>{
                  cy.log("Producto: " + $el.text())
                   cy.get($el).should("contains.text", marca)
              })
          }
      })
  }
} 

export default Home_Fravega
