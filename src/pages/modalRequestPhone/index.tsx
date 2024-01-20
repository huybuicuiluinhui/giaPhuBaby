import React, {Suspense, lazy, useContext} from "react";
import Images from "../../static";
import {AppContext} from "../../contexts/app.context";
import authApi from "../../apis/auth.apis";
import {useMutation} from "@tanstack/react-query";
import {closeApp, getAccessToken, getPhoneNumber} from "zmp-sdk/apis";
import {saveListBabyToLS} from "../../utils/auth";
import profileApi from "../../apis/profileC.apis";
import axios from "axios";
import LoadingPage from "../loadingScreen";
import Swal from 'sweetalert2'
const AddBaby = lazy(() => import("../addBaby"));
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
    //


    const [loading, setLoading] = React.useState(false);

    const [phoneTemp, setPhoneTemp] = React.useState("");

    const [isOpen, setIsOpen] = React.useState(false);

    const [phoneInput, setPhoneInput] = React.useState('')

    const getProfile = async () => {
        try {
            const res = await profileApi.getUserProfile();

            setProfile(res.data.data.user);
            setListBaby(res.data.data.baby);
            saveListBabyToLS(res.data.data.baby);
            setSelectedBaby(res.data.data.baby[0]);
        } catch (error) {
            console.log(error);
        }
    };

    //
    const closeMiniApp = async () => {
        try {
            setProfile(null);
            setIsAuthenticated(false);
            await closeApp({});
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

                const phone = phoneInput;
                const body = {phone: phone};
                const res = await authApi.login(body);
                if (res.data.code === 200) {
                    getProfile();
                    setPhoneTemp(phone);
                    setPhoneUser(phone);
                    setIsAuthenticated(true);
                    setPhoneUser(phoneInput)
                    localStorage.setItem('phoneUser', phoneInput);
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
                timer: 1500
            });

        }

    };
    if (isAuthenticated && !!phoneTemp && !!listBaby && !!listBaby.length) {
        return <></>;
    }

    if (isAuthenticated && !!phoneTemp && listBaby && listBaby.length === 0) {
        return (
            <Suspense>
                <AddBaby/>
            </Suspense>
        );
    }

    return (

        <div
            className="absolute z-[99] p-0 m-0 w-full h-full flex flex-cols items-center justify-center bg-[#222222]">
            {
                isOpen ?
                    (
                        <div className='h-full w-full bg-cyan-400 '>
                            <div className="form-login w-[90%] rounded-xl bg-white  m-auto mt-[50%]">
                                <div className='py-4 px-3 w-full text-center'>
                                    <input type='text'
                                           className='block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                           placeholder={'Vui lòng nhập số điện thoại...'}
                                           onChange={(e) => setPhoneInput(e.target.value)}/>
                                    <div className="flex content-center btn-click w-full ">
                                        <button type={'button'}
                                                className='p-2 bg-emerald-600 rounded-md text-white mt-3'
                                                onClick={handleLogin}>Đăng nhập
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) :
                    (


                        <div className="w-[90%] rounded-xl bg-white px-4">
                            <img
                                src={Images.babey}
                                className=" w-32 h-32 object-contain mx-auto mt-3"
                            />
                            <p className=" font-bold uppercase text-center text-lg leading-6 my-2">
                                CHÀO MỪNG ĐẾN VỚI <br/>
                                LINEABON
                            </p>
                            <p className=" font-semibold text-base leading-6 mt-2">
                                Chúng tôi cần số điện thoại của bạn để:
                            </p>
                            <div className="flex items-center mt-1">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path
                                        d="M7.01855 4L13.0186 10L7.01855 16"
                                        stroke="#01B2FF"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className=" font-medium text-base leading-6 ">
                                    Định danh tài khoản
                                </p>
                            </div>
                            <div className="flex items-center mt-1">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path
                                        d="M7.01855 4L13.0186 10L7.01855 16"
                                        stroke="#01B2FF"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className=" font-medium text-base leading-6 ">Mua bán sản phẩm</p>
                            </div>
                            <div className="flex items-center mt-1">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path
                                        d="M7.01855 4L13.0186 10L7.01855 16"
                                        stroke="#01B2FF"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className=" font-medium text-base leading-6 ">Tra cứu đơn hàng</p>
                            </div>

                            <p className=" font-medium text-base  leading-6 mt-2">
                                Vui lòng đồng ý chia sẻ số điện thoại với LineaBon để liên kết tài
                                khoản.
                            </p>
                            <p className="font-medium text-base text-center leading-6 mt-2"></p>
                            <div
                                className="w-[100%] py-2 flex items-center justify-center border-2 border-[#01B2FF] bg-blue mt-4 mb-3 rounded-md"
                                onClick={() => setIsOpen(true)}
                            >
                                <p className="text-base text-white font-light">
                                    Liên kết số điện thoại
                                </p>
                            </div>
                            {/*<div*/}
                            {/*  className="w-full box-content py-2 flex items-center justify-center border-2 border-[#01B2FF] mb-6 rounded-md"*/}
                            {/*  onClick={closeMiniApp}*/}
                            {/*>*/}
                            {/*  <p className="text-base text-black font-light">Từ chối và thoát</p>*/}
                            {/*</div>*/}
                        </div>

                    )
            }
            {/*// @ts-ignore*/}
            {(loading || logintMutation.isLoading) && <LoadingPage/>}
        </div>

    );
};
export default ModalRequestPhone;
