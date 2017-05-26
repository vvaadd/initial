import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent}   from './app.component';
import {NotesComponent} from './notes.component';
import {SectionsComponent} from "./sections.component";
import {DragulaModule} from "ng2-dragula";
import {SectionFilterPipe} from "./section.filter.pipe";
import {NoteFilterPipe} from "./note.filter.pipe";
import {RouterModule, Routes} from "@angular/router";
import {NotesEditorComponent} from "./notesEditor.component";
import {PageNotFoundComponent} from "./pageNotFound.component";
import {ViewSectionComponent} from "./viewSection.component";
import {NotesServerService} from "./services/notesServer.service";
import {CanDeactivateNote} from "./services/canDeactivateNote.service";
import {UserFormComponent} from "./userForm.component";
import {EqualToValidator} from "./directives/EqualToValidator";
import {UserUniqueValidator} from "./directives/UserUniqueValidator";

const appRoutes: Routes = [
    {path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]},
    {path: 'register', component: UserFormComponent},
    {path: 'viewSection/:name', component: ViewSectionComponent},
    {path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, DragulaModule,
        RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, NotesComponent, SectionsComponent,
        SectionFilterPipe, NoteFilterPipe, NotesEditorComponent,
        PageNotFoundComponent, ViewSectionComponent, UserFormComponent,
        EqualToValidator, UserUniqueValidator],
    bootstrap: [AppComponent],
    providers: [NotesServerService, CanDeactivateNote]
})

export class AppModule {
}