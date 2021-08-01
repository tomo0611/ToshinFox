function createButtonForward() {
    // Use shaka.ui.Element as a base class
    Forward = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('span');
            this.button_.className = 'material-icons';
            this.button_.innerText = 'forward_5';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById("video").currentTime += 5;
            });
        }
    };
    // Factory that will create a button at run time.
    Forward.Factory = class {
        create(rootElement, controls) {
            return new Forward(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'forward_5',
        new Forward.Factory());
}

function createButtonReplay() {
    // Use shaka.ui.Element as a base class
    Replay = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('span');
            this.button_.className = 'material-icons';
            this.button_.innerText = 'replay_10';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById("video").currentTime -= 10;
            });
        }
    };
    // Factory that will create a button at run time.
    Replay.Factory = class {
        create(rootElement, controls) {
            return new Replay(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'replay_10',
        new Replay.Factory());
}

function createButtonV10() {
    // Use shaka.ui.Element as a base class
    FastX10 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.0';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.0;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX10.Factory = class {
        create(rootElement, controls) {
            return new FastX10(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.0',
        new FastX10.Factory());
}

function createButtonV12() {
    // Use shaka.ui.Element as a base class
    FastX12 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.25';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.25;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX12.Factory = class {
        create(rootElement, controls) {
            return new FastX12(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.25',
        new FastX12.Factory());
}

function createButtonV15() {
    // Use shaka.ui.Element as a base class
    FastX15 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x1.5';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 1.5;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX15.Factory = class {
        create(rootElement, controls) {
            return new FastX15(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x1.5',
        new FastX15.Factory());
}

function createButtonV20() {
    // Use shaka.ui.Element as a base class
    FastX20 = class extends shaka.ui.Element {
        constructor(parent, controls) {
            super(parent, controls);
            // The actual button that will be displayed
            this.button_ = document.createElement('button');
            this.button_.textContent = 'x2.0';
            this.parent.appendChild(this.button_);
            // Listen for clicks on the button to start the next playback
            this.eventManager.listen(this.button_, 'click', () => {
                // shaka.ui.Element gives us access to the player object as member of the class
                document.getElementById('video').playbackRate = 2.0;
            });
        }
    };
    // Factory that will create a button at run time.
    FastX20.Factory = class {
        create(rootElement, controls) {
            return new FastX20(rootElement, controls);
        }
    };
    // Register our factory with the controls, so controls can create button instances.
    shaka.ui.Controls.registerElement(
        /* This name will serve as a reference to the button in the UI configuration object */
        'x2.0',
        new FastX20.Factory());
}