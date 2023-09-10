import React from "react";
import axiosService from "../../services/axios";
import nookies from "nookies";
import ErrorBoundary from "../../components/error/error";
const PrivacyPolicy = ({ policyDetail, error }) => {
  return (
    <>
      <ErrorBoundary error={error}>
        <div className="tab-pane">
          <div className="title">
            <div className="title">{policyDetail?.translation?.title}</div>
          </div>
          <div className="termofuse">
            <div
              className="typography"
              dangerouslySetInnerHTML={{
                __html: policyDetail?.translation?.description,
              }}
            ></div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const params = { language_id, lang: language_locale };

  return axiosService
    .get(`/api/v1/rest/policy`, { params })
    .then((res) => ({ props: { policyDetail: res.data.data, error: null } }))
    .catch((error) => ({
      props: { policyDetail: {}, error: error.response.data || true },
    }));
}
export default PrivacyPolicy;
