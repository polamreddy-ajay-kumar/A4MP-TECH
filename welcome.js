
(function () {
  var bear = document.getElementById('welcomeTeddy');
  var replay = document.getElementById('voiceReplay') || document.createElement('button');
  if (!bear || !replay) return;
  var line = 'Thank you for visiting A4MP TECH RIDE. We are delighted to have you here. Please enjoy exploring our website. Here is a bouquet for you!';
  function speak() {
    if (!('speechSynthesis' in window)) { replay.style.display = 'inline-flex'; return; }
    try {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      utterance.pitch = 1.12;
      utterance.onend = function () { replay.style.display = 'inline-flex'; };
      utterance.onerror = function () { replay.style.display = 'inline-flex'; };
      window.speechSynthesis.speak(utterance);
    } catch (e) { replay.style.display = 'inline-flex'; }
  }
  function start() {
    bear.classList.add('enter');
    setTimeout(function () { bear.classList.add('talk','gift'); speak(); }, 2100);
    setTimeout(function () {
      bear.classList.remove('gift');
      bear.classList.add('sit');
    }, 6100);
    setTimeout(function () {
      bear.classList.add('working');
      bear.classList.remove('talk');
    }, 7600);
  }
  replay.addEventListener('click', function () {
    if ('speechSynthesis' in window) {
      var u = new SpeechSynthesisUtterance(line);
      u.lang = 'en-US'; u.rate = 0.92; u.pitch = 1.12;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  });
  window.addEventListener('load', function () { setTimeout(start, 700); setTimeout(function(){ replay.style.display = 'inline-flex'; }, 9000); });
  // Mobile browsers may block speech until the visitor interacts; keep a replay control available.
  document.addEventListener('pointerdown', function unlockVoice() {
    speak();
    document.removeEventListener('pointerdown', unlockVoice);
  }, { once:true });
})();
