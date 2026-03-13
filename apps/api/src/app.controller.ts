import { Controller, Get } from "@nestjs/common";
import { demoShopperProfile } from "@lumifit/shared-types";

@Controller()
export class AppController {
  @Get("/health")
  getHealth() {
    return {
      status: "ok",
      service: "api",
      demoShopperProfile,
    };
  }
}

