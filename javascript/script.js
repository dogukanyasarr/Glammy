const ARC_REL_LEN = 0.4; 
const FLIGHT_TIME = 1000;
const NUM_RINGS = 3;
const RINGS_MAX_R = 5;
const RING_PROPAGATION_SPEED = 5; 

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

// JSON verisini doğrudan JavaScript dosyasına ekliyoruz
const jsonData = {
    "turneler": [
        {
            "şarkıcı": "COLDPLAY",
            "uluslararası_tarihler": [
                {
                    "id": "16001",
                    "tarih": "2024-06-08",
                    "konser_yeri": "OLYMPIC STADIUM",
                    "şehir": "ATHENS",
                    "ülke": "Yunanistan",
                    "başlangıç_koordinatları": { "lat": 40.7128, "lng": -74.0060 },
                    "gidiş_koordinatları": { "lat": 37.9838, "lng": 23.7275 }
                }          
            ]
        },
        {
            "şarkıcı": "TAYLOR SWIFT",
            "uluslararası_tarihler": [
                {
                    "id": 1001,
                    "tarih": "THU, MAY 09, 2024",
                    "konser_yeri": "PARIS LA DÉFENSE ARENA",
                    "destekleyen_sanatçı": "Paramore",
                    "şehir": "Paris",
                    "ülke": "France",
                    "başlangıç_koordinatları": { "lat": 40.7128, "lng": -74.0060 },
                    "gidiş_koordinatları": { "lat": 48.8566, "lng": 2.3522 }
                }
            ]
        }
    ]
};

// JSON verisini işliyoruz
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

const buttonsContainer = document.getElementById('buttons-container');
const concertInfo = document.getElementById('concert-info');

// Butonları dinamik olarak ekliyoruz
turneler.forEach(turne => {
    const button = document.createElement('button');
    button.className = 'btn btn-primary mr-2';
    button.innerText = turne.şarkıcı;
    button.addEventListener('click', () => displayConcerts(turne.şarkıcı));
    buttonsContainer.appendChild(button);
});

function displayConcerts(artist) {
    concertInfo.innerHTML = ''; // Önceki konser bilgilerini temizle
    const selectedTour = turneler.find(turne => turne.şarkıcı === artist);
    if (selectedTour) {
        selectedTour.uluslararası_tarihler.forEach(({ konser_yeri, şehir, ülke, tarih }) => {
            const concertDiv = document.createElement('div');
            concertDiv.className = 'col-12';
            concertDiv.innerHTML = `<div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${konser_yeri}</h5>
                    <p class="card-text">${şehir}, ${ülke} - ${tarih}</p>
                </div>
            </div>`;
            concertInfo.appendChild(concertDiv);
        });
    }
}

// İlk yüklemede tüm konserleri kürede göster
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
