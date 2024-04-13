const fs = require('fs');
const { Bar } = require('cli-chart');

// JSON dosyasını yükle
const data = JSON.parse(fs.readFileSync('TaylorSwift.json', 'utf8'));

// Ülkeleri ve konser sayılarını saklayacak bir obje oluştur
const countryCounts = {};

// Her konserin ülkesini say
data.forEach(concert => {
    const country = concert.ülke;
    countryCounts[country] = (countryCounts[country] || 0) + 1;
});

// Grafik oluştur
const bar = new Bar({ 
    width: 80, 
    height: 20, 
    xAxis: Array.from(Object.keys(countryCounts)), 
    data: Array.from(Object.values(countryCounts)) 
});

console.log(bar.toString());
