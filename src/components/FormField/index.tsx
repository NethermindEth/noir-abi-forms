import React, { useState } from 'react';
import { FormFieldProps } from '../../types';
import { FunctionType } from '@aztec/foundation/abi';
import { cn, getDefaultValue } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TypeInput from '../inputs/TypeInput';
import { useTheme } from '@/context/ThemeContext';

type BadgeVariant = 'public' | 'private' | 'internal' | 'static' | 'initializer';

const FormField: React.FC<FormFieldProps> = ({
  functionArtifact,
  onExecute,
  contractService,
}) => {
  const theme = useTheme();

  const getBadgeClasses = (type: BadgeVariant) => {
    return cn(
      theme.components.badge.base,
      theme.components.badge.variants[type]
    );
  };

  const [values, setValues] = useState<unknown[][]>(
    functionArtifact.parameters.map((param) => getDefaultValue(param.type))
  );

  const handleParameterChange = (index: number, value: unknown[]) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleExecute = async () => {
    try {
      if (functionArtifact.isInitializer) {
        const result = await contractService.deploy(functionArtifact.name, values.flat());
        onExecute?.(result);
      } else {
        const result = await contractService.call(functionArtifact.name, values.flat());
        onExecute?.(result);
      }
    } catch (error) {
      console.error('Error executing contract function:', error);
      // Here you might want to add error handling UI
    }
  };

  return (
    <div className={theme.components.functionContainer}>
      <div className={cn('flex justify-between items-center', theme.spacing.gap)}>
        <div className={cn('flex items-center', theme.spacing.smallGap)}>
          <span className={cn(theme.typography.font.mono, theme.colors.text.accent)}>[function]</span>
          <span className={cn(
            theme.typography.font.mono,
            theme.typography.font.medium,
            theme.colors.text.primary,
            'tracking-tight'
          )}>
            {functionArtifact.name}
          </span>
        </div>
        <Button
          type="button"
          variant="default"
          size="sm"
          className={cn(theme.components.button.base, theme.components.button.primary)}
          onClick={handleExecute}
        >
          Execute {functionArtifact.name}
        </Button>
      </div>

      <div className={cn('flex flex-wrap', theme.spacing.smallGap)}>
        <span className={getBadgeClasses(functionArtifact.functionType === FunctionType.PUBLIC ? 'public' : 'private')}>
          {functionArtifact.functionType === FunctionType.PUBLIC ? 'public' : 'private'}
        </span>
        {functionArtifact.isInternal && (
          <span className={getBadgeClasses('internal')}>internal</span>
        )}
        {functionArtifact.isStatic && (
          <span className={getBadgeClasses('static')}>static</span>
        )}
        {functionArtifact.isInitializer && (
          <span className={getBadgeClasses('initializer')}>initializer</span>
        )}
      </div>

      <div className={cn('space-y-4 mt-2')}>
        {functionArtifact.parameters && functionArtifact.parameters.map((param, index) => (
          <div key={param.name} className={theme.components.function.parameter}>
            <TypeInput
              functionArtifact={{
                name: param.name,
                type: param.type
              }}
              onChange={(value) => handleParameterChange(index, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormField;