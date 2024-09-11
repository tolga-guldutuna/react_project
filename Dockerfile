# Temel görüntü olarak Node.js kullanılıyor
FROM node:14 AS build

# Çalışma dizini oluştur
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Proje bağımlılıklarını yükle
RUN npm install

# Proje kaynaklarını kopyala
COPY . .

# React uygulamasını üretim için oluştur
RUN npm run build

# Nginx kullanarak statik dosyaları sunmak için yeni bir aşamaya geç
FROM nginx:alpine

# Oluşturulan dosyaları Nginx'e kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Nginx'i başlat
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
