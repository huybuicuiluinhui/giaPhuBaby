import React from "react";
import Images from "../../static";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
// import { followOA } from "zmp-sdk/apis";
import { saveIsFollowOA } from "../../utils/auth";
const Comfirm = () => {
  // const followOAFuc = () => {
  //   followOA({
  //     id: "3995727626295309125",
  //     success: () => {
  //       saveIsFollowOA();
  //       navigate(-1);
  //     },
  //     fail: (err) => {
  //       if (err.code === -201) {
  //         alert("Lỗi followOA");
  //       }
  //     },
  //   });
  // };
  const navigate = useNavigate();
  return (
    <div className="absolute z-[9999] p-0 m-0 w-full h-full flex flex-cols items-center justify-center bg-[#222222]">
      <div className="w-[90%] rounded-xl bg-white px-4">
        <div className=" flex flex-col  w-full h-full items-center  my-10 gap-2">
          <img
            className="w-40 h-30 object-contain "
            src={Images.logoLineabon}
          />
          <p className="font-semibold text-xl mt-5  mb-2    ">
            Quan tâm Lineabon
          </p>
          <span className="text-center">
            Hãy follow TPCN Lineabon D3K2 để sử dụng đầy đủ tính năng của ứng
            dụng Dr.Baby của LineaBon D3K2.
          </span>
          <button
            className="bg-[#01b2FF]  w-[85%] py-2 text-white  my-2 mt-2 rounded-lg"
            // onClick={() => followOAFuc()}
          >
            Tiếp tục
          </button>
          <button
            className="bg-[#0000000d] w-[85%] py-2 text-black  my-2 mt-2 rounded-lg"
            onClick={() => navigate(path.home)}
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comfirm;
