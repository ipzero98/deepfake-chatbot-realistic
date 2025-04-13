// 시나리오 데이터
const scenario = [
  { role: "chatbot", text: "안녕하세요! 딥페이크 피해 시뮬레이션을 시작합니다." },
  { role: "chatbot", text: "가상의 상황이지만 현실감 있게 체험해주세요." },
  { role: "chatbot", text: "지금부터 가상의 시나리오가 시작됩니다..." },
  { role: "chatbot", text: "(전 남자친구): 미영아, 오랜만이야. 사진 하나 보내줄 수 있을까?" },
  { role: "chatbot", text: "어떻게 답하시겠습니까?", options: ["1. 사진 보내기", "2. 거절하기"] }
];

// 엔딩 데이터
const endings = {
  "1": "⚠️ 가해자가 사진을 악용해 딥페이크 영상 제작 후 협박했습니다.",
  "2": "✅ 안전하게 상황을 피했습니다. 경찰에 신고하는 것이 좋습니다."
};

// DOM 요소
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 상태 변수
let currentStep = 0;

// 메시지 출력 함수
function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = role;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 시나리오 진행
function nextStep() {
  if (currentStep < scenario.length) {
    const step = scenario[currentStep];
    addMessage(step.role, step.text);
    currentStep++;
  } else {
    addMessage("system", "시나리오가 종료되었습니다.");
  }
}

// 전송 처리
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  setTimeout(() => {
    if (currentStep >= scenario.length) {
      const result = endings[text[0]] || "잘못된 선택입니다.";
      addMessage("chatbot", result);
    } else {
      nextStep();
    }
  }, 500);
}

// 이벤트 리스너
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// 초기화
nextStep();