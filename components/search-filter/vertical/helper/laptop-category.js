import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../../../utils/contexts/MainContext";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import QueryString from "qs";
import Scrollbars from "react-custom-scrollbars";
const LaptopCategory = () => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState(0);
  const category = useSelector((state) => state.category.categoryList);
  const { setIsOpenDropdown } = useContext(MainContext);

  const handleHover = (id) => {
    setCurrentId(id);
  };
  const handleLink = (id) => {
    setIsOpenDropdown(false);
    router.push(`/all-product?parent_category_id=${id}`);
  };
  const handleChildLink = (p_id, id) => {
    const str = QueryString.stringify({
      categoryIds: [id],
    });
    setIsOpenDropdown(false);
    router.push(`/all-product?parent_category_id=${p_id}&${str}`);
  };
  return (
    <>
      <div className="parent-category">
        <Scrollbars autoHeight autoHide autoHeightMin={"80dvh"}>
          <ul>
            {category?.map((item, key) => (
              <li
                key={key}
                className={`${key === currentId && "active"}`}
                onMouseOver={() => handleHover(key)}
              >
                <label>{item?.translation?.title}</label>
                <ArrowRightSLineIcon size={20} />
              </li>
            ))}
          </ul>
        </Scrollbars>
      </div>
      <div className="child-category">
        <div className="title">{category[currentId]?.translation?.title}</div>
        <div className="category-items">
          {category[currentId]?.children.map((item) =>
            item?.children?.length ? (
              <div className="item" key={item.id}>
                <div className="item-title" onClick={() => handleLink(item.id)}>
                  {item?.translation?.title}
                </div>
                <ul>
                  {item?.children?.map((item) => {
                    return (
                      <li
                        onClick={() => handleChildLink(item.parent_id, item.id)}
                      >
                        {item?.translation?.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="item single" key={item.id}>
                <ul>
                  <li onClick={() => handleLink(item.id)}>
                    {item?.translation?.title}
                  </li>
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default LaptopCategory;
