# base image
FROM node:12.13.0

# set working directory
WORKDIR /app

# cache app dependencies
COPY /angular/package.json .

# install
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# add app
COPY /angular/* .

# listen on port
EXPOSE 4200

# start app; check every 500 milisec for changes
CMD ng serve --host 0.0.0.0 --poll 500

