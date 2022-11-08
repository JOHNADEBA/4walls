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

  onUpload(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedFiles.push(event.target.files[i]);
    }
    //   for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }
    console.log(this.uploadedFiles);
  }

  getTrip(formData: any) {
    console.log(formData);
    const { email, name, message, phone, terms } = formData;
    let subject = 'REQUEST';

    console.log(this.uploadedFiles);

    Email.send({
      SecureToken: '6c8e858e-2ebc-4471-95e6-1963e2074968',
      To: email,
      From: 'jhnadeba@gmail.com', //4walls.gradbenadela@gmail.com
      Subject: subject,
      Body: `${message}<br /> 
        <br> Telefon: </b> ${phone}<br />
        <b>Name: </b>${name} <br />
        <b>Email: </b>${email} <br />
        <b>~End of Message.~</b>`,

      Attachments: this.uploadedFiles.forEach((element: any) => {
        console.log(element);
        //https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80
        [
          {
            name: element.name,
            path: element.type,
          },
        ];
      }),
    }).then((mgs: any) => {
      console.log(mgs);
    });
  }
}
