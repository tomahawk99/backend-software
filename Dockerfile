# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /src

# Copiar el archivo package.json y package-lock.json a la imagen
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el código fuente de la aplicación a la imagen
COPY . /src

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 3000
