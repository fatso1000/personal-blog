import CodeBlock from "src/components/blog/codeBlock";
import { handleApiRequest } from "src/shared/clientShared";
import { IBlog } from "src/types/clientTypes";

const getAllBlogs = async () => {
  return await handleApiRequest(
    await fetch("http://localhost:3000/api/blog/latest", { cache: "no-store" })
  );
};

const getBlogsByName = async (name?: string) => {
  return await handleApiRequest(
    await fetch(encodeURI("http://localhost:3000/api/blog?name=" + name), {
      cache: "no-store",
    })
  );
};

const getPostByTagsName = async <T,>(name?: string) => {
  return await handleApiRequest<T>(
    await fetch(encodeURI("http://localhost:3000/api/tags?name=" + name), {
      cache: "no-store",
    })
  );
};

const getBlogById = async (id: string) => {
  const request = await handleApiRequest(
    await fetch("http://localhost:3000/api/blog/" + id, { cache: "no-store" })
  );
  return parseBlogById(request);
};

const getComponentsByString = (str: string) => {
  const getSections = str.split("@");
  getSections.shift();
  return getSections.map((v, i) => {
    const components = v.split("#");
    components.shift();
    return components.map((component) => {
      const getValues = component.split(" "),
        tag = getValues[0].replace(/\n/g, ""),
        value = component.split(tag)[1].replace(/\n/g, "");
      return returnComponentByTag({ tag, value });
    });
  });
};

const returnComponentByTag = ({ tag, value }: { tag: string; value: any }) => {
  switch (tag) {
    case "$title":
      const title = JSON.parse(value);
      return (
        <h2 className="text-2xl mb-2 font-extrabold tracking-tight">
          {title.content}
        </h2>
      );
    case "$subtitle":
      const subtitle = JSON.parse(value);
      return (
        <h3 className="text-xl mb-2 font-extrabold tracking-tight">
          {subtitle.content}
        </h3>
      );
    case "$divider":
      return <div className="divider"></div>;
    case "$code":
      const code: { content: string[] } = JSON.parse(value);
      const decoded = code.content.join("\n");
      return <CodeBlock code={decoded} />;
    case "$image":
      const image = JSON.parse(value);
      return (
        <figure>
          <img
            src={image.src}
            alt={image.alt || ""}
            width="100"
            height="100"
            className="mb-2"
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      );
    case "$text":
      const text = JSON.parse(value);
      return <p className="mb-2 text-stone-400">{text.content}</p>;
    default:
      return <div></div>;
  }
};

const parseBlogById = (value: IBlog) => {
  return {
    ...value,
    details: {
      ...value.details,
      content: getComponentsByString(value.details.content),
    },
  };
};

export {
  getAllBlogs,
  getBlogById,
  getBlogsByName,
  getPostByTagsName,
  getComponentsByString,
};
