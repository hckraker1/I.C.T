// --- تعريف عناصر الواجهة ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const questionTitle = document.getElementById('question-title');
const questionContainer = document.getElementById('question-container');
const feedback = document.getElementById('feedback');
const progressBar = document.getElementById('progress-bar');

const langArButton = document.getElementById('lang-ar');
const langEnButton = document.getElementById('lang-en');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const nextButton = document.getElementById('next-button');

// --- إعدادات اللغة والنصوص ---
let currentLang = 'ar';
const translations = {
    ar: {
        welcome_title: "مغامرات الحاسوب",
        welcome_message: "أهلاً بك أيها البطل الصغير! هل أنت مستعد لمغامرة ممتعة في عالم الحاسوب؟",
        start_button: "ابدأ المغامرة!",
        end_title: "تهانينا أيها البطل!",
        end_message: "لقد أكملت المغامرة بنجاح وأصبحت خبيراً في عالم الحاسوب!",
        restart_button: "العب مرة أخرى",
        correct_feedback: "إجابة صحيحة! أحسنت!",
        wrong_feedback_prefix: "للأسف، الإجابة الصحيحة هي: ",
        next_button: "السؤال التالي",
        drag_prompt: "اسحب الكلمات إلى أماكنها الصحيحة.",
        match_prompt: "اختر الكلمة المناسبة لكل صورة."
    },
    en: {
        welcome_title: "Computer Adventures",
        welcome_message: "Welcome, little hero! Are you ready for a fun adventure in the computer world?",
        start_button: "Start Adventure!",
        end_title: "Congratulations, Hero!",
        end_message: "You have successfully completed the adventure and become a computer expert!",
        restart_button: "Play Again",
        correct_feedback: "Correct answer! Awesome!",
        wrong_feedback_prefix: "Oops, the correct answer is: ",
        next_button: "Next Question",
        drag_prompt: "Drag the words to their correct places.",
        match_prompt: "Choose the right word for each image."
    }
};

// --- أرقام ترتيبية ---
const arabicOrdinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'];
const englishOrdinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

// --- بنك الأسئلة المتنوعة (تم تحديثه بالكامل بالعربية الفصحى) ---
const questions = [
    // 1. لعبة السحب والإفلات (Drag and Drop) - الملحقات ووظائفها
    {
        type: 'drag_drop',
        ar: {
            q: "صل كل جهاز بالوظيفة المناسبة له:",
            items: ["ذاكرة الفلاش", "كابل HDMI", "الموجه (الراوتر)"],
            targets: [
                { text: "يوصل الحاسوب بالإنترنت لاسلكياً", answer: "الموجه (الراوتر)" },
                { text: "يستخدم لنقل الملفات بين الحواسيب", answer: "ذاكرة الفلاش" },
                { text: "ينقل الصورة والصوت بجودة عالية", answer: "كابل HDMI" }
            ]
        },
        en: {
            q: "Match each device with its function:",
            items: ["Flash Drive", "HDMI Cable", "Router"],
            targets: [
                { text: "Connects computer to internet wirelessly", answer: "Router" },
                { text: "Used to transfer files between computers", answer: "Flash Drive" },
                { text: "Transfers high-quality audio and video", answer: "HDMI Cable" }
            ]
        }
    },
    // 2. لعبة التوصيل بالصورة (Image Matching) - التعرف على الأجهزة (باستخدام صور HDMI و Ethernet Cable)
    {
        type: 'image_match',
        ar: {
            q: "اختر الاسم المناسب لكل صورة:",
            items: [
                // الصورة الأولى: كابل HDMI - HDMI.jpg
                { image: "src/HDMI.jpg", options: ["كابل إيثرنت", "كابل HDMI", "ذاكرة فلاش"], answer: "كابل HDMI" }, 
                // الصورة الثانية: كابل إيثرنت - ethernet_cable.jpg
                { image: "src/ethernet_cable.jpg", options: ["كابل إيثرنت", "كابل HDMI", "موجه"], answer: "كابل إيثرنت" } 
            ]
        },
        en: {
            q: "Choose the correct name for each image:",
            items: [
                { image: "src/HDMI.jpg", options: ["Ethernet Cable", "HDMI Cable", "Flash Drive"], answer: "HDMI Cable" },
                { image: "src/ethernet_cable.jpg", options: ["Ethernet Cable", "HDMI Cable", "Router"], answer: "Ethernet Cable" }
            ]
        }
    },
    // 3. لعبة الاختيار من متعدد (Multiple Choice) - حل المشكلات
    {
        type: 'multiple_choice',
        ar: {
            q: "ما هو الحل الأفضل لمشكلة ضعف اتصال الإنترنت أثناء مؤتمر الفيديو؟",
            options: ["إغلاق بعض البرامج", "استخدام كابل الإيثرنت", "نقل الملفات إلى قرص خارجي"],
            answer: "استخدام كابل الإيثرنت"
        },
        en: {
            q: "What is the best solution for a poor internet connection during a video conference?",
            options: ["Close some programs", "Use an Ethernet cable", "Move files to an external drive"],
            answer: "Use an Ethernet cable"
        }
    },
    // 4. لعبة التوصيل بالصورة (Image Matching) - التعرف على الأجهزة (باستخدام صور Router و External Hard)
    {
        type: 'image_match',
        ar: {
            q: "اختر الاسم المناسب لكل صورة:",
            items: [
                // الصورة الأولى: موجه (راوتر) - ruter.jpg
                { image: "src/ruter.jpg", options: ["قرص صلب خارجي", "موجه (راوتر)", "منفذ إيثرنت"], answer: "موجه (راوتر)" }, 
                // الصورة الثانية: قرص صلب خارجي - external_hard.png
                { image: "src/external_hard.png", options: ["ذاكرة فلاش", "قرص صلب خارجي", "كابل HDMI"], answer: "قرص صلب خارجي" } 
            ]
        },
        en: {
            q: "Choose the correct name for each image:",
            items: [
                { image: "src/ruter.jpg", options: ["External Hard Drive", "Router", "Ethernet Port"], answer: "Router" },
                { image: "src/external_hard.png", options: ["Flash Drive", "External Hard Drive", "HDMI Cable"], answer: "External Hard Drive" }
            ]
        }
    },
    // 5. لعبة السحب والإفلات (Drag and Drop) - وحدات القياس
    {
        type: 'drag_drop',
        ar: {
            q: "صل وحدة القياس بالكمية التي تقيسها:",
            items: ["جيجاهرتز (GHz)", "ميجابايت في الثانية (Mbps)", "بايت (Byte)"],
            targets: [
                { text: "يقيس سرعة معالج الحاسوب", answer: "جيجاهرتز (GHz)" },
                { text: "يقيس سرعة اتصال الإنترنت", answer: "ميجابايت في الثانية (Mbps)" },
                { text: "أصغر وحدة بيانات في الحاسوب", answer: "بايت (Byte)" }
            ]
        },
        en: {
            q: "Match the unit of measurement with the quantity it measures:",
            items: ["Gigahertz (GHz)", "Megabits per second (Mbps)", "Byte (B)"],
            targets: [
                { text: "Measures the speed of the CPU", answer: "Gigahertz (GHz)" },
                { text: "Measures the speed of the internet connection", answer: "Megabits per second (Mbps)" },
                { text: "The smallest unit of data in a computer", answer: "Byte (B)" }
            ]
        }
    }
];

let currentQuestionIndex = 0;
let draggedElement = null;
let dragItemsContainerRef = null; 

// --- دوال اللغة والقراءة ---
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[lang][key];
    });

    langArButton.classList.toggle('active', lang === 'ar');
    langEnButton.classList.toggle('active', lang === 'en');
    
    if (gameScreen.classList.contains('active')) {
        showQuestion();
    }
}

function speak(text, lang) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // أبطأ ليبدو كمعلم
    utterance.pitch = 1.1; // ارتفاع صوت قليلاً
    utterance.volume = 1;

    function setVoice() {
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;

        // First, try to find a voice that exactly matches the language
        selectedVoice = voices.find(voice => voice.lang === lang);

        // If not found, try to find a voice that includes the language prefix
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
        }

        // If still not found, try any voice that includes the language code
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.includes(lang.split('-')[0]));
        }

        // As a last resort, use the default voice, but only if no better option
        if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0]; // Use the first available voice
        }

        if (selectedVoice) {
            // Check if the selected voice exactly matches the required language
            if (selectedVoice.lang === lang) {
                utterance.voice = selectedVoice;
                window.speechSynthesis.speak(utterance);
            } else {
                // If the voice doesn't exactly match the language, don't speak to avoid mispronunciation
                if (lang.startsWith('ar')) {
                    alert('لا يوجد صوت عربي متاح على جهازك. يرجى تثبيت صوت عربي أو استخدام متصفح آخر للحصول على نطق صحيح.');
                } else {
                    alert('No suitable voice available for the selected language. Please install a voice pack or use a different browser.');
                }
            }
        } else {
            // No voice found at all
            alert('No voices available. Speech synthesis is not supported or no voices are installed.');
        }
    }

    if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
    } else {
        window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true });
    }
}

// --- دوال الوضع الداكن ---
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkModeSetting() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// --- دوال اللعبة الرئيسية ---
function startGame() {
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    feedback.textContent = '';
    nextButton.style.display = 'none';
    questionContainer.innerHTML = '';

    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = progress + '%';

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionData = currentQuestion[currentLang];

    const ordinal = currentLang === 'ar' ? arabicOrdinals[currentQuestionIndex] : englishOrdinals[currentQuestionIndex];
    const questionLabel = currentLang === 'ar' ? 'السؤال' : 'Question';
    questionTitle.textContent = `${questionLabel} ${ordinal} ${currentQuestionData.q}`;
    speak(currentQuestionData.q, currentLang === 'ar' ? 'ar-SA' : 'en-US');

    if (currentQuestion.type === 'multiple_choice') {
        renderMultipleChoice(currentQuestionData);
    } else if (currentQuestion.type === 'drag_drop') {
        renderDragAndDrop(currentQuestionData);
    } else if (currentQuestion.type === 'image_match') {
        renderImageMatch(currentQuestionData);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');
    progressBar.style.width = '100%';
}

// --- دوال الألعاب المختلفة ---

// 1. الاختيار من متعدد (Multiple Choice)
function renderMultipleChoice(data) {
    const mcContainer = document.createElement('div');
    mcContainer.classList.add('mc-options');
    
    data.options.forEach(optionText => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkMultipleChoice(optionText, data.answer, button));
        mcContainer.appendChild(button);
    });
    questionContainer.appendChild(mcContainer);
}

function checkMultipleChoice(selectedOption, correctAnswer, button) {
    const allButtons = questionContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        feedback.textContent = translations[currentLang].correct_feedback;
        feedback.className = 'feedback correct';
    } else {
        button.classList.add('wrong');
        feedback.textContent = translations[currentLang].wrong_feedback_prefix + correctAnswer;
        feedback.className = 'feedback wrong';
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    setTimeout(nextQuestion, 2500);
}

// 2. السحب والإفلات (Drag and Drop)
function renderDragAndDrop(data) {
    const ddContainer = document.createElement('div');
    ddContainer.classList.add('drag-drop-container');
    
    // 1. العناصر القابلة للسحب
    const dragItemsContainer = document.createElement('div');
    dragItemsContainer.classList.add('drag-items');
    dragItemsContainerRef = dragItemsContainer; // حفظ المرجع
    
    data.items.forEach(itemText => {
        const item = document.createElement('div');
        item.textContent = itemText;
        item.classList.add('drag-item');
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', handleDragStart);
        dragItemsContainer.appendChild(item);
    });
    ddContainer.appendChild(dragItemsContainer);

    // 2. مناطق الإفلات
    const dropZonesContainer = document.createElement('div');
    dropZonesContainer.classList.add('drop-zones');
    data.targets.forEach((target, index) => {
        const zoneItem = document.createElement('div');
        zoneItem.classList.add('drop-zone-item');
        
        const textSpan = document.createElement('span');
        textSpan.textContent = target.text;
        zoneItem.appendChild(textSpan);
        
        const dropTarget = document.createElement('div');
        dropTarget.classList.add('drop-target');
        dropTarget.textContent = translations[currentLang].drag_prompt;
        dropTarget.setAttribute('data-answer', target.answer);
        dropTarget.setAttribute('id', `drop-target-${index}`); // إضافة ID لسهولة الإرجاع
        dropTarget.addEventListener('dragover', handleDragOver);
        dropTarget.addEventListener('dragleave', handleDragLeave);
        dropTarget.addEventListener('drop', handleDrop);
        dropTarget.addEventListener('click', handleDropZoneClick); // إضافة مستمع النقر
        zoneItem.appendChild(dropTarget);
        
        dropZonesContainer.appendChild(zoneItem);
    });
    ddContainer.appendChild(dropZonesContainer);
    
    questionContainer.appendChild(ddContainer);
    nextButton.style.display = 'block';
    nextButton.removeEventListener('click', checkImageMatch);
    nextButton.addEventListener('click', checkDragAndDrop);
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('drop-target') && !e.target.classList.contains('filled')) {
        e.target.classList.add('hover');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('drop-target')) {
        e.target.classList.remove('hover');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('hover');
    
    if (e.target.classList.contains('drop-target') && !e.target.classList.contains('filled')) {
        const data = e.dataTransfer.getData('text/plain');
        e.target.textContent = data;
        e.target.classList.add('filled');
        draggedElement.style.display = 'none';
        draggedElement.setAttribute('data-dropped', 'true');
        draggedElement.setAttribute('data-target-id', e.target.id); // حفظ مرجع منطقة الإفلات
    }
}

// الدالة الجديدة لإعادة الكلمة المسحوبة
function handleDropZoneClick(e) {
    const dropTarget = e.currentTarget;
    if (dropTarget.classList.contains('filled')) {
        const droppedText = dropTarget.textContent;
        const targetId = dropTarget.id;
        
        // البحث عن العنصر المسحوب بناءً على النص و ID منطقة الإفلات
        const allDragItems = dragItemsContainerRef.querySelectorAll('.drag-item');
        allDragItems.forEach(item => {
            if (item.textContent === droppedText && item.getAttribute('data-target-id') === targetId) {
                item.style.display = 'block';
                item.removeAttribute('data-dropped');
                item.removeAttribute('data-target-id');
            }
        });
        
        // تفريغ منطقة الإفلات
        dropTarget.textContent = translations[currentLang].drag_prompt;
        dropTarget.classList.remove('filled', 'correct', 'wrong');
    }
}

function checkDragAndDrop() {
    let allCorrect = true;
    const dropTargets = questionContainer.querySelectorAll('.drop-target');
    
    dropTargets.forEach(target => {
        const droppedText = target.textContent;
        const correctAnswer = target.getAttribute('data-answer');
        
        if (droppedText === correctAnswer) {
            target.classList.add('correct');
            target.classList.remove('wrong');
        } else {
            target.classList.add('wrong');
            target.classList.remove('correct');
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        feedback.textContent = translations[currentLang].correct_feedback;
        feedback.className = 'feedback correct';
        setTimeout(nextQuestion, 1500);
    } else {
        feedback.textContent = "حاول مرة أخرى! هناك خطأ في التوصيل.";
        feedback.className = 'feedback wrong';
    }
}

// 3. التوصيل بالصورة (Image Matching)
function renderImageMatch(data) {
    const imContainer = document.createElement('div');
    imContainer.classList.add('image-match-container');
    
    // إعادة تعيين الإجابات المخزنة
    imageMatchAnswers = {};
    
    data.items.forEach((item, index) => {
        const matchRow = document.createElement('div');
        matchRow.classList.add('match-row');
        matchRow.setAttribute('data-index', index); // إضافة index للصف
        
        // الصورة
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('match-image-container');
        const img = document.createElement('img');
        img.src = item.image;
        img.classList.add('match-image');
        imgContainer.appendChild(img);
        matchRow.appendChild(imgContainer);
        
        // الاختيارات
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('match-options');
        item.options.forEach(optionText => {
            const optionBtn = document.createElement('button');
            optionBtn.textContent = optionText;
            optionBtn.classList.add('match-option-btn');
            optionBtn.setAttribute('data-answer', item.answer); // إضافة الإجابة الصحيحة للزر
            optionBtn.addEventListener('click', handleImageMatchSelect);
            optionsContainer.appendChild(optionBtn);
        });
        matchRow.appendChild(optionsContainer);
        imContainer.appendChild(matchRow);
    });
    
    questionContainer.appendChild(imContainer);
    nextButton.style.display = 'block';
    nextButton.removeEventListener('click', checkDragAndDrop);
    nextButton.addEventListener('click', checkImageMatch);
}

let imageMatchAnswers = {}; // لتخزين إجابات المستخدم

function handleImageMatchSelect(e) {
    const selectedBtn = e.target;
    const row = selectedBtn.closest('.match-row');
    const index = row.getAttribute('data-index');
    
    // إلغاء اختيار الأزرار الأخرى في نفس الصف
    row.querySelectorAll('.match-option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // اختيار الزر الحالي
    selectedBtn.classList.add('selected');
    
    // تخزين الإجابة
    imageMatchAnswers[index] = selectedBtn.textContent;
}

function checkImageMatch() {
    let allCorrect = true;
    const currentQuestionData = questions[currentQuestionIndex][currentLang];
    const matchRows = questionContainer.querySelectorAll('.match-row');
    
    matchRows.forEach((row, index) => {
        const correctAnswer = currentQuestionData.items[index].answer;
        const userAnswer = imageMatchAnswers[index];
        
        const selectedBtn = row.querySelector('.match-option-btn.selected');
        
        // إزالة أي تصحيح سابق
        row.style.border = 'none';
        row.querySelectorAll('.match-option-btn').forEach(btn => btn.classList.remove('correct', 'wrong'));
        
        if (userAnswer === correctAnswer) {
            row.style.border = '2px solid #3cb371';
            if (selectedBtn) selectedBtn.classList.add('correct');
        } else {
            row.style.border = '2px solid #dc143c';
            if (selectedBtn) selectedBtn.classList.add('wrong');
            
            // تظليل الإجابة الصحيحة
            row.querySelectorAll('.match-option-btn').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        feedback.textContent = translations[currentLang].correct_feedback;
        feedback.className = 'feedback correct';
        setTimeout(nextQuestion, 1500);
    } else {
        feedback.textContent = "حاول مرة أخرى! هناك خطأ في التوصيل.";
        feedback.className = 'feedback wrong';
    }
}

// --- ربط الأحداث العامة ---
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
langArButton.addEventListener('click', () => setLanguage('ar'));
langEnButton.addEventListener('click', () => setLanguage('en'));
darkModeToggle.addEventListener('click', toggleDarkMode);

// --- أزرار القراءة لكل شاشة ---
document.getElementById('speak-start').addEventListener('click', () => {
    const title = document.querySelector('#start-screen h1').textContent;
    const message = document.querySelector('#start-screen p').textContent;
    const textToSpeak = title + '. ' + message;
    speak(textToSpeak, currentLang === 'ar' ? 'ar-SA' : 'en-US');
});

document.getElementById('speak-game').addEventListener('click', () => {
    const questionText = questions[currentQuestionIndex][currentLang].q;
    const lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
    speak(questionText, lang);
});

document.getElementById('speak-end').addEventListener('click', () => {
    const title = document.querySelector('#end-screen h1').textContent;
    const message = document.querySelector('#end-screen p').textContent;
    const textToSpeak = title + '. ' + message;
    speak(textToSpeak, currentLang === 'ar' ? 'ar-SA' : 'en-US');
});

// تهيئة اللغة والوضع الداكن عند تحميل الصفحة
loadDarkModeSetting();
setLanguage('ar');
