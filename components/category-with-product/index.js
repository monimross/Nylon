import React, { useCallback, useRef } from "react";
import ProductSection from "../products/section";
import ProductCard from "../products/card";
import { CategoryWithProductApi } from "../../api/main/category-with-product";
import { useState } from "react";
import { useEffect } from "react";
import ProductLoader from "../loader/product";
import QueryString from "qs";
import { useRouter } from "next/router";

const CategoryWithProduct = () => {
  const router = useRouter();
  const observer = useRef();

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1 });
  const [loader, setLoader] = useState(false);

  const { current_page, last_page } = meta;

  const getDiscountProduct = (perPage = 4, page = 1) => {
    setLoader(true);
    CategoryWithProductApi.get({ perPage, page })
      .then(({ data, meta }) => {
        setMeta(meta);
        setProducts((prevState) => [...prevState, ...data]);
      })
      .catch((error) => {
        console.error(error);
        setProducts([]);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (current_page) getDiscountProduct(3, current_page);
  }, [current_page]);

  const hasMore = Boolean(last_page > current_page);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMeta((prev) => ({
            ...prev,
            current_page: prev.current_page + 1,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, hasMore]
  );

  const handleChildLink = (p_id, id) => {
    const str = QueryString.stringify({
      categoryIds: [id],
    });

    if (p_id && id) return `/all-product?parent_category_id=${p_id}&${str}`;
    else return;
  };

  return (
    <React.Fragment>
      {products.map((item) => {
        const { products } = item;
        return (
          <ProductSection
            title={item.translation?.title}
            href={handleChildLink(
              products?.[0]?.category?.parent_id,
              products?.[0]?.category?.id
            )}
            isLoading={true}
            isEmpty={products || false}
          >
            {item.products?.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </ProductSection>
        );
      })}
      {loader && (
        <ProductSection>
          <div className="section-content">
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
          </div>
        </ProductSection>
      )}
      <div ref={lastBookElementRef} />
    </React.Fragment>
  );
};

export default CategoryWithProduct;
