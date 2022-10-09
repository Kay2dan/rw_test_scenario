import { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import cloneDeep from "lodash.clonedeep";
// import { GoalForm } from "@components/index";
import GoalFormAddNew from "./GoalFormAddNew";
import GoalForm from "./GoalForm";
import { CL, za, zb, zc } from "@utilities/logger";

/*********************************************
 *********************************************
 // Schema
 *********************************************
 *********************************************/
// export const schemaZod = z.object({
//   goals: z
//     .object({
//       title: z
//         .string()
//         .min(3, "Title must be atleast 3 characters.")
//         .max(50, "Title must be less than 50 characters"),
//       intro: z.string().max(250, "Max. of 250 characters.").optional(),
//       deadline: z.string().or(z.date()).optional(),
//       task: z
//         .object({
//           content: z
//             .string()
//             .min(3, "Each task must be min. 3 characters.")
//             .max(50, "Each task must be less than 50 characters"),
//           dayFrequency: z.number().min(0, "Min. 0").max(5, "Max. 5").optional(),
//           weekFrequency: z
//             .number()
//             .min(0, "Min. 0")
//             .max(7, "Max. 7")
//             .optional(),
//         })
//         .array()
//         .min(1),
//     })
//     .array()
//     .min(2),
// });

/********************************************
 ********************************************
 *
 ********************************************
 *******************************************/
const GoalsForm: FC<{}> = ({ }) => {
  const { control, trigger, reset, getValues } = useFormContext();

  const {
    fields: glFields,
    append: glAppend,
    remove: glRemove,
  } = useFieldArray({
    name: "goals",
    control: control,
    shouldUnregister: true,
  });

  const addGoalForm = useCallback(() => {
    glAppend({
      title: "",
      intro: "",
      deadline: "",
      type: "ONEOFF",
      task: [],
    });
  }, [glAppend]);

  // Deletes a Goal box
  const removeGoalForm = async index => {
    try {
      glRemove(index);
      // const goalId = userGoal[index]?.id;
      // if (goalId) {
      //   const isDeleted = await deleteGoalMutation(goalId);
      //   if (isDeleted instanceof Error) throw isDeleted;
      // setQueryData(
      //   getUserGoals,
      //   null,
      //   old => ({
      //     ...old,
      //     goal: old.goal.filter(g => g.id !== goalId),
      //   }),
      //   { refetch: false }
      // );
      // }
    } catch (err) {
      // addToNotifs({
      //   type: "error",
      //   message: err,
      //   notifData: { ownerType: "user", isFE: true },
      // });
    }
  };

  // add new goalform if existing forms count < 2
  useLayoutEffect(() => {
    if (glFields.length === 0) {
      addGoalForm();
      addGoalForm();
    } else if (glFields.length === 1) {
      addGoalForm();
    }
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div className="goalsFormFieldsParent">
      <div className="w-full lg:w-3/5 lg:mr-8">
        {/* <div className="block lg:grid lg:grid-cols-2 lg:gap-8"> */}
        <div className="block">
          {glFields.map((item, i) => (
            <GoalForm
              index={i}
              item={item}
              // teamStartDate={teamStartDate}
              removeGoalForm={removeGoalForm}
              key={item.id}
            />
          ))}
          <GoalFormAddNew append={glAppend} />
        </div>
      </div>
    </div>
  );
};

export default GoalsForm;
