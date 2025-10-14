(function () {
  const params = new URLSearchParams(window.location.search);

  const appName = params.get('name') || 'Sanctify';
  const ios = params.get('ios') || 'https://apps.apple.com/us/app/sanctify-prayers-guidance/id6751909914'; // default to Sanctify on App Store
  const android = params.get('android'); // https://play.google.com/store/apps/details?id=...
  const icon = params.get('icon'); // optional absolute URL
  const fallback = params.get('fallback'); // optional generic site
  const autoredirect = params.get('autoredirect') !== 'false';

  const els = {
    tipsText: document.getElementById('tipsText'),
    appIcon: document.getElementById('appIcon'),
    storeHeading: document.getElementById('storeHeading'),
    btn: document.getElementById('downloadBtn'),
    altLinks: document.getElementById('altLinks'),
    iosLink: document.getElementById('iosLink'),
    androidLink: document.getElementById('androidLink'),
    footerNote: document.getElementById('footerNote'),
  };

  if (icon) {
    els.appIcon.src = icon;
  } else {
    // simple emoji placeholder rendered as SVG
    const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="28" fill="#fff"/>
        <circle cx="64" cy="64" r="54" fill="#f7e3a0"/>
        <path d="M58 32h12v64H58z" fill="#d4aa2a"/>
        <path d="M32 58h64v12H32z" fill="#d4aa2a"/>
      </svg>
    `);
    els.appIcon.src = placeholder;
  }

  // Helper: detect if inside in-app browser (TikTok, Instagram, Facebook, Twitter)
  function detectInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isTikTok = /tiktok/i.test(ua) || /musical_ly/i.test(ua);
    const isInstagram = /instagram/i.test(ua);
    const isFacebook = /fb_iab|fbav|facebook/i.test(ua);
    const isTwitter = /twitter/i.test(ua);
    const isSnap = /snapchat/i.test(ua);
    return {
      inApp: isTikTok || isInstagram || isFacebook || isTwitter || isSnap,
      isTikTok,
    };
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function safeNavigate(url) {
    if (!url) return;
    window.location.href = url;
  }

  function init() {
    const { inApp, isTikTok } = detectInAppBrowser();

    // Keep the custom heading and button text set in HTML unless params override
    const customHeading = `Search "${appName}" on the App Store`;
    els.storeHeading.textContent = customHeading;
    els.btn.textContent = 'Download Now';

    if (ios) {
      els.iosLink.href = ios;
      els.iosLink.hidden = false;
    }
    if (android) {
      els.androidLink.href = android;
      els.androidLink.hidden = false;
    }
    if (ios || android) {
      els.altLinks.hidden = false;
    }

    // Set main button target preference based on platform
    els.btn.href = isIOS() && ios ? ios : (!isIOS() && android ? android : (ios || android || '#'));

    if (inApp) {
      // Custom instruction for TikTok
      if (isTikTok) {
        els.tipsText.innerHTML = 'On <img class="icon-inline" src="./Assets/Tiktok.png" alt="TikTok"/> tap the <img class="icon-inline" src="./Assets/tripledot.png" alt="More"/> and then tap <span class="highlight">"Open in Browser"</span> to download Sanctify for free.';
      } else {
        els.tipsText.innerHTML = 'Tap the menu, then choose <span class="highlight">Open in browser</span> to continue to the App Store.';
      }
      // Avoid auto-redirect loops inside in-app browsers
      return;
    }

    // Outside in-app browser → redirect immediately if we have a store link
    if (autoredirect) {
      if (isIOS() && ios) return safeNavigate(ios);
      if (!isIOS() && android) return safeNavigate(android);
      if (fallback) return safeNavigate(fallback);
    }
  }

  init();
})();


