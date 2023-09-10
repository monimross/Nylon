import React from "react";
import nookies from "nookies";
import axiosService from "../../services/axios";
import ErrorBoundary from "../../components/error/error";
const Termofuse = ({ termDetail, error }) => {
  return (
    <ErrorBoundary error={error}>
      <div className="tab-pane">
        <div className="title">
          <div className="title">{termDetail?.translation?.title}</div>
        </div>
        <div className="termofuse">
          <div
            className="typography"
            dangerouslySetInnerHTML={{
              __html: termDetail?.translation?.description,
            }}
          ></div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_locale = cookies?.language_locale;
  const params = { lang: language_locale };

  return axiosService
    .get(`/api/v1/rest/term`, { params })
    .then((res) => ({ props: { termDetail: res.data.data, error: null } }))
    .catch((error) => ({
      props: { termDetail: {}, error: error.response.data || true },
    }));
}
export default Termofuse;
