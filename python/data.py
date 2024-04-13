import json
import matplotlib.pyplot as plt

# JSON dosyasını yükle
with open('TaylorSwift.json') as f:
    data = json.load(f)

# Ülkeler ve konser sayılarını saklayacak bir sözlük oluştur
country_counts = {}

# Her konserin ülkesini say
for concert in data:
    country = concert['ülke']
    country_counts[country] = country_counts.get(country, 0) + 1

# Grafik oluştur
plt.figure(figsize=(10, 6))
plt.bar(country_counts.keys(), country_counts.values(), color='skyblue')
plt.xlabel('Ülkeler')
plt.ylabel('Konser Sayısı')
plt.title('Taylor Swift Konserleri Ülkelere Göre')
plt.xticks(rotation=45)  # Ülkeleri 45 derece döndür
plt.tight_layout()  # Grafik sığdırma
plt.show()
