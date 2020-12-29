<script>
	import Card from './Card.svelte'
  import { slide } from 'svelte/transition'
  import { beforeUpdate, afterUpdate } from 'svelte'

  export let list = []
  export let type = 'weapon'
  export let active = true

  let weaponListHeight
  let box
  let autoscroll = false

  $: overflow = 57 * Math.ceil(list.length / 5) + 8 > weaponListHeight

  beforeUpdate(() => {
	  autoscroll = box && overflow && (box.offsetHeight + box.scrollTop) > (box.scrollHeight - 80)
  })

  afterUpdate(() => {
    if (autoscroll) box.scrollTo(0, box.scrollHeight)
  })
</script>

<div class="card-list" bind:this={box} class:weapon-list={type === 'weapon'} bind:clientHeight={weaponListHeight}
  on:click|stopPropagation
  class:active class:overflow class:reverse={!overflow}>
  {#each list as card}
  <div class="card-wrap" in:slide="{{ y: 20, delay: 500 }}"><Card size="small" {...card} /></div>
  {/each}
</div>

<style>
  .card-list {
		display: flex;
		width: 490px;
		padding: 4px 0;
		box-sizing: border-box;
		align-content: start;
		flex-wrap: wrap;
		height: calc(50vh - 154px);
		opacity: 0;
		overflow-y: auto;
	}
  .card-list.overflow {
    width: 494px;
  }
	.card-list::-webkit-scrollbar {
    width: 4px;
	}
  .card-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }
  .card-list:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6);
  }
	.card-list.active {
		opacity: 1;
	}
	.weapon-list.reverse {
		flex-wrap: wrap-reverse;
		flex-direction: row-reverse;
	}
	.card-wrap {
		margin: 2px 0;
	}
</style>