import { ISections } from "src/app/(pages)/blog/create/page";

const revalidate = 60;

const handleApiRequest = async <T = any>(request: string) => {
  try {
    const fetching = await fetch(request, {
      next: { revalidate },
    });
    const petition = await fetching.json();
    return { error: undefined, data: petition.data as T };
  } catch (error) {
    return { error: error, data: undefined };
  }
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
