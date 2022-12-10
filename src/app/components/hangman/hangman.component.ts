import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HangmanPartDirective } from 'src/app/directives/hangman-part.directive';
import { WordService } from 'src/app/services/word/word.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HangmanComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(HangmanPartDirective)
  private hangmanParts: QueryList<HangmanPartDirective>;

  private currentPartIndex = 0;
  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private wordService: WordService
  ) {}

  ngAfterViewInit(): void {
    this.wordService.attemptsSpent$
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        if (value !== 0) {
          this.hangmanParts.get(this.currentPartIndex)?.show();
          this.currentPartIndex += 1;
        } else {
          this.currentPartIndex = 0;
          this.hangmanParts.forEach((part) => {
            part.hide();
          });
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
