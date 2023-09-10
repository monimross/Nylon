import Link from "next/link";
import React from "react";
import { imgBaseUrl } from "../../constants";

const CategoryCardMd = ({ data }) => {
  return (
    <Link href={`/all-product?parent_category_id=${data.id}`}>
      <div className="category-md-card">
        <img src={imgBaseUrl + data.img} />
        <div className="title">{data.translation?.title}</div>
      </div>
    </Link>
  );
};

export default CategoryCardMd;
