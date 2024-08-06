import React from "react";
import { MenuItem, TextField } from "@mui/material";

const GTextfield = ({
  type,
  autoComplete,
  rows,
  maxRows,
  fullWidth = true,
  multiline,
  sx,
  label,
  placeholder,
  value,
  onBlur,
  name,
  error,
  helperText,
  center,
  leadingIcon,
  trailingIcon,
  onChange,
  noHelperText = false,
  hasShadow = false,
  formik,
  noValue = false,
  options = [],
  multiple = false,
  select = false,
  className,
  whiteInput = false,
  borderColor,
  borderRadius,
  ...rest
}) => {
  const isDateField = type === 'date';

  const textField = (
    <TextField
      type={type}
      autoComplete={autoComplete}
      rows={rows}
      maxRows={maxRows}
      fullWidth={fullWidth}
      multiline={multiline}
      value={
        noValue
          ? undefined
          : formik && name
          ? formik?.getFieldProps(name ?? "")?.value
          : value
      }
      variant="outlined"
      onBlur={formik && name ? formik.handleBlur : onBlur}
      onChange={formik && name ? formik.handleChange : onChange}
      name={name}
      error={
        formik && name
          ? Boolean(
              formik?.getFieldMeta(name ?? "")?.touched &&
                formik?.getFieldMeta(name ?? "")?.error
            )
          : error
      }
      helperText={
        formik && name
          ? (formik?.getFieldMeta(name ?? "")?.touched &&
              formik?.getFieldMeta(name ?? "")?.error?.toString()) ||
            helperText
          : helperText
      }
      sx={{
        "& .MuiInput-root": {
          backgroundColor: "transparent",
          boxShadow: hasShadow ? "var(--shadow)" : undefined,
          borderRadius: borderRadius || "var(--input-border-radius)",
          "& fieldset": {
            borderColor: borderColor
              ? borderColor
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&:hover fieldset": {
            borderColor: borderColor
              ? borderColor
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&.Mui-focused fieldset": {
            borderColor: borderColor
              ? borderColor
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error)"
              : "var(--primary) !important",
            borderRadius: "var(--input-border-radius)",
          },
        },
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "var(--hint) !important",
        },
        "& .MuiStandardInput-input": {
          color: "var(--primary-text) !important",
        },
        "& .MuiInputLabel-root": {
          color: "black !important",
          ...(isDateField && {
            top: "0 !important",
            transform: "translateY(-50%) !important",
          }),
          "&.Mui-focused": {
            color: "black !important",
          },
        },
        "& .MuiInputAdornment-root": {
          color: "var(--primary-text) !important",
        },
        color: "var(--primary-text) !important",
        ...(sx || {}),
      }}
      InputProps={{
        startAdornment: leadingIcon,
        endAdornment: trailingIcon,
        ...rest.InputProps,
      }}
      inputProps={{
        style: {
          textAlign: center ? "center" : "left",
          ...rest.inputProps?.style,
        },
        ...rest.inputProps,
      }}
      label={label}
      placeholder={placeholder}
      select={select}
      size="large"
      SelectProps={{
        MenuProps: {
          sx: {
            marginTop: "2px",
          },
        },
        multiple: multiple,
        fullWidth: true,
        ...(rest.SelectProps || {}),
      }}
      InputLabelProps={{
        sx: {
          color: "black !important",
          ...(isDateField && {
            top: "0 !important",
            transform: "translateY(-50%) !important",
          }),
        },
        ...(rest.InputLabelProps || {}),
      }}
      {...rest}
    >
      {options.map(option => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "var(--primary) !important",
              color: "white !important",
            },
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

  return className ? <div className={className}>{textField}</div> : textField;
};

export default GTextfield;
