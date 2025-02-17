import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @Input() src! :String;
  @Input() alt! :String;
  @Input() title! :String;
  @Input() link! :String;

  constructor(private router : Router){

  }
  navigateTo(){
    this.router.navigate([this.link]);

  }

}
