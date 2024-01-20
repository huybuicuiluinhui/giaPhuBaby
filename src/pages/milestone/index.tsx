import React, { useContext, useEffect, useRef } from "react";
import { Box, Page, Spinner, useNavigate } from "zmp-ui";
import DetailMilestones from "./detailMilestone";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import Images from "../../static";
import API from "../../api";
import axios from "axios";
import { AppContext } from "../../contexts/app.context";
import ShowListBaby from "../../components/showListBaby";
import { showAgeByMonth } from "../../module";
import { getAccessTokenFromLS } from "../../utils/auth";
import ModaNotify from "../../components/modaNotify";
import profileApi from "../../apis/profile.apis";
const Milestones = () => {
  const navigate = useNavigate();
  const [idChoose, setIdChoose] = React.useState<any>(null);
  const [dataMonth, setDataMonth] = React.useState([]);
  const [dataDetail, setDataDetail] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isCheckSetup, setIsCheckSetup] = React.useState(null);
  const refListBaby = React.useRef(null);
  const accessToken = getAccessTokenFromLS();
  const [dataCheckVoucher, setDataCheckVoucher] = React.useState(null);
  const [dataMilestMonth, setDataMilestMonth] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const ref = useRef();
  // @ts-ignore
  const handleChooseMonth = (item, index) => {
    setIdChoose(index);
  };
  const [isOpenListVideo, setIsOpenListVideo] = React.useState("0");
  // @ts-ignore
  const handleSetIdListVideo = (id, idMileston) => {
    setIsOpenListVideo(`${id}` + `${idMileston}`);
  };
  const { selectedBaby } = useContext(AppContext);
  const getDetailDataMonth = async () => {
    checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
    setIsLoading(true);
    try {
      const res = await axios({
        url: API.listMilestone(idChoose),
        method: "get",
        headers: {
          Authorization: "Bearer" + accessToken,
        },
      });

      if (res.data.code === 200) {
        console.log("ahihihihi", res.data);
        setDataDetail(res?.data?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //Lấy danh sách tháng trong csdl
  const getDataMonthChoose = async () => {
    try {
      var month = selectedBaby;
      if (month) {
        if (month.realAge < 25) {
          setIdChoose(month.realAge);
          checkIsDoneMilestoneMonth(month.realAge, month.id);
          getMilestonesInMonth(month.realAge, month.id);
        } else if (month.realAge >= 25 && month.realAge < 28) {
          setIdChoose(25);
          checkIsDoneMilestoneMonth(25, month.id);
          getMilestonesInMonth(25, month.id);
        } else if (month.realAge >= 28 && month.realAge < 31) {
          setIdChoose(26);
          checkIsDoneMilestoneMonth(26, month.id);
          getMilestonesInMonth(26, month.id);
        } else if (month.realAge >= 31 && month.realAge < 34) {
          setIdChoose(27);
          checkIsDoneMilestoneMonth(27, month.id);
          getMilestonesInMonth(27, month.id);
        } else {
          setIdChoose(28);
          checkIsDoneMilestoneMonth(28, month.id);
          getMilestonesInMonth(28, month.id);
        }
      }
      const res = await axios({
        url: API.milestones(),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.status) {
        setDataMonth(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // @ts-ignore

  const getMilestonesInMonth = async (id_month, id_user_profiles) => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("id_month", id_month);
      formData.append("id_user_profiles", id_user_profiles);
      const res = await axios({
        url: API.getMilestonesInMonth(),
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data?.status) {
        setDataMilestMonth(res?.data?.data);
      }
    } catch (error) {
      console.log("Lỗi nhận voucher milestones theo tháng! ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("dataCheckVoucher", dataCheckVoucher);
  // @ts-ignore
  const updateMileston = async (id_activity_milestones, status) => {
    try {
      let formData = new FormData();
      formData.append("status", status);
      formData.append("id_activity_milestones", id_activity_milestones);
      // @ts-ignore
      formData.append("id_user_profiles", selectedBaby?.id);
      const res = await axios({
        url: API.updateMilestones(),
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.status) {
        checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
        getMilestonesInMonth(idChoose, selectedBaby?.id);
        if (status == 1) {
          setDescription("Thành công!\nChúc mừng bé đã hoàn thành cột mốc");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.log("Lỗi cập nhật status milestones theo id ! ");
      console.log(error);
    }
  };
  // Lấy thông tin hoàn thành cột mộc theo tháng được chọn
  // @ts-ignore
  const checkIsDoneMilestoneMonth = async (id_month, id_user_profiles) => {
    console.log(
      "__________________________________________________________-",
      id_month,
      id_user_profiles
    );
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("id_month", id_month);
      formData.append("id_user_profiles", id_user_profiles);
      const res = await axios({
        url: API.checkIsDoneMilestoneMonth(),
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer` + accessToken,
        },
      });
      if (res.data.status) {
        setDataCheckVoucher(res.data.data);
      }
    } catch (error) {
      console.log("Lỗi nhận voucher milestones theo tháng! ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addMilestonWithMonthBaby = async () => {
    try {
      let formData = new FormData();
      formData.append("id_user_profiles", String(selectedBaby?.id));
      formData.append("id_month", idChoose);
      const res = await profileApi.addMilestonWithMonthBaby(formData);
      if (res.status) {
        console.log(res.data);
        checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
      } else {
        alert("có lỗi xảy ra");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // @ts-ignore
  const checkMilesIsDone = (id_milestones) => {
    if (!!dataMilestMonth && dataMilestMonth.length > 0) {
      const obj = dataMilestMonth.find(
          // @ts-ignore
        (data) => data.id_activity_milestones === id_milestones
      );
      if (obj) {
        // @ts-ignore
        let checkResult = obj.status == 1 ? true : false;
        if (!checkResult) {
          return false;
        }
        return checkResult;
      }
    } else {
      return false;
    }
  };
  // React.useEffect(() => {
  //   checkSetup(selectedBaby?.id);
  // }, [isCheckSetup, idChoose, selectedBaby]);
  React.useEffect(() => {
    if (idChoose) {
      checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
      getMilestonesInMonth(idChoose, selectedBaby?.id);
      getDetailDataMonth();
    }
  }, [idChoose]);
  React.useEffect(() => {
    getDataMonthChoose();
  }, [selectedBaby]);
  React.useEffect(() => {
    addMilestonWithMonthBaby();
  }, [selectedBaby, idChoose]);
  return (
    <div className="w-screen h-screen bg-white">
      <div
        className="bg-[#01B2FF] pt-14 pb-4"
        style={{
          backgroundImage: `url(${Images.bgHeader})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        {/* header  */}
        <div className="flex items-center px-2">
          <div className="relative px-2">
            <div
              className="w-12 h-12 flex items-center justify-center"
              onClick={() => navigate(-1)}
            >
              <img
                src={Images.iconHomeBack}
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <div
            className="w-full flex flex-col items-center justify-center pr-12"
              // @ts-ignore
            onClick={() => refListBaby.current?.setShow(true)}
          >
            <div className="flex items-center">
              <p className="text-center ptext-base  font-bold p text-white p">
                {selectedBaby?.name}
              </p>
              <img
                src={Images.iconArrowDownWhite}
                className="w-3 h-4 object-contain ml-2"
              />
            </div>
            <p className="text-center text-xs  text-white">
              {/*// @ts-ignore*/}
              {showAgeByMonth(selectedBaby?.realAge) || "0 tuổi"}
            </p>
          </div>
        </div>
      </div>
      {/* danh sách các tháng */}
      {selectedBaby?.realAge === 0 ? (
        <p className="text-base font-medium  text-[#01B2ff] text-center mt-2 mx-2">
          Tính năng 'Cột Mốc' sẽ sẵn sàng khi bé của bạn đạt đến 1 tháng tuổi.
          Hãy tận hưởng những khoảnh khắc đáng yêu cùng bé nhé!
        </p>
      ) : (
        <>
          {" "}
          <div className="header-tab-milestones flex">
            <div
              className="flex flex-col  bg-opacity-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white z-40 justify-center items-center px-2  "
              style={{ height: 60 }}
              onClick={() => {
                // @ts-ignore
                ref.current?.slidePrev();
              }}
            >
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                <path
                  d="M7.49807 1.47177L2.87991 6.02338L7.42144 10.6515L5.99972 12.0496L0.0500116 5.99976L6.09989 0.0500498L7.49807 1.47177Z"
                  fill="#F26091"
                />
                <path
                  d="M7.49807 1.47177L2.87991 6.02338L7.42144 10.6515L5.99972 12.0496L0.0500116 5.99976L6.09989 0.0500498L7.49807 1.47177Z"
                  fill="#01B2FF"
                />
              </svg>
            </div>
            <Swiper
              onSwiper={(swiper) => {
                // @ts-ignore
                ref.current = swiper;
              }}
              slidesPerView={3}
              spaceBetween={2}
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "#FFF",
              }}
            >
              {!!dataMonth &&
                dataMonth.map((item, index) => {
                  return (


                    <SwiperSlide
                      onClick={() => {

                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        [
                          handleChooseMonth(item, index),
                          // @ts-ignore
                          setIdChoose(item.id),
                          // @ts-ignore
                          checkIsDoneMilestoneMonth(item?.id, selectedBaby?.id),
                        ];
                      }}
                      style={
                        index + 1 === idChoose
                          ? {
                              backgroundColor: "#01B2FF",
                            }
                          : {
                              backgroundColor: "#fff",
                            }
                      }
                        // @ts-ignore
                      key={item.id}
                      className="flex flex-col justify-center items-center"
                    >
                      <div
                        className="  flex flex-col  justify-center items-center h-full"
                        style={
                          {
                            // borderWidth: index === indexSize ? 1 : 0,
                          }
                        }
                        onClick={() => {
                          // setIndexSize(index);
                          // setSize(item.id);
                        }}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <p
                            className="text-[10px] font-normal"
                            style={
                              index + 1 === idChoose
                                ? {
                                    color: "#fff",
                                  }
                                : {
                                    color: "#4F4F4F",
                                  }
                            }
                          >
                            {/*// @ts-ignore*/}
                            {item?.name}
                          </p>
                          <p
                            className="text-[10px] font-normal"
                            style={
                              index + 1 === idChoose
                                ? {
                                    color: "#fff",
                                  }
                                : {
                                    color: "#4F4F4F",
                                  }
                            }
                          >
                            tháng tuổi
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div
              className="flex flex-col  bg-opacity-10  justify-center items-center px-2  shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white z-40"
              style={{ height: 60 }}
              onClick={() => {
                // @ts-ignore
                ref.current?.slideNext();
              }}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path
                  d="M0 10.5705L4.61319 5.98897L0 1.40741L1.42022 0L7.4637 5.98897L1.42022 11.9779L0 10.5705Z"
                  fill="#F26091"
                />
                <path
                  d="M0 10.5705L4.61319 5.98897L0 1.40741L1.42022 0L7.4637 5.98897L1.42022 11.9779L0 10.5705Z"
                  fill="#01B2FF"
                />
              </svg>
            </div>
          </div>
          <Page className="pb-[80px] " hideScrollbar>
            {idChoose !== null &&
            // isCheckSetup !== null &&
            selectedBaby !== undefined &&
            dataDetail !== undefined ? (
              isLoading === true ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner visible />
                </div>
              ) : (
                <DetailMilestones
                  data={dataDetail}
                  dataCheckVoucher={dataCheckVoucher}
                  handleSetIdListVideo={handleSetIdListVideo}
                  isOpenVd={isOpenListVideo}
                  updateMileston={updateMileston}
                  checkMilesIsDone={checkMilesIsDone}
                  selectedBaby={selectedBaby}
                  accessToken={accessToken}
                />
              )
            ) : (
              <div className="flex flex-col flex-1 justify-center items-center">
                <p className="w-[80%] text-center text-base font-bold text-[#3A7EE6]">
                  AI đang tính toán cột mốc cho bé hiện tại! Vui lòng đợi!
                </p>
              </div>
            )}
          </Page>
        </>
      )}
      {showAlert === true ? (
        <ModaNotify
          description={description}
          setPopupVisible={setShowAlert}
          popupVisible={showAlert}
        />
      ) : null}
      <ShowListBaby ref={refListBaby} />
    </div>
  );
};

export default Milestones;
