/* global hash */

function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText('Hello, world!', 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText('Hello, world!', 4, 17);
  return canvas.toDataURL();
}

function getWebGLRendererInfo() {
  const gl = document.createElement('canvas').getContext('webgl');
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  return {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  };
}

function getAudioContextInfo() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
  return oscillator.frequency.value;
}

function getLocaleInfo() {
  return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
  };
}

function getScreenInfo() {
  return `${screen.height}x${screen.width}x${screen.colorDepth}`;
}

async function fingerprint() {
  const canvasData = getCanvasFingerprint();
  const webGLInfo = getWebGLRendererInfo();
  const audioData = getAudioContextInfo();
  const localeInfo = getLocaleInfo();
  const screenData = getScreenInfo();
  
  // Combine all vectors and hash
  return hash(canvasData, webGLInfo.vendor, webGLInfo.renderer, audioData, localeInfo.timezone, localeInfo.language, screenData);
}
