export type System = "windows" | "android" | "linux" | "unsupported"

export function useOperatingSystem(): System {
  const agent = navigator.userAgent.toLowerCase();

  if (agent.includes("windows")) {
    return "windows"
  }

  if (agent.includes("linux")) {
    return "linux"
  }

  if (agent.includes("android")) {
    return "android"
  }

  return "unsupported"
}