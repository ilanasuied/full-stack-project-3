class FXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.responseText = '';
        this.onreadystatechange = null;
    }

    open(method, database) {
        this.method = method;
        this.url = database;
        this.readyState = 1;
    }

    // des que le client fait send, send va dmd au serveur les data dapres le url que le client a dmd dams le url
    send(data) {
        var xhr = this;
        switch (xhr.method) {
            case 'GET': xhr.responseText = get(xhr.url);
                break;
            case 'POST': xhr.responseText = post(xhr.url, data);
                break;
            case 'PUT': xhr.responseText = put(xhr.url, data);
                break;
            case 'DELETE': xhr.responseText = dlt(xhr.url, data);
                break;
        }
        xhr.readyState = 4;
        // status devient 200 si le url est bon et du coup ya une bonne valeur dans responseText 
        xhr.status = 200;
        if (xhr.onreadystatechange) {
            xhr.onreadystatechange();
        }

    }
}



