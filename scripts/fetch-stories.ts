import { promises as fs } from 'fs'
import got from 'got'

const ENDPOINT = "https://hacker-news.firebaseio.com/v0"
const TOP_STORIES = `${ENDPOINT}/topstories.json`

const main = async () => {
  const topstories = await got(TOP_STORIES).json() as number[]
  const items = await Promise.all(
    topstories
      .slice(0, 20)
      .map(id => `${ENDPOINT}/items/${id}`)
      .map(url => got(url))
      .map(res => res.json())
  )

  // TODO: add type
  items.map((story: any) => fs.writeFile(`./data/${story.id}.json`, JSON.stringify(story)))
}

main().catch(err => { throw Error(err) })
