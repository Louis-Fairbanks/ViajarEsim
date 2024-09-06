export type OrderedeSIM = {
    orderNo: string,
    iccid: string,
    regionName : string,
    data: string, //puede ser un numero o 'Datos Ilimitados'
    salePrice : number, //precio de venta a diferencia del precio al que compramos nosotros, es para mandar en el email
    qrCodeUrl: string | Buffer,
    totalDuration: number,
    smdpAddress: string,
    accessCodeIos: string,
    accessCodeAndroid: string,
}