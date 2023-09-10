import React, { useEffect, useState } from "react";
import GoogleMap from "../../components/map";
import StoresCard from "../../components/stores/card";
import { ShopApi } from "../../api/main/shops";
import Empty from "../../components/empty-data";
import { images } from "../../constants/images";
import StoreLoader from "../../components/loader/store";
import SEO from "../../components/seo";
import { parseCookies } from "nookies";

const ViewMap = ({ setLoader }) => {
  const [store, setStore] = useState();
  const [stores, setStores] = useState(null);

  const handleClick = (store) => {
    setStore(store);
  };
  const getNearbyShops = async () => {
    setLoader(true);
    ShopApi.getNearby({
      clientLocation:
        parseCookies()?.userLocation || process.env.DEFAULT_LOCATION,
    })
      .then((res) => {
        setStores(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  useEffect(() => {
    getNearbyShops();
  }, []);

  return (
    <>
      <SEO />
      <div className="view-map">
        {stores?.length === 0 ? (
          <Empty
            image={images.ViewedProduct}
            text1="There are no items in the near by store"
            text2="To select items, go to the stores"
          />
        ) : (
          <>
            <div className="store-list">
              {!stores && (
                <>
                  <StoreLoader />
                  <StoreLoader />
                </>
              )}
              {stores?.map((store, key) => (
                <StoresCard
                  handleClick={handleClick}
                  noLink={true}
                  key={key}
                  store={store}
                />
              ))}
            </div>
            <div className="google-map">
              <GoogleMap store={store} stores={stores} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewMap;
