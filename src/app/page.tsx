import { Metadata } from "next";
import Link from "next/link";
import BlogsList from "src/components/blog/blogsList";
import SearchInput from "src/components/inputs/searchInput";
import { getAllBlogs } from "src/queryFn";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Matias Benitez Blog",
    description: "",
  };
}

// const code = `<script>
//   // Our JavaScript code will go here
// </script>`
//     .split(/\r?\n|\r|\n/g)
//     .map((v) => `"${v}"`),
//   code2 = `console.log('Hello, World!'); `
//     .split(/\r?\n|\r|\n/g)
//     .map((v) => `"${v}"`);

// const sample = `@
// #$text {"content": "Welcome to our blog on creating a 'Hello, World!' program in JavaScript. In this tutorial, we'll guide you through the steps to write your first JavaScript program that displays the classic greeting message. Let's get started!"}
// @
// #$title {"content": "Step 1: Setting up the HTML file"}
// #$text {"content": "Before we begin coding in JavaScript, let's create a basic HTML file where we can include our JavaScript code. Open a text editor and create a new file with the .html extension. You can name it whatever you like; for example, hello-world.html."}
// @
// #$title {"content": "Step 2: Adding the JavaScript code"}
// #$text {"content": "Inside the HTML file, we'll need to add a <script> tag to include our JavaScript code. Locate the <body> section and insert the following code snippet:"}
// #$code {"content": [${code}]}
// @
// #$title {"content": "Step 3: Writing the 'Hello, World!' program"}
// #$text {"content": "Now, it's time to write the actual JavaScript code that will display the 'Hello, World!' message. Replace the comment inside the <script> tag with the following code:"}
// #$code {"content": [${code2}]}
// @
// #$title {"content": "Step 4: Running the program"}
// #$text {"content": "Save the HTML file and open it in a web browser. Open the browser's developer console by right-clicking on the page and selecting 'Inspect' or 'Inspect Element.' Alternatively, you can press F12 on your keyboard to open the developer tools. Switch to the 'Console' tab if it's not already selected."}
// #$text {"content": "You should see the 'Hello, World!' message displayed in the console. Congratulations! You have successfully created your first 'Hello, World!' program in JavaScript."}
// @
// #$title {"content": "Conclusion"}
// #$text {"content": "In this blog post, we walked through the process of creating a simple 'Hello, World!' program in JavaScript. We started by setting up an HTML file, adding the necessary JavaScript code, and finally running the program in a web browser. JavaScript is a versatile and powerful language used for both front-end and back-end web development. Stay tuned for more exciting JavaScript tutorials in the future!"}
// #$text {"content": "That's it for our blog on creating a 'Hello, World!' program in JavaScript. We hope you found this tutorial helpful. Happy coding!"}
// #$image {"src": "", caption: "This is a caption", alt: "this is a image"}
// `;

export default async function Home() {
  const blogs = await getAllBlogs();
  return (
    <main className="mt-4">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Matias Benitez Blog
        </h1>
        <p className="text-stone-400 ">
          Hi! Welcome to my blog. This is the place where I upload information
          that I believe is important to know or interesting.
        </p>
        <div className="divider"></div>
        <SearchInput />
      </header>
      <section className="flex flex-col gap-y-5">
        <BlogsList blogs={blogs} />
      </section>
    </main>
  );
}
