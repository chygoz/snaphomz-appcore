import { Module } from '@nestjs/common';
import { PropertyController } from './Property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './Property.service';
import { EmailModule } from 'src/services/email/email.module';
import {
  PropertyQuery,
  PropertyQuerySchema,
} from './schema/propertyQuery.schema';
import { User, UserSchema } from '../users/schema/user.schema';
import { Property, PropertySchema } from './schema/property.schema';
import { Agent, AgentSchema } from '../agent/schema/agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Property.name, schema: PropertySchema },
      { name: PropertyQuery.name, schema: PropertyQuerySchema },
      { name: Agent.name, schema: AgentSchema },
    ]),
    EmailModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
