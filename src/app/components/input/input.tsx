"use client";

import clsx from "clsx";
import React, { memo, useImperativeHandle, useRef } from "react";

interface ILabelProp {
  text?: string;
  render?: (label: string) => React.JSX.Element;
  required?: boolean;
  className?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLElement>;
  label?: ILabelProp;
}

function Input({ className, ref, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        inputRef.current?.scrollIntoView(options);
      },
    };
  });

  return (
    <>
      {label && (
        <div className={clsx("mb-2 text-sm font-medium text-[var(--typography-light-theme-label)]", label.className)}>
          {label.text}
        </div>
      )}
      <div
        className={clsx(
          "h-10 w-full flex items-center rounded-lg border border-[var(--border-light-theme-border-1)] px-4",
          className
        )}
      >
        <input
          ref={inputRef}
          className={clsx(
            "border-none outline-none text-sm text-[var(--typography-light-theme-body)] placeholder:text-[var(--typography-light-theme-placeholder)] w-full"
          )}
          {...rest}
        />
      </div>
    </>
  );
}

export default memo(Input);
