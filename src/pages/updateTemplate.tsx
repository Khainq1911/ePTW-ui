import { useParams } from 'react-router-dom';
import { getTemplateByIdService } from '../services/templates.service';
import { useEffect, useReducer } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { handleDragEnd } from '../utils/dragEnd';
import SidebarTemplate from '../components/ui/add-template-layout/sidebar';
import TemplateContent from '../components/ui/add-template-layout/content';
import { initialState, reducer } from '../reducer/templateReducer';

export default function UpdateTemplate() {
    const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const res = await getTemplateByIdService(Number(id));
                dispatch({ type: 'SET_INITAL_DATA', payload: res });
            } catch (error) {
                console.error('Error fetching template:', error);
            }
        };

        if (id) {
            fetchTemplate();
        }
    }, [id]);

    return (
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, dispatch, state)}>
            <div style={{ height: 'calc(100vh - 70px)' }}>
                <SidebarTemplate />
                <TemplateContent id={'1'} updateId={id} items={state.fields} dispatch={dispatch} state={state} />
            </div>
        </DragDropContext>
    );
}
