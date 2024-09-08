function startGame(){
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    if (!player1 || !player2){
        alert ("please fill the name")

    }

    else{
        document.getElementById("players").style.display="none"
        document.getElementById("category").style.display="block"
        fetchCategory() 
    }
}


function fetchCategory(){
    // const apiURL = "https://the-trivia-api.com/v2/questions";
    const apiURL = "https://the-trivia-api.com/api/categories"
    fetch(apiURL)
    .then(response=> response.json())
    .then(data=>{
        const categorySelect = document.getElementById("choose-category")
        categorySelect.innerHTML="";
        Object.keys(data).forEach(category=>{
            const option = document.createElement("option");
            option.value = category;
            option.textContent= category.charAt(0).toUpperCase()+ category.slice(1);
            categorySelect.appendChild(option)
        })
        console.log(data);
        
        
    })
    .catch(error => console.error('Error:', error));
};




var allAnswers;
function fetchQuestions() {
    const selectCategory = document.getElementById("choose-category").value;

    const easyURL = `https://the-trivia-api.com/api/questions?categories=${selectCategory}&limit=2&difficulty=easy`;
    const mediumURL = `https://the-trivia-api.com/api/questions?categories=${selectCategory}&limit=2&difficulty=medium`;
    const hardURL = `https://the-trivia-api.com/api/questions?categories=${selectCategory}&limit=2&difficulty=hard`;

    
    Promise.all([
        fetch(easyURL).then(response => response.json()),
        fetch(mediumURL).then(response => response.json()),
        fetch(hardURL).then(response => response.json())
    ])
    .then(data => {
        questions = [...data[0], ...data[1], ...data[2]];
        console.log(questions);
        allAnswers = questions;
        displayQuestion();
    })
    .catch(error => {
        console.log("Error fetching questions:", error);
    });
}



let currentPlayer=0;
let currentQuestionIndex=0;

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById("category").style.display = "none";
        document.getElementById("all-questions").style.display = "block";
        document.getElementById("question").textContent = `Question: ${questionData.question}`;


        if (currentPlayer === 1) {
            document.getElementById("player1-answer").style.display = "none";
            document.getElementById("player2-answer").value="";
            document.getElementById("player2-answer").style.display = "block";
            document.getElementById("player1-answer").focus();
        } else {
            document.getElementById("player1-answer").value="";
            document.getElementById("player1-answer").style.display = "block";
            
            document.getElementById("player2-answer").style.display= "none";
            document.getElementById("player2-answer").focus();
        }
    
    } else {
        

    }
}




var  player1Answer
let scores = {
    player1: 0,
    player2: 0
};

function nextQuestion(questionIndex){

    const correctAnswers = allAnswers.map((x) => x.correctAnswer); 
    let currentAnswer;
    
    if (currentQuestionIndex % 2 === 0) {
        currentAnswer = document.getElementById("player1-answer").value.trim();
    

        if (currentQuestionIndex <= 2) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player1 += 10; 
            }
        }  else if (currentQuestionIndex > 2 && currentQuestionIndex <= 4) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player1 += 15; 
            }
        }  else if (currentQuestionIndex > 4 && currentQuestionIndex <= 6) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player1 += 20; 
            }
        }
    } else {
        currentAnswer = document.getElementById("player2-answer").value.trim();
    
        if (currentQuestionIndex <= 2) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player2 += 10; 
            }
        } else if (currentQuestionIndex > 2 && currentQuestionIndex <= 4) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player2 += 15; 
            }
        } else if (currentQuestionIndex > 4 && currentQuestionIndex <= 6) {
            if (correctAnswers.includes(currentAnswer)) {
                scores.player2 += 20; 
            }
        }
    }


    
    
    if (currentAnswer === "") {
        alert("Please enter an answer before proceeding.");
        return;
    }
    currentQuestionIndex++;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    displayQuestion();
}





function submitAnswers() {

    document.getElementById("submit").style.display = "block";
    document.getElementById("next").style.display = "block";
    showMarks();
}





function showMarks() {
    document.getElementById("all-questions").style.display = "none";
    document.getElementById("results").style.display = "block";

    
    // Get player names
    const player1Name = document.getElementById("player1").value || "Player 1";
    const player2Name = document.getElementById("player2").value || "Player 2";
    
    let winner;
    if (scores.player1 > scores.player2) {
        winner = player1Name;
    } else if (scores.player2 > scores.player1) {
        winner = player2Name;
    } else {
        winner = "No one";
    }


    document.getElementById("player1-score").textContent = `Player 1 (${player1Name}) Score: ${scores.player1}`;
    document.getElementById("player2-score").textContent = `Player 2 (${player2Name}) Score: ${scores.player2}`;
    document.getElementById("winner").textContent = `Winner: ${winner}`;
}






function playAgain() {
    window.location.reload()

}