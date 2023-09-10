import Link from "next/link";
import React from "react";
import { imgBaseUrl } from "../../constants";

const CategoryCardSm = ({ data }) => {
  return (
    <Link href={`/all-product?parent_category_id=${data.id}`}>
      <div className="category-sm-card">
        <img src={imgBaseUrl + data.img} />
        <div className="title">{data.translation.title}</div>
      </div>
    </Link>
  );
};

export default CategoryCardSm;
