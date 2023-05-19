import { APIRequestContext } from "@playwright/test";
import customSchema from "../support/customSchema.json";

export const createForm = async (api: APIRequestContext) => {
  const formResponse = await api.post("form", {
    data: {
      name: "Form created for testing",
      version: "1.0",
      published: false,
      description: "This is the form description",
      encounterType: {
        uuid: "e22e39fd-7db2-45e7-80f1-60fa0d5a4378",
      },
    },
  });
  const form = await formResponse.json();

  return form;
};

export const addFormResources = async (
  api: APIRequestContext,
  valueReference: string,
  formUuid: string
) => {
  await api.post(`form/${formUuid}/resource`, {
    data: {
      name: "JSON schema",
      dataType: "AmpathJsonSchema",
      valueReference: valueReference,
    },
  });
};

export const createValueReference = async (api: APIRequestContext) => {
  const schemaBlob = new Blob([JSON.stringify(customSchema)], {
    type: undefined,
  });
  const body = new FormData();
  body.append("file", schemaBlob);

  const valueReference = await api.post("clobdata", {
    data: body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await valueReference.text();
};

export const deleteForm = async (api: APIRequestContext, uuid: string) => {
  await api.delete(`form/${uuid}`, { data: {} });
};
