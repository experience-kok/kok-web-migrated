pipeline {
    agent any
    environment {
        SLACK_CHANNEL = '#jenkins-alert'
        SLACK_CREDENTIAL_ID = 'slack-token'
        ENV_FILE_ID_MAIN = '4a830e68-b5ec-4eed-98b3-b750d9a368d6'
        ENV_FILE_ID_PROD = 'a81709e5-198a-415c-bc86-9fe464f2ca6b'
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
                        remoteService = "ec2-user@ec2-3-35-148-154.ap-northeast-2.compute.amazonaws.com"
                    } else {
                        error ":경고: 지원하지 않는 브랜치: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    configFileProvider([
                        configFile(fileId: env.ENV_FILE_ID_MAIN, variable: 'ENV_MAIN'),
                        configFile(fileId: env.ENV_FILE_ID_PROD, variable: 'ENV_PROD')
                    ]) {
                        sh """
                            # .env 두 개 병합
                            cat $ENV_MAIN $ENV_PROD > merged.env
                            # :흰색_확인_표시: 1. 원격 서버에 디렉토리 먼저 생성
                            ssh ${remoteService} 'mkdir -p ~/project'
                            # :흰색_확인_표시: 2. 디렉토리 존재 보장 후 복사
                            scp merged.env ${remoteService}:~/project/.env
                            # 3. Docker Compose 실행
                            ssh ${remoteService} '
                                cd ~/project &&
                                docker compose --env-file .env -f docker-compose.yml build --no-cache &&
                                docker compose --env-file .env -f docker-compose.yml up -d
                            '
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