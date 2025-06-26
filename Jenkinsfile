pipeline {
    agent any

    stages {
        stage("Setup") {
            steps {
                script {
                    if(env.GIT_BRANCH == "main") {
                        target = "production"
                        remoteService = "ec2-3-35-148-154.ap-northeast-2.compute.amazonaws.com"
                    } else {
                        error "찾을 수 없는 브랜치: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        stage("Deploy PROD") {
            when {
                expression { return target == "production" }
            }
            steps {
                echo "STAGE: Deploy"
                script {
                    sh("docker -Hssh://${remoteService} compose -f docker-compose.yml build --no-cache")
                    sh("docker -Hssh://${remoteService} compose -f docker-compose.yml up -d")
                }
            }
        }
    }
}
