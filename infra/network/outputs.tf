# These outputs are critical — they connect the network layer to ECS and RDS modules via the root-level main.tf.
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "alb_sg_id" {
  value = aws_security_group.alb_sg.id
}

output "ecs_sg_id" {
  value = aws_security_group.ecs_sg.id
}

output "db_sg_id" {
  value = aws_security_group.rds_sg.id
}
