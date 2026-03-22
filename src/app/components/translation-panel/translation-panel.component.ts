import { Component, OnInit, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { BibleDataService, Translation, Verse } from '../../services/bible-data.service';

@Component({
  selector: 'app-translation-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './translation-panel.component.html',
  styleUrl: './translation-panel.component.scss'
})
export class TranslationPanelComponent implements OnInit {
  @Input() title = 'Translation';
  @Input() position: 'left' | 'right' = 'left';

  form!: FormGroup;
  translations = signal<Translation[]>([]);
  selectedVersesDisplay = signal<Array<{ verse: number; text: string }>>([]);

  private selectedBook = signal<string>('Genesis');
  private selectedChapter = signal<number>(1);
  private selectedVerse = signal<number>(1);

  constructor(private fb: FormBuilder, private bibleDataService: BibleDataService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTranslations();
    this.loadVersesForDisplay();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      translation: ['niv']
    });

    this.form.get('translation')?.valueChanges.subscribe(() => {
      this.loadVersesForDisplay();
    });
  }

  private loadTranslations(): void {
    const translations = this.bibleDataService.getTranslations();
    this.translations.set(translations);
  }

  private loadVersesForDisplay(): void {
    const bookName = this.selectedBook();
    const chapterNum = this.selectedChapter();
    const verseNum = this.selectedVerse();
    const translationId = this.form.get('translation')?.value || 'niv';

    // Only display the selected verse, not all verses from the chapter
    if (verseNum) {
      const verseText = this.bibleDataService.getVerseText(translationId, bookName, chapterNum, verseNum);
      this.selectedVersesDisplay.set([{
        verse: verseNum,
        text: verseText
      }]);
    } else {
      this.selectedVersesDisplay.set([]);
    }
  }

  updateDisplay(bookName: string, chapterNumber: number, verseNumber: number): void {
    this.selectedBook.set(bookName);
    this.selectedChapter.set(chapterNumber);
    this.selectedVerse.set(verseNumber);
    this.loadVersesForDisplay();
  }

  getSelectedTranslationName(): string {
    const translationId = this.form.get('translation')?.value;
    const translation = this.bibleDataService.getTranslation(translationId);
    return translation ? translation.name : 'Unknown';
  }
}
