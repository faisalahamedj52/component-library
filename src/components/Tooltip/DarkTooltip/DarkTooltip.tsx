/* eslint-disable @typescript-eslint/ban-ts-comment */
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//@ts-expect-error
const DarkTooltip = styled(({ className, children, ...props }) => (
  //@ts-expect-error
  <Tooltip {...props} classes={{ popper: className }}>
    {typeof children === "string" ? <span>{children}</span> : children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#272727FF",
    color: "#fff",
    borderRadius: "4px",
    fontSize: 12,
    maxWidth: "auto",
    opacity: "0.9",
    fontFamily: "ArchivoRegular",
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
      "&::before": {
        backgroundColor: "#272727FF",
      },
    },
  },
}));

export default DarkTooltip;
