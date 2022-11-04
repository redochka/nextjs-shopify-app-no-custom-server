FROM node:lts-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# RUN npm run build
EXPOSE 3000

# Install Cloudflared dependencies
# RUN apk add libc6-compat

# # Download Cloudflared
# RUN apk --no-cache add curl
# RUN curl -Ls https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz -o cloudflared.tgz
# RUN tar xzvf cloudflared.tgz
# RUN rm cloudflared.tgz
# RUN chmod +x cloudflared
# RUN ./cloudflared

# # Start the tunnel
# RUN npm run tunnel

# Running the app
CMD "npm" "run" "dev"
