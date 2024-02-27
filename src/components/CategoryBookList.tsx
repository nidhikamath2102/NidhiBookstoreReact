import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {bookList,BookItem} from "../types";
import AppHeader from "./AppHeader";

function CategoryBookList() {
  return (
      <>
      <AppHeader pageName= "Categories" />
      <CategoryNav/>
          <ul className="book-lists">
              {bookList.map((book:BookItem) => (
                  <CategoryBookListItem  bookId={book.bookId} isPublic={book.isPublic}
                                         price={book.price} title={book.title}
                                         author={book.author} isReadNow={book.isReadNow}
                                         rating={book.rating} image={book.image}/>))}
          </ul>
      </>
)
}

export default CategoryBookList;
