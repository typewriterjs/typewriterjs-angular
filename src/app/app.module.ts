import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TypewriterModule} from '@typewriterjs/typewriterjs-angular';
import {DemoComponent} from './demo/demo.component';
import {ExampleAsyncComponent} from './example-async/example-async.component';
import {ExampleHtmlComponent} from './example-html/example-html.component';
import {ExampleInsertComponent} from './example-insert/example-insert.component';
import {ExampleSimpleComponent} from './example-simple/example-simple.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
    imports: [
        BrowserModule,
        TypewriterModule
    ],
    declarations: [
        DemoComponent,
        ExampleAsyncComponent,
        ExampleHtmlComponent,
        ExampleInsertComponent,
        ExampleSimpleComponent,
        PlayerComponent
    ],
    providers: [],
    bootstrap: [DemoComponent]
})
export class AppModule {
}
