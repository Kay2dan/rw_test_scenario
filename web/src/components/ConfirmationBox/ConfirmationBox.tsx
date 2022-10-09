import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import Delete from "../Btn/Delete";

const ConfirmationBox: FC<{
  children: ReactNode;
  showDelete?: boolean;
  onClickHandlers: ((...arg) => void)[];
}> = ({ children, showDelete = true, onClickHandlers }) => {
  return (
    // <motion.div
    //   className="confirmationBox"
    //   animate={{ top: ["0%", "50%", "45%", "50%"], opacity: [0, 0.6, 0.9, 1] }}
    //   transition={{ delay: 0.3, duration: 0.5 }}>
    <div className="confirmationBox">
      {showDelete ? (
        <Delete
          cls="top-5 right-6 w-7 h-7"
          onClickHandler={onClickHandlers[0]}
        />
      ) : null}
      {children}
    </div>
  );
};

export default ConfirmationBox;
