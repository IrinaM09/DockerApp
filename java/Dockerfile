# fetch basic image
FROM maven:3.6.1-jdk-8

# application placed into /opt/app
RUN mkdir -p /opt/app
WORKDIR /opt/app

# add the POM file
COPY pom.xml /opt/app/

# install dependencies
RUN mvn install

# rest of the project
COPY src /opt/app/src
RUN mvn package

# local application port
#EXPOSE 8081

# execute it
CMD ["mvn", "exec:java"]