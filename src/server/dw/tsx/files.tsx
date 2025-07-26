import { useMutation } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import z from "zod";
import { JsonViewer } from "~/client/components/json-viewer";
import { Button } from "~/client/components/ui/button";
import { Input } from "~/client/components/ui/input";
import { Label } from "~/client/components/ui/label";

const ZUploadFile = z.object({
  file: z
    .instanceof(File, { message: "No file detected" })
    .refine(
      (f) => {
        return f.size <= 5 * 1024 * 1024;
      },
      { message: "File must be less than 5MB" },
    )
    .refine(
      (f) => ["application/pdf", "application/epub+zip"].includes(f.type),
      {
        message: "Unsupported File Type",
      },
    ),
});

const uploadFile = createServerFn({
  method: "POST",
  response: "data",
  type: "dynamic",
})
  .validator((formData: FormData) => {
    const bookFile = formData.get("book");
    console.log("validator", bookFile);
    return ZUploadFile.parse({ file: bookFile });
  })
  .type("dynamic")
  .handler(({ data: { file } }) => {
    console.log("server function ran");
    console.log(file);
    return { response: "Yo my friend." };
  });
export function Files101() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const {
    mutateAsync: uploadFileMutation,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: useServerFn(uploadFile),
  });

  console.log(file);

  const handleUpload = async function () {
    if (file) {
      const fileFormData = new FormData();
      console.log("fileFormData", fileFormData);
      fileFormData.append("book", file);
      await uploadFileMutation({
        data: fileFormData,
      });
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 pt-10">
      <div>{isPending && "Mutation Pending"}</div>
      <div className="flex min-h-48 flex-col gap-5 rounded outline">
        <div>{file?.name}</div>
        <div>{file?.lastModified}</div>
      </div>
      <Label htmlFor="book">Upload Book</Label>
      <Input
        id="book"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button disabled={file === undefined} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
