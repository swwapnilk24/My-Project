FROM node:8 as builder
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./* ./

RUN npm install --quiet

COPY . .

#RUN node --max_old_space_size=4096 ./node_modules/webpack/bin/webpack.js --env prod

FROM httpd:2.4

COPY --from=builder /usr/src/app/dist-prod/* /usr/local/apache2/htdocs/

EXPOSE 80
