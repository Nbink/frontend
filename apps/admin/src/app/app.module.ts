import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from "@angular/common/http";
import { CategoriesService } from "@nick/products";
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ToastModule} from 'primeng/toast';
import { MessageService } from "primeng/api";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { SharedModule } from 'primeng/api';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';





const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children : [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoryListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'products/form',
                component: ProductFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductFormComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            },
        ]
    }
];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoryListComponent, CategoriesFormComponent, ProductListComponent, ProductFormComponent, UsersListComponent, UsersFormComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: "enabledBlocking" }),
    CardModule, ToolbarModule, ButtonModule, TableModule, HttpClientModule, InputTextModule, FormsModule, ReactiveFormsModule, 
    ToastModule, BrowserAnimationsModule,ConfirmDialogModule, ColorPickerModule, InputNumberModule, SharedModule,
    InputTextareaModule, InputSwitchModule, DropdownModule, EditorModule, TagModule, InputMaskModule

    ],
    providers: [CategoriesService, MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
