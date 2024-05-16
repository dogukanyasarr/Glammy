// dünya kütüphanesinin görünümü boyutunu ayarladığımız kısım.
const ARC_REL_LEN = 0.4; 
const FLIGHT_TIME = 1000;
const NUM_RINGS = 3;
const RINGS_MAX_R = 5;
const RING_PROPAGATION_SPEED = 5; 

// 
const globe = Globe()
.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
.backgroundImageUrl('https://unpkg.com/three-globe@2.31.0/example/img/night-sky.png')
.arcColor(() => 'white')
.pointOfView({ lat: 39.9334, lng: 32.8597, altitude: 2 }) // kürenin görünüm noktasını veriyor.
.arcDashLength(ARC_REL_LEN) // yayların çizgi uzunluğu
.arcDashGap(2) // parça parça gitmesini sağlıyor.
.arcDashInitialGap(1) //başlangıç boşluk
.arcDashAnimateTime(FLIGHT_TIME) // yayların havada gözükme süresi
.arcsTransitionDuration(0) // geçiş süresi
.ringColor(() => t => `rgba(255, 255, 255, ${1 - t})`) // çemberlerin rengi
.ringMaxRadius(RINGS_MAX_R) // yarı çap
.ringPropagationSpeed(RING_PROPAGATION_SPEED) // animasyon hızı
.ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS) // tekrar hızı zamanı
(document.getElementById('globeViz')); // html'den nereden alığını gösteriyo.

fetch('https://raw.githubusercontent.com/dogukanyasarr/Glammy/main/data/TaylorSwift.json')
.then(response => response.json())
.then(jsonData => {
    const turneler = jsonData.turneler.map(turne => ({
        "şarkıcı": turne.şarkıcı,
        "turne_adı": turne.turne_adı,
        "uluslararası_tarihler": turne.uluslararası_tarihler.map(tarih => ({
            "id": tarih.id,
            "tarih": tarih.tarih,
            "konser_yeri": tarih.konser_yeri,
            "destekleyen_sanatçı": tarih.destekleyen_sanatçı,
            "şehir": tarih.şehir,
            "ülke": tarih.ülke,
            "başlangıç_koordinatları": { "lat": tarih.başlangıç_koordinatları.lat, "lng": tarih.başlangıç_koordinatları.lng },
            "gidiş_koordinatları": { "lat": tarih.gidiş_koordinatları.lat, "lng": tarih.gidiş_koordinatları.lng }
        }))
    }));
    console.log(turneler); // Verinin doğru şekilde işlendiğinden emin olmak için

    turneler.forEach(turne => {
        turne.uluslararası_tarihler.forEach(({ konser_yeri, şehir, ülke, başlangıç_koordinatları, gidiş_koordinatları }) => {
            const { lat: startLat, lng: startLng } = başlangıç_koordinatları;
            const { lat: endLat, lng: endLng } = gidiş_koordinatları;
            
            const arc = { startLat, startLng, endLat, endLng };
            globe.arcsData([...globe.arcsData(), arc]);

            const srcRing = { lat: startLat, lng: startLng };
            globe.ringsData([...globe.ringsData(), srcRing]);

            const targetRing = { lat: endLat, lng: endLng };
            globe.ringsData([...globe.ringsData(), targetRing]);
        });
    });
})
.catch(error => {
    console.error('Veri alınamadı:', error);
});

// function coldplay(){
//     window.location.href = 'coldplayMap.html'
// }