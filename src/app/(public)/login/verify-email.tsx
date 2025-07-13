"use client";

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import { REGEX_EMAIL } from "@/app/constants/validators";
import fetchData from "@/app/lib/fetch-data";
import { ILoginTypePerson } from "@/app/types/global.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { LoginContext } from "./page";

interface IVerifyEmail {
  updateStep: () => void;
}

const schema = object({
  email: string().required("Đây là trường bắt buộc").matches(new RegExp(REGEX_EMAIL), "Email không hợp lệ"),
});

function VerifyEmail({ updateStep }: IVerifyEmail) {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, setForm } = useContext(LoginContext);

  const onSubmit = async (formData: { email: string }) => {
    setIsSubmitting(true);
    const data = await fetchData<ILoginTypePerson[]>({
      api: "/services/uaa/api/p/customer-logins/email",
      method: "POST",
      payload: { email: formData.email.trim() },
    });
    setIsSubmitting(false);
    if (!data) {
      return;
    }
    if (setForm) {
      setForm({ ...form, email: formData.email.trim() });
    }
    updateStep();
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value, name, disabled }, fieldState: { error } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              disabled={disabled}
              error={error}
              label={{ text: "Email" }}
              type="text"
              placeholder="Nhập email"
              className="h-[50px]"
            />
          )}
        />
      </form>
      <Button
        onClick={handleSubmit(onSubmit)}
        loading={isSubmitting}
        className="h-12 rounded-lg mt-5 w-full"
        fill="var(--primary-primary)"
        colorSpin="white"
      >
        Đăng nhập
      </Button>
    </>
  );
}

export default VerifyEmail;
