export interface Card {
  inventory_price: number,
  market_price: number,
  card_name: string,
  set_name: string,
  card_text: string,
  set_id: string,
  rarity: string,
  card_set_id: string,
  card_color: string,
  card_type: string,
  life: number,
  card_cost: number,
  card_power: number,
  sub_types: string[],
  counter_amount: number,
  attribute: string,
  date_scraped: Date,
  card_image_id: string,
  card_image: string
}

export interface Set {
  set_name: string,
  set_id: string
}