import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { Letter } from 'src/app/interfaces/letter';
import { LettersService } from 'src/app/services/letters/letters.service';
import { WordService } from 'src/app/services/word/word.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersComponent implements OnInit, AfterViewInit, OnDestroy {
  public letters: Letter[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private lettersService: LettersService,
    private wordService: WordService
  ) {}

  public ngOnInit(): void {
    this.setLetters();
  }

  public ngAfterViewInit(): void {
    this.handleKeyboardKeys();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pressLetter(letter: Letter): void {
    this.lettersService.pressLetter(letter);
    this.wordService.checkGuess(letter);
  }

  private setLetters(): void {
    this.lettersService.letters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((letters) => {
        this.letters = letters;
        this.cdr.markForCheck();
      });
  }

  private handleKeyboardKeys(): void {
    fromEvent(window, 'keydown')
      .pipe(
        takeUntil(this.destroy$),
        map((event) => event as KeyboardEvent)
      )
      .subscribe((event) => {
        const key = event.key.toLowerCase();

        const pressedLetter = this.letters.find(
          (letter) => letter.value === key
        );

        if (pressedLetter) {
          this.pressLetter(pressedLetter);
        }
      });
  }
}
