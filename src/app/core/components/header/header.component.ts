import { Component, OnInit } from '@angular/core';
import { ADMINISTRATOR_NAV_LINKS, APP_NAME } from '../../../shared/utils/constants/general-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  constructor() { }

  app_name = APP_NAME;
  navLinks = ADMINISTRATOR_NAV_LINKS;
  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active', this.isMenuOpen);
    }
  }

}
