import { FC, useCallback, useEffect, useState } from "react";
import { mergeAttributes, Node } from "@tiptap/core";
import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import BtnDefault from "../Btn/BtnDefault";
import { CL, za, zb, zc } from "../../utilities/logger";

const placeholderGoalTitle = "Type a new goal title here... (max 50 chars)";
const placeholderFreqTask = "Enter a new frequent task here... (max 50 chars)";

/********************************************
 ********************************************
 * The extension
 ********************************************
 *******************************************/
export const FreqTaskNodeExtension = Node.create({
  name: "taskFreq",
  group: "block",
  atom: true,
  priority: 200,
  content: "paragraph",

  addAttributes() {
    return {
      taskType: {
        default: "freq",
      },
    };
  },

  // addKeyboardShortcuts() {
  //   CL(za, "props:", this);
  //   return {
  //     "Shift-Enter": () =>
  //       this.editor
  //         .chain()
  //         .focus()
  //         .insertContent("<taskFreq> </taskFreq>")
  //         .selectTextblockStart()
  //         .run(),
  //   };
  // },

  parseHTML() {
    return [
      {
        tag: "taskFreq",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["taskFreq", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TaskFreqNode);
  },
});

/********************************************
 ********************************************
 * The component
 ********************************************
 *******************************************/

const TaskFreqNode = props => {
  const { editor, node, getPos, selected } = props;
  const { attrs, textContent } = node;

  const { dom } = editor.view;
  const domChildren = [...dom.children];

  CL(za, "node: ", getPos());

  return (
    <NodeViewWrapper className="taskFreq w-80">
      <div className="flex flex-row justify-between items-center">
        <NodeViewContent
          as="div"
          className={`taskContent`}
        // className={`taskContent ${textContent.length > 0 ? "" : "showPlaceholder"}`}
        />
        {/* placeholder component */}
        <BtnDefault
          parentClasses=""
          classes={`freqSelector thin mt-[3px]`}
          onClickHandler={() => {
            CL(za, "click triggered");
          }}>
          <div
            contentEditable={false}
            className="flex items-center text-center cursor-pointer">
            <input type="hidden" readOnly />
            <input type="hidden" readOnly />
            <div className="text-xxxs sm:text-xxs font-normal">
              <span>{`${Number(0)}`}</span>
              <span className="text-oldLace px-1">/</span>
              <span>{`${Number(0)}`}</span>
            </div>
          </div>
        </BtnDefault>
      </div>
      <p className="text-xxs text-gray">{`${textContent.length}/ 50(max) characters`}</p>
    </NodeViewWrapper>
  );
};

export default FreqTaskNodeExtension;
