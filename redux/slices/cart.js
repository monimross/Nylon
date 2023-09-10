import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  orderedData: [],
  data: {
    product_total: 0,
    tax: 0,
    order_tax: 0,
    order_total: 0,
  },
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToOrdered(state, action) {
      state.orderedData = action.payload;
    },
    setOrderData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    addToCart(state, action) {
      const stockIndex = state.cartItems.findIndex(
        (item) => item.stockId.id === action.payload.stockId.id
      );
      if (stockIndex >= 0) {
        state.cartItems[stockIndex] = {
          ...state.cartItems[stockIndex],
          qty: state.cartItems[stockIndex].qty + 1,
        };
      } else {
        let tempProductItem = {
          ...action.payload,
          qty: action.payload.min_qty,
        };
        state.cartItems.push(tempProductItem);
      }
    },
    replaceStock(state, action) {
      const { payload } = action;
      state.cartItems = payload.map((item) => {
        const stock = state.cartItems.find((el) => el.id === item.id);
        return {
          ...stock,
          qty: item.quantity,
          stockId: {
            ...stock.stockId,
            quantity: item.quantity,
          },
        };
      });
    },
    replacePrice(state, action) {
      const { payload } = action;
      state.cartItems = payload.map((item) => {
        const stock = state.cartItems.find((el) => el.id === item.id);
        return {
          ...stock,
          discount: item.discount || 0,
          stockId: {
            ...stock.stockId,
            discount: item.discount || 0,
          },
        };
      });
    },
    decreaseCart(state, action) {
      const stockIndex = state.cartItems.findIndex(
        (item) => item.stockId.id === action.payload.stockId.id
      );

      if (state.cartItems[stockIndex].qty > action.payload.min_qty) {
        state.cartItems[stockIndex].qty -= 1;
      } else if (state.cartItems[stockIndex].qty === action.payload.min_qty) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.stockId.id !== action.payload.stockId.id
        );
        state.cartItems = nextCartItems;
      }
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.stockId.id === action.payload.stockId.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.stockId.id !== action.payload.stockId.id
          );
          state.cartItems = nextCartItems;
        }
        return state;
      });
    },
    getTotals(state, action) {
      calculatePrice(state);
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { stockId, qty } = cartItem;
          let itemTotal = 0;
          if (stockId.discount) {
            itemTotal = (stockId.price - stockId.discount) * qty;
          } else {
            itemTotal = stockId.price * qty;
          }
          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.orderedData = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      state.data = {
        user: "",
        address: "",
        currency: "",
        deliveries: [],
        product_total: 0,
        tax: 0,
        order_tax: 0,
        order_total: 0,
      };
    },
    clearOrderShops(state) {
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      state.orderedData = [];
      state.data = {
        user: "",
        address: "",
        currency: "",
        deliveries: [],
        product_total: 0,
        tax: 0,
        order_tax: 0,
        order_total: 0,
      };
    },
  },
});

function calculatePrice(state) {
  let items = [];
  state.cartItems.forEach((item) => {
    let total_price;
    let productTax;
    let shopTax;
    if (item.stockId.discount) {
      total_price = (item.stockId.price - item.stockId.discount) * item.qty;
    } else {
      total_price = item.stockId.price * item.qty;
    }
    if (item.prevTax == null) item.prevTax = item.tax;
    productTax = (total_price * item.prevTax) / 100;
    shopTax = (total_price * item.shop.tax) / 100;
    item.tax = productTax;
    item.total_price = total_price + productTax;
    item.shop_tax = shopTax;
    const newItem = {
      ...item,
      productTax,
    };
    items.push(newItem);
  });

  state.cartItems = items;
}

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  addToOrdered,
  clearOrderShops,
  setOrderData,
  calculateProduct,
  replaceStock,
  replacePrice,
} = cartSlice.actions;

export default cartSlice.reducer;
