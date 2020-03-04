# base image
FROM node:12.13.0

# set working directory
WORKDIR /app-angular

# cache app dependencies (needed by npm install)
COPY /angular/package.json ./package.json

# install
RUN npm install
RUN npm install -g @angular/cli@8.3.25
RUN npm install --save-dev @angular-devkit/build-angular

# add app
COPY /angular ./

# listen on port
EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0

