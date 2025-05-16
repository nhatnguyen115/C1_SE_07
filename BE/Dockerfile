FROM maven:3.9.9-amazoncorretto-21 AS build
LABEL authors="Ark"
WORKDIR /app
COPY . ./z9tkvtu
WORKDIR /app/z9tkvtu
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build app/z9tkvtu/target/*.jar z9tkvtu.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "z9tkvtu.jar"]
