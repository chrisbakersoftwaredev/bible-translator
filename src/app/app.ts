import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './components/selector/selector.component';
import { TranslationPanelComponent } from './components/translation-panel/translation-panel.component';
import { OriginalLanguagePanelComponent } from './components/original-language-panel/original-language-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SelectorComponent,
    TranslationPanelComponent,
    OriginalLanguagePanelComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('leftPanel') leftPanel!: TranslationPanelComponent;
  @ViewChild('rightPanel') rightPanel!: TranslationPanelComponent;
  @ViewChild('originalPanel') originalPanel!: OriginalLanguagePanelComponent;

  onSelectionChanged(selection: { book: string; chapter: number; verse: number }): void {
    if (this.leftPanel) {
      this.leftPanel.updateDisplay(selection.book, selection.chapter, selection.verse);
    }
    if (this.rightPanel) {
      this.rightPanel.updateDisplay(selection.book, selection.chapter, selection.verse);
    }
    if (this.originalPanel) {
      this.originalPanel.updateDisplay(selection.book, selection.chapter, selection.verse);
    }
  }
}
