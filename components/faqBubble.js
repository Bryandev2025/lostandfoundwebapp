export function mountFaqBubble() {
  const container = document.createElement('div');
  container.id = 'faqBubbleContainer';
  document.body.appendChild(container);

  container.innerHTML = `
    <style>
      .faq-bubble-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--brand, #0071e3);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .faq-bubble-btn:hover {
        transform: scale(1.05) translateY(-2px);
      }
      .faq-bubble-btn svg {
        transition: transform 0.3s ease;
      }
      .faq-bubble-btn.open svg {
        transform: rotate(90deg) scale(0);
        opacity: 0;
      }
      .faq-bubble-btn.open .close-icon {
        transform: rotate(0) scale(1);
        opacity: 1;
      }
      .faq-bubble-btn .close-icon {
        position: absolute;
        transform: rotate(-90deg) scale(0);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      .faq-chat-window {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 350px;
        height: 500px;
        max-height: calc(100vh - 120px);
        background: var(--panel, #ffffff);
        border: 1px solid var(--border, rgba(0,0,0,0.1));
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        transform-origin: bottom right;
        overflow: hidden;
      }
      
      .faq-chat-window.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }

      [data-theme="dark"] .faq-chat-window {
        background: #1c1c1e;
        border-color: rgba(255,255,255,0.1);
      }

      .faq-chat-header {
        padding: 20px;
        background: var(--brand, #0071e3);
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .faq-chat-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      
      .faq-chat-header p {
        margin: 4px 0 0 0;
        font-size: 13px;
        opacity: 0.9;
      }

      .faq-chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: var(--bg, #f5f5f7);
      }

      [data-theme="dark"] .faq-chat-body {
        background: #000;
      }

      .chat-msg {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
        animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes chatSlideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .chat-msg.bot {
        background: var(--panel, #ffffff);
        color: var(--text, #1d1d1f);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      [data-theme="dark"] .chat-msg.bot {
        background: #2c2c2e;
      }

      .chat-msg.user {
        background: var(--brand, #0071e3);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .faq-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
      }

      .faq-option-btn {
        background: transparent;
        border: 1px solid var(--brand, #0071e3);
        color: var(--brand, #0071e3);
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
      }

      .faq-option-btn:hover {
        background: var(--brand, #0071e3);
        color: white;
      }

      .faq-chat-input-area {
        padding: 16px;
        background: var(--panel, #ffffff);
        border-top: 1px solid var(--border, rgba(0,0,0,0.1));
        display: flex;
        gap: 12px;
      }

      [data-theme="dark"] .faq-chat-input-area {
        background: #1c1c1e;
        border-color: rgba(255,255,255,0.1);
      }

      .faq-input {
        flex: 1;
        background: var(--bg, #f5f5f7);
        border: none;
        padding: 12px 16px;
        border-radius: 20px;
        font-size: 14px;
        color: var(--text, #1d1d1f);
        outline: none;
      }

      [data-theme="dark"] .faq-input {
        background: #2c2c2e;
      }

      .faq-send-btn {
        background: var(--brand, #0071e3);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .faq-send-btn:hover {
        transform: scale(1.05);
      }
      
      .faq-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      /* Typing indicator */
      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: var(--panel, #ffffff);
        border-radius: 18px;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        align-items: center;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        margin-bottom: 8px;
      }
      [data-theme="dark"] .typing-indicator {
        background: #2c2c2e;
      }
      .typing-dot {
        width: 6px;
        height: 6px;
        background: var(--text-muted, #86868b);
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out both;
      }
      .typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .typing-dot:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes typingBounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
    </style>

    <div class="faq-bubble-btn" id="faqBtn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="msg-icon" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="close-icon" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <div class="faq-chat-window" id="faqWindow">
      <div class="faq-chat-header">
        <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
            <path d="M12 12 2.1 7.1"></path>
            <path d="M12 12l9.9 4.9"></path>
          </svg>
        </div>
        <div>
          <h3>Lost & Found Support</h3>
          <p>We typically reply instantly</p>
        </div>
      </div>
      <div class="faq-chat-body" id="faqChatBody">
        <!-- Messages will be injected here -->
      </div>
      <div class="faq-chat-input-area">
        <input type="text" class="faq-input" id="faqInput" placeholder="Ask a question..." autocomplete="off">
        <button class="faq-send-btn" id="faqSendBtn" disabled>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  const faqBtn = container.querySelector('#faqBtn');
  const faqWindow = container.querySelector('#faqWindow');
  const faqChatBody = container.querySelector('#faqChatBody');
  const faqInput = container.querySelector('#faqInput');
  const faqSendBtn = container.querySelector('#faqSendBtn');

  let isOpen = false;
  let hasInitialized = false;

  const faqs = [
    {
      q: "How do I report a found item?",
      a: "To report a found item, click on '+ Report Item' in the top bar or go to the 'Report Items' tab. Fill in the details of the item, upload a clear photo, and submit."
    },
    {
      q: "How can I claim an item?",
      a: "If you recognize an item from the 'Browse Items' list, click on it and use the 'Claim this Item' button. You will need to provide proof of ownership (like a previous photo, receipt, or specific details)."
    },
    {
      q: "Where do I pick up my claimed item?",
      a: "Once your claim is approved by the staff, you can pick up your item at the main Student Affairs Office (SAO) during working hours. Show your approved claim status on your profile."
    },
    {
      q: "How long are items kept?",
      a: "Items are kept for 90 days. After that, they may be donated or discarded according to university policy."
    }
  ];

  const scrollToBottom = () => {
    faqChatBody.scrollTop = faqChatBody.scrollHeight;
  };

  const addMessage = (text, type, options = null) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${type}`;
    msgDiv.textContent = text;
    faqChatBody.appendChild(msgDiv);

    if (options && type === 'bot') {
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'faq-options';

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'faq-option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => handleUserSelection(opt);
        optionsContainer.appendChild(btn);
      });

      faqChatBody.appendChild(optionsContainer);
    }

    scrollToBottom();
  };

  const showTypingIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    faqChatBody.appendChild(indicator);
    scrollToBottom();
  };

  const hideTypingIndicator = () => {
    const indicator = container.querySelector('#typingIndicator');
    if (indicator) indicator.remove();
  };

  const initChat = () => {
    if (hasInitialized) return;

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      addMessage("Hi there! 👋 I'm the Lost & Found assistant.", 'bot');

      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          const options = faqs.map(f => ({ text: f.q, answer: f.a }));
          options.push({ text: "I have another question", answer: "For other inquiries, please visit the Student Affairs Office (SAO) physically or email support@university.edu" });

          addMessage("How can I help you today? You can choose a common question below or type your own.", 'bot', options);
        }, 1000);
      }, 500);

    }, 800);

    hasInitialized = true;
  };

  const handleUserSelection = (opt) => {
    // Disable all current option buttons
    const btns = faqChatBody.querySelectorAll('.faq-option-btn');
    btns.forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.5';
      b.style.cursor = 'default';
    });

    addMessage(opt.text, 'user');

    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addMessage(opt.answer, 'bot');

      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          addMessage("Is there anything else I can help with?", 'bot', [
            { text: "Yes, show FAQ options", action: 'show_options' },
            { text: "No, thank you", answer: "You're welcome! Have a great day. \uD83D\uDE0A" }
          ]);
        }, 800);
      }, 1000);

    }, 1200);
  };

  const handleRawInput = (text) => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    faqInput.value = '';
    updateSendBtnState();

    showTypingIndicator();

    // Simple fuzzy matching for answers
    setTimeout(() => {
      hideTypingIndicator();

      const lowerText = text.toLowerCase();
      let foundAnswer = null;

      if (lowerText.includes('report') || lowerText.includes('post')) {
        foundAnswer = faqs[0].answer;
      } else if (lowerText.includes('claim') || lowerText.includes('mine')) {
        foundAnswer = faqs[1].answer;
      } else if (lowerText.includes('where') || lowerText.includes('pick up') || lowerText.includes('location')) {
        foundAnswer = faqs[2].answer;
      } else if (lowerText.includes('how long') || lowerText.includes('time') || lowerText.includes('days')) {
        foundAnswer = faqs[3].answer;
      } else if (lowerText.includes('thank')) {
        foundAnswer = "You're welcome! Happy to help. \uD83D\uDE0A";
      } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
        foundAnswer = "Hello! How can I assist you today?";
      }

      if (foundAnswer) {
        addMessage(foundAnswer, 'bot');
      } else {
        addMessage("I'm not exactly sure about that. Our typical FAQ might help, or you can contact the SAO directly for specific issues.", 'bot', faqs.map(f => ({ text: f.q, answer: f.a })));
      }
    }, 1000);
  };

  faqBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      faqBtn.classList.add('open');
      faqWindow.classList.add('open');
      if (!hasInitialized) initChat();
      setTimeout(() => faqInput.focus(), 300);
    } else {
      faqBtn.classList.remove('open');
      faqWindow.classList.remove('open');
    }
  });

  const updateSendBtnState = () => {
    faqSendBtn.disabled = faqInput.value.trim() === '';
  };

  faqInput.addEventListener('input', updateSendBtnState);

  faqInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !faqSendBtn.disabled) {
      handleRawInput(faqInput.value);
    }
  });

  faqSendBtn.addEventListener('click', () => {
    handleRawInput(faqInput.value);
  });
}
