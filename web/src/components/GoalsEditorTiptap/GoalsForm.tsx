import { FC, useCallback, useEffect, useState } from "react";
import { Extension, mergeAttributes, Node } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import GoalFormNodeExtension from "./GoalFormNode";
import GoalFormTitleNodeExtension from "./GoalFormTitleNode";
import TaskFreqNodeExtension from "./GoalFormTaskFreqNode";
import { CL, za, zb, zc } from "../../utilities/logger";

const placeholderGoalTitle = "Type a new goal title... (max 50 chars)";
const placeholderFreqTask = " Type a new frequent task... (max 50 chars)";

/********************************************
 ********************************************
 *
 ********************************************
 *******************************************/
const ExtensionForPos = Extension.create({
  name: "pos",
  priority: 201,
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          pos: {
            default: 0,
          },
        },
      },
    ];
  },
});

/********************************************
 ********************************************
 * Custom Heading
 ********************************************
 *******************************************/
const CustomDocument = Document.extend({
  content: "goalForm*",
});

/********************************************
 ********************************************
 * The template
 ********************************************
 *******************************************/
const GoalsForm: FC = ({ }) => {
  // const userGoal = useRecoilValue(userGoalsSt);
  let content =
    "<goalForm><goalFormTitle>Some existing goal<goalFormTitle></goalFormTitle>";
  // let content =
  // "<goalForm><goalFormTitle>Some existing goal<goalFormTitle><goalFormIntro> </goalFormIntro></goalFormTitle>";  // userGoal.forEach(g => (content += `<p>${g.title}</p>`));

  const editor = useEditor({
    autofocus: "end",
    content: content,
    editable: true,
    extensions: [
      StarterKit.configure({
        orderedList: false,
        blockquote: false,
        bulletList: false,
        codeBlock: false,
        document: false,
        listItem: false,
        heading: {
          levels: [3],
          HTMLAttributes: {
            class: "goalTitle",
          },
        },
      }),
      Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        emptyNodeClass: "isEmpty",
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return placeholderGoalTitle;
          }
          if (node.type.name === "paragraph") {
            return placeholderFreqTask;
          }
        },
      }),
      CustomDocument,
      GoalFormTitleNodeExtension,
      GoalFormNodeExtension,
      TaskFreqNodeExtension,
      // ExtensionForPos,
    ],
  });

  return <EditorContent editor={editor} />;
};

export default GoalsForm;

      // Extension.create({
      //   onUpdate({ editor }) {
      //     CL(za, 'on update: editor:', editor);
      //   },

      //   onTransaction({ editor, transaction }) {
      //     CL(za, 'on transaction:', transaction);
      //   },

      //   onSelectionUpdate({ editor }) {
      //     CL(za, 'on editor selection update:', editor);
      //   },

      // }),
