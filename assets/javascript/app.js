// Trivia game javaScript

$(function () {

    console.log("Trivia game");

    // Set sounds for the game
    var selectSound = new Audio('./assets/sounds/selectSound.mp3');
    var applauseSound = new Audio('./assets/sounds/Applause.mp3');
    var correctSound = new Audio('./assets/sounds/correctSound.mp3');

    // question object with constructor .................................
    function questionObj(qId, questiontext, answerOptions, correctAnswer) {
        this.id = qId;
        this.questionTxt = questiontext;
        this.possibleAnswers = answerOptions;
        this.correctAnswer = correctAnswer;
        // operational properties
        this.playerAnswer = '';
        this.isAnswerCorrect = false;
    }

    // Questions generator ...............................
    let questionGenerator = {
        questionArr: [
            possibleQuestion = {
                id: 'q0',
                questionText: 'What planet in our solar system spins in oposite direction to Earth?',
                possibleAnswers: ['Uranus', 'Mars', 'Jupiter', 'Venus', 'Mercury'],
                correctAnswer: 'Venus'
            },
            possibleQuestion = {
                id: 'q1',
                questionText: 'What is the only planet in our solar system that rolls on it side like a barrel?',
                possibleAnswers: ['Uranus', 'Mars', 'Jupiter', 'Venus', 'Mercury'],
                correctAnswer: 'Uranus'
            },
            possibleQuestion = {
                id: 'q2',
                questionText: 'How many degrees the earth axis is tilted with respect to Earth-Sun plane?',
                possibleAnswers: ['20.3', '25.5', '17.5', '23.5', '24.5'],
                correctAnswer: '23.5'
            },
            possibleQuestion = {
                id: 'q3',
                questionText: 'How many Earths will fit inside in Jupiter?',
                possibleAnswers: ['780', '1,300', '1,200', '1,800', '1,000'],
                correctAnswer: '1,300'
            },
            possibleQuestion = {
                id: 'q4',
                questionText: 'How many planets in the solar system has rings?',
                possibleAnswers: ['Three', 'Two', 'Five', 'Four', 'One'],
                correctAnswer: 'Four'
            },
            possibleQuestion = {
                id: 'q5',
                questionText: 'How long does it take sunlight to reach the Earth?',
                possibleAnswers: ['1 minute', '20 minutes', '8 minutes', '9 minutes', '20 minutes'],
                correctAnswer: '8 minutes'
            },
            possibleQuestion = {
                id: 'q6',
                questionText: 'Which one is the largest moon in the solar system?',
                possibleAnswers: ['Titan', 'Europa', 'Io', 'Pandora', 'Ganymede'],
                correctAnswer: 'Ganymede'
            },
            possibleQuestion = {
                id: 'q7',
                questionText: 'Which is the only moon in the solar system with clouds and a dense, planet-like atmosphere?',
                possibleAnswers: ['Triton', 'Titan', 'Europa', 'Callisto', 'Ganymede'],
                correctAnswer: 'Titan'
            },
            possibleQuestion = {
                id: 'q8',
                questionText: 'How long does it take Mars to go around the sun?',
                possibleAnswers: ['687 days', '560 days', '620 days', '420 days', '710 days'],
                correctAnswer: '687 days'
            },
            possibleQuestion = {
                id: 'q9',
                questionText: 'Which is the seventh planet in the solar sytem?',
                possibleAnswers: ['Jupiter', 'Neptune', 'Saturn', 'Mars', 'Uranus'],
                correctAnswer: 'Uranus'
            },
            possibleQuestion = {
                id: '10',
                questionText: 'What is the oldest planet in the solar system?',
                possibleAnswers: ['Jupiter', 'Neptune', 'Saturn', 'Earth', 'Uranus'],
                correctAnswer: 'Jupiter'
            }
        ],
        // methods 
        getRandonQuestion() {
            // Get a random number from total questions
            let rndNumber = Math.floor(Math.random() * this.questionArr.length);
            // Return the question 
            return this.questionArr[rndNumber];
        }, // getRandonQuestion
        getQuestions(totalquestions) {
            // Control: total requested question cannot exceed the array length
            if (totalquestions > this.questionArr.length) {
                totalquestions = this.questionArr.length;
            }
            // internal vars
            let questionsArr = [];
            let questionsIncludedArr = [];
            let thisObj = this;
            // Get total of question requested, must not be repeated
            for (let i = 0; i < 100; i++) {
                // get random question
                let possibleQuestion = this.getRandonQuestion();
                // break possible question elements
                let id = possibleQuestion.id;
                let questiontext = possibleQuestion.questionText;
                let possibleAnswers = possibleQuestion.possibleAnswers;
                let correctAnswer = possibleQuestion.correctAnswer;

                // Add question if not included yet
                if (questionsIncludedArr.indexOf(id) === -1) {
                    // add new question object
                    let obj = new questionObj(id, questiontext, possibleAnswers, correctAnswer);
                    questionsArr.push(obj);
                    // keep track of included questions
                    questionsIncludedArr.push(id);
                }

                // does the arrya has the total of quesitons requested?, 
                // yes, then break
                if (questionsIncludedArr.length === totalquestions) {
                    break;
                }
            }

            return questionsArr;

        } // getQuestions
    } //questionGenerator

    // Game Object ................................
    let game = {
        isGameStarted: false,
        isGameOver: false,
        maxTimeInSec: 40,
        maxQuestions: 5,
        currentQuestion: 0,
        correctCount: 0,
        incorrectCount: 0,
        gameTimer: 0,
        gameTimerInterval: 0,
        // Initialize questionare
        questionsArr: [],
        // Initialize game
        initialize() {
            this.displayInstruction('Press the button to start the game!');
            this.viewGameButton('Start')
        },
        startGameTimer() {
            // Clear the question counter
            this.stopGameTimer();
            // Initalize aloted time
            this.gameTimer = this.maxTimeInSec;
            const convTime = game.timeConverter(this.gameTimer);
            this.displayInstruction("Time remining: " + convTime);
            // Activate the game timer
            this.gameTimerInterval = setInterval(game.GameTimeCount, 1000)
        },
        stopGameTimer() {
            // Clear the question counter
            clearInterval(game.gameTimerInterval);
        },
        GameTimeCount() {
            // Decrement counter
            game.gameTimer--;
            // If time runs out
            if (game.gameTimer <= 0) {
                game.stopGameTimer();
                game.gameTimer = 0;
                // Display timer
                const convTime = game.timeConverter(game.gameTimer);
                game.displayInstruction("Game over, Time remining: " + convTime);
                // Show summary
                game.displayGameSummary();
            } else {
                const convTime = game.timeConverter(game.gameTimer);
                game.displayInstruction("Time remining: " + convTime);
            }
        },
        timeConverter(t) {

            //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        },
        viewGameButton(btnMessage) {
            // first, Empty container
            $('#startStopBtn').empty();
            $('#startStopBtn').text(`${btnMessage}`);
            $('#startStopContainer').css('visibility', 'visible');
        },
        hideGameButton() {
            this.displayInstruction('');
            $('#startStopContainer').css('visibility', 'hidden');
        },
        displayInstruction(message) {
            // first, Empty container
            $('#instructionsArea').empty();
            // Write in container
            if (message !== '') {
                $('#instructionsArea').append(`
                <h4>${message}</h4>
                `)
            }
        },
        displayQuestion() {
            // Get current question
            question = this.questionsArr[this.currentQuestion];
            // first, Empty container
            $('#questionArea').empty();
            // Write in container
            $('#questionArea').append(`
            <h4>${question.questionTxt}</h4>
            `)
        },
        displayPossibleAnswers() {
            // Get current question
            question = this.questionsArr[this.currentQuestion];
            // first, Empty container
            $('#posibleAnswers').empty();
            // Write in container
            for (let i = 0; i < question.possibleAnswers.length; i++) {
                $('#posibleAnswers').append(` 
                
                <div class="funkyradio-success">
                     <input type="radio" name="radio" id="a${i}" 
                           class="possibleAnswer" data-value="${question.possibleAnswers[i]}"/>
                     <label for="a${i}">${question.possibleAnswers[i]}</label>
                </div>
                `)
            }
        },
        displayAnswer() {
            // Get current question
            question = this.questionsArr[this.currentQuestion];
            // first, Empty container
            $('#answerArea').empty();
            // Write in container
            $('#answerArea').append(`
            <h4>The correct answer is: ${question.correctAnswer}</h4>
            `)
        },
        displayCorrectAnswer() {
            // first, Empty container
            $('#answerArea').empty();
            // Write in container
            $('#answerArea').append(`
                <h5>Correct answer!</h5>
              `)
        },
        displayGameSummary() {

            // end game sound
            applauseSound.play();

            // Mark game over
            game.isGameOver = true;
            // first, Empty container
            $('#questionArea').empty();
            $('#posibleAnswers').empty();
            $('#answerArea').empty();
            // Message tha the game is done
            $('#questionArea').append(`
              <h4>All done, here is how you did!</h4>
             `)

            // Unaswered questions calcuation 
            let unanswered = game.questionsArr.length - (game.correctCount + game.incorrectCount);

            // summary information
            $('#posibleAnswers').append(`
              <h4>Correct Answers: ${game.correctCount}</h4>
              <h4>Incorrect Answers: ${game.incorrectCount}</h4>
              <h4>Unaswered: ${unanswered}</h4>
             `)

            // PResetn the play agaon button
            game.viewGameButton('Start Over?');
        },
        getNextQuestion(delay = 2000) {

            // Present the next question iving time for user to read the answe  
            setTimeout(function () {

                // Increment question counter
                game.currentQuestion++;
                // clear answer
                $('#answerArea').empty();

                // if question count is below total questions, show next question
                // else show gane summary
                if (game.currentQuestion < game.questionsArr.length) {
                    game.displayQuestion();
                    game.displayPossibleAnswers();
                } else {
                    game.stopGameTimer();
                    game.displayGameSummary();
                }
            }, delay);
        },
        validateAnswer(playerAsnwer) {
            // grab current question for comaprison
            let question = this.questionsArr[this.currentQuestion];
            // Compare against correct answer
            if (question.correctAnswer === playerAsnwer) {
                correctSound.play();
                this.correctCount++;
                question.isAnswerCorrect = true;
                this.displayCorrectAnswer();
                // Get next question with minum wait
                this.getNextQuestion(1000);
            } else {
                this.incorrectCount++;
                this.displayAnswer();
                // Get next question with wait for reading the answer
                this.getNextQuestion(1500);
            }
        },
        startRoundOfQuestions() {

            // Start game sound
            applauseSound.play();

            this.isGameStarted = true;
            this.questionsArr = [];
            this.questionsArr = questionGenerator.getQuestions(this.maxQuestions);

            // hide button
            this.hideGameButton();
            this.currentQuestion = 0;
            this.correctCount = 0;
            this.incorrectCount = 0;

            // Intiate overall timer for the game
            this.startGameTimer();

            // Show the first question
            this.displayQuestion();
            this.displayPossibleAnswers();
        }

    } // game object


    // Initialize game .............................
    game.initialize();

    // Events .........................
    $('#startStopBtn').on('click', function () {
        // to make sure the event is processed
        event.preventDefault();
        // initate round of questions
        game.startRoundOfQuestions();
    })

    // event for clocking an answer in teh screen
    $(document).on('click', '.possibleAnswer', function () {
        // Select sound
        selectSound.play();
        // Get player's answer
        let playerAsnwer = $(this).attr('data-value');
        // Validate the answer
        game.validateAnswer(playerAsnwer);
    })



}) //$(function()