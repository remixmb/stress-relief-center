let isDragging = false;
let currentBubble = null;
let offsetX, offsetY;

function createDraggableBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    bubble.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentBubble = bubble;
        const rect = bubble.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        bubble.style.cursor = 'grabbing';
    });

    bubble.addEventListener('dblclick', () => {
        if (!bubble.classList.contains('popped')) {
            bubble.classList.add('popped');
            const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==');
            audio.play();
            setTimeout(() => bubble.remove(), 300);
        }
    });

    return bubble;
}

// Add event listeners for drag
document.addEventListener('mousemove', (e) => {
    if (isDragging && currentBubble) {
        const bubbleWrap = document.getElementById('bubble-wrap');
        const wrapRect = bubbleWrap.getBoundingClientRect();
        
        let newX = e.clientX - wrapRect.left - offsetX;
        let newY = e.clientY - wrapRect.top - offsetY;
        
        // Keep bubble within container bounds
        newX = Math.max(0, Math.min(newX, wrapRect.width - 30));
        newY = Math.max(0, Math.min(newY, wrapRect.height - 30));
        
        currentBubble.style.position = 'absolute';
        currentBubble.style.left = `${newX}px`;
        currentBubble.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (currentBubble) {
        currentBubble.style.cursor = 'grab';
    }
    isDragging = false;
    currentBubble = null;
});

// Create bubble wrap with draggable bubbles
const bubbleWrap = document.getElementById('bubble-wrap');
for (let i = 0; i < 48; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    bubble.addEventListener('click', () => {
        if (!bubble.classList.contains('popped')) {
            bubble.classList.add('popped');
            const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==');
            audio.play();
        }
    });
    
    bubbleWrap.appendChild(bubble);
}

// Enhanced shredding animation
document.getElementById('shred-button').addEventListener('click', () => {
    const rantBox = document.getElementById('rant-box');
    const text = rantBox.value;
    if (text.trim() === '') return;

    // Create paper pieces effect
    const pieces = 100;
    const colors = ['#ff0000', '#ff00ff', '#00ff00', '#ffffff'];
    
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'paper-piece';
        piece.style.width = Math.random() * 12 + 4 + 'px';
        piece.style.height = Math.random() * 30 + 10 + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * rantBox.offsetWidth + 'px';
        piece.style.top = Math.random() * rantBox.offsetHeight + 'px';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        rantBox.appendChild(piece);
        
        // Add random delay to each piece
        setTimeout(() => {
            piece.style.animation = `shred ${Math.random() * 0.5 + 0.5}s ease-in forwards`;
        }, Math.random() * 100);
        
        setTimeout(() => {
            piece.remove();
        }, 1500);
    }

    // Text shredding effect
    const shredChars = ['█', '▓', '░', '|', '/', '\\'];
    let progress = 0;
    
    const shredInterval = setInterval(() => {
        rantBox.value = text.split('').map((char, index) => {
            if (index < progress) {
                return shredChars[Math.floor(Math.random() * shredChars.length)];
            }
            return char;
        }).join('');
        
        progress += 3;
        
        if (progress > text.length) {
            clearInterval(shredInterval);
            setTimeout(() => {
                rantBox.value = '';
            }, 800);
        }
    }, 30);
});

// Updated excuses with 90s flair
const excuses = [
    "My dial-up connection is still connecting...",
    "The Y2K bug finally caught up with me",
    "My Tamagotchi needed emergency attention",
    "Had to return some videotapes",
    "My Furby won't stop talking",
    "AOL CD installation went wrong",
    "Got lost in a maze screensaver",
    "My pager is showing only 80085",
    "The paperclip assistant won't let me work",
    "My GeoCities page needed urgent updates"
];

document.getElementById('excuse-button').addEventListener('click', () => {
    const excuseText = document.getElementById('excuse-text');
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    excuseText.innerHTML = `<span style="color: #00ff00;">➤</span> ${randomExcuse}`;
    excuseText.style.animation = 'none';
    excuseText.offsetHeight;
    excuseText.style.animation = 'glow 1s ease-in-out infinite alternate';
});

// Add some CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glow {
        from {
            box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00ff;
        }
        to {
            box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00ff;
        }
    }
`;
document.head.appendChild(style);

// Simple visitor counter using localStorage
const visitorCount = localStorage.getItem('visitorCount') || 0;
const newCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', newCount);
document.getElementById('visitor-count').textContent = newCount.toString().padStart(5, '0');
