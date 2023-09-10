import React from "react";

const CategoryByParentLoader = () => {
  const categoryList = [{}, {}, {}, {}, {}, {}];
  return (
    <div className="category-by-parent">
      {categoryList?.map(() => (
        <div className="category-by-parent-item">
          <div className="category-item loading" />
        </div>
      ))}
    </div>
  );
};

export default CategoryByParentLoader;
