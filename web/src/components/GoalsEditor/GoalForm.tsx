import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import GoalFormSwitch from "./GoalFormSwitch";
// import LabeledTextArea from "@components/FormFields/LabeledTextArea";
import GoalFormSwitch from "./GoalFormSwitch";
import GoalFormTasks from "./GoalFormTasks";
import GoalFormDeleteBox from "./GoalFormDeleteBox";
import LabeledTextArea from "../FormFields/LabeledTextArea";
import { iconBin } from "../../utilities/svgs";

let tErrTxt =
  "Tasks should be between 3 & 50 characters. Please check task number";
export interface GoalFormFCPropTypes {
  item: any;
  index: number;
  // teamStartDate: Date | undefined;
  removeGoalForm: (index: number) => void;
}

/*******************************
 * *****************************
 * GoalForm for each goal
 *******************************
 ******************************/
const GoalForm: React.FC<GoalFormFCPropTypes> = ({
  item,
  index,
  // teamStartDate,
  removeGoalForm,
}) => {
  const {
    formState: { errors },
    register,
    setFocus,
    getValues,
  } = useFormContext();
  const [showConfirmBoxPreDelete, setShowConfirmBoxPreDelete] = useState(false);
  const goalErr = errors?.goals?.[index];

  useEffect(() => {
    if (item.title.length === 0) {
      setFocus(`goals[${index}].title`);
    }
  }, [item.title, setFocus, index]);

  const deleteClickHandler = () => {
    window.scrollTo(0, 0);
    // setOverlay(["empty", "", () => setShowConfirmBoxPreDelete(false)]);
    setShowConfirmBoxPreDelete(true);
  };

  return (
    <div className="goalBox" key={item.id}>
      <h3 className="">
        <span>{`Goal No. ${index + 1}: `}</span>
        <span className="">
          {`${getValues(`goals[${index}].type`)?.toLowerCase()}`}
        </span>
      </h3>
      <div className="">
        <label htmlFor="title" className="label">
          <span>title: </span>
          <span className="req">*</span>
        </label>
        <div className="">
          <input
            id="title"
            type="text"
            minLength={3}
            maxLength={50}
            defaultValue={item.title}
            placeholder={`[required] What is the goal heading? Max. 50 characters.`}
            className=""
            {...register(`goals.${index}.title`)}
          />
          <GoalFormSwitch index={index} />
        </div>
      </div>
      <LabeledTextArea
        label="Intro:"
        maxLength={250}
        defaultValue={item.intro}
        name={`goals.${index}.intro`}
        placeholder={`[optional] Why is this goal important to you?`}
        labelClasses="label"
        textareaClasses=""
        outerProps={{
          className: "",
        }}
      />
      {getValues(`goals[${index}].type`)?.toLowerCase() === "frequent" ? (
        <GoalFormTasks index={index} fieldArrayName={`goals.${index}.task`} />
      ) : false}
      <div className="goalBoxIconBin" onClick={deleteClickHandler}>
        <svg viewBox={iconBin.viewBox} className="">
          {iconBin.paths.map((p, i) => (
            <path d={p.d} className={`fill-${p.className}`} key={i} />
          ))}
        </svg>
      </div>
      {showConfirmBoxPreDelete && (
        <GoalFormDeleteBox
          index={index}
          removeForm={removeGoalForm}
          setShowConfirmBoxBeforeDelete={setShowConfirmBoxPreDelete}
        />
      )}
      {/* Disabling the errors because of bugs */}
      <GoalFormError errState={goalErr} />
    </div>
  );
};

/*******************************
 * *****************************
 * Component to render the error state of the GoalForm
 *******************************
 ******************************/
const GoalFormError: FC<any> = ({ errState }) => {
  let tErrStr = `${tErrTxt}: `;
  errState?.task?.length &&
    errState?.task?.forEach((t, i) => {
      if (t?.content) {
        tErrStr = `${tErrStr} ${i + 1},`;
      }
    });
  return (
    <ul className="">
      {errState?.title?.message.length ? (
        <li>{`Goal Title ${errState.title?.message.toLowerCase()}`}</li>
      ) : null}
      {errState?.task?.length > 0 ? <li>{`${tErrStr}`}</li> : null}
    </ul>
  );
};

export default GoalForm;
