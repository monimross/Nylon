import React, { useState } from "react";
import nookies from "nookies";
import { ProductApi } from "../../../api/main/product";
import Empty from "../../../components/empty-data";
import ProductSection from "../../../components/products/section";
import { useTranslation } from "react-i18next";
import axiosService from "../../../services/axios";
import { images } from "../../../constants/images";
import SEO from "../../../components/seo";
import LookCard from "../../../components/looks/card";
import { BannerApi } from "../../../api/main/banner";

const LookProduct = ({ lookProduct, setLoader, query }) => {
  const { t: tl } = useTranslation();
  const [lookProductList, setLookProductList] = useState(
    lookProduct.data || null
  );
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(lookProduct.meta?.total);

  const getLookProduct = (perPage = 12, page = 1) => {
    BannerApi.get({ perPage, page, shop_id: query.id, type: "look" })
      .then((response) => {
        setTotal(response.meta.total);
        setLookProductList([...lookProductList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        setLookProductList([]);
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getLookProduct(12, page);
    setPage(page + 1);
  };

  return (
    <>
      <SEO />
      <div className="all-products">
        <ProductSection
          icon={false}
          filter={false}
          title="All Looks"
          sort={false}
          isLoading={lookProductList}
        >
          {lookProductList &&
            lookProductList.map((product) => (
              <LookCard key={product.uuid} product={product} />
            ))}
          {lookProductList?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the sale products"
            />
          )}
        </ProductSection>
        {total > lookProductList?.length && (
          <div onClick={() => handlePaginate(page)} className="see-more">
            {tl("Load more")}
          </div>
        )}
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const language_locale = cookies?.language_locale;
  const resProduct = await axiosService.get(`/api/v1/rest/banners/paginate`, {
    params: {
      perPage: 12,
      page: 1,
      shop_id: query.id,
      lang: language_locale,
      type: "look",
    },
  });

  let lookProduct = resProduct.data;
  return { props: { lookProduct, query } };
}
export default LookProduct;
