import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class AppCongifService {
  baseApiUrl: any;

  constructor(private appConfig: AppConfig) { }

  public get API_BASE(): string {

    this.baseApiUrl = this.appConfig.get('baseApiUrl');

    return this.baseApiUrl;
}
}
