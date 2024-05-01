import React, { useState, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import imgs from '../../images/images.js';
import styles from '../../css/styles.module.css';
import main_styles from '../../css/main.module.css';

function SheetHeader({ songTitle, artist }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  var userMessage = null;
  var chatbox = useRef(null);

  const createChatLi = (message, class_name) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add(main_styles.chat, main_styles[class_name]);
    let chatContent = class_name === "outgoing" ? `<p></p>` : `<span>M</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
  }

  const generateResponse = async (chatElement) => {
    const API_URL = "https://noggin.rea.gent/light-marsupial-7017";
    const messageElement = chatElement.querySelector("p");

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_1nfna8g2bjgor5dd6615yz933s702qkk9sak_ngk',
        },
        body: JSON.stringify({
          "question": userMessage,
          "song": songTitle
        }),
      });
      const data = await response.text()
      messageElement.textContent = data.trim();
      console.log(messageElement.textContent);

    } catch (error) {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
    } finally {
      chatbox.current.scrollTo(0, chatbox.current.scrollHeight)
    }
  }

  const handleChat = () => {
    userMessage = input.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea
    setInput('');

    // Append the user's message to the chatbox
    chatbox.current.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.current.scrollTo(0, chatbox.current.scrollHeight);

    setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("...", "incoming");
      chatbox.current.appendChild(incomingChatLi);
      chatbox.current.scrollTo(0, chatbox.current.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  }

  return (
    <div class={styles.bodyCopy}>
      <Drawer open={open} onClose={() => { setOpen(false) }}>
        <div class={main_styles.sidebar}>
          <button class={main_styles.chatbot_toggler} id={main_styles['toggle2']}
            onClick={() => { setOpen(false) }}>
            <img class={main_styles.center} src={imgs.left_arrow} alt="Back Arrow" />
          </button>
          <div class={main_styles.info_text_box}>
            <div class={main_styles.info_text}>
            Have a question?
            </div>
            <div class={main_styles.info_text}>
            Ask our AI Chatbot Melody!
            </div>
          </div>

          <div class={main_styles.chatbot}>
            <header>
              <h2>Melody</h2>
            </header>
            <ul class={main_styles.chatbox} ref={chatbox}>
              <li class={`${main_styles.chat} ${main_styles.incoming}`}>
                <span>M</span>
                <p>Hi there 👋<br />How can I help you?</p>
              </li>
            </ul>
            <div class={main_styles.chat_input}
              onKeyDown={(e) => {
                // If Enter key is pressed without Shift key and the window 
                // width is greater than 800px, handle the chat
                if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
                  e.preventDefault();
                  handleChat();
                }
              }}>
              <textarea placeholder="Enter a message..." spellcheck="false" required
                onInput={(e) => {
                  setInput(e.target.value);
                }}></textarea>
              <span id="send-btn" onClick={handleChat}>send</span>
            </div>
          </div>
        </div>
      </Drawer>
      <header>
        <div class={styles.header_left}>
          <button class={main_styles.chatbot_toggler}
            onClick={() => { setOpen(true) }}>
            <img class={main_styles.center} src={imgs.tribar} alt="Open sidebar" />
          </button>
          <a href="/library" style={{ marginTop: '7px', cursor: 'pointer' }}>
            <img src={imgs.logo_transparent} alt="musicmemo logo" />
          </a>

        </div>
        <div class={styles.header_center}>
          <div class={styles.song_and_artist}>
          <h2>{songTitle}</h2>
          <h3>{artist}</h3>
          </div>
        </div>
        <div class={styles.header_right}>
          <a href="/library" class={main_styles.nav_button}>Back to library</a>
        </div>
      </header>
    </div>
  )
}

export default SheetHeader;

