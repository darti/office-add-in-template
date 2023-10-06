import { fetch } from "cross-fetch";

export async function fetchTemplate(path: string): Promise<string> {
  const data = await fetch(`https://localhost:3000/template/${path}`, { mode: "cors" });
  const template = await data.text();
  return template;
}

export async function listLibraries(): Promise<string[]> {
  const data = await fetch("https://localhost:3000/templates", { mode: "cors" });
  const files = await data.json();

  return files;
}
