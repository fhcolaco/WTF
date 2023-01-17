import React from "react";
import { useState } from "react";
import { Combobox } from "@headlessui/react";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

export default function Content() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className="inset-x-0 top-0 mt-64">
        <div className="mb-10 text-center text-5xl text-white">
          <h1>Descubra o seu próximo Hotel!</h1>
        </div>
        <form className="flex flex-row justify-center">
          <Combobox
            as="div"
            value={selectedPerson}
            onChange={setSelectedPerson}
          >
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className="rounded"
            />
            <Combobox.Options className="bg-white">
              {filteredPeople.map((person) => (
                <Combobox.Option key={person} value={person}>
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <Combobox
            as="div"
            value={selectedPerson}
            onChange={setSelectedPerson}
          >
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className="rounded"
            />
            <Combobox.Options className="bg-white">
              {filteredPeople.map((person) => (
                <Combobox.Option key={person} value={person}>
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <Combobox
            as="div"
            value={selectedPerson}
            onChange={setSelectedPerson}
          >
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className="rounded"
            />
            <Combobox.Options className="bg-white">
              {filteredPeople.map((person) => (
                <Combobox.Option key={person} value={person}>
                  {person}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </form>
      </div>
    </>
  );
}
