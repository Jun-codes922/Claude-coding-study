// ===== 게임 상태 관리 =====
let gameState = {
  currentCategory: null,
  currentDifficulty: 'all',
  currentQuestionIndex: 0,
  score: 0,
  answeredQuestions: [],
  selectedOptions: {},
  usedHints: {},
  startTime: null
};

// 현재 퀴즈 목록 (필터링된)
let currentQuizzes = [];

// ===== 화면 전환 함수 =====
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// ===== 카테고리 선택 =====
function selectCategory(category) {
  gameState.currentCategory = category;
  
  // UI 업데이트 (선택된 카테고리 하이라이트)
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 클릭한 버튼 활성화
  const buttons = document.querySelectorAll('.category-btn');
  const categoryMap = {
    'korean': 0,
    'science': 1,
    'geography': 2,
    'general': 3
  };
  
  if (categoryMap[category] !== undefined) {
    buttons[categoryMap[category]].classList.add('active');
  }
}

// ===== 난이도 선택 =====
function selectDifficulty(difficulty) {
  gameState.currentDifficulty = difficulty;
  
  // UI 업데이트 (선택된 난이도 하이라이트)
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 클릭한 버튼 활성화
  const buttons = document.querySelectorAll('.difficulty-btn');
  const difficultyMap = {
    'easy': 0,
    'medium': 1,
    'hard': 2,
    'all': 3
  };
  
  if (difficultyMap[difficulty] !== undefined) {
    buttons[difficultyMap[difficulty]].classList.add('active');
  }
}

// ===== 게임 시작 =====
function startGame() {
  if (!gameState.currentCategory) {
    alert('카테고리를 선택하세요!');
    return;
  }

  // 퀴즈 필터링 (카테고리 + 난이도)
  currentQuizzes = filterQuizzes(
    gameState.currentCategory,
    gameState.currentDifficulty
  );

  if (currentQuizzes.length === 0) {
    alert('해당 조건의 문제가 없습니다.');
    return;
  }

  // 게임 상태 초기화
  gameState.currentQuestionIndex = 0;
  gameState.score = 0;
  gameState.answeredQuestions = [];
  gameState.selectedOptions = {};
  gameState.usedHints = {};
  gameState.startTime = Date.now();

  // 화면 전환
  showScreen('screenGame');
  displayQuestion();
}

// ===== 퀴즈 필터링 함수 =====
function filterQuizzes(category, difficulty) {
  let filtered = getQuizzesByCategory(category);
  
  if (difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  return filtered;
}

// ===== 현재 문제 표시 =====
function displayQuestion() {
  const quiz = currentQuizzes[gameState.currentQuestionIndex];
  
  if (!quiz) {
    endGame();
    return;
  }

  // 카테고리명 표시
  document.getElementById('gameCategory').textContent = getCategoryName(gameState.currentCategory);
  
  // 진행도 표시
  const current = gameState.currentQuestionIndex + 1;
  const total = currentQuizzes.length;
  document.getElementById('gameProgress').textContent = `문제 ${current}/${total}`;
  document.getElementById('questionNumber').textContent = `Q${current}/${total}`;
  
  // 프로그래스 바 업데이트
  const progress = (current / total) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  
  // 점수 표시
  document.getElementById('gameScore').textContent = gameState.score + '점';
  
  // 문제 텍스트 표시
  document.getElementById('questionText').textContent = quiz.question;
  
  // 도움말 리셋
  document.getElementById('hintText').style.display = 'none';
  document.getElementById('hintBtn').textContent = '💡 도움말';
  document.getElementById('hintBtn').disabled = gameState.usedHints[quiz.id] || false;
  
  // 선택지 표시 (STEP 2에서 구현)
  displayOptions();
}

// ===== 선택지 표시 (STEP 2에서 구현) =====
function displayOptions() {
  // STEP 2에서 구현
  console.log('STEP 2에서 구현 예정');
}

// ===== 도움말 표시 =====
function showHint() {
  const quiz = currentQuizzes[gameState.currentQuestionIndex];
  
  if (gameState.usedHints[quiz.id]) {
    return;
  }
  
  gameState.usedHints[quiz.id] = true;
  
  const hintElement = document.getElementById('hintText');
  hintElement.textContent = quiz.hint || '도움말이 없습니다.';
  hintElement.style.display = 'block';
  
  // 도움말 버튼 비활성화
  document.getElementById('hintBtn').disabled = true;
  document.getElementById('hintBtn').textContent = '도움말 사용함 ✓';
}

// ===== 다음 문제 (STEP 2에서 구현) =====
function nextQuestion() {
  // STEP 2에서 구현
  console.log('STEP 2에서 구현 예정');
}

// ===== 게임 나가기 =====
function exitGame() {
  if (confirm('게임을 나가시겠습니까? 진행 상황이 저장되지 않습니다.')) {
    gameState = {
      currentCategory: null,
      currentDifficulty: 'all',
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedOptions: {},
      usedHints: {},
      startTime: null
    };
    showScreen('screenHome');
  }
}

// ===== 게임 종료 (STEP 3에서 구현) =====
function endGame() {
  // STEP 3에서 구현
  console.log('STEP 3에서 구현 예정');
}

// ===== 카테고리명 가져오기 =====
function getCategoryName(category) {
  const names = {
    'korean': '한국사',
    'science': '과학',
    'geography': '지리',
    'general': '일반상식'
  };
  return names[category] || '';
}

// ===== 난이도명 가져오기 =====
function getDifficultyName(difficulty) {
  const names = {
    'easy': '⭐ 쉬움',
    'medium': '⭐⭐ 보통',
    'hard': '⭐⭐⭐ 어려움',
    'all': '🎲 전체'
  };
  return names[difficulty] || '';
}

// ===== 카테고리별 퀴즈 가져오기 =====
function getQuizzesByCategory(category) {
  return quizzes.filter(q => q.category === category);
}

// ===== 통계 표시 (STEP 3에서 구현) =====
function showStats() {
  console.log('STEP 3에서 구현 예정');
  alert('STEP 3에서 구현 예정입니다.');
}

// ===== 설정 표시 (향후 구현) =====
function showSettings() {
  alert('설정 기능은 향후 업데이트 예정입니다.');
}
