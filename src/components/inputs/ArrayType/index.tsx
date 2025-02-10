import React, { useMemo, useState } from "react";
import { ArrayType } from "@aztec/foundation/abi";
import TypeInput from "../TypeInput";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { cn, getDefaultValue } from "@/lib/utils";

const MAX_VISIBLE_ELEMENTS = 7;

interface ArrayTypeInputProps {
  functionArtifact: ArrayType;
  onChange?: (value: unknown[]) => void;
}

export const ArrayTypeInput: React.FC<ArrayTypeInputProps> = ({
  functionArtifact,
  onChange,
}) => {
  const [elements, setElements] = useState<unknown[][]>(
    functionArtifact.length
      ? Array(functionArtifact.length).fill(
          getDefaultValue(functionArtifact.type),
        )
      : [],
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  const handleElementChange = (index: number, value: unknown[]) => {
    const newElements = [...elements];
    newElements[index] = value;
    setElements(newElements);
    onChange?.(newElements.flat());
  };

  const isInfinite =
    functionArtifact.length === null ||
    functionArtifact.length === undefined ||
    functionArtifact.length === 0;

  const canAdd = useMemo(() => {
    return isInfinite ? true : elements.length < functionArtifact.length;
  }, [elements.length, functionArtifact.length, isInfinite]);

  const addElement = () => {
    if (!canAdd) {
      return;
    }
    setElements([...elements, []]);
  };

  const removeElement = (index: number) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
    onChange?.(newElements.flat());
  };

  const visibleElements = isExpanded
    ? elements
    : elements.slice(0, MAX_VISIBLE_ELEMENTS);
  const hasHiddenElements = elements.length > MAX_VISIBLE_ELEMENTS;

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300 font-mono">
          array[{functionArtifact.length ?? "*"}]
        </span>
        <div className="flex gap-2">
          {hasHiddenElements && (
            <Button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              size="sm"
              className={cn(
                "font-mono text-xs",
                theme.components.button.outline,
              )}
            >
              {isExpanded ? "Show Less" : `Show All (${elements.length})`}
            </Button>
          )}
          <Button
            type="button"
            onClick={addElement}
            variant="outline"
            size="sm"
            disabled={!canAdd}
            className={cn("font-mono text-xs", theme.components.button.outline)}
          >
            + Add Element
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {visibleElements.map((_, index) => (
          <div key={index} className="relative group">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => removeElement(index)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <span className="font-mono">×</span>
              </button>
            </div>
            <div className="border border-gray-700 p-2 rounded-md hover:border-gray-600 transition-colors">
              <TypeInput
                functionArtifact={{
                  name: `[${index}]`,
                  type: functionArtifact.type,
                }}
                onChange={(value) => handleElementChange(index, value)}
              />
            </div>
          </div>
        ))}

        {!isExpanded && hasHiddenElements && (
          <div
            className={cn(
              "text-center py-2 border border-dashed rounded-md cursor-pointer",
              theme.colors.border.default,
              theme.colors.text.secondary,
              theme.colors.bg.hover,
            )}
            onClick={() => setIsExpanded(true)}
          >
            {elements.length - MAX_VISIBLE_ELEMENTS} more elements...
          </div>
        )}
      </div>

      {!canAdd && (
        <p
          className={cn(
            "text-xs",
            theme.colors.text.warning,
            theme.typography.font.mono,
          )}
        >
          Maximum length ({functionArtifact.length}) reached
        </p>
      )}
    </div>
  );
};

export default ArrayTypeInput;
