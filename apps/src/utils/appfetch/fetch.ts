import type { AHQStoreApplication } from "ahqstore-types";

interface Constants {
  AS: {
    app: string;
    asset: string;
  };
  FD: {
    app: string;
    asset: string;
  };
  LI: {
    app: string;
    asset: string;
  };
  WG: {
    app: string;
    asset: string;
  };
}

const getPartFromURL = (appId: string, urls: Constants) => {
  const startsWith = appId[0];

  switch (startsWith) {
    case "a":
      return {
        url: urls.AS,
        appId: appId.substring(2)
      };
    case "f":
      return {
        url: urls.FD,
        appId: appId.substring(2)
      };
    case "w":
      return {
        url: urls.WG,
        appId: appId.substring(2)
      };
    case "l":
      return {
        url: urls.LI,
        appId: appId.substring(2)
      };
    default:
      throw new Error("Impossible");
  }
}

const getApp = async (appId: string, urls: Constants) => {
  const { url, appId: aId } = getPartFromURL(appId, urls);

  return fetch(url.app.replace("{APP_ID}", aId))
    .then((d) => d.json());
};
const getAppAsset = (appId: string, asset: string, urls: Constants) => {
  const { url, appId: aId } = getPartFromURL(appId, urls);

  return fetch(url.asset.replace("{APP_ID}", aId).replace("{ASSET}", asset))
    .then((d) => d.arrayBuffer());
};

async function blobToBase64(blob: Blob): Promise<string> {
  // 1. Convert the Blob to an ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // 2. Create a Node Buffer from the ArrayBuffer
  const buffer = Buffer.from(arrayBuffer);

  // 3. Convert the Buffer to a Base64 string
  // We prepend the data URI scheme for immediate use on the client
  return `data:${blob.type || 'application/octet-stream'};base64,${buffer.toString('base64')}`;
}


export async function getAppWrapped(appId: string, urls: Constants): Promise<[AHQStoreApplication, string]> {
  const [app, img] = await Promise.all([
    getApp(appId, urls),
    getAppAsset(appId, "0", urls)
  ]);

  let blob = new Blob([img as unknown as any]);

  if (appId.startsWith("f:")) {
    const url = new TextDecoder().decode(await blob.arrayBuffer());

    blob = await fetch(url)
      .then((d) => d.arrayBuffer())
      .then((d) => new Blob([d]));
  }

  return [app, await blobToBase64(blob)];
}