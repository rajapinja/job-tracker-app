variable "aws_region" {}
variable "vpc_id" {}
variable "public_subnets" {
  type = list(string)
}
variable "private_subnets" {
  type = list(string)
}
variable "alb_sg_id" {}
variable "ecs_sg_id" {}
variable "backend_image" {}
variable "db_url" {}
variable "db_username" {}
variable "db_password" {}
