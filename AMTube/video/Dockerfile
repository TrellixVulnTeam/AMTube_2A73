FROM maven:3.8.1-openjdk-11
COPY . .
RUN mvn install
WORKDIR /target
EXPOSE 8082
CMD ["java", "-jar", "video-0.0.1-SNAPSHOT.jar"]