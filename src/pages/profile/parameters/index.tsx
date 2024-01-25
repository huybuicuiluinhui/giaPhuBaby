import React, { useContext, useEffect, useRef } from "react";
import { Box, Page, Spinner} from "zmp-ui";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { AppContext } from "../../../contexts/app.context";
import API from "../../../api";
import Images from "../../../static";
import ShowListBaby from "../../../components/showListBaby";
import { getAccessTokenFromLS } from "../../../utils/auth";
import { showAgeByMonth } from "../../../module";
import DetailParameters from "./detailParameters";
import { useLocation } from "react-router-dom";
import ModaNotify from "../../../components/modaNotify";
const Parameters = () => {
  const { selectedBaby } = useContext(AppContext);
  const [idChoose] = React.useState<any>(selectedBaby?.realAge);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  const state = location.state;
  const [showAlert, setShowAlert] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const idCategory = location?.state?.id_category;
  const refListBaby = React.useRef(null);
  const accessToken = getAccessTokenFromLS();
  const [dataDetailParameters, setDataDetailParameters] = React.useState();
  const [dataMilestMonth, setDataMilestMonth] = React.useState([]);
  const [isOpenListVideo, setIsOpenListVideo] = React.useState("0");
  // @ts-ignore
  const handleSetIdListVideo = (id, idMileston) => {
    setIsOpenListVideo(`${id}` + `${idMileston}`);
  };

  const getDataParameters = async () => {
    setIsLoading(true);
    if (!!idChoose && !!selectedBaby?.id && !!idCategory) {
      try {
        let formData = new FormData();
        formData.append("id_month", idChoose);
        // @ts-ignore
        formData.append("id_user_profiles", selectedBaby?.id);
        formData.append("id_category", idCategory);

        const res = await axios({
          url: API.getDataParameters(),
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.data?.status) {
          setDataDetailParameters(res?.data?.data?.result);
        }
      } catch (error) {
        console.log("Lỗi nhận voucher milestones theo tháng! ");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Lỗi dữ liệu");
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
        // checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
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
  React.useEffect(() => {
    // checkIsDoneMilestoneMonth(idChoose, selectedBaby?.id);
    getMilestonesInMonth(idChoose, selectedBaby?.id);
  }, [idChoose, selectedBaby?.id]);
  React.useEffect(() => {
    getDataParameters();
  }, [idChoose, selectedBaby?.id, idCategory]);

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
      {/* Hiển thị chi tiết của tháng */}
      <Page className="pb-[80px] " hideScrollbar>
        {idChoose !== null && selectedBaby !== undefined ? (
          isLoading === true ? (
            <div className="flex items-center justify-center w-full">
              <Spinner visible />
            </div>
          ) : (
            <DetailParameters
              data={dataDetailParameters}
              handleSetIdListVideo={handleSetIdListVideo}
              isOpenVd={isOpenListVideo}
              updateMileston={updateMileston}
              checkMilesIsDone={checkMilesIsDone}
              selectedBaby={selectedBaby}
              accessToken={accessToken}
              idCategory={idCategory}
              state={state}
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

export default Parameters;
