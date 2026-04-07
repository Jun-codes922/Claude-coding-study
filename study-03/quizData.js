// 퀴즈 데이터 (총 40문제)
const quizzes = [
  // ===== 한국사 (10개) =====
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
  {
    id: "ks_004",
    category: "korean",
    question: "임진왜란을 격퇴한 장군은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "이순신" },
      { id: "B", text: "김시민" },
      { id: "C", text: "강감찬" },
      { id: "D", text: "을지문덕" }
    ],
    correctAnswer: "A",
    explanation: "이순신 장군은 1592년 임진왜란 당시 해전에서 도요토미 히데요시의 도요요시 군을 격퇴했습니다.",
    hint: "영화 '명량'의 주인공입니다."
  },
  {
    id: "ks_005",
    category: "korean",
    question: "고대 삼국 중 가장 먼저 멸망한 국가는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "고구려" },
      { id: "B", text: "백제" },
      { id: "C", text: "신라" },
      { id: "D", text: "가야" }
    ],
    correctAnswer: "B",
    explanation: "백제는 660년에 멸망하였고, 고구려는 668년에 멸망했습니다.",
    hint: "660년에 멸망한 나라입니다."
  },
  {
    id: "ks_006",
    category: "korean",
    question: "조선왕조를 건국한 인물은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "세종대왕" },
      { id: "B", text: "이성계" },
      { id: "C", text: "정도전" },
      { id: "D", text: "이순신" }
    ],
    correctAnswer: "B",
    explanation: "이성계는 1392년 조선왕조를 건국하고 초대 임금이 되었습니다.",
    hint: "태조의 이름입니다."
  },
  {
    id: "ks_007",
    category: "korean",
    question: "갑오개혁이 일어난 연도는?",
    difficulty: "hard",
    options: [
      { id: "A", text: "1894년" },
      { id: "B", text: "1895년" },
      { id: "C", text: "1896년" },
      { id: "D", text: "1897년" }
    ],
    correctAnswer: "A",
    explanation: "갑오개혁은 1894년에 시작되었으며, 근대 개혁의 첫 단계였습니다.",
    hint: "갑오(甲午)는 60년 주기의 천간지지에서 특정 연도를 나타냅니다."
  },
  {
    id: "ks_008",
    category: "korean",
    question: "한국의 독립운동 중 3.1운동이 일어난 연도는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "1910년" },
      { id: "B", text: "1919년" },
      { id: "C", text: "1929년" },
      { id: "D", text: "1939년" }
    ],
    correctAnswer: "B",
    explanation: "3.1운동은 1919년 3월 1일에 일어난 대규모 독립운동입니다.",
    hint: "3월 1일이 기념일입니다."
  },
  {
    id: "ks_009",
    category: "korean",
    question: "한국 전쟁이 시작된 연도는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "1945년" },
      { id: "B", text: "1948년" },
      { id: "C", text: "1950년" },
      { id: "D", text: "1953년" }
    ],
    correctAnswer: "C",
    explanation: "한국 전쟁은 1950년 6월 25일에 시작되었습니다.",
    hint: "6.25 전쟁이라고도 불립니다."
  },
  {
    id: "ks_010",
    category: "korean",
    question: "고려를 건국한 인물은?",
    difficulty: "medium",
    options: [
      { id: "A", text: "윤관" },
      { id: "B", text: "왕건" },
      { id: "C", text: "서희" },
      { id: "D", text: "강감찬" }
    ],
    correctAnswer: "B",
    explanation: "왕건은 918년 고려를 건국하고 초대 왕이 되었습니다.",
    hint: "고려의 시조입니다."
  },

  // ===== 과학 (10개) =====
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
  {
    id: "sc_002",
    category: "science",
    question: "원자는 몇 개의 기본 입자로 구성되어 있는가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "2개 (양성자, 중성자)" },
      { id: "B", text: "3개 (양성자, 중성자, 전자)" },
      { id: "C", text: "4개" },
      { id: "D", text: "5개" }
    ],
    correctAnswer: "B",
    explanation: "원자는 양성자, 중성자(핵), 전자로 구성되어 있습니다.",
    hint: "전자의 발견자로 알려진 과학자가 있습니다."
  },
  {
    id: "sc_003",
    category: "science",
    question: "빛의 속도는 약 얼마인가?",
    difficulty: "medium",
    options: [
      { id: "A", text: "초속 100,000km" },
      { id: "B", text: "초속 150,000km" },
      { id: "C", text: "초속 300,000km" },
      { id: "D", text: "초속 500,000km" }
    ],
    correctAnswer: "C",
    explanation: "빛의 속도는 진공에서 약 초속 299,792km입니다.",
    hint: "3을 포함한 숫자입니다."
  },
  {
    id: "sc_004",
    category: "science",
    question: "인간의 DNA에 있는 염색체의 개수는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "23개" },
      { id: "B", text: "44개" },
      { id: "C", text: "46개" },
      { id: "D", text: "48개" }
    ],
    correctAnswer: "C",
    explanation: "인간은 46개의 염색체를 가지고 있으며, 이는 23쌍입니다.",
    hint: "23의 2배입니다."
  },
  {
    id: "sc_005",
    category: "science",
    question: "물의 끓는점은 섭씨 몇 도인가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "50도" },
      { id: "B", text: "75도" },
      { id: "C", text: "100도" },
      { id: "D", text: "120도" }
    ],
    correctAnswer: "C",
    explanation: "물은 표준 대기압에서 섭씨 100도에서 끈습니다.",
    hint: "백 도입니다."
  },
  {
    id: "sc_006",
    category: "science",
    question: "태양계의 행성 중 가장 큰 행성은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "토성" },
      { id: "B", text: "목성" },
      { id: "C", text: "천왕성" },
      { id: "D", text: "해왕성" }
    ],
    correctAnswer: "B",
    explanation: "목성은 태양계에서 가장 큰 행성입니다.",
    hint: "목(木)자가 붙은 별입니다."
  },
  {
    id: "sc_007",
    category: "science",
    question: "자석의 극은 어떻게 불리는가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "양극과 음극" },
      { id: "B", text: "알파극과 베타극" },
      { id: "C", text: "남극과 북극" },
      { id: "D", text: "양극과 북극" }
    ],
    correctAnswer: "C",
    explanation: "자석의 두 극은 남극(S)과 북극(N)이라고 불립니다.",
    hint: "지구의 극과 같은 이름입니다."
  },
  {
    id: "sc_008",
    category: "science",
    question: "인간의 신체에서 가장 강한 뼈는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "두개골" },
      { id: "B", text: "척추뼈" },
      { id: "C", text: "대퇴골" },
      { id: "D", text: "갈비뼈" }
    ],
    correctAnswer: "C",
    explanation: "대퇴골(허벅지 뼈)은 인체에서 가장 강하고 긴 뼈입니다.",
    hint: "다리의 뼈입니다."
  },
  {
    id: "sc_009",
    category: "science",
    question: "이산화탄소(CO2)의 분자식에서 원자의 개수는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "1개" },
      { id: "B", text: "2개" },
      { id: "C", text: "3개" },
      { id: "D", text: "4개" }
    ],
    correctAnswer: "C",
    explanation: "CO2는 탄소 1개와 산소 2개로 총 3개의 원자로 이루어져 있습니다.",
    hint: "C(탄소) 1개 + O(산소) 2개"
  },
  {
    id: "sc_010",
    category: "science",
    question: "인간이 숨을 쉴 때 들여마시는 가스는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "산소만" },
      { id: "B", text: "질소와 산소" },
      { id: "C", text: "질소, 산소, 이산화탄소" },
      { id: "D", text: "산소와 이산화탄소만" }
    ],
    correctAnswer: "C",
    explanation: "공기는 질소 약 78%, 산소 약 21%, 기타 기체(이산화탄소 등) 약 1%로 이루어져 있습니다.",
    hint: "공기의 주성분입니다."
  },

  // ===== 지리 (10개) =====
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
  {
    id: "gg_002",
    category: "geography",
    question: "한국은 총 몇 개의 특별시와 광역시로 이루어져 있는가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "6개" },
      { id: "B", text: "7개" },
      { id: "C", text: "8개" },
      { id: "D", text: "9개" }
    ],
    correctAnswer: "C",
    explanation: "서울, 부산, 대구, 인천, 광주, 대전, 울산 특별시와 세종시로 총 8개입니다.",
    hint: "수도인 서울은 특별시입니다."
  },
  {
    id: "gg_003",
    category: "geography",
    question: "아프리카의 가장 큰 나라는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "이집트" },
      { id: "B", text: "나이지리아" },
      { id: "C", text: "수단" },
      { id: "D", text: "탄자니아" }
    ],
    correctAnswer: "C",
    explanation: "수단은 약 2,505,810km²의 영토면적으로 아프리카 최대 국가입니다.",
    hint: "나일강이 흐르는 북쪽 나라입니다."
  },
  {
    id: "gg_004",
    category: "geography",
    question: "세계에서 가장 큰 호수는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "카스피해" },
      { id: "B", text: "수페리어호" },
      { id: "C", text: "빅토리아호" },
      { id: "D", text: "바이칼호" }
    ],
    correctAnswer: "A",
    explanation: "카스피해는 약 371,000km²의 면적으로 세계 최대 호수입니다.",
    hint: "러시아와 여러 중앙아시아 국가 사이에 위치합니다."
  },
  {
    id: "gg_005",
    category: "geography",
    question: "한국의 최남단은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "제주도" },
      { id: "B", text: "거문도" },
      { id: "C", text: "마라도" },
      { id: "D", text: "종로구" }
    ],
    correctAnswer: "C",
    explanation: "마라도는 제주도 남쪽에 위치한 대한민국의 최남단 지점입니다.",
    hint: "제주도 근처에 있습니다."
  },
  {
    id: "gg_006",
    category: "geography",
    question: "런던은 어느 나라의 수도인가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "스코틀랜드" },
      { id: "B", text: "영국" },
      { id: "C", text: "아일랜드" },
      { id: "D", text: "프랑스" }
    ],
    correctAnswer: "B",
    explanation: "런던은 영국(United Kingdom)의 수도이자 런던주의 주도입니다.",
    hint: "빅벤이 있는 도시입니다."
  },
  {
    id: "gg_007",
    category: "geography",
    question: "태평양과 대서양을 연결하는 운하는?",
    difficulty: "medium",
    options: [
      { id: "A", text: "수에즈 운하" },
      { id: "B", text: "파나마 운하" },
      { id: "C", text: "키엘운하" },
      { id: "D", text: "라인강" }
    ],
    correctAnswer: "B",
    explanation: "파나마 운하는 태평양과 대서양을 연결하는 중요한 국제 해상 운하입니다.",
    hint: "파나마에 위치합니다."
  },
  {
    id: "gg_008",
    category: "geography",
    question: "가장 추운 대륙은?",
    difficulty: "easy",
    options: [
      { id: "A", text: "북극" },
      { id: "B", text: "남극" },
      { id: "C", text: "아시아" },
      { id: "D", text: "유럽" }
    ],
    correctAnswer: "B",
    explanation: "남극 대륙은 지구에서 가장 추운 지역으로, 평균 기온이 -50도 이하입니다.",
    hint: "펭귄이 사는 대륙입니다."
  },
  {
    id: "gg_009",
    category: "geography",
    question: "동경 180도선을 뭐라고 부르는가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "적도" },
      { id: "B", text: "본초자오선" },
      { id: "C", text: "국제날짜변경선" },
      { id: "D", text: "회귀선" }
    ],
    correctAnswer: "C",
    explanation: "동경 180도선은 국제날짜변경선으로, 이 선을 기준으로 날짜가 바뀝니다.",
    hint: "날짜가 변하는 선입니다."
  },
  {
    id: "gg_010",
    category: "geography",
    question: "한국의 국토면적은 약 몇 제곱킬로미터인가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "약 50,000km²" },
      { id: "B", text: "약 100,000km²" },
      { id: "C", text: "약 150,000km²" },
      { id: "D", text: "약 200,000km²" }
    ],
    correctAnswer: "B",
    explanation: "한국의 국토면적은 남북한을 합쳐 약 223,600km²이고, 남한만 약 100,363km²입니다.",
    hint: "10만에 가까운 수치입니다."
  },

  // ===== 일반상식 (10개) =====
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
  {
    id: "gn_002",
    category: "general",
    question: "1년은 몇 개월로 이루어져 있는가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "10개월" },
      { id: "B", text: "11개월" },
      { id: "C", text: "12개월" },
      { id: "D", text: "13개월" }
    ],
    correctAnswer: "C",
    explanation: "지구가 태양 주위를 한 바퀴 도는 데 걸리는 시간이 1년이며, 이를 12개월로 나눕니다.",
    hint: "일년 열두 달인데..."
  },
  {
    id: "gn_003",
    category: "general",
    question: "국제 올림픽 위원회의 본부는 어디에 있는가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "파리" },
      { id: "B", text: "로마" },
      { id: "C", text: "취리히" },
      { id: "D", text: "스위스 로잔" }
    ],
    correctAnswer: "D",
    explanation: "국제 올림픽 위원회(IOC)의 본부는 스위스 로잔에 위치합니다.",
    hint: "스위스의 도시입니다."
  },
  {
    id: "gn_004",
    category: "general",
    question: "노벨상은 어느 나라에서 제정한 상인가?",
    difficulty: "medium",
    options: [
      { id: "A", text: "노르웨이" },
      { id: "B", text: "스웨덴" },
      { id: "C", text: "덴마크" },
      { id: "D", text: "핀란드" }
    ],
    correctAnswer: "B",
    explanation: "노벨상은 스웨덴의 화학자 알프레드 노벨의 유언에 따라 1901년부터 수여되고 있습니다.",
    hint: "스칸디나비아 반도의 국가입니다."
  },
  {
    id: "gn_005",
    category: "general",
    question: "영화 '타이타닉'에서 배가 가라앉은 연도는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "1910년" },
      { id: "B", text: "1912년" },
      { id: "C", text: "1914년" },
      { id: "D", text: "1916년" }
    ],
    correctAnswer: "B",
    explanation: "타이타닉호는 1912년 4월 15일 아이스버그와 충돌하여 침몰했습니다.",
    hint: "20세기 초입니다."
  },
  {
    id: "gn_006",
    category: "general",
    question: "세계에서 인구가 가장 많은 나라는?",
    difficulty: "easy",
    options: [
      { id: "A", text: "인도" },
      { id: "B", text: "중국" },
      { id: "C", text: "인도네시아" },
      { id: "D", text: "미국" }
    ],
    correctAnswer: "A",
    explanation: "인도는 2023년 기준 약 14억 2천만 명의 인구로 세계 최다 인구 국가입니다.",
    hint: "남아시아의 국가입니다."
  },
  {
    id: "gn_007",
    category: "general",
    question: "FIFA 월드컵은 몇 년마다 개최되는가?",
    difficulty: "easy",
    options: [
      { id: "A", text: "2년" },
      { id: "B", text: "3년" },
      { id: "C", text: "4년" },
      { id: "D", text: "5년" }
    ],
    correctAnswer: "C",
    explanation: "FIFA 월드컵은 4년마다 개최되는 국제 축구 대회입니다.",
    hint: "올림픽과 같은 주기입니다."
  },
  {
    id: "gn_008",
    category: "general",
    question: "인터넷을 발명한 사람은?",
    difficulty: "hard",
    options: [
      { id: "A", text: "스티브 잡스" },
      { id: "B", text: "빌 게이츠" },
      { id: "C", text: "팀 버너스리" },
      { id: "D", text: "톰 크루즈" }
    ],
    correctAnswer: "C",
    explanation: "팀 버너스리는 월드 와이드 웹(WWW)의 발명자이며, 인터넷 기술의 개발에 기여했습니다.",
    hint: "영국의 과학자입니다."
  },
  {
    id: "gn_009",
    category: "general",
    question: "유네스코 세계유산은 몇 개 나라가 함께 관리하는가?",
    difficulty: "hard",
    options: [
      { id: "A", text: "100개" },
      { id: "B", text: "150개" },
      { id: "C", text: "190개 이상" },
      { id: "D", text: "250개" }
    ],
    correctAnswer: "C",
    explanation: "유네스코 세계유산 협약에 약 190개 국가가 가입되어 있습니다.",
    hint: "거의 모든 국가가 참여합니다."
  },
  {
    id: "gn_010",
    category: "general",
    question: "한국의 국기인 태극기의 원은 무엇을 나타내는가?",
    difficulty: "medium",
    options: [
      { id: "A", text: "태양을 나타냄" },
      { id: "B", text: "음양의 조화를 나타냄" },
      { id: "C", text: "독립을 나타냄" },
      { id: "D", text: "전통을 나타냄" }
    ],
    correctAnswer: "B",
    explanation: "태극기의 빨간색과 파란색 원은 음양의 조화를 나타내며, 삼국통일 이후 한반도 통일의 염원을 담고 있습니다.",
    hint: "음과 양의 조화입니다."
  }
];
