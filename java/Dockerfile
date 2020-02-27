# fetch basic image
FROM maven:3.6.1-jdk-8

# application placed into /opt/app
RUN mkdir -p /app
WORKDIR /app

# add the POM file
COPY /java/pom.xml .

# install dependencies
RUN mvn install

# rest of the project
COPY /java/src ./src
RUN mvn package

# local application port
EXPOSE 4200

# run app
CMD ["mvn", "exec:java"]