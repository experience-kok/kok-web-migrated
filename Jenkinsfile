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
                        message: ":rocket: *[배포 시작]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> 작업 브랜치: `${env.GIT_BRANCH}`\n> 작업 요청자: `${env.BUILD_USER_ID ?: 'Unknown'}`",
                        tokenCredentialId: SLACK_CREDENTIAL_ID
                    )
                    // CDN 및 최적화 진행동안 대상 브랜치 변경
                    // origin/main -> origin/test/output-performance
                    if (env.GIT_BRANCH == "origin/test/output-performance") {
                        target = "production"
                        remoteService = REMOTE_SERVICE_PRD
                    } else {
                        error ":bangbang: Unknown branch: ${env.GIT_BRANCH}"
                    }
                }
            }
        }
        // Jenkins에 정의된 env 파일을 로컬에 복사
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

        // Next.js 빌드
        stage("Build Next.js") {
            steps {
                echo "STAGE: Build Next.js Application"
                sh """
                    echo "📦 Installing dependencies with pnpm..."
                    pnpm install --frozen-lockfile
                    
                    echo "🛠️ Building Next.js application..."
                    pnpm run build
                """
            }
        }

        // 정적 파일 S3 업로드
        stage('Upload Static to S3') {
            steps {
                script {
                    withAWS(credentials: 'kok-aws-s3-credentials', region: 'ap-northeast-2') {
                        echo "🚀 Uploading static files to S3..."
                        s3Upload(
                            bucket: 'kok-main-service-bucket', 
                            source: '.next/static/**',
                            path: '_next/static/'
                        )
                        echo "✅ S3 Upload complete."
                    }
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
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'echo ✅ SSH connection success'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker ps -a'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker version'"
                        sh "ssh -o StrictHostKeyChecking=no ${remoteService} 'docker compose version || docker-compose version || echo 🚫 docker compose not found'"
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
                            -f docker-compose.yml up -d
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
                message: ":white_check_mark: *[작업 성공]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :tada: 빌드가 성공적으로 완료되었습니다!\n> <${env.BUILD_URL}|View Build Details>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        failure {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":x: *[작업 실패]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> :warning: 실패 원인: `${currentBuild.description ?: 'Unknown - 콘솔 출력 확인 필요'}`\n> <${env.BUILD_URL}|View Build Logs>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
        always {
            slackSend(
                channel: SLACK_CHANNEL,
                message: ":bell: *[작업 완료]* `${env.JOB_NAME}` #${env.BUILD_NUMBER}\n> 상태: *${currentBuild.currentResult}*\n> 완료 시간: `${new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone("Asia/Seoul"))}`\n> <${env.BUILD_URL}|Open Build>",
                tokenCredentialId: SLACK_CREDENTIAL_ID
            )
        }
    }
}