export type Plan = {
    id?: number,
    planName: string,
    destinationName: string,
    destinationIsocode: string,
    priceInDollars: number,
    dataGB: 'unlimited' | number,
    durationDays: number,
    provider?: string,
    lowCost: boolean
}
