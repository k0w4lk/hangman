import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ATTEMPTS_COUNT } from 'src/app/constants/constants';
import { Letter } from 'src/app/interfaces/letter';
import { environment } from 'src/environments/environment';
import { WordsCategories } from '../../interfaces/words-categories';
import { getRandomArrayItem } from '../../utilities/random-array-item';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  public attemptsSpent$: Observable<number>;

  public currentCategory$: Observable<string>;

  public currentWord$: Observable<string>;

  public guessedWordPart$: Observable<string>;

  private attemptsSpent = new BehaviorSubject<number>(0);

  private currentCategory = new BehaviorSubject<string>('');

  private currentWord = new BehaviorSubject<string>('');

  private guessedWordPart = new BehaviorSubject<string>('');

  private words: WordsCategories = {};

  constructor(
    private modalService: ModalService,
    private httpClient: HttpClient
  ) {
    this.attemptsSpent$ = this.attemptsSpent.asObservable();
    this.currentCategory$ = this.currentCategory.asObservable();
    this.currentWord$ = this.currentWord.asObservable();
    this.guessedWordPart$ = this.guessedWordPart.asObservable();
  }

  public getWords$(): Observable<WordsCategories> {
    return this.httpClient
      .get<WordsCategories>(environment.url + '/assets/words.json')
      .pipe(
        tap((words) => {
          this.words = words;
        })
      );
  }

  public setCurrentCategoryAndWord(words: WordsCategories): void {
    const randomCategory = getRandomArrayItem(Object.entries(words));
    const randomCategoryName = randomCategory[0];
    const randomWord = getRandomArrayItem(randomCategory[1]).toLowerCase();

    this.currentCategory.next(randomCategoryName);
    this.currentWord.next(randomWord);
  }

  public checkGuess(letter: Letter): void {
    if (this.currentWord.getValue().includes(letter.value)) {
      this.guessedWordPart.next(this.guessedWordPart.getValue() + letter.value);
      this.checkWin();
    } else {
      this.updateSpentAttempts();
      this.checkLoose();
    }
  }

  public updateSpentAttempts(): void {
    this.attemptsSpent.next(this.attemptsSpent.getValue() + 1);
  }

  public reset(): void {
    this.setCurrentCategoryAndWord(this.words);
    this.attemptsSpent.next(0);
    this.guessedWordPart.next('');
  }

  private checkWin(): void {
    const currentWordLetters = this.currentWord
      .getValue()
      .split('')
      .filter((letter, index, arr) => index === arr.lastIndexOf(letter))
      .sort()
      .join('');
    const currentGuess = this.guessedWordPart
      .getValue()
      .split('')
      .sort()
      .join('');

    if (currentWordLetters === currentGuess) {
      this.modalService.openWinDialog();
    }
  }

  private checkLoose(): void {
    if (this.attemptsSpent.getValue() === ATTEMPTS_COUNT) {
      this.modalService.openLooseDialog();
    }
  }
}
