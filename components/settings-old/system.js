import React, { useContext, useEffect, useState } from "react";
import CustomSelect from "../form/custom-select";
import RadioButtonFillIcon from "remixicon-react/RadioButtonFillIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import { setCookie, parseCookies } from "nookies";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import i18n from "../../services/i18next";
import informationService from "../../services/informationService";
import { UserApi } from "../../api/main/user";
import { savedUser } from "../../redux/slices/user";
import { batch, useDispatch } from "react-redux";
import { clearCart, clearOrderShops } from "../../redux/slices/cart";
import { setCurrency } from "../../utils/setCurrency";
import { setLanguage } from "../../utils/setLanguage";
import { useRouter } from "next/router";
import { clearViewedList } from "../../redux/slices/viewed-product";
import { getCategory } from "../../redux/slices/category";
const System = ({ setLoader }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const router = useRouter();
  const { theme, setTheme, currency, language, getNotification } =
    useContext(MainContext);

  const [defaultCurrency, setDefaultCurrency] = useState({});
  const [defaultLanguage, setDefaultLanguage] = useState({});

  const currencyList = () => {
    const array = [];
    currency.forEach((element) => {
      array.push({
        id: element.id,
        value: `${element.title} - (${element.symbol})`,
        ...element,
      });
    });
    return array;
  };
  const languageList = () => {
    const array = [];
    language.forEach((element) => {
      array.push({
        id: element.id,
        value: element.title,
        img: element.img,
        ...element,
      });
    });
    return array;
  };
  const handleClick = (key) => {
    if (key === "auto") {
      setTheme(key);
      setCookie(null, "theme", "light");
    } else {
      setTheme(key);
      setCookie(null, "theme", key);
    }
  };
  const handleCurrency = (e) => {
    if (cookies.access_token)
      UserApi.get({ currency_id: e.id })
        .then((res) => {
          dispatch(savedUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        });

    setCurrency(e);
    setDefaultCurrency(e.id);
    dispatch(clearCart());
    dispatch(clearOrderShops());
  };

  const handleLanguae = (e) => {
    const body = document.getElementsByTagName("body");
    setLoader(true);
    const { locale } = e;
    setDefaultLanguage(e.id);
    setLanguage(e);
    if (e.backward) {
      body[0].setAttribute("dir", "rtl");
      setCookie(null, "dir", "rtl");
    } else {
      body[0].setAttribute("dir", "ltr");
      setCookie(null, "dir", "ltr");
    }

    informationService
      .translations({ lang: locale })
      .then(({ data }) => {
        i18n.addResourceBundle(locale, "translation", data.data);
        i18n.changeLanguage(locale);
      })
      .finally(() => {
        setLoader(false);
        router.push("/");
      });
    batch(() => {
      dispatch(getCategory());
      dispatch(clearViewedList());
    });
    getNotification();
  };
  useEffect(() => {
    setDefaultCurrency(cookies.currency_id);
    setDefaultLanguage(cookies.language_id);
  }, []);

  return (
    <div className="system">
      <div className="title">{tl("Others")}</div>
      <CustomSelect
        label="Language"
        placeholder="Select language"
        options={languageList()}
        onChange={(e) => {
          handleLanguae(e);
        }}
        value={defaultLanguage}
      />
      <CustomSelect
        label="Currencies"
        placeholder="Select currency"
        options={currencyList()}
        onChange={(e) => {
          handleCurrency(e);
        }}
        value={defaultCurrency}
      />
      <div className="theme-item-wrapper">
        <div className="theme-items">
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("light")}
          >
            <div className="theme-card light">
              <div className="line">
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "light" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Light")}</span>
              </div>
            </div>
          </div>
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("dark")}
          >
            <div className="theme-card dark">
              <div className="line">
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "dark" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Dark")}</span>
              </div>
            </div>
          </div>
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("auto")}
          >
            <div className="theme-card auto">
              <div className="light">
                <div className="line">
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
              </div>
              <div className="dark">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "auto" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Auto")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;
