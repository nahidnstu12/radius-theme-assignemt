import React, { useState } from "react";

export default function FileUploadComponent({formState}:any) {
  const [preview, setPreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-6">
        <label className="block">
          <span className="sr-only">Choose image</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
          />
        </label>
        {preview && (
          <div className="shrink-0">
            <img
              className="h-28 w-28 object-cover"
              src={preview}
              alt="Preview"
            />
          </div>
        )}
      </div>
      {formState?.errors?.image && (
        <div className="text-red-500">
          {formState?.errors?.image?.join(", ")}
        </div>
      )}
    </div>
  );
}
