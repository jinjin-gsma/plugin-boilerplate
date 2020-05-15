pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                stash includes: 'node_modules/', name: 'node_modules'
                sh 'npm run build'
            }
        }
        stage('Lint') {
            steps {
                unstash 'node_modules'
                echo 'Linting'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
    }
}