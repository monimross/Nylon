import React from "react";
import moment from "moment";

const AdminMessage = ({ text, time }) => {
  return (
    <div className="admin-message-wrapper">
      <div className="admin-message">
        {text}
        <div className="time">{moment(new Date(time)).format("HH:mm")}</div>
      </div>
    </div>
  );
};

export default AdminMessage;
