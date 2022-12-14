import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { WordService } from 'src/app/services/word/word.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit, OnDestroy {
  public currentTheme: string = '';

  public currentWord: string[] = [];

  public guessedWordPart: string = '';

  public pressedLetters: string = '';

  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private wordService: WordService
  ) {}

  public ngOnInit(): void {
    this.setThemeAndWord();
    this.watchGuesses();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private setThemeAndWord(): void {
    combineLatest([
      this.wordService.currentCategory$,
      this.wordService.currentWord$
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(([theme, word]) => {
        this.currentTheme = theme;
        this.currentWord = word.split('');

        this.cdr.markForCheck();
      });
  }

  private watchGuesses(): void {
    this.wordService.guessedWordPart$.subscribe((part) => {
      this.guessedWordPart = part;

      this.cdr.markForCheck();
    });
  }
}
