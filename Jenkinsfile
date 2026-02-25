pipeline {
    agent any
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
                sh 'echo "Deploying the application..."'
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