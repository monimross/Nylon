import React from "react";
import nookies from "nookies";
import axiosService from "../../services/axios";
import { imgBaseUrl } from "../../constants";
import CategoryCardMd from "../../components/category/card-md";
import CategoryCardSm from "../../components/category/card-sm";
import ErrorBoundary from "../../components/error/error";
const CategoryDetail = ({ category, error }) => {
  return (
    <ErrorBoundary error={error}>
      <div className="category-detail">
        <div className="banner">
          <img src={imgBaseUrl + category.img} />
          <div className="title">{category.translation.title}</div>
        </div>
        <div className="tab-pane">
          <div className="card-md-items">
            {category.children.map((item) => {
              return <CategoryCardMd key={item.uuid} data={item} />;
            })}
          </div>
          {/* <div className="card-sm-items">
        {allChild.map((item) => {
          return <CategoryCardSm key={item.uuid} data={item} />;
        })}
      </div> */}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const params = { language_id, lang: language_locale };
  return axiosService
    .get(`/api/v1/rest/categories/${query.id}`, { params })
    .then((res) => ({ props: { category: res.data.data, error: null } }))
    .catch((error) => ({
      props: { category: {}, error: error.response.data },
    }));
}
export default CategoryDetail;
