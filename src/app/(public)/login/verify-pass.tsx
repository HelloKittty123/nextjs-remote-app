"use client";

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import fetchData from "@/app/lib/fetch-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { boolean, object, string } from "yup";
import { LoginContext } from "./page";

const schema = object({
  password: string().required("Đây là trường bắt buộc"),
  rememberMe: boolean(),
});

function VeriyPass() {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { form } = useContext(LoginContext);

  const onSubmit = async (dataSubmit: { password: string; rememberMe?: boolean }) => {
    setIsSubmitting(true);
    const login = await fetchData({
      api: "/auth/login",
      method: "POST",
      payload: { ...dataSubmit, username: form!.email, signinType: null, otp: null },
    });
    setIsSubmitting(false);
    if (!login) {
      return;
    }
    router.replace("/");
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
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, name, disabled }, fieldState: { error } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              disabled={disabled}
              error={error}
              label={{ text: "Mật khẩu" }}
              type="text"
              placeholder="Nhập mật khẩu"
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

export default VeriyPass;
