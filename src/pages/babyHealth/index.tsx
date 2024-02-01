import React, { useContext, useEffect, useRef } from "react";
import "./styles.css";
import Images from "../../static";
import WeightTab from "./weightTab";
import HeightTab from "./heightTab";
import Header from "../../components/header";
import Utilities from "../../utils/Utilities";
import { AppContext } from "../../contexts/app.context";
import { useLocation } from "react-router-dom";
const BabyHealth = () => {
  const { state } = useLocation();
  const [choose, setChoose] = React.useState(0);
  const [dataTab, setDataTab] = React.useState<[]>();
  const refScroll = useRef(null);
  const { selectedBaby } = useContext(AppContext);
  const WIDTH_WINDOW = window.innerWidth;
  const handleTabClick = (index: any) => {
    const tabPosition = WIDTH_WINDOW * index;
    // @ts-ignore
    refScroll.current?.scrollTo({
      left: tabPosition,
      behavior: "smooth",
    });
    setChoose(index);
  };

  useEffect(() => {
    if (state?.chooseTab) {
      state.chooseTab === 0 ? handleTabClick(0) : handleTabClick(1);
    }
  }, [state.chooseTab]);
  const tabs = [
    {
      id: 1,
      title:
        dataTab === undefined
          ? null
          : // @ts-ignore
          dataTab[dataTab.length - 1]?.height === undefined
          ? null
          : // @ts-ignore
            dataTab[dataTab.length - 1]?.height,
      unit: "cm",
    },

    {
      id: 2,
      title:
        dataTab === undefined
          ? null
          : // @ts-ignore
          dataTab[dataTab.length - 1]?.weight === undefined
          ? null
          : // @ts-ignore
            dataTab[dataTab.length - 1]?.weight,
      unit: "kg",
    },
  ];

  return (
    <div className="w-screen h-screen bg-white ">
      <div className=" bg-[#e23795] ">
        <Header title="Chiều cao - cân nặng" />
        <div className=" flex justify-between items-center  px-[20px] ">
          <div className="flex flex-col justify-center items-center flex-[0.8]">
            <img src={Images.gender} className="w-[26px] h-11 object-contain" />
            <p className="text-xs text-white ">
              {selectedBaby?.gender === "male" ? "Bé trai" : "Bé gái"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center flex-[2]">
            <img
              src={Images.iconAvatarDefault}
              className="w-[100px] h-[100px] object-contain rounded-full "
            />
            <p className="text-[20px] text-white font-semibold text-center my-2">
              {!!selectedBaby ? ` Bé ${selectedBaby?.name}` : ""}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center flex-[0.8]">
            <img
              src={Images.cakeBirthday}
              className="w-[26px] h-11 object-contain"
            />
            <p className="text-xs text-white ">
              {Utilities.formatDateString(selectedBaby?.dob)}
            </p>
          </div>
        </div>
        <div className="mt-2 h-20 flex px-4 justify-around items-center ">
          {!!tabs &&
            tabs.map((item, index) => {
              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: index === choose ? "#fff" : "#6ECFFA",
                  }}
                  className="w-[30%] h-full rounded-tl-[30px] rounded-tr-[30px] flex flex-col items-center justify-center "
                  onClick={() => {
                    handleTabClick(index);
                  }}
                >
                  <p
                    className=" text-3xl  text-[#6ecff9] font-bold"
                    style={{
                      color: index === choose ? "#6ecff9" : "#fff",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-base  text-[#6ecff9] font-bold"
                    style={{
                      color: index === choose ? "#6ecff9" : "#fff",
                    }}
                  >
                    {item.unit}
                  </p>
                </div>
              );
            })}

          <div
            style={{
              backgroundColor: "#6ECFFA",
            }}
            className="w-[30%] h-full rounded-tl-[30px] rounded-tr-[30px] flex flex-col items-center justify-center "
          >
            <p
              className=" text-base  text-[#6ecff9] font-bold"
              style={{
                color: "#fff",
              }}
            >
              kg/cm
            </p>
          </div>
        </div>
      </div>
      <div
        ref={refScroll}
        className="no-scrollbar h-full w-full "
        style={{
          overflowX: "hidden",
          display: "flex",
          scrollBehavior: "smooth",
        }}
      >
        <div
          className=" no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          {state?.showModalHeight ? (
            <HeightTab
              selectedBaby={selectedBaby}
              showModalHeight={state.showModalHeight}
              setDataParams={(value: any) => setDataTab(value)}
            />
          ) : (
            <HeightTab
              selectedBaby={selectedBaby}
              showModalHeight={false}
              setDataParams={(value: any) => setDataTab(value)}
            />
          )}
        </div>
        <div
          className="no-scrollbar h-full "
          style={{
            flex: `0 0 ${WIDTH_WINDOW}px`,
          }}
        >
          {state?.showModalWeight ? (
            // @ts-ignore
            <WeightTab
              selectedBaby={selectedBaby}
              showModalWeight={state.showModalWeight}
              setDataParams={(value: any) => setDataTab(value)}
            />
          ) : (
            // @ts-ignore
            <WeightTab
              selectedBaby={selectedBaby}
              showModalWeight={false}
              setDataParamsWeight={(value: any) => setDataTab(value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BabyHealth;
