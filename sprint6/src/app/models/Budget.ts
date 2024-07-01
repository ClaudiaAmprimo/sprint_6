export default interface Budget{
  pages: number,
  languages: number,
  services?: { name: string; price: number; pages?: number; languages?: number }[];
  totalPrice?: number;
}
