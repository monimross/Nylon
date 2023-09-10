import { useState, createContext, useEffect } from "react";
export const MainContext = createContext();
import { parseCookies } from "nookies";
import { getCurrency, getLanguage } from "../../api/main/default-settings";
import { BrandApi } from "../../api/main/brand";
import { batch, useDispatch } from "react-redux";
import { BlogApi } from "../../api/main/blog";
import {
  addToViewed,
  markAllList,
} from "../../redux/slices/viewed-notification";
import { UserApi } from "../../api/main/user";
import { savedUser } from "../../redux/slices/user";
import serviceWithOutToken from "../../services/auth";
import { getSettings } from "../../redux/slices/settings";
import { fetchNotificationStats } from "../../redux/slices/notification";
const MainContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const cookies = parseCookies();
  const [theme, setTheme] = useState(cookies.theme ? cookies.theme : "light");
  const [currentCategory, setCurrentCategory] = useState("");
  const [isOpen, setIsOpen] = useState(null);
  const [open, setOpen] = useState(null);
  const [price_to, setPriceTo] = useState(null);
  const [price_from, setPriceFrom] = useState(null);
  const [category_id, setCategoryId] = useState(null);
  const [sort, setSort] = useState("asc");
  const [content, setContent] = useState(null);
  const [layout, setLayout] = useState("vertical");
  const [shop, setShop] = useState({});
  const [priceLoader, setPriceLoader] = useState(false);
  const [address, setAddress] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [language, setLanguage] = useState([]);
  const [brandList, setBrandList] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(null);
  const [notificationList, setNotificationList] = useState([]);
  const [drawerTitle, setDrawerTitle] = useState("Drawer title");
  const [lookId, setLookId] = useState(null);
  const [checkoutAddress, setCheckoutAddress] = useState(null);
  const [findexAddress, setFindexAddress] = useState(false);

  const handleDrawer = (key) => {
    setIsOpen(key);
    setOpen(true);
    setContent(null);
  };
  const getBrand = (shop_id, perPage = 1000, page = 1) => {
    BrandApi.get({ perPage, page, shop_id })
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getNotification = () => {
    BlogApi.get({ type: "notification", perPage: 5 })
      .then((res) => {
        setNotificationList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNotification = (value) => {
    dispatch(addToViewed(value));
  };
  const handleMarkAllNotification = (value) => {
    dispatch(markAllList(value));
  };
  const getUser = () => {
    UserApi.get()
      .then((res) => {
        batch(() => {
          dispatch(savedUser(res.data));
          dispatch(fetchNotificationStats());
        });
        setAddress(res.data.addresses);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTranslation = () => {
    serviceWithOutToken
      .get()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (currency.length <= 0) getCurrency(setCurrency);
    if (language.length <= 0) getLanguage(setLanguage);
    if (notificationList?.length <= 0) getNotification();
    if (cookies?.access_token) getUser();
    batch(() => {
      dispatch(getSettings());
    });
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const body = document.getElementsByTagName("body");
    body[0].setAttribute("data-theme", theme);
    body[0].setAttribute("dir", cookies.dir);
  }, [theme]);

  return (
    <MainContext.Provider
      value={{
        isOpen,
        setIsOpen,
        open,
        setOpen,
        handleDrawer,
        theme,
        setTheme,
        layout,
        setLayout,
        content,
        setContent,
        currentCategory,
        setCurrentCategory,
        price_to,
        setPriceTo,
        price_from,
        setPriceFrom,
        sort,
        setSort,
        category_id,
        setCategoryId,
        shop,
        setShop,
        priceLoader,
        setPriceLoader,
        address,
        setAddress,
        currency,
        setCurrency,
        language,
        setLanguage,
        brandList,
        setBrandList,
        getBrand,
        isOpenDropdown,
        setIsOpenDropdown,
        notificationList,
        handleNotification,
        handleMarkAllNotification,
        getUser,
        getTranslation,
        drawerTitle,
        setDrawerTitle,
        lookId,
        setLookId,
        getNotification,
        checkoutAddress,
        setCheckoutAddress,
        findexAddress,
        setFindexAddress,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
