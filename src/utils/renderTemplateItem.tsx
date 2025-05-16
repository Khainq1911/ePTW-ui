import Date from '../components/ui/drop-drag-fields/date';
import DateRange from '../components/ui/drop-drag-fields/dateRange';
import ListItem from '../components/ui/drop-drag-fields/listItem';
import HeaderLine from '../components/ui/drop-drag-fields/headerLine';
import MultipleLineInput from '../components/ui/drop-drag-fields/multipleLineInput';
import SingleLineInput from '../components/ui/drop-drag-fields/singleLineInput';
import YesNo from '../components/ui/drop-drag-fields/yesNo';
import { TYPE } from '../constants/templateFieldType';

export const renderItem = (type: string, value: string, id: string, options: any, dispatch: any) => {
    switch (type) {
        case TYPE.SINGLE_LINE:
            return <SingleLineInput dispatch={dispatch} value={value} id={id} />;
        case TYPE.MULTIPLE_LINE:
            return <MultipleLineInput dispatch={dispatch} value={value} id={id} />;
        case TYPE.HEADER:
            return <HeaderLine dispatch={dispatch} value={value} id={id} />;
        case TYPE.DATE_PICKER:
            return <Date dispatch={dispatch} value={value} id={id} />;
        case TYPE.DATE_RANGE:
            return <DateRange dispatch={dispatch} value={value} id={id} />;
        case TYPE.YES_NO:
            return <YesNo dispatch={dispatch} value={value} id={id} />;
        case TYPE.YES_NO_NA:
            return <YesNo dispatch={dispatch} value={value} id={id} type={type} />;
        case TYPE.LIST:
            return <ListItem dispatch={dispatch} value={value} id={id} options={options} />;
    }
};
