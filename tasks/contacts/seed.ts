import { generateMock } from "zod-mock";
import { inputSchema } from "@/services/db/contact.ts";
import { Contact } from "@/shared/data/contact.ts";
import { ulid } from "std/ulid/mod.ts";
import { faker } from "faker";
import { writeContacts } from "@/services/db/contact.ts";
import { LIST_ID } from "@/utils/constants.ts";

// generateMock seems to create a random number of contacts per
// iteration, so we'll just run it a few times to get a decent sample
const SEED_COUNT = 20;

console.log(`Seeding sample contacts with list ID ${LIST_ID}...`);

const getMockData = () =>
  generateMock(inputSchema, {
    stringMap: {
      id: () => ulid(),
      phoneNumber: () => faker.phone.number("##########"),
    },
  });

const contacts: Contact[] = [];

Array.from({ length: SEED_COUNT }).forEach(() => {
  contacts.push(...getMockData());
});

for (const contact of contacts) {
  await writeContacts(LIST_ID, [contact]);
}

console.log("Done.");
