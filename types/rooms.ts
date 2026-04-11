export type Room = {
  id: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: string;
};

export interface Settings {
  id: number;
  created_at: string;
  maxBookingLength: number;
  maxGuests: number;
  maxActiveBookingsPerGuest: number;
  breakfastPrice: number;
  revenueTarget: number;
}
