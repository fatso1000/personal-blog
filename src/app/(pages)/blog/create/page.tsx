"use client";
import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import FieldInput from "src/components/inputs/fieldInput";
import TextInput from "src/components/inputs/textInput";
import { getComponentsByString } from "src/queryFn";
import { randomKey, stringifySections } from "src/shared/clientShared";
import { FieldsEnum, IFields } from "src/types/clientTypes";
import useSWR from "swr";

export interface ISections {
  id: string;
  fields: IFields[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function BlogsSearchPage() {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [formValues, setFormValues] = useState({});
  const [sections, setSections] = useState<ISections[]>([]);
  const [previewString, setPreviewString] = useState<
    JSX.Element[][] | undefined
  >(undefined);
  const { data } = useSWR("/api/tags", fetcher);

  const onAddField = (sectionId: string) => {
    const section = sections.findIndex((s) => s.id === sectionId);
    const sectionsClone = [...sections];
    sectionsClone[section].fields.push({
      id: randomKey(),
      type: FieldsEnum.text,
    });
    setSections(sectionsClone);
  };

  const onAddSection = () => {
    const sectionsClone = [...sections];
    sectionsClone.push({ id: randomKey(), fields: [] });
    setSections(sectionsClone);
  };

  const onValueChange = (value: any, index: number[]) => {
    const sectionsClone = [...sections];
    sectionsClone[index[0]].fields[index[1]].values = value;
    setSections(sectionsClone);
  };

  const onTypeChange = (value: any, index: number[]) => {
    const sectionsClone = [...sections];
    sectionsClone[index[0]].fields[index[1]].type = value;
    setSections(sectionsClone);
  };

  const generatePreview = () => {
    const componentsList = stringifySections(sections);
    const string = getComponentsByString(`@${componentsList}`);
    setPreviewString(string);
  };

  const onDeleteField = (sectionId: number, index: number) => {
    const sectionsClone = [...sections];
    sectionsClone[sectionId].fields.splice(index, 1);
    setSections(sectionsClone);
  };

  const onDeleteSection = (index: number) => {
    const sectionsClone = [...sections];
    sectionsClone.splice(index, 1);
    setSections(sectionsClone);
  };

  const onMovePosition = (from: number, to: number, arr: any[]) => {
    const arrClone = [...arr];
    if (to >= arrClone.length) {
      var k = to - arrClone.length + 1;
      while (k--) {
        arrClone.push(undefined);
      }
    }
    arrClone.splice(to, 0, arrClone.splice(from, 1)[0]);
    return arrClone;
  };

  const onMoveDown = (sectionIndex: number, index: number) => {
    const sectionsClone = [...sections];
    sectionsClone[sectionIndex].fields = onMovePosition(
      index,
      index + 1,
      sectionsClone[sectionIndex].fields
    );
    setSections(sectionsClone);
  };

  const onMoveUp = (sectionIndex: number, index: number) => {
    const sectionsClone = [...sections];
    sectionsClone[sectionIndex].fields = onMovePosition(
      index,
      index - 1,
      sectionsClone[sectionIndex].fields
    );
    setSections(sectionsClone);
  };

  const onFormValuesChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmitPost = async () => {
    try {
      const tags = selectedTags.map((tag) => tag.value);
      const content = `@${stringifySections(sections)}`;
      const body = {
        ...formValues,
        verification: false,
        tags,
        content,
      };
      await fetch("/api/blog", { body: JSON.stringify(body), method: "POST" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mt-4">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Create a Blog
        </h1>
      </header>
      <section className="flex flex-col gap-y-3">
        <TextInput
          placeholder="Blog Title"
          onValueChange={(value) => onFormValuesChange("title", value)}
        />
        <TextInput
          placeholder="Blog Subtitle"
          onValueChange={(value) => onFormValuesChange("sub_title", value)}
        />
        <TextInput
          placeholder="Author name"
          onValueChange={(value) => onFormValuesChange("author_name", value)}
        />
        <TextInput
          placeholder="Min Reading"
          onValueChange={(value) => onFormValuesChange("reading_time", value)}
        />
        <TextInput
          placeholder="Description"
          onValueChange={(value) => onFormValuesChange("description", value)}
        />
        <input type="checkbox" name="verification" />
        <MultiSelect
          options={(data && data.data) || []}
          value={selectedTags}
          onChange={setSelectedTags}
          labelledBy="Select"
        />
      </section>
      <section className="flex flex-col gap-y-6">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight">Creation</h3>
          <div className="flex flex-col gap-y-3">
            <button
              className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
              onClick={onAddSection}
            >
              ADD SECTION
            </button>
            {sections &&
              sections.map((section, i) => {
                return (
                  <React.Fragment key={section.id}>
                    <div className="divider">
                      Section {i + 1}
                      <button
                        onClick={() => onDeleteSection(i)}
                        className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <button
                      className="btn rounded-none join-item text-stone-200 bg-stone-950 border hover:border-stone-500 border-stone-500 hover:bg-stone-900"
                      onClick={() => onAddField(section.id)}
                    >
                      ADD FIELD
                    </button>
                    <form name="create-blog" className="flex flex-col gap-y-5">
                      {section.fields &&
                        section.fields.map((v, j) => (
                          <FieldInput
                            id={v.id}
                            key={v.id}
                            isFirstPosition={j === 0}
                            isLastPosition={j === section.fields.length - 1}
                            onTypeChange={(type: FieldsEnum) =>
                              onTypeChange(type, [i, j])
                            }
                            onValueChange={(value: any) =>
                              onValueChange(value, [i, j])
                            }
                            onDelete={() => onDeleteField(i, j)}
                            onMoveDown={() => onMoveDown(i, j)}
                            onMoveUp={() => onMoveUp(i, j)}
                          />
                        ))}
                    </form>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold tracking-tight">Preview</h3>
          <button type="button" className="btn" onClick={onSubmitPost}>
            Submit
          </button>
          <button onClick={generatePreview} className="btn">
            PREVIEW
          </button>
          <div className="max-h-96">
            {previewString &&
              previewString.map((preview, i) => <div key={i}>{preview}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
