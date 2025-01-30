"use strict";
console.log("hello videoPlayer");
console.log("hello");
console.log("hello");
const videos = document.getElementsByClassName("videos")[0];
class CustomVideoPlayer {
    constructor(custom) {
        this.customObj = custom;
        this.createCustomVideo();
    }
    createCustomVideo() {
        //create video
        const videoContainer = document.createElement("div");
        const controls = document.createElement("div");
        const upper = document.createElement("div");
        const left = document.createElement("div");
        const right = document.createElement("div");
        videoContainer.appendChild(controls);
        controls.appendChild(upper);
        upper.appendChild(right);
        upper.appendChild(left);
        videoContainer.className = "videoContainer";
        controls.className = "controls";
        upper.className = "upper";
        left.className = "left";
        right.className = "right";
        const video = document.createElement("video");
        video.className = "video";
        video.src = this.customObj.src;
        video.width = this.customObj.width;
        // video.controls = true;
        videoContainer === null || videoContainer === void 0 ? void 0 : videoContainer.appendChild(video);
        videos.appendChild(videoContainer);
        //create controls
        //play/pause button
        const ppBtn = this.createBtn("play-pause", "fa-solid fa-play", () => {
            if (video.paused) {
                video.play();
                if (ppBtn.firstChild instanceof HTMLElement)
                    ppBtn.firstChild.classList.replace("fa-play", "fa-pause");
            }
            else {
                video.pause();
                if (ppBtn.firstChild instanceof HTMLElement)
                    ppBtn.firstChild.classList.replace("fa-pause", "fa-play");
            }
        });
        console.log(ppBtn.firstChild);
        right === null || right === void 0 ? void 0 : right.appendChild(ppBtn);
        //seekBar input
        const seekBar = this.createInputRange("seek", "0", "0", "", "0.1");
        seekBar.addEventListener("input", function () {
            video.currentTime = (parseInt(this.value) / 100) * video.duration;
        });
        video.addEventListener("timeupdate", () => {
            seekBar.value = ((video.currentTime / video.duration) * 100).toString(); //type of seekBar.value is string
        });
        controls === null || controls === void 0 ? void 0 : controls.append(seekBar);
        //volume slider input
        // let lastVolume = video.volume;
        const volumeSlider = this.createInputRange("volume", "1", "0", "1", "0.1");
        volumeSlider.addEventListener("input", () => {
            video.volume = parseFloat(volumeSlider.value);
            video.muted = video.volume === 0;
            if (muteBtn.firstChild instanceof HTMLElement) {
                if (video.muted || video.volume === 0)
                    muteBtn.firstChild.classList.replace("fa-volume-high", "fa-volume-xmark");
                else
                    muteBtn.firstChild.classList.replace("fa-volume-xmark", "fa-volume-high");
                // muteBtn.textContent =
                //   video.muted || video.volume === 0 ? "un mute" : "mute";
            }
        });
        let lastVolume = video.volume;
        video.addEventListener("volumechange", () => {
            if (video.volume !== 0 && video.volume !== 1) {
                lastVolume = video.volume;
            }
            volumeSlider.value = video.volume.toString();
            if (video.muted || video.volume === 0) {
                if (muteBtn.firstChild instanceof HTMLElement) {
                    muteBtn.firstChild.classList.replace("fa-volume-high", "fa-volume-xmark");
                }
                // muteBtn.innerText = "unmute";
                volumeSlider.value = "0";
            }
            else {
                if (muteBtn.firstChild instanceof HTMLElement) {
                    muteBtn.firstChild.classList.replace("fa-volume-xmark", "fa-volume-high");
                }
                // muteBtn.innerText = "mute";
            }
        });
        left === null || left === void 0 ? void 0 : left.append(volumeSlider);
        //mute button
        const muteBtn = this.createBtn("mute", "fa-solid fa-volume-high", () => {
            video.muted = !video.muted;
            if (video.muted) {
                console.log(video.muted);
                video.volume = 0; //!***
                volumeSlider.value = "0";
                console.log(video.muted);
            }
            else {
                video.volume = lastVolume;
                volumeSlider.value = lastVolume.toString();
            }
        });
        // if (muteBtn.firstChild instanceof HTMLElement) {
        //   console.log(muteBtn.firstChild.classList);
        // }
        left === null || left === void 0 ? void 0 : left.appendChild(muteBtn);
        //backward
        const backwardBtn = this.createBtn("backward", "fa-solid fa-backward", () => {
            if (video.currentTime > 0)
                video.currentTime -= 10;
        });
        right === null || right === void 0 ? void 0 : right.appendChild(backwardBtn);
        //skip forward
        const forwardBtn = this.createBtn("forward", "fa-solid fa-forward", () => {
            if (video.currentTime < video.duration)
                video.currentTime += 10;
        });
        right === null || right === void 0 ? void 0 : right.appendChild(forwardBtn);
        //full screen button
        const fullScreenBtn = this.createBtn("full-screen", "fa-solid fa-expand", () => {
            try {
                if (!document.fullscreenElement) {
                    if (videoContainer.requestFullscreen) {
                        //   await video.requestFullscreen();
                        videoContainer.requestFullscreen();
                        //   await video.requestFullscreen();
                    }
                    video.controls = false;
                    if (fullScreenBtn.firstChild instanceof HTMLElement) {
                        fullScreenBtn.firstChild.classList.replace("fa-expand", "fa-compress");
                        // fullScreenBtn.innerText = "exit full screen";
                    }
                    console.log(video);
                    //   video.removeAttribute("controls");
                }
                else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    if (fullScreenBtn.firstChild instanceof HTMLElement) {
                        fullScreenBtn.firstChild.classList.replace("fa-compress", "fa-expand");
                        // fullScreenBtn.innerText = "full screen";
                    }
                }
            }
            catch (error) {
                console.error("error: ", error);
            }
            console.log(video);
        });
        left === null || left === void 0 ? void 0 : left.appendChild(fullScreenBtn);
    }
    createBtn(className, icon, onClick) {
        const button = document.createElement("button");
        const i = document.createElement("i");
        button.className = className;
        i.className = icon;
        button.appendChild(i);
        button.addEventListener("click", onClick);
        return button;
    }
    createInputRange(className, value, min, max, step) {
        const input = document.createElement("input");
        input.type = "range";
        input.className = className;
        input.value = value;
        input.min = min;
        input.max = max;
        input.step = step;
        return input;
    }
}
const v1 = new CustomVideoPlayer({ src: "./tomandjerry.mp4", width: 560 });
const v2 = new CustomVideoPlayer({ src: "./tomandjerry.mp4", width: 500 });
//*********************************************************
// const video = document.querySelector("#video") as HTMLMediaElement | null;
// const pp = document.querySelector("#play-pause") as HTMLButtonElement | null;
// const mute = document.querySelector("#mute") as HTMLButtonElement | null;
// const fullScreen = document.querySelector(
//   "#full-screen"
// ) as HTMLButtonElement | null;
// const seekBar = document.querySelector("#seek") as HTMLInputElement | null;
// const volumeSlider = document.querySelector(
//   "#volume"
// ) as HTMLInputElement | null;
// console.log(volumeSlider?.value);
// pp?.addEventListener("click", () => {
//   if (!video) return;
//   if (video.paused) video.play();
//   else video.pause();
// });
// video?.addEventListener("timeupdate", () => {
//   if (!seekBar) return;
//   const currentTime: number = video.currentTime;
//   const duration: number = video.duration;
//   seekBar.value = ((currentTime / duration) * 100).toString(); //type of seekBar.value is string
// });
// seekBar?.addEventListener("input", function () {
//   if (!video) return;
//   video.currentTime = (parseInt(this.value) / 100) * video.duration;
// });
// mute?.addEventListener("click", () => {
//   if (!video || !volumeSlider) return;
//   video.muted = !video.muted;
//   mute.textContent = video.muted || video.volume === 0 ? "un mute" : "mute";
//   volumeSlider.value = video.muted ? "0" : video.volume.toString();
//   volumeSlider.dispatchEvent(new Event("input")); //line ***
//   console.log(volumeSlider.value);
// });
// video?.addEventListener("volumechange", () => {
//   if (!volumeSlider || !mute) return;
//   volumeSlider.value = (video.volume * 100).toString();
//   mute.textContent = video.muted || video.volume === 0 ? "un mute" : "mute";
// });
// volumeSlider?.addEventListener("input", () => {
//   if (!video || !mute) return;
//   video.volume = parseFloat(volumeSlider.value);
//   video.muted = video.volume === 0;
//   mute.textContent = video.muted || video.volume === 0 ? "un mute" : "mute";
// });
// fullScreen?.addEventListener("click", () => {
//   if (!video) return;
//   if (video.requestFullscreen) {
//     video.requestFullscreen();
//   }
// });
//***********************************************************************
