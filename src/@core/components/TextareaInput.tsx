interface ITextareaProps {
  lable: string;
  id: string;
  formState: any;
}

export default function TextareaInput({
  lable,
  id,
  formState,
}: ITextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {lable}
      </label>

      <textarea
        rows={5}
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
