import { component$, useSignal } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../../../../db";
import { QSnippetEditForm } from "~/integrations/react/snippet-edit-form";

export const useSnippet = routeLoader$(async (requestEvent) => {
  return await db.snippet.findFirst({
    where: { id: parseInt(requestEvent.params.id) },
  });
});

export const useEditSnippetAction = routeAction$(async (data, requestEvent) => {
  const id = parseInt(data.id.toString());
  const code = data.code.toString();
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  throw requestEvent.redirect(301, `/snippets/${data.id}`);
});

export default component$(() => {
  const snippetSignal = useSnippet();
  const editSnippetAction = useEditSnippetAction();
  const snippetCode = useSignal(snippetSignal.value?.code || "");

  return (
    <>
      <div class="my-4">
        <QSnippetEditForm
          snippetCode={snippetSignal.value?.code || ""}
          onChange$={(code) => {
            snippetCode.value = code;
          }}
        />
        <Form action={editSnippetAction}>
          <input type="hidden" name="id" value={snippetSignal.value?.id} />
          <input type="hidden" name="code" value={snippetCode.value} />
          <button type="submit" class="p-2 my-2 border rounded float-right">
            Save
          </button>
        </Form>
      </div>
      <div class="my-4 text-cyan-400">
        <Link href="/">Back to snippets</Link>
      </div>
    </>
  );
});
