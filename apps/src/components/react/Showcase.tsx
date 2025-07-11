import type { HomeData } from "@/utils/interfaces/home";

import { ChevronRight } from "lucide-react";

import "./showcase.css"

export interface ShowcaseProps {
  data: HomeData,
}

const identMap: { [key: string]: string } = {
  "w": "win32",
  "a": "community"
};

export function Showcase({ data }: ShowcaseProps) {
  const home = data.home;
  const splash = data.splash;
  console.log(splash);

  return <div className="px-2">
    {splash && <>
      <div className="flex flex-col mt-3 lg:flex-row grow-0 w-full gap-5 animate">
        <div className="hero" style={{ background: `url("${splash.hero.background}") center/cover` }}>
          <div></div>
          <div className="flex flex-col h-full">
            <h1>{splash.hero.title}</h1>
            <h2 className="">{splash.hero.description}</h2>

            <div className="w-full">
              <a href={`/applications/view/${identMap[splash.hero.appId[0]]}/${splash.hero.appId.substring(2)}`}>{splash.hero.button}</a>
            </div>

            <h3 className="mt-auto mb-2 hidden md:block">{splash.hero.author}</h3>
          </div>
        </div>

        <div className="cards">
          <a href={`/applications/view/${identMap[splash.hero.appId[0]]}/${splash.hero.appId.substring(2)}`}>
            <div style={{ color: splash.subhero.color }}>
              {splash.subhero.title}
            </div>
            <img src={splash.subhero.background} alt="Background" />
          </a>

          <a href={`/applications/view/${identMap[splash.hero.appId[0]]}/${splash.hero.appId.substring(2)}`}>
            <div style={{ color: splash.third.color }}>
              {splash.third.title}
            </div>
            <img src={splash.third.background} alt="background" />
          </a>

          <a href={`/applications/view/${identMap[splash.hero.appId[0]]}/${splash.hero.appId.substring(2)}`}>
            <div style={{ color: splash.fourth.color }}>
              {splash.fourth.title}
            </div>
            <img src={splash.fourth.background} alt="background" />
          </a>
        </div>
      </div>
    </>}

    {
      home?.map((apps) =>
        <div className="home_apps" key={apps[0]}>
          <div>
            <span>{apps[0]}</span>
            <ChevronRight className="arrow" />
            <button className="all">
              <span>All</span>
              <ChevronRight className="arrow" />
            </button>
          </div>
          <div>
            {
              apps[1].map((app) => (
                <div key={`${app}${apps[0]}`}>{app}</div>
              ))
            }
          </div>
        </div>
      )
    }
  </div>;
}