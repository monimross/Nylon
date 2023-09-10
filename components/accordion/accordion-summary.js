import React from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import SubtractLineIcon from "remixicon-react/SubtractLineIcon";

const AccordionSummary = ({
  children,
  id,
  handleClick,
  idList,
  handleFilter = () => {},
  y,
}) => {
  const click = (e) => {
    e.stopPropagation();
    handleClick(id);
  };
  const handleSummary = () => {
    if (Boolean(y?.parent_id)) handleFilter({ category_id: y?.id });
    else handleClick(id);
  };
  return (
    <div className="accordion-summary" onClick={handleSummary}>
      {children}
      {idList?.includes(id) ? (
        <SubtractLineIcon onClick={click} size={32} />
      ) : (
        <AddLineIcon onClick={click} size={32} />
      )}
    </div>
  );
};

export default AccordionSummary;
