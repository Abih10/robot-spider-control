// Initialize the joystick with the library
const joystick = nipplejs.create({
    zone: document.getElementById('joystick-container'),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'blue'
});

// Function to send the direction command to the ESP32
function sendDirection(direction) {
    let command = '';
    switch (direction) {
        case 'up':
            command = 'forward';
            break;
        case 'down':
            command = 'reverse';
            break;
        case 'left':
            command = 'left';
            break;
        case 'right':
            command = 'right';
            break;
    }
    // Send command to ESP32
    fetch(`/control?direction=${command}`)
        .then(response => console.log('Command sent:', command))
        .catch(error => console.error('Error:', error));
}

// Detect joystick movements and determine direction
joystick.on('move', (evt, data) => {
    if (data.direction) {
        const direction = data.direction.angle;
        sendDirection(direction);
    }
});
