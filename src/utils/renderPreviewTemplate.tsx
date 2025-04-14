import MultipleInput from "../components/ui/templates/fieldPreview/inputMultiple";
import Title from "../components/ui/templates/fieldPreview/title";
import { TYPE } from "../constants/templateFieldType";
import ListOptions from "../components/ui/templates/fieldPreview/listOptions";
import Input from "../components/ui/templates/fieldPreview/input";
import DatePickerPreview from "../components/ui/templates/fieldPreview/datePicker";
import DateRangePreview from "../components/ui/templates/fieldPreview/dateRange";
import YesNoNaPreview from "../components/ui/templates/fieldPreview/yesNoNa";

export const renderPreviewTemplate = (item?: any, dispatch?: any) => {
  switch (item?.type) {
    case TYPE.HEADER:
      return <Title item={item} />;
    case TYPE.SINGLE_LINE:
      return <Input item={item} dispatch={dispatch} />;
    case TYPE.MULTIPLE_LINE:
      return <MultipleInput item={item} dispatch={dispatch} />;
    case TYPE.LIST:
      return <ListOptions item={item} dispatch={dispatch} />;
    case TYPE.YES_NO:
      return <YesNoNaPreview item={item} dispatch={dispatch} />;
    case TYPE.YES_NO_NA:
      return <YesNoNaPreview item={item} dispatch={dispatch} />;
    case TYPE.DATE_PICKER:
      return <DatePickerPreview item={item} dispatch={dispatch} />;
    case TYPE.DATE_RANGE:
      return <DateRangePreview item={item} dispatch={dispatch} />;
    default:
      return <div>Unsupported field type: {item?.type}</div>;
  }
};
