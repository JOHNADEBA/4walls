import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { environment } from '../../../environments/environment';

declare let Email: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  private map: any;
  isContact: boolean = false;
  isError: boolean = false;
  uploadedFiles: any[] = [];

  constructor() {}
  ngAfterViewInit(): void {
    this.loadMap();
    setTimeout(() => {
      this.isContact = true;
    }, 0.1);
  }

  // ngOnInit(): void {}

  loadMap() {
    const icon = L.icon({
      iconUrl: 'assets/marker_icon.png',
      shadowUrl: 'assets/marker_shadow.png',
      iconAnchor: [13, 0],
    });

    const { lng, lat, zoom, accessToken } = environment.mapbox;

    this.map = L.map('map', {
      attributionControl: false,
    }).setView([lat, lng], zoom);

    const tiles = L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' +
        accessToken,
      {
        attribution:
          '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 20,
      }
    );

    let marker = L.marker([lat, lng], { icon });
    tiles.addTo(this.map);
    marker.addTo(this.map);

    marker.bindPopup('<b class="edit">Mislinjska Dobrava 68</b>').openPopup();
  }

  async onUpload(files: any) {
    const fileTarget = files.target.files;
    try {
      for (let i = 0; i < fileTarget.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(fileTarget[i]);
        reader.onload = () => {
          this.uploadedFiles.push({
            name: fileTarget[i].name,
            data: reader.result,
          });
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendMessage(formData: any) {
    const { email, name, message, phone, terms } = formData;
    if (
      email === '' ||
      name === '' ||
      message === '' ||
      phone === '' ||
      terms === '' ||
      terms === false
    ) {
      this.isError = true;
      return;
    }

    this.isError = false;

    const { sender, SecureToken } = environment.email;
    let subject = 'REQUEST';

    const emailBody = {
      SecureToken,
      To: email,
      From: sender, //4walls.gradbenadela@gmail.com
      FromName: name,
      Subject: subject,
      Body: `${message}<br /> 
        <br> Telefon: </b> ${phone}<br />
        <b>Name: </b>${name} <br />
        <b>Email: </b>${email} <br /><br />
        <b>~End of Message.~</b>`,

      Attachments: this.uploadedFiles,
    };
    Email.send(emailBody).then((mgs: any) => {
      console.log(mgs);
    });
  }
}
