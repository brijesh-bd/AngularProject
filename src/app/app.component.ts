import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudComponent } from './pages/crud/crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrudComponent, CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
}
