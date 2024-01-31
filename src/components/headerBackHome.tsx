import React from "react";
import { useNavigate } from "react-router-dom";
import Images from "../static";
import path from "../constants/path";
const HeaderBackHome = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center pt-14 pb-4 bg-main">
      <div
        className="w-12 ml-2 h-12 flex items-center justify-center"
        onClick={() => navigate(path.home)}
      >
        <img src={Images.iconHomeBack} className="w-10 h-10 object-contain" />
      </div>
      <p className="text-xl  font-bold text-center text-white flex-1 mr-12">
        {title}
      </p>
    </div>
  );
};
export default HeaderBackHome;
