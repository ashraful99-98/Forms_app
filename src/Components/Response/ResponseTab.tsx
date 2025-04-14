// ResponseTab.tsx
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormType, useFormContext } from "../../context/FormContext";
import { makeStyles } from "@mui/material";

// Option and Question type definitions for responses display.
interface OptionType {
  _id?: string;
  optionText: string;
  optionImage?: string;
}

export interface QuestionType {
  _id: string;
  questionText: string;
  questionImage?: string;
  options: OptionType[];
}

// If the structure from your API is different, adjust these interfaces as necessary.
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

// Props expected by ResponseTab. The formData prop carries question info,
// and formId identifies the form for which responses should be loaded.
interface ResponseTabProps {
  formData?: FormType;
  formId?: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ResponseTab: React.FC<ResponseTabProps> = (props) => {
  //   const classes = useStyles();
  const [formData, setFormData] = useState<FormType | {}>({});
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  // Get responses and the method to fetch them from FormContext.
  const { responses, fetchResponsesByFormId } = useFormContext();

  useEffect(() => {
    // If formData is provided via props, extract its questions.
    if (props.formData) {
      // Cast questions as QuestionType[]
      setQuestions(props.formData.questions as QuestionType[]);
      setFormData(props.formData);
    }
    // If a valid formId is provided, fetch responses.
    const formId = props.formId;
    if (formId && formId !== "") {
      fetchResponsesByFormId(formId);
    }
  }, [props.formData, props.formId, fetchResponsesByFormId]);

  // Helper: For a given question ID, index of question (i) and response (j),
  // determine the selected option’s text.
  const getSelectedOption = (qId: string, i: number, j: number): string => {
    const oneResData = responses[j];
    if (!oneResData) return "not attempted";
    // Filter the response items for this question.
    const selectedOp = oneResData.response.filter(
      (qss) => qss.questionId === qId
    );
    if (selectedOp.length > 0) {
      const finalOption = questions[i].options.find(
        (oo) => oo._id === selectedOp[0].optionId
      );
      return finalOption ? finalOption.optionText : "not attempted";
    } else {
      return "not attempted";
    }
  };

  return (
    <div>
      <p>Responses</p>
      <TableContainer component={Paper}>
        <Table
          // className={classes.table}
          aria-label="responses table"
        >
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              {questions.map((ques, i) => (
                <TableCell key={i} align="right">
                  {ques.questionText}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((rs, j) => (
              <TableRow key={j}>
                <TableCell component="th" scope="row">
                  {rs.userId}
                </TableCell>
                {questions.map((ques, i) => (
                  <TableCell key={i} align="right">
                    {getSelectedOption(ques._id, i, j)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResponseTab;
