import PermitDatePicker from '../components/ui/permit/permitItem/date';
import PermitDateRange from '../components/ui/permit/permitItem/dateRange';
import PermitList from '../components/ui/permit/permitItem/list';
import PermitText from '../components/ui/permit/permitItem/text';
import PermitYesNo from '../components/ui/permit/permitItem/yesNo';
import Title from '../components/ui/templates/preview/fieldPreview/title';
import { TYPE } from '../constants/templateFieldType';
import { PermitStatus } from '../types/enum';

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

export const handleRenderStatus = (status: string) => {
    const baseStyle = 'px-3 py-1 rounded-full text-white text-sm font-medium';

    switch (status) {
        case PermitStatus.ACCEPT:
            return <span className={`${baseStyle} bg-green-500`}>Accepted</span>;
        case PermitStatus.SUSPEND:
            return <span className={`${baseStyle} bg-yellow-500`}>Suspended</span>;
        case PermitStatus.REVISE:
            return <span className={`${baseStyle} bg-blue-500`}>Needs Revision</span>;
        case PermitStatus.CLOSE:
            return <span className={`${baseStyle} bg-gray-500`}>Closed</span>;
        default:
            return <span className={`${baseStyle} bg-red-500`}>Pending</span>;
    }
};
