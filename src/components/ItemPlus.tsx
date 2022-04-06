import React from "react";
import Plus from "../img/plus.svg";
import White from "../img/White.png";

interface Plus {
  checkPlus: string;
}

const ItemPlus: React.FC<Plus> = ({ checkPlus }) => {
  if (checkPlus == "") return <img className="button-plus-white" src={White} />;
  return <img className="button-plus-image" src={Plus} />;
};
export { ItemPlus };
