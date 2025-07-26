import {
  createFormHook,
  createFormHookContexts,
  formOptions,
  useForm,
} from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { Label } from "../ui/label";
import { R } from "node_modules/@mastra/core/dist/logger-Bpa2oLL4";
import { JsonViewer } from "../json-viewer";
import { FormDescription } from "../ui/form";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { parseEpub } from "@gxl/epub-parser";

const ZEpubSchema = z
  .object({
    file: z
      .instanceof(File, { message: "You can only upload a file." })
      .optional(),
  })
  .refine((data) => data.file instanceof File, {
    message: "Please upload a file.",
    path: ["file"],
  });

type TEpub = z.infer<typeof ZEpubSchema>;

const uploadFile = createServerFn({
  method: "POST",
  response: "data",
  type: "dynamic",
})
  .validator((formData: FormData) => {
    const bookFile = formData.get("book");
    return ZEpubSchema.parse({ file: bookFile });
  })
  .type("dynamic")
  .handler(async ({ data: { file } }) => {
    if (!file) {
      throw new Error("No file found");
    }
    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(arrayBuffer);
    const epub = await parseEpub(nodeBuffer, {
      type: "buffer",
    });
    console.log("server function ran");
    console.log("📕 Epub", epub);
    return { success: true };
  });

export function UploadEpub() {
  const {
    mutateAsync: uploadFileMutation,
    isPending,
    error,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: useServerFn(uploadFile),
  });
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      file: undefined,
    } as TEpub,
    validators: {
      onBlur: ZEpubSchema,
      onSubmit: ZEpubSchema,
    },
    onSubmit: async ({ value, formApi, meta }) => {
      if (value.file) {
        const formData = new FormData();
        formData.append("book", value.file);
        await uploadFileMutation({ data: formData });
        formApi.reset();
      }
    },
  });

  return (
    <div className="flex w-2xl flex-col gap-2">
      <div>{isSuccess && <Badge>Done</Badge>}</div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field
          name="file"
          children={({ state: { meta, value }, handleBlur, handleChange }) => {
            return (
              <>
                <label
                  htmlFor="file"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-gray-700">
                    {value?.name || "No file chosen"}
                  </span>
                  {/* Custom button text */}
                  <span className="bg-primary text-primary-foreground cursor-pointer rounded px-4 py-2">
                    Select EPUB
                  </span>

                  {/* Hidden real input */}
                  <Input
                    id="file"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={(e) => handleChange(e.target.files?.[0])}
                    onBlur={handleBlur}
                  />

                  {/* Display selected file name or placeholder */}
                </label>

                {/* Validation error */}
                {meta.errors.length > 0 && (
                  <p className="text-red-600">{meta.errors[0]?.message}</p>
                )}
              </>
            );
          }}
        />
        <Button>Upload</Button>
      </form>
    </div>
  );
}

{
  /*      
      <Subscribe
        selector={(state) => state.values}
        children={(values) => <JsonViewer src={values} />}
      /> */
}
{
  /* <Field
          name="title"
          children={({ state, handleChange, handleBlur }) => (
            <>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
              {state.meta.errors.length > 0 && (
                <p className="text-red-600">
                  {state.meta.errors.length > 0 &&
                    state.meta.errors[0]?.message}
                </p>
              )}
            </>
          )}
        /> */
}
