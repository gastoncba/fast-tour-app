import React, { useState } from "react";
import { Form as AntForm, Input, Button } from "antd";
import "antd/dist/reset.css";
import { Box } from '@mui/material'

import { Paragraph } from "../Paragraph/Paragraph.component";

interface FormField {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "number";
  rules?: object[];
}

interface Props {
  fields: FormField[];
  title?: string;
  submitText?: string;
  loadingText?: string;
  onFinish: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  directionInputs?: 'row' | 'column',
  columnGap?: number
}

export const Form: React.FC<Props> = ({
  fields,
  title,
  submitText = "Enviar",
  loadingText = "Cargando...",
  onFinish,
  onFinishFailed,
  directionInputs,
  columnGap
}) => {
  const [form] = AntForm.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    console.log("Formulario enviado:", values);
    setLoading(true);
    onFinish(values);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Error al enviar formulario:", errorInfo);
    if (onFinishFailed) {
      onFinishFailed(errorInfo);
    }
  };

  return (
    <AntForm
      form={form}
      onFinish={handleSubmit}
      onFinishFailed={handleFinishFailed}
    >
      {title && <Paragraph text={title} type="title" levelTitle={3} />}
      <Box sx={{ display: 'flex', flexDirection: directionInputs || 'column' , columnGap: columnGap, justifyItems:'center'}}>
      {fields.map((field) => (
        <AntForm.Item
          key={field.name}
          label={field.label}
          name={field.name}
          labelCol={{span: 24}}
          rules={[
            {
              required: true,
              message: `Por favor ingrese su ${field.label.toLowerCase()}`,
            },
            {
              type: field.type === "email" ? "email" : field.type === "number" ? "number" : "string",
              message: field.type === "email" ? "Ingrese un email válido" : "Ingrese un número válido",
            },            
            ...(field.rules || []),
          ]}
        >
          <Input type={field.type} />
        </AntForm.Item>
      ))}
      <AntForm.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? loadingText : submitText}
        </Button>
      </AntForm.Item>
      </Box>
    </AntForm>
  );
};
