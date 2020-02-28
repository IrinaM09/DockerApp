# base image
FROM node:12.13.0

# set working directory
WORKDIR /angular

# cache app dependencies (needed by npm install)
COPY /angular/package.json ./package.json

# install
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# add app
COPY /angular ./

# listen on port
EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0

