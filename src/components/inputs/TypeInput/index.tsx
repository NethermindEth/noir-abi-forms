import React from 'react';
import { AbiType, IntegerType, StringType, ArrayType } from '@aztec/foundation/abi';
import IntegerTypeInput from '../IntegerType';
import StringTypeInput from '../StringType';
import StructTypeInput from '../StructType';
import BasicTypeInput from '../BasicType';
import TupleTypeInput from '../TupleType';
import ArrayTypeInput from '../ArrayType';

interface TypeInputProps {
  functionArtifact: {
    name: string;
    type: AbiType;
  };
    onChange?: (value: unknown[]) => void;
}

export const TypeInput: React.FC<TypeInputProps> = ({ functionArtifact, onChange }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-zinc-100 font-medium text-sm font-mono">{functionArtifact.name}</div>
        <KindDetails kind={functionArtifact.type.kind} type={functionArtifact.type} />
      </div>
      {
        (() => {
          switch (functionArtifact.type.kind) {
            case 'integer':
              return <IntegerTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'string':
              return <StringTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'struct':
              return <StructTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'tuple':
              return <TupleTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'boolean':
              return <BasicTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'field':
              return <BasicTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            case 'array':
              return <ArrayTypeInput functionArtifact={functionArtifact.type} onChange={onChange} />;
            default:
              return <div>Unsupported type: {(functionArtifact.type as { kind: string }).kind}</div>;
          }
        })()
      }
    </div>
  )
};

export const KindDetails: React.FC<{ kind: AbiType['kind'], type: AbiType }> = ({ kind, type }) => {
  const baseClasses = 'text-gray-300 text-sm font-medium font-mono';

  const getDetails = () => {
    switch (kind) {
      case 'integer':
        return `integer, ${(type as IntegerType).width} bits, ${(type as IntegerType).sign}`;
      case 'string':
        return `string, ${(type as StringType).length}`;
      case 'struct':
        return `struct`;
      case 'tuple':
        return 'tuple';
      case 'boolean':
        return 'boolean';
      case 'field':
        return 'field';
      case 'array':
        return `array[${(type as ArrayType).length ?? '*'}]`;
      default:
        return kind;
    }
  };

  return <div className={baseClasses}>{getDetails()}</div>;
};

export default TypeInput;
