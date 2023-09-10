import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  shops: [],
  showData: [],
  coupon: {},
  isDeliverymanRate: false,
};

const orderProduct = createSlice({
  name: "order",
  initialState,
  reducers: {
    addDataToOrder(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    addToOrderAddress(state, action) {
      state.shops.forEach((item) => {
        item.delivery_address_id = action.payload.delivery_address_id;
      });
    },
    addToOrder(state, action) {
      const index = state.shops.findIndex(
        (item) => item.shop_id === action.payload.shop_id
      );
      if (index >= 0) {
        state.shops[index] = { ...state.shops[index], ...action.payload };
      } else {
        state.shops.push(action.payload);
      }
    },
    addPointDelivery(state, action) {
      const index = state.shops.findIndex(
        (item) => item.shop_id === action.payload.shop_id
      );
      if (index >= 0) {
        state.shops[index] = { ...state.shops[index], ...action.payload };
      } else {
        state.shops.push(action.payload);
      }
    },
    removeDeliveryDate(state, action) {
      const index = state.shops.findIndex(
        (item) => item.shop_id === action.payload
      );
      if (index >= 0) {
        state.shops[index].delivery_date = null;
      }
    },
    addNote(state, action) {
      state.data.note = action.payload;
    },
    addCoupon(state, action) {
      state.coupon = action.payload;
    },
    addUserAddressId(state, action) {
      state.data = {
        ...state.data,
        user_address_id: action.payload.id,
      };
    },
    addCountryPrice(state, action) {
      state.data = {
        ...state.data,
        country_price: action.payload.price || 0,
      };
    },
    addShowData(state, action) {
      const index = state.showData.findIndex(
        (item) => item.shop_id === action.payload.shop_id
      );
      if (index >= 0) {
        state.showData[index] = action.payload;
      } else {
        state.showData.push(action.payload);
      }
    },
    clearOrder(state, action) {
      state.data = {};
      state.shops = [];
      state.showData = [];
      state.coupon = {};
    },
    handleDeliverymanRate(state, action) {
      state.isDeliverymanRate = action.payload;
    },
  },
});

export const {
  addToOrder,
  addShowData,
  addDataToOrder,
  clearOrder,
  addToOrderAddress,
  addNote,
  addCoupon,
  removeDeliveryDate,
  addUserAddressId,
  addCountryPrice,
  handleDeliverymanRate,
  addPointDelivery,
} = orderProduct.actions;

export default orderProduct.reducer;
