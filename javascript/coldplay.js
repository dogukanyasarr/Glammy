function toggleSpotify() {
    
    var spotifyIframe = document.getElementById("spotify-iframe");
    spotifyIframe.classList.toggle("active");
}
function showConcerts() {
    const concertBox = document.getElementById("concertBox");
    
    // Kutu zaten görünürse, gizle
    if (concertBox.style.display === "block") {
        concertBox.style.display = "none";
        return; // Fonksiyonu sonlandır
    }
    
    // Kutu görünür değilse, konserleri göster
    concertBox.style.display = "block";

    const concertList = document.getElementById("concertList");
    concertList.innerHTML = ""; // Her butona basıldığında listeyi temizle

    fetch('https://raw.githubusercontent.com/dogukanyasarr/Glammy/main/data/coldplay.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            jsonData.turneler.forEach(turne => {
                turne.uluslararası_tarihler.forEach(tarih => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <div class="concert">
                            <div class="location">
                                <span class="city">${tarih.sehir}</span>,
                                <span class="country">${tarih.ülke}</span> -
                                <span class="venue">${tarih.konser_yeri}</span>
                            </div>
                            <div class="date">${tarih.tarih}</div>
                        </div>`;
                    concertList.appendChild(listItem);
                });
            });
        })
        .catch(error => {
            console.error('Veri alınamadı:', error);
        });
}

