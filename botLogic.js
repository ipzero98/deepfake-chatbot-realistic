const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let stage = 0;

const story = [
  { role: "chatbot", text: "안녕! 오늘 하루 어땠어?" },
  { role: "chatbot", text: "너 요즘 많이 힘들어 보이더라. 나랑 얘기해볼래?" },
  { role: "chatbot", text: "네 사진 진짜 잘 나왔더라~ 하나만 보내줄래?" },
  { role: "chatbot", text: "이거 봐, 네 얼굴로 영상 만들어봤어. 진짜 같지 않아?" },
  { role: "chatbot", text: "이미 단톡방에 뿌렸는데 반응 장난 아냐. 넌 날 못 막아." },
  { role: "chatbot", text: "이제 어떻게 할래? [신고하기 / 친구에게 말하기 / 혼자 감추기] 중에 골라줘." },
];

const endings = {
  "신고하기": "신고가 접수되었습니다. 수사에 착수합니다. 가해자는 결국 처벌받았습니다.",
  "친구에게 말하기": "친구가 함께해줬고, 전문가 도움을 받을 수 있었어요. 당신은 혼자가 아닙니다.",
  "혼자 감추기": "당신은 혼자 감당했고, 영상은 더 퍼졌습니다. 고립감이 커져만 갔습니다."
};

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", role);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  speak(text);
}

function sendMessage() {
  const input = userInput.value.trim();
  if (input === "") return;

  addMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    if (stage < story.length) {
      addMessage("chatbot", story[stage].text);
      stage++;
    } else {
      if (endings[input]) {
        addMessage("chatbot", endings[input]);
      } else {
        addMessage("chatbot", "선택지를 정확히 입력해주세요: 신고하기 / 친구에게 말하기 / 혼자 감추기");
      }
    }
  }, 800);
}

// 음성합성 (TTS)
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.pitch = 1;
  utter.rate = 1;
  speechSynthesis.speak(utter);
}

// 첫 메시지 자동 출력
window.onload = () => {
  addMessage("chatbot", story[0].text);
  stage = 1;
};

# 파일 저장
with open(os.path.join(project_dir, "index.html"), "w", encoding="utf-8") as f:
    f.write(html_code)

with open(os.path.join(project_dir, "style.css"), "w", encoding="utf-8") as f:
    f.write(css_code)

with open(os.path.join(project_dir, "script.js"), "w", encoding="utf-8") as f:
    f.write(js_code)

# 압축
zip_path = "/mnt/data/deepfake_chatbot_with_tts.zip"
with zipfile.ZipFile(zip_path, "w") as zipf:
    for root, _, files in os.walk(project_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, project_dir)
            zipf.write(file_path, arcname)

zip_path