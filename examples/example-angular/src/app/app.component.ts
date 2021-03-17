import { Component } from '@angular/core'
import { BarQry } from './bar-qry'
import { FooCmd } from './foo-cmd'
import { BazQry } from './baz-qry'
import { QuxCmd } from './qux-cmd'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result?: number

  constructor(
    private readonly fooCmd: FooCmd,
    private readonly barQry: BarQry,
    private readonly bazQry: BazQry,
    private readonly quxCmd: QuxCmd
  ) {}

  foo() {
    this.fooCmd.execute(1)
  }

  async bar() {
    this.result = await this.barQry.execute()
  }

  async baz() {
    this.result = await this.bazQry.execute()
  }

  qux() {
    this.quxCmd.execute(1)
  }
}
