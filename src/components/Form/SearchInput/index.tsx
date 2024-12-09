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
import React, { useCallback, useMemo, useState } from "react";

interface ISearchInputProps {
  value?: string;
  name?: string;
  label?: string;
  setValue?: (value: string) => void;
  onSearch: (value: string) => void;
  width?: ConditionalValue<number | string>;
  helperText?: string;
}

const SearchInput: React.FC<ISearchInputProps & InputProps> = ({
  value,
  onSearch = () => {},
  name,
  label,
  width,
  helperText,
  my,
  ...rest
}) => {
  const [searchString, setSearchString] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

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
      width={width}
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
      >
        <Input
          size={"lg"}
          colorPalette={"primary"}
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
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
