/* eslint-disable @typescript-eslint/ban-ts-comment */
// const Button = ({ label, className }) => {
//   return <button className={className}>{label}</button>;
// };

// export default Button;

import { type MouseEvent, type ReactElement, type ReactNode } from "react";
// import DarkTooltip from "components/simple/DarkTooltip/DarkTooltip";
// import Loader from "components/simple/Loader";
import { styled, Button } from "@mui/material";
// import Icon from "../Icon";

const COLORS = {
  PRIMARY: "#0066FF",
  WHITE: "#FFFFFF",
  DANGER: "#D32F2F",
  DANGER_DARK: "#B71C1C",
  DISABLED_GREY: "#CCCCCC",
  DISABLED_TEXT_GREY: "#888888",
};

const getBackgroundColor = (variant?: string) => {
  switch (variant) {
    case "danger":
      return COLORS.DANGER;
    case "outline":
      return "transparent";
    default:
      return COLORS.PRIMARY;
  }
};

const getBorderColor = (_theme, variant: string | undefined) => {
  switch (variant) {
    case "outline":
      return `1px solid ${COLORS.PRIMARY}`;
    default:
      return "none";
  }
};

const getTextColor = (variant: string | undefined) => {
  switch (variant) {
    case "outline":
      return COLORS.PRIMARY;
    default:
      return COLORS.WHITE;
  }
};

const getHoverBackgroundColor = (_theme, variant: string | undefined) => {
  switch (variant) {
    case "outline":
      return `rgba(0, 102, 255, 0.1)`;
    case "danger":
      return COLORS.DANGER_DARK;
    default:
      return `${COLORS.PRIMARY}DD`; // Slightly darker primary
  }
};

const getDisabledStyles = (variant: string | undefined) => {
  return {
    color: variant === "outline" ? COLORS.DISABLED_TEXT_GREY : COLORS.WHITE,
    background: COLORS.DISABLED_GREY,
    border:
      variant === "outline" ? `1px solid ${COLORS.DISABLED_GREY}` : "none",
  };
};

export interface ButtonComponentProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: string;
  iconProps?: ReactElement;
  iconFill?: string;
  iconPrefix?: boolean;
  iconSuffix?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  tooltipTitle?: string;
  tooltipPlacement?: string;
  tooltipArrow?: boolean;
  uppercase?: boolean;
}

const IconButton = styled("div")<{ variant?: string; iconFill?: string }>(
  ({ variant, iconFill }) => ({
    alignItems: "center",
    display: "flex",
    marginLeft: "15px",
    "& svg path": {
      fill: variant === "outline" ? iconFill || COLORS.PRIMARY : COLORS.WHITE,
    },
  })
);

const IconPrefix = styled("div")<{ variant?: string; iconFill?: string }>(
  ({ variant, iconFill }) => ({
    alignItems: "center",
    display: "flex",
    marginRight: "10px",
    "& svg path": {
      fill: variant === "outline" ? iconFill || COLORS.PRIMARY : COLORS.WHITE,
    },
  })
);

const Btn = styled(Button)<{ variant?: string; uppercase?: boolean }>(
  ({ theme, variant, uppercase }) => ({
    padding: "8px 12px",
    background: getBackgroundColor(variant),
    border: getBorderColor(theme, variant),
    borderRadius: "6px",
    color: getTextColor(variant),
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "ArchivoRegular",
    textTransform: uppercase ? "uppercase" : "none",
    minWidth: "127px",
    "&:hover": {
      background: getHoverBackgroundColor(theme, variant),
    },
    "&:active": {
      background: getHoverBackgroundColor(theme, variant),
    },
    "&:disabled": {
      ...getDisabledStyles(variant),
      opacity: 0.6,
    },
    "&.loading": {
      background: getHoverBackgroundColor(theme, variant),
    },
  })
);

export const AccuknoxButtonComponent: React.FC<ButtonComponentProps> = ({
  className = "",
  children,
  disabled = false,
  icon = "",
  variant = "",
  isLoading = false,
  iconPrefix = false,
  iconSuffix = true,
  iconProps = <></>,
  iconFill = "#fff",
  //   tooltipTitle = "",
  //   tooltipPlacement = "top",
  onClick,
  //   tooltipArrow = false,
  uppercase = false,
  ...buttonProps
}) => {
  return (
    // <DarkTooltip title={tooltipTitle} placement={tooltipPlacement} arrow={tooltipArrow}>
    <Btn
      className={`${className} ${isLoading ? "loading" : ""}`}
      {...buttonProps}
      onClick={onClick}
      disabled={disabled}
      //@ts-ignore
      variant={variant}
      uppercase={uppercase}
    >
      {icon && iconPrefix ? (
        <IconPrefix iconFill={iconFill} variant={variant}>
          {iconProps}
        </IconPrefix>
      ) : null}

      {!isLoading ? (
        children
      ) : (
        <></>
        //   <Loader color={variant === "outline" ? "#1e1e1e" : "#fff"} size={25} />
      )}

      {icon && iconSuffix ? (
        <IconButton iconFill={iconFill} variant={variant}>
          {iconProps}
        </IconButton>
      ) : null}
    </Btn>
    // </DarkTooltip>
  );
};

export default AccuknoxButtonComponent;
