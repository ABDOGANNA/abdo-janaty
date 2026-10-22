// ملاحظة: كلمة المرور هنا للتجربة فقط وليست حماية حقيقية للموقع.
const PASSWORD = "298";
// تاريخ الارتباط: 29 أغسطس 2025. غيّر الساعة إذا كنت تتذكر وقتًا محددًا.
const startDate = new Date(2026, 7, 29, 0, 0, 0);

const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error");
const loginCard = document.getElementById("loginCard");
const loveCard = document.getElementById("loveCard");
const loveAudio = document.getElementById("loveAudio");
const musicButton = document.getElementById("musicButton");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value === PASSWORD) {
    loginCard.classList.add("hidden");
    loveCard.classList.remove("hidden");
    errorMessage.textContent = "";
    updateTimer();
    if (loveAudio) {
      loveAudio.volume = 0.45;
      loveAudio.play().then(() => {
        if (musicButton) musicButton.textContent = "⏸ إيقاف الصوت";
      }).catch(() => {
        if (musicButton) musicButton.textContent = "▶ دوس هنا لتشغيل الصوت";
      });
    }
  } else {
    errorMessage.textContent = "الباسورد مش صح، جرّب تاني يا حبيبي 💗";
    passwordInput.select();
  }
});

if (musicButton && loveAudio) {
  musicButton.addEventListener("click", async () => {
    if (loveAudio.paused) {
      try {
        await loveAudio.play();
        musicButton.textContent = "⏸ إيقاف الصوت";
      } catch {
        musicButton.textContent = "الصوت مش جاهز — أضف ملف الأغنية";
      }
    } else {
      loveAudio.pause();
      musicButton.textContent = "▶ تشغيل الصوت";
    }
  });
}

document.getElementById("lockButton").addEventListener("click", () => {
  if (loveAudio) {
    loveAudio.pause();
    loveAudio.currentTime = 0;
    if (musicButton) musicButton.textContent = "▶ تشغيل الصوت";
  }
  loveCard.classList.add("hidden");
  loginCard.classList.remove("hidden");
  passwordInput.value = "";
  passwordInput.focus();
});

function updateTimer() {
  const now = new Date();
  let diff = Math.max(0, now.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateTimer();
setInterval(updateTimer, 1000);

// قلوب وردية عائمة بالخلفية
const hearts = document.getElementById("hearts");
const symbols = ["♥", "♡", "❤"];
function addHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  const duration = 7 + Math.random() * 8;
  heart.style.animationDuration = `${duration}s`;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
for (let i = 0; i < 18; i++) {
  setTimeout(addHeart, i * 250);
}
setInterval(addHeart, 650);
