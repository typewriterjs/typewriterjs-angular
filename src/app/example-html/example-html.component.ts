import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventQueue, typeChars} from '@typewriterjs/typewriterjs';

@Component({
    selector: 'rg-example-html',
    templateUrl: './example-html.component.html',
    styleUrls: ['./example-html.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleHtmlComponent implements OnInit {
    public queue: EventQueue;

    public ngOnInit() {
        const html = [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '\t<body>',
            '\t\t<h2>An Unordered HTML List</h2>',
            '\t\t<ul>',
            '\t\t\t<li>Coffee</li>',
            '\t\t\t<li>Tea</li>',
            '\t\t\t<li>Milk</li>',
            '\t\t</ul>',
            '\t\t<h2>An Ordered HTML List</h2>',
            '\t\t<ol>',
            '\t\t\t<li>Coffee</li>',
            '\t\t\t<li>Tea</li>',
            '\t\t\t<li>Milk</li>',
            '\t\t</ol>',
            '\t</body>',
            '</html>'
        ].join('\r');

        this.queue = EventQueue.create().pipe(
            typeChars(html)
        );
    }
}

