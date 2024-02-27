import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {categoryList} from '../types';
import { Link } from 'react-router-dom';


function HeaderDropdown() {
  return (

      <div className="header-dropdown">
          <button className="dropbtn">
              <p>Categories</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                  <path d="M7.5 10L15 0H0L7.5 10Z" fill="#461220"/>
              </svg>
          </button>
          <ul>
              {categoryList.map((item) => (
                  <li key={item.categoryId}>
                      <Link to={`/categories/${encodeURIComponent(item.name.toLowerCase())}`}>
                          {item.name}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>

  )
}

export default HeaderDropdown

