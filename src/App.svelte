<script>
	import Card from './Card.svelte'
	import CountList from './CountList.svelte'
	import { spring, tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { loadImage } from './utils'
	import { slide } from 'svelte/transition'

	const hostname = 'https://gacha.danmu9.com'
	const initCount = () => tweened(0, {
		duration: 400,
		easing: cubicOut,
		interpolate: (a, b) => t => Math.round(a+ (b - a) * t)
	})

	let coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.02,
		damping: 0.9
	})

	let weaponList = []
	let summonList = []

	let active = true

	let countR = initCount()
	let countSR = initCount()
	let countSSR = initCount()
	let countTotal = initCount()

	let count = {
		r: 0, sr: 0, ssr: 0, total: 0
	}

	let cardN = null
	let cardSR = null
	let result = []
	let w2c = {}
	let bg1 = `${hostname}/image/char/3040311000_02.png`
	let bg2 = ''

	let bgStatus = true

	const cardType = ['weapon', 'weapon', 'summon']
	const rarityType = {
		2: 'r',
		3: 'sr',
		4: 'ssr'
	}

	const getRate = async type => {
		const response = await fetch(`${hostname}/${type}.json`)
		const data = await response.json()
		const card = []
		data.forEach(item => {
			const cat = cardType[item.category]
			const type = rarityType[item.rarity]
			item.item.forEach(obj => {
				card.push({
					id: obj.reward_id,
					rate: parseFloat(obj.drop_rate) / 100,
					cat: cat,
					type: type,
					name: obj.name
				})
			})
		})
		return card
	}

	let w2cLoaded = false
	const getW2C = async () => {
		if (w2cLoaded) return w2c
		const response = await fetch(`${hostname}/w2c.json`)
		const data = await response.json()
		w2c = data
		w2cLoaded = true
	}

	getW2C()

	const gacha = type => {
		let card = cardN
		if (type === 'sr') card = cardSR
		let len = card.length
		let rateNum = 0
		const pos = Math.floor(Math.random() * len)
		const pointer = Math.random()

		for (let i = pos; i < len; i++) {
			rateNum += card[i].rate

			if (rateNum > pointer) {
				return card[i]
			}
		}

		for (let i = 0; i < pos; i++) {
			rateNum += card[i].rate

			if (rateNum > pointer) {
				return card[i]
			}
		}

		let idx = pos
		if (pos === 0) idx = len - 1
		return card[idx]
	}

	const gacha10 = () => {
		const result = []

		for (let i = 0; i < 10; i++) {
			if (i === 9) {
				result.push(gacha('sr'))
			} else {
				result.push(gacha())
			}
		}

		return result
	}

	const selectBg = async (list) => {
		let npc = ''
		let summon = ''
		list.forEach(item => {
			if (item.type === 'ssr') {
				if (item.cat === 'weapon' && w2c[item.id]) {
					npc = `${hostname}/image/char/${w2c[item.id]}_02.png`
				} else if (item.cat === 'summon') {
					summon = `${hostname}/image/summon/${item.id}.png`
				}
			}
		})
		let result =  npc || summon
		if (result) {
			await loadImage(result)
			if (bgStatus) {
				bg2 = result
			} else {
				bg1 = result
			}
			bgStatus = !bgStatus
		}
	}

	const getNpc = (card) => {
		if (card.cat === 'weapon' && card.type === 'ssr') {
			if (w2c[card.id]) {
				return `${hostname}/image/card/${w2c[card.id]}_01.jpg`
			}
		}
		return ''
	}

	const countCard = (card) => {
		if (card.type === 'ssr') {
			let list = summonList
			if (card.cat === 'weapon') {
				list = weaponList
			}
			const index = list.findIndex(item => item.id === card.id)
			if (index !== -1) {
				list[index].count++
			} else {
				list.push({
					id: card.id,
					url: `${hostname}/image/card/${card.id}.jpg`,
					url2: getNpc(card),
					type: card.type,
					name: card.name,
					count: 1
				})
			}
			if (card.cat === 'weapon') {
				weaponList = list
			} else {
				summonList = list
			}
		}
	}

	const start = async () => {
		if (!cardN) cardN = await getRate('normal')
		if (!cardSR) cardSR = await getRate('sr')
		let cards = gacha10()
		selectBg(cards)
		let list = cards.map(card => {
			count[card.type] += 1
			countCard(card)
			return {
				url: `${hostname}/image/card/${card.id}.jpg`,
				url2: getNpc(card),
				type: card.type,
				name: card.name
			}
		})
		result = [
			list.slice(0, 3),
			list.slice(3, 7),
			list.slice(7, 10)
		]
		count.total += 10
		$countTotal = count.total
		$countR = count.r
		$countSR = count.sr
		$countSSR = count.ssr
	}

	const checkSize = (n, limit) => {
		if (n > limit) return limit
		if (n < -limit) return -limit
		return n
	}

	const bgOffset = (e) => {
		let x = Math.floor(-(e.clientX / window.innerWidth - 0.5) * 70)
		let y = Math.floor(-(e.clientY / window.innerHeight - 0.5) * 70)
		coords.set({ x, y })
	}

	start()
</script>

<div class="bg">
	{#if bgStatus}
	<div class="pic" transition:slide style="background-image:url({bg1}); transform: scale(1.2) translate({checkSize($coords.x, 35)}px, {checkSize($coords.y, 35)}px)"></div>
	{:else}
	<div class="pic" transition:slide style="background-image:url({bg2}); transform: scale(1.2) translate({checkSize($coords.x, 35)}px, {checkSize($coords.y, 35)}px)"></div>
	{/if}
</div>
<div class="starlight" on:mousemove="{bgOffset}" on:click="{() => active = false}">
	<CountList list={weaponList} {active} type="weapon" />
	<div class="stage" class:active={active} on:mouseenter="{() => active = true}" on:click|stopPropagation="{() => active = true}">
		<div class="content">
			{#each result as block}
				<div class="row">
					{#each block as card}
					<Card {...card} />
					{/each}
				</div>
			{/each}
		</div>
		<div class="footer">
			<div id="gacha" class="btn" on:click="{start}">再抽一次</div>
			<div id="count">
				<div class="label"><span>SSR：</span>{$countSSR}</div>
				<div class="label"><span>SR：</span>{$countSR}</div>
				<div class="label"><span>R：</span>{$countR}</div>
				<div class="label"><span>一共：</span>{$countTotal} 抽</div>
			</div>
		</div>
	</div>
	<CountList list={summonList} {active} type="summon" />
</div>

<style>
	.bg {
		height: 100vh;
		overflow: hidden;
	}
	.bg > .pic {
		background-color: #acd5cd;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		filter: blur(3px);
		height: 100%;
		transform: scale(1.2) translate(0, 0);
	}
	.starlight {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		background-color: rgb(172 172 172 / 16%);
	}
	.stage {
		background: url(https://gacha.danmu9.com/image/gacha_result_bg.jpg) 50% 25% no-repeat;
		background-size: 485px;
		opacity: 0.05;
		height: 300px;
		width: 478px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 4px solid #fff;
		box-shadow: 0 0 8px rgb(0 0 0 / 20%);
		flex-grow: 1;
		flex-shrink: 0;
	}
	.stage.active {
		opacity: 1;
	}
	.row {
		display: flex;
		justify-content: center;
		margin: 0 0 10px 0;
		height: 58px;
	}
	.content {
		height: 194px;
		margin-top: 14px;
	}

	.footer {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 8px auto;
		width: 480px;
		flex-direction: column;
	}
	.btn {
		background: url(btn.png) no-repeat center center;
		background-size: contain;
		padding: 10px 30px 12px 30px;
		color: #f2eee2;
		text-shadow: 0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d;
		font-size: 12px;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
	}
	.btn:active {
		transform: scale(0.95, 0.95) translateY(2px);
	}
	#count {
		display: flex;
		margin-top: 6px;
		flex-shrink: 0;
	}
	.label {
		color: #fff;
		padding: 2px 6px;
		margin: 0 2px;
		border-radius: 4px;
		font-size: 12px;
		text-align: center;
		min-width: 60px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	#count .label:nth-child(1) {
		background: #f7a62d;
	}
	#count .label:nth-child(2) {
		background: #9e9e9e;
	}
	#count .label:nth-child(3) {
		background: #b87563;
	}
	#count .label:nth-child(4) {
		background: #25699a;
		min-width: 85px;
	}
</style>
