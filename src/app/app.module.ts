import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RgAnimatedTypingModule} from 'rg-animated-typing';
import {DemoComponent} from './demo/demo.component';
import {ExampleAsyncComponent} from './example-async/example-async.component';
import {ExampleInsertComponent} from './example-insert/example-insert.component';
import {ExampleSimpleComponent} from './example-simple/example-simple.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
    imports: [
        BrowserModule,
        RgAnimatedTypingModule
    ],
    declarations: [
        DemoComponent,
        PlayerComponent,
        ExampleSimpleComponent,
        ExampleAsyncComponent,
        ExampleInsertComponent
    ],
    providers: [],
    bootstrap: [DemoComponent]
})
export class AppModule {
}
