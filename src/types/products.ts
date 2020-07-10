
import * as wineResponse from '../../static/result.json'
import { ArrayElement } from 'types'

export type Product = {
    Datotid: string
    Varenummer: number
    Varenavn: string
    Volum: string
    Pris: string
    Literpris: string
    Varetype: string
    Produktutvalg: string
    Butikkategori: string
    Fylde: number
    Friskhet: number
    Garvestoffer: number
    Bitterhet: number
    Sodme: number
    Farge: string
    Lukt: string
    Smak: string
    Passertil01: string
    Passertil02: string
    Passertil03: string
    Land: string
    Distrikt: string
    Underdistrikt: string
    Argang: string
    Rastoff: string
    Metode: string
    Alkohol: string
    Sukker: string
    Syre: string
    Lagringsgrad: string
    Produsent: string
    Grossist: string
    Distributor: string
    Emballasjetype: string
    Korktype: string
    Vareurl: string
    Okologisk: boolean
    Biodynamisk: boolean
    Fairtrade: boolean
    Miljosmart_emballasje: boolean
    Gluten_lav_pa: boolean
    Kosher: boolean
    HovedGTIN: number
    AndreGTINs: string
}

export type Wines = typeof wineResponse['hits']
export type Wine = ArrayElement<Wines>
export type Vintage = ArrayElement<Wine['vintages']>
export type Polvin = Product & { meta?: Wine }
