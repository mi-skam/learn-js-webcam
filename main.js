import "./style.css";
import { changeWebcam, getWebcams } from "./webcam";

document.querySelector("#app").innerHTML = `
<p> Webcam demonstration </p>
<button id="switchButton">Next Webcam</button>
<video autoplay playsinline id="webcam"></video>
`;

const video = document.querySelector("#webcam");
const switchButton = document.querySelector("#switchButton");

const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

if (hasGetUserMedia()) {
  // enable button, if webcams are detected
  const detectedWebcams = await getWebcams();
  switchButton.disabled = detectedWebcams.length > 1 ? false : true;

  // switch webcams
  switchButton.addEventListener("click", () => changeWebcam(detectedWebcams));

  // enable webcam stream
  const constraints = { video: true };
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
  });
}
