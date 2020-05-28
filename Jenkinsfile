pipeline {
    agent none
    stages {
        stage('Build npm') {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm install'
                // stash includes: 'node_modules/', name: 'node_modules'
                sh 'npm run build'
            }
        }
        stage('Lint javascript') {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test javascript') {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm run test'
            }
        }
        stage("install phpunit") {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'wget -O phpunit https://phar.phpunit.de/phpunit-5.phar'
                sh 'chmod +x phpunit'
            }
        }
        stage('Test php') {
            agent { dockerfile true }
            steps {
                sh 'bin/install-wp-tests.sh wordpress_test root "" localhost latest'
                sh './phpunit'
            }
        }
    }
}