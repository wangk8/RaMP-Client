import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ramp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(
    private lodadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.lodadingService.isLoading.subscribe(isLoading => {
      console.log('here');
      this.isLoading = isLoading;
    });
  }

}
