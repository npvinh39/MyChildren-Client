import React from 'react';

export const GlobalStateContext = React.createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState([]);
    const [category, setCategory] = React.useState(null);
    const initialState = {
        products: [products, setProducts],
        cart: [cart, setCart],
        cartOpen: false,
        category: [category, setCategory],
        currentCategory: "",
    };

    return <GlobalStateContext.Provider value={initialState}>{children}</GlobalStateContext.Provider>;
}
