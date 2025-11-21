export function getCoords() {
  return new Promise((res, rej) => {
    if (!navigator.geolocation) rej();
    navigator.geolocation.getCurrentPosition(
      p => res({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => rej()
    );
  });
}
 
export async function reverseGeo(lat, lon) {
  const url =
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`;
  try {
    const j = await fetch(url).then(r => r.json());
    return {
      countryCode: j.countryCode || "DEFAULT",
      countryName: j.countryName || "",
      city: j.city || j.locality || ""
    };
  } catch {
    return { countryCode: "DEFAULT" };
  }
}
