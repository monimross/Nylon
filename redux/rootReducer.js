import cart from "./slices/cart";
import stores from "./slices/stores";
import banners from "./slices/banner";
import category from "./slices/category";
import savedProduct from "./slices/savedProduct";
import savedStore from "./slices/savedStore";
import viewedProduct from "./slices/viewed-product";
import notification from "./slices/viewed-notification";
import savedAddress from "./slices/savedAddress";
import user from "./slices/user";
import order from "./slices/order";
import chat from "./slices/chat";
import settings from "./slices/settings";
import filter from "./slices/filter";
import extras from "./slices/extras";
import notificationList from "./slices/notification";

const rootReducer = {
  notificationList,
  user,
  cart,
  stores,
  savedProduct,
  savedStore,
  viewedProduct,
  savedAddress,
  category,
  banners,
  order,
  notification,
  chat,
  settings,
  filter,
  extras,
};

export default rootReducer;
