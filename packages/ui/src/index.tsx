export * from './components/button';

// Placeholder para o componente Button
export const Button = ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors ${props.className || ''}`}
    >
      {children}
    </button>
  );
}; 