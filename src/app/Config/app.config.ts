import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

    private _config: Object;

    constructor(private http: HttpClient) { }

    load() {
        // json files will be loaded here
        return new Promise((resolve, reject) => {
            this.http.get('assets/config/config.json')
                .subscribe((data) => {

                    console.log('Config data',data);
                    
                    this._config = data;
                    resolve(true);
                });
        });
    }

    get(key: any) {
       localStorage.setItem(key, this._config[key]);
        return this._config[key];
    }
// tslint:disable-next-line:eofline
};