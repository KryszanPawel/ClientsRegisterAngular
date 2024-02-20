import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientsComponent],
  imports: [SharedModule, ClientRoutingModule],
  exports: [ClientsComponent],
})
export class ClientsModule {}
