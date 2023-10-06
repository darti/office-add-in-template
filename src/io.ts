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

export async function listLibraries(): Promise<string[]> {
  // const url = `${base}/api/v4/projects/${projectId}/repository/tree?private_token=${accessToken}`;
  const data = await fetch("https://localhost:3000/templates", { mode: "cors" });
  const files = await data.json();

  return files;
}
