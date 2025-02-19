import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profiles',
  imports: [ProfileComponent, HeaderComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {

}
