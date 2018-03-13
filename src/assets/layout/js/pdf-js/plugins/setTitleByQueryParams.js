var SetTitleByQueryParams = /** @class */ (function () {
    function SetTitleByQueryParams() {
        this.setting = {
            title: null
        };
    }
    SetTitleByQueryParams.prototype.init = function () {
        var _this = this;
        window.onload = function () {
            var titleEl = document.getElementsByTagName('title')[0];
            var docEl = document.documentElement;
            //
            _this.forceSetTitleByQueryParams();
            //
            if (docEl && docEl.addEventListener) {
                docEl.addEventListener('DOMSubtreeModified', function (evt) {
                    var t = evt.target;
                    if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
                        _this.forceSetTitleByQueryParams();
                    }
                }, false);
            }
            else {
                document.onpropertychange = function () {
                    if (window.event.propertyName === 'title') {
                        _this.forceSetTitleByQueryParams();
                    }
                };
            }
        };
    };
    SetTitleByQueryParams.prototype.getTitleByQueryParams = function () {
        var _this = this;
        if (this.setting.title) {
            return this.setting.title;
        }
        //
        var isQueryParamsEmpty = !location.search;
        if (isQueryParamsEmpty) {
            return this.setting.title;
        }
        //
        var queryParams = location.search.split('&');
        queryParams.forEach(function (queryParam) {
            var keyValuePair = queryParam.split('=');
            var key = keyValuePair[0];
            if (key === 'title') {
                var value = decodeURIComponent(keyValuePair[1]);
                _this.setting.title = value;
                return;
            }
        });
        return this.setting.title;
    };
    SetTitleByQueryParams.prototype.forceSetTitleByQueryParams = function () {
        var isSetedTitle = this.setting.title === document.title;
        if (isSetedTitle) {
            return;
        }
        var title = this.getTitleByQueryParams();
        if (title) {
            this.setTitle(title);
        }
    };
    SetTitleByQueryParams.prototype.setTitle = function (title) {
        document.title = title;
    };
    return SetTitleByQueryParams;
}());
//
new SetTitleByQueryParams().init();
//# sourceMappingURL=setTitleByQueryParams.js.map