# fetch basic image
FROM maven:3.6.1-jdk-8

# set working directory
WORKDIR /java

# add the POM file
COPY pom.xml ./

# install dependencies
RUN mvn install

# rest of the project
COPY src ./src
RUN mvn package

# local application port
EXPOSE 4200

# run app
CMD ["mvn", "exec:java"]