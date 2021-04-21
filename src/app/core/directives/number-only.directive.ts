import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  
  constructor(private _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(evt: KeyboardEvent) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var number = this._el.nativeElement.value.split('.');
    if(number.length>1 && (charCode == 190 || charCode == 110)){
      evt.preventDefault();
    } else if ( (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode > 8 && charCode > 46 ) {
      evt.preventDefault();
    }
  }
  
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
    .getData('text/plain')
    .replace(/[^0-9.]*/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }
}
