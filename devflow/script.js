let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let switches = 0;
let sessions = JSON.parse(localStorage.getItem('devflow-sessions')) || [];

const timerDisplay = document.getElementById('timer');
const switchesDisplay = document.getElementById('switches');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const switchBtn = document.getElementById('switch-btn');
const labelInput = document.getElementById('session-label');
const warning = document.getElementById('warning');
const summary = document.getElementById('summary');
const weeklySummary = document.getElementById('weekly-summary');

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);
    checkBurnout();
}

function startTimer() {
    if (!isRunning && labelInput.value.trim()) {
        startTime = Date.now() - (elapsedTime * 1000);
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        switchBtn.disabled = false;
        warning.textContent = '';
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        switchBtn.disabled = true;

        const session = {
            date: new Date().toISOString().split('T')[0],
            label: labelInput.value.trim(),
            duration: elapsedTime,
            switches: switches
        };
        sessions.push(session);
        localStorage.setItem('devflow-sessions', JSON.stringify(sessions));

        resetTracker();
        updateDashboard();
        updateWeeklyReport();  
    }
}

function switchTask() {
    if (isRunning) {
        switches++;
        switchesDisplay.textContent = `Task Switches: ${switches}`;
        checkBurnout();
    }
}

function checkBurnout() {
    const focusHours = elapsedTime / 3600;
    if (focusHours > 2 || switches > 5) {
        warning.textContent = '⚠️ High cognitive load detected. Consider taking a break.';
    } else {
        warning.textContent = '';
    }
}

function resetTracker() {
    elapsedTime = 0;
    switches = 0;
    timerDisplay.textContent = '00:00:00';
    switchesDisplay.textContent = 'Task Switches: 0';
    labelInput.value = '';
}

function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(s => s.date === today);

    let totalFocus = 0;
    let totalSwitches = 0;
    todaySessions.forEach(s => {
        totalFocus += s.duration;
        totalSwitches += s.switches;
    });

    const formattedFocus = formatTime(totalFocus);
    const productivityScore = Math.max(0, Math.min(100, 100 - (totalSwitches * 5)));

    let summaryHTML = `
        <div class="summary-item">
            <p>Total Focus Time:</p>
            <p>${formattedFocus}</p>
        </div>
        <div class="summary-item">
            <p>Total Task Switches:</p>
            <p>${totalSwitches}</p>
        </div>
        <div class="summary-item">
            <p>Productivity Score:</p>
            <p>${productivityScore}/100</p>
            <div class="summary-progress"><div class="summary-fill" style="width: ${productivityScore}%"></div></div>
        </div>
    `;

    if (totalFocus / 3600 > 8 || totalSwitches > 20) {
        summaryHTML += `<div class="warning summary-warning">⚠️ Daily burnout risk high. Take it easy!</div>`;
    }

    summary.innerHTML = summaryHTML;
}

function updateWeeklyReport() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);  
    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    const weeklySessions = sessions.filter(s => s.date >= startDate && s.date <= endDate);

    if (weeklySessions.length === 0) {
        weeklySummary.innerHTML = '<p>No data for the past week.</p>';
        return;
    }

    let totalFocus = 0;
    let totalSwitches = 0;
    let daysWithData = new Set(weeklySessions.map(s => s.date)).size;  

    weeklySessions.forEach(s => {
        totalFocus += s.duration;
        totalSwitches += s.switches;
    });

    const formattedTotalFocus = formatTime(totalFocus);
    const avgFocusPerDay = formatTime(Math.round(totalFocus / daysWithData));
    const avgSwitchesPerDay = Math.round(totalSwitches / daysWithData);
    const avgProductivity = Math.max(0, Math.min(100, 100 - (totalSwitches / weeklySessions.length * 5)));  // Avg per session

    let weeklyHTML = `
        <div class="weekly-item">
            <p>Total Focus Time (Past 7 Days):</p>
            <p>${formattedTotalFocus}</p>
        </div>
        <div class="weekly-item">
            <p>Average Focus Per Day:</p>
            <p>${avgFocusPerDay}</p>
        </div>
        <div class="weekly-item">
            <p>Total Task Switches:</p>
            <p>${totalSwitches}</p>
        </div>
        <div class="weekly-item">
            <p>Average Switches Per Day:</p>
            <p>${avgSwitchesPerDay}</p>
        </div>
        <div class="weekly-item">
            <p>Average Productivity Score:</p>
            <p>${Math.round(avgProductivity)}/100</p>
        </div>
    `;

    if (totalFocus / 3600 / 7 > 8) {  
        weeklyHTML += `<div class="warning">⚠️ High weekly focus—watch for burnout!</div>`;
    }

    weeklySummary.innerHTML = weeklyHTML;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
switchBtn.addEventListener('click', switchTask);

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const today = new Date().toISOString().split('T')[0];
        sessions = sessions.filter(s => s.date !== today);
        localStorage.setItem('devflow-sessions', JSON.stringify(sessions));
        updateDashboard();
        updateWeeklyReport();
    });
}

updateDashboard();
updateWeeklyReport();  