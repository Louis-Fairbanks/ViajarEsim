import { Plan } from "./Types/TPlan";

export const plans : Plan[] = [
  {
    id: 1,
    planName: 'Plan Básico',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 1,
    priceInDollars: 6,
    provider: 'eSIMaccess',
    lowCost: false
  },
  {
    id: 2,
    planName: 'Plan Ilimitado',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 3,
    priceInDollars: 13,
    lowCost: false
  },
  {
    id: 3,
    planName: 'Plan Ilimitado',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 7,
    priceInDollars: 29,
    lowCost: false
  },
  {
    id: 4,
    planName: 'Plan Ilimitado',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 10,
    priceInDollars: 33,
    lowCost: false
  },
  {
    id: 5,
    planName: 'Plan Ilimitado',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 15,
    priceInDollars: 51,
    lowCost: false
  },
  {
    id: 6,
    planName: 'Plan Ilimitado',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 'unlimited',
    durationDays: 30,
    priceInDollars: 75,
    lowCost: false
  },
  {
    id: 7,
    planName: 'Plan Low Cost',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 10,
    durationDays: 30,
    priceInDollars: 20,
    lowCost: true
  },
  {
    id: 8,
    planName: 'Plan Low Cost VIP',
    destinationName: 'Estados Unidos',
    destinationIsocode: 'us',
    dataGB: 20,
    durationDays: 30,
    priceInDollars: 50,
    lowCost: true
  }
];

export const plans2 = [
  {
    destinationIsocode: 'ar',
    planName: 'Plan Ilimitado',
    dataGB: 'unlimited',
    durationDays: 1,
    priceInDollars: '10.00'
  },
  {
    destinationIsocode: 'ar',
    planName: 'Plan Ilimitado',
    dataGB: 'unlimited',
    durationDays: 3,
    priceInDollars: '17.00'
  },
  {
    destinationIsocode: 'ar',
    planName: 'Plan Ilimitado',
    dataGB: 'unlimited',
    durationDays: 7,
    priceInDollars: '37.00'
  },
  {
    destinationIsocode: 'ar',
    planName: 'Plan Ilimitado',
    dataGB: 'unlimited',
    durationDays: 10,
    priceInDollars: '42.00'
  },
  {
    destinationIsocode: 'ar',
    planName: 'Plan Low Cost',
    dataGB: '10 GB',
    durationDays: 30,
    priceInDollars: '40.00',
    lowCost: true
  },
  {
    destinationIsocode: 'ar',
    planName: 'Plan Low Cost VIP',
    dataGB: '20 GB',
    durationDays: 30,
    priceInDollars: '70.00',
    lowCost: true
  }

]