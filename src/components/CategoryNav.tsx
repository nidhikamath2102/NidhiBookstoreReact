import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import { categoryList } from '../types';
import React, {useState} from "react";
import {Link} from 'react-router-dom';

function CategoryNav() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(categoryList[0].categoryId);

  const handleButtonClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
  };

  return (
  <nav className="category-nav">
    <ul className="category-buttons">

      {categoryList.map((category) => (

          <li key={category.categoryId}
              className={
            category.categoryId === selectedCategoryId
                    ? 'button selected-category-button'
                    : 'button unselected-category-button'
              }
              onClick={() => handleButtonClick(category.categoryId)}>
            <Link to={`/categories/${encodeURIComponent(category.name.toLowerCase())}`} className="category-link">
              {category.name}
            </Link>
          </li>
      ))}
    </ul>
  </nav>
  )
}

export default CategoryNav;

