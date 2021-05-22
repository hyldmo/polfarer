export interface Wine {
	Fairtrade: boolean
	Lukt: string
	Pris: number
	Bitterhet: number
	Produktutvalg: string
	Gluten_lav_pa: boolean
	Okologisk: boolean
	Emballasjetype: string
	Distrikt: string
	Underdistrikt: string
	Volum: number
	Passertil03: string
	Fylde: number
	Datotid: string
	Syre: number
	Friskhet: number
	Land: string
	Vareurl: string
	Varenummer: number
	Produsent: string
	AndreGTINs: string
	Passertil02: string
	Alkohol: number
	Grossist: string
	Garvestoffer: number
	Varenavn: string
	Farge: string
	Miljosmart_emballasje: boolean
	Kosher: boolean
	HovedGTIN: number
	Korktype: string
	meta: Meta
	Smak: string
	Distributor: string
	Lagringsgrad: string
	Literpris: number
	Argang: number
	Varetype: string
	Metode: string
	Rastoff: string
	Butikkategori: number
	Sukker: number
	Biodynamisk: boolean
	Sodme: number
	Passertil01: string
	firebaseTags?: string[] | null
  }
export interface Meta {
	winery: Winery
	id: number
	sweetness_id?: null
	alcohol: number
	description: string
	is_first_wine: boolean
	vintage_type: number
	is_natural: boolean
	region: Region
	vintage_mask_raw?: null
	non_vintage: boolean
	created_at: string
	grapes?: number[] | null
	review_status: number
	name: string
	fresh: boolean
	foods?: number[] | null
	style_id: number
	objectID: string
	score: number
	type_id: number
	image: Image
	hidden: boolean
	seo_name: string
	vintage: Vintage
	ratingsCount: number
	rank?: null
}
export interface Winery {
	is_claimed: boolean
	id: number
	business_name: string
	location?: null
	description: string
	first_wines?: null[] | null
	winery_group: WineryGroup
	phone: string
	facebook: string
	website: string
	region: Region
	wine_maker?: null
	statistics: Statistics
	review_status: string
	status: number
	name: string
	instagram: string
	email: string
	address: Address
	winemaker?: null
	twitter: string
	image?: null
	seo_name: string
	background_image?: null
  }
export interface WineryGroup {
	website: string
	id: number
	name: string
  }
export interface Region {
	seo_name: string
	name: string
	background_image?: null
	name_en: string
	id: number
	class: Class
	country: string
  }
export interface Class {
	country_code: string
	id: number
	abbreviation: string
	description: string
  }
export interface Statistics {
	ratings_average: number
	ratings_count: number
	wines_count: number
	labels_count: number
  }
export interface Address {
	country: string
	street?: null
	neighborhood?: null
	vat_code?: null
	company?: null
	zip?: null
	street2?: null
	state?: null
	external_id?: null
	vat_number?: null
	residential?: null
	name?: null
	title?: null
	city?: null
	phone?: null
  }
export interface Image {
	location: string
	variations: Variations
  }
export interface Variations {
	medium_square: string
	bottle_medium_square: string
	bottle_large: string
	large: string
	bottle_small: string
	small_square: string
	bottle_small_square: string
	label: string
	bottle_medium: string
	medium: string
	label_small_square: string
	label_large: string
	label_medium: string
	label_medium_square: string
  }
export interface Vintage {
	id: number
	year: string
	seo_name: string
	name: string
  }
