import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { MnageProductComponent } from './mnage-product/mnage-product.component';



export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'product',
        component:MnageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    }
];
