import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem, CategoryItem} from "../types";
import AppHeader from "./AppHeader";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {DOMAIN_URL} from "../global";
import {Category} from "../contexts/CategoryContext";

function CategoryBookList() {
    const [loading, setLoading] = useState(true);
    let {catId} = useParams();
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        axios.get(`http://${DOMAIN_URL}/NidhiBookstoreReactTransact/api/categories/name/${catId}/books`)
            .then((result) => setBookList(result.data))
            .catch(console.error);
        setLoading(false)

    }, [catId]);

  return (
      <>
      <CategoryNav/>
          <ul className="book-lists">
              {bookList.map((book:BookItem) => (
                  loading ? (
                      <div className="loader"></div>
                  ) :(<CategoryBookListItem key={book.bookId} bookId={book.bookId} isPublic={book.isPublic}
                                         price={book.price} title={book.title}
                                         author={book.author} isReadNow={book.isReadNow}
                                         rating={book.rating} image={book.image}
                                         categoryId={book.categoryId}/>)))}
          </ul>
      </>
)
}

export default CategoryBookList;
