export type GuitarType = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItemType = GuitarType & {
  // Herencia de types
  quantity: number;
};
