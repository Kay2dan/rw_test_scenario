import { FC, useState } from "react";
// import { motion } from "framer-motion";

interface SwitchFCPropTypes {
  parentClasses?: "";
  hasTooltip?: boolean;
  defaultIndex?: number;
  values: [string, string?];
  tooltipTexts?: [string, string];
  theme?: "terraCotta" | "independence";
  clickHandler: (valIndex: string) => void;
}

const Switch: FC<SwitchFCPropTypes> = ({
  values,
  clickHandler,
  tooltipTexts,
  defaultIndex = 0,
  hasTooltip = false,
  parentClasses = "",
  theme = "terraCotta",
}) => {
  const [valIndex, setValIndex] = useState(defaultIndex);

  const onClickHandler = () => {
    if (values.length <= 1) return false;
    const newIndex = valIndex === 0 ? 1 : 0;
    setValIndex(newIndex);
    clickHandler(values[newIndex]);
  };

  const clsEnableSwitch =
    values.length <= 1 ? "opacity-50 cursor-not-allowed" : "";
  const clsTxtPos = values[1] ? "justify-around" : "flex-start";

  return (
    <div className={`${parentClasses} ${clsEnableSwitch}`}>
      {/* <motion.div */}
      <div
        className={`switchParent ${theme} ${valIndex === 0 ? "justify-start" : "justify-end"
          }`}
        onClick={onClickHandler}>
        {/* <motion.div layout className={`switchCtrl ${theme}`} /> */}
        <div className={`switchCtrl ${theme}`} />
        {/* <div className={`switchCtrl ${theme}`} /> */}
        <div className={`absolute flex w-full ${clsTxtPos}`}>
          <p className={`switchTxt ${theme}`}>{values[0]}</p>
          {values[1] ? (
            <p className={`switchTxt ${theme}`}>{values[1]}</p>
          ) : null}
        </div>
      </div>
      {/* add tooltip */}
    </div>
  );
};

export default Switch;
