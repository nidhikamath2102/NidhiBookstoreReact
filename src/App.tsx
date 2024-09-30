import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CategoryContext, {SelectedCategory} from "./contexts/CategoryContext";
import {useContext, useState} from "react";
import Confirmation from "./components/Confirmation";

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
  return (
      <SelectedCategory.Provider value={[selectedCategory, setSelectedCategory]}>
      <Router basename={"NidhiBookstoreReactTransact"}>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBookList/>}>
                <Route path=":catId" element={<CategoryBookList/>} />
            </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <AppFooter />
      </Router>
      </SelectedCategory.Provider>
  );
}

export default App;

