function waitForMessage(frame) {
    console.log(">waitForMessage", frame);
    return new Promise(resolve => {
        function handler({ data }) {
            console.log(">handler", data);
            removeEventListener("message", handler);
            durations[frame].push(data);
            resolve();
        }

        addEventListener("message", handler);
        addHtmlToDiv(frame, `<iframe src='${frame}.html'></iframe>`);
    });
}

function addHtmlToDiv(id, html) {
    window[id].insertAdjacentHTML('beforeend', html);
}

function average(vals) {
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
function showAverages() {
    console.log(">addAverage", durations);
    Object.entries(durations).forEach(([id, vals]) => {
        addHtmlToDiv(id, `<div>${average(vals)}</div>`);
    });
}



let frames = ['not preloaded', 'preloaded','not preloaded cached', 'preloaded cached'];
 

document.body.innerHTML =document.body.innerHTML+ frames.reduce((t, frame) => t + `<p>${frame}</p><div id='${frame}'></div>`, '');

const durations = Object.fromEntries(frames.map(frame => ([frame, []])));


let p = Promise.resolve();

for (let i = 0; i < 10; i++) {
    frames.forEach(frame => p = p.then(() => waitForMessage(frame)));
}

p.then(showAverages);
