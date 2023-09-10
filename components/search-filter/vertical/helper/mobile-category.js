import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../../../utils/contexts/MainContext";
import Accordion from "../../../accordion";
import AccordionDetails from "../../../accordion/accordion-details";
import AccordionSummary from "../../../accordion/accordion-summary";

const MobileCategory = () => {
  const router = useRouter();
  const [idList, setIdList] = useState([]);
  const category = useSelector((state) => state.category.categoryList);
  const { setIsOpenDropdown } = useContext(MainContext);
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };
  const handleLink = (id) => {
    setIsOpenDropdown(false);
    router.push(`/all-product?parent_category_id=${id}`);
  };
  return (
    <div className="footer">
      <div className="content">
        {category?.map((child, id) => {
          return (
            <Accordion key={id} idList={idList} id={id}>
              <AccordionSummary
                handleClick={handleClick}
                idList={idList}
                y={child}
                id={id}
              >
                {child?.translation?.title}
              </AccordionSummary>
              <AccordionDetails>
                {child?.children?.map((child, key) => {
                  return (
                    <div
                      key={key}
                      className={
                        router?.query?.category_id == child.id
                          ? "item selected"
                          : "item"
                      }
                      onClick={() => handleLink(child.id)}
                    >
                      {child.translation?.title}
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default MobileCategory;
