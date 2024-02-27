// Contains all the custom types we want to use for our application
import SciFi from './assets/images/categories/sci-fi.jpg';
import Billionaires from './assets/images/categories/billionaires.jpg';
import Holiday from './assets/images/categories/holiday.jpg';
import Mystery from './assets/images/categories/mystery.jpg';
import Romance from './assets/images/categories/romance.jpg';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  isReadNow: boolean;
  rating: number;
  image: string;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  scifi: SciFi,
  billionaires : Billionaires,
  holiday : Holiday,
  mystery : Mystery,
  romance : Romance
};
export const categoryList = [
  { categoryId: 1001, name: "Sci-Fi" },
  { categoryId: 1002, name: "Billionaires" },
  { categoryId: 1003, name: "Holiday" },
  { categoryId: 1004, name: "Mystery" },
  { categoryId: 1005, name: "Romance" },
];

export const bookList = [
  {
    bookId: 1001,
    title: "The Midnight Library",
    author: "By Matt Haig",
    price: 20,
    isPublic: true,
    isReadNow: true,
    rating: 3,
    image: require("../src/assets/images/books/bookstore-scifi/the-midnight-library.jpeg")
  },
  {
    bookId: 1002,
    title: "Fahrenheit 451",
    author: "By Ray D Bradbury",
    price: 14.99,
    isPublic: false,
    isReadNow: false,
    rating: 4,
    image: require("../src/assets/images/books/bookstore-scifi/fahrenheit-451.jpeg")
  },
  {
    bookId: 1003,
    title: "Brave New World",
    author: "By Aldous Huxley",
    price: 13.99,
    isPublic: true,
    isReadNow: false,
    rating: 2,
    image: require("../src/assets/images/books/bookstore-scifi/brave-new-world.jpeg")
  },
  {
    bookId: 1004,
    title: "House of Sky and Breath",
    author: "By Sarah J Maas",
    price: 9.99,
    isPublic: true,
    isReadNow: true,
    rating: 4,
    image: require("../src/assets/images/books/bookstore-scifi/house-of-sky-and-breath.jpeg")
  },
  {
    bookId: 1005,
    title: "Exhalation",
    author: "By Ted Chiang",
    price: 4.99,
    isPublic: true,
    isReadNow: true,
    rating: 3,
    image: require("../src/assets/images/books/bookstore-scifi/exhalation.jpeg")
  },
];