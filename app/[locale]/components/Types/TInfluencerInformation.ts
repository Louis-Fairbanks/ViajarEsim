
export type InfluencerInformation = {
    nombre : string;
    link : string;
    clics : number;
    codigoDescuento : string;
    vecesAplicado : number;
    comprasGeneradas : number;
    ingresosGenerados : number;
    comision : number;
    ganancias : number;
    compras : Purchase[]
}

interface Purchase {
    fecha : string,
    numeroOrden : number,
    salePrice : number,
    descuentoAplicado : string,
    plans : {
        region : string,
        planName : string,
        duracion : number
    }[]
}