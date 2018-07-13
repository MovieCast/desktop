pipeline {
  agent {
    docker {
      image 'node:9.11.2-alpine'
    }

  }
  stages {
    stage('Setup') {
      steps {
        sh 'apk add --no-cache alpine-sdk python'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run package'
      }
    }
  }
}