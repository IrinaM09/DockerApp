# base image
FROM node:12.13.0

# set working directory
WORKDIR /app

# cache app dependencies
COPY package.json .

# install
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# add app
COPY . .

# listen on port
#EXPORT 4200

# start app and check every 500 milisec for new changes
# connect without localhost (--host)
CMD ng serve --host 0.0.0.0 --poll 500

