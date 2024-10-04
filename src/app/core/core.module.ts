import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MoleculesModule } from '../components/molecules/molecules.module';
@NgModule({
  declarations: [
    HeaderComponent,
    PageComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MoleculesModule
  ],
  exports: [
    HeaderComponent,
    PageComponent,
    FooterComponent
  ],
})
export class CoreModule { }