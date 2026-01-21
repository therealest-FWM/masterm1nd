# Password & Networks Level Enhancements - Implementation Summary

## ✅ COMPLETED: Password Level 1 - PIN Verification Layer

**File:** `PasswordL1.html`

**Changes Made:**
- Added `pinStage` variable to track current authentication stage
- Modified `checkPassword()` function to handle two stages:
  1. **Password Stage**: Validates "1205"
  2. **PIN Stage**: Validates "4444"

**Logic Flow:**
1. User enters password "1205" → Success message
2. After 1.5s delay:
   - Input field width reduced to 50%
   - Prompt changes to "Enter your PIN code"
   - Input maxlength set to 4
   - Hint box updated with: "1111<br>2222<br>3333"
3. User enters PIN "4444" → Level complete
4. Incorrect PIN → Lose life, retry same stage

**No Visual Changes:** Only text content and input behavior modified

---

## 🔄 READY TO IMPLEMENT: Password Level 2 - PIN Reuse Scenario

**File:** `PasswordL2.html`

**Required Changes:**
```javascript
// Add after line 744 (before checkPassword function)
var pinStage = false;

// Replace checkPassword function (lines 745-787) with:
function checkPassword() {
  var passwordInput = document.getElementById("passwordInput").value;
  var resultMessage = document.getElementById("resultMessage");
  var hintBox = document.getElementById("hintBox");

  if (!pinStage) {
    // Password stage
    if (passwordInput === "Jan3rd2005") {
      playSFX(SFX.correct);
      resultMessage.className = "result-message correct";
      resultMessage.textContent = "The password is correct";

      // Transition to PIN stage
      setTimeout(() => {
        pinStage = true;
        document.querySelector("h1:last-of-type").textContent = "Enter your PIN code";
        document.getElementById("passwordInput").value = "";
        document.getElementById("passwordInput").style.width = "50%";
        document.getElementById("passwordInput").setAttribute("maxlength", "4");
        resultMessage.textContent = "";
        
        // Update hint to indicate PIN reuse
        hintBox.textContent = "This user is known for reusing old passwords and PINs.";
      }, 1500);

    } else {
      if (livesRemaining <= 0) return;
      playSFX(SFX.wrong);
      livesRemaining--;
      resultMessage.className = "result-message incorrect";
      resultMessage.textContent = "The password is incorrect";

      document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining;

      if (livesRemaining === 3) {
        hintBox.textContent = "Remember that it follows the m/d/y and maybe it is capitalized";
        hintBox.classList.add("visible");
      }

      if (livesRemaining === 1) {
        hintBox.textContent = "It is similar to 2ndMar2002";
        hintBox.classList.add("visible");
      }

      if (livesRemaining === 0) {
        playSFX(SFX.gameOver);
        stopTimer();
        setTimeout(() => {
          window.location.href = "GameOverPassL2.html";
        }, 1200);
      }
    }
  } else {
    // PIN stage - Correct PIN is 1205 (reused from PasswordL1)
    if (passwordInput === "1205") {
      playSFX(SFX.correct);
      stopTimer();

      resultMessage.className = "result-message correct";
      resultMessage.textContent = "PIN verified";

      setTimeout(() => {
        window.location.href = "RecapPassL2.html";
      }, 1500);

    } else {
      if (livesRemaining <= 0) return;
      playSFX(SFX.wrong);
      livesRemaining--;

      resultMessage.className = "result-message incorrect";
      resultMessage.textContent = "Incorrect PIN";

      document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining;

      if (livesRemaining === 0) {
        playSFX(SFX.gameOver);
        stopTimer();
        setTimeout(() => {
          window.location.href = "GameOverPassL2.html";
        }, 1200);
      }
    }
  }
}
```

**Correct PIN:** `1205` (reused from Password Level 1 - demonstrates PIN reuse vulnerability)

**Hint Text:** "This user is known for reusing old passwords and PINs."

---

## 🔄 READY TO IMPLEMENT: Networks Level - 3-Round Typing QTE

**File:** `Networks.html`

**Current State:** Has existing typing QTE with 5 keys, 5-second timer per key

**Required Changes:**

### 1. Add Round System Variables
```javascript
// Add after existing QTE variables
var qteRound = 1;
var qteRoundTimers = [10000, 8000, 6000]; // Round 1: 10s, Round 2: 8s, Round 3: 6s
```

### 2. Modify `startQTE()` Function
```javascript
function startQTE() {
  document.getElementById('qte-overlay').classList.add('active');
  document.getElementById('qte-result').textContent = '';
  qteSequence = [];
  qteIndex = 0;
  qteRound = 1; // Reset to round 1

  // Generate 5 random keys
  for (let i = 0; i < 5; i++) {
    let key = qteKeys[Math.floor(Math.random() * qteKeys.length)];
    qteSequence.push(key);
    let keyElement = document.getElementById('key-' + i);
    keyElement.textContent = key;
    keyElement.classList.remove('active', 'pressed');
  }

  nextQteStep();
}
```

### 3. Modify `nextQteStep()` Function
```javascript
function nextQteStep() {
  if (qteIndex >= 5) {
    // Check if all rounds complete
    if (qteRound >= 3) {
      // All rounds complete - QTE Success
      playSFX(SFX.correct);
      document.getElementById('qte-result').textContent = 'BREACH SUCCESSFUL!';
      document.getElementById('qte-result').className = 'qte-result';
      setTimeout(() => {
        document.getElementById('qte-overlay').classList.remove('active');
        goToPage(3);
      }, 1500);
      return;
    } else {
      // Advance to next round
      qteRound++;
      qteIndex = 0;
      
      // Generate new sequence
      qteSequence = [];
      for (let i = 0; i < 5; i++) {
        let key = qteKeys[Math.floor(Math.random() * qteKeys.length)];
        qteSequence.push(key);
        let keyElement = document.getElementById('key-' + i);
        keyElement.textContent = key;
        keyElement.classList.remove('active', 'pressed');
      }
      
      // Show round transition message
      document.getElementById('qte-result').textContent = `ROUND ${qteRound} START!`;
      document.getElementById('qte-result').className = 'qte-result';
      setTimeout(() => {
        document.getElementById('qte-result').textContent = '';
        nextQteStep(); // Continue to first key of new round
      }, 800);
      return;
    }
  }

  // Highlight current key
  document.querySelectorAll('.qte-key').forEach(k => k.classList.remove('active'));
  document.getElementById('key-' + qteIndex).classList.add('active');

  // Reset timer bar
  var timerFill = document.getElementById('qte-timer-fill');
  var currentRoundTime = qteRoundTimers[qteRound - 1];
  timerFill.style.transition = 'none';
  timerFill.style.width = '100%';

  setTimeout(() => {
    timerFill.style.transition = `width ${currentRoundTime}ms linear`;
    timerFill.style.width = '0%';
  }, 10);

  // Start timer based on current round
  clearTimeout(qteTimer);
  qteTimer = setTimeout(() => {
    // Failed to press in time
    handleQteFail('TOO SLOW!');
  }, currentRoundTime);
}
```

### 4. Modify `handleQteFail()` Function
```javascript
function handleQteFail(reason) {
  clearTimeout(qteTimer);
  var resultDiv = document.getElementById('qte-result');
  resultDiv.textContent = reason + ' -1 Life';
  resultDiv.className = 'qte-result fail';

  if (loseLife()) {
    setTimeout(() => {
      // Restart from Round 1
      qteRound = 1;
      startQTE();
    }, 1500);
  }
}
```

**Round Timing:**
- Round 1: 10 seconds per key
- Round 2: 8 seconds per key
- Round 3: 6 seconds per key

**Failure Behavior:**
- Any failed key → Lose life, restart from Round 1
- Game over if no lives remain

**Success Behavior:**
- Complete all 3 rounds (15 keys total) → Proceed to next page

---

## 📋 Implementation Checklist

### Password Level 1
- [x] Add PIN verification stage
- [x] Update hint box with PIN attempts
- [x] Reduce input width on PIN stage
- [x] Correct PIN: 4444
- [x] Maintain all existing visuals

### Password Level 2
- [ ] Add PIN verification stage
- [ ] Update hint box with reuse warning
- [ ] Reduce input width on PIN stage
- [ ] Correct PIN: 1205 (reused)
- [ ] Maintain all existing visuals

### Networks Level
- [ ] Add 3-round system
- [ ] Implement round-specific timers (10s, 8s, 6s)
- [ ] Add round transition messages
- [ ] Reset to Round 1 on failure
- [ ] Maintain all existing visuals

---

## 🎯 Key Constraints Maintained

✅ **Zero Visual Changes** - All CSS untouched  
✅ **No New UI Elements** - Reusing existing inputs  
✅ **Text-Only Modifications** - Prompts and hints updated  
✅ **Logic Extensions** - Natural progression flow  
✅ **Sound Effects Preserved** - All existing SFX intact  
✅ **Difficulty Curve** - Progressive challenge increase  

---

## 🧪 Testing Notes

### Password Level 1
1. Enter correct password "1205"
2. Verify prompt changes to "Enter your PIN code"
3. Verify input width reduces
4. Verify hint shows "1111<br>2222<br>3333"
5. Enter incorrect PIN → Lose life
6. Enter correct PIN "4444" → Level complete

### Password Level 2
1. Enter correct password "Jan3rd2005"
2. Verify prompt changes to "Enter your PIN code"
3. Verify hint shows reuse warning
4. Enter incorrect PIN → Lose life
5. Enter correct PIN "1205" → Level complete

### Networks Level
1. Start QTE → Round 1 (10s per key)
2. Complete 5 keys → Round 2 starts (8s per key)
3. Complete 5 keys → Round 3 starts (6s per key)
4. Complete 5 keys → Breach successful
5. Fail any key → Restart from Round 1, lose life
