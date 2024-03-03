function FXMLHttpRequest() {
    this.readyState = 0;
    this.status = 0;
    this.responseText = '';
    this.onreadystatechange = null;
}

FXMLHttpRequest.prototype.open = function(method, url, async) {
    this.method = method;
    this.url = url;
    this.async = async !== false;
    this.readyState = 1;
    if (this.onreadystatechange) {
        this.onreadystatechange();
    }
};

FXMLHttpRequest.prototype.send = function() {
    var xhr = this;
    setTimeout(function() {
        var response = {
            status: 200,
            responseText: 'Sample response'
        };
        if (xhr.async) {
            xhr.status = response.status;
            xhr.responseText = response.responseText;
            xhr.readyState = 4;
            if (xhr.onreadystatechange) {
                xhr.onreadystatechange();
            }
        }
    }, 0);
};
