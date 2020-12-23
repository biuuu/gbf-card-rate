const getChar = async (id10) => {
  const res = await $.get(`/gacha/content/release/legend/${id10}`)
  const html = decodeURIComponent(res.data)
  const $html = $(html)
  const data = {}
  const items = $html
    .find('.prt-release-lineup .prt-lineup:eq(0)')
    .find('.prt-topic-item')
    .find('.lis-topic-item')
  items.each(function () {
    const item = $(this)
    const wid = item.find('.btn-topic .img-topic').attr('alt')
    const cid = item.find('.btn-character .img-open-character').attr('alt').replace(/_0[12]$/, '')
    if (wid && cid) {
      data[wid] = cid
    }
  })
}

const main = async () => {
  let id10
  let id1
  let idSSR
  let end
  await $.get('/gacha/list').then(data => {
    data.legend.lineup.forEach(item => {
      if (item.times === '10') {
        if (item.description.includes('SSレア')) {
          if (item.campaign_gacha_ids && item.campaign_gacha_ids.length) {
            let idx = Math.floor(Math.random() * item.campaign_gacha_ids.length)
            idSSR = item.campaign_gacha_ids[idx].id
          } else {
            idSSR = item.id
          }
        } else {
          id10 = item.id
          end = item.service_end
        }
      } else if (item.times === '1') {
        id1 = item.id
      }
    })
  })

  let rate1 = []
  let rate10 = []
  let rateSSR = []
  let w2c = {}
  if (id10) {
    const res = await $.get(`/gacha/provision_ratio/${id10}/1`)
    rate1 = res.appear
  }
  if (id10) {
    const res = await $.get(`/gacha/provision_ratio/${id10}/2`)
    rate10 = res.appear
    w2c = await getChar(id10)
  }
  if (idSSR) {
    const res = await $.get(`/gacha/provision_ratio/${idSSR}/3`)
    rateSSR = res.appear
  }
  return [rate1, rate10, rateSSR, end, w2c]
}

module.exports = main
