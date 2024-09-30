import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {CategoryItem} from "../types";
import {DOMAIN_URL} from "../global";
import axios from 'axios';

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

export const SelectedCategory = createContext<[string, Dispatch<SetStateAction<string>>]>(['', () => {}]);

interface Props {
    children: ReactNode;
}

function CategoryContext ({ children }: Props)  {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://${DOMAIN_URL}/NidhiBookstoreReactTransact/api/categories`)
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;