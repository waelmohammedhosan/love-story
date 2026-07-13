// ===== المتغيرات العامة =====
let scene, camera, renderer, videoMesh, particles;
let container, isMobile = window.innerWidth < 768;
let animationId = null;
let isPageVisible = true;

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
    "أنتِ اللحظة الحية في قلبي، خُلقتُ لأحميكِ بجسدي وروحي ❤️",
    "وإن سألوني عن وطني وأماني؟ سأشير لعظام صدرك وعينيكِ الحوراوين ❤️",
    "حبكِ كالعُمر الفخم الحقيقي، لا يتكرر في التاريخ مرتين ❤️",
    "في كل نبضة يتجدد عهدي الأبدي لكِ ❤️",
    "وجودكِ بجانبي يجعلني أقوى رجل في الكون ❤️",
    "عسى النصيب يصيب واشوفك حلالي والحمد لله ❤️ 2026/6/26"
];

// ===== تشغيل عند تحميل الصفحة =====
document.addEventListener("DOMContentLoaded", () => {
    // الكتابة التلقائية
    try {
        new Typed('#typewriter-text-1', {
            strings: ['مرحباً بحبيبتي وزوجتي ❤️'],
            typeSpeed: 50,
            showCursor: false,
            onComplete: () => {
                setTimeout(() => {
                    new Typed('#typewriter-text-2', {
                        strings: ['هذه ليست مجرد صفحة... إنها قصة حياتنا من 2025/12/26 إلى 2026/6/26 💍❤️'],
                        typeSpeed: 40,
                        showCursor: false,
                        onComplete: () => {
                            const btn = document.getElementById("start-btn-container");
                            if (btn) {
                                btn.style.display = "block";
                                gsap.fromTo(btn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 });
                            }
                        }
                    });
                }, 300);
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
                gsap.to(splash, { opacity: 0, duration: 0.8, onComplete: () => {
                    splash.style.display = "none";
                    if (typeof AOS !== 'undefined') AOS.init({ duration: 600, once: true });
                }});
            }
        });
    }

    // تشغيل الوظائف
    try { initMusicControls(); } catch(e) {}
    try { initSurpriseButton(); } catch(e) {}
    try { initLiveCounters(); } catch(e) {}
    try { initThreeJSScene(); } catch(e) {}

    // إيقاف Three.js عندما تكون الصفحة غير مرئية
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
        if (!isPageVisible && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        } else if (isPageVisible && !animationId) {
            animateScene();
        }
    });
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
    const btn = document.getElementById("surprise-btn-new");
    if (!btn) return;

    btn.addEventListener("click", () => {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.5 } });
            setTimeout(() => {
                confetti({ particleCount: 80, spread: 50, origin: { y: 0.4, x: 0.2 } });
            }, 200);
            setTimeout(() => {
                confetti({ particleCount: 80, spread: 50, origin: { y: 0.4, x: 0.8 } });
            }, 400);
        }

        const popup = document.createElement("div");
        popup.className = "surprise-card-popup";
        const phrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
        popup.innerHTML = `
            <div class="popup-heart-3d">❤️</div>
            <p class="popup-text">${phrase}</p>
            <div style="margin-top:12px;font-size:2rem;">💍✨</div>
        `;

        document.body.appendChild(popup);

        gsap.fromTo(popup, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
        gsap.to(popup, { opacity: 0, y: -80, delay: 3.5, duration: 0.5, onComplete: () => popup.remove() });
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
        card.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <h3>${item.title}</h3>
            <div class="counter-time" id="ct-${idx}"></div>
        `;
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
    }, 5000);
}

// ===== مشهد 3D مع فيديو =====
function initThreeJSScene() {
    container = document.getElementById('heart-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    // تحديث isMobile
    isMobile = window.innerWidth < 768;

    const updateSizes = () => {
        isMobile = window.innerWidth < 768;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (camera) {
            camera.aspect = w / h;
            camera.position.z = isMobile ? 6 : 4.5;
            camera.updateProjectionMatrix();
        }
        if (renderer) {
            renderer.setSize(w, h);
        }
    };

    // إعداد المشهد
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.z = isMobile ? 6 : 4.5;

    // تقليل جودة العرض للهواتف
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.2) : Math.min(window.devicePixelRatio, 2);
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "low-power"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // إضاءة
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // ===== إنشاء فيديو كعنصر ثلاثي الأبعاد =====
    const video = document.createElement('video');
    video.src = 'love2002.mp4'; // استخدم MP4 بدلاً من GIF للأداء الأفضل
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.style.display = 'none';
    document.body.appendChild(video);

    // انتظر تحميل الفيديو
    video.addEventListener('loadeddata', () => {
        video.play().catch(() => {});
    });

    // إنشاء نسيج الفيديو
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // إنشاء سطح مستوي لعرض الفيديو
    const aspectRatio = 1; // افتراضي
    const geometry = new THREE.PlaneGeometry(3.2, 3.2);
    const material = new THREE.MeshBasicMaterial({
        map: videoTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
    });

    videoMesh = new THREE.Mesh(geometry, material);
    videoMesh.position.set(0, 0.2, 0);
    scene.add(videoMesh);

    // ===== إطار حول الفيديو =====
    const borderGeometry = new THREE.EdgesGeometry(geometry);
    const borderMaterial = new THREE.LineBasicMaterial({
        color: 0xff416c,
        transparent: true,
        opacity: 0.5
    });
    const border = new THREE.LineSegments(borderGeometry, borderMaterial);
    border.position.copy(videoMesh.position);
    scene.add(border);

    // ===== جسيمات متوهجة (عدد أقل للهواتف) =====
    const particleCount = isMobile ? 80 : 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        const radius = 2 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.sin(theta) * Math.cos(phi) * radius;
        positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * radius;
        positions[i * 3 + 2] = Math.cos(theta) * radius;
        sizes[i] = 0.02 + Math.random() * 0.04;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xff6b8a,
        size: isMobile ? 0.04 : 0.06,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ===== حلقة الحركة =====
    const clock = new THREE.Clock();
    let frameCount = 0;

    function animateScene() {
        if (!isPageVisible) {
            animationId = null;
            return;
        }
        animationId = requestAnimationFrame(animateScene);

        frameCount++;
        if (frameCount % 2 === 0) {
            const t = clock.getElapsedTime();

            if (videoMesh) {
                // دوران خفيف
                videoMesh.rotation.y = Math.sin(t * 0.2) * 0.08;
                videoMesh.rotation.x = Math.sin(t * 0.15) * 0.04;
                // نبض خفيف
                const scale = 1 + Math.sin(t * 1.2) * 0.015;
                videoMesh.scale.set(scale, scale, 1);
            }

            // تدوير الجسيمات
            if (particles) {
                particles.rotation.y = t * 0.04;
                particles.rotation.x = Math.sin(t * 0.02) * 0.05;
            }
        }

        renderer.render(scene, camera);
    }
    animateScene();

    // ===== تشغيل الفيديو =====
    setTimeout(() => {
        video.play().catch(() => {});
    }, 500);

    // ===== إعادة الضبط عند تغيير الحجم =====
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSizes();
            // تحديث حجم الجسيمات إذا تغيرت حالة الجوال
            const newMobile = window.innerWidth < 768;
            if (newMobile !== isMobile) {
                isMobile = newMobile;
                if (particles) {
                    particles.material.size = isMobile ? 0.04 : 0.06;
                }
            }
        }, 250);
    });

    setTimeout(updateSizes, 200);
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
    setTimeout(() => { modal.style.display = 'none'; }, 250);
}