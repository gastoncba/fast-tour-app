import React, { CSSProperties, useState } from "react";
import { Grid, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ObjectShape } from "yup";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Loader } from "../Loader/Loader.component";
import { Icon } from "../Icon/Icon.component";

type variantTitle = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "caption" | "overline";
type alignTitle = "center" | "inherit" | "justify" | "left" | "right";

interface Input {
  label: string;
  type: "text" | "password" | "email" | "number";
  initialValue: any;
  constrain?: string;
  notRequired?: boolean;
  col?: number;
  min?: number;
  max?: number;
  multiline?: boolean;
  placeholder?: string;
}

interface FormProps {
  inputs: Input[];
  title?: { text?: string; variant?: variantTitle; align?: alignTitle };
  styles?: CSSProperties;
  children?: React.ReactNode;
  submitText?: string;
  onAction: (values?: any) => Promise<any>;
  colButton?: number;
  variantButton?: "contained" | "outlined" | "text";
  colorButton?: "primary" | "secondary" | "inherit";
}

export const Form: React.FC<FormProps> = ({ inputs, title, styles, children, submitText = "Guardar", onAction, colButton, colorButton, variantButton }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const createSchema = () => {
    let schema: ObjectShape = {};

    inputs.forEach((input) => {
      const key = Object.keys(input.initialValue)[0];
      const labelLowerCase = input.label.toLowerCase();

      const baseValidation = Yup.string().trim();

      if (!input.notRequired) {
        const requiredValidation = baseValidation.required(input.constrain || `El campo ${labelLowerCase} es requerido`);

        switch (input.type) {
          case "text":
            schema = { ...schema, [key]: requiredValidation };
            break;

          case "email":
            schema = {
              ...schema,
              [key]: requiredValidation.email("Formato de email inválido"),
            };
            break;

          case "password":
            schema = {
              ...schema,
              [key]: requiredValidation.min(5, "La contraseña debe tener al menos 5 caracteres"),
            };
            break;

          case "number":
            schema = {
              ...schema,
              [key]: requiredValidation.min(input.min || 1, "El numero debe estar entre 1 y 30").max(input.max || 30, "El numero debe estar entre 1 y 30"),
            };
            break;

          default:
            break;
        }
      } else {
        schema = { ...schema, [key]: baseValidation };
      }
    });

    return schema;
  };

  const validationSchema = Yup.object().shape(createSchema());

  const formik = useFormik({
    initialValues: inputs
      .map((input) => input.initialValue)
      .reduce((result, item) => {
        return { ...result, ...item };
      }, {}),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const castValues = validationSchema.cast(values);
      setLoading(true);
      try {
        await onAction(castValues);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const endAdornment: JSX.Element = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
        {showPassword ? <Icon type="VISIBILITY" /> : <Icon type="VISIBILITY-OFF" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      {title?.text && <Paragraph text={title.text} variant={title.variant || "h1"} align={title.align || "center"} sx={{ fontSize: 50, mb: 2 }} />}
      <form onSubmit={formik.handleSubmit} style={styles}>
        <Grid container spacing={2}>
          {inputs.map((input, index) => {
            return (
              <Grid item xs={12} sm={input.col && input.col} key={index}>
                <TextField
                  fullWidth
                  size="medium"
                  name={Object.keys(input.initialValue)[0]}
                  label={input.label}
                  type={input.type === "password" ? (showPassword ? "text" : "password") : input.type}
                  multiline={input.multiline}
                  placeholder={input.placeholder}
                  value={formik.values[Object.keys(input.initialValue)[0]]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[Object.keys(input.initialValue)[0]] && Boolean(formik.errors[Object.keys(input.initialValue)[0]])}
                  helperText={formik.touched[Object.keys(input.initialValue)[0]] && (formik.errors[Object.keys(input.initialValue)[0]] as React.ReactNode)}
                  required={input.notRequired ? false : true}
                  InputProps={
                    input.type === "password"
                      ? {
                          endAdornment: endAdornment,
                        }
                      : undefined
                  }
                  inputProps={
                    input.type
                      ? {
                          max: input.max || 30,
                          min: input.min || 0,
                        }
                      : undefined
                  }
                />
              </Grid>
            );
          })}
          {children && (
            <Grid item xs={12}>
              {children}
            </Grid>
          )}
          <Grid item xs={colButton || 12}>
            <Button variant={variantButton || "contained"} fullWidth type="submit" color={colorButton || "primary"} disabled={loading}>
              {loading ? <Loader size={30} /> : submitText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
