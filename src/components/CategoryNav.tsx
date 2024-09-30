import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import { Link, NavLink } from "react-router-dom";
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category, SelectedCategory} from "../contexts/CategoryContext";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const [selectedCategory, setSelectedCategory] = useContext(SelectedCategory);
    const onClickCategory = (catName: string) => {
        setSelectedCategory(catName);
    };
  return (
      <nav className="category-nav">
        <ul className="category-buttons">
          {categories.map((category) => (
              // <Link to={`/categories/${category.name}`} className="category-link">
                <li key={category.categoryId} className="category-link">
                  <NavLink to={`/categories/${category.name}`} className={({ isActive }) =>
                      isActive ? "selected-category-button" : "unselected-category-button"
                  }  onClick={() => onClickCategory(category.name)}>
                    {category.name}
                  </NavLink>
                </li>
              // </Link>
          ))}
        </ul>
      </nav>
  )
}

export default CategoryNav;

