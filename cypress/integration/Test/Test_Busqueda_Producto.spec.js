import Home_Fravega from '../../support/pageObject/HomeFravega/home_fravega'

describe('Realizar una busqueda en el sitio web Fravega y validar que el titulo de cada elemento obtenido contenga la marca seleccionada',() => {

    const pagina = new Home_Fravega()
    pagina.visitarSitio()

    it('Busqueda de producto en el sitio', () => { 

        pagina.buscarProducto(data.tipoProducto)
        pagina.seleccionarTipoProducto(data.seleccion,data.tipoProducto)
        pagina.seleccionarMarca(data.marca,data.titulo)
        /*pagina.validarMarcaPorProductoyCantidad(data.marca) */
    })
})
