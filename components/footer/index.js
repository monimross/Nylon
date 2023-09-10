import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useWindowSize from "../../utils/hooks/useWindowSize";
import Accordion from "../accordion";
import AccordionDetails from "../accordion/accordion-details";
import AccordionSummary from "../accordion/accordion-summary";
import CategoryLoader from "../loader/category";

const Footer = () => {
  const { t: tl } = useTranslation();
  const settings = useSelector((state) => state.settings.data);
  const [idList, setIdList] = useState([]);
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };
  const windowSize = useWindowSize();
  return (
    <div className="footer">
      <div className="content">
        {Object.keys(settings).length !== 0 ? (
          <ul>
            <li>
              <a className="title" href={`tel:${settings["phone"]}`}>
                {settings["phone"]}
              </a>
            </li>
            <li className="address">{settings["address"]}</li>
          </ul>
        ) : (
          <CategoryLoader />
        )}
        {windowSize.width > 768 ? (
          <>
            <div className="item">
              <ul>
                <li className="title">{tl("Social")}</li>
                <li>
                  <a href={settings["instagram"]} target="_blank">
                    {tl("Instagram")}
                  </a>
                </li>
                <li>
                  <a href={settings["facebook"]} target="_blank">
                    {tl("Facebook")}
                  </a>
                </li>
                <li>
                  <a href={settings["twitter"]} target="_blank">
                    {tl("Twitter")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="item">
              <ul>
                <li className="title">{tl("Help")}</li>
                <Link href="/faq">
                  <li>{tl("FAQ")}</li>
                </Link>
                <Link href="/term-of-use">
                  <li>{tl("Term of use")}</li>
                </Link>
                <Link href="/privacy-policy">
                  <li>{tl("Privacy Policy")}</li>
                </Link>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Accordion idList={idList} id={"social"}>
              <AccordionSummary
                handleClick={handleClick}
                idList={idList}
                id={"social"}
              >
                {tl("Social")}
              </AccordionSummary>
              <AccordionDetails>
                <a href={settings["instagram"]} target="_blank">
                  {tl("Instagram")}
                </a>
              </AccordionDetails>
              <AccordionDetails>
                <a href={settings["facebook"]} target="_blank">
                  {tl("Facebook")}
                </a>
              </AccordionDetails>
              <AccordionDetails>
                <a href={settings["twitter"]} target="_blank">
                  {tl("Twitter")}
                </a>
              </AccordionDetails>
            </Accordion>
            <Accordion idList={idList} id={"help"}>
              <AccordionSummary
                handleClick={handleClick}
                idList={idList}
                id={"help"}
              >
                {tl("Help")}
              </AccordionSummary>
              <AccordionDetails>
                <Link href="/faq">{tl("FAQ")}</Link>
              </AccordionDetails>
              <AccordionDetails>
                <Link href="/term-of-use">{tl("Term of use")}</Link>
              </AccordionDetails>
              <AccordionDetails>
                <Link href="/privacy-policy">{tl("Privacy Policy")}</Link>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>

      <footer>{settings["footer_text"]}</footer>
    </div>
  );
};

export default Footer;
