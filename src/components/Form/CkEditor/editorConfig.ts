import {
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Base64UploadAdapter,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Mention,
  Paragraph,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Underline
} from "ckeditor5";

const LICENSE_KEY = 'GPL';

export const editorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'link',
      'insertImage',
      '|',
      'alignment',
      '|',
      'outdent',
      'indent'
    ],
    shouldNotGroupWhenFull: false
  },
  plugins: [
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    Bold,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Mention,
    Paragraph,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Underline
  ],
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true
  },
  heading: {
    options: [
      {
        model: 'paragraph' as const,
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      },
      {
        model: 'heading1'  as const,
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2'  as const,
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3'  as const,
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      },
      {
        model: 'heading4'  as const,
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4'
      },
      {
        model: 'heading5'  as const,
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5'
      },
      {
        model: 'heading6'  as const,
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6'
      }
    ]
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage'
    ]
  },
  licenseKey: LICENSE_KEY,
 
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  placeholder: "Type or paste your content here!",
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual' as const,
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      }
    }
  },
  mention: {
    feeds: [
      {
        marker: '@',
        feed: [
          /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
        ]
      }
    ]
  },
  menuBar: {
    isVisible: true
  },
};
