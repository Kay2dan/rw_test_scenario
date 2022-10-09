import { FormProvider, useFieldArray, useForm } from "react-hook-form";
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
const GoalsEditor: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  // TODO: User Redwood form which is based on RHF
  const ctx = useForm({
    mode: "onChange",
    // resolver: zodResolver(schemaZod),
    // defaultValues: initialValues,
  });
  const { control, trigger, reset, getValues } = ctx;

  return (
    <div className="goalFormContentParent">
      {/* <DevTool control={control} placement={"bottom-right"} /> */}
      <FormProvider {...ctx}>
        <form
          className="flex flex-col lg:flex-row  h-full"
          onSubmit={() => { }}>
          {children}
        </form>
      </FormProvider>
    </div>
  );
};

export default GoalsEditor;
