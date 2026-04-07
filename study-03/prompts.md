# 상식 퀴즈 게임 - 구현 가이드 (3단계)

> PRD를 기반으로 3개의 핵심 단계로 진화적으로 구현하는 가이드입니다.

---

## 🎯 STEP 1: 기본 구조 + 카테고리/난이도 선택 + 퀴즈 진행 (2.5시간)

### 목표
메인 홈 화면에서 카테고리와 난이도를 선택하고, 퀴즈 문제를 순차적으로 표시하는 기능 구현

### 프롬프트

다음 요구사항에 맞게 `index.html`, `styles.css`, `script.js`를 작성해주세요:

#### **1.1 HTML 마크업 (index.html)**

전체 구조:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>상식 퀴즈 게임</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container">
    <!-- 헤더 -->
    <header class="header">
      <h1>🎓 상식 퀴즈 게임</h1>
    </header>

    <!-- 메인 홈 화면 (screen-home) -->
    <div id="screenHome" class="screen active">
      <div class="home-content">
        <h2>카테고리를 선택하세요</h2>
        
        <!-- 카테고리 버튼 -->
        <div class="category-buttons">
          <button class="category-btn" onclick="selectCategory('korean')">
            <span class="category-title">한국사</span>
            <span class="category-count">10문제</span>
          </button>
          <button class="category-btn" onclick="selectCategory('science')">
            <span class="category-title">과학</span>
            <span class="category-count">10문제</span>
          </button>
          <button class="category-btn" onclick="selectCategory('geography')">
            <span class="category-title">지리</span>
            <span class="category-count">10문제</span>
          </button>
          <button class="category-btn" onclick="selectCategory('general')">
            <span class="category-title">일반상식</span>
            <span class="category-count">10문제</span>
          </button>
        </div>

        <!-- 난이도 선택 -->
        <div class="difficulty-section">
          <h3>난이도를 선택하세요</h3>
          <div class="difficulty-buttons">
            <button class="difficulty-btn difficulty-easy" onclick="selectDifficulty('easy')">
              ⭐ 쉬움
            </button>
            <button class="difficulty-btn difficulty-medium" onclick="selectDifficulty('medium')">
              ⭐⭐ 보통
            </button>
            <button class="difficulty-btn difficulty-hard" onclick="selectDifficulty('hard')">
              ⭐⭐⭐ 어려움
            </button>
            <button class="difficulty-btn difficulty-all" onclick="selectDifficulty('all')">
              🎲 전체
            </button>
          </div>
        </div>

        <!-- 게임 시작 버튼 -->
        <div class="button-group">
          <button id="startBtn" class="btn btn-primary" onclick="startGame()">게임 시작</button>
        </div>

        <!-- 통계 및 설정 -->
        <div class="footer-buttons">
          <button class="btn-icon" onclick="showStats()">📊 통계</button>
          <button class="btn-icon" onclick="showSettings()">⚙️ 설정</button>
        </div>
      </div>
    </div>

    <!-- 게임 진행 화면 (screen-game) -->
    <div id="screenGame" class="screen">
      <!-- 상단 정보 바 -->
      <div class="game-header">
        <div class="game-info">
          <span id="gameCategory" class="category-label">한국사</span>
          <span id="gameProgress" class="progress-text">문제 1/10</span>
        </div>
        <div class="game-score">
          <span id="gameScore" class="score-display">0점</span>
        </div>
      </div>

      <!-- 프로그래스 바 -->
      <div class="progress-bar-container">
        <div id="progressBar" class="progress-bar"></div>
      </div>

      <!-- 퀴즈 영역 -->
      <div class="quiz-container">
        <div class="quiz-content">
          <!-- 문제 -->
          <div class="question-section">
            <h2 id="questionText" class="question-text">문제를 불러오는 중...</h2>
            <div class="question-number" id="questionNumber">Q1/10</div>
          </div>

          <!-- 선택지 (보이지 않음 - STEP 1에서는 표시 전) -->
          <div id="optionsContainer" class="options-container"></div>

          <!-- 도움말 버튼 -->
          <div class="hint-section">
            <button id="hintBtn" class="btn btn-hint" onclick="showHint()">
              💡 도움말
            </button>
            <div id="hintText" class="hint-text" style="display: none;"></div>
          </div>

          <!-- 다음 버튼 (STEP 2에서 활성화) -->
          <div class="button-group">
            <button id="nextBtn" class="btn btn-secondary" onclick="nextQuestion()" style="display: none;">
              다음 문제 →
            </button>
          </div>
        </div>
      </div>

      <!-- 게임 나가기 버튼 -->
      <button id="exitBtn" class="btn btn-danger" onclick="exitGame()">게임 나가기</button>
    </div>

    <!-- 결과 화면 (screen-result) -->
    <div id="screenResult" class="screen">
      <div class="result-container">
        <div class="result-header">🎉 게임 완료!</div>
        <!-- 결과는 STEP 3에서 채워짐 -->
      </div>
    </div>

    <!-- 통계 화면 (screen-stats) -->
    <div id="screenStats" class="screen">
      <div class="stats-container">
        <!-- 통계는 STEP 3에서 채워짐 -->
      </div>
    </div>
  </div>

  <script src="./quizData.js"></script>
  <script src="./script.js"></script>
</body>
</html>
```

요구사항:
- HTML5 DOCTYPE, UTF-8 인코딩, viewport 메타 태그 필수
- 4가지 카테고리별 선택 버튼 (ID: category-btn)
- 4가지 난이도 선택 버튼 (ID: difficulty-btn)
- 게임 시작 버튼 (ID: startBtn)
- ID별 화면 구분 (screenHome, screenGame, screenResult, screenStats)
- 게임 진행 중 상단 정보: 카테고리, 문제 진행도, 점수 표시
- 프로그래스 바 (ID: progressBar)
- 문제 텍스트 (ID: questionText)
- 선택지 컨테이너 (ID: optionsContainer)
- 도움말 버튼 (ID: hintBtn) 및 도움말 텍스트 (ID: hintText)

#### **1.2 CSS 기본 스타일 (styles.css)**

색상 정의:
```css
:root {
  --primary: #4F46E5;
  --success: #10B981;
  --danger: #EF4444;
  --bg: #F9FAFB;
  --card-bg: #FFFFFF;
  --text: #111827;
  --text-light: #6B7280;
  --border: #E5E7EB;
  --easy-color: #DBEAFE;
  --medium-color: #FCD34D;
  --hard-color: #FECACA;
  --all-color: #E9D5FF;
}
```

기본 스타일:
- 전체 폰트: `system-ui, -apple-system, sans-serif`, 16px
- 바디 배경: `--bg`, 패딩 20px
- 컨테이너: 최대 800px, 중앙 정렬, 상하 패딩 40px

헤더:
- 제목 (h1): 32px, bold, 중앙 정렬, 마진 하단 30px

화면 (screen):
- 기본 display: none
- active 클래스 시 display: block

홈 화면 (screenHome):
- 중앙 정렬, 텍스트 중앙 정렬

카테고리 버튼:
- Flexbox 레이아웃 (direction: column), gap: 12px
- 각 버튼: 전체 너비, 패딩 16px, 테두리 2px solid `--border`
- 테두리 반경: 8px
- 배경: `--card-bg`
- 텍스트 정렬: 좌측, 컬럼 레이아웃
- 호버: 배경 → 연한 `--primary`, 색 → `--primary`, 테두리 → `--primary`
- transition: 0.2s ease

난이도 버튼 그룹:
- Flexbox, wrap: wrap, gap: 8px, 각 2열

난이도 버튼:
- 패딩: 12px 16px
- 테두리: 1px solid `--border`
- 테두리 반径: 6px
- 배경: `--card-bg`
- 커서: pointer
- transition: 0.2s ease
- 난이도별 active 상태: 배경 업데이트
  - easy: `--easy-color` 배경, `--text` 텍스트
  - medium: `--medium-color` 배경
  - hard: `--hard-color` 배경
  - all: `--all-color` 배경

게임 헤더 (game-header):
- Flexbox, justify-content: space-between
- 마진 하단: 20px
- 패딩 하단: 16px
- 테두리 하단: 1px solid `--border`

프로그래스 바:
- background-color: `--border`
- height: 6px
- 테두리 반경: 3px
- 마진 하단: 30px

프로그래스 바 채워지는 부분 (#progressBar):
- background-color: `--primary`
- height: 100%
- transition: width 0.3s ease

퀴즈 컨테이너:
- 배경: `--card-bg`
- 패딩: 30px
- 테두리 반경: 12px
- 박스 섀도우: 0 2px 8px rgba(0,0,0,0.08)
- 마진 하단: 20px

질문 섹션:
- 마진 하단: 30px

질문 텍스트 (question-text):
- 폰트 크기: 20px
- 폰트 무게: 600
- 라인 하이트: 1.6
- 마진 하단: 10px

질문 번호 (question-number):
- 색: `--text-light`
- 폰트 크기: 14px

버튼 스타일:
```css
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-primary {
  background-color: --primary;
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: --text-light;
  color: white;
}

.btn-danger {
  background-color: --danger;
  color: white;
}

.btn-hint {
  background-color: #FEF3C7;
  color: #D97706;
  font-weight: 500;
}
```

#### **1.3 JavaScript 핵심 기능 (script.js)**

**전역 상태 관리:**

```javascript
// 게임 상태
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

// 화면 전환 함수
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// 카테고리 선택
function selectCategory(category) {
  gameState.currentCategory = category;
  // UI 업데이트 (선택된 카테고리 하이라이트)
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.closest('.category-btn').classList.add('active');
}

// 난이도 선택
function selectDifficulty(difficulty) {
  gameState.currentDifficulty = difficulty;
  // UI 업데이트 (선택된 난이도 하이라이트)
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// 게임 시작
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

// 퀴즈 필터링 함수
function filterQuizzes(category, difficulty) {
  let filtered = getQuizzesByCategory(category);
  
  if (difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  return filtered;
}

// 현재 문제 표시
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

// 선택지 표시 (STEP 2에서 구현)
function displayOptions() {
  // STEP 2에서 구현
}

// 도움말 표시
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

// 다음 문제 (STEP 2에서 구현)
function nextQuestion() {
  // STEP 2에서 구현
}

// 게임 나가기
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

// 게임 종료 (STEP 3에서 구현)
function endGame() {
  // STEP 3에서 구현
}

// 카테고리명 가져오기
function getCategoryName(category) {
  const names = {
    'korean': '한국사',
    'science': '과학',
    'geography': '지리',
    'general': '일반상식'
  };
  return names[category] || '';
}

// 카테고리별 퀴즈 가져오기 (quizData.js에서 정의)
function getQuizzesByCategory(category) {
  // quizData.js에서 가져옴
  return quizzes.filter(q => q.category === category);
}
```

**quizData.js 샘플 (최소 40문제 필요):**

```javascript
const quizzes = [
  // 한국사 (10개)
  {
    id: "ks_001",
    category: "korean",
    question: "대한민국 건국년도는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "1945년" },
      { id: "B", text: "1948년" },
      { id: "C", text: "1950년" },
      { id: "D", text: "1952년" }
    ],
    correctAnswer: "B",
    explanation: "대한민국은 1948년 8월 15일 건국되었습니다.",
    hint: "1945년은 광복년이고, 1950년은 6.25 전쟁이 일어난 해입니다."
  },
  {
    id: "ks_002",
    category: "korean",
    question: "삼국통일을 이룬 인물은?",
    difficulty: "medium",
    options: [
      { id: "A", text: "김유신" },
      { id: "B", text: "이순신" },
      { id: "C", text: "세종대왕" },
      { id: "D", text: "을지문덕" }
    ],
    correctAnswer: "A",
    explanation: "신라의 장군 김유신은 당나라와 연합하여 삼국통일을 이루었습니다.",
    hint: "신라의 장군이며, 당나라와 연합한 인물입니다."
  },
  {
    id: "ks_003",
    category: "korean",
    question: "한글은 누가 만들었는가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "세종대왕" },
      { id: "B", text: "태종" },
      { id: "C", text: "문종" },
      { id: "D", text: "단종" }
    ],
    correctAnswer: "A",
    explanation: "세종대왕(1397~1450)은 1443년 한글을 창제하였습니다.",
    hint: "조선시대 위대한 왕 중 한 명입니다."
  },
  // ... 7개 더 필요 (난이도 섞여서)

  // 과학 (10개)
  {
    id: "sc_001",
    category: "science",
    question: "지구에서 가장 큰 대양은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "대서양" },
      { id: "B", text: "태평양" },
      { id: "C", text: "인도양" },
      { id: "D", text: "북빙양" }
    ],
    correctAnswer: "B",
    explanation: "태평양은 지구 표면적의 약 1/3을 차지하는 가장 큰 대양입니다.",
    hint: "태양이 지는 방향의 이름이 붙은 대양입니다."
  },
  // ... 8개 더 필요

  // 지리 (10개)
  {
    id: "gg_001",
    category: "geography",
    question: "세계에서 가장 높은 산은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "에베레스트산" },
      { id: "B", text: "킬리만자로산" },
      { id: "C", text: "로키산" },
      { id: "D", text: "알프스산" }
    ],
    correctAnswer: "A",
    explanation: "에베레스트산은 높이 8,848m으로 세계 최고봉입니다.",
    hint: "히말라야 산맥에 위치한 산입니다."
  },
  // ... 8개 더 필요

  // 일반상식 (10개)
  {
    id: "gn_001",
    category: "general",
    question: "한국의 수도는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "부산" },
      { id: "B", text: "서울" },
      { id: "C", text: "대구" },
      { id: "D", text: "인천" }
    ],
    correctAnswer: "B",
    explanation: "서울은 한국의 수도이며 정치, 경제, 문화의 중심지입니다.",
    hint: "한강이 흐르는 도시입니다."
  },
  // ... 8개 더 필요
];
```

### 검증 체크리스트

- [ ] 메인 홈 화면에서 4가지 카테고리 버튼 표시
- [ ] 4가지 난이도 버튼 표시 및 선택 가능
- [ ] 카테고리와 난이도 선택 후 "게임 시작" 버튼 동작
- [ ] 게임 시정 시 화면 전환 (screenHome → screenGame)
- [ ] 선택한 카테고리/난이도에 맞는 문제만 필터링 표시
- [ ] 프로그래스 바가 문제 진행도에 따라 업데이트
- [ ] 점수 표시 (STEP 1에서는 0점)
- [ ] 문제 번호 및 진행도 표시 (1/10, 2/10 등)
- [ ] 도움말 버튼 클릭 시 힌트 텍스트 표시
- [ ] 도움말 1회 사용 후 버튼 비활성화
- [ ] 게임 나가기 버튼으로 홈 화면 복귀
- [ ] 콘솔 에러 없음
- [ ] 모바일/태블릿/데스크톱에서 반응형 동작

---

## 🎯 STEP 2: 정답/오답 피드백 + 도움말 + 점수 계산 (2시간)

### 목표
선택지 클릭 시 정답/오답 즉시 표시, 도움말 활용, 점수 업데이트

### 프롬프트

**STEP 1의 코드를 기반으로 다음 기능을 추가해주세요:**

#### **2.1 선택지 표시 및 클릭 처리**

`displayOptions()` 함수 구현:

```javascript
function displayOptions() {
  const quiz = currentQuizzes[gameState.currentQuestionIndex];
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  
  quiz.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = `${option.id}. ${option.text}`;
    button.onclick = () => selectOption(option.id);
    
    // 이미 선택한 항목이면 표시
    if (gameState.selectedOptions[quiz.id] === option.id) {
      button.classList.add('selected');
    }
    
    container.appendChild(button);
  });
}

// 선택지 클릭
function selectOption(optionId) {
  const quiz = currentQuizzes[gameState.currentQuestionIndex];
  gameState.selectedOptions[quiz.id] = optionId;
  
  // 선택지 UI 업데이트
  displayOptions();
  
  // 정답/오답 표시
  showFeedback(optionId);
  
  // 다음 버튼 표시
  document.getElementById('nextBtn').style.display = 'block';
}

// 정답/오답 피드백 표시
function showFeedback(selectedOptionId) {
  const quiz = currentQuizzes[gameState.currentQuestionIndex];
  const isCorrect = selectedOptionId === quiz.correctAnswer;
  
  // 선택한 버튼 스타일 업데이트
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => {
    if (btn.textContent.startsWith(selectedOptionId)) {
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      btn.disabled = true;
    }
    // 정답 버튼도 강조 표시
    if (isCorrect === false && btn.textContent.startsWith(quiz.correctAnswer)) {
      btn.classList.add('correct-answer');
      btn.disabled = true;
    }
  });
  
  // 정답/오답 메시지 표시
  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = `feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`;
  feedbackDiv.innerHTML = `
    <div class="feedback-content">
      <span class="feedback-icon">${isCorrect ? '✓' : '✗'}</span>
      <span class="feedback-text">${isCorrect ? '정답입니다!' : '오답입니다'}</span>
      <span class="feedback-score">${isCorrect ? '100점' : '0점'}</span>
    </div>
    <div class="explanation-content">
      <strong>설명:</strong> ${quiz.explanation}
    </div>
  `;
  
  // 기존 피드백 제거 후 추가
  const existingFeedback = document.querySelector('.feedback');
  if (existingFeedback) existingFeedback.remove();
  
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.parentNode.insertBefore(feedbackDiv, optionsContainer.nextSibling);
  
  // 점수 업데이트
  if (isCorrect) {
    gameState.score += 100;
    gameState.answeredQuestions.push({
      quizId: quiz.id,
      correct: true,
      usedHint: gameState.usedHints[quiz.id] || false
    });
  } else {
    gameState.answeredQuestions.push({
      quizId: quiz.id,
      correct: false,
      selectedAnswer: gameState.selectedOptions[quiz.id],
      correctAnswer: quiz.correctAnswer,
      usedHint: gameState.usedHints[quiz.id] || false
    });
  }
  
  // 점수 표시 업데이트
  document.getElementById('gameScore').textContent = gameState.score + '점';
}
```

#### **2.2 CSS 선택지 및 피드백 스타일**

```css
/* 선택지 버튼 */
.option-btn {
  display: block;
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  background-color: var(--bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.option-btn:disabled {
  cursor: not-allowed;
}

.option-btn.selected {
  border-color: var(--primary);
}

.option-btn.correct {
  background-color: var(--success);
  color: white;
  border-color: var(--success);
}

.option-btn.incorrect {
  background-color: var(--danger);
  color: white;
  border-color: var(--danger);
}

.option-btn.correct-answer {
  background-color: var(--success);
  color: white;
  border-color: var(--success);
}

/* 피드백 */
.feedback {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.correct-feedback {
  background-color: #DCFCE7;
  border: 1px solid var(--success);
}

.incorrect-feedback {
  background-color: #FEE2E2;
  border: 1px solid var(--danger);
}

.feedback-content {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-weight: 600;
}

.feedback-icon {
  font-size: 24px;
}

.correct-feedback .feedback-text {
  color: var(--success);
}

.incorrect-feedback .feedback-text {
  color: var(--danger);
}

.feedback-score {
  margin-left: auto;
  font-weight: 700;
  font-size: 18px;
}

.correct-feedback .feedback-score {
  color: var(--success);
}

.incorrect-feedback .feedback-score {
  color: var(--danger);
}

.explanation-content {
  color: var(--text);
  font-size: 14px;
  line-height: 1.6;
}
```

#### **2.3 다음 문제 버튼 (nextQuestion 함수 구현)**

```javascript
function nextQuestion() {
  gameState.currentQuestionIndex++;
  
  // 프로그래스 바 및 문제 업데이트
  displayQuestion();
  
  // 다음 버튼 숨김
  document.getElementById('nextBtn').style.display = 'none';
}
```

### 검증 체크리스트

- [ ] 4개의 선택지 버튼 표시
- [ ] 선택지 호버 시 색상 변경
- [ ] 선택지 클릭 시 정답/오답 즉시 표시
- [ ] 정답: 초록색, ✓ 아이콘, "정답입니다!" 메시지
- [ ] 오답: 빨간색, ✗ 아이콘, "오답입니다" 메시지
- [ ] 오답 선택 시 정답 버튼도 초록색으로 강조
- [ ] 설명(explanation) 텍스트 표시
- [ ] 점수 실시간 업데이트 (총점 표시)
- [ ] "다음 문제" 버튼 표시 및 다음 문제로 진행
- [ ] 도움말 기능 여전히 동작
- [ ] 도움말 사용 여부와 관계없이 정답 시 100점
- [ ] 모든 문제 클릭 가능 (반복 선택 X)

---

## 🎯 STEP 3: 게임 결과 저장 + 통계 + 오답 복습 (1.5시간)

### 목표
게임 종료 시 최종 점수 표시, localStorage에 플레이 기록 및 오답 저장, 통계 화면에서 기록 조회 및 오답 복습 기능

### 프롬프트

**STEP 1~2의 코드를 기반으로 다음 기능을 추가해주세요:**

#### **3.1 게임 결과 및 저장**

`endGame()` 함수 구현:

```javascript
function endGame() {
  // 게임 시간 계산
  const duration = Math.floor((Date.now() - gameState.startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  
  // 정답 개수 및 정답률 계산
  const correctCount = gameState.answeredQuestions.filter(q => q.correct).length;
  const totalCount = currentQuizzes.length;
  const accuracy = Math.round((correctCount / totalCount) * 100);
  
  // 신기록 여부 확인
  const prevRecords = getRecordsByCategory(gameState.currentCategory);
  const isNewRecord = prevRecords.length === 0 || gameState.score > Math.max(...prevRecords.map(r => r.score));
  
  // 게임 기록 저장
  const record = {
    id: 'record_' + Date.now(),
    category: gameState.currentCategory,
    difficulty: gameState.currentDifficulty,
    score: gameState.score,
    correctCount: correctCount,
    totalCount: totalCount,
    accuracy: accuracy,
    playedAt: new Date().toISOString(),
    duration: duration,
    isNewRecord: isNewRecord
  };
  
  savePlayRecord(record);
  
  // 오답 저장
  gameState.answeredQuestions.forEach(q => {
    if (!q.correct) {
      const quiz = currentQuizzes.find(qz => qz.id === q.quizId);
      const wrongAnswer = {
        id: 'wrong_' + Date.now() + Math.random(),
        quizId: q.quizId,
        category: gameState.currentCategory,
        difficulty: quiz.difficulty,
        question: quiz.question,
        userAnswer: q.selectedAnswer,
        correctAnswer: q.correctAnswer,
        failedAt: new Date().toISOString(),
        lastReviewedAt: null
      };
      saveWrongAnswer(wrongAnswer);
    }
  });
  
  // 결과 화면 표시
  displayResultScreen(record, correctCount, totalCount, minutes, seconds);
  showScreen('screenResult');
}

// 결과 화면 렌더링
function displayResultScreen(record, correctCount, totalCount, minutes, seconds) {
  const resultContainer = document.querySelector('.result-container');
  resultContainer.innerHTML = `
    <div class="result-header">🎉 게임 완료!</div>
    
    <div class="result-body">
      <div class="result-info">
        <div class="result-row">
          <label>카테고리:</label>
          <span>${getCategoryName(gameState.currentCategory)}</span>
        </div>
        <div class="result-row">
          <label>난이도:</label>
          <span>${getDifficultyName(gameState.currentDifficulty)}</span>
        </div>
      </div>
      
      <div class="result-score">
        <div class="score-box">
          <div class="score-label">맞은 문제</div>
          <div class="score-value">${correctCount}/${totalCount}</div>
          <div class="score-percent">(${record.accuracy}%)</div>
        </div>
        <div class="score-box">
          <div class="score-label">총 점수</div>
          <div class="score-value score-big">${record.score}점</div>
        </div>
        <div class="score-box">
          <div class="score-label">소요 시간</div>
          <div class="score-value">${minutes}분 ${seconds}초</div>
        </div>
      </div>
      
      ${record.isNewRecord ? `
        <div class="new-record">
          <span class="record-icon">🏆</span>
          <span class="record-text">신기록!</span>
        </div>
      ` : ''}
      
      <div class="result-buttons">
        <button class="btn btn-primary" onclick="showScreen('screenHome')">홈으로</button>
        <button class="btn btn-secondary" onclick="startGame()">다시 풀기</button>
        <button class="btn btn-secondary" onclick="showStats()">통계</button>
      </div>
    </div>
  `;
}
```

#### **3.2 localStorage 저장 함수**

```javascript
// 플레이 기록 저장
function savePlayRecord(record) {
  let records = [];
  const stored = localStorage.getItem('playRecords');
  if (stored) {
    records = JSON.parse(stored);
  }
  records.push(record);
  localStorage.setItem('playRecords', JSON.stringify(records));
}

// 오답 저장
function saveWrongAnswer(wrongAnswer) {
  let wrongAnswers = [];
  const stored = localStorage.getItem('wrongAnswers');
  if (stored) {
    wrongAnswers = JSON.parse(stored);
  }
  wrongAnswers.push(wrongAnswer);
  // 최대 50개까지만 저장
  if (wrongAnswers.length > 50) {
    wrongAnswers = wrongAnswers.slice(-50);
  }
  localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
}

// 카테고리별 기록 조회
function getRecordsByCategory(category) {
  const records = getPlayRecords();
  return records.filter(r => r.category === category);
}

// 모든 플레이 기록 조회
function getPlayRecords() {
  const stored = localStorage.getItem('playRecords');
  return stored ? JSON.parse(stored) : [];
}

// 모든 오답 조회
function getWrongAnswers() {
  const stored = localStorage.getItem('wrongAnswers');
  return stored ? JSON.parse(stored) : [];
}

// 카테고리별 최고 점수
function getHighestScoreByCategory(category) {
  const records = getRecordsByCategory(category);
  return records.length > 0 ? Math.max(...records.map(r => r.score)) : 0;
}

// 전체 평균 정답률
function getAverageAccuracy() {
  const records = getPlayRecords();
  if (records.length === 0) return 0;
  const total = records.reduce((sum, r) => sum + r.accuracy, 0);
  return Math.round(total / records.length);
}
```

#### **3.3 통계 화면 (showStats 함수)**

```javascript
function showStats() {
  const records = getPlayRecords();
  const wrongAnswers = getWrongAnswers();
  
  const statsContainer = document.querySelector('.stats-container');
  
  if (records.length === 0) {
    statsContainer.innerHTML = `
      <div class="stats-empty">
        <h2>플레이 기록이 없습니다</h2>
        <p>게임을 플레이하면 통계가 저장됩니다.</p>
        <button class="btn btn-primary" onclick="showScreen('screenHome')">게임 시작</button>
      </div>
    `;
    showScreen('screenStats');
    return;
  }
  
  // 카테고리별 통계
  const categoryStats = ['korean', 'science', 'geography', 'general'].map(cat => {
    const catRecords = getRecordsByCategory(cat);
    if (catRecords.length === 0) return null;
    
    const highest = Math.max(...catRecords.map(r => r.score));
    const latestDate = new Date(catRecords[catRecords.length - 1].playedAt).toLocaleDateString('ko-KR');
    
    return {
      category: getCategoryName(cat),
      count: catRecords.length,
      highest: highest,
      latest: latestDate
    };
  }).filter(Boolean);
  
  // HTML 생성
  let html = `
    <div class="stats-header">
      <button class="btn-back" onclick="showScreen('screenHome')">← 돌아가기</button>
      <h2>📊 나의 통계</h2>
    </div>
    
    <div class="stats-body">
      <div class="stats-summary">
        <div class="stat-card">
          <span class="stat-label">총 플레이</span>
          <span class="stat-value">${records.length}회</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">평균 정답률</span>
          <span class="stat-value">${getAverageAccuracy()}%</span>
        </div>
      </div>
      
      <div class="category-stats">
        <h3>🏆 카테고리별 최고 점수</h3>
        ${categoryStats.map(stat => `
          <div class="category-stat-row">
            <span class="stat-name">${stat.category}</span>
            <span class="stat-count">${stat.count}회</span>
            <span class="stat-score">${stat.highest}점</span>
            <span class="stat-date">${stat.latest}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="recent-records">
        <h3>📋 최근 플레이 기록 (최근 10개)</h3>
        ${records.slice(-10).reverse().map((record, idx) => `
          <div class="record-row">
            <span class="record-num">${idx + 1}.</span>
            <span class="record-date">${new Date(record.playedAt).toLocaleDateString('ko-KR')}</span>
            <span class="record-category">${getCategoryName(record.category)}</span>
            <span class="record-score">${record.correctCount}/${record.totalCount} (${record.accuracy}%)</span>
            <span class="record-points">${record.score}점</span>
          </div>
        `).join('')}
      </div>
      
      ${wrongAnswers.length > 0 ? `
        <div class="wrong-answers-section">
          <h3>❌ 오답 복습</h3>
          <button class="btn btn-primary" onclick="startWrongAnswerMode()">
            오답 복습 풀기 (${wrongAnswers.length}개)
          </button>
        </div>
      ` : ''}
      
      <div class="data-management">
        <button class="btn btn-danger" onclick="clearAllData()">모든 데이터 삭제</button>
      </div>
    </div>
  `;
  
  statsContainer.innerHTML = html;
  showScreen('screenStats');
}

// 오답 복습 모드 시작
function startWrongAnswerMode() {
  const wrongAnswers = getWrongAnswers();
  
  if (wrongAnswers.length === 0) {
    alert('오답이 없습니다.');
    return;
  }
  
  // 게임 상태 초기화
  gameState.currentCategory = null;
  gameState.currentDifficulty = 'all';
  gameState.currentQuestionIndex = 0;
  gameState.score = 0;
  gameState.answeredQuestions = [];
  gameState.selectedOptions = {};
  gameState.usedHints = {};
  gameState.startTime = Date.now();
  
  // 오답 문제로 currentQuizzes 설정
  currentQuizzes = wrongAnswers.map(wa => {
    const originalQuiz = quizzes.find(q => q.id === wa.quizId);
    return originalQuiz;
  });
  
  // 게임 화면 표시
  showScreen('screenGame');
  
  // 게임 헤더 커스터마이징
  document.getElementById('gameCategory').textContent = '오답 복습';
  
  displayQuestion();
}

// 데이터 초기화
function clearAllData() {
  if (confirm('정말 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem('playRecords');
    localStorage.removeItem('wrongAnswers');
    localStorage.removeItem('userSettings');
    showStats();
  }
}

// 헬퍼 함수: 난이도명
function getDifficultyName(difficulty) {
  const names = {
    'easy': '⭐ 쉬움',
    'medium': '⭐⭐ 보통',
    'hard': '⭐⭐⭐ 어려움',
    'all': '🎲 전체'
  };
  return names[difficulty] || '';
}
```

#### **3.4 결과 및 통계 CSS**

```css
/* 결과 화면 */
.result-container {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.result-header {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
}

.result-body {
  text-align: center;
}

.result-info {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--bg);
  border-radius: 8px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.result-row:last-child {
  margin-bottom: 0;
}

.result-row label {
  font-weight: 600;
  color: var(--text-light);
}

.result-score {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.score-box {
  background-color: var(--bg);
  padding: 16px;
  border-radius: 8px;
}

.score-label {
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.score-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin: 8px 0;
}

.score-big {
  font-size: 32px;
  color: var(--success);
}

.score-percent {
  font-size: 14px;
  color: var(--text-light);
}

.new-record {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #FEF3C7;
  color: #D97706;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 24px;
}

.record-icon {
  font-size: 20px;
}

.result-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

/* 통계 화면 */
.stats-container {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
}

.stats-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.btn-back {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.stats-header h2 {
  margin: 0;
  flex: 1;
}

.stats-body {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg);
  padding: 20px;
  border-radius: 8px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-top: 8px;
}

.category-stats h3,
.recent-records h3,
.wrong-answers-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.category-stat-row,
.record-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.category-stat-row:last-child,
.record-row:last-child {
  border-bottom: none;
}

.stat-name,
.record-category {
  font-weight: 600;
}

.stat-date,
.record-date {
  font-size: 12px;
  color: var(--text-light);
}

.stats-empty {
  text-align: center;
  padding: 40px;
}

.stats-empty h2 {
  margin-bottom: 12px;
}

.data-management {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .result-score {
    grid-template-columns: 1fr;
  }
  
  .result-buttons {
    grid-template-columns: 1fr;
  }
  
  .stats-summary {
    grid-template-columns: 1fr;
  }
  
  .category-stat-row,
  .record-row {
    grid-template-columns: 1fr;
  }
}
```

### 검증 체크리스트

- [ ] 게임 종료 시 결과 화면 표시
- [ ] 최종 정답/오답 수 및 정답률 표시
- [ ] 총 점수 표시
- [ ] 소요 시간 표시 (분:초)
- [ ] 신기록인 경우 "🏆 신기록!" 표시
- [ ] 플레이 기록이 localStorage에 저장됨
- [ ] 오답 기록이 localStorage에 저장됨
- [ ] 통계 화면에서 모든 기록 조회 가능
- [ ] 카테고리별 최고 점수 표시
- [ ] 평균 정답률 계산 및 표시
- [ ] 최근 10개 기록 표시
- [ ] "오답 복습" 버튼으로 오답만 다시 풀기 가능
- [ ] 오답 복습 모드에서 정답했을 때 점수 누적
- [ ] "모든 데이터 삭제" 기능 동작 (확인 다이얼로그)
- [ ] 새로고침 후 localStorage 데이터 유지 확인
- [ ] 모바일/태블릿/데스크톱 반응형 적용

---

## 📝 최종 체크리스트

### 파일 구성
- [ ] index.html (메인 마크업)
- [ ] styles.css (모든 스타일)
- [ ] script.js (게임 로직)
- [ ] quizData.js (문제 데이터, 최소 40문제)

### 기능 검증
- [ ] STEP 1: 카테고리/난이도 선택, 문제 표시
- [ ] STEP 2: 선택지 클릭, 정답/오답 피드백, 점수 계산
- [ ] STEP 3: 결과 저장, 통계 조회, 오답 복습

### 기술 요구사항
- [ ] localStorage 활용 (데이터 영구 저장)
- [ ] 프레임워크 없는 순수 JavaScript
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] CSS 변수 활용
- [ ] 콘솔 에러 없음
- [ ] 60fps 부드러운 성능

---

**총 개발 시간: 약 5.5시간**

각 STEP마다 한 번씩 테스트를 거쳐 진행하시기를 권장합니다.
