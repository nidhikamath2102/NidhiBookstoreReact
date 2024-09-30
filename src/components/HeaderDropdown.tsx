import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category, SelectedCategory} from "../contexts/CategoryContext";


function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
    const [selectedCategory, setSelectedCategory] = useContext(SelectedCategory);

    const onClickCategory = (catName: string) => {
        setSelectedCategory(catName);
    };
  return (

      <div className="header-dropdown">
          <button className="dropbtn">
              <p>Categories</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                  <path d="M7.5 10L15 0H0L7.5 10Z" fill="#461220"/>
              </svg>
          </button>
          <ul>
              {categories.map((item) => (
                  <Link key={item.categoryId} to={`/categories/${item.name}`} onClick={() => onClickCategory(item.name)}>
                      <li>{item.name}</li>
                  </Link>
              ))}
          </ul>
      </div>

  )
}

export default HeaderDropdown

