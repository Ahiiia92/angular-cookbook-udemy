import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.show') isDisplayed = false;
  isExpanded = 'false';
  // @HostBinding('ariaExpanded.false') isExpanded = false;
  // @HostBinding('style.backgroundColor') backgroundColor = 'red !important';
  // toggle some properties when we click on it.
  private isListExpanded: string;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isDisplayed = this.elementRef.nativeElement.contains(event.target) ? !this.isDisplayed : false;
    // console.log(this.elementRef.nativeElement.firstChild.attributes);
    // console.log(this.elementRef.nativeElement.firstChild.attributes[1]);
    // console.log("NodeValue: " + this.elementRef.nativeElement.firstChild.attributes[1].nodeValue);
    // this.isExpanded = this.elementRef.nativeElement.firstChild.attributes[1].nodeValue = 'false' ? this.isExpanded = 'true' : this.elementRef.nativeElement.firstChild.attributes[1].nodeValue = 'false';
    // console.log(this.elementRef.nativeElement.lastChild.className);
    // this.elementRef.nativeElement.lastChild.className.contains('show') ? this.elementRef.nativeElement.lastChild.className += ' show' : this.elementRef.nativeElement.lastChild.className += ' show';
    // console.log(this.elementRef.nativeElement.lastChild.className);

    // this.isExpanded = !document.getElementById('dropdownBtn').firstChild.attributes[1];
    // this.isListExpanded = document.getElementById('dropdownBtn').lastChild.className.contains(' show') ? ' ' : document.getElementById('dropdownBtn').lastChild.className += ' show';

    // this.isExpanded = this.elementRef.nativeElement.contains(event.target) ? !this.isExpanded : false;
    // this.backgroundColor = this.elementRef.nativeElement.contains(event.target) ? 'green !important' : 'red';
    // document.getElementById('dropdownBtn').firstChild.attributes[1] = true ==> aria-expanded: true
    // document.getElementById('dropdownBtn').lastChild.className.contains('show') ? ' ' : 'show'; ==> show for the ul
    // document.getElementById('dropdownBtn').lastChild.className += ' show';
  }

  constructor(private  elementRef: ElementRef) {
    console.log(elementRef);
  }
}
