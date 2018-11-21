import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'mgrSummary'
})
export class MgrSummaryPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }

    let activeCount = 'n/a';
    const titleText = _.isUndefined(value.active_name) ? '' : `active daemon: ${value.active_name}`;
    if (titleText.length > 0) {
      activeCount = '1';
    }
    const standbyCount = value.standbys.length;
    const mgrSummary = [
      {
        content: `${activeCount} active`,
        class: 'mgr-active-name',
        titleText: titleText
      }
    ];

    mgrSummary.push({
      content: '',
      class: 'card-text-line-break',
      titleText: ''
    });
    mgrSummary.push({
      content: `${standbyCount} standby`,
      class: '',
      titleText: ''
    });

    return mgrSummary;
  }
}
