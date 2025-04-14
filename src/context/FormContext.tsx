// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   ReactNode,
// } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:8000/api/form/";

// export interface FormType {
//   title: string;
//   _id: string;
//   name: string;
//   description: string;
//   createdBy: string;
//   questions: any[];
//   formType?: string;
//   stared?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface ResponseItem {
//   questionId: string;
//   optionId?: string;
//   answerText?: string;
// }

// export interface ResponseType {
//   _id?: string;
//   formId: string;
//   userId: string;
//   response: ResponseItem[];
//   submittedAt?: string;
// }

// interface FormContextType {
//   forms: FormType[];
//   selectedForm: FormType | null;
//   responses: ResponseType[];
//   fetchUserForms: (userId: string) => Promise<void>;
//   fetchAllForms: () => Promise<void>;
//   fetchFormById: (formId: string) => Promise<void>;
//   createForm: (formData: Partial<FormType>) => Promise<FormType | null>;
//   deleteForm: (formId: string, userId: string) => Promise<void>;
//   editForm: (
//     formData: Partial<FormType> & { formId: string }
//   ) => Promise<FormType | null>;
//   submitResponse: (responseData: ResponseType) => Promise<void>;
//   fetchResponsesByFormId: (formId: string) => Promise<void>;
// }

// const FormContext = createContext<FormContextType | undefined>(undefined);

// export const FormProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [forms, setForms] = useState<FormType[]>([]);
//   const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
//   const [responses, setResponses] = useState<ResponseType[]>([]);

//   const fetchUserForms = useCallback(async (userId: string) => {
//     try {
//       const res = await axios.get(`${API_URL}getuserforms/${userId}`);
//       setForms(res.data);
//     } catch (err) {
//       console.error("Error fetching user forms:", err);
//     }
//   }, []);

//   const fetchAllForms = useCallback(async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setForms(res.data);
//     } catch (err) {
//       console.error("Error fetching all forms:", err);
//     }
//   }, []);

//   const fetchFormById = useCallback(async (formId: string) => {
//     try {
//       const res = await axios.get(`${API_URL}${formId}`);
//       setSelectedForm(res.data);
//     } catch (err) {
//       console.error("Error fetching form:", err);
//     }
//   }, []);

//   const createForm = useCallback(async (formData: Partial<FormType>) => {
//     try {
//       const res = await axios.post(`${API_URL}create`, formData);
//       return res.data;
//     } catch (err) {
//       console.error("Error creating form:", err);
//       return null;
//     }
//   }, []);

//   const deleteForm = useCallback(async (formId: string, userId: string) => {
//     try {
//       await axios.delete(`${API_URL}delete/${formId}/${userId}`);
//       setForms((prev) => prev.filter((f) => f._id !== formId));
//     } catch (err) {
//       console.error("Error deleting form:", err);
//     }
//   }, []);

//   const editForm = useCallback(
//     async (formData: Partial<FormType> & { formId: string }) => {
//       try {
//         const res = await axios.put(`${API_URL}edit`, formData);
//         const updatedForm = res.data;
//         setForms((prev) =>
//           prev.map((form) =>
//             form._id === updatedForm._id ? updatedForm : form
//           )
//         );
//         return updatedForm;
//       } catch (err) {
//         console.error("Error editing form:", err);
//         return null;
//       }
//     },
//     []
//   );

//   const submitResponse = useCallback(async (responseData: ResponseType) => {
//     try {
//       await axios.post(`${API_URL}submit-response`, responseData);
//     } catch (err) {
//       console.error("Error submitting response:", err);
//     }
//   }, []);

//   const fetchResponsesByFormId = useCallback(async (formId: string) => {
//     try {
//       const res = await axios.get(`${API_URL}responses/${formId}`);
//       setResponses(res.data);
//     } catch (err) {
//       console.error("Error fetching responses:", err);
//     }
//   }, []);

//   return (
//     <FormContext.Provider
//       value={{
//         forms,
//         selectedForm,
//         responses,
//         fetchUserForms,
//         fetchAllForms,
//         fetchFormById,
//         createForm,
//         deleteForm,
//         editForm,
//         submitResponse,
//         fetchResponsesByFormId,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = (): FormContextType => {
//   const context = useContext(FormContext);
//   if (!context)
//     throw new Error("useFormContext must be used within a FormProvider");
//   return context;
// };

// formContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/forms/";

export interface FormType {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  questions: any[];
  formType?: string;
  stared?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResponseItem {
  questionId: string;
  optionId?: string;
  answerText?: string;
}

export interface ResponseType {
  _id?: string;
  formId: string;
  userId: string;
  response: ResponseItem[];
  submittedAt?: string;
}

interface FormContextType {
  forms: FormType[];
  selectedForm: FormType | null;
  responses: ResponseType[];
  fetchUserForms: (userId: string) => Promise<void>;
  fetchAllForms: () => Promise<void>;
  // fetchFormById: (formId: string) => Promise<void>;
  fetchFormById: (formId: string) => Promise<FormType>;
  createForm: (formData: Partial<FormType>) => Promise<FormType | null>;
  deleteForm: (formId: string, userId: string) => Promise<void>;
  editForm: (
    formData: Partial<FormType> & { formId: string }
  ) => Promise<FormType | null>;
  submitResponse: (responseData: ResponseType) => Promise<void>;
  fetchResponsesByFormId: (formId: string) => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [forms, setForms] = useState<FormType[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
  const [responses, setResponses] = useState<ResponseType[]>([]);

  const fetchUserForms = useCallback(async (userId: string) => {
    try {
      const res = await axios.get(`${API_URL}user/${userId}`);
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching user forms:", err);
    }
  }, []);

  const fetchAllForms = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching all forms:", err);
    }
  }, []);

  // const fetchFormById = useCallback(async (formId: string) => {
  //   try {
  //     const res = await axios.get(`${API_URL}get/${formId}`);
  //     setSelectedForm(res.data);
  //     return res.data;
  //   } catch (err) {
  //     console.error("Error fetching form:", err);
  //   }
  // }, []);

  const fetchFormById = useCallback(
    async (formId: string): Promise<FormType> => {
      try {
        const res = await axios.get(`${API_URL}get/${formId}`);
        setSelectedForm(res.data);
        return res.data; // ✅ return the form data
      } catch (err) {
        console.error("Error fetching form:", err);
        throw err;
      }
    },
    []
  );

  const createForm = useCallback(async (formData: Partial<FormType>) => {
    try {
      // const res = await axios.post(`${API_URL}create`, formData);
      const res = await axios.post(
        `http://localhost:8000/api/forms/create`,
        formData
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("Error creating form:", err);
      return null;
    }
  }, []);

  const deleteForm = useCallback(async (formId: string, userId: string) => {
    try {
      await axios.delete(`${API_URL}delete/${formId}/${userId}`);
      setForms((prev) => prev.filter((f) => f._id !== formId));
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  }, []);

  const editForm = useCallback(
    async (formData: Partial<FormType> & { formId: string }) => {
      try {
        const res = await axios.put(`${API_URL}edit`, formData);
        const updatedForm = res.data;
        setForms((prev) =>
          prev.map((form) =>
            form._id === updatedForm._id ? updatedForm : form
          )
        );
        return updatedForm;
      } catch (err) {
        console.error("Error editing form:", err);
        return null;
      }
    },
    []
  );

  const submitResponse = useCallback(async (responseData: ResponseType) => {
    try {
      await axios.post(`${API_URL}submit`, responseData);
    } catch (err) {
      console.error("Error submitting response:", err);
    }
  }, []);

  const fetchResponsesByFormId = useCallback(async (formId: string) => {
    try {
      const res = await axios.get(`${API_URL}responses/${formId}`);
      setResponses(res.data);
    } catch (err) {
      console.error("Error fetching responses:", err);
    }
  }, []);

  return (
    <FormContext.Provider
      value={{
        forms,
        selectedForm,
        responses,
        fetchUserForms,
        fetchAllForms,
        fetchFormById,
        createForm,
        deleteForm,
        editForm,
        submitResponse,
        fetchResponsesByFormId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
