"use client";

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import PublicLayout from "@/app/components/public-layout/public-layout";
import fetchData from "@/app/hooks/useFetch";
import { ILoginTypePerson } from "@/app/types/global.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const [step, setStep] = useState(1);
  const [authenticationError, setAuthenticationError] = useState(false);
  const [emailLock, setEmailLock] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [loginTypes, setLoginTypes] = useState<ILoginTypePerson[]>([]);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (step === 1) {
      setIsSubmitting(true);
      const data = await fetchData<ILoginTypePerson[]>({
        api: "/services/uaa/api/p/customer-logins/email",
        method: "POST",
        payload: { email: form.email },
      });
      setIsSubmitting(false);
      if (!data) {
        return;
      }
      setLoginTypes((value) => data);
      if (loginTypes && loginTypes.length === 1) {
      }

      setStep(step + 1);
    }
    if (step === 2) {
      setIsSubmitting(true);
      const login = await fetchData({
        api: "/auth/login",
        method: "POST",
        payload: { ...form, username: form.email, signinType: null, otp: null },
      });
      setIsSubmitting(false);

      if (!login) {
        return;
      }
      router.replace("/");
    }
  };

  return (
    <PublicLayout pageTitle={step === 1 || step === 2 ? "Đăng nhập" : ""}>
      {!emailLock && (
        <form onSubmit={submit}>
          {step === 1 && (
            <div className="mb-5">
              <Input
                label={{ text: "Email" }}
                type="text"
                placeholder="Nhập email"
                className="h-[50px]"
                name="email"
                onChange={handleChange}
              />
            </div>
          )}
          {step === 2 && !loginTypes.length && (
            <div className="mb-5">
              <Input
                label={{ text: "Mật khẩu" }}
                autoComplete="true"
                type="password"
                placeholder="Nhập mật khẩu"
                className="h-[50px]"
                name="password"
                onChange={handleChange}
              />
            </div>
          )}
        </form>
      )}
      <Button
        onClick={submit}
        loading={isSubmitting}
        className="h-12 rounded-lg"
        fill="var(--primary-primary)"
        colorSpin="white"
      >
        Đăng nhập
      </Button>
    </PublicLayout>
  );
}

export default LoginPage;
