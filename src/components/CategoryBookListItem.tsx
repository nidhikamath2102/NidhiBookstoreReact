import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import Stars from './Stars';

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpeg`;
};

function CategoryBookListItem(props:BookItem) {
return (

    <div className="book-card">
        <div className="book">
            <img className="book-image" src={props.image} alt="Book Image"/>
            {props.isReadNow && (
                <div className="read-now">
                    <div className="read-now-circle">
                        <div className="read-now-text">
                            <span className="read">Read</span>
                            <span className="read">Now</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="book-details">
            <Stars rating={props.rating}></Stars>
            <div className="book-title">{props.title}</div>
            <div className="book-author">{props.author}</div>
            <div className="book-price">${props.price}</div>
            <div className="details-row"></div>
            <div className="details-row">
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    </div>

)
}

export default CategoryBookListItem;
