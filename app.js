// grab DOM elements
const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const shootBtn = document.getElementById('shoot');
const dl = document.getElementById('download');

// start front camera
navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}})
  .then(stream => video.srcObject = stream)
  .catch(() => alert('Camera permission is required'));

// capture still + overlay
shootBtn.addEventListener('click', () => {
  const c = document.createElement('canvas');
  c.width  = video.videoWidth;
  c.height = video.videoHeight;
  const ctx = c.getContext('2d');

  ctx.drawImage(video,0,0,c.width,c.height);        // webcam frame
  ctx.drawImage(overlay,0,0,c.width,c.height);      // astronaut PNG

  dl.href = c.toDataURL('image/jpeg',0.95);          // local JPEG
  dl.download = 'astronaut.jpg';
  dl.click();                                        // trigger save
});
