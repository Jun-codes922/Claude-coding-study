# 할 일 관리 앱 - 구현 가이드 (5단계 개선)

> PRD를 기반으로 5개의 핵심 단계로 진화적으로 구현하는 가이드입니다.

---

## 🎯 STEP 1: 기본 구조 및 핵심 기능 구현 (2시간)

## 🎯 STEP 1: 기본 구조 및 핵심 기능 구현 (2시간)

### 목표
완전히 작동하는 핵심 할 일 관리 기능 구현 (CRUD + 완료 체크)

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
  <title>할 일 관리 앱</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container">
    <!-- 제목 -->
    <h1>📝 할 일 관리</h1>
    
    <!-- 입력 영역 -->
    <div class="input-section">
      <input type="text" id="todoInput" placeholder="할 일을 입력하세요...">
      <button id="addBtn">추가</button>
    </div>
    
    <!-- 할 일 목록 -->
    <ul id="todoList" class="todo-list"></ul>
  </div>
  
  <script src="./script.js"></script>
</body>
</html>
```

요구사항:
- HTML5 DOCTYPE, UTF-8 인코딩, viewport 메타 태그
- 제목: "📝 할 일 관리"
- 입력 필드 (ID: `todoInput`, placeholder 포함)
- "추가" 버튼 (ID: `addBtn`)
- 할 일 목록 컨테이너 (ID: `todoList`, <ul> 태그 사용)
- 최대 너비 800px의 중앙 정렬 컨테이너

#### **1.2 CSS 기본 스타일 (styles.css)**

색상 정의:
```css
:root {
  --primary: #007AFF;
  --success: #34C759;
  --danger: #FF3B30;
  --bg: #F5F5F5;
  --card-bg: #FFFFFF;
  --text: #333333;
  --text-light: #999999;
  --border: #E0E0E0;
}
```

기본 스타일:
- 전체 폰트: `sans-serif`, 14px
- 바디 배경: `--bg`, 패딩 20px
- 컨테이너: 최대 800px, 중앙 정렬, 상하 패딩 40px

제목:
- 글꼴 크기: 28px, bold, 중앙 정렬, 마진 하단 30px

입력 영역:
- 배경: `--card-bg`
- 패딩: 20px
- 테두리 반경: 8px
- 박스 섀도우: `0 2px 8px rgba(0,0,0,0.1)`
- 마진 하단: 20px
- Flexbox 레이아웃, gap: 10px

입력 필드:
- 너비: 1 (flex grow)
- 패딩: 10px 12px
- 테두리: 1px solid `--border`
- 테두리 반경: 6px
- 포커스: 테두리 색 → `--primary`, outline none

버튼 (추가 버튼):
- 배경: `--primary`
- 색: 흰색
- 패딩: 10px 20px
- 테두리 반경: 6px
- 커서: pointer
- 호버: opacity 0.85

할 일 목록:
- 배경: `--card-bg`
- 테두리 반경: 8px
- 박스 섀도우: `0 2px 8px rgba(0,0,0,0.1)`
- 패딩: 0 (리스트 스타일 제거)
- 마진: 0

할 일 항목 (`<li>`):
- 패딩: 16px 20px
- 테두리 하단: 1px solid `--border`
- 마지막 항목: 테두리 없음
- Flexbox, align-items: center, gap: 12px
- 완료 시 배경: 연한 색 (선택)
- transition: 0.3s ease

체크박스:
- 크기: 20px × 20px
- 커서: pointer
- flex-shrink: 0

제목 텍스트:
- flex: 1
- 완료 시: text-decoration: line-through
- 완료 시: 색: `--text-light`

삭제 버튼:
- 배경: 투명
- 색: `--danger`
- 패딩: 6px 10px
- 테두리: 1px solid `--danger`
- 테두리 반경: 4px
- 커서: pointer
- 호버: 배경 → `--danger`, 색 → white

#### **1.3 JavaScript 핵심 기능 (script.js)**

**Step 1 - 초기 데이터 및 기본 함수:**

```javascript
// 데이터 구조
let todos = [];

// 할 일 추가
function addTodo() {
  const input = document.getElementById('todoInput');
  const title = input.value.trim();
  
  if (!title) {
    alert('할 일을 입력하세요!');
    return;
  }
  
  const todo = {
    id: Date.now(),
    title: title,
    completed: false
  };
  
  todos.push(todo);
  input.value = '';
  renderTodos();
}

// UI 렌더링
function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) li.classList.add('completed');
    
    li.innerHTML = `
      <input type="checkbox" 
             ${todo.completed ? 'checked' : ''} 
             onchange="toggleTodo(${todo.id})">
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
    `;
    
    list.appendChild(li);
  });
}

// 완료 토글
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// 삭제
function deleteTodo(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
  }
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addBtn').addEventListener('click', addTodo);
  document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  renderTodos();
});
```

요구사항:
- 할 일 추가: 입력 필드에서 텍스트 가져오기, 유효성 검사, 배열에 추가, UI 렌더링
- 완료 체크: 체크박스 클릭 시 `completed` 토글, 취소선 표시
- 삭제: 버튼 클릭 시 확인 다이얼로그 표시, 배열에서 제거
- 렌더링: `<li>` 동적 생성, 이벤트 리스너 등록
- Enter 키로도 추가 가능

### 검증 기준
- [ ] 할 일 입력 후 목록에 추가됨
- [ ] 체크박스 클릭 시 취소선 표시됨
- [ ] 삭제 버튼 클릭 시 확인 후 제거됨
- [ ] 페이지에서 JavaScript 에러 없음
- [ ] 모바일 화면에서도 깔끔함

---

## 🎨 STEP 2: 카테고리 기능 및 UI 개선 (1.5시간)

## 🎨 STEP 2: 카테고리 기능 및 UI 개선 (1.5시간)

### 목표
카테고리 기능 추가 및 전체적인 UI/UX 개선

### 프롬프트

STEP 1의 코드에 다음 기능을 추가해주세요:

#### **2.1 HTML 확장 - 카테고리 선택**

입력 영역 수정:
```html
<div class="input-section">
  <input type="text" id="todoInput" placeholder="할 일을 입력하세요...">
  <select id="categorySelect">
    <option value="업무">업무</option>
    <option value="개인">개인</option>
    <option value="공부">공부</option>
  </select>
  <button id="addBtn">추가</button>
</div>
```

필터 버튼 추가 (할 일 목록 위):
```html
<div class="filter-section">
  <span>필터:</span>
  <button class="filter-btn active" data-filter="all">전체</button>
  <button class="filter-btn" data-filter="업무">업무</button>
  <button class="filter-btn" data-filter="개인">개인</button>
  <button class="filter-btn" data-filter="공부">공부</button>
</div>
```

#### **2.2 CSS 확장 - 카테고리 스타일**

셀렉트 박스:
- 스타일: 입력 필드와 동일
- 패딩: 10px 12px
- 배경: white
- 포커스: 테두리 색 → `--primary`

필터 섹션:
- 마진 하단: 20px
- 패딩: 16px 20px
- 배경: `--card-bg`
- 테두리 반경: 8px
- Flexbox, align-items: center, gap: 10px

필터 버튼:
- 배경: 투명 또는 #F0F0F0
- 패딩: 8px 16px
- 테두리: 1px solid `--border`
- 테두리 반경: 20px
- 커서: pointer
- transition: 0.3s ease

필터 버튼 (활성):
- 배경: `--primary`
- 색: white
- 테두리 색: `--primary`

카테고리 배지:
- 인라인 스타일 또는 클래스로 배치
- 패딩: 4px 8px
- 테두리 반径: 4px
- 폰트 크기: 12px

카테고리별 색상:
```css
.category-badge.work { background: #E3F2FD; color: #1976D2; }
.category-badge.personal { background: #FFF3E0; color: #E65100; }
.category-badge.study { background: #F3E5F5; color: #7B1FA2; }
```

완료된 항목 스타일:
```css
.todo-item.completed {
  background: #FAFAFA;
  opacity: 0.7;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-light);
}
```

#### **2.3 JavaScript 확장 - 카테고리 및 필터링**

데이터 구조 수정:
```javascript
let todos = [];
let currentFilter = 'all';

// 할 일 객체 구조 변경
{
  id: Date.now(),
  title: "할 일",
  category: "업무",  // 추가
  completed: false
}
```

할 일 추가 함수 수정:
```javascript
function addTodo() {
  const input = document.getElementById('todoInput');
  const category = document.getElementById('categorySelect').value;
  const title = input.value.trim();
  
  if (!title) {
    alert('할 일을 입력하세요!');
    return;
  }
  
  const todo = {
    id: Date.now(),
    title: title,
    category: category,  // 추가
    completed: false
  };
  
  todos.push(todo);
  input.value = '';
  renderTodos();
}
```

렌더링 함수 수정:
```javascript
function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  
  // 필터링 적용
  const filtered = getFilteredTodos();
  
  if (filtered.length === 0) {
    list.innerHTML = '<li class="empty-state">할 일이 없습니다.</li>';
    return;
  }
  
  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) li.classList.add('completed');
    
    li.innerHTML = `
      <input type="checkbox" 
             ${todo.completed ? 'checked' : ''} 
             onchange="toggleTodo(${todo.id})">
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <span class="category-badge category-${getCategoryClass(todo.category)}">
        ${todo.category}
      </span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
    `;
    
    list.appendChild(li);
  });
}

// 필터링 함수 추가
function getFilteredTodos() {
  if (currentFilter === 'all') return todos;
  return todos.filter(t => t.category === currentFilter);
}

// 카테고리별 클래스 반환
function getCategoryClass(category) {
  const map = {
    '업무': 'work',
    '개인': 'personal',
    '공부': 'study'
  };
  return map[category] || 'work';
}

// 필터 버튼 이벤트
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderTodos();
    });
  });
}

// 초기화 함수 수정
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addBtn').addEventListener('click', addTodo);
  document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  setupFilterButtons();  // 추가
  renderTodos();
});
```

CSS 추가:
```css
.empty-state {
  text-align: center;
  color: var(--text-light);
  padding: 40px 20px;
  font-size: 16px;
}

.category-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
```

### 검증 기준
- [ ] 할 일 추가 시 카테고리 선택 가능
- [ ] 필터 버튼 클릭 시 해당 카테고리 항목만 표시
- [ ] 카테고리별 배지 색상이 올바르게 표시됨
- [ ] 모든 카테고리 필터가 정상 작동
- [ ] 빈 목록 시 "할 일이 없습니다." 메시지 표시

---

## 📊 STEP 3: 진행률 대시보드 추가 (1시간)

## 📊 STEP 3: 진행률 대시보드 추가 (1시간)

### 목표
전체 진행 상황을 시각적으로 표시하는 대시보드 추가

### 프롬프트

STEP 2의 코드에 진행률 대시보드를 추가해주세요:

#### **3.1 HTML - 대시보드 섹션**

할 일 목록 위에 추가:
```html
<div class="dashboard">
  <div class="stat-card">
    <div class="stat-label">전체</div>
    <div class="stat-number" id="totalCount">0</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">완료</div>
    <div class="stat-number" id="completedCount">0</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">남은 일</div>
    <div class="stat-number" id="remainingCount">0</div>
  </div>
</div>

<div class="progress-section">
  <div class="progress-label">
    <span id="progressText">완료율: 0%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" id="progressFill" style="width: 0%"></div>
  </div>
</div>
```

#### **3.2 CSS - 대시보드 스타일**

대시보드:
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background: var(--card-bg);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary);
}
```

진행률 섹션:
```css
.progress-section {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.progress-label {
  margin-bottom: 12px;
  font-weight: 500;
  color: var(--text);
}

.progress-bar {
  width: 100%;
  height: 24px;
  background: #E0E0E0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success), var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: attr(data-percentage);
}
```

#### **3.3 JavaScript - 통계 계산**

통계 업데이트 함수:
```javascript
function updateStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  // DOM 업데이트
  document.getElementById('totalCount').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('remainingCount').textContent = remaining;
  
  // 진행률 바
  const fill = document.getElementById('progressFill');
  fill.style.width = percentage + '%';
  document.getElementById('progressText').textContent = `완료율: ${percentage}%`;
  
  // 진행률 바에 퍼센티지 표시 (선택)
  if (percentage > 10) {
    fill.setAttribute('data-percentage', percentage + '%');
  }
}

// 렌더링 함수 수정
function renderTodos() {
  // ... 기존 코드 ...
  updateStats();  // 추가
}

// toggleTodo, deleteTodo 함수도 renderTodos() 호출하므로 자동 업데이트됨
```

고급 옵션 - 카테고리별 통계:
```javascript
function updateCategoryStats() {
  const categories = ['업무', '개인', '공부'];
  const stats = {};
  
  categories.forEach(cat => {
    const items = todos.filter(t => t.category === cat);
    const completed = items.filter(t => t.completed).length;
    stats[cat] = {
      total: items.length,
      completed: completed,
      percentage: items.length === 0 ? 0 : Math.round((completed / items.length) * 100)
    };
  });
  
  console.log('Category Stats:', stats);
  return stats;
}

// 각 필터 변경 시 호출 (선택)
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // ... 기존 코드 ...
      updateCategoryStats();  // 추가
    });
  });
}
```

### 검증 기준
- [ ] 전체/완료/남은 일 개수가 정확하게 계산됨
- [ ] 할 일 추가/삭제할 때 통계 즉시 업데이트됨
- [ ] 완료 체크 시 진행률 바 업데이트됨
- [ ] 진행률 바가 부드럽게 애니메이션됨
- [ ] 0%와 100% 사이의 모든 값이 올바르게 표시됨

---

## 🌙 STEP 4: 다크 모드 및 고급 기능 (1.5시간)

## 🌙 STEP 4: 다크 모드 및 고급 기능 (1.5시간)

### 목표
사용자 선호도에 맞는 다크 모드와 추가 기능 구현

### 프롬프트

STEP 3의 코드에 다음 기능을 추가해주세요:

#### **4.1 HTML - 다크 모드 토글**

제목 옆에 토글 버튼 추가:
```html
<div class="header">
  <h1>📝 할 일 관리</h1>
  <button id="darkModeBtn" class="theme-toggle">🌙</button>
</div>
```

#### **4.2 CSS - 다크 모드 색상**

기본 색상 정의 수정:
```css
:root {
  --primary: #007AFF;
  --success: #34C759;
  --danger: #FF3B30;
  --bg: #F5F5F5;
  --card-bg: #FFFFFF;
  --text: #333333;
  --text-light: #999999;
  --border: #E0E0E0;
}

/* 다크 모드 */
body.dark-mode {
  --bg: #1A1A1A;
  --card-bg: #2D2D2D;
  --text: #FFFFFF;
  --text-light: #B0B0B0;
  --border: #444444;
}
```

토글 버튼 스타일:
```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--card-bg);
  border-color: var(--primary);
}
```

#### **4.3 JavaScript - 다크 모드 저장**

다크 모드 함수:
```javascript
// 다크 모드 토글
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateThemeButton();
}

// 테마 버튼 업데이트
function updateThemeButton() {
  const btn = document.getElementById('darkModeBtn');
  const isDark = document.body.classList.contains('dark-mode');
  btn.textContent = isDark ? '☀️' : '🌙';
}

// 저장된 테마 로드
function loadTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  updateThemeButton();
}

// 초기화 함수에 추가
document.addEventListener('DOMContentLoaded', () => {
  // ... 기존 코드 ...
  loadTheme();
  document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);
});
```

#### **4.4 고급 기능 1: 수정 기능**

HTML 수정:
```html
<!-- 렌더링 함수에서 할 일 항목 생성 시 -->
<button class="edit-btn" onclick="editTodo(${todo.id})">수정</button>
```

JavaScript:
```javascript
let editingId = null;

function editTodo(id) {
  if (editingId === id) {
    // 이미 수정 중이면 취소
    editingId = null;
    renderTodos();
    return;
  }
  
  editingId = id;
  const todo = todos.find(t => t.id === id);
  const item = document.getElementById(`todo-${id}`);
  
  // 인라인 편집 UI로 변경
  item.innerHTML = `
    <input type="text" class="edit-input" id="editInput" value="${escapeHtml(todo.title)}">
    <select class="edit-category">
      <option value="업무" ${todo.category === '업무' ? 'selected' : ''}>업무</option>
      <option value="개인" ${todo.category === '개인' ? 'selected' : ''}>개인</option>
      <option value="공부" ${todo.category === '공부' ? 'selected' : ''}>공부</option>
    </select>
    <button class="save-btn" onclick="saveTodo(${id})">저장</button>
    <button class="cancel-btn" onclick="cancelEdit()">취소</button>
  `;
  
  document.getElementById('editInput').focus();
  document.getElementById('editInput').select();
}

function saveTodo(id) {
  const newTitle = document.getElementById('editInput').value.trim();
  const newCategory = document.querySelector('.edit-category').value;
  
  if (!newTitle) {
    alert('제목을 입력하세요!');
    return;
  }
  
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.title = newTitle;
    todo.category = newCategory;
  }
  
  editingId = null;
  renderTodos();
}

function cancelEdit() {
  editingId = null;
  renderTodos();
}
```

CSS:
```css
.edit-input {
  flex: 1;
  padding: 8px 10px;
  border: 2px solid var(--primary);
  border-radius: 4px;
}

.edit-category {
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.save-btn, .cancel-btn {
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.save-btn {
  background: var(--success);
  color: white;
  border: none;
}

.cancel-btn {
  background: var(--text-light);
  color: white;
  border: none;
}
```

#### **4.5 고급 기능 2: localStorage 저장**

저장 함수:
```javascript
function saveTodosToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodosFromStorage() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    try {
      todos = JSON.parse(saved);
    } catch {
      console.error('데이터 로드 실패');
      todos = [];
    }
  }
}

// 모든 CRUD 작업 후 호출
function addTodo() {
  // ... 기존 코드 ...
  saveTodosToStorage();  // 추가
}

function deleteTodo(id) {
  // ... 기존 코드 ...
  saveTodosToStorage();  // 추가
}

function toggleTodo(id) {
  // ... 기존 코드 ...
  saveTodosToStorage();  // 추가
}

function saveTodo(id) {
  // ... 기존 코드 ...
  saveTodosToStorage();  // 추가
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  loadTodosFromStorage();  // 추가
  // ... 나머지 코드 ...
});
```

### 검증 기준
- [ ] 다크 모드 토글 버튼이 정상 작동
- [ ] 다크 모드 색상이 눈에 편함
- [ ] 다크 모드 선택이 localStorage에 저장됨
- [ ] 할 일 수정 기능 정상 작동
- [ ] 페이지 새로고침 후 데이터 유지됨

---

## ✨ STEP 5: 최종 완성 및 최적화 (1시간)

## ✨ STEP 5: 최종 완성 및 최적화 (1시간)

### 목표
전체 기능 통합 테스트, 최적화, 문서화

### 프롬프트

최종 완성 및 최적화를 진행해주세요:

#### **5.1 기능 통합 테스트**

전체 기능 체크리스트:

**기능성:**
- [ ] 할 일 추가: 제목 입력 → 버튼 클릭 (또는 Enter) → 목록에 추가
- [ ] 할 일 삭제: 삭제 버튼 → 확인 → 제거
- [ ] 완료 체크: 체크박스 → 취소선 표시 및 통계 업데이트
- [ ] 할 일 수정: 수정 버튼 → 인라인 편집 → 저장
- [ ] 카테고리 필터: 필터 버튼 → 해당 카테고리만 표시
- [ ] 다크 모드: 토글 버튼 → 테마 변경 → localStorage 저장

**UI/UX:**
- [ ] 모바일 (320px) 화면: 깔끔하고 터치 친화적
- [ ] 태블릿 (768px) 화면: 레이아웃 최적화
- [ ] 데스크톱 (1024px) 화면: 전체 시각
- [ ] 호버 효과: 버튼 시각적 피드백
- [ ] 트랜지션: 부드러운 애니메이션 (로딩 또는 버벅임 없음)

**성능:**
- [ ] 초기 로딩: 1초 이내
- [ ] 할 일 추가/삭제: 즉각적 반응
- [ ] 필터링: 지연 없음
- [ ] 콘솔 에러: 없음

**데이터 저장:**
- [ ] 새로고침 후 데이터 유지
- [ ] localStorage 초기화 후 빈 목록
- [ ] 카테고리 데이터 저장

#### **5.2 코드 최적화**

성능:
```javascript
// 이벤트 위임 적용 (선택)
document.getElementById('todoList').addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const id = parseInt(e.target.dataset.todoId);
    toggleTodo(id);
  }
});

// renderTodos에서 동적 이벤트 대신 위임 사용
```

코드 정리:
- [ ] console.log() 디버그 코드 제거
- [ ] 불필요한 주석 제거
- [ ] 함수명과 변수명 명확함
- [ ] 일관된 들여쓰기 (2 또는 4 스페이스)
- [ ] 세미콜론 일관성

#### **5.3 문서화**

README.md 작성:
```markdown
# 할 일 관리 앱

간단하고 효율적인 개인용 할 일 관리 웹 애플리케이션입니다.

## 기능
- 할 일 추가, 수정, 삭제
- 완료 체크 및 진행률 표시
- 카테고리별 분류 (업무/개인/공부)
- 다크 모드 지원
- 로컬스토리지 기반 데이터 저장

## 사용 방법
1. `index.html`을 브라우저에서 열기
2. 할 일 제목 입력 → 카테고리 선택 → 추가 버튼 클릭
3. 완료하면 체크박스 클릭
4. 필요 시 수정 또는 삭제

## 파일 구조
```
project/
├── index.html       # 메인 HTML
├── styles.css       # 스타일시트
├── script.js        # 자바스크립트
├── README.md        # 문서
└── PRD_TODO_APP.md  # 요구사항
```

## 기술 스택
- HTML5
- CSS3 (Flexbox, Grid, 변수)
- Vanilla JavaScript (ES6+)
- localStorage

## 브라우저 호환성
- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
```

#### **5.4 최종 체크리스트**

배포 준비:
- [ ] 모든 파일이 study-02 폴더에 있음
- [ ] index.html에서 CSS/JS 상대 경로 확인
- [ ] 외부 라이브러리 없음 (Vanilla JS)
- [ ] 이미지/폰트 없음 (필요 시 추가)
- [ ] 모든 기능이 정상 작동

최종 테스트:
- [ ] Chrome DevTools Lighthouse 성능 점수 확인
- [ ] 모바일 DevTools에서 반응형 테스트
- [ ] 다양한 숫자의 할 일로 테스트 (0개, 1개, 20개)
- [ ] 각 카테고리에 할 일 추가 후 필터링 테스트

문서화:
- [ ] README.md 완성
- [ ] PRD_TODO_APP.md 확인
- [ ] IMPLEMENTATION_GUIDE.md (본 문서) 확인
- [ ] 코드 주석 (필요한 부분만)

#### **5.5 추가 개선 사항 (선택)**

- 할 일 드래그 정렬
- 우선순위 기능
- 마감 날짜 기능
- 검색 기능
- 데이터 내보내기/가져오기
- 키보드 단축키
- 애니메이션 효과 강화

### 검증 기준
- [ ] 모든 기능이 에러 없이 작동
- [ ] 성능이 양호 (로딩 1초 이내, 즉각적 반응)
- [ ] UI가 일관되고 깔끔함
- [ ] 모바일부터 데스크톱까지 반응형
- [ ] 코드가 깔끔하고 유지보수 가능

---

## 📋 전체 개발 체크리스트

| 단계 | 내용 | 예상 시간 | 상태 |
|------|------|----------|------|
| **STEP 1** | 기본 구조 + CRUD 기능 | 2시간 | ⬜ |
| **STEP 2** | 카테고리 + 필터링 | 1.5시간 | ⬜ |
| **STEP 3** | 진행률 대시보드 | 1시간 | ⬜ |
| **STEP 4** | 다크 모드 + 고급 기능 | 1.5시간 | ⬜ |
| **STEP 5** | 최종 완성 + 최적화 | 1시간 | ⬜ |
| **합계** | | **7-7.5시간** | |

---

## 🎯 파일 최종 구조

```
study-02/
├── index.html              # HTML 마크업
├── styles.css              # CSS 스타일
├── script.js               # JavaScript 로직
├── README.md               # 사용 설명서
├── PRD_TODO_APP.md         # 요구사항 문서
└── IMPLEMENTATION_GUIDE.md # 구현 가이드 (본 문서)
```

---

**작성일**: 2026년 3월 24일  
**버전**: 2.0  
**상태**: 진화적 개발 가이드
