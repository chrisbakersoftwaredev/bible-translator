import { Injectable } from '@angular/core';

export interface Verse {
  verseNumber: number;
  text: string;
  original: string;
  originalLanguage: 'greek' | 'hebrew';
}

export interface Chapter {
  chapterNumber: number;
  verses: Verse[];
}

export interface Book {
  name: string;
  abbr: string;
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}

export interface Translation {
  id: string;
  name: string;
  verses: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class BibleDataService {
  private books: Book[] = [
    {
      name: 'Genesis',
      abbr: 'Gen',
      testament: 'OT',
      chapters: [
        {
          chapterNumber: 1,
          verses: [
            {
              verseNumber: 1,
              text: 'In the beginning God created the heavens and the earth.',
              original: 'בְרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
              originalLanguage: 'hebrew'
            },
            {
              verseNumber: 2,
              text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
              original: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם',
              originalLanguage: 'hebrew'
            },
            {
              verseNumber: 3,
              text: 'And God said, "Let there be light," and there was light.',
              original: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר',
              originalLanguage: 'hebrew'
            }
          ]
        },
        {
          chapterNumber: 2,
          verses: [
            {
              verseNumber: 1,
              text: 'Thus the heavens and the earth were completed in all their vast array.',
              original: 'וַיִּכְלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל־צְבָאָם',
              originalLanguage: 'hebrew'
            },
            {
              verseNumber: 2,
              text: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.',
              original: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי מְלַאכְתּוֹ אֲשֶׁר עָשָׂה וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי מִכָּל־מְלַאכְתּוֹ אֲשֶׁר עָשָׂה',
              originalLanguage: 'hebrew'
            }
          ]
        }
      ]
    },
    {
      name: 'Matthew',
      abbr: 'Matt',
      testament: 'NT',
      chapters: [
        {
          chapterNumber: 1,
          verses: [
            {
              verseNumber: 1,
              text: 'This is the genealogy of Jesus the Messiah the son of David, the son of Abraham:',
              original: 'Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ',
              originalLanguage: 'greek'
            },
            {
              verseNumber: 2,
              text: 'Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers,',
              original: 'Ἀβραὰμ ἐγέννησεν τὸν Ἰσαάκ, Ἰσαὰκ δὲ ἐγέννησεν τὸν Ἰακώβ, Ἰακὼβ δὲ ἐγέννησεν τὸν Ἰούδαν καὶ τοὺς ἀδελφοὺς αὐτοῦ',
              originalLanguage: 'greek'
            }
          ]
        },
        {
          chapterNumber: 2,
          verses: [
            {
              verseNumber: 1,
              text: 'After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem',
              original: 'Τοῦ δὲ Ἰησοῦ γεννηθέντος ἐν Βηθλέεμ τῆς Ἰουδαίας ἐν ἡμέραις Ἡρῴδου τοῦ βασιλέως, ἰδοὺ μάγοι ἀπὸ ἀνατολῶν παρεγένοντο εἰς Ἱεροσόλυμα',
              originalLanguage: 'greek'
            }
          ]
        }
      ]
    },
    {
      name: 'Mark',
      abbr: 'Mark',
      testament: 'NT',
      chapters: [
        {
          chapterNumber: 1,
          verses: [
            {
              verseNumber: 1,
              text: 'The beginning of the good news about Jesus the Messiah, the Son of God,',
              original: 'Ἀρχὴ τοῦ εὐαγγελίου Ἰησοῦ Χριστοῦ υἱοῦ θεοῦ',
              originalLanguage: 'greek'
            }
          ]
        }
      ]
    }
  ];

  private translations: { [key: string]: Translation } = {
    kjv: {
      id: 'kjv',
      name: 'King James Version',
      verses: {}
    },
    niv: {
      id: 'niv',
      name: 'New International Version',
      verses: {}
    },
    esv: {
      id: 'esv',
      name: 'English Standard Version',
      verses: {}
    }
  };

  constructor() {
    this.initializeTranslationData();
  }

  private initializeTranslationData(): void {
    // KJV translations
    this.translations['kjv'].verses['Gen-1-1'] = 'In the beginning God created the heavens and the earth.';
    this.translations['kjv'].verses['Gen-1-2'] = 'And the earth was without form, and void; and darkness was upon the face of the deep.';
    this.translations['kjv'].verses['Gen-1-3'] = 'And God said, Let there be light: and there was light.';
    this.translations['kjv'].verses['Gen-2-1'] = 'Thus the heavens and the earth were finished, and all the host of them.';
    this.translations['kjv'].verses['Gen-2-2'] = 'And on the seventh day God ended his work which he had made; and he rested on the seventh day.';
    this.translations['kjv'].verses['Matt-1-1'] = 'The book of the generation of Jesus Christ, the son of David, the son of Abraham:';
    this.translations['kjv'].verses['Matt-1-2'] = 'Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren;';
    this.translations['kjv'].verses['Matt-2-1'] = 'Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem,';
    this.translations['kjv'].verses['Mark-1-1'] = 'The beginning of the gospel of Jesus Christ, the Son of God;';

    // NIV translations
    this.translations['niv'].verses['Gen-1-1'] = 'In the beginning God created the heavens and the earth.';
    this.translations['niv'].verses['Gen-1-2'] = 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.';
    this.translations['niv'].verses['Gen-1-3'] = 'And God said, "Let there be light," and there was light.';
    this.translations['niv'].verses['Gen-2-1'] = 'Thus the heavens and the earth were completed in all their vast array.';
    this.translations['niv'].verses['Gen-2-2'] = 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.';
    this.translations['niv'].verses['Matt-1-1'] = 'This is the genealogy of Jesus the Messiah the son of David, the son of Abraham:';
    this.translations['niv'].verses['Matt-1-2'] = 'Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers,';
    this.translations['niv'].verses['Matt-2-1'] = 'After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem';
    this.translations['niv'].verses['Mark-1-1'] = 'The beginning of the good news about Jesus the Messiah, the Son of God,';

    // ESV translations
    this.translations['esv'].verses['Gen-1-1'] = 'In the beginning, God created the heavens and the earth.';
    this.translations['esv'].verses['Gen-1-2'] = 'The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.';
    this.translations['esv'].verses['Gen-1-3'] = 'And God said, "Let there be light," and there was light.';
    this.translations['esv'].verses['Gen-2-1'] = 'Thus the heavens and the earth were finished, and all the host of them.';
    this.translations['esv'].verses['Gen-2-2'] = 'And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.';
    this.translations['esv'].verses['Matt-1-1'] = 'The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.';
    this.translations['esv'].verses['Matt-1-2'] = 'Abraham was the father of Isaac, and Isaac the father of Jacob, and Jacob the father of Judah and his brothers,';
    this.translations['esv'].verses['Matt-2-1'] = 'Now after Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the east came to Jerusalem,';
    this.translations['esv'].verses['Mark-1-1'] = 'The beginning of the gospel of Jesus Christ, the Son of God.';
  }

  getBooks(): Book[] {
    return this.books;
  }

  getBook(name: string): Book | undefined {
    return this.books.find(b => b.name === name);
  }

  getChapters(bookName: string): Chapter[] {
    const book = this.getBook(bookName);
    return book ? book.chapters : [];
  }

  getVerses(bookName: string, chapterNumber: number): Verse[] {
    const book = this.getBook(bookName);
    if (!book) return [];
    const chapter = book.chapters.find(c => c.chapterNumber === chapterNumber);
    return chapter ? chapter.verses : [];
  }

  getVerse(bookName: string, chapterNumber: number, verseNumber: number): Verse | undefined {
    const verses = this.getVerses(bookName, chapterNumber);
    return verses.find(v => v.verseNumber === verseNumber);
  }

  getTranslations(): Translation[] {
    return Object.values(this.translations);
  }

  getTranslation(translationId: string): Translation | undefined {
    return this.translations[translationId];
  }

  getVerseText(translationId: string, bookName: string, chapterNumber: number, verseNumber: number): string {
    const book = this.getBook(bookName);
    if (!book) return '';
    const abbr = book.abbr;
    const key = `${abbr}-${chapterNumber}-${verseNumber}`;
    const translation = this.translations[translationId];
    return translation ? (translation.verses[key] || '') : '';
  }
}

