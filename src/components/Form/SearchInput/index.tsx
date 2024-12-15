import {
  ConditionalValue,
  Icon,
  Input,
  InputProps,
  Spinner,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Field } from "@realState/components/ui/field";
import { InputGroup } from "@realState/components/ui/input-group";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface ISearchInputProps {
  name?: string;
  label?: string;
  onSearch: (value: string) => void;
  width?: ConditionalValue<number | string>;
  helperText?: string;
}

const SearchInput: React.FC<ISearchInputProps & InputProps> = ({
  onSearch = () => {},
  name,
  label,
  width,
  helperText,
  my,
  ...rest
}) => {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const queryFromUrl = urlParams.get("q") || "";

  const [searchString, setSearchString] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  const debouncedSearchFunction = useCallback(
    (value: string) => {
      onSearch(value);
      setIsDebouncing(false);
    },
    [onSearch]
  );

  const debouncedOnSearch = useMemo(() => {
    return debounce(debouncedSearchFunction, 500);
  }, [debouncedSearchFunction]);

  const handleSearch = (value: string) => {
    setIsDebouncing(true);
    setSearchString(value);
    debouncedOnSearch(value);
  };

  return (
    <Field
      label={label}
      required={rest.required}
      disabled={rest.disabled}
      readOnly={rest.readOnly}
      width={rest}
      helperText={helperText}
    >
      <InputGroup
        startElement={
          isDebouncing ? (
            <Spinner boxSize={5} color="gray.500" mt={1} />
          ) : (
            <Icon boxSize={6} color="gray.500" asChild>
              <MagnifyingGlass />
            </Icon>
          )
        }
        {...rest}
      >
        <Input
          size={"lg"}
          colorPalette={"primary"}
          onChange={(e) => {
            setValue(e.target.value);
            handleSearch(e.target.value);
          }}
          borderColor={"gray.300"}
          value={value}
          focusRing={"inside"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchString);
            }
          }}
          {...rest}
        />
      </InputGroup>
    </Field>
  );
};

export default SearchInput;
