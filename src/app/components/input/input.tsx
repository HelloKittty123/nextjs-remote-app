"use client";

import clsx from "clsx";
import React, { memo, useImperativeHandle, useRef } from "react";
import { RegisterOptions } from "react-hook-form";

interface ILabelProp {
  text?: string;
  render?: (label: string) => React.JSX.Element;
  required?: boolean;
  className?: string;
}

export interface InputImperativeHandle {
  focus: () => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ILabelProp;
  validation?: RegisterOptions;
  multipleLine?: boolean;
  name?: string;
  ref?: React.Ref<InputImperativeHandle>;
  error?: { [key: string]: any };
  invalid?: boolean;
}

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-xs font-normal text-[var(--error-color-error)] mt-2">{message}</div>
);

const Input = ({ className, name, ref, validation, label, error, multipleLine, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    scrollIntoView: (options?: ScrollIntoViewOptions) => {
      inputRef.current?.scrollIntoView(options);
    },
  }));

  return (
    <>
      {label && (
        <div className={clsx("mb-2 text-sm font-medium text-[var(--typography-light-theme-label)]", label.className)}>
          {label.text}
        </div>
      )}
      {multipleLine ? (
        <div
          className={clsx(
            "min-h-[150px] max-h-[300px] w-full rounded-lg border border-[var(--border-light-theme-border-1)] p-4",
            className,
            error ? "border-[var(--error-color-error)]" : ""
          )}
        >
          <textarea
            className={clsx(
              "border-none outline-none text-sm text-[var(--typography-light-theme-body)] placeholder:text-[var(--typography-light-theme-placeholder)] w-full h-full"
            )}
            style={{ resize: "none" }}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            name={name}
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          />
        </div>
      ) : (
        <div
          className={clsx(
            "h-10 w-full flex items-center rounded-lg border border-[var(--border-light-theme-border-1)] px-4",
            className,
            error ? "border-[var(--error-color-error)]" : ""
          )}
        >
          <input
            className={clsx(
              "border-none outline-none text-sm text-[var(--typography-light-theme-body)] placeholder:text-[var(--typography-light-theme-placeholder)] w-full"
            )}
            {...rest}
            name={name}
            ref={inputRef as React.RefObject<HTMLInputElement>}
          />
        </div>
      )}

      {error && <ErrorMessage message={error?.message}></ErrorMessage>}
    </>
  );
};

export default memo(Input);
