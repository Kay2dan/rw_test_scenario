import { FC, useContext, useEffect, useRef, useState } from "react";
// import { BtnDefault, Tooltip } from "app/components";
// import { ContextIsGoalGuideOpen } from "app/components/Editor/Editor";
import BtnDefault from "../Btn/BtnDefault";

/*******************************
 * *****************************
 *
 *******************************
 ******************************/
const AddANew: FC<any> = ({ append }) => {
  // const { isGuideOpen, setIsGuideOpen } = useContext(ContextIsGoalGuideOpen);
  const addNewGoalForm = () =>
    append({
      title: "",
      intro: "",
      type: "ONEOFF",
      deadline: null,
      task: [
        {
          content: "",
          dayFrequency: 0,
          weekFrequency: 0,
        },
      ],
    });

  return (
    <div className="goalBox addBtnBox">
      <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <BtnDefault
          id="anAddGoalBtn"
          parentClasses="my-2"
          classes="lg lgToTiny"
          onClickHandler={addNewGoalForm}>
          <div className="flex items-center">
            <span>Add a Goal</span>
            {/* <Tooltip arrowDir="left" parentCls="w-max">
                <p className="text-xxs lg:text-base font-medium normal-case">{`This is a target, an objective, you want to focus on, over the next three weeks .`}</p>
              </Tooltip> */}
          </div>
        </BtnDefault>
        <a
          href="#"
          // onClick={() => setIsGuideOpen(true)}
          className="self-end text-glossyGrape text-xxs sm:text-xs xl:text-base pr-4 sm:pr-6 pb-2">
          Need help to define goals?
        </a>
      </div>
    </div>
  );
};

export default AddANew;
