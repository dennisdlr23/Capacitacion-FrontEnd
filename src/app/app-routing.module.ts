import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppMainComponent,
                    children: [
                        {
                            path: '',
                            component: DashboardComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'usuarios',
                            loadChildren: () =>
                                import('./pages/users/users.module').then(
                                    (m) => m.UsersModule
                                ),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'roles',
                            loadChildren: () =>
                                import('./pages/roles/roles.module').then(
                                    (m) => m.RolesModule
                                ),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'permisos',
                            loadChildren: () =>
                                import(
                                    './pages/permissions/permissions.module'
                                ).then((m) => m.PermissionsModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'ordenes',
                            loadChildren: () =>
                                import(
                                    './pages/orders/orders.module'
                                ).then((m) => m.OrdersModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'documentos',
                            loadChildren: () =>
                                import(
                                    './pages/type-documents/type-documents.module'
                                ).then((m) => m.TypeDocumentsModule),
                            canActivate: [AuthGuard],
                        },

                    ],
                },
                {
                    path: 'login',
                    loadChildren: () =>
                        import('./pages/login/login.module').then(
                            (m) => m.LoginModule
                        ),
                },
                { path: 'pages/error', component: ErrorComponent },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                enableTracing: true,
                preloadingStrategy: PreloadAllModules
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
