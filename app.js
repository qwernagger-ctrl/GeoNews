import { getCoords, reverseGeo } from "./geolocation.js";
 
const st = document.getElementById("status");
const box = document.getElementById("news");
const btn = document.getElementById("reload");
 
let NEWS = {};
btn.onclick = init;
init();
 
async function init() {
  st.textContent = "Определяем вашу локацию…";
  box.innerHTML = "";
  NEWS = await fetch("news.json").then(r => r.json());
 
  try {
    const { lat, lon } = await getCoords();
    const geo = await reverseGeo(lat, lon);
    showNews(geo.countryCode, geo.city || geo.countryName);
  } catch {
    showNews("DEFAULT", "Мир");
  }
}
 
function showNews(code, label) {
  st.textContent = `Новости для: ${label}`;
  const list = NEWS[code] || NEWS.DEFAULT;
  box.innerHTML = list.map(n => card(n)).join("");
}
 
function card(n) {
  return `
  <article class="card">
    <img src="${n.image}">
    <h3>${n.title}</h3>
    <p>${n.description}</p>
    <a href="${n.link}" target="_blank">Читать</a>
  </article>`;
}
