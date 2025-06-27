pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#jenkins-alert' // ← 여기에 원하는 채널 이름 입력
        SLACK_CREDENTIAL_ID = 'slack-token'
    }
    stages {
        stage("Setup") {
            steps {
                script {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: ":로켓: 빌드 시작: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        tokenCredentialId: SLACK_CREDENTIAL_ID
                    )
                    if(env.GIT_BRANCH == "origin/main") {
                        target = "production"
                        remoteService = "ec2-user@ec2-3-35-148-154.ap-northeast-2.compute.amazonaws.com"
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
                    sh("docker -H ssh://${remoteService} compose -f docker-compose.yml build --no-cache")
                    sh("docker -H ssh://${remoteService} compose -f docker-compose.yml up -d")
                }
            }
        }
    }
    post {
        success {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":흰색_확인_표시: 빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        failure {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":x: 빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n원인: ${currentBuild.description ?: '확인 필요'}",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        always {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":종: 빌드 종료: ${env.JOB_NAME} #${env.BUILD_NUMBER} → 상태: ${currentBuild.currentResult}",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
    }
}