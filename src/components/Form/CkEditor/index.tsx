import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FC, useEffect, useRef, useState } from "react";

import "ckeditor5/ckeditor5.css";
import "./style.css";

import { Box } from "@chakra-ui/react";
import { Field, FieldProps } from "@realState/components/ui/field";
import { ClassicEditor } from "ckeditor5";
import { Controller } from "react-hook-form";
import { editorConfig } from "./editorConfig";

interface CkEditorProps {
  name: string;
  control: any;
  backendError?: string[];
}

const CkEditor: FC<CkEditorProps & FieldProps> = ({
  name,
  control,
  backendError,
  ...rest
}) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Field
          invalid={!!error || !!backendError}
          errorText={backendError?.[0] ?? error?.message}
          w={'full'}
          {...rest}
          className="main-container"
        >
          <Box
           minH={'200px'}
            className="editor-container editor-container_classic-editor"
            ref={editorContainerRef}
          >
            <Box
            className="editor-container__editor">
              <Box
              ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={value}
                    disabled={rest.readOnly}
                    onChange={(_event, editor) => {
                      const data = editor.getData();
                      onChange(data);
                      backendError = undefined;
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Field>
      )}
    />
  );
};

export default CkEditor;
