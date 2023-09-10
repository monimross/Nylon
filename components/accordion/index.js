import React from "react";

const Accordion = ({ children, id, idList }) => {
  return (
    <div className={idList?.includes(id) ? "accordion active" : "accordion"}>
      {children}
    </div>
  );
};

export default Accordion;
