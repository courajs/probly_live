// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

let $online = document.getElementById('num-online');
let $down = document.getElementById('percentage-down');
let $good = document.getElementById('percentage-good');
let $up = document.getElementById('percentage-up');

let doRender = function({up, good, down}) {
  let total = up + good + down;

  $online.innerHTML = total + '';
  $down.innerHTML = 100 * (down / total) + '';
  $good.innerHTML = 100 * (good / total) + '';
  $up.innerHTML = 100 * (up / total) + '';
}

let render = (presences) => {
  let overall_state = {
    up: 0,
    down: 0,
    good: 0
  }

  Presence.list(presences, (id, {metas}) => {
    return metas[0].speed
  }).forEach((speed) => {
    overall_state[speed]++;
  })

  doRender(overall_state)
}

import { Socket, Presence } from "phoenix"

let socket = new Socket("/socket", { params: {user_id: window.userId}})
socket.connect();
let channel = socket.channel('speed', {});

let presences = {};

channel.on('presence_state', state => {
  presences = Presence.syncState(presences, state);
  render(presences)
})

channel.on('presence_diff', diff => {
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

channel.join()

document.querySelector('form').addEventListener('change', function(e) {
  let speed = e.target.value;
  channel.push('speed_set', {speed})
})
