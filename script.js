// 음악 설정
const bgm = document.getElementById("bgm");
const BGM_TYPES = {
  NORMAL: "assets/bgm_normal.mp3",
  TENSE: "assets/bgm_tense.mp3"
};

// 시나리오 데이터 (2024년 실제 사례 반영)
const scenario = [
  {
    role: "chatbot",
    name: "지훈 (전 남자친구)",
    text: "미영아, 오랜만이야. 갑자기 연락해서 미안한데... 어제 옛날 사진들 정리하다가 우리 같이 찍은 사진이 나오더라.",
    bgm: BGM_TYPES.NORMAL
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "근데 말이야... 네 원본 사진 몇 장만 보내줄 수 있을까? 추억으로 간직하고 싶어서.",
    bgm: BGM_TYPES.NORMAL
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "(다음 날) 미영아 이거 봐... 네 사진으로 AI 영상 만들어봤어. 정말 잘 나왔어. [18금 영상 링크]",
    bgm: BGM_TYPES.TENSE,
    effect: "emergency"
  },
  {
    role: "chatbot",
    name: "지훈",
    text: "이 영상을 유포하지 않게 하고 싶으면 500만원 보내줘. 24시간 안에 답 없으면 모든 SNS에 올릴 거야.",
    bgm: BGM_TYPES.TENSE
  },
  {
    role: "chatbot",
    name: "시스템",
    text: "⚠️ 현재 피해자와 유사한 사례(2024년 서울 서초구 발생)에서 가해자는 10명 추가 피해자를 대상으로 같은 수법을 사용하다 검거되었습니다.",
    bgm: BGM_TYPES.TENSE
  },
  {
    role: "chatbot",
    name: "시스템",
    text: "어떻게 대응하시겠습니까?",
    options: [
      "1. 즉시 사이버수사대 신고 (112 또는 https://ecrm.police.go.kr)",
      "2. 가족/친구에게 도움 요청",
      "3. 돈을 줄 테니 삭제해달라고 요구"
    ],
    bgm: BGM_TYPES.TENSE
  }
];

// 엔딩 메시지 (실제 대처법 반영)
const endings = {
  "1": "🚨 신고 후 수사기관이 가해자의 디지털 장치를 압수조사해 추가 피해 방지. 가해자는 형법 제35조(명예훼손)로 처벌받음.",
  "2": "💡 가족과 함께 법률지원센터(1366)에 연락해 영상 삭제 및 형사고소 진행. 피해자 지원 프로그램을 통해 심리상담 받음.",
  "3": "💸 가해자는 돈을 받은 후에도 영상을 삭제하지 않고 추가 금품을 요구. 결국 3차 피해 발생 후에서야 신고함."
};

// 음악 전환 함수
function changeBGM(type) {
  bgm.src = type;
  bgm.volume = 0.3;
  bgm.play().catch(e => console.log("BGM 자동재생 차단됨: 사용자 인터렉션 필요"));
}

// 메시지 효과 추가
function addMessage(role, name, text, effect = "") {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${role} ${effect}`;
  messageDiv.innerHTML = `<strong>${name}</strong>: ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  if (role === "chatbot") {
    speak(text);
    if (effect) chatBox.lastElementChild.classList.add(effect);
  }
}

// (기타 함수는 이전과 유사하게 유지)

// 초기 실행 시 배경음악 설정
window.onload = () => {
  changeBGM(scenario[0].bgm);
  showScenario(0);
};

// 휴대폰 진동 효과 (사용자 동의 필요)
function vibrate() {
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
}