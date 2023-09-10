import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlogApi } from "../../api/main/blog";
import { images } from "../../constants/images";
import Empty from "../empty-data";
import StoreLoader from "../loader/store";
import BlogCard from "./card";

const Blog = () => {
  const { t: tl } = useTranslation();
  const [blogList, setBlogList] = useState(null);
  const getBlogs = () => {
    BlogApi.get({ type: "blog", perPage: 3 })
      .then((res) => {
        setBlogList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="blog-wrapper">
      <div className="blog">
        <div className="title">{tl("Blog")}</div>
        <div className="blog-items">
          {blogList ? (
            blogList?.map((blog, key) => {
              return <BlogCard key={key} blog={blog} />;
            })
          ) : (
            <>
              <StoreLoader />
              <StoreLoader />
              <StoreLoader />
              <StoreLoader />
            </>
          )}
        </div>
        {blogList?.length === 0 && (
          <Empty
            image={images.ViewedProduct}
            text1="There are no items in the blogs"
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
