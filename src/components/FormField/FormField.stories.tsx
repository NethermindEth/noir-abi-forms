import type { Meta, StoryObj } from "@storybook/react";
import FormField from ".";
import SAMPLE_ABI from "../../assets/counter-Counter.json";
import { FunctionArtifact } from "@aztec/foundation/abi";
import { mockContractService } from "@/mocks";

const functions = SAMPLE_ABI.functions as unknown as FunctionArtifact[];

const getFunctionSignature = (func: FunctionArtifact) => {
  const params = func.parameters || [];
  return `${func.name}(${params.map((p) => `${p.name}: ${p.type}`).join(", ")})`;
};

const meta = {
  title: "Components/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    functionArtifact: {
      options: functions.map((func) => func.name),
      mapping: functions.reduce(
        (acc, func) => ({
          ...acc,
          [func.name]: func,
        }),
        {},
      ),
      control: {
        type: "select",
        labels: functions.reduce(
          (acc, func) => ({
            ...acc,
            [func.name]: getFunctionSignature(func),
          }),
          {},
        ),
      },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    functionArtifact: functions[0],
    contractService: mockContractService,
    onExecute: (data) => console.log('Function executed:', data),
  },
};
