import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import nookies, { parseCookies } from "nookies";
import { ProductApi } from "../../api/main/product";
import ProductCard from "../../components/products/card";
import HorizontalCard from "../../components/products/horizontal";
import ProductSection from "../../components/products/section";
import { MainContext } from "../../utils/contexts/MainContext";
import axiosService from "../../services/axios";
import SEO from "../../components/seo";
import { useDispatch } from "react-redux";
import { fetchFilter } from "../../redux/slices/filter";
import { fetchExtras } from "../../redux/slices/extras";
import ProductLoader from "../../components/loader/product";
import ErrorBoundary from "../../components/error/error";

const AllProduct = ({ products, query, error }) => {
  const dispatch = useDispatch();
  const observer = useRef();
  const { layout } = useContext(MainContext);
  const [List, setList] = useState(products.data || []);
  const [meta, setMeta] = useState(products.meta);
  const [loader, setLoader] = useState(false);

  const { user_address_id } = parseCookies() || {};
  const { current_page, last_page, total } = meta || {};
  useEffect(() => {
    setList(products.data || []);
    setMeta(products.meta);
  }, [query.id, products.data]);

  useEffect(() => {
    dispatch(
      fetchFilter({
        parent_category_id: query.parent_category_id,
        user_address_id,
      })
    );
  }, [query.parent_category_id]);

  useEffect(() => {
    dispatch(fetchExtras({ user_address_id }));
  }, []);

  const getProduct = (perPage = 12, page = 1) => {
    setLoader(true);
    ProductApi.get({ ...query, perPage, page, user_address_id })
      .then((res) => {
        setMeta(res.meta);
        setList((prev) => [...new Set([...prev, ...res.data])]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (current_page >= 2) getProduct(12, current_page);
  }, [current_page]);

  const hasMore = Boolean(last_page > current_page);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMeta((prev) => ({ ...prev, current_page: prev.current_page + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, hasMore]
  );

  return (
    <>
      <SEO />
      <ErrorBoundary error={error}>
        <div className="discount-product filtered-products">
          <ProductSection
            icon={false}
            title="All Product"
            sort={true}
            total={total}
            filter={true}
            isLoading={List}
            isEmpty={List?.length}
          >
            {List?.map((product) =>
              layout === "vertical" ? (
                <ProductCard key={product.uuid} product={product} />
              ) : (
                <HorizontalCard key={product.uuid} product={product} />
              )
            )}
            {loader && <ProductLoader />}
            <div ref={lastBookElementRef} />
          </ProductSection>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const { user_address_id, currency_id, language_id, language_locale } =
    cookies || {};

  const params = {
    perPage: 12,
    page: 1,
    currency_id,
    language_id,
    lang: language_locale,
    user_address_id,
    ...query,
  };

  try {
    const resProduct = await axiosService.get(
      `/api/v1/rest/products/paginate`,
      {
        params,
      }
    );
    const products = await resProduct.data;
    return {
      props: {
        products,
        error: null,
        query,
      },
    };
  } catch (error) {
    return {
      props: {
        products: {},
        error: error.response.data,
        query,
      },
    };
  }
}
export default AllProduct;
