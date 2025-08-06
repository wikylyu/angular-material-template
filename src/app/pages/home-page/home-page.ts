import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle();
  }
}
