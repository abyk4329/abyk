import { generateEmailHTML, generateEmailSubject } from "./EmailTemplate";
import { computeCodeStructure } from "@/lib/codeStructure";

const codeStr = String(wealthCode);
const key = computeCodeStructure(Number(codeStr)).type;

const structureKey = computeCodeStructure(Number(wealthCode)).type;
