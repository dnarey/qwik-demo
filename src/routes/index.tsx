import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../db";

export const useSnippets = routeLoader$(async () => {
  return await db.snippet.findMany();
});

export default component$(() => {
  const snippetsSignal = useSnippets();

  const renderedSnippets = snippetsSignal.value.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        class="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div class="flex m-2 justify-between items-center">
        <h1 class="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" class="border p-2 rounded">
          New
        </Link>
      </div>
      <div class="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Snippets in Qwik",
  meta: [
    {
      name: "description",
      content: "Manage code snippets with Qwik app",
    },
  ],
};
