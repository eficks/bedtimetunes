import { Component, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'contributors',
  templateUrl: './contributors.component.html',
  styleUrls:  ['./contributors.component.css']
})
export class ContributorsComponent {
@HostBinding('style.display')   display = 'inline';
@HostBinding('style.position')  position = 'relative';
constructor(private router: Router) {}

cancel() {
   this.closePopup();
 }
 closePopup() {
  // Providing a `null` value to the named outlet
  // clears the contents of the named outlet
  this.router.navigate([{ outlets: { popup: null }}]);
}

}
