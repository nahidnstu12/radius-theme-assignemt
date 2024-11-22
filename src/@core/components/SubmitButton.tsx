import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative px-4 py-2 rounded mr-2 border transition-colors
        ${
          pending
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-50"
        }`}
    >
      <span className={pending ? "opacity-0" : "opacity-100"}>Save</span>

      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </button>
  );
}
