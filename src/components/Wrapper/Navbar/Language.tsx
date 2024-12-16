import { Icon } from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import { Button } from "@realState/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@realState/components/ui/menu";

const Language = () => {
  const changeLanguageHandler = (lang: string) => {
    localStorage.setItem("language", lang);
    // i18next.changeLanguage(lang);
    window.location.reload();
  };

  const currentLang = localStorage.getItem("language") === "np" ? "en" : "np";
  return (
    <MenuRoot
      positioning={{
        placement: "bottom-end",
        sameWidth: true,
        strategy: "absolute",
      }}
      lazyMount
    >
      <MenuTrigger outline={"none"} asChild>
        <Button
          alignItems={"center"}
          display={"flex"}
          variant={"outline"}
          gap={4}
        >
          {currentLang === "np" ? "English" : "नेपाली"}
          <Icon asChild boxSize={4}>
            <CaretDown />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent zIndex={9999}>
        <MenuItem onClick={() => changeLanguageHandler("np")} value="np">
          नेपाली
        </MenuItem>
        <MenuItem onClick={() => changeLanguageHandler("en")} value="en">
          English
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default Language;
