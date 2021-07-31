import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ApplicantsService } from './applicants.service';
@Controller('/registration')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  async createApplicant(@Body() body, @Res() res) {
    const { answers } = body.form_response;

    const data = {
      email: answers[0].text,
      firstname: answers[1].text,
      callname: answers[2].boolean ? answers[3].text : null,
      lastname: answers[3 + answers[2].boolean].text,
      gender:
        answers[4 + answers[2].boolean].choice.label === 'Not listed'
          ? answers[5 + answers[2].boolean].text
          : answers[4 + answers[2].boolean].choice.label,
      isAlumni: answers[answers.length - 1].boolean
    };

    const applicant = this.applicantsService.create(data);
    applicant.then(function (data) {
      if (data) return res.status(HttpStatus.CREATED).send();
      return res.status(HttpStatus.BAD_REQUEST).send('Bad request. Submit again!');
    });
  }
}
