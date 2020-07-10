// Predefined variables
const appEl = document.querySelector('#app')

// Attatch multiple event with same function
const eventMap = (element: Element, events: string[], callback: Function) => {
  events.map(event => {
    element.addEventListener(event, () => callback(), true)
  })
}

const trigger = () => {
  // Slap
  appEl.setAttribute('class', 'slap')

  // SFX
  new Audio(require('./sound/sfx.ogg')).play()
}

const idle = () => appEl.removeAttribute('class')

document.addEventListener('DOMContentLoaded', () => {
  eventMap(appEl, ['mousedown', 'touchstart'], trigger)
  eventMap(appEl, ['mouseup', 'touchend'], idle)
})
