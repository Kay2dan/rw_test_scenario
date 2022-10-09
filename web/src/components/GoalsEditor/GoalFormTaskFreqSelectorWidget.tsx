import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import BtnDefault from "../Btn/BtnDefault";
import Delete from "../Btn/Delete";
import { iconHelp } from "../../utilities/svgs";
// import { validateTaskFreq } from "app/utilities/validation";

const GoalTaskFreqSelectorWidget = ({
  goalIndex,
  taskIndex,
  fieldArrayName,
  toggleFreqSelector,
}: {
  goalIndex: number;
  taskIndex: number;
  fieldArrayName: string;
  toggleFreqSelector: (index: number) => void;
}) => {
  const [showFrontSlide, setShowFrontSlide] = useState(true);
  const { register, getValues, setValue } = useFormContext();
  const task = getValues(`${fieldArrayName}.${taskIndex}`);

  const closeHandler = () => {
    // const [updateFormFlag, newTask] = validateTaskFreq("FREQUENT", task);
    // if (updateFormFlag) {
    //   setValue(`${fieldArrayName}.${taskIndex}`, newTask);
    // }
    // toggleFreqSelector(taskIndex);
  };

  const onBlurValidate = () => {
    // const [updateFormFlag, newTask] = validateTaskFreq("FREQUENT", task);
    // if (updateFormFlag) {
    //   setValue(`${fieldArrayName}.${taskIndex}`, newTask);
    // }
  };

  return (
    <div className="ppopupFormSelector scene">
      <div className={`slideContainer ${!showFrontSlide && "animFlip"}`}>
        <div className="slideFace freqSelectorParent">
          <h3 className="text-center font-bold px-3 md:px-20 lg:pl-10 mt-2 md:mt-7 mb-2 md:mb-4">
            {/* How often to repeat the task: */}
            Task Repetition:
          </h3>
          <p className="text-xxs sm:text-xs xl:text-base mb-4 text-gray">
            How often to repeat the task. Input a number, `0` for a one-off
            task.
          </p>
          <div className="taskCtrlParent">
            <div className="ctrls">
              <Delete cls="right-0 w-6 h-6" onClickHandler={closeHandler} />
              <div
                className="iconTasksHelp"
                onClick={() => setShowFrontSlide(!showFrontSlide)}>
                <svg viewBox={iconHelp.viewBox} className="iconHoverFill">
                  {iconHelp.paths.map((p, i) => (
                    <path d={p.d} className={`fill-${p.className}`} key={i} />
                  ))}
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-around items-start my-4">
            <div className="inlineField mb-2 lg:mb-0">
              <input
                min={0}
                max={5}
                step={1}
                type="number"
                defaultValue={task.dayFrequency || 0}
                className="text-xxs lg:text-xs"
                // onBlur={onBlurValidate}
                // onInput={onBlurValidate}
                {...register(`${fieldArrayName}.${taskIndex}.dayFrequency`)}
              />
              <div className="flex flex-col text-xxs sm:text-xs xl:text-base text-left ml-4">
                <span>times/ day</span>
                <span> (max.5)</span>
              </div>
            </div>
            <div className="inlineField ml-4">
              <input
                min={0}
                max={7}
                step={1}
                type="number"
                defaultValue={task.weekFrequency || 0}
                className="text-xxs lg:text-xs"
                // onBlur={onBlurValidate}
                {...register(`${fieldArrayName}.${taskIndex}.weekFrequency`)}
              />
              <div className="flex flex-col text-xxs sm:text-xs xl:text-base text-left ml-4">
                <span>days/ week</span>
                <span> (max.7)</span>
              </div>
            </div>
          </div>
          <BtnDefault
            parentClasses="my-6 lg:my-8 text-center"
            classes="sm"
            onClickHandler={closeHandler}>
            <span>Update</span>
          </BtnDefault>
        </div>
        <HowToUseGuide
          closeHandler={closeHandler}
          slideState={{ showFrontSlide, setShowFrontSlide }}
        />
      </div>
    </div>
  );
};

/***********************************************
 *
 ***********************************************/
export const HowToUseGuide = ({ closeHandler, slideState }) => {
  const { showFrontSlide, setShowFrontSlide } = slideState;
  return (
    <div className="slideFace slideBack">
      <h3 className="text-center font-bold mx-10 mt-7 mb-3">How to use:</h3>
      <p className="text-xxs lg:text-xs mb-4 text-gray text-left">
        {`- In the 'times/ day' field, define how frequently to perform this task in a DAY. Value must be (0 - 5).`}
      </p>
      <p className="text-xxs lg:text-xs mb-4 text-gray text-left">
        {`- In the 'days/ week' field, define how frequently to perform this task in a WEEK. Value must be (0 - 7).`}
      </p>
      <p className="text-xxs lg:text-xs mb-4 text-gray text-left">
        {`- Type '0' to make it a one-off (perform only once) task.`}
      </p>
      <p className="text-xxs lg:text-xs mb-4 text-gray text-left">
        {`- Refer to the help section for more detail.`}
      </p>
      <div className="taskCtrlParent">
        <div className="ctrls">
          <Delete cls="right-0 w-6 h-6" onClickHandler={closeHandler} />
          <div
            className="iconTasksHelp"
            onClick={() => setShowFrontSlide(!showFrontSlide)}>
            <svg viewBox={iconHelp.viewBox} className="iconHoverFill">
              {iconHelp.paths.map((p, i) => (
                <path d={p.d} className={`fill-${p.className}`} key={i} />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTaskFreqSelectorWidget;
