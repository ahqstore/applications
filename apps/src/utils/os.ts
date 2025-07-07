export type Os = "Unknown OS" | "Windows" | "macOS" | "Linux" | "Android" | "iOS";

export function getOperatingSystem(): Os {
  const userAgent = navigator.userAgent.toLowerCase();
  let os: Os = "Unknown OS";

  if (userAgent.includes("windows")) {
    os = "Windows";
  } else if (userAgent.includes("iphone")) {
    os = "iOS";
  } else if (userAgent.includes("android") || userAgent.includes("samsung")) {
    os = "Android";
  } else if (userAgent.includes("linux")) {
    os = "Linux";
  } else if (userAgent.includes("mac os")) {
    os = "macOS";
  }

  return os;
}