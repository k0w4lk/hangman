import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { EndgameDialogComponent } from 'src/app/components/endgame-dialog/endgame-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: Dialog) {}

  openWinDialog(): void {
    this.dialog.open(EndgameDialogComponent, {
      data: {
        message: 'YOU WON!'
      },
      disableClose: true
    });
  }

  openLooseDialog(): void {
    this.dialog.open(EndgameDialogComponent, {
      data: {
        message: 'YOU LOST!'
      },
      disableClose: true
    });
  }
}
