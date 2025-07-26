import { createFileRoute } from "@tanstack/react-router";
import { Epub } from "~/client/components/reader/epub";
import { UploadEpub } from "~/client/components/reader/upload-epub";
import { Binaries } from "~/server/dw/tsx/binaries";
import { Files101 } from "~/server/dw/tsx/files";

export const Route = createFileRoute("/reader/")({
  component: RouteComponent,
});

const bookUrl = "/books/book.epub";

function RouteComponent() {
  return (
    <div>
      {/* <RefsEffect />
      <EpubReader url={bookUrl} /> */}
      {/* <Epub url={bookUrl} /> */}
      {/* <Binaries /> */}
      <UploadEpub />
    </div>
  );
}
