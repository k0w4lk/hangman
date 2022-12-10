import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Letter } from 'src/app/interfaces/letter';

@Injectable({
  providedIn: 'root'
})
export class LettersService {
  letters$: Observable<Letter[]>;

  private letters = new BehaviorSubject<Letter[]>([]);

  constructor() {
    this.letters$ = this.letters.asObservable();

    this.generateLetters();
  }

  pressLetter(pressedLetter: Letter): void {
    const letters = this.letters.getValue().map((letter) => {
      if (letter.value === pressedLetter.value && !letter.pressed) {
        return { ...letter, pressed: true };
      } else {
        return letter;
      }
    });

    this.letters.next(letters);
  }

  generateLetters(): void {
    const letters: Letter[] = [];

    for (let code = 97; code <= 122; code++) {
      letters.push({
        value: String.fromCharCode(code),
        pressed: false
      });
    }

    this.letters.next(letters);
  }
}
