import { API, PAYMENT, VALIDATION } from "@/lib/constants";
import { routes } from "@/lib/routes";

/**
 * Wealth Code Feature Constants
 * --------------------------------
 * Configuration-only values for the wealth-code module.
 * UI copy and content strings should be defined in components or a separate content file.
 */

export const WEALTH_PAYMENT = PAYMENT;

export const WEALTH_VALIDATION = VALIDATION;

export const WEALTH_API = API;

export type WealthCodeType = "master" | "repeating" | "diverse";
