import {Component, Input, OnChanges} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {NotesServerService} from "./services/notesServer.service";

@Component({
    selector: 'notes',
    templateUrl: "app/notes.component.html"
})
export class NotesComponent implements OnChanges {
    private notesUrl = 'notes';  // URL to web api

    notes: Note[] = [
        {_id: null, text: "Note one ", insertDate: new Date()},
        {_id: null, text: "Note two", insertDate: new Date()}
    ];

    text: string;
    @Input() section: string = "Work";

    constructor(private http: Http, private notesServer: NotesServerService) {
    }

    ngOnChanges() {
        this.readNotes();
    }

    readNotes() {
        this.notesServer.getNotes(this.section).subscribe(notes => {
            this.notes = notes
        });
    }

    add() {
        let note = {_id: null, text: this.text, insertDate: new Date(), section: this.section};
        this.notes.push(note);
        this.addNote(note);
        this.text = "";
    }

    addNote(note: Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            });
    }

    remove(note: Note) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', note._id);
        this.http.delete(this.notesUrl, {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${note._id} removed, response`, response);
                this.readNotes();
            });
    }

    edit(note: Note) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', note._id);
        this.http.put(this.notesUrl, note, {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${note._id} edited, response`, response);
                this.readNotes();
            });
    }
}

export interface Note {
    _id: string;
    text: string;
    insertDate: Date;
}