import React from "react";
import { images } from "../../constants/images";

const Comment = () => {
  return (
    <div className="commentary">
      <div className="user">
        <div className="avatar">
          <img src={images.Avatar} />
        </div>
        <div className="data">
          <div className="name">Devon Lane</div>
          <div className="date">03.06.21 | 21:00</div>
        </div>
      </div>
      <div className="comment-text">
        We aim to show you accurate product that you like definitely because of
        its quality. Transfer Protocol had been required to publish content on
        the Web, and early Web users therefore tended to be hackers and computer
      </div>
    </div>
  );
};

export default Comment;
