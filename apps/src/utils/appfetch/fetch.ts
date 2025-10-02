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
const getAppAsset = async (appId: string, asset: string, urls: Constants) => {
  const { url, appId: aId } = getPartFromURL(appId, urls);

  const uri = url.asset.replace("{APP_ID}", aId).replace("{ASSET}", asset);

  return {
    asset: await fetch(uri)
      .then((d) => d.arrayBuffer()),
    url: uri
  };
};

export async function getAppWrapped(appId: string, urls: Constants): Promise<[AHQStoreApplication, string]> {
  const [app, { asset: img, url: uri }] = await Promise.all([
    getApp(appId, urls),
    getAppAsset(appId, "0", urls)
  ]);

  let url = uri;

  if (appId.startsWith("f:")) {
    const uri = new TextDecoder().decode(img);

    url = uri;
  }

  return [app, url];
}