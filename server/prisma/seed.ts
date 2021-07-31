import { PrismaClient, Role } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  console.log('seeding...');

  for (let i = 0; i < 10; i++) {

    const genders = ['male', 'female', 'nonbinary'];

    await prisma.applicant.upsert({
      where: { email: faker.internet.email() },
      update: {},
      create: {
        uuid: faker.datatype.uuid(),
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        gender: genders[Math.floor(Math.random() * genders.length)],
        nationality: 'Belgian',
        phone: faker.phone.phoneNumber(),
        address: {
          create: {
            addressLine: faker.address.streetAddress(),
            city: faker.address.cityName(),
            postalCode: faker.address.zipCode(),
            state: faker.address.state(),
            country: faker.address.country()
          }
        },
        isAlumni: Math.random() < 0.5
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
