import Home_Fravega from '../../support/pageObject/HomeFravega/home_fravega'

const tests = require('../../fixtures/Data_Driven/datosBusquedaProducto.json')

describe('Realizar una busqueda en el sitio web Fravega y validar que el titulo de cada elemento obtenido contenga la marca seleccionada',() => {

    let tiempo = 3000;

    beforeEach(() => {
        cy.visit("https://www.fravega.com/");
        cy.title("eq","Frávega: Electrodomésticos, Tecnología y Artículos para el hogar")
        cy.wait(tiempo)
    })

    const pagina = new Home_Fravega()
    
    tests.forEach(test => {
        
        it('Busqueda de producto en el sitio', () => {    
                
            pagina.buscarProducto(test.tipoProducto)
            pagina.seleccionarTipoProducto(test.seleccion,test.tipoProducto)
            pagina.seleccionarMarca(test.marca,test.titulo)
            pagina.validarMarcaPorProductoyCantidad(test.marca) 

        })
    })
})
