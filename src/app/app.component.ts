import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {ChatWindowComponent} from './features/chat/components/chat-window/chat-window.component';
import {ChatsPanelComponent} from './features/chat/components/chats-panel/chats-panel.component';
import {SignalRService} from './features/chat/services/signal-r.service';
import {SpinnerComponent} from './shared/components/spinner/spinner.component';
import {SpinnerService} from './core/services/spinner.service';
import {
  NotificationPanelComponent
} from './features/notifications/components/notification-panel/notification-panel.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, ChatWindowComponent, ChatsPanelComponent, SpinnerComponent, NotificationPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthRoute: boolean = false;

  spinnerSerivce = inject(SpinnerService);

  constructor(private router:Router,  private signalRService: SignalRService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute = ['/login', '/Register'].includes(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
  }
  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  title = 'P2PDeliveryClientSide';
}
