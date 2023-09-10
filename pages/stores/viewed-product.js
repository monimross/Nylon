import React from "react";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../components/seo";
import { ProductApi } from "../../api/main/product";
import { updateViwed } from "../../redux/slices/viewed-product";
import { useEffect } from "react";

const ViewedProduct = () => {
  const dispatch = useDispatch();
  const viewedProduct = useSelector(
    (state) => state.viewedProduct.viewedProductList
  );
  const productViewedIds = viewedProduct?.map((data) => data.id);

  const checkViewedProduct = () => {
    if (productViewedIds.length)
      ProductApi.checkIds({ products: productViewedIds })
        .then((res) => {
          dispatch(updateViwed(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    checkViewedProduct();
  }, []);
  return (
    <>
      <SEO />
      <div className="viewed-product">
        <ProductSection
          filter={false}
          title="Viewed products"
          isEmpty={viewedProduct.length}
        >
          {viewedProduct?.map((product) => (
            <ProductCard key={product.uuid} product={product} />
          ))}
        </ProductSection>
      </div>
    </>
  );
};

export default ViewedProduct;
