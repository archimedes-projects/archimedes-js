import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ArchimedesModule } from '../core/modules/archimedes/archimedes.module';
import { DemoComponent } from './features/demo/ui/demo/demo.component'

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [BrowserModule, ArchimedesModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
