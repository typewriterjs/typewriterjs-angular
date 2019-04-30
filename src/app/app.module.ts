import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RgAnimatedTypingModule} from 'rg-animated-typing';
import {DemoComponent} from './demo/demo.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
    imports: [
        BrowserModule,
        RgAnimatedTypingModule
    ],
    declarations: [
        DemoComponent,
        PlayerComponent
    ],
    providers: [],
    bootstrap: [DemoComponent]
})
export class AppModule {
}
