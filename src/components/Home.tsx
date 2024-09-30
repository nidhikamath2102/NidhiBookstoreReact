
import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import Hero from '../assets/images/site/hero_image.png';
import {Link} from "react-router-dom";



function Home() {
    return (
        <div className="content">
            <div className="hero">
                <img src={Hero} alt="banner" className="hero_img"/>
                <div className="overlay">
                    <div className="hero-text">
                        <p>Discover Your Next Favorite Read</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"
                             version="1.1">
                            <path
                                d="M 19 5.500 C 19 5.775, 19.225 6, 19.500 6 C 19.775 6, 20 5.775, 20 5.500 C 20 5.225, 19.775 5, 19.500 5 C 19.225 5, 19 5.225, 19 5.500 M 30 5.500 C 30 5.775, 30.225 6, 30.500 6 C 30.775 6, 31 5.775, 31 5.500 C 31 5.225, 30.775 5, 30.500 5 C 30.225 5, 30 5.225, 30 5.500 M 6 43.500 C 6 43.775, 6.225 44, 6.500 44 C 6.775 44, 7 43.775, 7 43.500 C 7 43.225, 6.775 43, 6.500 43 C 6.225 43, 6 43.225, 6 43.500 M 43 43.500 C 43 43.775, 43.225 44, 43.500 44 C 43.775 44, 44 43.775, 44 43.500 C 44 43.225, 43.775 43, 43.500 43 C 43.225 43, 43 43.225, 43 43.500"
                                stroke="none" fill="#f8e4e4" fillRule="evenodd"/>
                            <path
                                d="M 6 6 C 6 7.333, 5.333 8, 4 8 C 2.077 8, 2 8.667, 2 25.428 L 2 42.856 7.750 43.512 C 10.913 43.873, 16.087 44.865, 19.250 45.716 C 24.439 47.113, 25.561 47.113, 30.750 45.716 C 33.913 44.865, 39.087 43.873, 42.250 43.512 L 48 42.856 48 25.428 C 48 8.667, 47.923 8, 46 8 C 44.667 8, 44 7.333, 44 6 C 44 4.326, 43.333 4, 39.904 4 C 37.651 4, 33.376 4.707, 30.404 5.571 C 25.492 6.999, 24.508 6.999, 19.596 5.571 C 16.624 4.707, 12.349 4, 10.096 4 C 6.667 4, 6 4.326, 6 6 M 8 21.860 L 8 37 10.750 37.012 C 12.262 37.018, 15.863 37.653, 18.750 38.421 L 24 39.819 24 24.885 L 24 9.950 21.250 8.890 C 19.738 8.307, 16.138 7.580, 13.250 7.275 L 8 6.720 8 21.860 M 30.500 8.358 L 26.500 9.562 26.224 24.697 L 25.949 39.832 31.224 38.428 C 34.126 37.656, 37.737 37.018, 39.250 37.012 L 42 37 42 22 L 42 7 38.250 7.077 C 36.188 7.119, 32.700 7.696, 30.500 8.358"
                                stroke="none" fill="#f4e4e4" fillRule="evenodd"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="welcome">
                <div className="welcome-left-section">
                    <div className="row-buy">Buy & Read</div>
                    <div className="row-buy">Books</div>
                    <div className="shop-now-button">
                        <Link to="/categories/sci-fi">
                            <button className="button-cta">Shop for Books</button>
                        </Link>
                    </div>
                    <div className="row-or">or</div>
                    <button className="button-subscribe">Subscribe Now</button>
                    <div className="row-offer">And save up to 50%</div>
                </div>
                <div className="welcome-right-section">
                    <h2>Today’s Top 4 Featured Science Fiction Books</h2>
                    <HomeCategoryList/>
                </div>
            </div>
        </div>
    )
}

export default Home;
