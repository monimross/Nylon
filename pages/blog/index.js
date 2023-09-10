import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { BlogApi } from "../../api/main/blog";
import BlogCard from "../../components/blog/card";
import axiosService from "../../services/axios";
import { useTranslation } from "react-i18next";
import SEO from "../../components/seo";
import ErrorBoundary from "../../components/error/error";

const Blog = ({ blogList, error }) => {
  const { t: tl } = useTranslation();
  const [blogs, setBlogs] = useState(blogList?.data);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(blogList?.meta?.total);
  const handlePaginate = () => {
    setPage(page + 1);
  };
  const getBlog = () => {
    BlogApi.get({ type: "blog", page, perPage: 3 })
      .then((res) => {
        setBlogs([...blogs, ...res.data]);
        setTotal(res.meta.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (page > 1) {
      getBlog();
    }
  }, [page]);
  return (
    <>
      <SEO />
      <ErrorBoundary error={error}>
        <div className="blog-wrapper">
          <div className="blog">
            <div className="title">{tl("Blog")}</div>
            <div className="blog-items">
              {blogs?.map((blog, key) => {
                return <BlogCard key={key} blog={blog} />;
              })}
            </div>
          </div>
          {total > blogs?.length && (
            <div onClick={handlePaginate} className="see-more">
              {tl("Load more")}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const params = {
    perPage: 3,
    page: 1,
    type: "blog",
    language_id,
    lang: language_locale,
  };
  return axiosService
    .get(`/api/v1/rest/blogs/paginate`, { params })
    .then((res) => ({
      props: { blogList: res.data, error: null },
    }))
    .catch((error) => ({
      props: { blogList: {}, error: error.response.data },
    }));
}

export default Blog;
