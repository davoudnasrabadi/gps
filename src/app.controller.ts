import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { calcEventLocation } from './calcEventLoc';
import { formatGpsData } from './format';
import { gps } from './gps';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const data = gps;
    const gpsData = data['60157659d95385efd77bbd35'].data;
    const formatted = formatGpsData(gpsData);
    const eventTime = 29563;
    const finalGps = calcEventLocation(eventTime, formatted);
    console.log(finalGps.gps);
    const [major, minor, patch] = process.versions.node.split('.').map(Number);
    console.log(major, ' ', minor, ' ', patch);
    return 'ee';
  }
}
