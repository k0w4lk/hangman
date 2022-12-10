import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject
} from '@angular/core';
import { take } from 'rxjs';
import { LettersService } from 'src/app/services/letters/letters.service';
import { WordService } from 'src/app/services/word/word.service';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgame-dialog.component.html',
  styleUrls: ['./endgame-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndgameDialogComponent implements AfterViewInit {
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogRef: DialogRef,
    private lettersService: LettersService,
    private wordService: WordService
  ) {}

  ngAfterViewInit(): void {
    this.handleDialogClose();
  }

  close(): void {
    this.dialogRef.close();
  }

  private restart(): void {
    this.dialogRef.closed.pipe(take(1)).subscribe(() => {
      this.lettersService.generateLetters();
      this.wordService.reset();
    });
  }

  private handleDialogClose(): void {
    this.restart();
  }
}
