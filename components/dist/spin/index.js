Component({
    externalClasses: ['i-class'],

    properties: {
        // small || default || large
        size: {
            type: String,
            value: 'default'
        },
        fix: {
            type: Boolean,
            value: false
        },
        color: {
          type: String,
          value: '#2d8cf0'
        },
        fullscreen: {
            type: Boolean,
            value: false
        },
        custom: {
            type: Boolean,
            value: false
        }
    }
});
