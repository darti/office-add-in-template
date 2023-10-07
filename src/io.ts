import { fetch } from "cross-fetch";
import { Lib } from "./state";

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

export async function loadLib(path: string): Promise<Lib> {
  const data = await fetchTemplate(path);

  return await Word.run(async (context) => {
    const doc = context.application.createDocument(data);
    await context.sync();

    doc.contentControls.load("text");
    doc.contentControls.load("items");
    await context.sync();

    const name = doc.contentControls.getByTag("Library Name").getFirstOrNullObject();
    name.load("text");

    name.split;
    await context.sync();

    return new Lib(name.text, path, doc);
  });
}

export async function loadLibs(): Promise<Lib[]> {
  const files = await listLibraries();

  return await Promise.all(files.map(loadLib));
}
