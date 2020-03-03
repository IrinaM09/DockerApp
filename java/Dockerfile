# fetch basic image
FROM maven:3.6.1-jdk-8

# set working directory
WORKDIR /app-java

# add the POM file
COPY /java/pom.xml ./

# install dependencies
RUN mvn install

# rest of the project
COPY /java/src ./src
RUN mvn package

# local application port
EXPOSE 4200

# run app
CMD  ["mvn", "clean"]
CMD  ["mvn", "install"]
CMD  ["mvn", "exec:java"]