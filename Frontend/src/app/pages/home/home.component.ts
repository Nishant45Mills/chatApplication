import { Component, OnInit } from '@angular/core';
import {
  debounce,
  debounceTime,
  delay,
  from,
  map,
  of,
  switchAll,
  switchMap,
} from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchedUser!: any;

  constructor(private http: HttpService) {}

  getData(data: any) {
    return of(`${data} is good fruit`).pipe(delay(1000));
  }

  ngOnInit(): void {
    let obs = from(['mango', 'apple', 'grapes']);

    obs.pipe(switchMap((data) => this.getData(data))).subscribe((data) => {
      console.log(data);
    });
  }

  userName!: string;

  // searchUser(event: any) {
  //   this.userName = event.target.value;

  //   this.http
  //     .getUser(`user?search=${this.userName}`)
  //     .subscribe({
  //       next: (data) => {
  //         this.searchedUser = data;
  //       },
  //     });
  // }
}
