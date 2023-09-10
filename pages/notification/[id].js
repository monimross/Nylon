import React from "react";
import nookies from "nookies";
import SEO from "../../components/seo";
import axiosService from "../../services/axios";
import ErrorBoundary from "../../components/error/error";

const NotificationDetail = ({ blog, erorr }) => {
  return (
    <>
      <SEO
        title={blog?.translation?.title}
        description={blog?.translation?.description}
        keywords={blog?.translation?.short_desc}
      />
      <ErrorBoundary erorr={erorr}>
        <div className="blog-detail">
          <div className="detail-content">
            <div className="title">{blog?.translation?.title}</div>
            <div className="detail-navigation">
              <div className="date-com">
                <div className="date">{blog?.published_at}</div>
              </div>
            </div>
            <div
              className="detail-text"
              dangerouslySetInnerHTML={{
                __html: blog?.translation?.description,
              }}
            />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const language_locale = cookies?.language_locale;
  const params = { type: "notification", lang: language_locale };

  return axiosService
    .get(`/api/v1/rest/blogs/${query.id}`, { params })
    .then((res) => ({ props: { blog: res.data.data, error: null } }))
    .catch((error) => ({
      props: { blog: {}, error: error.response.data },
    }));
}
export default NotificationDetail;
