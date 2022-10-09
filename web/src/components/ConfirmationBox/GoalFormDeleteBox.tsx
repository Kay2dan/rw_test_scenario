import { FC, useEffect, useRef } from "react";
import BtnDefault from "../Btn/BtnDefault";
import ConfirmationBox from "./ConfirmationBox";

export interface GoalFormDeleteBoxFCPropTypes {
  index: number;
  removeForm: (index: number) => void;
  setShowConfirmBoxBeforeDelete: (stateTo: boolean) => void;
}

const GoalFormDeleteBox: FC<GoalFormDeleteBoxFCPropTypes> = ({
  index,
  removeForm,
  setShowConfirmBoxBeforeDelete,
}) => {
  // const setOverlay = useSetRecoilState(overlaySt);
  const refParent = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      refParent.current &&
      refParent.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
  );

  const confirmGoalDelete = () => {
    window.scrollTo(0, 0);
    // setOverlay(["none"]);
    removeForm(index);
    setShowConfirmBoxBeforeDelete(false);
  };

  const cancelDelete = () => {
    // setOverlay(["none"]);
    setShowConfirmBoxBeforeDelete(false);
  };

  return (
    <ConfirmationBox onClickHandlers={[cancelDelete]}>
      <div ref={refParent}>
        <h3 className="text-center mt-14 mb-8">Confirm to delete the goal</h3>
        <div className="flex justify-center">
          <BtnDefault
            parentClasses="mb-8"
            classes="btn lg mr-9"
            onClickHandler={confirmGoalDelete}
          >
            <span>Confirm</span>
          </BtnDefault>
          <BtnDefault
            parentClasses="mb-8"
            classes="btn lg outlined"
            onClickHandler={cancelDelete}
          >
            <span>Cancel</span>
          </BtnDefault>
        </div>
      </div>
    </ConfirmationBox>
  );
};

export default GoalFormDeleteBox;
