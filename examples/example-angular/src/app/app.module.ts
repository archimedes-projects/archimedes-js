import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FooCmd } from './foo-cmd'
import { BarQry } from './bar-qry'
import { CacheInvalidations } from '@archimedes/arch'
import { QuxCmd } from './qux-cmd'
import { BazQry } from './baz-qry'
import { ArchimedesModule } from 'src/core/modules/archimedes/archimedes.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ArchimedesModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    CacheInvalidations.set(FooCmd.name, [BarQry.name])
    CacheInvalidations.set(QuxCmd.name, [BazQry.name])
  }
}
