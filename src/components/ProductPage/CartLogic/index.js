 export default function cartReducer(cartItems, action) {
  switch(action.type) {
    case "added": { 
      function addToCart() {
        let duplicate = false
         const cartItem = {
          title: action.title,
          imageSrc: action.imageSrc,
          price: action.price,
          qty: action.qty,
        }

        if (action.cart) return action.cart // filling cart from database

        if (cartItems.length === 0) {
          return [...cartItems, cartItem]

        } else {
          let newCart
          [...cartItems].forEach((item, index) => {
            if (item.title === action.title) {
              duplicate = true
      
              // update the cart item by increasing its qty
              const newItem = {
                title: item.title,
                imageSrc: item.imageSrc,
                price: item.price,
                qty: parseInt(item.qty) + parseInt(action.qtyInput.value === "" ?
                                            1 :
                                          action.qtyInput.value),
              }
              newCart = [...cartItems].with(index, newItem)
            }
          })

          if (duplicate === false) {
            newCart = [...cartItems, cartItem]
          }
          return newCart
        }
      }

      return addToCart()
    }

    case "removed": {
      // eslint-disable-next-line array-callback-return
      const filteredCart = action.cart.filter(item => {
        if (item.title !== action.title) return item
      })
      return filteredCart;
    }

    case "decreased_qty": {
      return action.cart
    }

    case "increased_qty": {
      return action.cart
    }

    default:
      throw Error('Unknown action: ' + action.type);
  }
}