$(document).ready(function() {
    const startDate = new Date('2024-12-12'); // Adjusted start date
    const endDate = new Date('2025-01-12');
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Initialize workouts data
    const defaultWorkouts = {
        "2024-12-12": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2024-12-13": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2024-12-14": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2024-12-15": {"status": "not started", "url": "https://youtu.be/4rN1wn_l5-M?si=6f2g1Cy9r_VAqZDk"},
        "2024-12-16": {"status": "not started", "url": "https://youtu.be/6hOAGDbkLOw?si=_JCMP7Xs549K5fFt"},
        "2024-12-17": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"},
        "2024-12-18": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-19": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-20": {"status": "not started", "url": "https://youtu.be/6hOAGDbkLOw?si=_JCMP7Xs549K5fFt"},
        "2024-12-21": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2024-12-22": {"status": "not started", "url": "https://youtu.be/4rN1wn_l5-M?si=6f2g1Cy9r_VAqZDk"},
        "2024-12-23": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-24": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"},
        "2024-12-25": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-26": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-27": {"status": "not started", "url": "https://youtu.be/6hOAGDbkLOw?si=_JCMP7Xs549K5fFt"},
        "2024-12-28": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2024-12-29": {"status": "not started", "url": "https://youtu.be/4rN1wn_l5-M?si=6f2g1Cy9r_VAqZDk"},
        "2024-12-30": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2024-12-31": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"},
        "2025-01-01": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2025-01-02": {"status": "not started", "url": "https://youtu.be/6hOAGDbkLOw?si=_JCMP7Xs549K5fFt"},
        "2025-01-03": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2025-01-04": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"},
        "2025-01-05": {"status": "not started", "url": "https://youtu.be/Z_dgrjRlD_4?si=2J9YKB6J5m12YWeF"},
        "2025-01-06": {"status": "not started", "url": "https://youtu.be/4rN1wn_l5-M?si=6f2g1Cy9r_VAqZDk"},
        "2025-01-07": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2025-01-08": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"},
        "2025-01-09": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2025-01-10": {"status": "not started", "url": "https://youtu.be/6hOAGDbkLOw?si=_JCMP7Xs549K5fFt"},
        "2025-01-11": {"status": "not started", "url": "https://youtu.be/x33O9qGN_us?si=rNony2QuW0ULximR"},
        "2025-01-12": {"status": "not started", "url": "https://youtu.be/4yODhAdefv8?si=j7LzQ8pc7yGd3hBb"}
    };


    // Load workouts data from local storage or use default data
    let workouts = JSON.parse(localStorage.getItem('workouts')) || defaultWorkouts;

    function renderWorkout(dayStr, details, active, nextDay = false) {
        return `
            <div class="card workout-card ${active ? '' : 'inactive'}">
                <div class="card-body">
                    <h5 class="card-title">${dayStr} ${nextDay ? '(Next Day)' : ''}</h5>
                    <p class="card-text"><a href="${details.url}" target="_blank">Watch Workout</a></p>
                    <p class="workout-status">Status: ${details.status}</p>
                    ${details.status === 'in progress' ? '<p class="timer"><strong>Time Remaining:</strong> <span id="timer"></span></p>' : ''}
                    <button class="btn btn-primary start-btn" data-day="${dayStr}" ${active ? '' : 'disabled'}>Start</button>
                    <button class="btn btn-success end-btn" data-day="${dayStr}" ${active ? '' : 'disabled'} disabled>End</button>
                </div>
            </div>
        `;
    }

    if (todayStr >= startDate.toISOString().split('T')[0] && todayStr <= endDate.toISOString().split('T')[0]) {
        if (workouts[todayStr]) {
            const details = workouts[todayStr];

            $('#calendar').append(renderWorkout(todayStr, details, true));

            if (workouts[tomorrowStr]) {
                $('#calendar').append(renderWorkout(tomorrowStr, workouts[tomorrowStr], false, true));
            }

            updateButtonState(todayStr, details.status);

            $('.start-btn').on('click', function() {
                const day = $(this).data('day');
                startWorkout(day);
            });

            $('.end-btn').on('click', function() {
                const day = $(this).data('day');
                endWorkout(day);
            });
        } else {
            $('#calendar').append('<p>No workouts scheduled for today.</p>');
        }
    } else {
        $('#calendar').append('<p>No workouts scheduled for today.</p>');
    }

    function startWorkout(day) {
        const startTime = new Date().getTime();
        workouts[day].status = 'in progress';
        workouts[day].startTime = startTime;
        localStorage.setItem('workouts', JSON.stringify(workouts));
        updateButtonState(day, 'in progress');
        startTimer(day, startTime);
    }

    function endWorkout(day) {
        const endTime = new Date().getTime();
        const startTime = workouts[day].startTime;
        const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds
        workouts[day].status = 'completed';
        workouts[day].time = formatTime(timeSpent);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        stopTimer();
        updateButtonState(day, 'completed');
        showCongratulationsMessage(day);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes ${remainingSeconds} seconds`;
    }

    let timerInterval;

    function startTimer(day, startTime) {
        const timeLeft = 30 * 60 - Math.floor((new Date().getTime() - startTime) / 1000);
        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            $(`#${day}-timer`).text(`${minutes}:${seconds}`);

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                stopTimer();
                endWorkout(day);
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateButtonState(day, status) {
        const startButton = $(`button.start-btn[data-day="${day}"]`);
        const endButton = $(`button.end-btn[data-day="${day}"]`);
        if (status === 'in progress') {
            startButton.prop('disabled', true);
            endButton.prop('disabled', false);
        } else if (status === 'completed') {
            startButton.prop('disabled', true);
            endButton.prop('disabled', true);
        } else {
            startButton.prop('disabled', false);
            endButton.prop('disabled', true);
        }
    }

    function showCongratulationsMessage(day) {
        const quotes = [
            "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
            "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
            "The only bad workout is the one that didn’t happen.",
            "The difference between try and triumph is just a little umph!",
            "Work hard in silence. Let success make the noise.",
            "Sweat is just fat crying.",
            "The only time you should ever look back is to see how far you've come."
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const congratulationsCard = `
            <div class="modal fade" id="congratulationsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Congratulations!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>You've completed today's workout. Keep up the great work!</p>
                            <p>Time spent: ${workouts[day].time}</p>
                            <p>Here's some motivation to keep you going:</p>
                            <p>${randomQuote}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(congratulationsCard);
        $('#congratulationsModal').modal('show');

        // Remove the modal from DOM after it's hidden
        $('#congratulationsModal').on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
    }
});

