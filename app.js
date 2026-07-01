// ==========================================================================
// UI STYLE ARCHIVE - INTERACTIVE CONTROLLER
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
      showToast('Copy failed. Please try manually.');
      console.error(err);
    });
  }

  // --- Sidebar Section Navigation Router ---
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.style-section');

  function showSectionByHash(hash) {
    if (!hash) hash = '#skeuomorphism';
    
    // Find matching link
    let activeLink = document.querySelector(`.nav-item[href="${hash}"]`);
    if (!activeLink) return;
    
    // Set active link in sidebar
    navItems.forEach(item => item.classList.remove('active'));
    activeLink.classList.add('active');
    
    // Set active section in main area
    const targetId = hash.substring(1);
    sections.forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.add('active-section');
      } else {
        sec.classList.remove('active-section');
      }
    });

    // Reset layout scroll to top on nav switch
    document.querySelector('.app-main').scrollTop = 0;
  }

  // Monitor links click
  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.location.hash = href;
      showSectionByHash(href);
    });
  });

  // Check initial hash
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
  
  // 1. Swatches copy click
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      copyToClipboard(hex, `Copied color: ${hex}`);
    });
  });

  // 2. Prompt copy click
  document.querySelectorAll('.btn-copy-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.parentElement.querySelector('.prompt-text').textContent;
      copyToClipboard(promptText, 'Copied AI prompt to clipboard!');
    });
  });

  // --- Code Inspector Viewers ---
  document.querySelectorAll('.code-inspector').forEach(inspector => {
    const tabs = inspector.querySelectorAll('.tab-btn');
    const panels = inspector.querySelectorAll('.tab-panel');
    const copyCodeBtn = inspector.querySelector('.btn-copy-code');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active states
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active states
        tab.classList.add('active');
        const targetType = tab.getAttribute('data-tab');
        const activePanel = inspector.querySelector(`.tab-panel[id*="-${targetType}"]`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });

    // Copy selected code button
    copyCodeBtn.addEventListener('click', () => {
      const activePanel = inspector.querySelector('.tab-panel.active');
      if (activePanel) {
        copyToClipboard(activePanel.textContent, 'Copied code snippet!');
      }
    });
  });


  // ==========================================================================
  // SANDBOX LOGIC & INTERACTIVE PLAYS
  // ==========================================================================

  // --- 01. SKEUOMORPHISM SANDBOX ---
  
  // 1. Sliding credit cards
  const skeuCards = document.querySelectorAll('.skeu-card');
  skeuCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid pocket click conflicts
      
      const isPulled = card.classList.contains('pulled');
      
      // Reset other cards
      skeuCards.forEach(c => c.classList.remove('pulled'));
      
      if (!isPulled) {
        card.classList.add('pulled');
        showToast('Card pulled out');
      }
    });
  });

  // Collapse cards if clicking wallet background
  document.querySelector('.skeu-wallet').addEventListener('click', () => {
    skeuCards.forEach(c => c.classList.remove('pulled'));
  });

  // 2. Skeuomorphic Gain Dial
  const skeuKnob = document.getElementById('skeu-knob');
  const skeuGainText = document.getElementById('skeu-gain-val');
  let isKnobDragging = false;

  function updateKnobAngle(clientX, clientY) {
    const knobRect = skeuKnob.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    
    // Calculate angle in degrees
    const deltaX = clientX - knobCenterX;
    const deltaY = clientY - knobCenterY;
    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * (180 / Math.PI) + 90; // Offset alignment
    
    // Constrain knob limits (-140 to 140 degrees)
    if (angleDeg < -180) angleDeg += 360;
    if (angleDeg > 180) angleDeg -= 360;
    
    const minDeg = -135;
    const maxDeg = 135;
    
    if (angleDeg < minDeg) angleDeg = minDeg;
    if (angleDeg > maxDeg) angleDeg = maxDeg;
    
    // Rotate DOM element
    skeuKnob.style.transform = `rotate(${angleDeg}deg)`;
    
    // Calculate percentage (0% to 100%)
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

  // Dial touch support
  skeuKnob.addEventListener('touchstart', (e) => {
    isKnobDragging = true;
    updateKnobAngle(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (isKnobDragging) {
      updateKnobAngle(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  document.addEventListener('touchend', () => {
    isKnobDragging = false;
  });


  // --- 02. NEOMORPHISM SANDBOX ---
  
  // Power & EQ Button Toggles
  const powerBtn = document.getElementById('neo-btn-power');
  powerBtn.addEventListener('click', () => {
    powerBtn.classList.toggle('active');
    showToast(powerBtn.classList.contains('active') ? 'Power ON' : 'Power OFF');
  });

  const eqBtn = document.getElementById('neo-btn-eq');
  eqBtn.addEventListener('click', () => {
    eqBtn.classList.toggle('active');
  });

  // Neumorphic Dial Control
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
    
    // Rotate Dial
    neoDial.style.transform = `rotate(${angleDeg}deg)`;
    
    // Map angle to percentage (0% to 100%)
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

  // Slider Logic
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
  
  // Toggles active state switching
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
      // Stripped-down flat shadows
      clayCard.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), inset 0px 0px 0px #fff';
      clayAvatar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
    }
  });

  // Hug/Squeeze button animation
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
    
    // Relative coordinate percentages
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    
    // Set sheen position variables
    spatialPanel.style.setProperty('--mx', `${pctX}%`);
    spatialPanel.style.setProperty('--my', `${pctY}%`);
    
    // Calculate rotation (-15deg to 15deg)
    const rotateY = -((x / rect.width) - 0.5) * 30;
    const rotateX = ((y / rect.height) - 0.5) * 30;
    
    spatialPanel.style.setProperty('--rx', `${rotateX}deg`);
    spatialPanel.style.setProperty('--ry', `${rotateY}deg`);
  });

  // Reset rotation when cursor leaves container
  spatialContainer.addEventListener('mouseleave', () => {
    spatialPanel.style.setProperty('--rx', '0deg');
    spatialPanel.style.setProperty('--ry', '0deg');
    spatialPanel.style.setProperty('--mx', '50%');
    spatialPanel.style.setProperty('--my', '50%');
  });

  // Ambient environment switches
  spatialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      spatialBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const label = btn.querySelector('.label').textContent;
      showToast(`Selected Environment: ${label}`);
      
      // Update background blur colors based on selected atmosphere
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

});
