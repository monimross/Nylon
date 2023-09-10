import React, { useState } from "react";
import nookies from "nookies";
import { BrandApi } from "../../../api/main/brand";
import BrandCard from "../../../components/brands/card";
import Empty from "../../../components/empty-data";
import ProductSection from "../../../components/products/section";
import { images } from "../../../constants/images";
import axiosService from "../../../services/axios";
import { useTranslation } from "react-i18next";
import SEO from "../../../components/seo";

const AllBrand = ({ setLoader, data }) => {
  const { t: tl } = useTranslation();
  const [brandList, setBrandList] = useState(data.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(data.meta.total);
  const getBrand = (perPage = 12, page = 1, sort = "asc") => {
    BrandApi.get({ perPage, page, sort })
      .then((response) => {
        setTotal(response.meta.total);
        setBrandList([...brandList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getBrand(12, page);
    setPage(page + 1);
  };
  const handleSort = (sort) => {
    setLoader(true);
    BrandApi.get({ perPage: 12, page: 1, sort })
      .then((response) => {
        setLoader(false);
        setBrandList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <SEO />
      <div className="all-brand">
        <ProductSection
          handleSort={handleSort}
          total={total}
          title="All Brands"
          sort={brandList?.length ? true : false}
          isLoading={brandList}
          isEmpty={brandList?.length}
        >
          {brandList?.map((brand, key) => {
            return <BrandCard key={key} brand={brand} />;
          })}
        </ProductSection>
        {total / 12 >= page && (
          <div onClick={() => handlePaginate(page)} className="see-more">
            {tl("Load more")}
          </div>
        )}
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const res = await axiosService.get("/api/v1/rest/brands/paginate", {
    params: {
      perPage: 12,
      page: 1,
      language_id,
      lang: language_locale,
    },
  });
  const data = await res.data;
  return { props: { data } };
}

export default AllBrand;
