import { Discount } from "../Types/TDiscount"

export const discountCodes : Discount[] = [{
    code: 'VIVIRVIAJANDO',
    acceptedVariations: [
        'VIVIRVIAJANDO',
        'vivirviajando',
        'Vivirviajando',
        'Vivir viajando',
        'vivir viajando',
        'VivirViajando',
        'Vivir Viajando'
    ],
    discountPercentage: 15
},
{
    code: 'ViajareSIM5',
    acceptedVariations: [
        'Viajaresim5',
        'viajaresim5',
        'viajar esim 5',
        'Viajar esim 5',
        'Viajar eSIM 5',
        'viajarEsim5',
        'ViajareSIM5',
        'ViajareSim5',
        'viajareSIM5',
    ],
    discountPercentage: 5
}
]