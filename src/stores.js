import { writable } from 'svelte/store'

const showNpc = writable(false)

setInterval(() => {
  showNpc.update(n => !n)
}, 3000)

export { showNpc }