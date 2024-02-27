import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) { 

    // it returns a new state where the products property is updated by adding a new array of products to it
    case UPDATE_PRODUCTS:
      return {
        ...state, // this is spreading the existing state into the new state
        products: [...action.products], // this is spreading the products array from the action into the new state
      };

    // it returns a new state where the cart property is updated by adding a new product to it
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true, // this is setting the cartOpen property to true
        cart: [...state.cart, action.product], // this is adding the product to the cart
      };

    // it returns a new state where the cart property is updated by adding multiple products to it
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products], // this is adding the products to the cart
      };

    // it returns a new state where the cart property is updated by updating the purchaseQuantity of a product
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => { // this is mapping over the cart array
          if (action._id === product._id) { 
            product.purchaseQuantity = action.purchaseQuantity; // this is updating the purchaseQuantity of the product
          } 
          return product;
        }),
      };

    // it returns a new state where the cart property is updated by removing a product from it
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => { // this is filtering the cart array
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    
    // if the action.type doesn't match any of the cases, it returns the state as is
    default:
      return state;
  }
};
