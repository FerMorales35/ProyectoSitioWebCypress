pipeline{
    agent any

    parameters{
        string(name: "SPEC", defaultValue: "cypress/integration/**/**", description: "Ejemplo cypress run --browser firefox --spec cypress/integration/Test/*.spec.js")
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
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}