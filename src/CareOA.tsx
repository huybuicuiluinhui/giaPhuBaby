import React, { useEffect } from "react";
import Images from "./static";
import { ID_OA, NAME_MINI_WEB } from "./api";

interface IProps {
  onHandleFollow: () => void;
}
const CareOA = (props: IProps) => {
  (window as any).handleFollow = () => {
    props.onHandleFollow();
  };

  const loadZaloSDK = () => {
    const script = document.createElement("script");
    script.src = "https://sp.zalo.me/plugins/sdk.js";
    script.defer = true;

    script.onload = () => {
      console.log("Zalo SDK script loaded successfully");
      ZaloSocialSDK.reload();
    };

    script.onerror = (error) => {
      // Handle script loading error
      console.error("Error loading Zalo SDK script:", error);
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    if (ID_OA) {
      loadZaloSDK();
    }
  }, []);
  return (
    <div className="fixed bottom-0 z-[9999999] p-0 m-0 w-scrren h-screen flex flex-cols items-center justify-center bg-[#222222]">
      <div className="w-[90%] rounded-xl bg-white px-4">
        <div className=" flex flex-col  w-full h-full items-center  my-10 gap-2">
          <img
            className="w-40 h-30 object-contain "
            src={Images.logoLineabon}
          />
          <p className="font-semibold text-xl mt-5  mb-2 ">
            Quan tâm {NAME_MINI_WEB}
          </p>
          <span className="text-center">
            Hãy follow {NAME_MINI_WEB} để sử dụng đầy đủ tính năng của ứng dụng
            {NAME_MINI_WEB}.
          </span>
          <div
            className="zalo-follow-only-button w-100 h-100"
            data-oaid={ID_OA}
            data-callback="handleFollow"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CareOA;
