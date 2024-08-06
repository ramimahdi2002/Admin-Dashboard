"use client";
import { Button } from "@mui/material";
import React from "react";

const sxOptions = color => ({
  text: {
    color: `var(--${color}) !important`,
    backgroundColor: "transparent !important",
    border: "none !important",
  },
  outlined: {
    color: `var(--${color}) !important`,
    backgroundColor: "transparent !important",
    border: `1px solid  var(--${color}) !important`,
  },
  contained: {
    color: "white !important",
    backgroundColor: `var(--${color}) !important`,
    border: `1px solid  var(--${color}) !important`,
  },
});

function GButton({
  label,
  variant,
  color,
  onClick,
  padding,
  rounded,
  radius,
  sx,
  ...rest
}) {
  return (
    <Button
      onClick={onClick}
      variant={"text"}
      sx={{
        minWidth: "auto",
        borderRadius:
          radius ??
          (!rounded
            ? "var(--button-border-radius) !important"
            : "10px !important"),
        padding: padding || "var(--button-padding) !important",
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        textTransform: "none",
        ...sxOptions(color || "blue")[variant || "text"],
        ...sx,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default GButton;
