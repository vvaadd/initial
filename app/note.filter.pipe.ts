import {Pipe, PipeTransform} from "@angular/core";
import {Note} from "./notes.component";
@Pipe({
    name: 'noteFilter',
    pure: false
})
export class NoteFilterPipe implements PipeTransform {
    transform(notes: Note[], v: string): Note[] {
        if (!notes) return [];
        return notes.filter(
            s => s.text.toLowerCase().startsWith(v.toLowerCase()));
    }
}