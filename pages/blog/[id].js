import React from "react";
import axiosService from "../../services/axios";
import nookies from "nookies";
import ErrorBoundary from "../../components/error/error";
import SEO from "../../components/seo";

const BlogDetail = ({ blog: { translation, img, published_at }, error }) => {
  const imgBaseUrl = require("../../constants").imgBaseUrl;
  const title = translation?.title;
  const description = translation?.description;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={translation?.short_desc}
      />
      <ErrorBoundary error={error}>
        <div className="blog-detail">
          <div className="banner">
            <img src={`${imgBaseUrl}${img}`} alt="blog" />
          </div>
          <div className="detail-content">
            <div className="title">{title}</div>
            <div className="detail-navigation">
              <div className="date-com">
                <div className="date">{published_at}</div>
              </div>
            </div>
            <div
              className="detail-text"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export async function getServerSideProps({ query: { id }, ...ctx }) {
  const cookies = nookies.get(ctx);
  const { language_id, language_locale } = cookies || {};
  const params = { language_id, lang: language_locale };

  return axiosService
    .get(`/api/v1/rest/blogs/${id}`, { params })
    .then((resBlog) => ({ props: { blog: resBlog.data.data, error: null } }))
    .catch((error) => ({ props: { blog: {}, error: error.response.data } }));
}

export default BlogDetail;
