const videoElement = document.getElementById("video");
const buttonElement = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.onplay();
        };
    } catch (error) {}
}

buttonElement.addEventListener("click", async () => {
    // Disable Button
    buttonElement.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    buttonElement.disabled = false;
});

// onLoad
selectMediaStream();
