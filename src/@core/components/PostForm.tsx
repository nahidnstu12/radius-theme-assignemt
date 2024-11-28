"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { LINK_USER_POST } from "../helpers/apiLinks";
import FileUploadComponent from "./FileUploadComponent";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";

interface FormErrors {
  title?: string[];
  content?: string[];
  location?: string[];
  image?: string[];
}

interface PostFormProps {
  formAction: any;
  initialData?: {
    title: string;
    content: string;
    location: string;
  };
}

export default function PostForm({ formAction }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [formState, action] = useActionState<{
    errors: FormErrors;
    message: string;
  }>(formAction, {
    errors: {},
    message: "",
  });

  useEffect(() => {
    if (formState?.message) {
      startTransition(() => {
        // showToast("success", formState?.message);
        alert(formState?.message);
        router.refresh();
        router.push(LINK_USER_POST);
      });
    }
  }, [formState?.message, router]);

  const handleAction = async (formData: FormData) => {
    if (submitted) return;
    setSubmitted(true);

    try {
      // @ts-ignore
      await action(formData);
    } catch (err) {
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 mt-6">Create Post</h1>
      <form action={handleAction}>
        <div className="w-9/12">
          <TextInput id="title" formState={formState} lable="Title" />
          <TextareaInput id="content" formState={formState} lable="Content" />
          <TextInput id="location" formState={formState} lable="Location" />

          <FileUploadComponent formState={formState} />

          <div className="mb-4">
            <SubmitButton />
            <Link
              href={LINK_USER_POST}
              className={`bg-transparent px-4 py-2 rounded border
                ${
                  isPending || submitted
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-gray-50"
                }`}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
