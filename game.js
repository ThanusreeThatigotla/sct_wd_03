  
    const questions = [
      { question: "What is the capital of India?", options: ["Mumbai","Delhi","Chennai","Kolkata"], answer: "Delhi" },
      { question: "Which language runs in the browser?", options: ["Python","C++","JavaScript","Java"], answer: "JavaScript" },
      { question: "Which planet is known as the Red Planet?", options: ["Venus","Mars","Jupiter","Saturn"], answer: "Mars" },
      { question: "2 + 2 = ?", options: ["3","4","5","6"], answer: "4" }
    ];

    let currentIndex = 0;
    let score = 0;

    const qEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const scoreEl = document.getElementById('score');

    
    function startQuiz(){
      currentIndex = 0;
      score = 0;
      scoreEl.textContent = '';
      nextBtn.textContent = 'Next';
      nextBtn.dataset.state = 'next'; // 'next' or 'restart'
      showQuestion();
    }

    function showQuestion(){
      nextBtn.style.display = 'none';
      optionsEl.innerHTML = '';
      const q = questions[currentIndex];
      qEl.textContent = (currentIndex + 1) + '. ' + q.question;

      q.options.forEach(optText => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = optText;
        btn.type = 'button';
        btn.addEventListener('click', () => selectAnswer(btn, q.answer));
        optionsEl.appendChild(btn);
      });
    }

    function selectAnswer(button, correctAnswer){
      // disable all buttons
      const all = optionsEl.querySelectorAll('button');
      all.forEach(b => b.disabled = true);

      if (button.textContent === correctAnswer) {
        button.classList.add('correct');
        score++;
      } else {
        button.classList.add('wrong');
        // mark correct one
        all.forEach(b => {
          if (b.textContent === correctAnswer) b.classList.add('correct');
        });
      }

      // show next / finish button
      if (currentIndex < questions.length - 1) {
        nextBtn.textContent = 'Next';
        nextBtn.dataset.state = 'next';
      } else {
        nextBtn.textContent = 'Show Result';
        nextBtn.dataset.state = 'result';
      }
      nextBtn.style.display = 'inline-block';
    }

    function showResult(){
      qEl.textContent = "Quiz Completed!";
      optionsEl.innerHTML = '';
      scoreEl.textContent = 'Your score: ' + score + ' / ' + questions.length;
      nextBtn.textContent = 'Play Again';
      nextBtn.dataset.state = 'restart';
      nextBtn.style.display = 'inline-block';
    }

    // next button handler
    nextBtn.addEventListener('click', function(){
      const state = nextBtn.dataset.state || 'next';
      if (state === 'restart') {
        startQuiz();
        return;
      }
      if (state === 'result') {
        showResult();
        return;
      }
      // state === 'next'
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    });

    // start on load
    startQuiz();

    // small debug log (safe)
    console.log('Quiz loaded. Questions:', questions.length);
  