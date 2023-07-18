import { ISections } from "src/app/(pages)/blog/create/page";

const handleApiRequest = async <T = any>(request: Response) => {
  const petition = await request.json();
  if (petition) {
    if (petition.data) return petition.data as T;
    if (petition) throw new Error("");
  }
  return new Error("Unknown API request");
};

const stringifySections = (sections: ISections[]) => {
  return [...sections]
    .map((section) => {
      return section.fields
        .map((field) => `#$${field.type} ${JSON.stringify(field.values)}`)
        .join("");
    })
    .join("@");
};

const randomKey = () =>
  new Date(new Date().valueOf() - Math.random() * 1e12).toString();

export { handleApiRequest, randomKey, stringifySections };
