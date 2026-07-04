// ==========================================
// 🛠️ الإعلان عن المتغيرات العامة
// ==========================================
let scene, camera, renderer, heartMesh, letterW, letterA;
let container, isMobile = window.innerWidth < 768;

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
    "وإن سألوني عن وطني وأماني؟ سأشير لعظام صدرك وعينيكِ الحوراوين W❤️A.",
    "حبكِ كالعُمر الفخم الحقيقي، لا يتكرر في تاريخ البشرية مرتين W❤️A.",
    "في كل نبضة ودقة قلب يتجدد عهدي ووفائي الأبدي لكِ وعنكِ W❤️A.",
    "وجودكِ بجانبي يجعلني أقوى رجل في الكون، دمتِ لي عمراً لا ينتهي W❤️A.",
    "عسى النصيب يصيب واشوفك حلالي والحمد لله صرتي حلالي W❤️A 2026/6/26."
];

// ==========================================
// 🚀 التشغيل الرئيسي
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. أنيميشن الترحيب
    try {
        new Typed('#typewriter-text-1', {
            strings: ['مرحباً بحبيبتي وزوجتي ❤️'],
            typeSpeed: 60,
            showCursor: false,
            onComplete: () => {
                setTimeout(() => {
                    new Typed('#typewriter-text-2', {
                        strings: ['هذه ليست مجرد صفحة... إنها قصة حياتنا وثنايا حبنا مخلدة من 2025/12/26 إلى 2026/6/26 💍❤️'],
                        typeSpeed: 50,
                        showCursor: false,
                        onComplete: () => {
                            const btnContainer = document.getElementById("start-btn-container");
                            if (btnContainer) {
                                btnContainer.style.display = "block";
                                gsap.fromTo("#start-btn-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
                            }
                        }
                    });
                }, 500);
            }
        });
    } catch (e) { console.log("Typed.js configuration skipped"); }

    // 2. تفعيل الصوت والبداية
    const startBtn = document.getElementById("start-journey-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const splash = document.getElementById("splash-screen");
            const audio = document.getElementById("romantic-audio");
            const musicBtn = document.getElementById("music-toggle");
            const musicIcon = document.getElementById("music-icon");

            if (audio) {
                audio.play().then(() => {
                    if (musicBtn) musicBtn.classList.add("playing");
                    if (musicIcon) musicIcon.className = "fas fa-pause";
                }).catch(e => console.log("Audio play restricted"));
            }

            if (splash) {
                gsap.to(splash, { opacity: 0, duration: 1.2, onComplete: () => {
                    splash.style.display = "none";
                    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
                } });
            }
        });
    }

    // تشغيل الميزات
    try { initMusicControls(); } catch (err) { console.error("Music error:", err); }
    try { initSurpriseButton(); } catch (err) { console.error("Surprise button error:", err); }
    try { initLiveCounters(); } catch (err) { console.error("Counters error:", err); }
    try { initThreeJSScene(); } catch (err) { console.error("ThreeJS error:", err); }
});

// ==========================================
// 🎵 التحكم بالموسيقى
// ==========================================
function initMusicControls() {
    const audio = document.getElementById("romantic-audio");
    const musicBtn = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    if (!audio || !musicBtn) return;

    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add("playing");
            if (musicIcon) musicIcon.className = "fas fa-pause";
        } else {
            audio.pause();
            musicBtn.classList.remove("playing");
            if (musicIcon) musicIcon.className = "fas fa-play";
        }
    });
}

// ==========================================
// 🎁 زر المفاجأة
// ==========================================
function initSurpriseButton() {
    const surpriseBtn = document.getElementById("ultimate-love-btn");
    if (!surpriseBtn) return;

    surpriseBtn.addEventListener("click", () => {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }

        const popup = document.createElement("div");
        popup.className = "surprise-card-popup";
        const randomPhrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
        popup.innerHTML = `<div class="popup-heart-3d">❤️</div><p class="popup-text">${randomPhrase}</p>`;

        document.body.appendChild(popup);

        gsap.fromTo(popup, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 });
        gsap.to(popup, { opacity: 0, y: -100, delay: 3.5, duration: 0.5, onComplete: () => popup.remove() });
    });
}

// ==========================================
// ⏳ العدادات التنازلية
// ==========================================
function initLiveCounters() {
    const grid = document.getElementById("counters-grid");
    if (!grid) return;

    grid.innerHTML = "";
    importantDates.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "counter-card";
        card.innerHTML = `<i class="fas ${item.icon}"></i><h3>${item.title}</h3><div class="counter-time" id="ct-${idx}"></div>`;
        grid.appendChild(card);
    });

    setInterval(() => {
        importantDates.forEach((item, idx) => {
            const element = document.getElementById(`ct-${idx}`);
            if (!element) return;
            const diff = new Date().getTime() - new Date(item.date).getTime();
            const d = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            element.innerHTML = `${diff > 0 ? "منذ" : "متبقي"} ${d} يوم`;
        });
    }, 1000);
}

// ==========================================
// 🧊 محرك 3D المتجاوب مع إعادة ضبط ديناميكية
// ==========================================
function initThreeJSScene() {
    container = document.getElementById('heart-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    // تحديد الإعدادات بناءً على حجم الشاشة
    const updateSizes = () => {
        isMobile = window.innerWidth < 768;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (camera) {
            camera.aspect = w / h;
            camera.position.z = isMobile ? 120 : 85;
            camera.updateProjectionMatrix();
        }
        if (renderer) {
            renderer.setSize(w, h);
        }
    };

    // إعداد المشهد
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = isMobile ? 120 : 85;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // الإضاءة
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xff758c, 1.6);
    dirLight.position.set(0, 60, 120);
    scene.add(dirLight);

    // 1. مجسم القلب
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25, 25);
    heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    const extrudeSettings = { depth: 12, bevelEnabled: true, bevelSegments: 6, steps: 2, bevelSize: 2, bevelThickness: 2 };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    heartMesh = new THREE.Mesh(heartGeo, new THREE.MeshStandardMaterial({
        color: 0xd6133d,
        roughness: 0.15,
        metalness: 0.4,
        emissive: 0x1a0002
    }));
    heartMesh.rotation.x = Math.PI;
    const scaleFactor = isMobile ? 0.3 : 0.4;
    heartMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.add(heartMesh);

    // إعدادات الأحرف
    const letterSettings = { depth: 5, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.8, bevelThickness: 0.8 };
    const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.8 });
    const roseMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.2, metalness: 0.7 });

    const letterXOffset = isMobile ? 32 : 42;

    // 2. حرف W
    const wShape = new THREE.Shape();
    wShape.moveTo(-15, 15);
    wShape.lineTo(-10, -15);
    wShape.lineTo(-4, -15);
    wShape.lineTo(0, -3);
    wShape.lineTo(4, -15);
    wShape.lineTo(10, -15);
    wShape.lineTo(15, 15);
    wShape.lineTo(9, 15);
    wShape.lineTo(6, -6);
    wShape.lineTo(2, 6);
    wShape.lineTo(-2, 6);
    wShape.lineTo(-6, -6);
    wShape.lineTo(-9, 15);
    wShape.closePath();

    const letterGeoW = new THREE.ExtrudeGeometry(wShape, letterSettings);
    letterGeoW.center();
    letterW = new THREE.Mesh(letterGeoW, goldMaterial);
    letterW.position.set(-letterXOffset, 0, 0);
    letterW.scale.set(scaleFactor * 1.4, scaleFactor * 1.4, scaleFactor * 1.4);
    scene.add(letterW);

    // 3. حرف A
    const aShape = new THREE.Shape();
    aShape.moveTo(-14, -15);
    aShape.lineTo(0, 15);
    aShape.lineTo(14, -15);
    aShape.lineTo(6, -15);
    aShape.lineTo(3, -6);
    aShape.lineTo(-3, -6);
    aShape.lineTo(-6, -15);
    aShape.closePath();

    const holePath = new THREE.Path();
    holePath.moveTo(0, 5);
    holePath.lineTo(2, -1);
    holePath.lineTo(-2, -1);
    holePath.closePath();
    aShape.holes.push(holePath);

    const letterGeoA = new THREE.ExtrudeGeometry(aShape, letterSettings);
    letterGeoA.center();
    letterA = new THREE.Mesh(letterGeoA, roseMaterial);
    letterA.position.set(letterXOffset, 0, 0);
    letterA.scale.set(scaleFactor * 1.4, scaleFactor * 1.4, scaleFactor * 1.4);
    scene.add(letterA);

    // ==========================================
    // 🔄 حلقة الأنيميشن
    // ==========================================
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        if (heartMesh) {
            heartMesh.rotation.y = Math.sin(time * 0.5) * 0.15;
            const pulse = 1 + Math.sin(time * 2.5) * 0.03;
            const s = pulse * scaleFactor;
            heartMesh.scale.set(s, s, s);
        }

        if (letterW) {
            letterW.rotation.y = time * 1.2;
            letterW.position.y = Math.sin(time * 2) * 1.5;
        }

        if (letterA) {
            letterA.rotation.y = time * 1.2;
            letterA.position.y = Math.sin(time * 2 + Math.PI) * 1.5;
        }

        renderer.render(scene, camera);
    }
    animate();

    // تحديث الحجم عند تغيير النافذة
    window.addEventListener('resize', () => {
        updateSizes();
        // إعادة ضبط مقياس وموضع الحروف إذا تغيرت حالة الجوال
        const newMobile = window.innerWidth < 768;
        if (newMobile !== isMobile) {
            isMobile = newMobile;
            const newScale = isMobile ? 0.3 : 0.4;
            const newOffset = isMobile ? 32 : 42;
            if (heartMesh) {
                const s = newScale;
                heartMesh.scale.set(s, s, s);
            }
            if (letterW) {
                letterW.position.x = -newOffset;
                const s = newScale * 1.4;
                letterW.scale.set(s, s, s);
            }
            if (letterA) {
                letterA.position.x = newOffset;
                const s = newScale * 1.4;
                letterA.scale.set(s, s, s);
            }
        }
    });

    // تحديث أولي بعد ظهور العنصر
    setTimeout(updateSizes, 100);
}

// ==========================================
// 🖼️ فتح وإغلاق Lightbox (لم نغيره)
// ==========================================
function openLightbox(element) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');

    const isVideo = element.querySelector('video') !== null;
    if (isVideo) {
        const vid = element.querySelector('video');
        video.src = vid.src;
        video.style.display = 'block';
        img.style.display = 'none';
        video.load();
        video.play();
    } else {
        const imgSrc = element.querySelector('img').src;
        img.src = imgSrc;
        img.style.display = 'block';
        video.style.display = 'none';
        video.pause();
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const video = document.getElementById('lightbox-video');
    video.pause();
    modal.style.display = 'none';
    modal.classList.remove('active');
}