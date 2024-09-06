import { PlanPricingInfo } from "./TPlanPricingInfo"

export type PaymentEmailInformation = {
    email : string,
    orderNumber : string,
    firstName : string,
    lastName : string,
    total : number,
    datePaid : string,
    purchasedPlans : PlanPricingInfo[]
    appliedDiscount : string,
}