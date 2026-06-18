(function() {
  'use strict';

  const canvas  = document.getElementById('bottleCanvas');
  const hero    = document.getElementById('bottleHero');
  if (!canvas || !hero) return;

  // ── SCENE SETUP ──────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  function resize() {
    const W = hero.clientWidth;
    const H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ── LIGHTS ───────────────────────────────────────────────────
  // Warm key light from front-left
  const keyLight = new THREE.DirectionalLight(0xFFF5E6, 2.2);
  keyLight.position.set(-4, 6, 8);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Cool rim light from back-right — gives glass/plastic edge glow
  const rimLight = new THREE.DirectionalLight(0xC8E8FF, 1.4);
  rimLight.position.set(5, 3, -6);
  scene.add(rimLight);

  // Soft fill from below
  const fillLight = new THREE.DirectionalLight(0xFFFFFF, 0.4);
  fillLight.position.set(0, -4, 4);
  scene.add(fillLight);

  // Ambient
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.35));

  // ── MATERIALS ────────────────────────────────────────────────
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  // White HDPE-like plastic — slightly translucent, soft sheen
  const bottleMat = new THREE.MeshPhysicalMaterial({
    color:       0xF8F8F8,
    roughness:   0.18,
    metalness:   0.0,
    transmission: 0.08,   // slight translucency
    thickness:    0.5,
    reflectivity: 0.3,
    clearcoat:    0.6,
    clearcoatRoughness: 0.1,
  });

  // Label band — orange EVYP colour
  const labelMat = new THREE.MeshPhysicalMaterial({
    color:     0xE8631A,
    roughness: 0.55,
    metalness: 0.05,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  });

  // Cap — slightly darker white, matte
  const capMat = new THREE.MeshStandardMaterial({
    color:     0xEAEAEA,
    roughness: 0.7,
    metalness: 0.0,
  });

  // ── LOAD OBJ ─────────────────────────────────────────────────
  let bottleGroup = null;
  let autoRotate  = true;
  const loader    = new THREE.OBJLoader();

  loader.load(
    'models/bottle.obj',
    function(obj) {
      // The model is Z-up, ~13.8 units tall, centred XY
      // Rotate to Y-up, scale to fit nicely
      obj.rotation.x = -Math.PI / 2;  // Z-up → Y-up

      // Compute bounding box after rotation to find scale
      const box    = new THREE.Box3().setFromObject(obj);
      const size   = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 5.5 / maxDim;  // normalise to ~5.5 units tall

      obj.scale.setScalar(scale);

      // Re-centre after scale
      const box2   = new THREE.Box3().setFromObject(obj);
      const centre2 = box2.getCenter(new THREE.Vector3());
      obj.position.sub(centre2);
      obj.position.y -= 0.3;  // nudge slightly down

      // Assign materials — analyse vertex Y position to split cap/body/label
      obj.traverse(child => {
        if (child.isMesh) {
          child.castShadow    = true;
          child.receiveShadow = true;
          // Default: bottle body
          child.material = bottleMat.clone();
        }
      });

      // Apply label band via a separate cylinder overlay
      const box3   = new THREE.Box3().setFromObject(obj);
      const height = box3.max.y - box3.min.y;
      const labelH = height * 0.42;
      const labelY = box3.min.y + height * 0.22;

      const labelGeo = new THREE.CylinderGeometry(0.98, 1.02, labelH, 64);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = labelY + labelH / 2;
      labelMesh.castShadow = true;

      bottleGroup = new THREE.Group();
      bottleGroup.add(obj);
      bottleGroup.add(labelMesh);
      scene.add(bottleGroup);

      // Offset to right half of canvas on desktop
      repositionBottle();
    },
    undefined,
    function(err) {
      console.warn('OBJ load error:', err);
    }
  );

  function repositionBottle() {
    if (!bottleGroup) return;
    const W = hero.clientWidth;
    // On wide screens push bottle to the right
    bottleGroup.position.x = W > 600 ? 1.8 : 0;
  }

  window.addEventListener('resize', repositionBottle);

  // ── INTERACTION — drag to rotate ──────────────────────────────
  let isDragging = false;
  let prevX = 0;
  let manualVelX = 0;

  canvas.addEventListener('mousedown',  e => { isDragging=true; prevX=e.clientX; autoRotate=false; });
  canvas.addEventListener('touchstart', e => { isDragging=true; prevX=e.touches[0].clientX; autoRotate=false; }, {passive:true});

  window.addEventListener('mousemove', e => {
    if (!isDragging || !bottleGroup) return;
    const dx = e.clientX - prevX;
    manualVelX = dx * 0.012;
    bottleGroup.rotation.y += manualVelX;
    prevX = e.clientX;
  });
  window.addEventListener('touchmove', e => {
    if (!isDragging || !bottleGroup) return;
    const dx = e.touches[0].clientX - prevX;
    manualVelX = dx * 0.012;
    bottleGroup.rotation.y += manualVelX;
    prevX = e.touches[0].clientX;
  }, {passive:true});

  window.addEventListener('mouseup',   () => { isDragging=false; });
  window.addEventListener('touchend',  () => { isDragging=false; });

  // Resume auto-rotate after 3s of no interaction
  let resumeTimer;
  canvas.addEventListener('mousedown', () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { autoRotate=true; }, 3000);
  });

  // Hover: slow down auto-rotate
  let isHovered = false;
  canvas.addEventListener('mouseenter', () => isHovered=true);
  canvas.addEventListener('mouseleave', () => isHovered=false);

  // ── ANIMATE ──────────────────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (bottleGroup) {
      if (autoRotate) {
        const speed = isHovered ? 0.003 : 0.008;
        bottleGroup.rotation.y += speed;
      } else {
        // Inertia decay
        manualVelX *= 0.92;
        bottleGroup.rotation.y += manualVelX;
      }
      // Gentle float
      bottleGroup.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    }

    // Update material colours on theme change
    const dark = isDark();
    bottleMat.color.set(dark ? 0xF0F0F0 : 0xF8F8F8);

    renderer.render(scene, camera);
  }

  animate();

})();
