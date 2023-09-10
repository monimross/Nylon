import React from "react";
import { DiscountIcon } from "../../../constants/images";
import Link from "next/link";
import { t } from "i18next";

const SectionHeader = ({ title, href, icon }) => {
  return (
    <React.Fragment>
      {(title || href) && (
        <div className="section-header">
          <div className="title">
            {icon && (
              <div className="icon">
                <DiscountIcon />
              </div>
            )}
            {t(title)}
          </div>
          {href && (
            <Link href={href}>
              <a className="see-all">{t("See all")}</a>
            </Link>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SectionHeader;
