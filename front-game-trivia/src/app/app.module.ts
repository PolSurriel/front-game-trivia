import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { LogoComponent } from './components/logo/logo.component';
import { QuestionAmountInputComponent } from './components/question-amount-input/question-amount-input.component';
import { DifficultyInputComponent } from './components/difficulty-input/difficulty-input.component';
import { CategorySelectorInputComponent } from './components/category-selector-input/category-selector-input.component';
import { PopUpSectionComponent } from './components/pop-up-section/pop-up-section.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { MultiSelectorComponent } from './components/multi-selector/multi-selector.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { AudioToggleComponent } from './components/audio-toggle/audio-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionButtonComponent,
    LogoComponent,
    QuestionAmountInputComponent,
    DifficultyInputComponent,
    CategorySelectorInputComponent,
    PopUpSectionComponent,
    GoBackButtonComponent,
    MultiSelectorComponent,
    WelcomeScreenComponent,
    AudioToggleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
