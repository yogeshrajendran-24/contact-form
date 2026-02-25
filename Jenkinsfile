pipeline {
    agent any

    environment{
        DOCKER_IMAGE = "yogeshrajendran/contact-server"
        EC2_HOST = "100.50.182.128"
    }

    stages{
        stage('Build'){
            steps{
                git branch: "main", url: "https://github.com/yogeshrajendran-24/contact-form.git"
            }
        }

        stage('Test'){
            steps{
                sh 'echo "Running tests..."'
            }
        }

        stage('Deploy'){
            steps{
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                      docker pull ${DOCKER_IMAGE}:latest &&
                      docker stop contact-server || true &&
                      docker rm contact-server || true &&
                      docker run -d --name contact-server -p 80:80 ${DOCKER_IMAGE}:latest
                    '
                    """
            }
        }
    }


    post{
        always{
            sh 'echo "Pipeline finished!"'
        }

        success{
            sh 'echo "Build Successful!!!"'
        }

        failure{
            sh 'echo "Build failed, Sending Notification...."'
        }
    }
}