import { FC, useEffect, useState } from "react";
import { TextSelection } from "prosemirror-state";
import { mergeAttributes, Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import Switch from "../Switch";
import { CL, za, zb, zc } from "../../utilities/logger";

export interface GoalFormOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    goalForm: {
      /**
       * Toggle a goalform
       */
      setGoalForm: () => ReturnType,
    }
  }
}
const placeholderGoalTitle = "Type a new goal title here... (max 50 chars)";
const placeholderFreqTask = "Enter a new frequent task here... (max 50 chars)";

/********************************************
 ********************************************
 * The extension
 ********************************************
 *******************************************/
export const GoalFormNodeExtension = Node.create({
  name: "goalForm",
  group: "block",
  atom: true,
  priority: 1000,
  // content: "goalFormTitle goalFormIntro taskFreq*",
  // content: "goalFormTitle taskFreq*",
  content: "goalFormTitle",

  // addGlobalAttributes() {
  //   return ([
  //     {
  //       types: [
  //         "heading"
  //       ],
  //       attributes: {
  //         pos: {
  //           default: 0,
  //         }
  //       }
  //     }
  //   ]);
  // },

  addAttributes() {
    return {
      pos: {
        default: 0,
        // parseHTML: el => el.getAttribute("data-pos"),
        // renderHTML: attrs => ({ "data-pos": attrs.pos }),
      },
    };
  },

  // addKeyboardShortcuts() {
  //   return {
  //     "Enter": () => {
  //       const parent = this.editor.view.state.selection.$from.parent;
  //       const anchorParent = this.editor.view.state.selection.$anchor.parent;
  //       // const nodeAfter = this.editor.view.state.selection.$anchor.nodeAfter;
  //       const nodeBefore = this.editor.view.state.selection.$anchor.nodeBefore;
  //       CL(za, "this.editor", nodeBefore);

  //       return (
  //         this.editor
  //           .chain()
  //           .focus()
  //           .updateAttributes("heading", {
  //             pos: this.editor.getAttributes("heading").pos + 1,
  //           })
  //           .insertContent(
  //             "<goalForm><goalFormTitle> <goalFormTitle></goalFormTitle>"
  //           )
  //           // .command(({ tr, dispatch }) => {
  //           //   const nodeAfter = this.editor.view.state.selection.$anchor.nodeAfter;
  //           //   CL(zb, 'nodeAfter', nodeAfter);
  //           //   //   if (tr.selection.node.type.name === "goalForm") {
  //           //   tr.setSelection(TextSelection.create(tr.doc, tr.selection.$to.pos));
  //           //   //   }
  //           //   //   CL(za, 'tr in command: ', tr, tr.selection);
  //           //   return true;
  //           // })
  //           .run()
  //       );

  //       // return this.editor.chain().focus().command((tr, dispatch) => {
  //       //   return true;
  //       // }).run();
  //     },

  //     // "Shift-Enter": () => {
  //     //   return this.editor
  //     //     .chain()
  //     //     .focus()
  //     //     .insertContent("<taskFreq> </taskFreq>")
  //     //     .run();
  //     // },
  //   };
  // },

  addCommands() {
    return ({
      setGoalForm: () => ({ commands }) => {
        return commands.setNode(this.name)
      }
    });
  },

  addKeyboardShortcuts() {
    CL(za, "addKeyboardShortcuts");
    return ({
      "Enter": () => this.editor.commands.setGoalForm(),
    })
  },


  parseHTML() {
    return [
      {
        tag: "goalForm",
        // getAttrs: el => !!(el as HTMLElement).getAttribute("data-pos")?.trim() && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["goalForm", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GoalForm);
  },
});

/********************************************
 ********************************************
 * The component
 ********************************************
 *******************************************/

const GoalForm = props => {
  const { editor, node, getPos, selected } = props;
  const [goalType, setGoalType] = useState<string>("1-O");
  const vals: [string, string] = ["1-O", "Freq."];
  const goalTypeTxt = goalType === "1-O" ? "One-off" : "Frequent";

  const { dom } = editor.view;
  const domChildren = [...dom.children];

  CL(
    za,
    "component node prop: ",
    getPos(),
    editor,
    editor.extensionStorage.pos
  );

  return (
    <NodeViewWrapper className="goalForm">
      <div className="flex flex-row justify-between items-center">
        <span
          className="label font-normal cursor-default text-greenSheen"
          contentEditable={false}>
          {`Goal No.${dom.length}: ${goalTypeTxt}`}
        </span>
        <Switch values={vals} clickHandler={val => setGoalType(val)} />
      </div>
      <NodeViewContent as="div" className="content" />
    </NodeViewWrapper>
  );
};

export default GoalFormNodeExtension;
