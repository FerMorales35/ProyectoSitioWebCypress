import groovy.json.JsonOutput

def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger'
]

def getBuildUser(){
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}

pipeline{
    agent any

    environment{
        BUILD_USER = ''
    }

    parameters{
        string(name: "SPEC", defaultValue: "cypress/integration/**/**", description: "Ejemplo: cypress run --browser chrome --spec cypress/integration/Test/*.spec.js")
        choice(name: "BROWSER", choices: ['chrome','firefox'], description: "Elija un navegaodor para correr sus tests")
    }

    options{
        ansiColor('xterm')
    }

    stages{
        stage('Build'){
            steps{
                echo "Building application"
            }
        }
        stage('Testing'){
            steps{
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }

    post{
        always{

            script{
                BUILD_USER = getBuildUser()
            }

            slackSend channel: 'cypress-automation',
                      color: COLOR_MAP[currentBuild.currentResult],
                      message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${BUILD_USER} \n Tests executed ${SPEC} at ${BROWSER} \n More info at ${env.BUILD_URL}HTML_20Report/"

            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}