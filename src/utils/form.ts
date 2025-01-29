import { AbiType, ArrayType, StructType, TupleType } from '@aztec/foundation/abi';

export type FormValue = unknown | Record<string, unknown>;

export interface FormDataCompiler {
  compile: (data: FormValue) => unknown;
}

class ArrayCompiler implements FormDataCompiler {
  constructor(private type: ArrayType) {}

  compile(data: FormValue): unknown[] {
    if (!Array.isArray(data)) return [];
    return data.filter(item => item !== null);
  }
}

class StructCompiler implements FormDataCompiler {
  constructor(private type: StructType) {}

  compile(data: FormValue): Record<string, unknown> {
    if (typeof data !== 'object' || data === null) return {};
    const result: Record<string, unknown> = {};
    for (const field of this.type.fields) {
      const value = (data as Record<string, unknown>)[field.name];
      if (value !== undefined && value !== null) {
        result[field.name] = compileFormData(field.type, value);
      }
    }
    return result;
  }
}

class TupleCompiler implements FormDataCompiler {
  constructor(private type: TupleType) {}

  compile(data: FormValue): unknown[] {
    if (typeof data !== 'object' || data === null) return [];
    return this.type.fields.map((field, index) => {
      const value = (data as Record<string | number, unknown>)[index];
      return value !== undefined && value !== null
        ? compileFormData(field, value)
        : null;
    });
  }
}

class BasicCompiler implements FormDataCompiler {
  compile(data: FormValue): unknown {
    return data;
  }
}

export function createCompiler(type: AbiType): FormDataCompiler {
  switch (type.kind) {
    case 'array':
      return new ArrayCompiler(type);
    case 'struct':
      return new StructCompiler(type);
    case 'tuple':
      return new TupleCompiler(type);
    default:
      return new BasicCompiler();
  }
}

export function compileFormData(type: AbiType, value: FormValue): unknown {
  const compiler = createCompiler(type);
  return compiler.compile(value);
}

export function compileFormFunction(name: string, parameters: { name: string; type: AbiType }[], values: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const param of parameters) {
    const value = values[param.name];
    if (value !== undefined && value !== null) {
      result[param.name] = compileFormData(param.type, value);
    }
  }

  return {
    [name]: result
  };
} 