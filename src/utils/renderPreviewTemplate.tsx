import MultipleInput from "../components/ui/templates/fieldPreview/inputMultiple";
import Title from "../components/ui/templates/fieldPreview/title";
import { TYPE } from "../constants/templateFieldType";
import ListOptions from "../components/ui/templates/fieldPreview/listOptions";
import Input from "../components/ui/templates/fieldPreview/input";
import YesNoNAPreview from "../components/ui/templates/fieldPreview/yesNoNa";
import DatePickerPreview from "../components/ui/templates/fieldPreview/datePicker";
import DateRangePreview from "../components/ui/templates/fieldPreview/dateRange";

export const renderPreviewTemplate = (type: string, item: any) => {
  switch (type) {
    case TYPE.HEADER:
      return <Title item={item} />;
    case TYPE.SINGLE_LINE:
      return <Input item={item} />;
    case TYPE.MULTIPLE_LINE:
      return <MultipleInput item={item} />;
    case TYPE.LIST:
      return <ListOptions item={item} />;
    case TYPE.YES_NO_NA:
      return <YesNoNAPreview item={item} />;
    case TYPE.YES_NO:
      return <YesNoNAPreview item={item} />;
    case TYPE.DATE_PICKER:
      return <DatePickerPreview item={item} />;
    case TYPE.DATE_RANGE:
      return <DateRangePreview item={item} />;
    default:
      return;
  }
};
