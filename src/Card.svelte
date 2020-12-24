<script>
  import { fade } from 'svelte/transition'
  import { afterUpdate } from 'svelte'
  import { loadImage } from './utils'

  export let src = ''
  export let type = 'r'
  export let title = ''

  let loaded = false
  let lastSrc = 'init'

  const COLORS = {
    r: '#b87563', sr: '#e9e9e9', ssr: '#FFC107'
  }

  $: color = COLORS[type]

  afterUpdate(async () => {
    if (src) {
      if (lastSrc !== src) {
        loaded = false
        let srcTemp = src
        try {
          await loadImage(src)
          if (srcTemp === src) {
            lastSrc = src
            loaded = true
          }
        } catch (e) {}
      }
    }
  })
</script>

<div class="card" title="{title}">
  {#if loaded}
    <div in:fade class="pic" style="{src ? `background-image: url(${src})` : ''}"></div>
  {:else}
    <div  out:fade class="mask" style="background-color: {color}"></div>
  {/if}
</div>

<style>
  .card {
    width: 100px;
    height: 58px;
    margin: 0 2px;
    position: relative;
    overflow: hidden;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .pic {
    height: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>