import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";
import CategoryByParentLoader from "../loader/category-by-parent";

const CategoryByParent = () => {
  const { categoryList, loading } = useSelector((state) => state.category);

  if (loading) {
    return <CategoryByParentLoader />;
  } else
    return (
      <div className="category-by-parent">
        {categoryList?.slice(4, 10)?.map((category) => (
          <Link key={category?.uuid} href={`/category/${category.uuid}`}>
            <div className="category-by-parent-item">
              <div className="category-item">
                <div className="img">
                  <img src={imgBaseUrl + category?.img} />
                </div>
                <div className="title">{category.translation?.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
};

export default CategoryByParent;
