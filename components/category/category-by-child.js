import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";
import CategoryByChildLoader from "../loader/category-by-child";
import Empty from "../empty-data";
import { images } from "../../constants/images";

const CategoryByChild = () => {
  const { t: tl } = useTranslation();
  const { categoryList, loading } = useSelector((state) => state.category);
  if (loading) {
    return <CategoryByChildLoader />;
  } else
    return (
      <div className="category-by-child">
        {categoryList?.slice(0, 4)?.map((category, key) => (
          <div key={key} className="category-by-child-item">
            <div className="section-header">
              <div className="title">{category?.translation?.title}</div>
              <Link href={`/category/${category.uuid}`}>
                <a className="see-all">{tl("See all")}</a>
              </Link>
            </div>
            <div className="section-content">
              {Boolean(category?.children?.length) ? (
                category?.children
                  ?.slice(0, key == 0 ? 2 : key == 1 ? 6 : 4)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={`/all-product?parent_category_id=${item.id}`}
                    >
                      <div className="category-item">
                        <div className="img">
                          <img src={imgBaseUrl + item?.img} />
                        </div>
                        <div className="title">{item.translation?.title}</div>
                      </div>
                    </Link>
                  ))
              ) : (
                <Empty
                  image={images.ViewedProduct}
                  text1="There are no children."
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
};

export default CategoryByChild;
