import React from "react";
import moment from "moment";
import CheckDoubleLineIcon from "remixicon-react/CheckDoubleLineIcon";
const UserMessage = ({ text, time, status = "" }) => {
  return (
    <div className="user-sms-wrapper">
      <div className="user-message">
        {text}
        <div className="time">{moment(new Date(time)).format("HH:mm")}</div>
        <span className="double-check">
          {status === "pending" ? "" : <CheckDoubleLineIcon size={16} />}
        </span>
      </div>
    </div>
  );
};

export default UserMessage;
