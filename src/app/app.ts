import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TitleService } from './services/title.service';

@Component({
  selector: 'main[app-root]',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.titleService.setCanonicalURL(event.urlAfterRedirects);
        this.dialog.closeAll();
      });
  }
}
