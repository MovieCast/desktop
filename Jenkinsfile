pipeline {
  agent {
    docker {
      image 'node:9.11.2-alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run lint'
        sh 'npm package'
      }
    }
  }
}