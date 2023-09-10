import { useRouter } from "next/router";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import Accordion from "../../../components/accordion";
import AccordionDetails from "../../../components/accordion/accordion-details";
import AccordionSummary from "../../../components/accordion/accordion-summary";
import CategoryLoader from "../../loader/category";
import CallBackSearch from "../callBackSearch";
const ByCategory = ({ category, handleFilter }) => {
  const router = useRouter();
  const [idList, setIdList] = useState([]);
  const [subIdList, setSubIdList] = useState([]);
  const [filterText, setFilter] = useState("");
  const [parentFilter, setParentFilter] = useState("");
  const currentCategory = category.flatMap((item) => item.children);
  const x = currentCategory.find((item) => item.id == router.query.category_id);
  const px = currentCategory.find(
    (item) => item.parent_id == router.query.category_id
  );
  const y = {};
  const a = {};
  if (x || px) {
    if (x) {
      y = category.find((item) => item.id == x?.parent_id);
    } else {
      y = category.find((item) => item.id == px?.parent_id);
    }
  } else {
    const nextCategory = currentCategory.flatMap((item) => item.children);
    a = nextCategory.find((item) => item?.id == router.query.category_id);
    y = currentCategory.find((item) => item.id == a?.parent_id);
  }
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };
  const handleSubClick = (key) => {
    const includes = subIdList.includes(key);
    if (includes) {
      setSubIdList(subIdList.filter((item) => item !== key));
    } else {
      setSubIdList([...subIdList, key]);
    }
  };
  return (
    <>
      {category.length === 0 ? (
        <CategoryLoader />
      ) : (
        <div className="by-category">
          <Accordion idList={idList} id="id">
            <AccordionSummary
              handleFilter={handleFilter}
              handleClick={handleClick}
              idList={idList}
              y={y}
              id="id"
            >
              {y?.translation?.title}
            </AccordionSummary>
            <AccordionDetails>
              <CallBackSearch setFilter={setParentFilter} />
              {y?.children
                ?.filter((item) =>
                  Boolean(parentFilter)
                    ? item.translation.title
                        .toLowerCase()
                        .includes(parentFilter.toLowerCase())
                    : item
                )
                .map((child, key) =>
                  child?.children?.length ? (
                    <Accordion key={key} idList={subIdList} id={key}>
                      <AccordionSummary
                        handleFilter={handleFilter}
                        handleClick={handleSubClick}
                        idList={subIdList}
                        y={child}
                        id={key}
                      >
                        {child?.translation?.title}
                      </AccordionSummary>
                      <CallBackSearch setFilter={setFilter} />
                      <AccordionDetails>
                        <Scrollbars autoHeight autoHide>
                          {child?.children
                            ?.filter((item) =>
                              Boolean(filterText)
                                ? item.translation.title
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase())
                                : item
                            )
                            .map((child, key) => (
                              <div
                                key={key}
                                className={
                                  router?.query?.category_id == child.id
                                    ? "item selected"
                                    : "item"
                                }
                                onClick={() =>
                                  handleFilter({ category_id: child.id })
                                }
                              >
                                {child.translation?.title}
                              </div>
                            ))}
                        </Scrollbars>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <div
                      key={key}
                      className={
                        router?.query?.category_id == child.id
                          ? "item selected"
                          : "item"
                      }
                      onClick={() => handleFilter({ category_id: child.id })}
                    >
                      {child.translation?.title}
                    </div>
                  )
                )}
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  );
};

export default ByCategory;
