import { useReducer } from 'react';
import TemplateContent from '../components/ui/add-template-layout/content';
import SidebarTemplate from '../components/ui/add-template-layout/sidebar';
import { DragDropContext } from '@hello-pangea/dnd';
import { initialState, reducer } from '../reducer/templateReducer';
import { handleDragEnd } from '../utils/dragEnd';
export default function CreateTemplateV2() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, dispatch, state)}>
            <div style={{ height: 'calc(100vh - 70px)' }}>
                <SidebarTemplate />
                <TemplateContent id={'1'} items={state.fields} dispatch={dispatch} state={state} />
            </div>
        </DragDropContext>
    );
}
