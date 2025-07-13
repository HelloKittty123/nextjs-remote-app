"use client";

import PublicLayout from "@/app/components/public-layout/public-layout";
import { ILoginTypePerson } from "@/app/types/global.types";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useCallback, useState } from "react";
import VerifyEmail from "./verify-email";
import VeriyPass from "./verify-pass";

export interface IFormLogin {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export const LoginContext = createContext<{ form?: IFormLogin; setForm?: Dispatch<SetStateAction<IFormLogin>> }>({});

function LoginPage() {
  const [step, setStep] = useState(1);
  const [authenticationError, setAuthenticationError] = useState(false);
  const [emailLock, setEmailLock] = useState(null);
  const [loginTypes, setLoginTypes] = useState<ILoginTypePerson[]>([]);
  const [form, setForm] = useState<IFormLogin>({
    email: "",
    password: "",
    rememberMe: true,
  });

  const router = useRouter();

  const updateStep = useCallback(() => {
    setStep((step) => step + 1);
  }, []);

  return (
    <LoginContext value={{ form, setForm }}>
      <PublicLayout pageTitle={step === 1 || step === 2 ? "Đăng nhập" : ""}>
        {!emailLock && (
          <>
            {step === 1 && <VerifyEmail updateStep={updateStep} />}
            {step === 2 && <VeriyPass />}
          </>
        )}
      </PublicLayout>
    </LoginContext>
  );
}

export default LoginPage;
