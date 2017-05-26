"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var notes_component_1 = require("./notes.component");
var sections_component_1 = require("./sections.component");
var ng2_dragula_1 = require("ng2-dragula");
var section_filter_pipe_1 = require("./section.filter.pipe");
var note_filter_pipe_1 = require("./note.filter.pipe");
var router_1 = require("@angular/router");
var notesEditor_component_1 = require("./notesEditor.component");
var pageNotFound_component_1 = require("./pageNotFound.component");
var viewSection_component_1 = require("./viewSection.component");
var notesServer_service_1 = require("./services/notesServer.service");
var canDeactivateNote_service_1 = require("./services/canDeactivateNote.service");
var userForm_component_1 = require("./userForm.component");
var EqualToValidator_1 = require("./directives/EqualToValidator");
var UserUniqueValidator_1 = require("./directives/UserUniqueValidator");
var loginForm_component_1 = require("./loginForm.component");
var LoginService_1 = require("./services/LoginService");
var appRoutes = [
    { path: '', component: notesEditor_component_1.NotesEditorComponent, canDeactivate: [canDeactivateNote_service_1.CanDeactivateNote] },
    { path: 'register', component: userForm_component_1.UserFormComponent },
    { path: 'viewSection/:name', component: viewSection_component_1.ViewSectionComponent },
    { path: ':name', component: notesEditor_component_1.NotesEditorComponent, canDeactivate: [canDeactivateNote_service_1.CanDeactivateNote] },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, ng2_dragula_1.DragulaModule,
            router_1.RouterModule.forRoot(appRoutes)],
        declarations: [app_component_1.AppComponent, notes_component_1.NotesComponent, sections_component_1.SectionsComponent,
            section_filter_pipe_1.SectionFilterPipe, note_filter_pipe_1.NoteFilterPipe, notesEditor_component_1.NotesEditorComponent,
            pageNotFound_component_1.PageNotFoundComponent, viewSection_component_1.ViewSectionComponent, userForm_component_1.UserFormComponent,
            EqualToValidator_1.EqualToValidator, UserUniqueValidator_1.UserUniqueValidator, loginForm_component_1.LoginFormComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [notesServer_service_1.NotesServerService, canDeactivateNote_service_1.CanDeactivateNote, LoginService_1.LoginService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map