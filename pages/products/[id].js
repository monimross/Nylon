import React, { useContext, useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import CustomDrawer from "../../components/drawer";
import ImgMagnify from "../../components/products/detail/img-magnify";
import ProductData from "../../components/products/detail/product-data";
import ProductRate from "../../components/products/detail/rate";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import StarSmileFillIcon from "remixicon-react/StarSmileFillIcon";
import Message2FillIcon from "remixicon-react/Message2FillIcon";
import { useTranslation } from "react-i18next";
import axiosService from "../../services/axios";
import { useSelector, useDispatch } from "react-redux";
import { addToSaved, removeFromSaved } from "../../redux/slices/savedProduct";
import ProductSection from "../../components/products/section";
import ProductCard from "../../components/products/card";
import { MainContext } from "../../utils/contexts/MainContext";
import { ProductApi } from "../../api/main/product";
import useWindowSize from "../../utils/hooks/useWindowSize";
import SEO from "../../components/seo";
import ErrorBoundary from "../../components/error/error";

const ProductDetail = ({ productData, error }) => {
  const windowSize = useWindowSize();
  const { t: tl } = useTranslation();
  const { user_address_id } = parseCookies();
  const { setDrawerTitle } = useContext(MainContext);
  const [open, setOpen] = useState(null);
  const [data, setData] = useState(productData);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [targetImgExtra, setTargetImgExtra] = useState([]);
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  const viewedProduct = useSelector(
    (state) => state.viewedProduct.viewedProductList
  );
  const isLiked = likedProducts.find((lp) => lp.id === data?.id);

  const getProduct = (uuid) => {
    ProductApi.getId(uuid)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const click = () => {
    setOpen(true);
    setDrawerTitle("Write a feedback");
  };

  const getRelatedProduct = () => {
    ProductApi.get({
      brand_id: productData?.brand_id,
      category_id: productData?.category_id,
      perPage: 3,
      user_address_id,
    })
      .then((res) => {
        setRelatedProduct(res.data);
      })
      .catch((error) => {
        setRelatedProduct([]);
        console.log(error);
      });
  };

  useEffect(() => {
    setData(productData);
  }, [productData.id]);

  useEffect(() => {
    getRelatedProduct();
  }, []);

  const targetImg = targetImgExtra.find(
    (item) => item?.group?.type === "image"
  );

  return (
    <>
      <SEO
        title={productData?.translation?.title}
        description={productData?.translation?.description}
        keywords={productData?.translation?.description}
        image={process.env.IMG_URL + "/public/images/" + productData?.img}
      />
      <ErrorBoundary error={error}>
        <div className="product-detail">
          <div className="detail-header">
            <div className="product-name">{data.translation?.title}</div>
            <div className="left">
              <div className="reviews">
                <StarSmileFillIcon size={18} color="#FFB800" />
                {`${data?.rating_avg ? data?.rating_avg?.toFixed(1) : 0} (${
                  data?.reviews_count ? data.reviews_count : 0
                } ${tl("reviews")})`}
              </div>
              {Boolean(data?.review) && (
                <div className="add-comment" onClick={click}>
                  <Message2FillIcon size={16} />
                  {tl("Add comment")}
                </div>
              )}
              {isLiked ? (
                <div
                  className="liked"
                  onClick={() => dispatch(removeFromSaved(data))}
                >
                  <Heart3FillIcon size={24} />
                </div>
              ) : (
                <div
                  className="liked"
                  onClick={() => dispatch(addToSaved(data))}
                >
                  <Heart3LineIcon size={24} />
                </div>
              )}
            </div>
          </div>
          <div className="detail-content">
            <div className="magnify-wrapper">
              <ImgMagnify targetImg={targetImg} galleries={data.galleries} />
              <div className="store-description">
                <div className="description">
                  <div className="title">{tl("Description")}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.translation?.description,
                    }}
                  />
                </div>
                <div className="information">
                  <div className="items">
                    <div className="title">{tl("Additional information")}</div>
                    {data.properties?.map((item, key) => (
                      <div
                        key={key}
                        className={
                          item?.value?.length > 28 ? "item column" : "item"
                        }
                      >
                        <div className="key">{item.key}</div>
                        <div className="value link">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {windowSize.width > 768 && (
                <>
                  <ProductSection
                    title="Releted products"
                    isLoading={relatedProduct}
                    isEmpty={relatedProduct?.length}
                  >
                    {relatedProduct
                      ?.filter((item) => item.id !== productData.id)
                      .map((product) => (
                        <ProductCard key={product.uuid} product={product} />
                      ))}
                  </ProductSection>
                  <ProductSection
                    title="Viewed products"
                    href="/stores/viewed-product"
                    isEmpty={viewedProduct.length}
                  >
                    {viewedProduct?.slice(0, 3).map((product) => (
                      <ProductCard key={product.uuid} product={product} />
                    ))}
                  </ProductSection>
                </>
              )}
            </div>
            <div className="product-data-wrapper">
              <ProductData
                product={data}
                setOpen={setOpen}
                setTargetImgExtra={setTargetImgExtra}
                properties={data.properties}
                description={data.translation?.description}
              />
            </div>
          </div>
          <CustomDrawer open={open} setOpen={setOpen}>
            <ProductRate
              getProduct={getProduct}
              setOpen={setOpen}
              uuid={data.uuid}
            />
          </CustomDrawer>
        </div>
      </ErrorBoundary>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const currency_id = cookies?.currency_id;
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  let res = {};
  const params = { currency_id, language_id, lang: language_locale };

  try {
    if (cookies?.access_token) {
      res = await axiosService.get(`/api/v1/rest/products/${query.id}`, {
        headers: {
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${decodeURI(cookies?.access_token)}`,
        },
        params,
      });
    } else {
      res = await axiosService.get(`/api/v1/rest/products/${query.id}`, {
        params,
      });
    }
    const productData = await res.data.data;
    return { props: { productData, error: null } };
  } catch (error) {
    return { props: { productData: {}, error: error.response.data } };
  }
}

export default ProductDetail;
