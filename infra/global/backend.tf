terraform {
  required_version = ">= 1.1"

  backend "s3" {
    bucket         = var.tf_state_bucket
    key            = "job-tracker-app/terraform.tfstate"
    region         = var.region
    dynamodb_table = var.tf_state_lock_table
    encrypt        = true
  }
}

# This tells Terraform to store the state file remotely in S3, with DynamoDB table for locking to prevent concurrent runs.