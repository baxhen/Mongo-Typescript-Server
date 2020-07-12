interface Store {
  name: string;
  ownerName: string;
  password: string;
  storeDescription: string;
  imgsUrls: string[];
  address: {
    street: string;
    streetNumber: string;
    state: string;
    city: string;
    lat: number;
    lng: number;
  };
  contacts: {
    email: string;
    whatsapp: string;
  };
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
