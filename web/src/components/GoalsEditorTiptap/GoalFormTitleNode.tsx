import { FC } from "react";
import { mergeAttributes, Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { CL, za, zb, zc } from "../../utilities/logger";

const placeholderGoalTitle = "Type a new goal title here... (max 50 chars)";

/********************************************
 ********************************************
 * The extension
 ********************************************
 *******************************************/
const GoalFormTitleNodeExtension = Node.create({
  name: "goalFormTitle",
  group: "block",
  atom: true,
  priority: 200,
  content: "heading",

  // addAttributes() {
  //   return {
  //     color: {
  //       default: null,
  //       renderHTML: attributes => {
  //         return {
  //           style: `backgroundColor: ${attributes.color}`,
  //         }
  //       },
  //     },
  //     placeholder: {
  //       default: placeholderGoalTitle,
  //     }
  //   };
  // },

  parseHTML() {
    return [
      {
        tag: "goalFormTitle",
        // getAttrs: el => !!(el as HTMLElement).getAttribute("data-pos")?.trim() && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["goalFormTitle", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GoalFormTitle);
  },
});

/********************************************
 ********************************************
 * The component
 ********************************************
 *******************************************/

const GoalFormTitle: FC<any> = ({ node }) => {
  return (
    <NodeViewWrapper className="goalFormTitle">
      <NodeViewContent as="p" className="content" />
      <p
        className="text-xxs text-gray cursor-default"
        contentEditable={
          false
        }>{`${node.textContent.length}/ 50(max) characters`}</p>
    </NodeViewWrapper>
  );
};

export default GoalFormTitleNodeExtension;
