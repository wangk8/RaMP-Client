import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { DataProperty } from '@ramp/shared/ui/ncats-datatable';

@Component({
  selector: 'ramp-query-page',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryPageComponent implements OnInit {
  @Input() dataColumns!: DataProperty[];
  @Input() dataAsDataProperty!: { [key: string]: DataProperty }[];
  noDataArr = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(change: { [n: string]: SimpleChange }) {
    if (change.dataAsDataProperty && !change.dataAsDataProperty.firstChange) {
      if (
        !this.dataAsDataProperty.length ||
        this.dataAsDataProperty.length === 0
      ) {
        this.noDataArr = true;
      }
    }
  }
}
