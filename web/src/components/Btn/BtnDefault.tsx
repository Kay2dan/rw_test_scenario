import { FC } from "react";
// import { BtnGenericFCType } from "app/types";

export interface BtnGenericFCType {
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  classes?: string;
  parentClasses?: string;
  onClickHandler?: (...args) => void;
  children?: JSX.Element;
  id?: string;
  // size?: "lg" | "sm";
}

const BtnDefault: FC<BtnGenericFCType> = ({
  children,
  classes = "",
  parentClasses = "my-8",
  disabled = false,
  onClickHandler,
  type = "button",
  id,
}) => {
  return (
    <div className={`${parentClasses}`}>
      <button
        id={id}
        type={type}
        disabled={disabled}
        onClick={onClickHandler}
        className={`btn animCircle ${classes}`}>
        {children}
      </button>
    </div>
  );
};

export default BtnDefault;
