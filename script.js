// DOM 요소 캐싱
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 챗봇 상태
let currentStage = 0;
const scenario = [
  { role: "chatbot", text: "안녕하세요! 딥페이크 피해 시뮬레이션을 시작합니다." },
  { role: "chatbot", text: "최근 발생한 실제 사례를 바탕으로 제작되었습니다." },
  { role: "chatbot", text: "가상의 상황이지만 현실감 있게 체험해주세요." }
];

// 메시지 추가 함수 (수정 버전)
function addMessage(role, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${role}`;
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 메시지 전송 함수 (핵심 수정 부분)
function sendMessage() {
  const inputText = userInput.value.trim();
  if (!inputText) return;

  addMessage("user", inputText);
  userInput.value = "";

  setTimeout(() => {
    if (currentStage < scenario.length) {
      addMessage("chatbot", scenario[currentStage].text);
      currentStage++;
    } else {
      addMessage("chatbot", "시뮬레이션이 종료되었습니다.");
    }
  }, 500);
}

// 이벤트 리스너 연결 (추가된 부분)
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// 초기 메시지 출력
window.onload = () => {
  addMessage("chatbot", scenario[0].text);
  currentStage = 1;
};