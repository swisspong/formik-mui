import ImageWrapper from "./ImageWrapper";
import ImageWrapperStateFormik from "./ImageWrapperStateFormik";
import MultipleSelectChip from "./MultipleSelectChip";
import SelectWrapper from "./SelectWrapper";
import SwitchWrapper from "./SwitchWrapper";
import TagsInput from "./TagsInput";
import TextFieldWrapper from "./TextFieldWrapper";

const FormikControl = ({ control, ...otherProps }) => {
  switch (control) {
    case "input":
      return <TextFieldWrapper {...otherProps} />;
    case "tagsInput":
      return <TagsInput {...otherProps} />;
    case "select":
      return <SelectWrapper {...otherProps} />;
    case "multipleSelect":
      return <MultipleSelectChip {...otherProps} />;
    case "switch":
      return <SwitchWrapper {...otherProps} />;
    case "image":
      return <ImageWrapper {...otherProps} />;
    case "imageFormikState":
      return <ImageWrapperStateFormik {...otherProps} />;
    default:
      return null;
  }
};

export default FormikControl;
