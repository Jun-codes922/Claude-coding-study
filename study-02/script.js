// ============================================
// 전역 데이터
// ============================================
let todos = [];
let currentFilter = 'all'; // 필터 상태: 'all', 'work', 'personal', 'study'

// ============================================
// localStorage 저장 및 로드
// ============================================

/**
 * 할 일 목록을 localStorage에 저장
 */
function saveTodosToStorage() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
  }
}

/**
 * localStorage에서 할 일 목록 로드
 */
function loadTodosFromStorage() {
  try {
    const saved = localStorage.getItem('todos');
    if (saved) {
      todos = JSON.parse(saved);
    } else {
      todos = [];
    }
  } catch (error) {
    console.error('localStorage 로드 실패:', error);
    todos = [];
  }
}

// ============================================
// 할 일 관리 함수
// ============================================

/**
 * 새로운 할 일 추가
 */
function addTodo() {
  const input = document.getElementById('todoInput');
  const categorySelect = document.getElementById('categorySelect');
  const title = input.value.trim();
  const category = categorySelect.value;

  if (!title) {
    alert('할 일을 입력하세요!');
    input.focus();
    return;
  }

  const todo = {
    id: Date.now(),
    title: title,
    category: category,
    completed: false
  };

  todos.push(todo);
  input.value = '';
  input.focus();

  saveTodosToStorage();
  renderTodos();
}

/**
 * 할 일 완료 상태 토글
 * @param {number} id - 할 일 ID
 */
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodosToStorage();
    renderTodos();
  }
}

/**
 * 할 일 삭제
 * @param {number} id - 할 일 ID
 */
function deleteTodo(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    todos = todos.filter(t => t.id !== id);
    saveTodosToStorage();
    renderTodos();
  }
}

// ============================================
// UI 렌더링
// ============================================

/**
 * 현재 필터에 맞는 할 일 목록 반환
 * @returns {Array} 필터링된 할 일 배열
 */
function getFilteredTodos() {
  if (currentFilter === 'all') {
    return todos;
  }
  return todos.filter(todo => todo.category === currentFilter);
}

/**
 * 카테고리를 한글로 변환
 * @param {string} category - 카테고리 코드
 * @returns {string} 한글 카테고리명
 */
function getCategoryLabel(category) {
  const labels = {
    'work': '업무',
    'personal': '개인',
    'study': '공부'
  };
  return labels[category] || category;
}

/**
 * 할 일 목록을 DOM에 렌더링
 */
function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  const filtered = getFilteredTodos();

  if (filtered.length === 0) {
    list.innerHTML = '<li class="empty-state">아직 할 일이 없습니다. 첫 번째 할 일을 추가해보세요!</li>';
    return;
  }

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <input 
        type="checkbox" 
        class="todo-checkbox"
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <span class="category-badge ${todo.category}">${getCategoryLabel(todo.category)}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
    `;

    list.appendChild(li);
  });
}

// ============================================
// 유틸리티 함수
// ============================================

/**
 * HTML 특수문자 이스케이프 (XSS 방지)
 * @param {string} text - 변환할 텍스트
 * @returns {string} 이스케이프된 텍스트
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// 초기화 및 이벤트 리스너
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // localStorage에서 저장된 데이터 로드
  loadTodosFromStorage();

  // 초기 렌더링
  renderTodos();

  // 버튼 클릭 이벤트
  const addBtn = document.getElementById('addBtn');
  addBtn.addEventListener('click', addTodo);

  // 입력 필드 Enter 키 이벤트
  const todoInput = document.getElementById('todoInput');
  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  // 필터 버튼 이벤트
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // 활성 상태 변경
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // 필터 값 업데이트 및 리렌더링
      currentFilter = e.target.getAttribute('data-filter');
      renderTodos();
    });
  });

  // 포커스
  todoInput.focus();
});
