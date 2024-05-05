const songAssets = {
    "canonind": {
        title: "Canon in D",
        artist: "Johann Pachelbel",
        audioSrc: "./music_source/cannon/Cannon_in_D.mp3",
        pdfsrc: "./music_source/cannon/Cannon_in_D.pdf",
    },
    "carolofthebells": {
        title: "Carol of the Bells",
        artist: "William J. Rose",
        audioSrc: "./music_source/Carol_of_the_Bells/Carol_of_the_Bells.mp3",
        pdfsrc: "./music_source/Carol_of_the_Bells/Carol_of_the_Bells.pdf",
    },
    "funeralmarch": {
        title: "Sonate Op. 35 - Funeral March",
        artist: "Frederic Chopin",
        audioSrc: "./music_source/Chopin-Funeral_March/Chopin_-_Funeral_March.mp3",
        pdfsrc: "./music_source/Chopin-Funeral_March/Chopin_-_Funeral_March.pdf",
    },
    "sweden": {
        title: "Sweden",
        artist: "C418",
        audioSrc: "./music_source/Sweden_Minecraft/Sweden_Minecraft.mp3",
        pdfsrc: "./music_source/Sweden_Minecraft/Sweden_Minecraft.pdf",
    },
    "clocks": {
        title: "Clocks",
        artist: "Coldplay",
        audioSrc: "./music_source/Clocks–Coldplay/Clocks__Coldplay.mp3",
        pdfsrc: "./music_source/Clocks–Coldplay/Clocks__Coldplay.pdf",
    },
    "wethands": {
        title: "Wet Hands",
        artist: "C418",
        audioSrc: "./music_source/wet_hands_minecraft/Wet_Hands_Minecraft.mp3",
        pdfsrc: "./music_source/wet_hands_minecraft/Wet_Hands_Minecraft.pdf",
    },
};

const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const sidebar = document.querySelector(".sidebar");
const toggle1 = document.querySelector("#toggle1");
const toggle2 = document.querySelector("#toggle2");
const toggleIcon = document.querySelector(".center");
// const songTitle = document.querySelector("#song-title");

// have to fetch song title from url param due to gallery.js (and loading the title) after chatbot.js
// gallery.js loads after due to type=module (i.e. b/c it has to import pspdfkit.js)
const urlparams = new URLSearchParams(window.location.search);
const songId = urlparams.get('songId');
const songData = songAssets[songId];
const songTitle = songData.title;

let userMessage = null; // Variable to store user's message

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span>M</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = async (chatElement) => {
    const API_URL = "https://noggin.rea.gent/light-marsupial-7017";
    const messageElement = chatElement.querySelector("p");
    // console.log(userMessage);
    // console.log(songTitle);
    // console.log(songData);

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
        chatbox.scrollTo(0, chatbox.scrollHeight)
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea
    chatInput.value = "";

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}


chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// single toggle menu (can change back by comment/uncommenting if desired)
// toggle1.addEventListener("click", () => {
//     if (sidebar.style.display == 'none' || sidebar.style.display == '') {
//         sidebar.style.display = 'block';
//         toggleIcon.src = "/images/left-arrow.png";
//     } else {
//         sidebar.style.display = 'none';
//         toggleIcon.src = "/images/tribar.png";
//     }
// });

// Teresa's first implementation
toggle1.addEventListener("click", () => {
    // toggle1.style.display = 'none';
    sidebar.style.display = 'block';
});
toggle2.addEventListener("click", () => {
    toggle1.style.display = 'block';
    sidebar.style.display = 'none';
});