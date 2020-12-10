import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import * as config from '../../app/app-config.json';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  
  constructor(private broadcastService: BroadcastService, private authService: MsalService) { }

  ngOnInit(): void {
    
    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      console.log(payload);
    });

    this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      console.log(payload);
    });

  }

  adminConsent() {

    if (this.authService.getAccount()) {
      const state = Math.floor(Math.random() * 90000) + 10000; // state parameter for anti token forgery

      // admin consent endpoint.
      const adminConsentUri = "https://login.microsoftonline.com/" + 
      `${this.authService.getAccount().idTokenClaims.tid}` + "/v2.0/adminconsent?client_id=" + 
      `${config.auth.clientId}` + "&state=" + `${state}` + "&redirect_uri=" + `${config.auth.redirectUri}` +
      "&scope=api://b4318309-b35d-4cdf-9c7a-119a0f9bf7d2/access_as_user";
  
      // redirecting...
      window.location.replace(adminConsentUri);
      
    } else {
      alert('Please sign-in first.')
    }
  }

}
