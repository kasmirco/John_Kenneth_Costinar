const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");
const profile = document.getElementById("profilePhoto");

// ===============================
// FRAME ANIMATION SETUP
// ===============================
const frames = [
  "../Frame/Frame 1 (START) - DAY.jpg",
  "../Frame/frame 2.png",
  "../Frame/frame 3.png",
  "../Frame/frame 4.png",
  "../Frame/frame 5.png",
  "../Frame/frame 6.png",
  "../Frame/frame 7.png",
  "../Frame/frame 8.png",
  "../Frame/frame 9.png",
  "../Frame/frame 10.png",
  "../Frame/frame 11.png",
  "../Frame/frame 12.png",
  "../Frame/frame 13.png",
  "../Frame/frame 15.png",
  "../Frame/frame 16.png",
  "../Frame/frame 17.png",
  "../Frame/frame 18.png",
  "../Frame/frame 19.png",
  "../Frame/frame 20.png",
  "../Frame/frame 21 (FINAL) - NIGHT.jpg"
];

// ===============================
// STATE (IMPORTANT FOR SMOOTH CONTROL)
// ===============================
let currentFrame = 0;
let timer = null;
let isDark = false;

// preload images (prevents lag)
frames.forEach(src => {
  const img = new Image();
  img.src = src;
});

// ===============================
// CORE FRAME PLAYER (SMOOTH + CONTROLLED)
// ===============================
function playFrames(targetFrame, baseSpeed = 90) {
  clearTimeout(timer);

  function step() {
    if (currentFrame === targetFrame) return;

    // move 1 frame at a time
    currentFrame += currentFrame < targetFrame ? 1 : -1;

    profile.src = frames[currentFrame];

    // ===============================
    // SLOW MOTION ZONE (SUNGLASSES MOMENT)
    // frames 5 & 6 = index 4 & 5
    // ===============================
    let speed = baseSpeed;

    if (currentFrame === 4 || currentFrame === 5) {
      speed = 180; // slow cinematic effect
    }

    timer = setTimeout(step, speed);
  }

  step();
}

// ===============================
// THEME TOGGLE (FIXED + STABLE)
// ===============================
toggle.addEventListener("click", () => {
  isDark = document.body.classList.toggle("dark");

  // icon switch
  if (isDark) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");

    // DAY → NIGHT
    playFrames(frames.length - 1);

  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

    // NIGHT → DAY
    playFrames(0);
  }
});

// ===============================
// 3D CARD HOVER EFFECT
// ===============================
const costiCard = document.getElementById("costiCard");

costiCard.addEventListener("mousemove", (e) => {
  const rect = costiCard.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 12;
  const rotateY = (x - centerX) / 12;

  costiCard.style.transform =
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

costiCard.addEventListener("mouseleave", () => {
  costiCard.style.transform = "rotateX(0) rotateY(0)";
});

// ===============================
// SCHOOL JOURNEY DROPDOWN
// ===============================

const schoolJourneyToggle =
    document.getElementById("schoolJourneyToggle");

const schoolJourneyList =
    document.getElementById("schoolJourneyList");


if (schoolJourneyToggle && schoolJourneyList) {

    schoolJourneyToggle.addEventListener(
        "click",
        function (e) {

            e.stopPropagation();

            const isOpen =
                schoolJourneyList.classList.contains("show");


            if (isOpen) {

                // CLOSE
                schoolJourneyList.classList.remove("show");

                schoolJourneyToggle.classList.remove("rotate");

                schoolJourneyToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                // OPEN
                schoolJourneyList.classList.add("show");

                schoolJourneyToggle.classList.add("rotate");

                schoolJourneyToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );


    // =================================
    // CLOSE WHEN CLICKING OUTSIDE
    // =================================

    document.addEventListener(
        "click",
        function (e) {

            if (
                !schoolJourneyList.contains(e.target) &&
                !schoolJourneyToggle.contains(e.target)
            ) {

                schoolJourneyList.classList.remove("show");

                schoolJourneyToggle.classList.remove("rotate");

                schoolJourneyToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    // =================================
    // KEYBOARD SUPPORT
    // =================================

    schoolJourneyToggle.addEventListener(
        "keydown",
        function (e) {

            if (
                e.key === "Enter" ||
                e.key === " "
            ) {

                e.preventDefault();

                schoolJourneyToggle.click();

            }

        }
    );

}

// ===============================
// CLICK FEEDBACK ANIMATION
// ===============================
toggle.addEventListener("click", () => {
  toggle.classList.add("clicked");

  setTimeout(() => {
    toggle.classList.remove("clicked");
  }, 600);
});



/* =====================================================
   SCHEDULE CALL SYSTEM
   Front-end portfolio demonstration
   ===================================================== */

document.addEventListener("DOMContentLoaded", function(){

    /* =================================================
       ELEMENTS
       ================================================= */

    const openButton =
        document.getElementById("openScheduleModal");

    const modal =
        document.getElementById("scheduleModal");

    const closeButton =
        document.getElementById("closeScheduleModal");

    const cancelButton =
        document.getElementById("scheduleCancelStep1");

    const nextButton =
        document.getElementById("scheduleNextStep");

    const backStep2 =
        document.getElementById("scheduleBackStep2");

    const backStep3 =
        document.getElementById("scheduleBackStep3");

    const confirmButton =
        document.getElementById("confirmSchedule");

    const doneButton =
        document.getElementById("scheduleDone");

    const detailsForm =
        document.getElementById("scheduleDetailsForm");

    const dateGrid =
        document.getElementById("scheduleDateGrid");

    const timeGrid =
        document.getElementById("scheduleTimeGrid");

    const timeSection =
        document.getElementById("scheduleTimeSection");

    const selection =
        document.getElementById("scheduleSelection");

    const selectedDateTime =
        document.getElementById("selectedDateTime");

    const intro =
        document.getElementById("scheduleStep1");

    const step2 =
        document.getElementById("scheduleStep2");

    const step3 =
        document.getElementById("scheduleStep3");

    const success =
        document.getElementById("scheduleSuccess");

    const progressSteps =
        document.querySelectorAll(
            ".schedule-progress-step"
        );


    /* =================================================
       DATA
       ================================================= */

    let selectedDate = null;
    let selectedTime = null;

    let currentStep = 1;

    let booking = {
        name:"",
        email:"",
        topic:"",
        message:""
    };


    /* =================================================
       TIME OPTIONS
       ================================================= */

    const timeOptions = [

        "9:00 AM",
        "9:30 AM",

        "10:00 AM",
        "10:30 AM",

        "11:00 AM",
        "11:30 AM",

        "1:00 PM",
        "1:30 PM",

        "2:00 PM",
        "2:30 PM",

        "3:00 PM",
        "3:30 PM",

        "4:00 PM",
        "4:30 PM"

    ];


    /* =================================================
       OPEN MODAL
       ================================================= */

    function openModal(){

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

        resetBooking();

        setTimeout(function(){

            closeButton.focus();

        },150);

    }


    /* =================================================
       CLOSE MODAL
       ================================================= */

    function closeModal(){

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /* =================================================
       BUTTON EVENTS
       ================================================= */

    if(openButton){

        openButton.addEventListener(
            "click",
            openModal
        );

    }


    if(closeButton){

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if(cancelButton){

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if(doneButton){

        doneButton.addEventListener(
            "click",
            closeModal
        );

    }


    /* =================================================
       CLICK OUTSIDE
       ================================================= */

    modal.addEventListener(
        "click",
        function(event){

            if(
                event.target === modal
            ){

                closeModal();

            }

        }
    );


    /* =================================================
       ESCAPE
       ================================================= */

    document.addEventListener(
        "keydown",
        function(event){

            if(
                event.key === "Escape" &&
                modal.classList.contains("active")
            ){

                closeModal();

            }

        }
    );


    /* =================================================
       GENERATE DATES
       ================================================= */

    function generateDates(){

        dateGrid.innerHTML = "";

        const today =
            new Date();

        for(
            let i = 0;
            i < 14;
            i++
        ){

            const date =
                new Date(today);

            date.setDate(
                today.getDate() + i
            );

            /*
             * Skip Sunday
             */

            if(
                date.getDay() === 0
            ){

                continue;

            }


            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "schedule-date-btn";


            const day =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday:"short"
                    }
                );


            const number =
                date.getDate();


            const month =
                date.toLocaleDateString(
                    "en-US",
                    {
                        month:"short"
                    }
                );


            button.innerHTML = `

                <span class="date-day">
                    ${i === 0 ? "Today" : day}
                </span>

                <span class="date-number">
                    ${number}
                </span>

                <span class="date-day">
                    ${month}
                </span>

            `;


            button.addEventListener(
                "click",
                function(){

                    selectDate(
                        date,
                        button
                    );

                }
            );


            dateGrid.appendChild(
                button
            );

        }

    }


    /* =================================================
       SELECT DATE
       ================================================= */

    function selectDate(
        date,
        button
    ){

        selectedDate =
            new Date(date);


        selectedTime =
            null;


        document
            .querySelectorAll(
                ".schedule-date-btn"
            )
            .forEach(
                function(item){

                    item.classList.remove(
                        "selected"
                    );

                }
            );


        button.classList.add(
            "selected"
        );


        generateTimes();


        timeSection.classList.add(
            "active"
        );


        updateSelection();

    }


    /* =================================================
       GENERATE TIMES
       ================================================= */

    function generateTimes(){

        timeGrid.innerHTML = "";

        timeOptions.forEach(
            function(time){

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "schedule-time-btn";

                button.textContent =
                    time;


                button.addEventListener(
                    "click",
                    function(){

                        selectTime(
                            time,
                            button
                        );

                    }
                );


                timeGrid.appendChild(
                    button
                );

            }
        );

    }


    /* =================================================
       SELECT TIME
       ================================================= */

    function selectTime(
        time,
        button
    ){

        selectedTime =
            time;


        document
            .querySelectorAll(
                ".schedule-time-btn"
            )
            .forEach(
                function(item){

                    item.classList.remove(
                        "selected"
                    );

                }
            );


        button.classList.add(
            "selected"
        );


        updateSelection();

    }


    /* =================================================
       UPDATE SELECTION
       ================================================= */

    function updateSelection(){

        if(
            !selectedDate ||
            !selectedTime
        ){

            selectedDateTime.textContent =
                "Select a date and time";

            nextButton.disabled =
                true;

            selection.style.display =
                "flex";

            return;

        }


        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-US",
                {
                    weekday:"long",
                    month:"long",
                    day:"numeric",
                    year:"numeric"
                }
            );


        selectedDateTime.textContent =
            `${formattedDate} · ${selectedTime}`;


        nextButton.disabled =
            false;

    }


    /* =================================================
       NEXT TO DETAILS
       ================================================= */

    nextButton.addEventListener(
        "click",
        function(){

            if(
                !selectedDate ||
                !selectedTime
            ){

                return;

            }


            showStep(2);

        }
    );


    /* =================================================
       DETAILS VALIDATION
       ================================================= */

    detailsForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const name =
                document.getElementById(
                    "scheduleName"
                );

            const email =
                document.getElementById(
                    "scheduleEmail"
                );

            const topic =
                document.getElementById(
                    "scheduleTopic"
                );

            let valid = true;


            /* NAME */

            if(
                name.value.trim().length < 2
            ){

                showError(
                    name
                );

                valid = false;

            }else{

                clearError(
                    name
                );

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if(
                !emailPattern.test(
                    email.value.trim()
                )
            ){

                showError(
                    email
                );

                valid = false;

            }else{

                clearError(
                    email
                );

            }


            /* TOPIC */

            if(
                topic.value === ""
            ){

                showError(
                    topic
                );

                valid = false;

            }else{

                clearError(
                    topic
                );

            }


            if(!valid){

                return;

            }


            booking.name =
                name.value.trim();

            booking.email =
                email.value.trim();

            booking.topic =
                topic.value;

            booking.message =
                document.getElementById(
                    "scheduleMessage"
                ).value.trim();


            updateReview();

            showStep(3);

        }
    );


    /* =================================================
       ERROR
       ================================================= */

    function showError(input){

        const field =
            input.closest(
                ".schedule-form-field"
            );

        if(field){

            field.classList.add(
                "error"
            );

        }

    }


    function clearError(input){

        const field =
            input.closest(
                ".schedule-form-field"
            );

        if(field){

            field.classList.remove(
                "error"
            );

        }

    }


    /* =================================================
       BACK BUTTONS
       ================================================= */

    backStep2.addEventListener(
        "click",
        function(){

            showStep(1);

        }
    );


    backStep3.addEventListener(
        "click",
        function(){

            showStep(2);

        }
    );


    /* =================================================
       UPDATE REVIEW
       ================================================= */

    function updateReview(){

        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-US",
                {
                    weekday:"long",
                    month:"long",
                    day:"numeric",
                    year:"numeric"
                }
            );


        const dateTime =
            `${formattedDate} · ${selectedTime}`;


        document.getElementById(
            "reviewDateTime"
        ).textContent =
            dateTime;


        document.getElementById(
            "reviewName"
        ).textContent =
            booking.name;


        document.getElementById(
            "reviewEmail"
        ).textContent =
            booking.email;


        document.getElementById(
            "reviewTopic"
        ).textContent =
            booking.topic;

    }


    /* =================================================
       CONFIRM
       ================================================= */

    confirmButton.addEventListener(
        "click",
        function(){

            const formattedDate =
                selectedDate.toLocaleDateString(
                    "en-US",
                    {
                        weekday:"long",
                        month:"long",
                        day:"numeric",
                        year:"numeric"
                    }
                );


            document.getElementById(
                "successName"
            ).textContent =
                booking.name;


            document.getElementById(
                "successDateTime"
            ).textContent =
                `${formattedDate} · ${selectedTime}`;


            document.getElementById(
                "successTopic"
            ).textContent =
                booking.topic;


            showStep(
                "success"
            );

        }
    );


    /* =================================================
       STEP NAVIGATION
       ================================================= */

    function showStep(step){

        currentStep =
            step;


        document
            .querySelectorAll(
                ".schedule-step"
            )
            .forEach(
                function(section){

                    section.classList.remove(
                        "active"
                    );

                }
            );


        if(step === 1){

            intro.classList.add(
                "active"
            );

        }

        if(step === 2){

            step2.classList.add(
                "active"
            );

        }

        if(step === 3){

            step3.classList.add(
                "active"
            );

        }

        if(step === "success"){

            success.classList.add(
                "active"
            );

        }


        updateProgress(step);

    }


    /* =================================================
       PROGRESS
       ================================================= */

    function updateProgress(step){

        progressSteps.forEach(
            function(item){

                const itemStep =
                    Number(
                        item.dataset.step
                    );


                item.classList.remove(
                    "active",
                    "completed"
                );


                if(
                    typeof step === "number"
                ){

                    if(
                        itemStep === step
                    ){

                        item.classList.add(
                            "active"
                        );

                    }


                    if(
                        itemStep < step
                    ){

                        item.classList.add(
                            "completed"
                        );

                    }

                }


                if(
                    step === "success"
                ){

                    item.classList.add(
                        "completed"
                    );

                }

            }
        );

    }


    /* =================================================
       RESET
       ================================================= */

    function resetBooking(){

        selectedDate =
            null;

        selectedTime =
            null;

        booking = {

            name:"",
            email:"",
            topic:"",
            message:""

        };


        document.getElementById(
            "scheduleName"
        ).value = "";


        document.getElementById(
            "scheduleEmail"
        ).value = "";


        document.getElementById(
            "scheduleTopic"
        ).value = "";


        document.getElementById(
            "scheduleMessage"
        ).value = "";


        document
            .querySelectorAll(
                ".schedule-form-field"
            )
            .forEach(
                function(field){

                    field.classList.remove(
                        "error"
                    );

                }
            );


        generateDates();

        timeGrid.innerHTML = "";

        timeSection.classList.remove(
            "active"
        );


        nextButton.disabled =
            true;


        selectedDateTime.textContent =
            "Select a date and time";


        showStep(1);

    }


    /* =================================================
       INITIALIZE
       ================================================= */

    generateDates();

    updateSelection();

});



/* =====================================================
   SEND EMAIL MODAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const emailModal = document.getElementById("emailModal");
    const openEmailModal = document.getElementById("openEmailModal");
    const closeEmailModal = document.getElementById("closeEmailModal");
    const cancelEmail = document.getElementById("cancelEmail");

    const emailForm = document.getElementById("emailForm");
    const emailSubmit = document.getElementById("emailSubmit");
    const emailStatus = document.getElementById("emailStatus");

    const senderName = document.getElementById("senderName");
    const senderEmail = document.getElementById("senderEmail");
    const senderSubject = document.getElementById("senderSubject");
    const senderMessage = document.getElementById("senderMessage");


    /* =================================================
       OPEN MODAL
    ================================================= */

    function openModal() {

        if (!emailModal) return;

        emailModal.classList.add("active");

        emailModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            if (senderName) {
                senderName.focus();
            }
        }, 250);
    }


    /* =================================================
       CLOSE MODAL
    ================================================= */

    function closeModal() {

        if (!emailModal) return;

        emailModal.classList.remove("active");

        emailModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        clearStatus();

        clearValidation();
    }


    /* =================================================
       OPEN BUTTON
    ================================================= */

    if (openEmailModal) {

        openEmailModal.addEventListener("click", function () {

            openModal();

        });

    }


    /* =================================================
       CLOSE BUTTON
    ================================================= */

    if (closeEmailModal) {

        closeEmailModal.addEventListener("click", function () {

            closeModal();

        });

    }


    /* =================================================
       CANCEL BUTTON
    ================================================= */

    if (cancelEmail) {

        cancelEmail.addEventListener("click", function () {

            closeModal();

        });

    }


    /* =================================================
       CLICK OUTSIDE MODAL
    ================================================= */

    if (emailModal) {

        emailModal.addEventListener("click", function (event) {

            if (event.target === emailModal) {

                closeModal();

            }

        });

    }


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            emailModal &&
            emailModal.classList.contains("active")
        ) {

            closeModal();

        }

    });


    /* =================================================
       VALIDATION
    ================================================= */

    function setInvalid(input, invalid) {

        const field = input.closest(".email-field");

        if (!field) return;

        if (invalid) {

            field.classList.add("invalid");

        } else {

            field.classList.remove("invalid");

        }

    }


    function validateForm() {

        let valid = true;


        /* NAME */

        if (senderName.value.trim().length < 2) {

            setInvalid(senderName, true);

            valid = false;

        } else {

            setInvalid(senderName, false);

        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(senderEmail.value.trim())) {

            setInvalid(senderEmail, true);

            valid = false;

        } else {

            setInvalid(senderEmail, false);

        }


        /* SUBJECT */

        if (senderSubject.value.trim().length < 2) {

            setInvalid(senderSubject, true);

            valid = false;

        } else {

            setInvalid(senderSubject, false);

        }


        /* MESSAGE */

        if (senderMessage.value.trim().length < 5) {

            setInvalid(senderMessage, true);

            valid = false;

        } else {

            setInvalid(senderMessage, false);

        }


        return valid;

    }


    /* =================================================
       CLEAR VALIDATION
    ================================================= */

    function clearValidation() {

        document
            .querySelectorAll(".email-field")
            .forEach(function (field) {

                field.classList.remove("invalid");

            });

    }


    /* =================================================
       STATUS
    ================================================= */

    function showStatus(message, type) {

        emailStatus.textContent = message;

        emailStatus.className =
            "email-status show " + type;

    }


    function clearStatus() {

        emailStatus.textContent = "";

        emailStatus.className =
            "email-status";

    }


    /* =================================================
       REAL-TIME VALIDATION
    ================================================= */

    [
        senderName,
        senderEmail,
        senderSubject,
        senderMessage
    ].forEach(function (input) {

        if (!input) return;

        input.addEventListener("input", function () {

            if (input.value.trim() !== "") {

                setInvalid(input, false);

            }

            clearStatus();

        });

    });


    /* =================================================
       SUBMIT
    ================================================= */

    if (emailForm) {

        emailForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearStatus();


            if (!validateForm()) {

                showStatus(
                    "Please check the highlighted fields.",
                    "error"
                );

                return;

            }


            /* LOADING */

            emailSubmit.disabled = true;

            emailSubmit.classList.add("loading");

            emailSubmit.innerHTML = `
                <i class="bi bi-arrow-repeat"></i>
                <span>Sending...</span>
            `;


            /*
                DEMO SUBMISSION

                There is no backend here, so this simulates
                a successful email submission.
            */

            setTimeout(function () {

                emailSubmit.disabled = false;

                emailSubmit.classList.remove("loading");

                emailSubmit.innerHTML = `
                    <i class="bi bi-check-lg"></i>
                    <span>Message Sent</span>
                `;


                showStatus(
                    "Thank you! Your message has been received.",
                    "success"
                );


                /*
                    Clear the form after the success
                    message has been displayed.
                */

                setTimeout(function () {

                    emailForm.reset();

                    emailSubmit.innerHTML = `
                        <i class="bi bi-send"></i>
                        <span>Send Message</span>
                    `;

                }, 1800);


            }, 1200);

        });

    }

});

