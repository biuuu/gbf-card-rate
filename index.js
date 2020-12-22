const puppeteer = require('puppeteer')
const rate = require('./get-rate')
const fs = require('fs-extra')
const { downloadImage } = require('./utils')

let savedImage = []
try {
  savedImage = fs.readJSONSync('./dist/info.json')
} catch (e) {
  console.log('read info.json failed')
}

const waitClick = async (sel, page) => {
  await page.waitForSelector(sel)
  await Promise.all([
    page.waitForNavigation(),
    page.click(sel)
  ])
  console.log(`${sel} clicked`)
}

const sleep = (time) => {
  return new Promise(rev => {
    setTimeout(() => rev([]), time)
  })
}

const cardType = ['weapon', 'weapon', 'summon']
const rarityType = {
  2: 'r',
  3: 'sr',
  4: 'ssr'
}

const getCard = (data) => {
  const card = []
  data.forEach(item => {
    const cat = cardType[item.category]
    const type = rarityType[item.rarity]
    item.item.forEach(obj => {
      card.push({
        id: obj.reward_id,
        rate: parseFloat(obj.drop_rate) / 100,
        cat: cat,
        type
      })
    })
  })
  return card
}

const getImage = async (card) => {
  for (let item of card) {
    const url = `http://game-a1.granbluefantasy.jp/assets/img/sp/assets/${item.cat}/m/${item.id}.jpg`
    const name = `card-${item.id}`
    if (!savedImage.includes(name)) {
      try {
        await downloadImage(url, `./dist/image/card/`, `${item.id}.jpg`)
        savedImage.push(name)
        console.log(url)
      } catch (e) {
        console.error(e.message)
      }
    }
  }
}

const updateNextTime = async (time) => {
  const nextDate = new Date(Date.parse(time + '+0900') + 3 * 60 * 1000)
  const min = nextDate.getUTCMinutes()
  const hours = nextDate.getUTCHours()
  const date = nextDate.getUTCDate()
  const month = nextDate.getUTCMonth() + 1
  const cron = `${min} ${hours} ${date} ${month} *`
  const text = (await fs.readFile('./.github/workflows/update-rate.yml')).toString()
  await fs.writeFile('./.github/workflows/update-rate.yml', text.replace(/- cron:  '[^']+'/, `- cron:  '${cron}'`))
}

const str = process.argv[process.argv.length - 1]
let cookie = ''
if (/^--COOKIE=.+/.test(str)) {
  cookie = decodeURIComponent(str.replace('--COOKIE=', ''))
  console.log(cookie)
}

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(60 * 1000)
  await page.setExtraHTTPHeaders({
    Cookie: cookie
  })
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/84.0.4133.0')
  await page.goto('http://game.granbluefantasy.jp/#tutorial/3')
  console.log('loaded')
  
  // await page.waitForSelector('.female')
  // await page.click('.female')

  // await waitClick('.btn-start', page)
  const [rate1, rate10, rateSSR, end] = await Promise.race([page.evaluate(rate), sleep(30 * 1000)])
  if (rate1) {
    await fs.ensureDir('./dist/')
    await fs.outputJSON('./dist/normal.json', rate1)
    await fs.outputJSON('./dist/sr.json', rate10)
    await fs.outputJSON('./dist/ssr.json', rateSSR)
    await getImage(getCard(rate1))
    await getImage(getCard(rate10))
    await getImage(getCard(rateSSR))
    await fs.outputJSON('./dist/info.json', savedImage)
  } else {
    console.log('evalute failed')
  }
  // await updateNextTime(end)
  
  await browser.close()
}

main()