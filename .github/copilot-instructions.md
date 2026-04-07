# Vibe Coding - Copilot Instructions

**Workspace**: `c:\vibe-coding\`  
**Project**: Personal Todo Manager App  
**Status**: Development Phase (STEP 1-5)

## 🎯 Project Overview

**목표**: 10~20개 일일 할 일을 관리하는 순수 자바스크립트 웹 애플리케이션

**주요 특징**:
- ✅ Vanilla JavaScript (프레임워크 없음)
- ✅ localStorage 기반 영구 저장소
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크 모드 지원
- ✅ 5단계 진화적 개발 프로세스

**구조**:
```
study-02/
├── PRD_TODO_APP.md         # 요구사항 문서
├── IMPLEMENTATION_GUIDE.md # 단계별 구현 가이드
├── index.html              # (구현 예정)
├── styles.css              # (구현 예정)
└── script.js               # (구현 예정)
```

---

## 📋 개발 단계 (5 STEPS)

### **STEP 1: 기본 구조 + CRUD (2시간)**
- 핵심: 할 일 추가/삭제/완료 체크
- 파일: index.html, styles.css, script.js (기본)
- 체크: 입력 필드, 버튼, 목록 렌더링

### **STEP 2: 카테고리 + 필터링 (1.5시간)**
- 추가: 카테고리 선택(업무/개인/공부), 필터 버튼
- 기능: 카테고리별 필터링
- UI: 배지 색상, 필터 활성화 상태

### **STEP 3: 진행률 대시보드 (1시간)**
- 추가: 통계 카드 (전체/완료/남은 일)
- 추가: 진행률 바 (동적 너비)
- 자동: 할 일 변경 시 진행률 업데이트

### **STEP 4: 다크 모드 + 고급 기능 (1.5시간)**
- 추가: 다크 모드 토글 버튼
- 추가: 할 일 수정(인라인 편집)
- 기능: localStorage에 테마 저장

### **STEP 5: 최종 완성 + 최적화 (1시간)**
- 테스트: 모든 기능, 크로스 브라우저
- 최적화: 코드 정리, 성능 검증
- 문서: README.md 작성

---

## 🎨 설계 규칙

### **색상 팔레트** (CSS 변수)
```css
--primary: #007AFF      /* 주색상 (버튼, 강조) */
--success: #34C759      /* 완료 (체크, 진행률) */
--danger: #FF3B30       /* 삭제 */
--bg: #F5F5F5           /* 배경 */
--card-bg: #FFFFFF      /* 카드/항목 */
--text: #333333         /* 기본 텍스트 */
--text-light: #999999   /* 보조 텍스트 */
--border: #E0E0E0       /* 테두리 */
```

**다크 모드**: 위 변수들을 `body.dark-mode`에서 재정의

### **카테고리** (고정 3가지)
- **업무** → 파란색 배지 (#E3F2FD)
- **개인** → 주황색 배지 (#FFF3E0)
- **공부** → 자주색 배지 (#F3E5F5)

### **레이아웃 규칙**
- **컨테이너 최대 너비**: 800px
- **패딩/마진**: 16-20px 기본
- **테두리 반경**: 6-8px (버튼/카드)
- **Flexbox** 우선, Grid는 대시보드용

### **반응형 중단점**
```css
/* 모바일 우선: 320px 이상 */
/* 태블릿: 768px 이상 */
/* 데스크톱: 1024px 이상 */
```

---

## 🔧 기술 요구사항

### **언어/스택**
- **HTML5**: Semantic markup, viewport meta tag
- **CSS3**: Custom properties (변수), Flexbox, transition
- **JavaScript**: ES6+, 외부 라이브러리 ❌
- **저장소**: `localStorage` (JSON.stringify/parse)

### **파일명 규칙**
- 소문자 + 하이픈 또는 점 (snake_case X, kebab-case O)
- 예: `index.html`, `styles.css`, `script.js`

### **성능 목표**
- 초기 로딩: **1초 이내**
- CRUD 응답: **즉각적** (밀리초 단위)
- UI: **60fps 부드러움**

### **브라우저 호환성**
- Chrome, Firefox, Safari, Edge (최신 2버전)

---

## 📌 코딩 컨벤션

### **JavaScript**
```javascript
// ✅ 할 것
let todos = [];                              // 전역 저장소
function addTodo() { ... }                  // 영어 함수명
const todo = { id, title, category, ... }; // 명확한 구조

// ❌ 하지 말 것
var data;                                    // var 금지
function 할일추가() { ... }                   // 한글 함수명
todos = JSON.parse(JSON.stringify(...));    // 깊은 복사 불필요
```

### **CSS**
```css
/* ✅ 할 것 */
:root { --primary: #007AFF; }
.button-primary { background: var(--primary); }
transition: all 0.3s ease;

/* ❌ 하지 말 것 */
.btn_primary { ... }              /* 언더스코어 */
background: #007AFF;              /* 변수 미사용 */
!important 남발
```

### **HTML**
```html
<!-- ✅ 할 것 -->
<input type="text" id="todoInput" placeholder="...">
<button id="addBtn">추가</button>

<!-- ❌ 하지 말 것 -->
<input class="input-field">      <!-- ID 없이 이벤트 리스너 -->
<button onclick="addTodo()">     <!-- 인라인 이벤트 -->
```

---

## 🧪 테스트 체크리스트

각 STEP 완료 후:

- [ ] 콘솔 에러 없음
- [ ] 모바일(320px), 태블릿(768px), 데스크톱(1024px) 테스트
- [ ] localStorage 저장/로드 확인
- [ ] 모든 버튼 hover/click 테스트
- [ ] 완료 항목 취소선 + 색상 변화 확인

---

## 🚀 빠른 시작

### STEP 1 구현하기:
```bash
# 1. study-02 폴더 확인
cd c:\vibe-coding\study-02

# 2. IMPLEMENTATION_GUIDE.md의 STEP 1 프롬프트 따라 구현
# → index.html (마크업)
# → styles.css (기본 스타일)
# → script.js (CRUD 함수)

# 3. 브라우저에서 index.html 열기
# → 할 일 추가/삭제/완료 체크 동작 확인
```

### 가이드 문서:
- **PRD_TODO_APP.md**: 전체 요구사항
- **IMPLEMENTATION_GUIDE.md**: 단계별 상세 프롬프트 + 검증 기준

---

## 📂 파일 구조 (최종)

```
vibe-coding/
├── .github/
│   └── copilot-instructions.md    (이 파일)
└── study-02/
    ├── PRD_TODO_APP.md
    ├── IMPLEMENTATION_GUIDE.md
    ├── index.html                 ← STEP 1
    ├── styles.css                 ← STEP 2
    ├── script.js                  ← STEP 1~4
    └── README.md                  ← STEP 5
```

---

## 🔗 문서 링크

| 문서 | 용도 |
|------|------|
| **PRD_TODO_APP.md** | 전체 요구사항, 기능, 데이터 구조 |
| **IMPLEMENTATION_GUIDE.md** | 5단계 구현, 코드 예시, 검증 기준 |
| **README.md** | 사용자 가이드 (프로젝트 완료 후 작성) |

---

## ⚠️ 공통 실수 회피

1. **JavaScript 함수명 한글 사용** → 영어만 사용
2. **ID 없이 querySelector 사용** → 항상 ID 할당
3. **직접 HTML 수정** → `innerHTML` + `escapeHtml()` 필수
4. **localStorage 없이 테스트** → 새로고침 후 데이터 유지 확인
5. **반응형 테스트 스킵** → 모든 화면 크기에서 테스트

---

**작성일**: 2026년 3월 24일  
**버전**: 1.0  
**상태**: 개발 준비 완료
