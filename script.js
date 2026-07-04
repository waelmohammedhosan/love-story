// ==========================================
// 🛠️ الإعلان عن المتغيرات العامة (لتجنب أخطاء التعريف)
// ==========================================
let scene, camera, renderer, heartMesh, letterW, letterA;

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


const romanticPhrases = [
    "أنتِ اللحظة الحية في قلبي، خُلقتُ لأحميكِ بجسدي وروحي W❤️A.",
    " وإن سألوني عن وطني وأماني؟ سأشير لعظام صدرك وعينيكِ الحوراوين W❤️A.",
    "حبكِ كالعُمر الفخم الحقيقي، لا يتكرر في تاريخ البشرية مرتين W❤️A.",
    "في كل نبضة ودقة قلب يتجدد عهدي ووفائي الأبدي لكِ وعنكِ W❤️A.",
    "وجودكِ بجانبي يجعلني أقوى رجل في الكون، دمتِ لي عمراً لا ينتهي W❤️A.",
    "عسى النصيب يصيب واشوفك حلالي والحمد لله صرتي حلالي W❤️A 2026/6/26."

];

// ==========================================
// 🚀 التشغيل الرئيسي الآمن عند تحميل الصفحة
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. أنيميشن الترحيب
    try {
        new Typed('#typewriter-text-1', {
            strings: ['مرحباً بحبيبتي وزوجتي ❤️'],
            typeSpeed: 60, showCursor: false,
            onComplete: () => {
                setTimeout(() => {
                    new Typed('#typewriter-text-2', {
                        strings: ['هذه ليست مجرد صفحة... إنها قصة حياتنا وثنايا حبنا مخلدة من 2025/12/26 الى 2026/6/26 💍❤️'],
                        typeSpeed: 50, showCursor: false,
                        onComplete: () => {
                            const btnContainer = document.getElementById("start-btn-container");
                            if(btnContainer) {
                                btnContainer.style.display = "block";
                                gsap.fromTo("#start-btn-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
                            }
                        }
                    });
                }, 500);
            }
        });

        

    } catch(e) { console.log("Typed.js configuration skipped or missing element"); }

    // 2. تفعيل الصوت والبداية
    const startBtn = document.getElementById("start-journey-btn");
    if(startBtn) {
        startBtn.addEventListener("click", () => {
            const splash = document.getElementById("splash-screen");
            const audio = document.getElementById("romantic-audio");
            const musicBtn = document.getElementById("music-toggle");
            const musicIcon = document.getElementById("music-icon");

            if(audio) {
                audio.play().then(() => {
                    if(musicBtn) musicBtn.classList.add("playing");
                    if(musicIcon) musicIcon.className = "fas fa-pause";
                }).catch(e => console.log("Audio audio play standard restriction triggered"));
            }

            if(splash) {
                gsap.to(splash, { opacity: 0, duration: 1.2, onComplete: () => {
                    splash.style.display = "none";
                    if(typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
                }});
            }
        });
    }

    

    // تشغيل الميزات بشكل معزول تماماً لضمان عدم توقف الصفحة
    try { initMusicControls(); } catch(err) { console.error("Music error:", err); }
    try { initSurpriseButton(); } catch(err) { console.error("Surprise button error:", err); }
    try { initLiveCounters(); } catch(err) { console.error("Counters error:", err); }
    try { initThreeJSScene(); } catch(err) { console.error("ThreeJS error:", err); }
});

// ==========================================
// 🎵 التحكم بالموسيقى
// ==========================================
function initMusicControls() {
    const audio = document.getElementById("romantic-audio");
    const musicBtn = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    if(!audio || !musicBtn) return;

    musicBtn.addEventListener("click", () => {
        if (audio.paused) { 
            audio.play(); 
            musicBtn.classList.add("playing"); 
            if(musicIcon) musicIcon.className = "fas fa-pause"; 
        } else { 
            audio.pause(); 
            musicBtn.classList.remove("playing"); 
            if(musicIcon) musicIcon.className = "fas fa-play"; 
        }
    });
}

// ==========================================
// 🎁 زر المفاجأة (يعمل الآن بشكل مستقل ومضمون)
// ==========================================
function initSurpriseButton() {
    const surpriseBtn = document.getElementById("ultimate-love-btn");
    if(!surpriseBtn) return;

    surpriseBtn.addEventListener("click", () => {
        // تشغيل تأثير القصاصات الملونة إذا كانت المكتبة محملة
        if(typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
        
        // إنشاء الكرت المنبثق للعبارة الرومانسية
        const popup = document.createElement("div");
        popup.className = "surprise-card-popup";
        
        // اختيار عبارة عشوائية فخمة
        const randomPhrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
        popup.innerHTML = `<div class="popup-heart-3d">❤️</div><p class="popup-text">${randomPhrase}</p>`;
        
        document.body.appendChild(popup);
        
        // تحريك الكرت للاختفاء بعد 4 ثوانٍ
        gsap.fromTo(popup, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 });
        gsap.to(popup, { opacity: 0, y: -100, delay: 3.5, duration: 0.5, onComplete: () => popup.remove() });
    });
}

// ==========================================
// ⏳ العدادات التنازلية
// ==========================================
function initLiveCounters() {
    const grid = document.getElementById("counters-grid");
    if(!grid) return;
    
    grid.innerHTML = ""; // تنظيف الشبكة
    importantDates.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "counter-card";
        card.innerHTML = `<i class="fas ${item.icon}"></i><h3>${item.title}</h3><div class="counter-time" id="ct-${idx}"></div>`;
        grid.appendChild(card);
    });
    
    setInterval(() => {
        importantDates.forEach((item, idx) => {
            const element = document.getElementById(`ct-${idx}`);
            if(!element) return;
            const diff = new Date().getTime() - new Date(item.date).getTime();
            const d = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            element.innerHTML = `${diff > 0 ? "منذ" : "متبقي"} ${d} يوم`;
        });
    }, 1000);
}

// ==========================================
// 🧊 محرك 3D المتجاوب - الأحرف تدور حول نفسها في مكانها
// ==========================================
function initThreeJSScene() {
    const container = document.getElementById('heart-3d-container');
    if(!container || typeof THREE === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    // ضبط مسافة الكاميرا لتناسب وقوف الأحرف بجانب القلب
    const cameraZ = isMobile ? 120 : 85; 
    const scaleFactor = isMobile ? 0.3 : 0.4;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = cameraZ; 

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // تنظيف الحاوية
    container.innerHTML = ""; 
    container.appendChild(renderer.domElement);

    // الإضاءة
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xff758c, 1.6);
    dirLight.position.set(0, 60, 120);
    scene.add(dirLight);

    // 1. مجسم القلب
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25,25); heartShape.bezierCurveTo(25,25,20,0,0,0); heartShape.bezierCurveTo(-30,0,-30,35,-30,35); heartShape.bezierCurveTo(-30,55,-10,77,25,95); heartShape.bezierCurveTo(60,77,80,55,80,35); heartShape.bezierCurveTo(80,35,80,0,50,0); heartShape.bezierCurveTo(35,0,25,25,25,25);
    
    const extrudeSettings = { depth: 12, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 2, bevelThickness: 2 };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();
    
    heartMesh = new THREE.Mesh(heartGeo, new THREE.MeshStandardMaterial({ 
        color: 0xd6133d, roughness: 0.15, metalness: 0.4, emissive: 0x1a0002 
    }));
    heartMesh.rotation.x = Math.PI;
    heartMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.add(heartMesh);

    // إعدادات الأحرف
    const letterSettings = { depth: 5, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.8, bevelThickness: 0.8 };
    const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 }); 
    const roseMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.2, metalness: 0.7 });

    // تحديد مسافة بعد الأحرف عن القلب (يمين ويسار)
    const letterXOffset = isMobile ? 32 : 42;

    // 2. مجسم حرف W (ثابت على اليسار)
    const wShape = new THREE.Shape();
    wShape.moveTo(-15, 15); wShape.lineTo(-10, -15); wShape.lineTo(-4, -15); wShape.lineTo(0, -3); wShape.lineTo(4, -15); wShape.lineTo(10, -15); wShape.lineTo(15, 15); wShape.lineTo(9, 15); wShape.lineTo(6, -6); wShape.lineTo(2, 6); wShape.lineTo(-2, 6); wShape.lineTo(-6, -6); wShape.lineTo(-9, 15); wShape.closePath();
    
    const letterGeoW = new THREE.ExtrudeGeometry(wShape, letterSettings);
    letterGeoW.center(); // ضروري جداً لكي يدور الحرف حول مركزه
    letterW = new THREE.Mesh(letterGeoW, goldMaterial);
    letterW.position.set(-letterXOffset, 0, 0); // تثبيت المكان يساراً
    letterW.scale.set(scaleFactor * 1.4, scaleFactor * 1.4, scaleFactor * 1.4);
    scene.add(letterW);

    // 3. مجسم حرف A (ثابت على اليمين)
    const aShape = new THREE.Shape();
    aShape.moveTo(-14, -15); aShape.lineTo(0, 15); aShape.lineTo(14, -15); aShape.lineTo(6, -15); aShape.lineTo(3, -6); aShape.lineTo(-3, -6); aShape.lineTo(-6, -15); aShape.closePath();
    
    const holePath = new THREE.Path();
    holePath.moveTo(0, 5); holePath.lineTo(2, -1); holePath.lineTo(-2, -1); holePath.closePath();
    aShape.holes.push(holePath);
    
    const letterGeoA = new THREE.ExtrudeGeometry(aShape, letterSettings);
    letterGeoA.center(); // ضروري جداً لكي يدور الحرف حول مركزه
    letterA = new THREE.Mesh(letterGeoA, roseMaterial);
    letterA.position.set(letterXOffset, 0, 0); // تثبيت المكان يميناً
    letterA.scale.set(scaleFactor * 1.4, scaleFactor * 1.4, scaleFactor * 1.4);
    scene.add(letterA);

    // ==========================================
    // 🔄 حلقة الأنيميشن (الدوران في المكان)
    // ==========================================
    let clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        let time = clock.getElapsedTime();
        
        // نبض وتمايل القلب بهدوء
        if(heartMesh) {
            heartMesh.rotation.y = Math.sin(time * 0.5) * 0.15;
            let pulse = 1 + Math.sin(time * 2.5) * 0.03;
            heartMesh.scale.set(pulse * scaleFactor, pulse * scaleFactor, pulse * scaleFactor);
        }

        // دوران حرف W حول نفسه في مكانه
        if(letterW) {
            letterW.rotation.y = time * 1.2; // سرعة الدوران حول نفسه
            letterW.position.y = Math.sin(time * 2) * 1.5; // طفو خفيف للأعلى والأسفل
        }

        // دوران حرف A حول نفسه في مكانه
        if(letterA) {
            letterA.rotation.y = time * 1.2; // سرعة الدوران حول نفسه
            letterA.position.y = Math.sin(time * 2 + Math.PI) * 1.5; // طفو خفيف عكسي
        }

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if(!container || !camera || !renderer) return;
        const isMobileNow = window.innerWidth < 768;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.position.z = isMobileNow ? 120 : 85;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}