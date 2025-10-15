# builder
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src src
RUN ./mvnw -DskipTests package -Pprod

# runtime
FROM eclipse-temurin:17-jre-jammy
ARG JAR_FILE=target/*.jar
COPY --from=builder /app/${JAR_FILE} /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-XX:+UseContainerSupport","-XX:MaxRAMFraction=2","-jar","/app/app.jar"]


## docker build -t job-app-tracker  .
## docker run -p 8080:8080 --env-file=.env job-app-tracker