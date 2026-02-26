pipeline {
    agent any

    environment{
        DOCKER_IMAGE = "yogeshrajendran/contact-server"
        EC2_HOST = "100.50.182.128"
    }

    stages{
        stage('Checkout Code'){
            steps{
                git branch: "main", url: "https://github.com/yogeshrajendran-24/contact-form.git"
            }
        }

        stage('Build Docker Image'){
            steps{
                dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
            }
        }

        stage('Push Image ti DockerHub'){
            steps{
                
                    dockerImage.push("${BUILD_NUMBER}")
                    dockerImage.push("latest")
                }
            }

        stage('Deploy to EC2'){
            steps{
                sshagent(['ec2-ssh-key']){
                    sh """
                    ssh -o StrictHostkeyChecking=no ${EC2_HOST} 
                    '   docker pull ${DOCKER_IMAGE}:latest
                        docker stop contact-server || true
                        docker rm contact-server || true
                        docker run -d -p 80:80 --name contact-server ${DOCKER_IMAGE}:latest ' 
                        """
                }

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
