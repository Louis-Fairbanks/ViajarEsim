export type Plan = {
    id: number,
    plan_nombre: string,
    region_nombre: string,
    region_isocode: string,
    precio: number,
    data: string,
    duracion: string,
    is_low_cost: boolean,
    proveedor?: string,
    region_nombre_translations? : TranslationInfo[]
}

type TranslationInfo = {
    locale : 'es' | 'en' | 'br',
    translatedName : string
}
