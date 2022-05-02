
import { ConnectionConst, Driver, DriverConfiguration, PrintBillResponseDTO, RchProtocol } from "rch-driver-js";
import express, { Express, Request, Response } from 'express';
import { BillDTO } from "rch-driver-js-core";

const app: Express = express();
const port = 8080; // default port to listen

app.use(express.json());

// define a route handler for the default home page
app.post("/print-receipt", async (req: Request<BillDTO>, res: Response<PrintBillResponseDTO>) => {
  let driver = new Driver();
  await driver.open({ ip: "192.168.1.10", ipPort: 23, connection: ConnectionConst.TCPIP } as DriverConfiguration);
  let result = await driver.printReceipt(req.body, false, false);
  await driver.close();

  res.send(result);
});

app.post("/send-commands", async (req: Request, res: Response<RchProtocol[]>) => {
  let driver = new Driver();
  await driver.open({ ip: "192.168.1.10", ipPort: 23, connection: ConnectionConst.TCPIP } as DriverConfiguration);
  let result = await driver.sendCommands(req.body.commands);
  await driver.close();
  res.send(result)
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});