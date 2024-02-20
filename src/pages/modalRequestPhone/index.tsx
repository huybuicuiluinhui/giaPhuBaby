import React, { Suspense, lazy, useContext, useEffect } from "react";
import Images from "../../static";
import { AppContext } from "../../contexts/app.context";
import authApi from "../../apis/auth.apis";
import { useMutation } from "@tanstack/react-query";

import { saveListBabyToLS } from "../../utils/auth";
import profileApi from "../../apis/profileC.apis";
import LoadingPage from "../loadingScreen";
import Swal from "sweetalert2";
import profileApiC from "../../apis/profileC.apis";
import { NAME_MINI_WEB } from "../../api";

const ModalRequestPhone = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setProfile,
    listBaby,
    setListBaby,
    setSelectedBaby,
    phoneUser,
    setPhoneUser,
  } = useContext(AppContext);

  const [loading, setLoading] = React.useState(false);

  const [phoneTemp, setPhoneTemp] = React.useState("");

  const [phoneInput, setPhoneInput] = React.useState(phoneUser);
  const getProfile = async () => {
    try {
      const res = await profileApiC.getUserProfile();
      console.log("res", res);
      setProfile(res.data.data.user);
      setListBaby(res.data.data.baby);
      saveListBabyToLS(res.data.data.baby);
      setSelectedBaby(res.data.data.baby[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const logintMutation = useMutation({
    mutationFn: (body: { phone: string }) => authApi.login(body),
  });
  const handleLogin = async () => {
    if (!phoneInput) {
      return;
    }
    if (/^\d{10}$/.test(phoneInput)) {
      try {
        setLoading(true);
        const body = { phone: phoneInput };
        const res = await authApi.login(body);
        if (res.data.code === 200) {
          const phone = res.data?.data?.user?.userName;
          setPhoneTemp(phone);
          setIsAuthenticated(true);
          setPhoneUser(phone);
          localStorage.setItem("phoneUser", phone);
          getProfile();
        } else {
          alert("Thử lại sau");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        html: '<div class=" text-2xl text-red-700">Vui lòng kiểm tra lại số điện thoại!</div>',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (
    isAuthenticated &&
    !!localStorage.getItem("phoneUser") &&
    !!listBaby &&
    !!listBaby.length
  ) {
    return <></>;
  }
  return (
    <div className="absolute z-[99] p-0 m-0 w-full h-full flex flex-cols items-center justify-center bg-[#222222]">
      {
        <div className="w-[90%] rounded-xl bg-white px-4">
          <img
            src={Images.babey}
            className=" w-32 h-32 object-contain mx-auto mt-3"
          />
          <p className=" font-bold uppercase text-center text-lg leading-6 my-2">
            CHÀO MỪNG ĐẾN VỚI <br />
            {NAME_MINI_WEB}
          </p>
          <p className=" font-semibold text-base leading-6 mt-2">
            Chào mừng bạn đến với chương trình “Trở thành Bác sĩ của con cùng{" "}
            {NAME_MINI_WEB}". Với sự bảo trợ chuyên môn từ Bác sĩ Chuyên khoa II
            Hoàng Quốc Tưởng, {NAME_MINI_WEB} sẽ trở thành một trợ lý đắc lực,
            giúp bạn nuôi con khoa học và đơn giản. Hãy nhập số điện thoại để
            bắt đầu ngay bây giờ!
          </p>
          <p className="font-medium text-base text-center leading-6 mt-2"></p>
          <div className="pb-2  w-full text-center">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={"Vui lòng nhập số điện thoại..."}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
            <div className="flex content-center btn-click w-full ">
              <button
                type={"button"}
                className="p-2 bg-emerald-600 rounded-md text-white mt-3"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      }
      {/*// @ts-ignore*/}
      {(loading || logintMutation.isLoading) && <LoadingPage />}
    </div>
  );
};
export default ModalRequestPhone;
