// Predefined variables
const appEl = document.querySelector("#app"),
  // Use single audio source to reset multiple audio play bug on Safari.
  sfx = new Audio(require("./sound/sfx.mp3"));

// Attatch multiple event with same function
const eventMap = (element: Element, events: string[], callback: () => any) => {
  events.forEach((event) => {
    element.addEventListener(event, callback, false);
  });
};

const trigger = () => {
  // Slap
  appEl.setAttribute("class", "slap");

  // SFX
  sfx.currentTime = 0;
  sfx.play();
};

const idle = () => {
  appEl.removeAttribute("class");

  sfx.addEventListener("ended", () => {
    /**
     * ! iOS Safari has weird bug which can't set audio from start.
     * As a workaround, reload is required. The new audio must be re-fetched.
     * But since we cache the audio. The request should play rightaway
     * after Safari delay
     * */
    sfx.load();
    sfx.currentTime = 0;
    sfx.pause();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  eventMap(appEl, ["mousedown", "touchstart"], trigger);
  eventMap(appEl, ["mouseup", "touchend"], idle);
});
