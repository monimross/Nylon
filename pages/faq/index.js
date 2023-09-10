import React, { useState } from "react";
import nookies from "nookies";
import Accordion from "../../components/accordion";
import AccordionDetails from "../../components/accordion/accordion-details";
import AccordionSummary from "../../components/accordion/accordion-summary";
import SEO from "../../components/seo";
import axiosService from "../../services/axios";
import ErrorBoundary from "../../components/error/error";
import Empty from "../../components/empty-data";
import { images } from "../../constants/images";

const Faq = ({ faqDetail, error }) => {
  const [idList, setIdList] = useState([]);
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };

  return (
    <>
      <SEO />
      <ErrorBoundary error={error}>
        <div className="tab-pane">
          <div className="title">FAQ</div>
          <div className="faq">
            {faqDetail?.map((item, id) => {
              return (
                <Accordion key={id} idList={idList} id={id}>
                  <AccordionSummary
                    handleClick={handleClick}
                    idList={idList}
                    id={id}
                  >
                    {item.translation?.question}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="typography">
                      <p>{item.translation?.answer}</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
            {faqDetail?.length === 0 && (
              <Empty image={images.ViewedProduct} text1="Faq is not found" />
            )}
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
    .get(`/api/v1/rest/faqs/paginate`, { params })
    .then((res) => ({ props: { faqDetail: res.data.data, error: null } }))
    .catch((error) => ({
      props: { faqDetail: {}, error: error.response.data || true },
    }));
}
export default Faq;
