import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../../../db";

export const useSnippet = routeLoader$(async (requestEvent) => {
  return await db.snippet.findFirst({
    where: { id: parseInt(requestEvent.params.id) },
  });
});

export const useDeleteSnippetAction = routeAction$(
  async (data, requestEvent) => {
    const id = parseInt(data.id.toString());
    await db.snippet.delete({
      where: { id },
    });

    throw requestEvent.redirect(301, "/");
  }
);

export default component$(() => {
  const snippetSignal = useSnippet();
  const deleteSnippetAction = useDeleteSnippetAction();

  return (
    <div>
      <div class="flex m-4 justify-between items-center">
        <h1 class="text-xl font-bold">{snippetSignal.value?.title}</h1>
        <div class="flex gap-4">
          <Link
            href={`/snippets/${snippetSignal.value?.id}/edit`}
            class="p-2 border rounded"
          >
            Edit
          </Link>
          <Form action={deleteSnippetAction}>
            <input type="hidden" name="id" value={snippetSignal.value?.id} />
            <button class="p-2 border rounded">Delete</button>
          </Form>
        </div>
      </div>
      <pre class="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippetSignal.value?.code}</code>
      </pre>
      <div class="my-4 text-cyan-400">
        <Link href="/">Back to snippets</Link>
      </div>
    </div>
  );
});
