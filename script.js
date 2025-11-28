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
        welcome_message: "أهلاً بكي ياتوتا ! هل انتي مستعده لمغامرة ممتعة في عالم الحاسوب؟",
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
        welcome_message: "Welcome, tota! Are you ready for a fun adventure in the computer world?",
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
// دالة للكشف عن الأجهزة المحمولة
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && window.innerHeight <= 1024);
}

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
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported on this device/browser.');
        alert('القراءة الصوتية غير مدعومة في هذا المتصفح.');
        return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    // Adjust voice parameters based on language and device
    const isMobile = isMobileDevice();
    if (lang.startsWith('ar')) {
        // Arabic: normal reading like English
        utterance.rate = 0.8; // أبطأ ليبدو طبيعياً
        utterance.pitch = 1.1; // ارتفاع صوت طبيعي
        utterance.volume = 1.0; // حجم عالي
    } else {
        // English: default teacher-like
        utterance.rate = 0.8; // أبطأ ليبدو كمعلم
        utterance.pitch = 1.1; // ارتفاع صوت قليلاً
        utterance.volume = 1;
    }

    // Function to get voices and set up speech
    function setupVoice() {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));

        if (lang.startsWith('ar')) {
            // Prefer male Arabic voice
            let arabicVoice = voices.find(voice =>
                (voice.lang.startsWith('ar') ||
                voice.lang === 'ar-SA' ||
                voice.lang === 'ar-EG' ||
                voice.name.toLowerCase().includes('arabic') ||
                voice.name.toLowerCase().includes('عربي')) &&
                (voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('man') ||
                voice.name.toLowerCase().includes('ذكر'))
            );

            // If no male voice found, use any Arabic voice
            if (!arabicVoice) {
                arabicVoice = voices.find(voice =>
                    voice.lang.startsWith('ar') ||
                    voice.lang === 'ar-SA' ||
                    voice.lang === 'ar-EG' ||
                    voice.name.toLowerCase().includes('arabic') ||
                    voice.name.toLowerCase().includes('عربي')
                );
            }

            if (arabicVoice) {
                utterance.voice = arabicVoice;
                console.log('Using Arabic voice:', arabicVoice.name, arabicVoice.lang);
            } else {
                console.warn('No Arabic voice found. Available voices:', voices.map(v => v.name).join(', '));
                alert('لم يتم العثور على صوت عربي في هذا المتصفح.\n\nللحصول على صوت عربي:\n1. اذهب إلى إعدادات Windows\n2. اختر "الوقت واللغة" > "اللغة"\n3. أضف اللغة العربية\n4. قم بتثبيت حزمة اللغة العربية\n5. أعد تشغيل المتصفح\n\nأو جرب استخدام متصفح Chrome أو Edge.');
            }
        }

        // Speak the utterance
        window.speechSynthesis.speak(utterance);
    }

    // Get voices immediately or wait for them to load
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        setupVoice();
    } else {
        window.speechSynthesis.addEventListener('voiceschanged', setupVoice, { once: true });
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
        // Make the item more touch-friendly
        item.style.touchAction = 'none';
        item.style.userSelect = 'none';
        item.style.webkitTouchCallout = 'none';
        item.style.webkitUserSelect = 'none';
        item.style.webkitTapHighlightColor = 'transparent';
        item.addEventListener('dragstart', handleDragStart);
        // Add touch event listeners for mobile support with more aggressive prevention
        item.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
        item.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
        item.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
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

// Touch event handlers for mobile drag-and-drop support
let touchDraggedElement = null;
let touchClone = null;
let initialTouchX = 0;
let initialTouchY = 0;
let isDragging = false;

function handleTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];

    // Find the drag item by checking if the touch target or its parents is a drag item
    let target = e.target;
    while (target && target !== e.currentTarget) {
        if (target.classList.contains('drag-item')) {
            touchDraggedElement = target;
            break;
        }
        target = target.parentElement;
    }

    if (!touchDraggedElement) return;

    touchDraggedElement.classList.add('dragging');

    // Store initial touch position
    initialTouchX = touch.clientX;
    initialTouchY = touch.clientY;
    isDragging = false;

    // Create a visual clone for dragging
    touchClone = touchDraggedElement.cloneNode(true);
    touchClone.classList.add('touch-clone');
    touchClone.style.position = 'fixed';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.zIndex = '1000';
    touchClone.style.transform = 'scale(1.05)';
    touchClone.style.opacity = '0.95';
    touchClone.style.transition = 'none'; // Disable transitions for smooth following

    document.body.appendChild(touchClone);

    // Position the clone initially at the touch point
    updateClonePosition(touch.clientX, touch.clientY);
}

function updateClonePosition(clientX, clientY) {
    if (!touchClone) return;

    // Position the clone centered on the touch point
    const cloneRect = touchClone.getBoundingClientRect();
    const cloneWidth = cloneRect.width;
    const cloneHeight = cloneRect.height;

    touchClone.style.left = (clientX - cloneWidth / 2) + 'px';
    touchClone.style.top = (clientY - cloneHeight / 2) + 'px';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone || !touchDraggedElement) return;

    const touch = e.touches[0];
    updateClonePosition(touch.clientX, touch.clientY);

    // Check if we've moved enough to consider this a drag
    const deltaX = Math.abs(touch.clientX - initialTouchX);
    const deltaY = Math.abs(touch.clientY - initialTouchY);
    const minDragDistance = 10; // Minimum pixels to start dragging

    if (deltaX > minDragDistance || deltaY > minDragDistance) {
        isDragging = true;
    }

    // Highlight drop zones under the touch using bounding box check
    highlightDropZoneAtPoint(touch.clientX, touch.clientY);
}

function highlightDropZoneAtPoint(x, y) {
    // Remove previous hover
    document.querySelectorAll('.drop-target.hover').forEach(el => el.classList.remove('hover'));

    // Check all drop targets to see if the point is inside any of them
    const dropTargets = document.querySelectorAll('.drop-target:not(.filled)');
    for (const dropTarget of dropTargets) {
        const rect = dropTarget.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            dropTarget.classList.add('hover');
            break; // Only highlight one at a time
        }
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!touchDraggedElement) return;

    const touch = e.changedTouches[0];

    // Remove hover
    document.querySelectorAll('.drop-target.hover').forEach(el => el.classList.remove('hover'));

    // Only perform drop if we were actually dragging
    if (isDragging) {
        // Find drop target at the touch end position using bounding box check
        const dropTargets = document.querySelectorAll('.drop-target:not(.filled)');
        let targetDropZone = null;

        for (const dropTarget of dropTargets) {
            const rect = dropTarget.getBoundingClientRect();
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                targetDropZone = dropTarget;
                break;
            }
        }

        if (targetDropZone) {
            targetDropZone.textContent = touchDraggedElement.textContent;
            targetDropZone.classList.add('filled');
            touchDraggedElement.style.display = 'none';
            touchDraggedElement.setAttribute('data-dropped', 'true');
            touchDraggedElement.setAttribute('data-target-id', targetDropZone.id);
        }
    }

    // Clean up
    if (touchClone && touchClone.parentNode) {
        touchClone.parentNode.removeChild(touchClone);
    }
    touchClone = null;
    if (touchDraggedElement) {
        touchDraggedElement.classList.remove('dragging');
    }
    touchDraggedElement = null;
    isDragging = false;
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
