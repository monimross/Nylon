import React from "react";
import { useTranslation } from "react-i18next";

const CategoryByChildLoader = () => {
  const { t: tl } = useTranslation();
  const categoryList = [
    { children: [{}, {}] },
    { children: [{}, {}, {}, {}, {}, {}] },
    { children: [{}, {}, {}, {}] },
    { children: [{}, {}, {}, {}] },
  ];
  return (
    <div className="category-by-child">
      {categoryList?.slice(0, 4)?.map((category, key) => (
        <div key={key} className="category-by-child-item">
          <div className="section-header">
            <div className="title">{tl("title")}</div>
          </div>
          <div className="section-content">
            {category?.children
              ?.slice(0, key == 0 ? 2 : key == 1 ? 6 : 4)
              .map(() => (
                <div className="category-item loading" />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryByChildLoader;
