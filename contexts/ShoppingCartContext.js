import React, { useEffect, useState } from "react"

export const ShoppingCartContext = React.createContext()

const ShoppingCartContextProvider = ({children}) => {
    const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem('shoppingCart')) || [])
    useEffect(()=>{
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    }, [shoppingCart])
    return(
        <ShoppingCartContext.Provider value={{shoppingCart, setShoppingCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider
