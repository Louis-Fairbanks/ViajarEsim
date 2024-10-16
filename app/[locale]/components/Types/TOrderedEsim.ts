export type OrderedeSIM = {
    orderNo: string,
    regionName : string,
    data: string, //puede ser un numero o 'Datos Ilimitados'
    salePrice : number, //precio de venta a diferencia del precio al que compramos nosotros, es para mandar en el email
    qrCodeUrl: string
    iccid : string,
    totalDuration: number,
    smdpAddress: string, //ejemplo rsp1.cmlink.com
    accessCodeIos: string, //mismo como la de android pero solo el codigo 
    accessCodeAndroid: string, //ejempo LPA:1$rsp1.cmlink.com$75B63E797B3C4E4583D19F2D7E1C7476
    pedidos_planes_id: number,
}