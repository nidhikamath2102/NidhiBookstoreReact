import '../assets/css/HomeCategoryList.css';
import book1 from "../assets/images/books/bookstore-scifi/the-midnight-library.jpeg";
import book2 from "../assets/images/books/bookstore-scifi/fahrenheit-451.jpeg";
import book3 from "../assets/images/books/bookstore-scifi/brave-new-world.jpeg";
import book4 from "../assets/images/books/bookstore-scifi/house-of-sky-and-breath.jpeg";
import {Link} from "react-router-dom";

function HomeCategoryList(){

    return (
        <div className="book-container">
            <div className="book">
                <img src={book1} alt="The Midnight Library"/>
                <h3>The Midnight Library</h3>
                <p>By Matt Haig</p>
                <Link>See More</Link>
            </div>

            <div className="book">
                <img src={book2} alt="Fahrenheit 451"/>
                <h3>Fahrenheit 451</h3>
                <p>By Ray D Bradbury</p>
                <Link>See More</Link>
            </div>

            <div className="book">
                <img src={book3} alt="Brave New World"/>
                <h3>Brave New World</h3>
                <p>By Aldous Huxley</p>
                <Link>See More</Link>
            </div>

            <div className="book">
                <img src={book4} alt="House of Sky and Breath"/>
                <h3>House of Sky and Breath</h3>
                <p>By Sarah J Maas</p>
                <Link>See More</Link>
            </div>
        </div>
    )
}

export default HomeCategoryList;
