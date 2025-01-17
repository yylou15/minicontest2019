"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';
component_1.VantComponent({
    props: {
        text: {
            type: String,
            value: ''
        },
        mode: {
            type: String,
            value: ''
        },
        url: {
            type: String,
            value: ''
        },
        openType: {
            type: String,
            value: 'navigate'
        },
        delay: {
            type: Number,
            value: 0
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: true
        },
        leftIcon: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: FONT_COLOR
        },
        backgroundColor: {
            type: String,
            value: BG_COLOR
        }
    },
    data: {
        show: true,
        hasRightIcon: false
    },
    watch: {
        text: function () {
            this.set({}, this.init);
        }
    },
    created: function () {
        if (this.data.mode) {
            this.set({
                hasRightIcon: true
            });
        }
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: 'linear'
        });
    },
    destroyed: function () {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function () {
            var _this = this;
            Promise.all([
                this.getRect('.van-notice-bar__content'),
                this.getRect('.van-notice-bar__content-wrap')
            ]).then(function (rects) {
                var contentRect = rects[0], wrapRect = rects[1];
                if (contentRect == null ||
                    wrapRect == null ||
                    !contentRect.width ||
                    !wrapRect.width) {
                    return;
                }
                var _a = _this.data, speed = _a.speed, scrollable = _a.scrollable, delay = _a.delay;
                if (scrollable && wrapRect.width < contentRect.width) {
                    var duration = (contentRect.width / speed) * 1000;
                    _this.wrapWidth = wrapRect.width;
                    _this.contentWidth = contentRect.width;
                    _this.duration = duration;
                    _this.animation = wx.createAnimation({
                        duration: duration,
                        timingFunction: 'linear',
                        delay: delay
                    });
                    _this.scroll();
                }
            });
        },
        scroll: function () {
            var _this = this;
            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.set({
                animationData: this.resetAnimation
                    .translateX(this.wrapWidth)
                    .step()
                    .export()
            });
            setTimeout(function () {
                _this.set({
                    animationData: _this.animation
                        .translateX(-_this.contentWidth)
                        .step()
                        .export()
                });
            }, 20);
            this.timer = setTimeout(function () {
                _this.scroll();
            }, this.duration);
        },
        onClickIcon: function () {
            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.set({ show: false });
        },
        onClick: function (event) {
            this.$emit('click', event);
        }
    }
});
