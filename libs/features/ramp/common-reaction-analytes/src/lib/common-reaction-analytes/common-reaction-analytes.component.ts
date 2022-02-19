import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RampQuery, Reaction } from '@ramp/models/ramp-models';
import { PageCoreComponent } from '@ramp/shared/ramp/page-core';
import { DataProperty } from '@ramp/shared/ui/ncats-datatable';
import {
  fetchCommonReactionAnalytes,
  fetchCommonReactionAnalytesFile,
  RampFacade,
} from '@ramp/stores/ramp-store';

@Component({
  selector: 'ramp-common-reaction-analytes',
  templateUrl: './common-reaction-analytes.component.html',
  styleUrls: ['./common-reaction-analytes.component.scss'],
})
export class CommonReactionAnalytesComponent
  extends PageCoreComponent
  implements OnInit
{
  reactionColumns: DataProperty[] = [
    new DataProperty({
      label: 'Analyte',
      field: 'inputAnalyte',
      sortable: true,
    }),
    new DataProperty({
      label: 'Catalyzed By',
      field: 'inputCatalyzedByCommonName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Catalyst IDs',
      field: 'inputCatalyzedBySourceIdsString',
    }),
  ];

  constructor(
    private ref: ChangeDetectorRef,
    protected rampFacade: RampFacade,
    protected route: ActivatedRoute
  ) {
    super(route, rampFacade);
  }

  ngOnInit(): void {
    this.rampFacade.reactions$.subscribe(
      (res: { data: Reaction[]; query: RampQuery } | undefined) => {
        if (res && res.data) {
          this._mapData(res.data);
       //   this.matches = Array.from(new Set(res.data.map(reaction => reaction.inputAnalyte.toLocaleLowerCase())));
        //  this.noMatches = this.inputList.filter((p:string) => !this.matches.includes(p.toLocaleLowerCase()));
        }
        if (res && res.query) {
          this.query = res.query;
        }
        this.ref.markForCheck();
      }
    );
  }

  fetchReactions(event: string[]): void {
    this.inputList = event.map(item => item.toLocaleLowerCase());
    this.rampFacade.dispatch(fetchCommonReactionAnalytes({ analytes: event }));
  }

  fetchReactionsFile(event: string[]): void {
    this.rampFacade.dispatch(
      fetchCommonReactionAnalytesFile({ analytes: event, format: 'tsv' })
    );
  }

  private _mapData(data: any): void {
    this.dataAsDataProperty = data.map((reaction: Reaction) => {
      const newObj: { [key: string]: DataProperty } = {};
      Object.entries(reaction).map((value: any, index: any) => {
        newObj[value[0]] = new DataProperty({
          name: value[0],
          label: value[0],
          value: value[1],
        });
      });
      return newObj;
    });
  }
}
