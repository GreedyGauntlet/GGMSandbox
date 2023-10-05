let defaultcontent = `>GGM Sandbox

>>Creating a GGM site

>>>Headers
The amount of ">" characters in front of a line of text determines the hierarchy of the text subject. One ">" is a title, two is a header, three is a sub-header, and so on! No ">" characters just determines as default text, like what this text is right now!

>>>Bullet points
You can also specify bullet points using the '-' character!
-One '-' character specifies a single level bullet point, like this bullet point here!
--Two '-' characters specifies a second level bullet point, like this! You can keep adding more characters to add onto your level of bullet point!

>>Keep this in mind!

>>>This is a BETA
There are likely going to be complications and small mishaps/bugs when you use this because this is still in development! If you find any bugs, contact Jason and tell him to fix them!
`;

if(localStorage.getItem("ggm") === null) {
    localStorage.setItem("ggm", defaultcontent);
}
document.getElementById('output').innerHTML = ParseGGM(localStorage.getItem("ggm"));
document.getElementById('editor').value = localStorage.getItem("ggm");

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const content = reader.result;
        document.getElementById('output').innerHTML = ParseGGM(content);
        document.getElementById('editor').value = content;
    }
    reader.readAsText(file);
});

document.getElementById("editor").addEventListener("input", function(event) {
    document.getElementById('output').innerHTML = ParseGGM(document.getElementById('editor').value);
    localStorage.setItem("ggm", document.getElementById('editor').value);
    for (let line of document.getElementById('editor').value.split('\n')) {
        console.log(typeof line);
    } 
});

document.getElementById("exportbtn").onclick = () => {
    const blob = new Blob([document.getElementById('editor').value], { type: 'application/ggm' });
    const fileName = prompt('Enter a file name') || 'file';
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName + '.ggm';
    a.click();
    window.URL.revokeObjectURL(a.href);
}