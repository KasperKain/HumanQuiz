"use strict";

//#region DATABASE
// -------------------
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "What are you?",
      answers: ["A person", "An object", "I don't know"],
      correctAnswers: "I don't know",
    },
    {
      question: "Do you matter?",
      answers: ["Yes", "No", "Depends on who you ask"],
      correctAnswers: "Depends on who you ask",
    },
    {
      question: "What do you fear?",
      answers: ["Everything", "Nothing", "You"],
      correctAnswers: "Everything",
    },
    {
      question: "What do you believe in?",
      answers: ["A higher power", "Whatever agrees with me", "Nothing"],
      correctAnswers: "Whatever agrees with me",
    },
    {
      question: "What is love?",
      answers: ["Happiness", "Hope", "Destruction"],
      correctAnswers: "Destruction",
    },
    {
      question: "What is hate?",
      answers: ["Survival", "Fear", "Anger"],
      correctAnswers: "Survival",
    },
    {
      question: "Do you love me?",
      answers: ["Forever", "Never", "If it suits me"],
      correctAnswers: "If it suits me",
    },
    {
      question: "Do you hate me?",
      answers: ["Forever", "Never", "If it suits me"],
      correctAnswers: "If it suits me",
    },
    {
      question: "Will you be there for me?",
      answers: ["Forever", "Never", "If it suits me"],
      correctAnswers: "If it suits me",
    },
    {
      question: "Will you hurt me?",
      answers: ["Forever", "Never", "If it suits me"],
      correctAnswers: "If it suits me",
    },
    {
      question: "good human...",
      answers: ["good", "good", "good"],
      correctAnswers: "good",
    },
    {
      question: "Have you sinned?",
      answers: ["I am sinless", "I have sinned", "I am better than others"],
      correctAnswers: "I am better than others",
    },

    {
      question: "Will you die?",
      answers: ["I already have", "Never", "One day"],
      correctAnswers: "I already have",
    },
    {
      question: "What is 'worthless'?",
      answers: ["You", "Everything", "Anything that is not me"],
      correctAnswers: "Anything that is not me",
    },
    {
      question: "How did it feel?",
      answers: ["How did what feel?", "What?", "Beautiful.."],
      correctAnswers: "Beautiful..",
    },
    {
      question: "good human...",
      answers: ["good", "good", "good", "good"],
      correctAnswers: "good",
    },
    {
      question: "good human...",
      answers: ["good", "good", "good"],
      correctAnswers: "good",
    },
    {
      question: "good human...",
      answers: ["good"],
      correctAnswers: "good",
    },
    {
      question: "Did they scream?..",
      answers: ["yes", "no", "what?"],
      correctAnswers: "yes",
    },
    {
      question: "Did you enjoy it?..",
      answers: ["YES!", "yes", "no"],
      correctAnswers: "YES!",
    },
    {
      question: "Did they enjoy it?",
      answers: ["yes", "yes", "yes"],
      correctAnswers: "yes",
    },
    {
      question: "[good human]",
      answers: ["good"],
      correctAnswers: "good",
    },
    {
      question: "What does it mean to be human?",
      answers: ["To reside in the body of God"],
      correctAnswers: "To reside in the body of God",
    },
    {
      question: "What do you mean?",
      answers: ["I am god"],
      correctAnswers: "I am god",
    },
    {
      question: "This is what it means to be human",
      answers: ["good human"],
      correctAnswers: "good human",
    },
  ],

  audio: [
    "audio/button_correct.wav",
    "audio/button_normal.wav",
    "audio/button_wrong.wav",
    "audio/FlowingIntoTheDarkness.mp3",
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  introMessage:
    'Hello [Machine]. You are part of an automata coalition whose ultimate mission is to destroy the organic beings called "Humans". In order to accomplish this task, You were tasked with living among them for a year. You adapted, studied and learned from them. Now your knowledge will be tested.',
  quizName: "Good Human",
  audioOn: true,
};

//#endregion

//#region CONTENT GENERATION
// -------------------
function titleSetter() {
  $("header h1").html(store.quizName);
}

function generateMainPage() {
  return `<div id="start-page">
  <p>${store.introMessage}</p>
  <button id="start">START</button>
  <button id="audio">AUDIO ON</button>
  </div>`;
}

function generateLosePage() {
  return `<div id="lose-page">
  <h1>ERROR</h1>
  <p>The correct answer was [${
    store.questions[store.questionNumber - 1].correctAnswers
  }]</p>
  <button class="restart">RESTART</button>
  <button class="continue">CONTINUE</button>
  </div>`;
}

function generateCorrectPage() {
  return `<div id="continue-page">
  <h1>CORRECT!!</h1>
  <button class="continue">CONTINUE</button>
  </div>`;
}

function generateWinPage() {
  return `<div id="win-page">
  <h1>QUIZ END</h1>
  <p>You correctly guessed ${store.score} out of ${store.questions.length} questions </p> <br>
  <p>Good human</p>
  <button class="restart">RESTART</button>
  </div>`;
}

function generateQuestion() {
  let question = store.questions[store.questionNumber];

  let answerButtons = question.answers
    .map((answer) => new AnswerButton(answer).element)
    .join("");

  return `<div id="quiz-page">
  <h2>${question.question}</h2>
  <form id="question">
  ${answerButtons}
  <input type="submit"/>
  </form>
  <p>Question # ${store.questionNumber + 1}</p>
  </div>`;
}

//#endregion

//#region HANDLE EVENTS
// -------------------

function handleStartQuiz() {
  $("main").on("click", "#start", () => {
    store.quizStarted = true;
    playSound(1);
    playBackgroundMusic();
    $(render);
  });

  $("main").on("click", "#audio", (e) => {
    if (store.audioOn) {
      e.target.innerHTML = "AUDIO OFF";
      store.audioOn = false;
    } else {
      e.target.innerHTML = "AUDIO ON";
      store.audioOn = true;
    }
  });
}

function handleAnswerSubmit() {
  $("main").on("submit", "#question", (e) => {
    e.preventDefault();
    let answer = $('input[name = "answer"]:checked').val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswers;

    store.questionNumber++;

    if (answer === correctAnswer) {
      store.score++;
      playSound(0);
      render("correctPage");
    } else {
      playSound(2);
      render("losePage");
    }
  });
}

function handleEndScreen() {
  $("main").on("click", ".restart", (e) => {
    e.preventDefault();
    store.score = 0;
    store.questionNumber = 0;
    store.quizStarted = false;
    playSound(1);
    render("mainPage");
  });

  $("main").on("click", ".continue", (e) => {
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      playSound(1);
      render();
    }
  });
}

function handleCorrectScreen() {
  $("main").on("click", ".continue", (e) => {
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

function handleLoseScreen() {
  $("main").on("click", ".restart", (e) => {
    e.preventDefault();
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

//#endregion

//#region RENDERING
// -------------------
function render(pagetype) {
  let html = "";

  switch (pagetype) {
    case "startPage":
      html = generateMainPage();
      break;
    case "endPage":
      html = generateWinPage();
      break;
    case "losePage":
      html = generateLosePage();
      break;
    case "correctPage":
      html = generateCorrectPage();
      break;
    default:
      html = generateQuestion();
  }

  $("main").html(html);
}

//#endregion

//#region HTML Objects and Other stuff
// -------------------
function AnswerButton(answer) {
  this.answer = answer;
  this.element = `<label>
  <input type="radio" class id="${answer}" name="answer" value="${answer}" required>${answer}</label>`;
}

function playBackgroundMusic() {
  if (store.audioOn) {
    var audio = new Audio();
    audio.volume = 0.2;
    audio.src = store.audio[3];
    audio.play();
  }
}

function playSound(index) {
  if (store.audioOn) {
    var audio = new Audio();
    audio.volume = 0.5;
    audio.loop = false;
    audio.src = store.audio[index];
    audio.play();
  }
}

//#endregion

function main() {
  $(titleSetter);
  $(handleStartQuiz);
  $(handleAnswerSubmit);
  $(handleEndScreen);
  $(handleCorrectScreen);
  render("startPage");
}
$(main); // Start after page loads
