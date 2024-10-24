import { countryToCurrencyMap } from "../components/ShoppingContext/CurrencyCodeMappings"

type CurrencyConfig = {
    code: string;
    subUnits: number;
}

export const CURRENCY_CONFIG: Record<string, CurrencyConfig> = {
    'ars': {
        code: 'ars',
        subUnits: 100
    },
    'mxn': {
        code: 'mxn',
        subUnits: 100
    },
    'cop': {
        code: 'cop',
        subUnits: 100
    },
    'clp': {
        code: 'clp',
        subUnits: 1
    },
    'eur': {
        code: 'eur',
        subUnits: 100
    },
    'pen': {
        code: 'pen',
        subUnits: 100
    },
    'usd': {
        code: 'usd',
        subUnits: 100
    },
    'uyu': {
        code: 'uyu',
        subUnits: 100
    },
    'brl': {
        code: 'brl',
        subUnits: 100
    }
}