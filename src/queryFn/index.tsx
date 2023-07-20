import CodeBlock from "src/components/blog/codeBlock";
import { handleApiRequest } from "src/shared/clientShared";
import { IBlog } from "src/types/clientTypes";

const getUrl =
  process.env.NODE_ENV === "production"
    ? "https://personal-blog-delta-amber.vercel.app"
    : "https://personal-blog-delta-amber.vercel.app";

const getAllBlogs = async () => {
  return await handleApiRequest(getUrl + "/api/blog/latest");
};

const getBlogsByName = async (name?: string) => {
  return await handleApiRequest(encodeURI(getUrl + "/api/blog?name=" + name));
};

const getPostByTagsName = async <T,>(name?: string) => {
  return await handleApiRequest<T>(
    encodeURI(getUrl + "/api/tags?name=" + name)
  );
};

const getBlogById = async (id: string) => {
  const request = await handleApiRequest(getUrl + "/api/blog/" + id);
  return parseBlogById(request.data || "");
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
        <h2 className="text-2xl mb-3 font-extrabold tracking-tight">
          {title.content}
        </h2>
      );
    case "$subtitle":
      const subtitle = JSON.parse(value);
      return (
        <h3 className="text-xl mb-3 font-extrabold tracking-tight">
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
