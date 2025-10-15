terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "job-tracker-tf-state"
    key            = "infra/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "job-tracker-tf-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# --- NETWORK ---
module "network" {
  source = "./network"

  vpc_cidr = "10.0.0.0/16"
  azs      = ["ap-south-1a", "ap-south-1b"]
}

# --- RDS ---
module "rds" {
  source          = "./rds"
  private_subnets = module.network.private_subnets
  db_sg_id        = module.network.db_sg_id
}

# --- ECS ---
module "ecs" {
  source           = "./ecs"
  aws_region       = var.aws_region
  vpc_id           = module.network.vpc_id
  public_subnets   = module.network.public_subnets
  private_subnets  = module.network.private_subnets
  alb_sg_id        = module.network.alb_sg_id
  ecs_sg_id        = module.network.ecs_sg_id
  backend_image    = var.backend_image

  db_url      = "jdbc:postgresql://${module.rds.db_endpoint}:5432/jobtracker"
  db_username = "postgres"
  db_password = module.rds.db_password
}
