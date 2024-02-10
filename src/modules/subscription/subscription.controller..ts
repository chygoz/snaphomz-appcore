import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreatePlanDto } from './dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/guards/auth-jwt.guard';
import { AdminGuard } from 'src/guards/admin.gaurd';

@Controller('subcription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserSubscription(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = await this.subscriptionService.getUserSubscription(req.user);
    this._sendResponse({
      res,
      data,
      message: 'Subscription Found',
    });
  }

  @UseGuards(AdminGuard)
  @Post('/create/plan')
  async onBoardNewuser(
    @Body() creatPlanDto: CreatePlanDto,
    @Res() res: Response,
  ): Promise<any> {
    const data = await this.subscriptionService.createPlan(creatPlanDto);
    this._sendResponse({
      res,
      data,
      message: 'Plan Created',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/session/:id')
  async getSubscriotionSettion(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = await this.subscriptionService.getSubscrioptionSession(
      req.user,
      req.params.id,
    );
    this._sendResponse({
      res,
      data,
      message: 'Session Created',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/cancel/')
  async cancelSubscription(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    await this.subscriptionService.cancelSubscription(req.user);
    this._sendResponse({
      res,
      message: 'Subscription Canceled',
    });
  }

  private _sendResponse({
    res,
    message,
    statusCode,
    data,
  }: {
    res: Response;
    message: string;
    statusCode?: number;
    data?: any;
  }): void {
    const responseData = {
      message,
      data,
    };
    const status_code = statusCode ? statusCode : 200;
    res.status(status_code).json(responseData);
  }
}
