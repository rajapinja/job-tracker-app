resource "aws_db_subnet_group" "job_tracker_db_subnet_group" {
  name       = "job-tracker-db-subnet-group"
  subnet_ids = var.private_subnets
  tags = {
    Name = "job-tracker-db-subnet-group"
  }
}

# Generate or fetch secret for RDS password
resource "aws_secretsmanager_secret" "db_password_secret" {
  name        = "job-tracker-db-password"
  description = "RDS Postgres DB password for Job Tracker app"
}

resource "aws_secretsmanager_secret_version" "db_password_secret_value" {
  secret_id     = aws_secretsmanager_secret.db_password_secret.id
  secret_string = jsonencode({ password = random_password.db_password.result })
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}

# RDS Parameter Group
resource "aws_db_parameter_group" "job_tracker_pg" {
  name   = "job-tracker-pg"
  family = "postgres16"
}

# RDS PostgreSQL Instance
resource "aws_db_instance" "job_tracker_db" {
  identifier              = "job-tracker-db"
  engine                  = "postgres"
  engine_version          = "16.3"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  username                = "postgres"
  password                = jsondecode(aws_secretsmanager_secret_version.db_password_secret_value.secret_string)["password"]
  db_subnet_group_name    = aws_db_subnet_group.job_tracker_db_subnet_group.name
  vpc_security_group_ids  = [var.db_sg_id]
  skip_final_snapshot     = true
  publicly_accessible     = false
  deletion_protection     = false
  parameter_group_name    = aws_db_parameter_group.job_tracker_pg.name

  tags = {
    Name = "job-tracker-db"
  }
}
# Output the database connection details
