interface ITextInputProps {
  lable: string;
  type?: string;
  id: string;
  formState: any;
}

export default function TextInput({
  lable,
  type = "text",
  id,
  formState,
}: ITextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {lable}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="rounded p-2 w-full border"
      />
      {formState?.errors?.[id] && (
        <div className="text-red-500">
          {formState?.errors?.[id]?.join(", ")}
        </div>
      )}
    </div>
  );
}
