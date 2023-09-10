import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import ProductCard from "../../../components/products/card";
import HorizontalCard from "../../../components/products/horizontal";
import ProductSection from "../../../components/products/section";
import { MainContext } from "../../../utils/contexts/MainContext";
import axiosService from "../../../services/axios";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SEO from "../../../components/seo";
import { BrandApi } from "../../../api/main/brand";
import { imgBaseUrl } from "../../../constants";

const BrandDetail = ({ setLoader, brand, products, id }) => {
  const { t: tl } = useTranslation();
  const { layout } = useContext(MainContext);
  const router = useRouter();
  const [productList, setProductList] = useState(products.data || null);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(products.meta.total);

  const getProduct = (perPage = 4, page = 2) => {
    BrandApi.getProducts(router.query.id, { perPage, page })
      .then((response) => {
        setTotal(response.meta.total);
        setProductList([...productList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        setProductList([]);
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getProduct(12, page);
    setPage(page + 1);
  };
  useEffect(() => {
    setProductList(products?.data);
    setTotal(products?.meta?.total);
  }, [id]);

  const findHTTPS = brand?.data?.img?.includes("https");
  return (
    <>
      <SEO title={brand?.data?.title} image={brand?.data?.img} />
      <div className="brand-header">
        <div className="current-brand">
          <div className="logo">
            {findHTTPS ? (
              <img src={brand?.data.img} alt="Avatar" />
            ) : brand?.data.img ? (
              <img src={imgBaseUrl + brand?.data.img} alt="Avatar" />
            ) : (
              <div className="square avatar">
                {brand?.data.title?.slice(0, 1)}
              </div>
            )}
          </div>
          <div className="name">{brand?.data?.title}</div>
        </div>
      </div>
      <div className="brand-detail">
        <ProductSection
          total={products?.meta.total}
          sort={true}
          isEmpty={productList?.length}
          isLoading={productList}
        >
          {layout === "vertical" &&
            productList.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          {layout === "horizontal" &&
            productList.map((product) => (
              <HorizontalCard key={product.uuid} product={product} />
            ))}
        </ProductSection>
        {total / 4 >= page && (
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
  const currency_id = cookies?.currency_id;
  const language_locale = cookies?.language_locale;

  const brandRes = await axiosService.get(`/api/v1/rest/brands/${query.id}`, {
    params: { lang: language_locale },
  });
  const productRes = await axiosService.get(
    `/api/v1/rest/products/brands/${query.id}`,
    {
      params: {
        perPage: 12,
        currency_id,
        lang: language_locale,
      },
    }
  );
  const brand = await brandRes.data;
  const products = await productRes.data;
  return { props: { brand, products, id: query.id } };
}
export default BrandDetail;
