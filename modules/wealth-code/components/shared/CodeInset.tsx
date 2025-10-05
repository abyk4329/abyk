"use client";

import React from "react";
import styles from "./CodeInset.module.css";

interface CodeInsetProps {
  code: string;
  size?: "lg" | "xl";
  className?: string;
}

export function CodeInset({ code, size = "xl", className }: CodeInsetProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}> 
      <div className={[styles.inner, size === "xl" ? styles.sizeXl : styles.sizeLg].join(" ")}> 
        <span className={styles.code}>{code}</span>
      </div>
    </div>
  );
}
