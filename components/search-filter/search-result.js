import Link from "next/link";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";
import Empty from "../empty-data";

const SerachResult = ({ isSearching, searchResult = {}, setIsOpen }) => {
  const { t: tl } = useTranslation();
  function isEmpty() {
    return !Boolean(
      searchResult.shops?.length ||
        searchResult.categories?.length ||
        searchResult.brands?.length ||
        searchResult.products?.length
    );
  }
  return (
    <div className="search-result-wrapper">
      {isSearching ? (
        <div className="searching">{`${tl("searching")}...`}</div>
      ) : isEmpty() ? (
        <Empty image={images.SearchEmpty} text1="No search results" />
      ) : (
        <>
          <Scrollbars autoHeight autoHide autoHeightMin={"60vh"}>
            {Boolean(searchResult.shops?.length) && (
              <div className="suggestion">
                <div className="title">{tl("shops")}</div>
                <div className="suggestion-item">
                  <ul>
                    {searchResult.shops?.map((suggestion, key) => (
                      <Link href={`/stores/${suggestion.uuid}`}>
                        <li key={key} onClick={() => setIsOpen(false)}>
                          <span>{suggestion.translation.title}</span>
                          <div className="label">{tl("shop")}</div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {Boolean(searchResult.categories?.length) && (
              <div className="suggestion">
                <div className="title">{tl("Categories")}</div>
                <div className="suggestion-item">
                  <ul>
                    {searchResult.categories?.map((suggestion, key) => (
                      <Link
                        href={`/all-product?parent_category_id=${suggestion.parent_id}&categoryIds%5B0%5D=${suggestion.id}`}
                      >
                        <li key={key} onClick={() => setIsOpen(false)}>
                          <span>{suggestion.translation.title}</span>
                          <div className="label">{tl("category")}</div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {Boolean(searchResult.brands?.length) && (
              <div className="suggestion">
                <div className="title">{tl("Brands")}</div>
                <div className="suggestion-item">
                  <ul>
                    {searchResult.brands?.map((suggestion, key) => (
                      <Link href={`/stores/all-brand/${suggestion.id}`}>
                        <li key={key} onClick={() => setIsOpen(false)}>
                          <span>{suggestion.title}</span>
                          <div className="label">{tl("brand")}</div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {Boolean(searchResult.products?.length) && (
              <div className="suggestion">
                <div className="title">{tl("products")}</div>
                <div className="suggestion-item">
                  <ul>
                    {searchResult.products?.map((suggestion, key) => (
                      <Link href={`/products/${suggestion.uuid}`}>
                        <li key={key} onClick={() => setIsOpen(false)}>
                          <span>{suggestion.translation.title}</span>
                          <div className="label">{tl("product")}</div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Scrollbars>
        </>
      )}
    </div>
  );
};

export default SerachResult;
