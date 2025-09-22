pipeline {
    agent any
    environment {
        SLACK_CHANNEL = credentials('jenkins-alert-channel')
        SLACK_CREDENTIAL_ID = 'slack-token'
        REMOTE_SERVICE_PRD = credentials('remote-service')
    }
    stages {
        stage("Setup") {
            steps {
                script {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: ":rocket: *[배포 시작]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> 브랜치: `${env.GIT_BRANCH}`\n> 요청자: `${env.BUILD_USER_ID ?: '알 수 없음'}`",
                        tokenCredentialId: SLACK_CREDENTIAL_ID
                    )
                    
                    // !TODO main 브랜치로 변경하려면 "origin/main" 수정
                    if (env.GIT_BRANCH == "origin/test/output-performance") {
                        echo "✅ Target branch is test branch. Proceeding with the job."
                        target = "production"
                        remoteService = REMOTE_SERVICE_PRD
                    } else {
                        error ":bangbang: This job only runs on the configured branch."
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
        stage("Install pnpm") {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                }
            }
            steps {
                echo "STAGE: Installing pnpm"
                sh """
                    # Corepack을 사용하여 pnpm 설치
                    npm install -g pnpm
                    
                    # pnpm 버전 확인
                    pnpm --version
                """
            }
        }
        stage("Build Next.js") {
            agent {
                docker {
                    image 'pnpm/node:22-alpine'
                }
            }
            steps {
                echo "STAGE: Build Next.js Application"
                sh """
                    pnpm install --frozen-lockfile
                    pnpm run build
                """
            }
        }
    }
    post {
        success {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":white_check_mark: *[성공]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :tada: 빌드가 성공적으로 완료되었습니다!\n> <${env.BUILD_URL}|빌드 상세 보기>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        failure {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":x: *[실패]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :warning: 실패 원인: `${currentBuild.description ?: '콘솔 출력 확인 필요'}`\n> <${env.BUILD_URL}|빌드 로그 보기>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        always {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":bell: *[작업 완료]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> 상태: *${currentBuild.currentResult}*\n> 완료 시간: `${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone("Asia/Seoul"))}`\n> <${env.BUILD_URL}|빌드 바로가기>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
    }
}