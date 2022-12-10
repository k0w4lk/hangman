import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EndgameDialogComponent } from './components/endgame-dialog/endgame-dialog.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { LettersComponent } from './components/letters/letters.component';
import { WordComponent } from './components/word/word.component';
import { HangmanPartDirective } from './directives/hangman-part.directive';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    LettersComponent,
    WordComponent,
    HangmanPartDirective,
    EndgameDialogComponent
  ],
  imports: [BrowserModule, CommonModule, DialogModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
