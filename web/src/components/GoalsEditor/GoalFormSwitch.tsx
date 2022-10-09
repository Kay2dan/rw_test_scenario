import React from "react";
import { useFormContext } from "react-hook-form";
// import Switch from "@components/Switch/Index";
import Switch from "../Switch/Switch";

export interface GoalFormSwitchFCPropTypes {
  index: number;
}

export const GoalFormSwitch = ({ index }) => {
  const { register, setValue, getValues } = useFormContext();
  const goalType = getValues(`goals[${index}].type`);

  const switchVals: [string, string] = ["1-Off", "Freq."];

  const onClickHandler = val => {
    setValue(`goals.${index}.type`, val === "1-Off" ? "ONEOFF" : "FREQUENT");
  };

  return (
    <div className="field">
      <input type="hidden" readOnly {...register(`goals.${index}.goalType`)} />
      <Switch
        values={switchVals}
        defaultIndex={goalType === "ONEOFF" || goalType === undefined ? 0 : 1}
        clickHandler={onClickHandler}
      />
    </div>
  );
};

export default GoalFormSwitch;
