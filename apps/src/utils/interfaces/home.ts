export interface HomeData {
  splash: {
    hero: {
      title: string,
      description: string,
      button: string,
      background: string,
      author: string,
      appId: string
    },
    subhero: {
      title: string,
      background: string,
      appId: string,
      color: string
    },
    third: {
      title: string,
      background: string,
      appId: string,
      color: string
    },
    fourth: {
      title: string,
      background: string,
      appId: string,
      color: string
    }
  }
  home: [string, string[]][]
}