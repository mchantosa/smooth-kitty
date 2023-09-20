import { ulid } from "std/ulid/mod.ts";
import { faker } from "faker";
import { writeContacts } from "@/services/db/contact.ts";
import { LIST_ID } from "@/utils/constants.ts";

// generateMock seems to create a random number of contacts per
// iteration, so we'll just run it a few times to get a decent sample
const SEED_COUNT = 20;

console.log(`Seeding sample contacts with list ID ${LIST_ID}...`);

const getMockContact = () => {
  const birthday = faker.date.birthdate({ min: 1, max: 85, mode: "age" });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = firstName + " " + lastName;

  const contact = {
    id: ulid(),
    firstName: firstName,
    lastName: lastName,
    fullName: fullName,
    pronouns: faker.helpers.arrayElement([
      "he/him",
      "she/her",
      "they/them",
      "",
      "fairy/fae",
    ]),
    avatarUrl: `/images/faces/face_${Math.floor(Math.random() * 10) + 1}.jpeg`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.number("##########"),
    preferredMethod: faker.helpers.arrayElement(["email", "phone"]),
    preferredMethodHandle: faker.helpers.arrayElement(["@email", "@phone"]),
    birthdayDay: birthday.getDay(),
    birthdayMonth: birthday.getMonth(),
    birthdayYear: birthday.getFullYear(),
    connectOnBirthday: faker.datatype.boolean(),
    period: faker.helpers.arrayElement([
      "Weekly",
      "Biweekly",
      "Monthly",
      "Quarterly",
    ]),
  };

  return contact;
};

const contacts: any = [];

Array.from({ length: SEED_COUNT }).forEach(() => {
  contacts.push(getMockContact());
});

for (const contact of contacts) {
  await writeContacts(LIST_ID, [contact]);
}

console.log("Done.");
