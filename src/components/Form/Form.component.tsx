import React, { CSSProperties, useState } from "react";
import { Grid, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ObjectShape } from "yup";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Loader } from "../Loader/Loader.component";
import { Icon } from "../Icon/Icon.component";

interface Fields {
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
  fields: Fields[];
  title?: string;
  styles?: CSSProperties;
  children?: React.ReactNode;
  submitText?: string;
  onAction: (values?: any) => Promise<any>;
  colButton?: number;
}

export const Form: React.FC<FormProps> = ({ fields, title, styles, children, submitText = "Guardar", onAction, colButton }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const createSchema = () => {
    let schema: ObjectShape = {};

    fields.forEach((field) => {
      const key = Object.keys(field.initialValue)[0];
      const labelLowerCase = field.label.toLowerCase();

      const baseValidation = Yup.string();

      if (!field.notRequired) {
        const requiredValidation = baseValidation.required(field.constrain || `El campo ${labelLowerCase} es requerido`);

        switch (field.type) {
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
              [key]: requiredValidation.min(field.min || 1, "El numero debe estar entre 1 y 30").max(field.max || 30, "El numero debe estar entre 1 y 30"),
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
    initialValues: fields
      .map((field) => field.initialValue)
      .reduce((result, item) => {
        return { ...result, ...item };
      }, {}),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onAction(values);
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
      {title && <Paragraph text={title} variant="h1" align="center" sx={{ fontSize: 50, mb: 2 }} />}
      <form onSubmit={formik.handleSubmit} style={styles}>
        <Grid container spacing={2}>
          {fields.map((field, index) => {
            return (
              <Grid item xs={12} sm={field.col && field.col} key={index}>
                <TextField
                  fullWidth
                  size="medium"
                  name={Object.keys(field.initialValue)[0]}
                  label={field.label}
                  type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                  multiline={field.multiline}
                  placeholder={field.placeholder}
                  value={formik.values[Object.keys(field.initialValue)[0]]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[Object.keys(field.initialValue)[0]] && Boolean(formik.errors[Object.keys(field.initialValue)[0]])}
                  helperText={formik.touched[Object.keys(field.initialValue)[0]] && (formik.errors[Object.keys(field.initialValue)[0]] as React.ReactNode)}
                  required={field.notRequired ? false : true}
                  InputProps={
                    field.type === "password"
                      ? {
                          endAdornment: endAdornment,
                        }
                      : undefined
                  }
                  inputProps={
                    field.type
                      ? {
                          max: field.max || 30,
                          min: field.min || 0,
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
            <Button variant="contained" fullWidth type="submit" color="primary" disabled={loading}>
              {loading ? <Loader size={30} /> : submitText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
