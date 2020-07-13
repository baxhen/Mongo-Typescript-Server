export interface Store {
  _id: string;
  name: string;
  ownerName: string;
  password: string;
  storeDescription: string;
  imgsUrls?: string[] | null;
  address: Address;
  contacts: Contacts;
  menu: Menu;
}
export interface Address {
  street: string;
  streetNumber: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
}
export interface Contacts {
  email: string;
  whatsapp: string;
}
export interface Menu {
  name: string;
  sections?: SectionsEntity[] | null;
}
export interface SectionsEntity {
  _id: string;
  position: number;
  name: string;
  products?: ProductsEntity[] | null;
}
export interface ProductsEntity {
  _id: string;
  name: string;
  price: number;
  desscription: string;
  imgUrl: string;
  pointValue: number;
}

interface User {
  name: string;
  password: string;
  points: number;
  experience: number;
  contacts: {
    email: string;
    whatsapp: string;
  };
  imgUrl: string;
  cards: object[];
}
