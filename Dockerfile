FROM node:22

WORKDIR /app

# Salin semua file aplikasi
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Jalankan aplikasi
CMD [ "npm", "run", "start" ]
