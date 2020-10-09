let input_field = document.querySelector("textarea[name='transform-view']");

let output_field = document.querySelector("textarea[name='transform-result']");

let alert_box = document.querySelector(".alert");

function notify(message) {
    let box = alert_box.cloneNode(true);
    box.innerHTML += message;
    box.style.display = "block";
    document.body.appendChild(box).focus();
    box.style.opacity = 1;

    setTimeout(() => {
        box.style.opacity = 0;
        box.remove();
    }, 5000);
}

input_field.addEventListener("input", (event) => {
    output_field.value = transform(event.target.value);
})

output_field.addEventListener("click", (event) => {
    navigator.clipboard.writeText(output_field.value).then(()=> {
        console.log("Copying to clipboard was successful!");
        notify("Successfully copied to clipboard!");
    }, (err) => {
        console.log("Could not copy text: ", err);
    })
})


function transform(text) {
    const latex_strip_commands = ["cite", "label", "ref"];
    const latex_replace_commands = ["section", "subsection", "subsubsection", "paragraph", "textbf", "emph", "underline", "textit", "say", "textsc", "texttt", "textsl", "textup", "textmd"];

    const inner_regex = /{(.*?)}/;
    const big_math_regex = /\\\[.*?\\\]/gms;

    for (const command of latex_strip_commands) {
        const regex = new RegExp("(\\\\"+command+"{.*?})", "gmi");
        text = text.replace(regex, "");
    }

    for (const command of latex_replace_commands) {
        const regex = new RegExp("(\\\\"+command+"{.*?})", "gmi");
        text = text.replace(regex, (match) => {
            return match.match(inner_regex)[1];
        });
    }

    // Remove big math inputs
    text = text.replace(big_math_regex, "");

    // Remove comments
    text = text.replace(/(%.*)/gm, "");

    // Remove leftover commands
    text = text.replace(/(\\\w*\[.*?\]?{.*?})|(\\\w*{.*?})|(\\\w*)|(\\\w*\[.*?\])|(\[.*?\])/gms, "");

    // Remove unsued newlines
    text = text.replace(/(^[ \t]*$\r?\n){3,}/gm, "");

    return text.trim();
}