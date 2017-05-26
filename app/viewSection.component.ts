import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Section} from "./sections.component";
import {NotesServerService} from "./services/notesServer.service";
import {Note} from "./notes.component";
import {Observable} from "rxjs";

@Component({
    selector: 'view-section',
    templateUrl: 'app/viewSection.component.html'
})

export class ViewSectionComponent {
    section: Section;
    notes: Note[];
    notes$: Observable<Note[]>;

    constructor(private route: ActivatedRoute,
                private noteServer: NotesServerService) {
    }

    ngOnInit() {
        this.section = this.route.snapshot.params["name"];
        this.notes$ = this.getNotes();
    }

    getNotes() {
        return this.noteServer.getNotes(this.section.title);
    }
}