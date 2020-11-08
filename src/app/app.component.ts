import {Component} from '@angular/core';
import {stringify} from '@angular/compiler/src/util';
import {Observable} from 'rxjs';
import {UploadService} from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filesUrl: any;
  imgUrl: any;
  files = [];
  images = [];
  reader = new FileReader();

  constructor(private uploadService: UploadService) {
  }

  onSelectFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(event.target.files[0]);
      let viewer = '';
      console.log(stringify(event.target.files[0].name).includes('doc'));
      const objectURL = window.URL.createObjectURL(event.target.files[0]);
      if (stringify(event.target.files[0].name).includes('pdf')) {
        viewer = 'pdf';
      } else if (stringify(event.target.files[0].name).includes('doc')) {
        viewer = 'mammoth';
      } else {
        viewer = 'google';
      }
      const file = {
        objectURL,
        viewer,
      };
      this.files.push(file);
    }
  }

  onSelectImage(event): void {
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(event.target.files[0]);

      this.reader.onload = (response) => {
        this.imgUrl = response.target.result;
        this.images.push(this.imgUrl);
      };
    }
  }

}
