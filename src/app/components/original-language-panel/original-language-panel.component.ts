import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleDataService, Verse } from '../../services/bible-data.service';

@Component({
  selector: 'app-original-language-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './original-language-panel.component.html',
  styleUrl: './original-language-panel.component.scss'
})
export class OriginalLanguagePanelComponent implements OnInit {
  selectedVerses = signal<Verse[]>([]);
  selectedLanguage = signal<'greek' | 'hebrew' | null>(null);

  private selectedBook = signal<string>('Genesis');
  private selectedChapter = signal<number>(1);
  private selectedVerse = signal<number | null>(null);

  constructor(private bibleDataService: BibleDataService) {}

  ngOnInit(): void {
    this.loadVersesForDisplay();
  }

  private loadVersesForDisplay(): void {
    const bookName = this.selectedBook();
    const chapterNum = this.selectedChapter();
    const verseNum = this.selectedVerse();

    // Only display the selected verse
    if (verseNum) {
      const verse = this.bibleDataService.getVerse(bookName, chapterNum, verseNum);
      if (verse) {
        this.selectedVerses.set([verse]);
        this.selectedLanguage.set(verse.originalLanguage);
      } else {
        this.selectedVerses.set([]);
      }
    } else {
      this.selectedVerses.set([]);
    }
  }

  updateDisplay(bookName: string, chapterNumber: number, verseNumber?: number): void {
    this.selectedBook.set(bookName);
    this.selectedChapter.set(chapterNumber);
    if (verseNumber) {
      this.selectedVerse.set(verseNumber);
    }
    this.loadVersesForDisplay();
  }

  getLanguageLabel(): string {
    const language = this.selectedLanguage();
    return language === 'greek' ? 'Koine Greek' : language === 'hebrew' ? 'Biblical Hebrew' : 'Unknown';
  }
}
