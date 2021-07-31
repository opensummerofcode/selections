import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApplicantsModule } from './applicants/applicants.module';
import { UsersModule } from './users/users.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ProjectsModule } from './projects/projects.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
      }
    }),
    ApplicantsModule,
    UsersModule,
    SuggestionsModule,
    ProjectsModule,
    ProfilesModule,
    SkillsModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
