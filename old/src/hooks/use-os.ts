export type System = "windows" | "android" | "linux" | "unsupported"

export function useOperatingSystem(): System {
  // @ts-ignore
  const agent = navigator.userAgent.toLowerCase();

  if (agent.includes("windows")) {
    return "windows"
  }

  if (agent.includes("android") || agent.includes("samsung")) {
    return "android"
  }

  if (agent.includes("linux")) {
    return "linux"
  }

  return "unsupported"
}