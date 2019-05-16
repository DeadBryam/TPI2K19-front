class abstractMD {
    constructor(resource) {
        this.BASE_URL = 'http://localhost:3000/';
        this.RESOURCE = resource;
        this.HEADERS = {
            "Content-type": "application/json; charset=UTF-8"
        };
    }

    getJson(action = "") {
        try {
            return new Promise((resolve, reject) => {
                fetch(`${this.BASE_URL}${this.RESOURCE}/${action}`)
                    .then(res => {
                        if (res.ok)
                            resolve(res.json());
                        else
                            reject({ 'Error': 'Json' });
                    });
            });
        }
        catch (e) {
            console.error(e);
            reject({ 'Error': `${e}` });
        }
    }

    postJson(body, action = "") {
        try {
            return new Promise((resolve, reject) => {
                fetch(`${this.BASE_URL}${this.RESOURCE}/${action}`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: this.HEADERS
                })
                    .then(res => {
                        if (res.ok) {
                            resolve(res.json());
                        } else {
                            reject({ 'Error': 'Json' });
                        }
                    });
            });
        }
        catch (e) {
            console.log(e);
            reject({ 'Error': `${e}` });
        }
    }

    putJson(body, action) {
        try {
            return new Promise((resolve, reject) => {
                fetch(`${this.BASE_URL}${this.RESOURCE}/${action}`, {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: this.HEADERS
                })
                    .then(res => {
                        if (res.ok) {
                            resolve(res.json());
                        } else {
                            reject({ 'Error': 'Json' });
                        }
                    });
            });
        }
        catch (e) {
            console.log(e);
            reject({ 'Error': `${e}` });
        }
    }

    deleteJson(action) {
        try {
            return new Promise((resolve, reject) => {
                fetch(`${this.BASE_URL}${this.RESOURCE}/${action}`, {
                    method: 'DELETE',
                    headers: this.HEADERS
                })
                    .then(res => {
                        if (res.ok) {
                            resolve({ 'Estado': `${res.status}` });
                        } else {
                            reject({ 'Error': `${res.status} ${res.statusText}` });
                        }
                    });
            });
        }
        catch (e) {
            console.log(e);
            reject({ 'Error': `${e}` });
        }
    }
}

export default abstractMD;    