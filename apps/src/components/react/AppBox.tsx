import type { AHQStoreApplication } from "ahqstore-types";

export function AppBox({ application, img }: { application: AHQStoreApplication, img: string }) {
  return <div className="w-full h-full flex gap-1 sm:gap-2" onClick={() => {
    window.location.pathname = `/applications/`
  }}>
    <img className="m-0 size-auto border-none rounded-xl" src={img} />
    <div className="w-full h-full flex flex-col overflow-hidden gap-1 sm:gap-2">
      <h1 className="mt-1 sm:mt-2 sm:mb-1 mr-auto sm:m-0 text-sm sm:text-lg md:text-xl font-medium sm:font-bold font-sans">{application.appDisplayName}</h1>
      <h2 className="overflow-hidden line-clamp-1 sm:line-clamp-2">{application.description || "Click to view more"}</h2>
    </div>
  </div>
}