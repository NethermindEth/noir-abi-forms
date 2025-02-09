import { AbiType, ABIVariable } from "@aztec/foundation/abi";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function minTypeLength(type: AbiType): number {
  if (
    type.kind === "integer" ||
    type.kind === "boolean" ||
    type.kind === "field" ||
    type.kind === "string"
  ) {
    return 1;
  }
  if (type.kind === "array") {
    return type.length * minTypeLength(type.type);
  }
  if (type.kind === "struct") {
    return type.fields.reduce(
      (acc: number, field: ABIVariable): number =>
        acc + minTypeLength(field.type),
      0,
    );
  }
  if (type.kind === "tuple") {
    return type.fields.reduce(
      (acc: number, element: AbiType): number => acc + minTypeLength(element),
      0,
    );
  }
  return 0;
}

export function getDefaultValue(type: AbiType): unknown[] {
  if (type.kind === "integer") {
    return [0n];
  }
  if (type.kind === "boolean") {
    return [false];
  }
  if (type.kind === "string") {
    return [""];
  }
  if (type.kind === "field") {
    return ["0x0"];
  }
  if (type.kind === "array") {
    return Array(type.length || 0)
      .fill(getDefaultValue(type.type))
      .flat();
  }
  if (type.kind === "struct") {
    return type.fields.map((field) => getDefaultValue(field.type)).flat();
  }
  if (type.kind === "tuple") {
    return type.fields.map((field) => getDefaultValue(field)).flat();
  }

  console.warn("Unsupported type:", type);

  return [];
}
