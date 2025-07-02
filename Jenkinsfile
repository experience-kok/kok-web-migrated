pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#jenkins-alert'
        SLACK_CREDENTIAL_ID = 'slack-token'
        MAIN_ENV_DIR = '/var/service_envs/web-front-main.env'
        PRD_ENV_DIR = '/var/service_envs/web-front-main.env.production'
        WORKSPACE_DIR = '/var/jenkins_home/workspace/chkok-web-front-main/'
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
                    if (env.GIT_BRANCH == "origin/main") {
                        target = "production"
                        remoteService = "ec2-user@ec2-3-35-148-154.ap-northeast-2.compute.amazonaws.com"
                    } else {
                        error "찾을 수 없는 브랜치: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        stage("Copy Env Files") {
            steps {
                echo "STAGE: Copy Env Files"
                script {
                    sh """
                        cp ${MAIN_ENV_DIR} ${WORKSPACE_DIR}/.env
                        cp ${PRD_ENV_DIR} ${WORKSPACE_DIR}/.env.production
                    """.stripIndent()
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
                    sh """
                        docker -H ssh://${remoteService} rm -f next-app || true
                    """
                    sh """
                        docker -H ssh://${remoteService} compose \
                        -f docker-compose.yml build --no-cache
                    """.stripIndent()
                    sh """
                        docker -H ssh://${remoteService} compose \
                        -f docker-compose.yml up -d --build
                    """.stripIndent()
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