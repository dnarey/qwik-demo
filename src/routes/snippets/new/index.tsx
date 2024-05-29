import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { db } from "~/db";

export const useCreateSnippetAction = routeAction$(
  async (data, requestEvent) => {
    try {
      // Check the user's inputs and make sure they're valid
      const title = data.title;
      const code = data.code;

      if (typeof title !== "string" || title.length < 3) {
        return {
          message: "Title must be longer",
        };
      }
      if (typeof code !== "string" || code.length < 10) {
        return {
          message: "Code must be longer",
        };
      }

      // Create a new record in the database
      await db.snippet.create({
        data: {
          title,
          code,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return {
          message: err.message,
        };
      } else {
        return {
          message: "Something went wrong...",
        };
      }
    }

    throw requestEvent.redirect(301, "/");
  }
);

export default component$(() => {
  const createSnippetAction = useCreateSnippetAction();
  return (
    <Form action={createSnippetAction}>
      <h3 class="font-bold m-3">Create a Snippet</h3>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <label class="w-12" for="title">
            Title
          </label>
          <input name="title" class="border rounded p-2 w-full" id="title" />
        </div>

        <div class="flex gap-4">
          <label class="w-12" for="code">
            Code
          </label>
          <textarea name="code" class="border rounded p-2 w-full" id="code" />
        </div>

        {createSnippetAction.value?.message ? (
          <div class="my-2 p-2 bg-red-200 border rounded border-red-400">
            {createSnippetAction.value.message}
          </div>
        ) : null}

        <button type="submit" class="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </Form>
  );
});
