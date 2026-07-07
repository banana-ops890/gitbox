// index.js - The GitBox Open-Source Core Architecture

// 1. The Global Tool Registry
// Anyone in the community can add a object here to register their new tool!
const GitBoxRegistry = {
    crypto: {
        name: "Cryptography Ecosystem",
        render: () => {
            return `
                <p style="color: #7ee787;">&gt; Method: Base64 Engine</p>
                <input type="text" id="tool-input" placeholder="Data..." oninput="GitBoxRegistry.crypto.action()">
                <p style="margin-top:10px;">Output:</p>
                <div id="tool-output" style="color:#ff7b72;"></div>
            `;
        },
        action: () => {
            const val = document.getElementById('tool-input').value;
            document.getElementById('tool-output').innerText = btoa(val);
        }
    },
    
    // EXAMPLE FOR THE COMMUNITY: Someone wants to add a text counter? They just drop this in:
    wordcounter: {
        name: "Word & Character Counter",
        render: () => {
            return `
                <p style="color: #7ee787;">&gt; Live Text Analyzer</p>
                <textarea id="tool-input" style="background:transparent; color:#fff; border:1px solid #30363d; width:100%;" oninput="GitBoxRegistry.wordcounter.action()"></textarea>
                <div id="tool-output" style="margin-top:10px;"></div>
            `;
        },
        action: () => {
            const text = document.getElementById('tool-input').value;
            document.getElementById('tool-output').innerText = `Characters: ${text.length} | Words: ${text.trim().split(/\s+/).filter(Boolean).length}`;
        }
    }
};

// 2. The Core Engine (Handles drawing the UI automatically)
function bootGitBox() {
    const menuOptions = document.getElementById('menu-options');
    menuOptions.innerHTML = ''; // Clear hardcoded elements
    
    // Dynamically build the menu from whatever the community has registered
    Object.keys(GitBoxRegistry).forEach((key, index) => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        item.innerText = `[${index + 1}] ${GitBoxRegistry[key].name}`;
        item.onclick = () => launchTool(key);
        menuOptions.appendChild(item);
    });
}

function launchTool(key) {
    const activeSpace = document.getElementById('active-space');
    const tool = GitBoxRegistry[key];
    
    if (tool) {
        activeSpace.innerHTML = tool.render();
    }
}

// Fire up the system when the page loads
window.onload = bootGitBox;
