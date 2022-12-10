import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ATTEMPTS_COUNT } from 'src/app/constants/constants';
import { Letter } from 'src/app/interfaces/letter';
import { WordsCategories } from '../../interfaces/words-categories';
import { getRandomArrayItem } from '../../utilities/random-array-item';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  attemptsSpent$: Observable<number>;
  currentCategory$: Observable<string>;
  currentWord$: Observable<string>;
  guessedWordPart$: Observable<string>;

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

  getWords$(): Observable<WordsCategories> {
    return this.httpClient.get<WordsCategories>('/assets/words.json').pipe(
      tap((words) => {
        this.words = words;
      })
    );
  }

  setCurrentCategoryAndWord(words: WordsCategories): void {
    const randomCategory = getRandomArrayItem(Object.entries(words));
    const randomCategoryName = randomCategory[0];
    const randomWord = getRandomArrayItem(randomCategory[1]).toLowerCase();

    this.currentCategory.next(randomCategoryName);
    this.currentWord.next(randomWord);
  }

  checkGuess(letter: Letter): void {
    if (this.currentWord.getValue().includes(letter.value)) {
      this.guessedWordPart.next(this.guessedWordPart.getValue() + letter.value);
      this.checkWin();
    } else {
      this.updateSpentAttempts();
      this.checkLoose();
    }
  }

  updateSpentAttempts(): void {
    this.attemptsSpent.next(this.attemptsSpent.getValue() + 1);
  }

  reset(): void {
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
