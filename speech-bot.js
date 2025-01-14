function getRandomPause(min, max) {
  return Math.random() * (max - min) + min;
}

function speak(botName, text, minPause, maxPause) {
  return new Promise((resolve) => {
    const sentences = text.split(".");
    var index = 0;
    function speakSentence() {
      if (index < sentences.length) {
        const sentence = sentences[index].trim();
        if (sentence) {
          const utterance = new SpeechSynthesisUtterance(sentence);
          speechSynthesis.speak(utterance);

          utterance.onend = () => {
            const pause = getRandomPause(minPause, maxPause) * 1000;
            setTimeout(() => {
              index++;
              speakSentence();
            }, pause);
          };
        } else {
          index++;
          speakSentence();
        }
      } else {
        resolve();
      }
    }

    speakSentence();
  });
}

async function startBots() {
  const bot1Text = document.getElementById("bot1-text").value;
  const bot2Text = document.getElementById("bot2-text").value;
  const bot3Text = document.getElementById("bot3-text").value;

// default is 1 to 4 second pause
  const minPause1 = parseFloat(document.getElementById("min-pause1").value) || 1;
  const maxPause1 = parseFloat(document.getElementById("max-pause1").value) || 4;

  const minPause2 = parseFloat(document.getElementById("min-pause2").value) || 1;
  const maxPause2 = parseFloat(document.getElementById("max-pause2").value) || 4;

  const minPause3 = parseFloat(document.getElementById("min-pause3").value) || 1;
  const maxPause3 = parseFloat(document.getElementById("max-pause3").value) || 4;

  await speak("Bot 1", bot1Text, minPause1, maxPause1);
  await speak("Bot 2", bot2Text, minPause2, maxPause2);
  await speak("Bot 3", bot3Text, minPause3, maxPause3);
}
