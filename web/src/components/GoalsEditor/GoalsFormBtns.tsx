import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import useInterval from "app/hooks/useInterval";
// import BtnDefault from "@components/Btn/BtnDefault";
import { BtnDefault } from "../index";
// import { iconSave, iconTeamMateSearch } from "@utilities/svgs";
import { iconSave, iconTeamMateSearch } from "../../utilities/svgs";
import { CL, zb, zc, zd } from "@utilities/logger";

/*******************************
 * *****************************
 * Component that renders the buttons for the goals form
 *******************************
 ******************************/
const GoalsFormBtns: FC<{
  // areGoalsSavedState: boolean;
  // teamStartDate: Date | undefined;
  // submitHandler: () => void;
}> = ({
  // areGoalsSavedState, teamStartDate, submitHandler
}) => {

    // let findTMBtnState = "";
    // if (teamStatus || !areGoalsSavedState) {
    //   findTMBtnState = "disabled";
    // }

    // //                                   text to show in find-a-team-mate btn tooltip
    // let tooltipTxt = `Add min. 2 goals, then save, to enable`;
    // if (teamStatus) tooltipTxt = `You are already in a team`;
    // // if (!user.isVerified) {
    // //   tooltipTxt = `Please verify your account through the email we sent you`;
    // // }

    // const InviteOnClickHandler = () => {
    //   if (findTMBtnState !== "disabled") {
    //     teamStatus || setOverlayState(["consentForm"]);
    //   }
    // };

    return (
      <div className="mt-auto mb-4">
        <div className="flex justify-around lg:justify-end gap-4 lg:gap-6 mt-8 lg:mt-0">
          <BtnSaveGoals submitHandler={() => { }} />
        </div>
      </div>
    );
  };

/*******************************
 * *****************************
 * Btn to save goals
 *******************************
 ******************************/
const BtnSaveGoals: FC<{
  submitHandler: () => void;
}> = ({ submitHandler }) => {
  const [lastSaved, setLastSaved] = useState<Date | false>(false);
  const [sinceLastSave, setSinceLastSave] = useState<string | false>(false);
  const [focusEle, setFocusEle] = useState<string | false>(false);
  const {
    watch,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext();
  const goals = watch("goals");

  const isFormInvalid =
    isSubmitting ||
      goals?.length < 2 ||
      goals?.filter(g => {
        if (g?.title?.length <= 3) {
          return true;
        }
      }).length > 0
      ? true
      : false;

  let btnTxt = "save";
  if (isSubmitting) {
    btnTxt = "saving...";
  }

  let state = false;
  if (isDirty && goals?.length >= 2 && !isFormInvalid) {
    state = true;
  }

  // useInterval(async () => {
  //   if (
  //     isValid &&
  //     isDirty &&
  //     !isSubmitting &&
  //     goals.filter(g => g?.title?.length >= 3).length >= 2
  //   ) {
  //     const activeEle = document.activeElement;
  //     // CL(zb, "saving...", isValid, isDirty);
  //     await submitHandler();
  //     setLastSaved(new Date());
  //     activeEle.nodeName === "INPUT" && setFocusEle(activeEle.id);
  //     // reset({ goals }, { keepValues: true });
  //     // if (activeEle.nodeName === "INPUT") {
  //     //   document.getElementById(activeEle.id).focus();
  //     // }
  //   }
  // }, 1000 * 60); // 1000 * 60

  //                                   calc time since last save
  // useInterval(() => {
  //   if (lastSaved) {
  //     setSinceLastSave(
  //       formatDistanceToNow(lastSaved as Date, {
  //         includeSeconds: true,
  //       })
  //     );
  //   }
  // }, 1000 * 30);

  //                                  focus on input after save
  useEffect(() => {
    if (focusEle) document.getElementById(focusEle)?.focus();
  }, [focusEle]);

  return (
    <div className="flex flex-col text-xxs text-gray text-center">
      <BtnDefault
        type="button"
        parentClasses={`relative ${state ? "highlight" : ""}`}
        id="anSaveGoalBtn"
        classes={`md ${isFormInvalid ? "noHover off" : ""}`}
        disabled={isFormInvalid}
        onClickHandler={submitHandler}>
        <div className="flex justify-evenly items-center">
          <svg viewBox={iconSave.viewBox} className="w-6 h-6">
            {iconSave.paths.map((p, i) => (
              <path d={p.d} className={`fill-${p.className}`} key={i} />
            ))}
          </svg>
          {/* <span className="hidden lg:block ml-3">{btnTxt}</span> */}
          <span className="ml-3">{btnTxt}</span>
          {/* {isFormInvalid ? (
            <Tooltip arrowDir="left" parentCls="w-max">
              <p className="text-xxs lg:text-base font-medium normal-case">
                Add min. of 2 goals to save
              </p>
            </Tooltip>
          ) : null} */}
        </div>
      </BtnDefault>
      {sinceLastSave ? (
        <span className="mt-1">{`save: ${sinceLastSave} ago`}</span>
      ) : null}
    </div>
  );
};

// BtnSaveGoals.whyDidYouRender = true;

export default GoalsFormBtns;

/*******************************
 * *****************************
 * Btn for dropdown menu for Goal or Chore
 *******************************
 ******************************/
// const BtnForGoalOrChore: FC<any> = ({ appends }) => {
//   return (
//     <div className="btnsEditParent">
//       <BtnDefault classes="btnEditAdd lg lgToTiny" parentClasses="">
//         <div className="flex justify-evenly items-center">
//           <svg viewBox={iconAdd.viewBox} className="w-5 h-5">
//             {iconAdd.paths.map((p, i) => (
//               <path d={p.d} className={`fill-${p.className}`} key={i} />
//             ))}
//           </svg>
//           <span className="hidden lg:block ml-3">Add A...</span>
//           <svg
//             viewBox={iconChevron.viewBox}
//             className="w-3 md:w-5 h-3 md:h-5 ml-2 md:ml-4">
//             <path
//               d={iconChevron.paths[0].d}
//               className={`stroke-oldLace fill-transparent`}
//             />
//           </svg>
//         </div>
//       </BtnDefault>
//     </div>
//   );
// };
