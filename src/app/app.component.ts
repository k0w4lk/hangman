import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WordService } from './services/word/word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.startGame();
  }

  private startGame(): void {
    this.wordService.getWords$().subscribe((words) => {
      this.wordService.setCurrentCategoryAndWord(words);
    });
  }
}
