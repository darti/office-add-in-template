import { fetch } from "cross-fetch";
import { Gitlab } from "@gitbeaker/rest";

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
      const s = reader.result.toString();
      const startIndex = s.indexOf("base64,");
      const externalDocument = s.substring(startIndex + 7);

      resolve(externalDocument);
    };

    reader.onerror = reject;
  });

  reader.readAsDataURL(blob);

  return await result;
}

export async function listLibraries(base: string, projectId: string, accessToken: string) {
  const api = new Gitlab({
    host: base,
    token: accessToken,
  });
}
