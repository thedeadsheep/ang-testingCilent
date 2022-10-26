
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'uploadfile';
 
  displayMultipleImageArray!: Array<any>;
 
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
 
  @ViewChild('multipleInput', { static: false })
  multipleInput!: ElementRef;
 
  items: any;
  multipleItems = [];
 
  constructor(private http: HttpClient) {
    this.displayMultipleImageArray = [];
  }
 
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.items = file;
    }
  }
 
 
  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleItems = event.target.files;
    }
  }
  onSubmit() {
    // construct formdata
 
    const formdata = new FormData();
 
    formdata.append('file', this.items);
 
    // post request to express backend
 
    this.http.post<any>('http://localhost:3000/file', formdata).subscribe(
      (res) => {
        console.log(res);
        this.singleInput.nativeElement.value = '';
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onMultipleSubmit() {
    const formdata = new FormData()
 
    for (let item of this.multipleItems) {
      formdata.append('files', item)
    }
 
    this.http.post<any>('http://localhost:3000/multipleFiles', formdata)
      .subscribe((res) => {
        console.log(res)
        this.multipleInput.nativeElement.value = ""
        console.log(res.path)
        this.displayMultipleImageArray = res.path
        
    })
  }
}