<script>
  import { fade } from 'svelte/transition'
  import { afterUpdate, onMount } from 'svelte'
  import { loadImage } from './utils'
  import { showNpc } from './stores.js'

  export let url = ''
  export let type = 'r'
  export let name = ''
  export let count = 1
  export let size = 'normal'
  export let url2 = ''
  export let id = 0

  let loaded = false
  let lastURL = 'init'

  const COLORS = {
    r: '#b87563', sr: '#e9e9e9', ssr: '#FFC107'
  }

  $: color = COLORS[type]

  afterUpdate(async () => {
    if (url) {
      if (lastURL !== url) {
        loaded = false
        let urlTemp = url
        try {
          await loadImage(url)
          if (url2) {
            await loadImage(url2)
          }
          if (urlTemp === url) {
            lastURL = url
            loaded = true
          }
        } catch (e) {}
      }
    }
  })
</script>

<div class="card size-{size}" title="{name}" data-id="{id}">
  {#if loaded}
    {#if url2}
      {#if !$showNpc}
      <div transition:fade class="pic" style="{url ? `background-image: url(${url})` : ''}"></div>
      {:else}
      <div transition:fade class="pic pic2" style="{url2 ? `background-image: url(${url2})` : ''}"></div>
      {/if}
    {:else}
    <div in:fade class="pic" style="{url ? `background-image: url(${url})` : ''}"></div>
    {/if}
  {:else}
    <div  out:fade class="mask" style="background-color: {color}"></div>
  {/if}
  {#if count > 1}
    <div class="count">{count}</div>
  {/if}
</div>

<style>
  .card {
    width: 100px;
    height: 58px;
    margin: 0 2px;
    position: relative;
  }
  .size-small {
    width: 94px;
    height: 55px;
  }
  .mask, .pic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .pic {
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .count {
    position: absolute;
    z-index: 1;
    font-size: 12px;
    padding: 0 6px;
    background-color: #ef4747;
    color: #fff;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 2px rgb(0 0 0 / 28%);
  }
</style>