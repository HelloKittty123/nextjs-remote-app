"use client";

import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";
import styles from "./public-layout.module.scss";

function PublicLayout({
  children,
  pageTitleImage,
  pageTitle,
}: {
  children?: React.ReactNode;
  pageTitleImage?: string;
  pageTitle?: string;
}) {
  return (
    <div className={styles?.["public-layout-wrap"]}>
      <div className={styles?.["public-layout"]}>
        <div className={styles?.["public-layout-left-side"]}>
          <Image priority={true} fill={true} src="/logo/login-banner.svg" alt="Login Banner" />
        </div>
        <div className={styles["public-layout-right-side-wrap"]}>
          <div className={styles["public-layout-right-side"]}>
            <div className={clsx(styles["public-layout-right-side-image"], "mt-4")}>
              <Image priority={true} width={183} height={138} src="/logo/logo-fpt.svg" alt="Logo FPT" />
            </div>
            <div className="text-[30px] text-[var(--typography-light-theme-title)] font-semibold leading-[38px] text-center gap-3 flex flex-col items-center">
              {pageTitleImage && <Image src={pageTitleImage} alt="page-title" />}
              {pageTitle && <div className="mb-5">{pageTitle}</div>}
            </div>
            {children}
            <div className="mb-10 flex flex-1 items-end justify-center">
              <div className="flex items-center justify-center w-full gap-3 pt-6 border-t border-t-[var(--border-light-theme-border-2)]">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image src="/login/c-info-x12.svg" alt="c-infor" width={12} height={12} />
                  <a
                    target="_blank"
                    href="https://econtract.fpt.com.vn/wp-content/uploads/2023/10/ECONTRACT-Chinh-sach-bao-mat-DLCN.pdf"
                    className="decoration-none text-[var(--info-color-info)] text-xs font-medium"
                  >
                    Trợ giúp
                  </a>
                </div>
                <div className="h-3 w-[1px] bg-[rgba(0, 53, 128, 0.35)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PublicLayout);
