import React from "react";

export default function Deployment() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Job Tracker App — Deployment Guide
      </h2>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        Prerequisites
      </h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Node.js (v18+)</li>
        <li>Java 17+</li>
        <li>Docker & Docker Compose</li>
        <li>AWS CLI configured with credentials</li>
        <li>Terraform (v1.6+)</li>
        <li>GitHub account for CI/CD</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        Local Development
      </h2>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
        {`# Backend (Spring Boot)
cd job-tracker-backend
mvn spring-boot:run

# Frontend (React)
cd job-tracker-frontend
npm install
npm run dev`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        Docker Setup
      </h2>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
        {`# Build images
docker build -t job-tracker-backend ./backend
docker build -t job-tracker-frontend ./frontend

# Run containers
docker-compose up -d`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        AWS Deployment (ECS + RDS)
      </h2>
      <ol className="list-decimal ml-6 text-gray-700 space-y-2">
        <li>Push Docker images to AWS ECR.</li>
        <li>Create an ECS Cluster and define Task Definitions for backend and frontend.</li>
        <li>Use AWS RDS for PostgreSQL database.</li>
        <li>Set environment variables using Secrets Manager or Parameter Store.</li>
        <li>Use an Application Load Balancer for routing frontend traffic.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        CI/CD Pipeline (GitHub Actions)
      </h2>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
        {`# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: 17
      - name: Build Backend
        run: mvn clean package -DskipTests
      - name: Build Frontend
        run: npm ci && npm run build
      - name: Docker Build and Push
        run: |
          docker build -t job-tracker .
          docker push <aws-ecr-repo-url>
      - name: Terraform Deploy
        run: terraform apply -auto-approve`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-600">
        Terraform Infrastructure
      </h2>
      <p className="text-gray-700 mb-3">
        Use Terraform to provision ECS, RDS, and networking (VPC, subnets, and security groups).
      </p>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
        {`terraform init
terraform plan
terraform apply -auto-approve`}
      </pre>

      <p className="mt-6 text-gray-700">
        ✅ Once deployed, your app will be accessible via AWS Load Balancer URL.
        Use HTTPS with Route 53 and ACM for domain setup.
      </p>
    </div>
  );
}
