(() => {
  'use strict';
  const release = window.QURAN_RELEASE;
  if (!release) return; // The HTML download link still works without JavaScript.
  const button = document.getElementById('download-button');
  const message = document.getElementById('download-message');
  const checksum = document.getElementById('checksum');
  const copyButton = document.getElementById('copy-checksum');

  let apkUrl;
  try {
    apkUrl = new URL(release.apkPath, window.location.href);
    if (!['http:', 'https:', 'file:'].includes(apkUrl.protocol)) throw new Error('Invalid APK URL');
  } catch {
    message.textContent = 'The download path is unavailable. Please try again later.';
    button.removeAttribute('href');
    button.setAttribute('aria-disabled', 'true');
    return;
  }

  button.href = apkUrl.href;
  button.download = release.filename;
  document.querySelectorAll('[data-version]').forEach(node => {node.textContent = `v${release.version}`;});
  document.querySelectorAll('[data-size]').forEach(node => {node.textContent = `${(release.bytes / 1000000).toFixed(1)} MB`;});
  document.querySelectorAll('[data-architecture]').forEach(node => {node.textContent = release.architecture;});
  document.querySelectorAll('[data-requirements]').forEach(node => {node.textContent = release.requirements;});
  document.querySelectorAll('[data-filename]').forEach(node => {node.textContent = release.filename;});
  checksum.textContent = release.sha256;

  // Let the browser download directly: no full-file fetch or fake progress bar.
  button.addEventListener('click', () => {
    message.textContent = `Your download has been requested. Look for ${release.filename} in your browser’s downloads.`;
  });
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(release.sha256);
      copyButton.textContent = 'Checksum copied';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(checksum);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = 'Selected — copy the checksum';
    }
  });
})();
