pipeline {
    agent any
    environment {
        SLACK_CHANNEL = credentials('jenkins-alert-channel')
        SLACK_CREDENTIAL_ID = 'slack-token'
        REMOTE_SERVICE_PRD = credentials('remote-service')
        IMAGE_NAME = "kok-main-next-app"
        IMAGE_TAG = "latest"
        TAR_FILE = "kok-main-next-app.tar.gz"
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
                    remoteService = REMOTE_SERVICE_PRD
                    
                    // !TODO main 브랜치로 변경하려면 "origin/main" 수정
                    // 아직은 브렌치가 나뉘어짐에 따라서 따로 작업이 다르지 얺기 때문에 아래 구문 전체 주석 처리
                    // if (env.GIT_BRANCH == "origin/main") {
                    //     echo "✅ Target branch is main branch. Proceeding with the job."
                    //     target = "production"
                    //     remoteService = REMOTE_SERVICE_PRD
                    // } else {
                    //     error ":bangbang: This job only runs on the configured branch."
                    // }
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
            // when {
            //     expression { return target == "production" }
            // }
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
        stage("Install pnpm & Build Next.js") {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                }
            }
            steps {
                echo "STAGE: Install dependencies and Build Next.js"
                sh """
                    # Corepack 활성화 및 pnpm 설치
                    corepack enable
                    corepack prepare pnpm@latest --activate
        
                    # 의존성 설치 및 빌드
                    pnpm install --frozen-lockfile
                    pnpm run build
        
                    # Jenkins 호스트가 읽을 수 있도록 권한 변경
                    chown -R ${env.JENKINS_UID}:${env.JENKINS_UID} .next
                """
                stash includes: '.next/**', name: 'next-build'
            }
        }
        stage("Upload Static Files to S3") {
            steps {
                echo "STAGE: Upload .next/static to S3"
                unstash 'next-build'
                s3Upload(
                    bucket: 'kok-main-service-bucket',
                    workingDir: """${env.WORKSPACE}/.next""",   // 기준 디렉터리
                    includePathPattern: 'static/**',           // 업로드할 파일/폴더 패턴
                    path: '_next/'                             // S3 상 경로
                )
                echo "✅ Upload complete."
            }
        }
        stage("Build Docker Image") {
            steps {
                echo "STAGE: Build Docker Image"
                sh """
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -f Dockerfile .
                    docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > ${TAR_FILE}
                """
            }
        }
        stage("Transfer Image & Deploy") {
            steps {
                script {
                    sshagent(credentials: ['chkok-ssh-key']) {
                        sh """
                            ssh ${remoteService} '
                                docker rm -f kok-main-next-app || true
                            '
                        """
                        sh """
                            scp ${TAR_FILE} ${remoteService}:/home/ec2-user/
                        """
                        sh """
                            scp docker-compose.yml ${remoteService}:/home/ec2-user/
                        """
                        sh """
                            ssh ${remoteService} '
                                docker load < /home/ec2-user/${TAR_FILE} &&
                                docker compose -f /home/ec2-user/docker-compose.yml up -d
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
