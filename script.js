/**
 * [시스템 초기화]
 * DOM 로드 완료 후 실행되는 초기 설정
 */
function init() {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  /** [상태 관리 변수]
   * - currentStage: 현재 진행 중인 시나리오 단계
   * - isProcessing: 중복 전송 방지 플래그 */
  let currentStage = 0;
  let isProcessing = false;

  /** [시나리오 데이터]
   * 역할(role), 메시지(text), 옵션(options)으로 구성 */
  const scenario = [
    {
      role: 'chatbot',
      text: '안녕하세요! 딥페이크 피해 시뮬레이션을 시작합니다.',
    },
    // ... 기존 시나리오 데이터 ...
  ];

  /**
   * [메시지 추가 함수]
   * @param {string} role - 'user' 또는 'chatbot'
   * @param {string} text - 표시할 메시지
   */
  function addMessage(role, text) {
    try {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${role}`;
      msgDiv.textContent = text;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.error('메시지 추가 오류:', error);
    }
  }

  /**
   * [메시지 전송 핸들러]
   * 사용자 입력 처리 및 다음 단계 진행
   */
  function handleSend() {
    if (isProcessing) return;
    
    const inputText = userInput.value.trim();
    if (!inputText) {
      userInput.focus();
      return;
    }

    isProcessing = true;
    addMessage('user', inputText);
    userInput.value = '';

    setTimeout(() => {
      try {
        if (currentStage < scenario.length) {
          addMessage('chatbot', scenario[currentStage].text);
          currentStage++;
        } else {
          addMessage('system', '시뮬레이션이 종료되었습니다.');
        }
      } catch (error) {
        console.error('시나리오 진행 오류:', error);
      } finally {
        isProcessing = false;
      }
    }, 500);
  }

  // 이벤트 리스너 등록
  sendBtn.addEventListener('click', handleSend);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // 초기 메시지 출력
  addMessage('chatbot', scenario[0].text);
  currentStage = 1;
}

// DOM 완전 로드 후 실행
document.addEventListener('DOMContentLoaded', init);