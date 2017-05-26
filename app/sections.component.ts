import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {DragulaService} from "ng2-dragula";
import {LoginService} from "./services/LoginService";

@Component({
    selector: 'sections',
    templateUrl: "app/sections.component.html"
})

export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    private sectionsReplaceUrl = "/sections/replace";

    sections: Section[];
    activeSection: string;

    @Output() sectionChanged: EventEmitter<string> =
        new EventEmitter<string>();

    @Input()
    set section(section: string) {
        if (section && section.length > 0) {
            this.activeSection = section;
        }
    }

    constructor(private http: Http,
                private dragulaService: DragulaService,
                private loginService: LoginService) {
        this.readSections();
        dragulaService.drop.subscribe(this.onDrop.bind(this));
        this.loginService.userLogin$.subscribe(user => this.readSections());
    }

    onDrop(value) {
        let [bag, elementMoved, targetContainer, srcContainer] = value;
        if (targetContainer.children) {
            let arr = Array.from(targetContainer.children);
            this.sections = arr.map((li: HTMLLIElement) => {
                return {title: li.textContent.trim()}
            });
            this.writeSections().subscribe();
        }
    }

    readSections() {
        this.getSections().subscribe(sections => {
            this.sections = sections;
            if (this.activeSection == null && this.sections.length > 0) {
                this.showSection(this.sections[0]);
            }
        });
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
            .map(response => response.json() as Section[]);
    }

    showSection(section: Section) {
        // this.activeSection = section.title;
        this.sectionChanged.emit(section.title);
    }

    addSection(newSection: HTMLInputElement) {
        let title = newSection.value;
        if (!title) return;

        // check for duplicates
        if (this.sections.map(s => s.title).find(t => t === title)) return;

        const section: Section = {title};
        this.sections.unshift(section);
        this.showSection(section);

        // write sections to server and clear add section input box
        this.writeSections().subscribe(res => newSection.value = "");
    }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    }
}

export interface Section {
    _id?: string;
    title: string;
}