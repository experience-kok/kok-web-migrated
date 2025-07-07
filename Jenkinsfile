pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#jenkins-alert'
        SLACK_CREDENTIAL_ID = 'slack-token'
    }
    stages {
        stage("Setup") {
            steps {
                script {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: ":로켓: *[STARTED]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> Branch: `${env.GIT_BRANCH}`\n> Started by: `${env.BUILD_USER_ID ?: 'Unknown'}`",
                        tokenCredentialId: SLACK_CREDENTIAL_ID
                    )
                    if (env.GIT_BRANCH == "origin/main") {
                        target = "production"
                        remoteService = "ec2-user@ec2-3-35-148-154.ap-northeast-2.compute.amazonaws.com"
                    } else {
                        error ":느낌표:️ Unknown branch: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        stage("Copy Env Files") {
            steps {
                echo "STAGE: Copy Env Files"
                configFileProvider([
                    configFile(fileId: '4a830e68-b5ec-4eed-98b3-b750d9a368d6', variable: 'MAIN_ENV'),
                    configFile(fileId: 'a81709e5-198a-415c-bc86-9fe464f2ca6b', variable: 'PRD_ENV')
                ]) {
                    sh """
                        cp \$MAIN_ENV ${env.WORKSPACE}/.env
                        cp \$PRD_ENV ${env.WORKSPACE}/.env.production
                    """
                }
            }
        }
        stage("Check SSH & Docker") {
            when {
                expression { return target == "production" }
            }
            steps {
                echo "STAGE: Check SSH & Docker connection"
                script {
                    sshagent(credentials: ['chkok-ssh-key']) {
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'echo :흰색_확인_표시: SSH 연결 성공'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker ps -a'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker version'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker compose version || docker-compose version || echo :출입금지_기호: docker compose 명령어 없음'"
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
                    sshagent(credentials: ['chkok-ssh-key']) {
                        sh "docker -H ssh://${remoteService} rm -f next-app || true"
                        sh """
                            docker -H ssh://${remoteService} compose \
                            -f docker-compose.yml build
                        """
                        sh """
                            docker -H ssh://${remoteService} compose \
                            -f docker-compose.yml up -d --build
                        """
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":흰색_확인_표시: *[SUCCESS]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :흰색_확인_표시: Build completed successfully!\n> <${env.BUILD_URL}|View Build Details>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        failure {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":x: *[FAILED]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :느낌표:️ Reason: `${currentBuild.description ?: 'Unknown - check console output'}`\n> <${env.BUILD_URL}|View Build Logs>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        always {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":종: *[FINISHED]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> Status: *${currentBuild.currentResult}*\n> Time: `${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone("Asia/Seoul"))}`\n> <${env.BUILD_URL}|Open Build>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
    }
}