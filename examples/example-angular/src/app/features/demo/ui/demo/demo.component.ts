import { Component, OnInit } from '@angular/core'
import { ACmd } from '../../application/a-cmd'
import { AQry } from '../../application/a-qry'
import { BQry } from '../../application/b-qry'
import { CQry } from '../../application/c-qry'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  aQryResult!: number
  bQryResult!: number
  cQryResult!: number

  cmdCalls = 0
  cmdId!: number

  constructor(
    private readonly aCmd: ACmd,
    private readonly aQry: AQry,
    private readonly bQry: BQry,
    private readonly cQry: CQry
  ) {
  }

  ngOnInit(): void {
    this.cmdId = this.aCmd.subscribe(() => this.cmdCalls++)
  }

  ngOnDestroy(): void {
    this.aCmd.unsubscribe(this.cmdId)
  }

  runCmd(): void {
    this.aCmd.execute()
  }

  async runAQry(): Promise<void> {
    this.aQryResult = await this.aQry.execute()
  }

  async runBQry(): Promise<void> {
    this.bQryResult = await this.bQry.execute()
  }

  async runCQry(): Promise<void> {
    this.cQryResult = await this.cQry.execute()
  }
}
