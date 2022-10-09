import { FC, forwardRef } from "react";
import { NavbarAppCtrls, NavbarCtrlType } from "../../utilities/svgs_navbar";
import { iconNavFeedback } from "../../utilities/svgs";
import { CL, za, zc } from "../../utilities/logger";
import { Link } from "@redwoodjs/router";

interface NavbarFCType {
  closeNavMenu?: () => void; // for closing small-screen nav-menu
  teamState?: {
    teamView?: "team" | "meet" | "timeTracker";
    setTeamView?: (arg: "team" | "meet" | "timeTracker") => void;
  };
}

/*******************************
 * *****************************
 *
 * *****************************
 *******************************/
const Navbar: FC<NavbarFCType> = ({ closeNavMenu, teamState }) => {
  // const teamStatus = useRecoilValue(teamStatusSr);
  // const isInTeam = !!teamStatus || false;
  const isInTeam = false;

  // const getActiveState = ctrl => {
  //   if (pathname.includes("team")) {
  //     if (teamState?.teamView === ctrl.name) {
  //       return true;
  //     } else return false;
  //   } else if (pathname.includes(ctrl.name)) {
  //     return true;
  //   } else return false;
  // };

  const addCls = ctrl => {
    // let clses = getActiveState(ctrl) ? "isActive" : "";
    // ctrl.name === "help" ? (clses += " pseudoBT") : null;
    // ctrl.name === "team" && !isInTeam ? (clses += " disabled") : null;
    // return clses;
    return "";
  };

  const filteredCtrls = NavbarAppCtrls.filter(c => {
    if (isInTeam && c.name === "dashboard") return false;
    if (!isInTeam && c.name === "team") return false;
    // if (!isOnTeamPage) return c.name !== "meet" ? true : false;
    return true;
  });

  return (
    <div className="navbarParent">
      <div className="navWrapper">
        {filteredCtrls.map((ctrl, i) => (
          <div
            className={`navCtrl ${addCls(ctrl)}`}
            onClick={closeNavMenu}
            key={i}>
            {ctrl.linkType === "link" ? (
              // <Link href={ctrl.link} passHref>
              //   <NavbarCtrl ctrl={ctrl} active={ctrl.link === pathname} />
              // </Link>
              <Link to={ctrl.link}>
                <NavbarCtrl ctrl={ctrl} active={false} />
              </Link>
            ) : null}
            {ctrl.linkType === "click" ? (
              <NavbarCtrl ctrl={ctrl} active={false} />
            ) : null}
          </div>
        ))}
        {/* <UserFeedback /> */}
      </div>
    </div>
  );
};

/*******************************
 * *****************************
 *
 * *****************************
 *******************************/
const NavbarCtrl: FC<{
  ctrl: NavbarCtrlType;
  active?: boolean;
  href?: string;
}> = forwardRef(({ ctrl, active, href }, ref) => {
  return (
    // @ts-ignore
    // <a href={href} ref={ref}>
    <span ref={ref}>
      <svg viewBox={ctrl.iconType.viewBox} className={"inline-block xl:block"}>
        {ctrl.iconType.paths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            style={{
              stroke:
                active || ctrl.name === "feedback"
                  ? path.activeColour
                  : path.colour,
            }}
          />
        ))}
      </svg>
      <p className={`inline-block xl:block`}>{ctrl.title}</p>
    </span>
  );
});

/*******************************
 * *****************************
 *
 * *****************************
 *******************************/
// const UserFeedback = ({}) => {
//   const setOverlay = useSetRecoilState(overlaySt);

//   const feedbackClickHandler = () => setOverlay(["feedback"]);

//   return (
//     <div className="feedbackCtrl" onClick={feedbackClickHandler}>
//       <div>
//         <Tooltip arrowDir="right" parentCls="w-max">
//           <p className="text-xxs lg:text-base font-medium normal-case">
//             Feedback
//           </p>
//         </Tooltip>
//         <svg
//           viewBox={iconNavFeedback.viewBox}
//           className="box-content w-8 h-8 px-2 py-4 pr-3 border-green border-y border-l-0 border-r rounded-r-full transform origin-center bg-sectionBackground">
//           {iconNavFeedback.paths.map((path, i) => (
//             <path
//               d={path.d}
//               style={{
//                 stroke: path.activeColour,
//               }}
//               key={i}
//             />
//           ))}
//         </svg>
//       </div>
//     </div>
//   );
// };

export default Navbar;
