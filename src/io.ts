import { fetch } from "cross-fetch";

export async function fetchTemplate(
  base: string,
  projectId: string,
  accessToken: string,
  path: string,
): Promise<string> {
  const url = `${base}/api/v4/projects/${projectId}/repository/files/${path}/raw?ref=main&lfs=true&private_token=${accessToken}`;

  const data = await fetch(url, { mode: "cors" });
  const blob = await data.blob();

  const reader = new FileReader();

  const result = new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      // Remove the metadata before the Base64-encoded string.
      const s = reader?.result?.toString();

      if (s) {
        const startIndex = s.indexOf("base64,");
        const externalDocument = s.substring(startIndex + 7);

        resolve(externalDocument);
      } else {
        reject("No result");
      }
    };

    reader.onerror = reject;
  });

  reader.readAsDataURL(blob);

  return await result;
}

export async function listLibraries(base: string, projectId: string, accessToken: string): Promise<string[]> {
  // const url = `${base}/api/v4/projects/${projectId}/repository/tree?private_token=${accessToken}`;
  const url = `${base}/api/v4/projects/${projectId}/repository/files/Hero%20Word.docx/raw?ref=main&lfs=true&private_token=${accessToken}`;

  const data = await fetch(url);
  const files = await data.json();

  console.error("Narf");

  return files /*.filter((f) => f.name.endsWith(".docx")).*/
    .map((f: { path: string }) => f.path);

  return files;
}
