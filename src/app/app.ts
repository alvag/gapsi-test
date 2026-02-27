import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { OfflineBanner } from './components/offline-banner/offline-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, OfflineBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
