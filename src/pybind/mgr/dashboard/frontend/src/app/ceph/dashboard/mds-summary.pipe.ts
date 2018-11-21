import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'mdsSummary'
})
export class MdsSummaryPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }

    let contentLine1 = '';
    let contentLine2 = '';
    let standbys = 0;
    let active = 0;
    let standbyReplay = 0;
    _.each(value.standbys, (s, i) => {
      standbys += 1;
    });

    if (value.standbys && !value.filesystems) {
      contentLine1 = `${standbys} up`;
      contentLine2 = 'no filesystems';
    } else if (value.filesystems.length === 0) {
      contentLine1 = 'no filesystems';
    } else {
      _.each(value.filesystems, (fs, i) => {
        _.each(fs.mdsmap.info, (mds, j) => {
          if (mds.state === 'up:standby-replay') {
            standbyReplay += 1;
          } else {
            active += 1;
          }
        });
      });

      contentLine1 = `${active} active`;
      contentLine2 = `${standbys + standbyReplay} standby`;
    }

    const mgrSummary = [
      {
        content: contentLine1,
        class: ''
      }
    ];

    if (contentLine2) {
      mgrSummary.push({
        content: '',
        class: 'card-text-line-break'
      });
      mgrSummary.push({
        content: contentLine2,
        class: ''
      });
    }

    return mgrSummary;
  }
}
