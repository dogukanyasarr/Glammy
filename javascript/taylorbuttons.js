function toggleSpotify() {
    
    var spotifyIframe = document.getElementById("spotify-iframe");
    spotifyIframe.classList.toggle("active");
}
function showConcerts() {
    const concertBox = document.getElementById("concertBox");
    
    // kutuyu aç kapa yapma kısmı
    if (concertBox.style.display === "block") {
        concertBox.style.display = "none";
        return; // Fonksiyonu sonlandır
    }
    
    // kutuları gizle
    concertBox.style.display = "block";

    // kutu içerisindeki konserleri/yazıları listeliyor.
    const concertList = document.getElementById("concertList");
    concertList.innerHTML = ""; // Her butona basıldığında listeyi temizle

    fetch('https://raw.githubusercontent.com/dogukanyasarr/Glammy/main/data/TaylorSwift.json')
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
function showConcertModal() {
    var modal = document.getElementById("concertModal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}
  
  function closeConcertModal() {
    var modal = document.getElementById("concertModal");
    modal.style.display = "none";
  }
  
  function goToConcert(artist) {
    
    window.location.href = 'taylorMap.html'
    window.location.href = 'coldplayMap.html'
  }
  