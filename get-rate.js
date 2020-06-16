const main = async () => {
  let id10
  let id1
  let idSSR
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
        }
      } else if (item.times === '1') {
        id1 = item.id
      }
    })
  })
  
  let rate1 = ''
  let rate10 = ''
  let rateSSR = ''
  if (id1) {
    const res = await $.get(`/gacha/provision_ratio/${id1}/1`)
    rate1 = res.appear
  }
  if (id10) {
    const res = await $.get(`/gacha/provision_ratio/${id10}/2`)
    rate10 = res.appear
    
  }
  if (idSSR) {
    const res = await $.get(`/gacha/provision_ratio/${idSSR}/3`)
    rateSSR = res.appear
  }
  return [rate1, rate10, rateSSR]
}

module.exports = main
