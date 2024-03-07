import {
  ClientActionFunctionArgs,
  Link,
  useLoaderData,
  useFetcher,
} from "@remix-run/react";
import { invoke } from "@tauri-apps/api/tauri";

export async function clientLoader(): Promise<string> {
  const greetName = "Ethan";
  return await invoke("greet", { firstName: greetName });
}

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<string> {
  const formData = new URLSearchParams(await request.text());
  const newName = formData.get("name");

  return await invoke("greet", { firstName: newName });
}

export default function About() {
  const data = useLoaderData<typeof clientLoader>();
  const fetcher = useFetcher<typeof clientAction>();

  return (
    <div>
      About Page
      <p>{fetcher.data ? fetcher.data : data}</p>
      <fetcher.Form method="post">
        <input type="text" name="name" />
        <button type="submit">Change Name</button>
      </fetcher.Form>
      <Link to="/">Go Home</Link>
    </div>
  );
}
