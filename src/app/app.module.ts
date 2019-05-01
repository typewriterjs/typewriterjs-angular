import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RgAnimatedTypingModule} from 'rg-animated-typing';
import {DemoComponent} from './demo/demo.component';
import {PlayerComponent} from './player/player.component';
import { ExampleSimpleComponent } from './example-simple/example-simple.component';
import { ExampleAsyncComponent } from './example-async/example-async.component';

@NgModule({
    imports: [
        BrowserModule,
        RgAnimatedTypingModule
    ],
    declarations: [
        DemoComponent,
        PlayerComponent,
        ExampleSimpleComponent,
        ExampleAsyncComponent
    ],
    providers: [],
    bootstrap: [DemoComponent]
})
export class AppModule {
}
