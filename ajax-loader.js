AjaxLoader = function (parentElement, settings) {
    var self = this;
    var loaderHeight = 16;
    var loader = null;
    var defaultOptions = {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#0087b7',
        color: '#000',
        fontFamily: 'arial, sans',
        fontWeight: 'bold',
        image: './ajax-loader.gif',
        lineSize: 18,
        message: null,
        opacity: 0.9,
        showImmediately: false,
        zIndex: 9999
    };
    var options = $.extend(defaultOptions, settings);
    var hidden = true;

    this.show = function () {
        if (loader !== null) {
            hidden = false;
            calculatePosition();

            loader.show();
        }
    };

    this.hide = function () {
        hidden = true;
        if (loader !== null) {
            loader.hide();
        }
    };

    this.remove = function () {
        hidden = true;
        if (loader !== null) {
            loader.remove();
            loader = null;
        }
    };

    init();

    function init() {
        var message = '';

        if (options.message !== null) {
            message = '<br/><span>' + options.message + '</span>';
            loaderHeight += options.lineSize;
        }

        loader = $('<div class="ajax-loader"><img src="' + options.image + '" />' + message + '</div>');
        loader
            .height(loaderHeight)
            .css('position', 'absolute')
            .css('text-align', 'center')
            .css('display', 'none')
            .css('border-width', options.borderWidth)
            .css('border-style', options.borderStyle)
            .css('border-color', options.borderColor)
            .css('background-color', options.backgroundColor)
            .css('color', options.color)
            .css('font-family', options.fontFamily)
            .css('font-weight', options.fontWeight)
            .css('font-size', (options.lineSize * 0.7) + 'px')
            .css('line-height', options.lineSize + 'px')
            .css('opacity', options.opacity)
            .css('z-index', options.zIndex);

        $('body').append(loader);
        if (options.showImmediately !== undefined && options.showImmediately === true) {
            self.show();
        }
    }

    function calculatePosition() {
        var parent = $(parentElement);

        if (parent.length < 1) {
            return;
        }

        var offset = parent.offset();
        var padding = (parent.innerHeight() - loaderHeight) / 2;

        if (padding <= 0) {
            padding = 5;
        }

        var borderTop = Math.ceil((parent.outerHeight() - parent.innerHeight()) / 2);
        var borderLeft = (parent.outerWidth() - parent.innerWidth()) / 2;

        loader
            .width(parent.innerWidth())
            .css('padding-top', Math.floor(padding))
            .css('padding-bottom', Math.ceil(padding))
            .css('top', offset.top + borderTop - 1)
            .css('left', offset.left + borderLeft - 1);

        if (hidden === false) {
            setTimeout(calculatePosition, 1000);
        }
    }
};

AjaxLoader.prototype = {};
