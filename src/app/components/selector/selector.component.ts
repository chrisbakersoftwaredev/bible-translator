import { Component, OnInit, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BibleDataService } from '../../services/bible-data.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {
  form!: FormGroup;
  books = signal<string[]>([]);
  chapters = signal<number[]>([]);
  verses = signal<number[]>([]);

  selectedBook = signal<string>('');
  selectedChapter = signal<number | null>(null);
  selectedVerse = signal<number | null>(null);

  selectedReference = computed(() => {
    const book = this.selectedBook();
    const chapter = this.selectedChapter();
    const verse = this.selectedVerse();

    if (book && chapter && verse) {
      this.selectionChanged.emit({ book, chapter, verse });
      return `${book} ${chapter}:${verse}`;
    } else if (book && chapter) {
      return `${book} ${chapter}`;
    } else if (book) {
      return book;
    }
    return 'Select a verse';
  });

  @Output() selectionChanged = new EventEmitter<{ book: string; chapter: number; verse: number }>();

  constructor(private fb: FormBuilder, private bibleDataService: BibleDataService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadBooks();
    this.setupFormListeners();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      book: ['', Validators.required],
      chapter: [{ value: '', disabled: true }, Validators.required],
      verse: [{ value: '', disabled: true }, Validators.required]
    });
  }

  private loadBooks(): void {
    const bookNames = this.bibleDataService.getBooks().map((b: any) => b.name);
    this.books.set(bookNames);
  }

  private setupFormListeners(): void {
    this.form.get('book')?.valueChanges.subscribe(bookName => {
      this.selectedBook.set(bookName);
      this.onBookSelected(bookName);
      this.emitSelectionIfValid();
    });

    this.form.get('chapter')?.valueChanges.subscribe(chapterNumber => {
      this.selectedChapter.set(chapterNumber ? Number(chapterNumber) : null);
      this.onChapterSelected(chapterNumber);
      this.emitSelectionIfValid();
    });

    this.form.get('verse')?.valueChanges.subscribe(verseNumber => {
      this.selectedVerse.set(verseNumber ? Number(verseNumber) : null);
      this.emitSelectionIfValid();
    });
  }

  private emitSelectionIfValid(): void {
    const book = this.selectedBook();
    const chapter = this.selectedChapter();
    const verse = this.selectedVerse();

    if (book && chapter && verse) {
      this.selectionChanged.emit({ book, chapter, verse });
    }
  }

  private onBookSelected(bookName: string): void {
    const chapterControl = this.form.get('chapter');
    const verseControl = this.form.get('verse');

    if (bookName) {
      const chapterNumbers = this.bibleDataService
        .getChapters(bookName)
        .map((c: any) => c.chapterNumber);
      this.chapters.set(chapterNumbers);
      chapterControl?.enable();
      chapterControl?.reset();
      verseControl?.reset();
      verseControl?.disable();
      this.verses.set([]);
    } else {
      chapterControl?.disable();
      chapterControl?.reset();
      verseControl?.disable();
      verseControl?.reset();
      this.chapters.set([]);
      this.verses.set([]);
    }
  }

  private onChapterSelected(chapterNumber: any): void {
    const verseControl = this.form.get('verse');
    const bookControl = this.form.get('book');

    if (chapterNumber && bookControl?.value) {
      const chapterNum = Number(chapterNumber);
      const verseNumbers = this.bibleDataService
        .getVerses(bookControl.value, chapterNum)
        .map((v: any) => v.verseNumber);
      this.verses.set(verseNumbers);
      verseControl?.enable();
      verseControl?.setValue(''); // Set to empty string instead of reset
    } else {
      verseControl?.disable();
      verseControl?.setValue('');
      this.verses.set([]);
    }
  }

}
