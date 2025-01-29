# Noir ABI Forms

A modern React library for generating forms from Noir smart contract ABIs.

## Features

- Dynamic form generation from Noir contract ABIs
- Type-safe form handling with Zod validation
- Modern React patterns with hooks and functional components
- Tailwind CSS styling with customization options
- Full TypeScript support

## Installation

```bash
npm install noir-abi-forms
# or
yarn add noir-abi-forms
# or
pnpm add noir-abi-forms
```

## Usage

```tsx
import { NoirForm } from 'noir-abi-forms';

const MyComponent = () => {
  const abi = {
    functions: [
      {
        name: 'myFunction',
        inputs: [
          { name: 'amount', type: 'uint256' },
          { name: 'recipient', type: 'address' }
        ],
        outputs: []
      }
    ]
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <NoirForm
      abi={abi}
      functionName="myFunction"
      onSubmit={handleSubmit}
    />
  );
};
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Build the library:
   ```bash
   pnpm build
   ```

## License

MIT
# noir-abi-forms
