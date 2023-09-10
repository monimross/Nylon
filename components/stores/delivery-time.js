import { t } from "i18next";
import moment from "moment/moment";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DeliveryTime({ storeDetail }) {
  const [value, onChange] = useState(new Date());
  const getDeliveryTime = () => {
    const timeArray = [];
    let start = parseInt(storeDetail?.open_time?.slice(0, 2));
    let end = parseInt(storeDetail?.close_time?.slice(0, 2));
    for (start; start <= end; start++) {
      timeArray.push({
        id: `${start}:00`,
        value: `${t("up to")} ${start}:00`,
      });
    }
    return timeArray;
  };
  const timeArray = getDeliveryTime();
  const locale = parseCookies()?.language_locale;
  moment.locale(locale === "aze" ? "ru" : locale);
  return (
    <div className="delivery-time">
      <Calendar
        onChange={onChange}
        value={value}
        locale={locale === "aze" ? "ru" : locale}
      />
      <div className="delivery-date-wrapper">
        {timeArray?.map((item, key) => {
          return (
            <div key={key} className="delivery-date">
              <div className="month">{moment(value).format("MMM Do YY")}</div>
              <div className="time">{item.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryTime;
