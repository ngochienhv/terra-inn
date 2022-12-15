export interface IRoom {
  id: string;
  name: string;
  group_id: number;
  max_slot: number;
  floor: number;
  description: string;
  area: number;
  rental_price: number;
  elec_rate: number;
  water_rate: number;
  service_fee: number;
  garbage_fee: number;
  parking_fee: number;
  status: number;
}
