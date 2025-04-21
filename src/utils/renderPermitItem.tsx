import PermitDatePicker from "../components/ui/permit/permitItem/date";
import PermitDateRange from "../components/ui/permit/permitItem/dateRange";
import PermitList from "../components/ui/permit/permitItem/list";
import PermitText from "../components/ui/permit/permitItem/text";
import PermitYesNo from "../components/ui/permit/permitItem/yesNo";
import Title from "../components/ui/templates/preview/fieldPreview/title";
import { TYPE } from "../constants/templateFieldType";

export const renderPermitItem = (item?: any) => {
  switch (item?.type) {
    case TYPE.HEADER:
      return <Title item={item} />;
    case TYPE.SINGLE_LINE:
      return <PermitText item={item} />;
    case TYPE.MULTIPLE_LINE:
      return <PermitText item={item} />;
    case TYPE.LIST:
      return <PermitList item={item} />;
    case TYPE.YES_NO:
      return <PermitYesNo item={item} />;
    case TYPE.YES_NO_NA:
      return <PermitYesNo item={item} />;
    case TYPE.DATE_PICKER:
      return <PermitDatePicker item={item} />;
    case TYPE.DATE_RANGE:
      return <PermitDateRange item={item} />;
    default:
      return <div>Unsupported field type: {item?.type}</div>;
  }
};
