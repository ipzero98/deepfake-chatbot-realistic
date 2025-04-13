// DOM 요소
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const bgm = document.getElementById("bgm");
const alertSound = document.getElementById("alert-sound");

// 상태 관리
let currentStage = 0;
let isEnding = false;

// 음악 설정
const sounds = {
  normal: "assets/bgm_normal.mp3",
  tense: "assets/bgm_tense.mp3",
  alert: "assets/alert.mp3"
};

// 실제 사례 기반 시나리오
const scenario = [
  {
    role: "chatbot",
    name: "지훈 (전 남친)",
    text: "미영아, 오랜만이야. 어제 옛날 사진 정리하다가 우리 사진 발견했어.",
    bgm: "normal"
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "원본 사진 몇 장만 보내줄 수 있을까? 추억으로 간직하고 싶어서야.",
    bgm: "normal"
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "[파일 첨부] 이거 봐. 네 사진으로 AI가 만든 영상이야. 정말 리얼하지?",
    bgm: "tense",
    effect: true
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "이 영상이 유포되지 않게 하고 싶으면 500만원을 보내줘. 24시간만 준다.",
    bgm: "tense"
  },
  {
    role: "chatbot",
    name: "시스템",
    text: "⚠️ 주의: 실제 2024년 발생한 사례와 유사합니다. 가해자는 3명에게 동일한 수법을 사용했습니다.",
    bgm: "tense"
  },
  {
    role: "chatbot",
    name: "시스템",
    text: "어떻게 하시겠습니까?",
    options: [
      "1. 즉시 사이버수사대 신고 (112)",
      "2. 1366 여성긴급전화 연락",
      "3. 지훈에게 직접 삭제 요구"
    ],
    bgm: "tense"
  }
];

// 엔딩 (실제 법률 정보 반영)
const endings = {
  "1": "✅ 신고 후 수사기관이 가해자의 디지털 증거 확보. 형법 제30조(협박) 적용되어 3년 징역.",
  "2": "💡 전문상담원이 영상 삭제 및 법적 대응 지원. 무료 법률지원 받음.",
  "3": "❌ 가해자는 돈을 요구했고, 결국 영상이 유포됨. 2차 피해 발생."
};

// 음악 재생
function playSound(type) {
  if (type === "alert") {
    alertSound.src = sounds.alert;
    alertSound.play();
  } else {
    bgm.src = sounds[type];
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("음악 자동재생 차단됨"));
  }
}

// 메시지 출력
function addMessage(role, name, text, isEmergency = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${role} ${isEmergency ? "emergency" : ""}`;
  msgDiv.innerHTML = `<strong>${name}</strong>: ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (role === "chatbot") {
    speak(text);
    if (isEmergency) playSound("alert");
  }
}

// TTS 기능
function speak(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text.replace(/\[.*?\]/g, "");
    utterance.lang = "ko-KR";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// 시나리오 진행
function nextStep() {
  if (currentStage >= scenario.length) return;

  const step = scenario[currentStage];
  addMessage(step.role, step.name, step.text, step.effect);
  playSound(step.bgm);

  if (step.options) {
    addMessage("system", "시스템", step.options.join("<br>"));
  }
}

// 사용자 입력 처리
function handleUserInput() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("user", "나", input);
  userInput.value = "";

  setTimeout(() => {
    if (!isEnding) {
      if (currentStage < scenario.length - 1) {
        currentStage++;
        nextStep();
      } else {
        processEnding(input);
      }
    }
  }, 800);
}

// 엔딩 처리
function processEnding(choice) {
  isEnding = true;
  const result = endings[choice[0]] || "❌ 잘못된 선택입니다. 1, 2, 3 중 입력해주세요.";
  addMessage("system", "결과", result);

  setTimeout(() => {
    addMessage("system", "시스템", "<button onclick='resetChat()'>🔄 시뮬레이션 다시 시작</button>");
  }, 1500);
}

// 초기화
function resetChat() {
  chatBox.innerHTML = "";
  currentStage = 0;
  isEnding = false;
  nextStep();
}

// 이벤트 리스너
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// 음악 재생을 위한 사용자 인터랙션 요구
document.body.addEventListener("click", () => {
  bgm.play().catch(e => console.log("사용자 클릭 후 음악 재생"));
}, { once: true });

// 시작
nextStep();