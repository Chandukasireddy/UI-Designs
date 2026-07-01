// ==========================================================================
// UI STYLE ARCHIVE - INTERACTIVE CONTROLLER V2
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Toast Notification System ---
  const toast = document.getElementById('toast');
  
  function showToast(message) {
    toast.textContent = message;
    toast.className = 'toast-visible';
    
    // Reset toast state after 2 seconds
    setTimeout(() => {
      toast.className = 'toast-hidden';
    }, 2000);
  }

  // --- Copy to Clipboard Utility ---
  function copyToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(err => {
      showToast('Copy failed. Please copy manually.');
      console.error(err);
    });
  }

  // --- Sidebar Section Navigation Router ---
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.style-section');

  function showSectionByHash(hash) {
    if (!hash) hash = '#glassmorphism';
    
    let activeLink = document.querySelector(`.nav-item[href="${hash}"]`);
    if (!activeLink) return;
    
    navItems.forEach(item => item.classList.remove('active'));
    activeLink.classList.add('active');
    
    const targetId = hash.substring(1);
    sections.forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.add('active-section');
      } else {
        sec.classList.remove('active-section');
      }
    });

    document.querySelector('.app-main').scrollTop = 0;
  }

  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.location.hash = href;
      showSectionByHash(href);
    });
  });

  if (window.location.hash) {
    showSectionByHash(window.location.hash);
  }

  // --- Grid Backdrop Pattern Toggle ---
  const themeToggle = document.getElementById('theme-preview-toggle');
  const appMain = document.querySelector('.app-main');
  
  themeToggle.addEventListener('click', () => {
    appMain.classList.toggle('bg-grid-visible');
    showToast(appMain.classList.contains('bg-grid-visible') ? 'Grid pattern enabled!' : 'Grid pattern disabled!');
  });

  // --- Copy Actions: Swatches & Prompts ---
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      copyToClipboard(hex, `Copied color: ${hex}`);
    });
  });

  document.querySelectorAll('.btn-copy-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.parentElement.querySelector('.prompt-text').textContent;
      copyToClipboard(promptText, 'Copied Theme Recipe to clipboard!');
    });
  });

  // --- Code Inspector Viewers ---
  document.querySelectorAll('.code-inspector').forEach(inspector => {
    const tabs = inspector.querySelectorAll('.tab-btn');
    const panels = inspector.querySelectorAll('.tab-panel');
    const copyCodeBtn = inspector.querySelector('.btn-copy-code');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        const targetType = tab.getAttribute('data-tab');
        const activePanel = inspector.querySelector(`.tab-panel[id*="-${targetType}"]`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });

    copyCodeBtn.addEventListener('click', () => {
      const activePanel = inspector.querySelector('.tab-panel.active');
      if (activePanel) {
        copyToClipboard(activePanel.textContent, 'Copied code snippet!');
      }
    });
  });


  // ==========================================================================
  // SANDBOX LOGIC & INTERACTIVE PLAYS (15 STYLES)
  // ==========================================================================

  // --- 01. SKEUOMORPHISM SANDBOX ---
  const skeuCards = document.querySelectorAll('.skeu-card');
  skeuCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const isPulled = card.classList.contains('pulled');
      skeuCards.forEach(c => c.classList.remove('pulled'));
      if (!isPulled) {
        card.classList.add('pulled');
        showToast('Card pulled out');
      }
    });
  });

  document.querySelector('.skeu-wallet').addEventListener('click', () => {
    skeuCards.forEach(c => c.classList.remove('pulled'));
  });

  const skeuKnob = document.getElementById('skeu-knob');
  const skeuGainText = document.getElementById('skeu-gain-val');
  let isKnobDragging = false;

  function updateKnobAngle(clientX, clientY) {
    const knobRect = skeuKnob.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    
    const deltaX = clientX - knobCenterX;
    const deltaY = clientY - knobCenterY;
    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * (180 / Math.PI) + 90;
    
    if (angleDeg < -180) angleDeg += 360;
    if (angleDeg > 180) angleDeg -= 360;
    
    const minDeg = -135;
    const maxDeg = 135;
    
    if (angleDeg < minDeg) angleDeg = minDeg;
    if (angleDeg > maxDeg) angleDeg = maxDeg;
    
    skeuKnob.style.transform = `rotate(${angleDeg}deg)`;
    const pct = Math.round(((angleDeg - minDeg) / (maxDeg - minDeg)) * 100);
    skeuGainText.textContent = `${pct}%`;
  }

  skeuKnob.addEventListener('mousedown', (e) => {
    isKnobDragging = true;
    updateKnobAngle(e.clientX, e.clientY);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isKnobDragging) {
      updateKnobAngle(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseup', () => {
    isKnobDragging = false;
  });


  // --- 02. NEOMORPHISM SANDBOX ---
  const powerBtn = document.getElementById('neo-btn-power');
  powerBtn.addEventListener('click', () => {
    powerBtn.classList.toggle('active');
    showToast(powerBtn.classList.contains('active') ? 'Power ON' : 'Power OFF');
  });

  const eqBtn = document.getElementById('neo-btn-eq');
  eqBtn.addEventListener('click', () => {
    eqBtn.classList.toggle('active');
  });

  const neoDial = document.getElementById('neo-volume-dial');
  const neoVolumeVal = document.getElementById('neo-volume-val');
  let isNeoDialDragging = false;

  function updateNeoDialAngle(clientX, clientY) {
    const rect = neoDial.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let angleRad = Math.atan2(clientY - cy, clientX - cx);
    let angleDeg = angleRad * (180 / Math.PI) + 90;
    
    if (angleDeg < 0) angleDeg += 360;
    neoDial.style.transform = `rotate(${angleDeg}deg)`;
    const pct = Math.round((angleDeg / 360) * 100);
    neoVolumeVal.textContent = `${pct}%`;
  }

  neoDial.addEventListener('mousedown', (e) => {
    isNeoDialDragging = true;
    updateNeoDialAngle(e.clientX, e.clientY);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isNeoDialDragging) {
      updateNeoDialAngle(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseup', () => {
    isNeoDialDragging = false;
  });

  const sliderTrack = document.getElementById('neo-slider-track');
  const sliderFill = sliderTrack.querySelector('.neo-slider-fill');
  const sliderThumb = sliderTrack.querySelector('.neo-slider-thumb');
  const sliderVal = document.getElementById('neo-slider-val');
  let isSliderDragging = false;

  function updateSliderPosition(clientX) {
    const rect = sliderTrack.getBoundingClientRect();
    let offset = clientX - rect.left;
    let pct = offset / rect.width;
    
    if (pct < 0) pct = 0;
    if (pct > 1) pct = 1;
    
    const percentage = Math.round(pct * 100);
    sliderFill.style.width = `${percentage}%`;
    sliderThumb.style.left = `${percentage}%`;
    sliderVal.textContent = `${percentage}%`;
  }

  sliderTrack.addEventListener('mousedown', (e) => {
    isSliderDragging = true;
    updateSliderPosition(e.clientX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isSliderDragging) {
      updateSliderPosition(e.clientX);
    }
  });

  document.addEventListener('mouseup', () => {
    isSliderDragging = false;
  });


  // --- 04. CLAYMORPHISM SANDBOX ---
  const clayToggleMute = document.getElementById('clay-toggle-mute');
  const clayToggleShadow = document.getElementById('clay-toggle-shadow');
  const clayCard = document.querySelector('.clay-card');
  const clayAvatar = document.querySelector('.clay-avatar');

  clayToggleMute.addEventListener('click', () => {
    clayToggleMute.classList.toggle('active');
    showToast(clayToggleMute.classList.contains('active') ? 'Audio muted' : 'Audio active');
  });

  clayToggleShadow.addEventListener('click', () => {
    clayToggleShadow.classList.toggle('active');
    if (clayToggleShadow.classList.contains('active')) {
      clayCard.style.boxShadow = '0 20px 40px rgba(163, 216, 244, 0.35), inset 8px 8px 16px #ffffff, inset -8px -8px 16px rgba(163, 216, 244, 0.4)';
      clayAvatar.style.boxShadow = '0 10px 20px rgba(163, 216, 244, 0.5), inset 6px 6px 12px #ffffff, inset -6px -6px 12px rgba(0, 0, 0, 0.12)';
    } else {
      clayCard.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), inset 0px 0px 0px #fff';
      clayAvatar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
    }
  });

  const clayBtn = document.querySelector('.clay-btn');
  clayBtn.addEventListener('click', () => {
    clayCard.style.transform = 'scale(0.92) rotate(2deg)';
    showToast('Aww! Thanks for the hug!');
    setTimeout(() => {
      clayCard.style.transform = 'scale(1) rotate(0deg)';
    }, 250);
  });


  // --- 09. BENTO GRID SANDBOX ---
  const bentoSwitches = document.querySelectorAll('.bento-switch');
  bentoSwitches.forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('active');
    });
  });


  // --- 10. SPATIAL UI SANDBOX ---
  const spatialPanel = document.getElementById('spatial-panel');
  const spatialSheen = spatialPanel.querySelector('.spatial-glass-sheen');
  const spatialContainer = document.querySelector('.bg-spatial-demo');
  const spatialBtns = document.querySelectorAll('.spatial-control-btn');

  spatialContainer.addEventListener('mousemove', (e) => {
    const rect = spatialPanel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    
    spatialPanel.style.setProperty('--mx', `${pctX}%`);
    spatialPanel.style.setProperty('--my', `${pctY}%`);
    
    const rotateY = -((x / rect.width) - 0.5) * 30;
    const rotateX = ((y / rect.height) - 0.5) * 30;
    
    spatialPanel.style.setProperty('--rx', `${rotateX}deg`);
    spatialPanel.style.setProperty('--ry', `${rotateY}deg`);
  });

  spatialContainer.addEventListener('mouseleave', () => {
    spatialPanel.style.setProperty('--rx', '0deg');
    spatialPanel.style.setProperty('--ry', '0deg');
    spatialPanel.style.setProperty('--mx', '50%');
    spatialPanel.style.setProperty('--my', '50%');
  });

  spatialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      spatialBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = btn.querySelector('.label').textContent;
      showToast(`Selected Environment: ${label}`);
      
      const bg = document.querySelector('.spatial-bg-photo');
      if (label === 'Forest') {
        bg.style.filter = 'blur(25px) hue-rotate(60deg) brightness(0.3)';
      } else if (label === 'Mountain') {
        bg.style.filter = 'blur(25px) hue-rotate(180deg) brightness(0.4)';
      } else if (label === 'Cosmos') {
        bg.style.filter = 'blur(25px) hue-rotate(-90deg) brightness(0.2)';
      }
    });
  });


  // --- 11. CYBERPUNK UI SANDBOX ---
  const cyberBtn = document.getElementById('cyber-btn-override');
  const cyberCard = document.querySelector('.cyber-card');

  cyberBtn.addEventListener('click', () => {
    cyberCard.style.animation = 'cyberGlitchPulse 0.3s steps(2) 2';
    showToast('SYS.ALERT: OVERRIDE SEQUENCE DETECTED...');
    
    setTimeout(() => {
      cyberCard.style.animation = '';
    }, 600);
  });


  // --- 12. MATERIAL YOU SANDBOX ---
  const materialFAB = document.getElementById('material-fab-compose');
  const materialListItems = document.querySelectorAll('.material-list-item');

  materialFAB.addEventListener('click', () => {
    showToast('Material Ripple: Compose email triggered');
  });

  materialListItems.forEach(item => {
    item.addEventListener('click', () => {
      materialListItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const text = item.querySelector('h4').textContent;
      showToast(`Selected list: ${text}`);
    });
  });


  // --- 13. Y2K / FRUTIGER AERO SANDBOX ---
  const y2kBtnPlay = document.getElementById('y2k-btn-play');
  const y2kBtnBubble = document.getElementById('y2k-btn-bubble');
  const y2kContainer = document.querySelector('.bg-y2k-demo');
  let y2kPlaying = false;

  y2kBtnPlay.addEventListener('click', () => {
    y2kPlaying = !y2kPlaying;
    y2kBtnPlay.textContent = y2kPlaying ? '⏸' : '▶';
    showToast(y2kPlaying ? 'Playing Audio: Oceanic Vista' : 'Audio Paused');
  });

  // Spawn bubbles physically
  y2kBtnBubble.addEventListener('click', () => {
    showToast('Spawning water bubbles...');
    for (let i = 0; i < 5; i++) {
      const bubble = document.createElement('div');
      bubble.style.position = 'absolute';
      bubble.style.width = `${Math.random() * 15 + 10}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.borderRadius = '50%';
      bubble.style.background = 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)';
      bubble.style.border = '1px solid rgba(255,255,255,0.4)';
      bubble.style.bottom = '10px';
      bubble.style.left = `${Math.random() * 80 + 10}%`;
      bubble.style.transition = 'all 2s ease-out';
      bubble.style.zIndex = '5';
      y2kContainer.appendChild(bubble);
      
      // Animate floating up
      setTimeout(() => {
        bubble.style.transform = `translateY(-300px) scale(${Math.random() * 0.5 + 0.8})`;
        bubble.style.opacity = '0';
      }, 50);

      // Clean DOM
      setTimeout(() => {
        bubble.remove();
      }, 2050);
    }
  });


  // --- 14. SCI-FI HUD SANDBOX ---
  const hudBtn = document.getElementById('hud-btn-lock');
  const hudCard = document.querySelector('.hud-card');
  const targetText = hudCard.querySelector('.target-locked-text');
  let hudLocked = false;

  hudBtn.addEventListener('click', () => {
    hudLocked = !hudLocked;
    if (hudLocked) {
      hudCard.style.color = '#ff3b30';
      hudCard.style.borderColor = 'rgba(255,59,48,0.7)';
      targetText.textContent = 'TARGET LOCKED';
      targetText.style.color = '#ff3b30';
      hudBtn.textContent = 'CANCEL TARGET';
      hudBtn.style.color = '#ff3b30';
      hudBtn.style.borderColor = '#ff3b30';
      showToast('HUD Lock-On Engaged!');
    } else {
      hudCard.style.color = '#00ffc4';
      hudCard.style.borderColor = 'rgba(0, 255, 196, 0.25)';
      targetText.textContent = 'TARGET IN RANGE';
      targetText.style.color = '#00ffc4';
      hudBtn.textContent = 'ENGAGE TARGET';
      hudBtn.style.color = '#00ffc4';
      hudBtn.style.borderColor = '#00ffc4';
      showToast('HUD Target Released');
    }
  });


  // --- 15. ART DECO SANDBOX ---
  const decoBtn = document.getElementById('deco-btn-reserve');
  decoBtn.addEventListener('click', () => {
    showToast('⚜ Elegant Order: Table reserved at the Gatsby. Welcome to 1925.');
  });

});
