document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const stepSplash   = document.getElementById('step-splash');
  const stepWelcome  = document.getElementById('step-welcome');
  const stepAcademic = document.getElementById('step-academic');
  const stepQuiz     = document.getElementById('step-quiz');
  const stepComplete = document.getElementById('step-complete');

  const btnStart     = document.getElementById('btn-start');
  const btnToQuiz    = document.getElementById('btn-to-quiz');
  
  const progressBar  = document.getElementById('quiz-progress-bar');
  const quizStepText = document.getElementById('quiz-step-text');
  const quizQuestions= document.querySelectorAll('.quiz-question-single');

  let currentQuizStep = 1;
  const totalQuizSteps = quizQuestions.length;
  
  // Data object to hold user onboarding selection
  const userProfileData = {
    fullname: '',
    targetScore: '',
    subjects: ['Use of English'],
    learningPreferences: {}
  };

  // STEP 1 -> STEP 2: Automatic transition from GIF splash after 2.5s
  setTimeout(() => {
    switchScreen(stepSplash, stepWelcome);
  }, 2500);

  // STEP 2 -> STEP 3: "Let's Get Started" tap
  btnStart.addEventListener('click', () => {
    switchScreen(stepWelcome, stepAcademic);
  });

  // Checkbox limit helper (Maximum 3 subjects + locked English = 4 total)
  const subjectCheckboxes = document.querySelectorAll('input[name="subject"]');
  subjectCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      const checkedCount = document.querySelectorAll('input[name="subject"]:checked').length;
      if (checkedCount > 3) {
        chk.checked = false;
        alert('You can select a maximum of 3 elective subjects alongside Use of English.');
      }
    });
  });

  // STEP 3 -> STEP 4: Validation & Move to Questionnaire
  btnToQuiz.addEventListener('click', () => {
    const fullname = document.getElementById('fullname').value.trim();
    const targetScore = document.getElementById('target-score').value;
    const selectedCheckboxes = document.querySelectorAll('input[name="subject"]:checked');
const Secondaryschool = document.getElementById('Secondaryschool').value.trim();
const Currentclass = document.getElementById('Currentclass').value;
    if (!fullname) {
      alert('Please enter your full name.');
      return;
    }
 if (! Secondaryschool) {
      alert('Please enter your Secondary school.'); 
      return;
    }
     if (!Currentclass) {
      alert('Please enter your Current class.');
      return;
    }

    
    if (!targetScore) {
      alert('Please select your target UTME score.');
      return;
    }
    
    if (selectedCheckboxes.length !== 3) {
      alert('Please select exactly 3 elective subjects to complete your 4 UTME subjects.');
      return;
    }

    // Save step 3 values
    userProfileData.fullname = fullname;
    userProfileData.targetScore = targetScore;
    selectedCheckboxes.forEach(cb => userProfileData.subjects.push(cb.value));
    userProfileData.Secondaryschool = Secondaryschool;
     selectedCheckboxes.forEach(cb => userProfileData.subjects.push(cb.value));

    switchScreen(stepAcademic, stepQuiz);
  });

  // STEP 4: 1-by-1 Questionnaire Sequence Handling
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedValue = e.target.getAttribute('data-val');
      userProfileData.learningPreferences[`q${currentQuizStep}`] = selectedValue;

      if (currentQuizStep < totalQuizSteps) {
        // Advance to next question
        quizQuestions[currentQuizStep - 1].classList.remove('active');
        currentQuizStep++;
        quizQuestions[currentQuizStep - 1].classList.add('active');

        // Update progress UI
        const percent = (currentQuizStep / totalQuizSteps) * 100;
        progressBar.style.width = `${percent}%`;
        quizStepText.textContent = `Question ${currentQuizStep} of ${totalQuizSteps}`;
      } else {
        // Questionnaire finished -> STEP 5 Transition
        switchScreen(stepQuiz, stepComplete);
        
        // Save user data to localStorage for main app dashboard
        localStorage.setItem('proWaveUser', JSON.stringify(userProfileData));

        // Redirect to main grid dashboard after brief setup delay
        setTimeout(() => {
          window.location.href = 'prowave.html'; // Navigates to main dashboard page
        }, 1800);
      }
    });
  });

  // Helper Function for Screen Switching
  function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    toScreen.classList.add('active');
  }
});