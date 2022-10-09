import { FC, memo } from "react";
import { useFormContext } from "react-hook-form";
import BtnDefault from "../Btn/BtnDefault";

const ttMsg = "Frequency: How often to repeat this task.";

/*******************************
 * *****************************
 * The main goal task form component.
 *******************************
 ******************************/
const GoalFormTaskRgtSide: FC<any> = memo(
  ({ goalIndex, taskIndex, fieldArrayName, toggleFreqSelector }) => {
    const { getValues, register } = useFormContext();
    const goalType = getValues(`goals.${goalIndex}.type`);
    const dFreq: number = Number(
      getValues(`${fieldArrayName}.${taskIndex}.dayFrequency`)
    );
    const wFreq: number = Number(
      getValues(`${fieldArrayName}.${taskIndex}.weekFrequency`)
    );
    const isFreqOr1O = goalType === "FREQUENT" ? true : false;

    const updateTTMsg = isFreqOr1O
      ? `Task Frequency set to ${dFreq} time${dFreq === 1 ? "" : "s"
      } a day & ${wFreq} time${wFreq === 1 ? "" : "s"} every week`
      : `Time estimate to complete the task. Min. = 15min,  Max. = 1hr`;

    return (
      // className={`taskEditorRgtSide ${goalType === "ONEOFF" ? "hidden" : "inline-block"
      <div className={`taskEditorRgtSide`}>
        <div className="freqParent tt tt-t">
          <div className="ttBox text-xxxs sm:text-xs" data-tt={updateTTMsg} />
          {isFreqOr1O ? (
            <BtnDefault
              parentClasses=""
              classes={`freqSelector thin mt-[3px]`}
              onClickHandler={() => toggleFreqSelector(taskIndex)}>
              <div className="flex items-center text-center cursor-pointer">
                <input
                  type="hidden"
                  readOnly
                  {...register(`${fieldArrayName}.${taskIndex}.dayFrequency`)}
                />
                <input
                  type="hidden"
                  readOnly
                  {...register(`${fieldArrayName}.${taskIndex}.weekFrequency`)}
                />
                <div className="text-xxxs sm:text-xxs font-normal">
                  <span>{`${Number(dFreq)}`}</span>
                  <span className="text-oldLace px-1">/</span>
                  <span>{`${Number(wFreq)}`}</span>
                </div>
              </div>
            </BtnDefault>
          ) : (
            <TimeEstimator
              taskIndex={taskIndex}
              fieldArrayName={fieldArrayName}
            />
          )}
        </div>
      </div>
    );
  }
);
// GoalFormTaskRgtSide.whyDidYouRender = {
//   logOnDifferentValues: true,
//   collapseGroups: true,
// };

/*******************************
 * *****************************
 *
 *******************************
 ******************************/
const TimeEstimator: FC<any> = memo(({ taskIndex, fieldArrayName }) => {
  const maxMin = 60;
  const minMin = 15;
  const { setValue, register, watch } = useFormContext();
  const regName = `${fieldArrayName}.${taskIndex}.timeEst`;
  const timeEstVal = watch(regName);

  const onClickHandler = (type: "inc" | "dec") => {
    if (type === "inc" && timeEstVal < maxMin) {
      setValue(regName, Number(timeEstVal) + 15);
    }
    if (type === "dec" && timeEstVal > minMin) {
      setValue(regName, Number(timeEstVal) - 15);
    }
  };

  const clsBtnInc = `px-2 ${timeEstVal >= maxMin ? "isDisable" : ""}`;
  const clsBtnDec = `px-2 ${timeEstVal <= minMin ? "isDisable" : ""}`;

  return (
    <div className="timeEstimator">
      <div
        className={`${clsBtnInc} ctrl border-r border-r-oldLace-80 rounded-l-sm`}
        onClick={() => onClickHandler("dec")}>
        -
      </div>
      <div className="flex flex-row align-middle h-[22px] w-full px-[1px] bg-glossyGrape">
        <input
          readOnly
          min={15}
          max={60}
          step={15}
          type="number"
          defaultValue={15}
          className="numSansCtrl leading-6"
          {...register(`${fieldArrayName}.${taskIndex}.timeEst`)}
        />
        <span className="w-[1.5ch] sm:w-auto leading-6">min</span>
      </div>
      <div
        className={`${clsBtnDec} ctrl border-l border-l-oldLace-80 rounded-r-sm`}
        onClick={() => onClickHandler("inc")}>
        +
      </div>
    </div>
  );
});
export default GoalFormTaskRgtSide;
