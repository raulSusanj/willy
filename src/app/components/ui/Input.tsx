interface InputPropsI {
  label: string;
  value: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
  placeholder?: string;
  className?: string;
}

export default function Input({
  label,
  value,
  onChangeValue,
  inputType = "text",
  placeholder,
  className,
}: InputPropsI) {
  return (
    <div>
      <p className="text-md text-gray-700">{label}</p>
      <input
        type={inputType || "text"}
        className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
          className || ""
        }`}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChangeValue}
      />
    </div>
  );
}
