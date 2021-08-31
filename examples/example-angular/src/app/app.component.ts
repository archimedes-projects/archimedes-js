import { Component, OnDestroy, OnInit } from '@angular/core'
import { BarQry } from './bar-qry'
import { FooCmd } from './foo-cmd'
import { BazQry } from './baz-qry'
import { QuxCmd } from './qux-cmd'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  result?: number
  calls = 0
  id!: number

  constructor(
    private readonly fooCmd: FooCmd,
    private readonly barQry: BarQry,
    private readonly bazQry: BazQry,
    private readonly quxCmd: QuxCmd
  ) {}

  ngOnInit() {
    this.id = this.fooCmd.subscribe(() => this.calls++)
  }

  ngOnDestroy() {
    this.fooCmd.unsubscribe(this.id)
  }

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
