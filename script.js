// ===== المتغيرات العامة =====
let scene, camera, renderer, heartMesh, letterW, letterA;
let container, isMobile = window.innerWidth < 768;

const importantDates = [
    { title: "بداية الحب", date: "2026-01-01T18:00:00", icon: "fa-heart" },
    { title: "تاريخ الزواج", date: "2026-06-26T16:00:00", icon: "fa-ring" },
    { title: "أول لقاء", date: "2026-05-14T15:30:00", icon: "fa-rose" },
    { title: "تحليل الدم", date: "2026-05-18T10:00:00", icon: "fa-droplet" },
    { title: "أول رسالة", date: "2025-12-26T20:22:00", icon: "fa-envelope" },
    { title: "أول مكالمة", date: "2026-01-20T20:05:00", icon: "fa-phone" },
    { title: "الخطوبة", date: "2026-05-18T17:00:00", icon: "fa-certificate" },
    { title: "عيد ميلادها", date: "2027-05-18T00:00:00", icon: "fa-cake-candles" },
    { title: "عيد ميلادي", date: "2027-04-23T00:00:00", icon: "fa-gift" }
];

const romanticPhrases = [
    "أنتِ اللحظة الحية في قلبي، خُلقتُ لأحميكِ بجسدي وروحي W❤️A.",
    "وإن سألوني عن وطني وأماني؟ سأشير لعظام صدرك وعينيكِ الحوراوين W❤️A.",
    "حبكِ كالعُمر الفخم الحقيقي، لا يتكرر في التاريخ مرتين W❤️A.",
    "في كل نبضة يتجدد عهدي الأبدي لكِ W❤️A.",
    "وجودكِ بجانبي يجعلني أقوى رجل في الكون W❤️A.",
    "عسى النصيب يصيب واشوفك حلالي والحمد لله W❤️A 2026/6/26."
];

// ===== تشغيل عند تحميل الصفحة =====
document.addEventListener("DOMContentLoaded", () => {
    // الكتابة التلقائية
    try {
        new Typed('#typewriter-text-1', {
            strings: ['مرحباً بحبيبتي وزوجتي ❤️'],
            typeSpeed: 60,
            showCursor: false,
            onComplete: () => {
                setTimeout(() => {
                    new Typed('#typewriter-text-2', {
                        strings: ['هذه ليست مجرد صفحة... إنها قصة حياتنا من 2025/12/26 إلى 2026/6/26 💍❤️'],
                        typeSpeed: 45,
                        showCursor: false,
                        onComplete: () => {
                            const btn = document.getElementById("start-btn-container");
                            if (btn) {
                                btn.style.display = "block";
                                gsap.fromTo(btn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 });
                            }
                        }
                    });
                }, 400);
            }
        });
    } catch(e) { console.log("Typed error"); }

    // زر البداية
    const startBtn = document.getElementById("start-journey-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const splash = document.getElementById("splash-screen");
            const audio = document.getElementById("romantic-audio");
            const musicBtn = document.getElementById("music-toggle");
            const icon = document.getElementById("music-icon");

            if (audio) {
                audio.play().then(() => {
                    if (musicBtn) musicBtn.classList.add("playing");
                    if (icon) icon.className = "fas fa-pause";
                }).catch(() => {});
            }

            if (splash) {
                gsap.to(splash, { opacity: 0, duration: 1, onComplete: () => {
                    splash.style.display = "none";
                    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
                }});
            }
        });
    }

    // تشغيل الوظائف
    try { initMusicControls(); } catch(e) {}
    try { initSurpriseButton(); } catch(e) {}
    try { initLiveCounters(); } catch(e) {}
    try { initThreeJSScene(); } catch(e) {}
});

// ===== تحكم الموسيقى =====
function initMusicControls() {
    const audio = document.getElementById("romantic-audio");
    const btn = document.getElementById("music-toggle");
    const icon = document.getElementById("music-icon");
    if (!audio || !btn) return;

    btn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            btn.classList.add("playing");
            if (icon) icon.className = "fas fa-pause";
        } else {
            audio.pause();
            btn.classList.remove("playing");
            if (icon) icon.className = "fas fa-play";
        }
    });
}

// ===== زر المفاجأة =====
function initSurpriseButton() {
    const btn = document.getElementById("ultimate-love-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.5 } });
        }

        const popup = document.createElement("div");
        popup.className = "surprise-card-popup";
        const phrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
        popup.innerHTML = `<div class="popup-heart-3d">❤️</div><p class="popup-text">${phrase}</p>`;

        document.body.appendChild(popup);

        gsap.fromTo(popup, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4 });
        gsap.to(popup, { opacity: 0, y: -80, delay: 3.2, duration: 0.5, onComplete: () => popup.remove() });
    });
}

// ===== العدادات =====
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
            const el = document.getElementById(`ct-${idx}`);
            if (!el) return;
            const diff = new Date().getTime() - new Date(item.date).getTime();
            const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            el.innerHTML = `${diff > 0 ? "منذ" : "متبقي"} ${days} يوم`;
        });
    }, 1000);
}

// ===== مشهد 3D =====
function initThreeJSScene() {
    container = document.getElementById('heart-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    const updateSizes = () => {
        isMobile = window.innerWidth < 768;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (camera) {
            camera.aspect = w / h;
            camera.position.z = isMobile ? 130 : 85;
            camera.updateProjectionMatrix();
        }
        if (renderer) {
            renderer.setSize(w, h);
        }
    };

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.z = isMobile ? 130 : 85;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // إضاءة
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xff758c, 1.4);
    dirLight.position.set(0, 50, 100);
    scene.add(dirLight);

    // ===== القلب =====
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25, 25);
    heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    const extrudeSettings = { depth: 12, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 2, bevelThickness: 2 };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    const scaleFactor = isMobile ? 0.28 : 0.4;
    heartMesh = new THREE.Mesh(heartGeo, new THREE.MeshStandardMaterial({
        color: 0xd6133d,
        roughness: 0.2,
        metalness: 0.3,
        emissive: 0x1a0002
    }));
    heartMesh.rotation.x = Math.PI;
    heartMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    scene.add(heartMesh);

    // ===== الحروف =====
    const letterSettings = { depth: 5, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.8, bevelThickness: 0.8 };
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.7 });
    const roseMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.2, metalness: 0.6 });

    const offset = isMobile ? 28 : 42;
    const lScale = scaleFactor * 1.3;

    // حرف W
    const wShape = new THREE.Shape();
    wShape.moveTo(-15, 15); wShape.lineTo(-10, -15); wShape.lineTo(-4, -15);
    wShape.lineTo(0, -3); wShape.lineTo(4, -15); wShape.lineTo(10, -15);
    wShape.lineTo(15, 15); wShape.lineTo(9, 15); wShape.lineTo(6, -6);
    wShape.lineTo(2, 6); wShape.lineTo(-2, 6); wShape.lineTo(-6, -6);
    wShape.lineTo(-9, 15); wShape.closePath();

    const wGeo = new THREE.ExtrudeGeometry(wShape, letterSettings);
    wGeo.center();
    letterW = new THREE.Mesh(wGeo, goldMat);
    letterW.position.set(-offset, 0, 0);
    letterW.scale.set(lScale, lScale, lScale);
    scene.add(letterW);

    // حرف A
    const aShape = new THREE.Shape();
    aShape.moveTo(-14, -15); aShape.lineTo(0, 15); aShape.lineTo(14, -15);
    aShape.lineTo(6, -15); aShape.lineTo(3, -6); aShape.lineTo(-3, -6);
    aShape.lineTo(-6, -15); aShape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(0, 5); hole.lineTo(2, -1); hole.lineTo(-2, -1); hole.closePath();
    aShape.holes.push(hole);

    const aGeo = new THREE.ExtrudeGeometry(aShape, letterSettings);
    aGeo.center();
    letterA = new THREE.Mesh(aGeo, roseMat);
    letterA.position.set(offset, 0, 0);
    letterA.scale.set(lScale, lScale, lScale);
    scene.add(letterA);

    // ===== حلقة الحركة =====
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (heartMesh) {
            heartMesh.rotation.y = Math.sin(t * 0.4) * 0.12;
            const s = 1 + Math.sin(t * 2.2) * 0.025;
            heartMesh.scale.set(s * scaleFactor, s * scaleFactor, s * scaleFactor);
        }

        if (letterW) {
            letterW.rotation.y = t * 1.0;
            letterW.position.y = Math.sin(t * 1.8) * 1.2;
        }

        if (letterA) {
            letterA.rotation.y = t * 1.0;
            letterA.position.y = Math.sin(t * 1.8 + Math.PI) * 1.2;
        }

        renderer.render(scene, camera);
    }
    animate();

    // ===== إعادة الضبط عند تغيير الحجم =====
    window.addEventListener('resize', () => {
        updateSizes();
        const newMobile = window.innerWidth < 768;
        if (newMobile !== isMobile) {
            isMobile = newMobile;
            const newScale = isMobile ? 0.28 : 0.4;
            const newOffset = isMobile ? 28 : 42;
            const newLScale = newScale * 1.3;

            if (heartMesh) heartMesh.scale.set(newScale, newScale, newScale);
            if (letterW) {
                letterW.position.x = -newOffset;
                letterW.scale.set(newLScale, newLScale, newLScale);
            }
            if (letterA) {
                letterA.position.x = newOffset;
                letterA.scale.set(newLScale, newLScale, newLScale);
            }
        }
    });

    setTimeout(updateSizes, 150);
}

// ===== Lightbox =====
function openLightbox(el) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');

    const isVideo = el.querySelector('video') !== null;
    if (isVideo) {
        const v = el.querySelector('video');
        video.src = v.src;
        video.style.display = 'block';
        img.style.display = 'none';
        video.load();
        video.play();
    } else {
        const src = el.querySelector('img').src;
        img.src = src;
        img.style.display = 'block';
        video.style.display = 'none';
        video.pause();
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 20);
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const video = document.getElementById('lightbox-video');
    video.pause();
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}