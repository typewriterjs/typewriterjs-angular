import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RenderBufferComponent} from './render-buffer/render-buffer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RenderBufferComponent
    ],
    exports: [
        RenderBufferComponent
    ]
})
export class TypewriterModule {
}
