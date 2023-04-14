window.browserResize = {
    getInnerHeight: function () {
        return window.innerHeight;
    },
    getInnerWidth: function () {
        return window.innerWidth;
    },
    registerResizeCallback: function () {
        window.addEventListener("resize", browserResize.resized);
        console.log("browserResize.resized registered...")
    },
    resized: function () {
        setTimeout(function () {
            DotNet.invokeMethodAsync("SADMPrivate.Client", 'OnBrowserResize').then(data => data);
        }, 500);
    }
}