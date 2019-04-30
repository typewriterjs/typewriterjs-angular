import {EngineAnimation} from './engine-animation';
import {Keyboard} from './keyboard.operators';

export namespace Terminal {
    export function prompt(domain: string, path: string): Keyboard.EventsOperator {
        return (queue: EngineAnimation): EngineAnimation => {
            return queue.pipe(
                Keyboard.color(Keyboard.GREEN),
                Keyboard.set(domain),
                Keyboard.color(Keyboard.WHITE),
                Keyboard.set(':'),
                Keyboard.color(Keyboard.BLUE),
                Keyboard.set(path),
                Keyboard.color(Keyboard.WHITE),
                Keyboard.set('$ ')
            );
        };
    }

    export function multiline(lines: string[], path: string = '~', pause: number = 500): Keyboard.EventsOperator {
        return (queue: EngineAnimation): EngineAnimation => {
            const pipes = [];
            lines.forEach(line => {
                const color = line.startsWith('##') ? Keyboard.YELLOW : Keyboard.WHITE;
                queue = queue.pipe(
                    Keyboard.newLine(),
                    Terminal.prompt('root', path),
                    Keyboard.pause(500),
                    Keyboard.color(color),
                    Keyboard.type(line),
                    Keyboard.color(Keyboard.WHITE),
                    Keyboard.pause(pause)
                );
            });
            return queue;
        };
    }
}
