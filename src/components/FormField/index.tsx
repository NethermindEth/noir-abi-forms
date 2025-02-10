import React, { useState } from "react";
import { FormFieldProps } from "../../types";
import { FunctionType } from "@aztec/foundation/abi";
import { cn, getDefaultValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TypeInput from "../inputs/TypeInput";
import { useTheme } from "@/context/ThemeContext";
import { Loader2 } from "lucide-react";

type BadgeVariant =
  | "public"
  | "private"
  | "internal"
  | "static"
  | "initializer";

const customJSONReplacer = (key: string, value: unknown) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

const FormField: React.FC<FormFieldProps> = ({
  functionArtifact,
  onExecute,
  contractService,
}) => {
  const theme = useTheme();

  const [executing, setExecuting] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const getBadgeClasses = (type: BadgeVariant) => {
    return cn(
      theme.components.badge.base,
      theme.components.badge.variants[type],
    );
  };

  const [values, setValues] = useState<unknown[][]>(
    functionArtifact.parameters.map((param) => getDefaultValue(param.type)),
  );

  const handleParameterChange = (index: number, value: unknown[]) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleExecute = async (simulate: boolean = false) => {
    try {
      if (simulate) {
        setSimulating(true);
        const result = await contractService.simulate(
          functionArtifact.name,
          values.flat(),
        );
        onExecute?.(result);
        setSimulating(false);
        setError(null);
        setResult(JSON.stringify(result, customJSONReplacer, 2));
      } else if (functionArtifact.isInitializer) {
        setExecuting(true);
        const result = await contractService.deploy(
          functionArtifact.name,
          values.flat(),
        );
        onExecute?.(result);
        setExecuting(false);
        setError(null);
        setResult(JSON.stringify(result, customJSONReplacer, 2));
      } else {
        setExecuting(true);
        const result = await contractService.call(
          functionArtifact.name,
          values.flat(),
        );
        onExecute?.(result);
        setExecuting(false);
        setError(null);
        setResult(JSON.stringify(result, customJSONReplacer, 2));
      }
    } catch (error) {
      console.error("Error executing contract function:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
      if (simulate) {
        setSimulating(false);
      } else {
        setExecuting(false);
      }
    }
  };

  return (
    <div className={theme.components.functionContainer}>
      <div
        className={cn("flex justify-between items-center", theme.spacing.gap)}
      >
        <div className={cn("flex items-center", theme.spacing.smallGap)}>
          <span
            className={cn(theme.typography.font.mono, theme.colors.text.accent)}
          >
            [function]
          </span>
          <span
            className={cn(
              theme.typography.font.mono,
              theme.typography.font.medium,
              theme.colors.text.primary,
              "tracking-tight",
            )}
          >
            {functionArtifact.name}
          </span>
        </div>
        <div className={cn("flex gap-2")}>
          <Button
            type="button"
            variant="default"
            size="sm"
            className={cn(
              theme.components.button.base,
              theme.components.button.primary,
            )}
            onClick={() => handleExecute(false)}
            disabled={executing || simulating}
          >
            {executing ? (
              <>
                <label className={cn(theme.colors.text.accent, "mr-2")}>
                  Executing
                </label>{" "}
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              "Execute"
            )}
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            className={cn(
              theme.components.button.base,
              theme.components.button.primary,
            )}
            onClick={() => handleExecute(true)}
            disabled={executing || simulating}
          >
            {simulating ? (
              <>
                <label className={cn(theme.colors.text.accent, "mr-2")}>
                  Simulating
                </label>{" "}
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              "Simulate"
            )}
          </Button>
        </div>
      </div>

      <div className={cn("flex flex-wrap", theme.spacing.smallGap)}>
        <span
          className={getBadgeClasses(
            functionArtifact.functionType === FunctionType.PUBLIC
              ? "public"
              : "private",
          )}
        >
          {functionArtifact.functionType === FunctionType.PUBLIC
            ? "public"
            : "private"}
        </span>
        {functionArtifact.isInternal && (
          <span className={getBadgeClasses("internal")}>internal</span>
        )}
        {functionArtifact.isStatic && (
          <span className={getBadgeClasses("static")}>static</span>
        )}
        {functionArtifact.isInitializer && (
          <span className={getBadgeClasses("initializer")}>initializer</span>
        )}
      </div>

      <div className={cn("space-y-4 mt-2")}>
        {functionArtifact.parameters &&
          functionArtifact.parameters.map((param, index) => (
            <div
              key={param.name}
              className={theme.components.function.parameter}
            >
              <TypeInput
                functionArtifact={{
                  name: param.name,
                  type: param.type,
                }}
                onChange={(value) => handleParameterChange(index, value)}
              />
            </div>
          ))}
      </div>
      {error && (
        <div
          className={cn(
            theme.components.error.container,
            theme.colors.text.error,
          )}
        >
          {error}
        </div>
      )}
      {result && (
        <div className={cn(theme.components.result.container)}>
          <div className={cn("flex items-center", theme.spacing.smallGap, "mb-2")}>
            <span className={cn(theme.typography.font.mono, theme.colors.text.accent)}>
              [result]
            </span>
          </div>
          <pre className={cn(theme.colors.text.secondary)}>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default FormField;
