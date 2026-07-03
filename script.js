// ==========================================
// 🛠️ قسم التواريخ والبيانات المهمة والثابتة للمشروع
// ==========================================
const importantDates = [
    { title: "بداية الحب", date: "2026-01-01T18:00:00", icon: "fa-heart" },
    { title: "تاريخ الزواج", date: "2026-06-26T16:00:00", icon: "fa-ring" },
    { title: "أول لقاء", date: "2026-05-14T15:30:00", icon: "fa-rose" },
    { title: "تاريخ تحليل الدم", date: "2026-05-18T10:00:00", icon: "fa-droplet" },
    { title: "أول رسالة", date: "2025-12-26T20:22:00", icon: "fa-envelope" },
    { title: "أول مكالمة", date: "2026-01-20T20:05:00", icon: "fa-phone" },
    { title: "الخطوبة", date: "2026-05-18T17:00:00", icon: "fa-certificate" },
    { title: "عيد ميلادها", date: "2027-05-18T00:00:00", icon: "fa-cake-candles" },
    { title: "عيد ميلادي", date: "2027-04-23T00:00:00", icon: "fa-gift" }
];

// مصفوفة عبارات غرامية مخصصة وفخمة لتظهر ديناميكياً عند الضغط
const romanticPhrases = [
    "أنتِ اللحظة الحية في قلبي، خُلقتُ لأحميكِ بجسدي وروحي.",
    "وإن سألوني عن وطني وأماني؟ سأشير لعظام صدرك وعينيكِ الحوراوين.",
    "حبكِ كالعُمر الفخم الحقيقي، لا يتكرر في تاريخ البشرية مرتين.",
    "في كل نبضة ودقة قلب يتجدد عهدي ووفائي الأبدي لكِ وعنكِ.",
    "وجودكِ بجانبي يجعلني أقوى رجل في الكون، دمتِ لي عمراً لا ينتهي.",
    "خبأتُكِ في ثنايا الروح متحصنة، فكل النساء بعد عينيكِ سراب."
];

document.addEventListener("DOMContentLoaded", () => {
    // الأنيميشن التلقائي للكتابة بشاشة البدء الترحيبية
    new Typed('#typewriter-text-1', {
        strings: ['مرحباً بحبيبتي وزوجتي ❤️'],
        typeSpeed: 60,
        showCursor: false,
        onComplete: () => {
            setTimeout(() => {
                new Typed('#typewriter-text-2', {
                    strings: ['هذه ليست مجرد صفحة... إنها قصة حياتنا وثنايا حبنا مخلدة.'],
                    typeSpeed: 50,
                    showCursor: false,
                    onComplete: () => {
                        document.getElementById("start-btn-container").style.display = "block";
                        gsap.fromTo("#start-btn-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
                    }
                });
            }, 500);
        }
    });
    
    // تشغيل الأغنية إجبارياً بعد نقرة المستخدم
    const startBtn = document.getElementById("start-journey-btn");
    if(startBtn) {
        startBtn.addEventListener("click", () => {
            const splash = document.getElementById("splash-screen");
            const audio = document.getElementById("romantic-audio");
            const musicBtn = document.getElementById("music-toggle");
            const musicIcon = document.getElementById("music-icon");

            if(audio) {
                audio.volume = 1.0;
                audio.play().then(() => {
                    musicBtn.classList.add("playing");
                    musicIcon.className = "fas fa-pause";
                }).catch(e => console.log("Audio presentation postponed:", e));
            }

            gsap.to(splash, {
                opacity: 0,
                scale: 1.1,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                    splash.style.display = "none";
                    AOS.init({ duration: 1000, once: true });
                }
            });
        });
    }

    initMusicControls(); 
    initThreeJSScene();  
    initLiveCounters();  
    initSurpriseButton(); 
});

function initMusicControls() {
    const audio = document.getElementById("romantic-audio");
    const musicBtn = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");

    if(!musicBtn || !audio) return;

    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add("playing");
            musicIcon.className = "fas fa-pause";
        } else {
            audio.pause();
            musicBtn.classList.remove("playing");
            musicIcon.className = "fas fa-play";
        }
    });
}

// ==========================================
// 🛠️ محرك الـ 3D للقلب والأحرف الخلفية للواجهة
// ==========================================
let scene, camera, renderer, heartMesh, letterW, letterA;


function initThreeJSScene() {
    const container = document.getElementById('heart-3d-container');
    if(!container) return;

    // كشف ما إذا كان المستخدم يستخدم هاتفاً
    const isMobile = window.innerWidth < 768;
    
    // تعديل المسافة بناءً على الجهاز (في الهاتف نبتعد بالكاميرا قليلاً)
    const cameraZ = isMobile ? 130 : 85;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = cameraZ; 

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xff758c, 1.6);
    dirLight.position.set(0, 60, 120);
    scene.add(dirLight);

    // ... [كود إنشاء القلب والأحرف يبقى كما هو] ...
    const heartShape = new THREE.Shape();
    heartShape.moveTo( 25, 25 );
    heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    heartShape.bezierCurveTo( -30, 0, -30, 35, -30, 35 );
    heartShape.bezierCurveTo( -30, 55, -10, 77, 25, 95 );
    heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

    const extrudeSettings = { depth: 12, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 2, bevelThickness: 2 };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    const luxuryMaterial = new THREE.MeshStandardMaterial({ color: 0xd6133d, roughness: 0.15, metalness: 0.5, emissive: 0x2b0004 });
    heartMesh = new THREE.Mesh(heartGeo, luxuryMaterial);
    heartMesh.rotation.x = Math.PI; 
    
    // تعديل حجم القلب للأجهزة المختلفة
    const scaleFactor = isMobile ? 0.3 : 0.4;
    heartMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.add(heartMesh);

    // مجسم حرف W
    const wShape = new THREE.Shape();
    wShape.moveTo(-15, 15); wShape.lineTo(-10, -15); wShape.lineTo(-4, -15); wShape.lineTo(0, -3); wShape.lineTo(4, -15); wShape.lineTo(10, -15); wShape.lineTo(15, 15); wShape.lineTo(9, 15); wShape.lineTo(6, -6); wShape.lineTo(2, 6); wShape.lineTo(-2, 6); wShape.lineTo(-6, -6); wShape.lineTo(-9, 15); wShape.closePath();

    const letterGeoW = new THREE.ExtrudeGeometry(wShape, { depth: 5, bevelEnabled: true, bevelSize: 1, bevelThickness: 1 });
    letterGeoW.center();
    const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 });
    letterW = new THREE.Mesh(letterGeoW, goldMaterial);
    letterW.position.set(isMobile ? -30 : -36, 0, 2); // تقريب الأحرف قليلاً في الموبايل
    letterW.scale.set(scaleFactor * 1.6, scaleFactor * 1.6, scaleFactor * 1.6);
    scene.add(letterW);

    // مجسم حرف A
    const aShape = new THREE.Shape();
    aShape.moveTo(-14, -15); aShape.lineTo(0, 15); aShape.lineTo(14, -15); aShape.lineTo(6, -15); aShape.lineTo(3, -6); aShape.lineTo(-3, -6); aShape.lineTo(-6, -15); aShape.closePath();
    const holePath = new THREE.Path();
    holePath.moveTo(0, 5); holePath.lineTo(2, -1); holePath.lineTo(-2, -1); holePath.closePath();
    aShape.holes.push(holePath);

    const letterGeoA = new THREE.ExtrudeGeometry(aShape, { depth: 5, bevelEnabled: true, bevelSize: 1, bevelThickness: 1 });
    letterGeoA.center();
    const roseMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.2, metalness: 0.7 });
    letterA = new THREE.Mesh(letterGeoA, roseMaterial);
    letterA.position.set(isMobile ? 30 : 36, 0, 2); // تقريب الأحرف قليلاً في الموبايل
    letterA.scale.set(scaleFactor * 1.6, scaleFactor * 1.6, scaleFactor * 1.6);
    scene.add(letterA);

    // ... [باقي دالة الـ animate تبقى كما هي] ...
    let clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        let time = clock.getElapsedTime();
        if(heartMesh) heartMesh.rotation.y = Math.sin(time * 0.5) * 0.25; 
        if(letterW) {
            letterW.rotation.y = Math.sin(time * 0.5) * 0.25;
            letterW.position.y = Math.sin(time * 1.5) * 2;
        }
        if(letterA) {
            letterA.rotation.y = Math.sin(time * 0.5) * 0.25;
            letterA.position.y = Math.sin(time * 1.5 + Math.PI) * 2;
        }
        let pulse = 1 + Math.sin(time * 2.5) * 0.04;
        heartMesh.scale.set(pulse * scaleFactor, pulse * scaleFactor, pulse * scaleFactor);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// ==========================================
// 🖼️ دوال الـ Lightbox الذكية لدعم الصور والفيديو معاً
// ==========================================
function openLightbox(element) {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const modalVideo = document.getElementById("lightbox-video");
    
    if (!modal) return;

    // تصفير وعرض العناصر بناءً على النوع المستهدف داخل الحاوية المفتوحة
    modalImg.style.display = "none";
    modalVideo.style.display = "none";
    modalVideo.pause();

    const img = element.querySelector("img");
    const video = element.querySelector("video");

    if (img) {
        modalImg.src = img.src;
        modalImg.style.display = "block";
    } else if (video) {
        modalVideo.src = video.src;
        modalVideo.style.display = "block";
        modalVideo.play(); // تشغيل تلقائي داخل التكبير لعرض سينمائي
    }

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
}

function closeLightbox() {
    const modal = document.getElementById("lightbox-modal");
    const modalVideo = document.getElementById("lightbox-video");
    if (modal) {
        if(modalVideo) modalVideo.pause();
        modal.classList.remove("active");
        setTimeout(() => modal.style.display = "none", 300);
    }
}

// ==========================================
// 💥 تشغيل زر المفاجأة المطور لتوليد البطاقات والعبارات ديناميكياً
// ==========================================
function initSurpriseButton() {
    const btn = document.getElementById("ultimate-love-btn");
    const container = document.getElementById("floating-popups-container");
    if(!btn || !container) return;

    btn.addEventListener("click", () => {
        // 1. إطلاق زينة الفراقيع الملونة كالمعتاد
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

        // 2. اختيار عشوائي للعبارة والمحطة التاريخية الموثقة
        const randomPhrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
        const randomMilestone = importantDates[Math.floor(Math.random() * importantDates.length)];
        
        // تنسيق التاريخ لعرضه بشكل لطيف ومقروء بالبطاقة الطائرة
        const dateObj = new Date(randomMilestone.date);
        const formattedDate = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

        // 3. إنشاء كارت بوب اب فخم طاير في الشاشة بـ تأثير ثري دي
        const popupCard = document.createElement("div");
        popupCard.className = "surprise-card-popup";
        
        popupCard.innerHTML = `
            <div class="popup-heart-3d">❤️</div>
            <div class="popup-initials">W & A</div>
            <p class="popup-text">"${randomPhrase}"</p>
            <div class="popup-date">📍 ${randomMilestone.title}: ${formattedDate}</div>
        `;

        // إضافة الكارت المنبثق للواجهة
        container.appendChild(popupCard);

        // 4. تحريك الكارت باستخدام مكتبة GSAP بشكل درامي فاخر ثم مسحه
        gsap.fromTo(popupCard, 
            { opacity: 0, scale: 0.5, y: 50 }, 
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );

        // اختفاء بنعومة ومسح التاق تماماً من المتصفح لعدم إثقال الرامات عند النقر المكرر المتتالي
        gsap.to(popupCard, {
            opacity: 0,
            scale: 0.8,
            y: -80,
            delay: 3.5,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
                popupCard.remove();
            }
        });
    });
}