import React from "react";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SEO from "../../components/seo";
import { ProductApi } from "../../api/main/product";
import { useEffect } from "react";
import { updateSaved } from "../../redux/slices/savedProduct";
const LikedProduct = () => {
  const dispatch = useDispatch();
  const savedProduct = useSelector(
    (state) => state.savedProduct.savedProductList,
    shallowEqual
  );
  const cratProductIds = [...new Set(savedProduct.map((item) => item.id))];

  const checkProduct = () => {
    ProductApi.checkIds({ products: cratProductIds }).then(({ data }) => {
      dispatch(updateSaved(data));
    });
  };

  useEffect(() => {
    checkProduct();
  }, []);

  return (
    <>
      <SEO />
      <div className="liked-product">
        <ProductSection
          filter={false}
          title="Liked product"
          sort={false}
          isEmpty={savedProduct?.length}
        >
          {savedProduct?.map((product) => (
            <ProductCard key={product.uuid} product={product} />
          ))}
        </ProductSection>
      </div>
    </>
  );
};

export default LikedProduct;
