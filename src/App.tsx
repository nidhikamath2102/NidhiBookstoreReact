import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"


function App() {
  return (
      <Router basename={"NidhiBookstoreReact"}>
        <AppHeader  pageName={""}/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBookList />} />
            <Route path="/categories/:categories" element={<CategoryBookList />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <AppFooter />
      </Router>
  );
}

export default App;

