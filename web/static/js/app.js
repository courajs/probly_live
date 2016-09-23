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

let render = function({up, good, down}) {
  let total = up + good + down;

  $online.innerHTML = total + '';
  $down.innerHTML = 100 * (down / total) + '';
  $good.innerHTML = 100 * (good / total) + '';
  $up.innerHTML = 100 * (up / total) + '';
}

render({
  down: 2,
  good: 1,
  up: 1
});
