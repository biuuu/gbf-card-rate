const puppeteer = require('puppeteer')
const rate = require('./get-rate')
const fs = require('fs-extra')

const waitClick = async (sel, page) => {
  await page.waitForSelector(sel)
  await Promise.all([
    page.waitForNavigation(),
    page.click(sel)
  ])
  console.log(`${sel} clicked`)
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

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(60 * 1000)
  await page.setExtraHTTPHeaders({
    Cookie: 'access_gbtk=e4fde41d4bb14b58fa941f14a318c190fbfd1146; access_gbtk=e4fde41d4bb14b58fa941f14a318c190fbfd1146; _fbp=fb.1.1591857823982.979263735; wing=%2Fc4GN2uLIEX3IRHjp0gnxMoDyRUDYPOSma5%2BcaDP8EX2UvExM%2B3pLNp16sIOVK3D; t=notoken; midship=S%3AKNTIaocNoCgTCryjsOMVIDX38dwiKO0wcBjSSNDyDm9BLaxbWdaWv4fjHlFy-7sr1_FQHGH469sxeWSnHgA2ss5oUhPx6JXpfU-EDgOhKH11gOGmvof167GcbH9EIvsV1jCaTn8DLEYDhw9IDJkGZT_MwahopZmOwuwNJlCD9EKHTQ6CbxbJEuWICz3M0gGdrETSbn0F9VMhCb6WB8ODpliRMw5atQ0olK48Cf_KQXJr_Q%3D%3D'
  })
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/84.0.4133.0')
  await page.goto('http://game.granbluefantasy.jp/#tutorial/3')
  console.log('loaded')
  
  // await page.waitForSelector('.female')
  // await page.click('.female')

  // await waitClick('.btn-start', page)
  
  const [rate1, rate10, rateSSR, end] = await page.evaluate(rate)

  await fs.ensureDir('./dist/')
  await fs.outputJSON('./dist/normal.json', rate1)
  await fs.outputJSON('./dist/sr.json', rate10)
  await fs.outputJSON('./dist/ssr.json', rateSSR)

  // await updateNextTime(end)
  
  await browser.close()
}

main()