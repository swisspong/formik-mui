import ImageWrapper from "./ImageWrapper";
import SelectWrapper from "./SelectWrapper";
import SwitchWrapper from "./SwitchWrapper";
import TextFieldWrapper from "./TextFieldWrapper";

const FormikControl = ({ control, ...otherProps }) => {
  switch (control) {
    case "input":
      return <TextFieldWrapper {...otherProps} />;
    case "select":
      return <SelectWrapper {...otherProps} />;
    case "switch":
      return <SwitchWrapper {...otherProps} />;
    case "image":
      return <ImageWrapper {...otherProps} />;
    default:
      return null;
  }
};

export default FormikControl;
