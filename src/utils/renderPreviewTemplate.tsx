import DatePickerPreview from "../components/ui/templates/preview/fieldPreview/datePicker";
import DateRangePreview from "../components/ui/templates/preview/fieldPreview/dateRange";
import Input from "../components/ui/templates/preview/fieldPreview/input";
import MultipleInput from "../components/ui/templates/preview/fieldPreview/inputMultiple";
import ListOptions from "../components/ui/templates/preview/fieldPreview/listOptions";
import Title from "../components/ui/templates/preview/fieldPreview/title";
import YesNoNaPreview from "../components/ui/templates/preview/fieldPreview/yesNoNa";
import { TYPE } from "../constants/templateFieldType";


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
