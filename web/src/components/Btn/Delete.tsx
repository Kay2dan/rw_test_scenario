import { FC } from "react";
import { iconClose } from "../../utilities/svgs";

const Delete: FC<{
  cls?: string;
  onClickHandler: (arg?) => void;
}> = ({ cls, onClickHandler }) => {
  return (
    <div className={`deleteWrapper ${cls || ""}`} onClick={onClickHandler}>
      <svg viewBox={iconClose.viewBox} className={`iconClose`}>
        {iconClose.paths.map((path, i) => {
          const pathCls = `fill-${path.className} hover:fill-${path.className === "vividTangerine" ? "vividTangerine" : "indigoDye"
            }`;
          return <path d={path.d} className={pathCls} key={i} />;
        })}
      </svg>
    </div>
  );
};

export default Delete;
