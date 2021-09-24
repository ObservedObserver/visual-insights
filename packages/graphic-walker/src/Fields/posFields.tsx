import React from 'react';
import { FieldListContainer, FieldsContainer, Pill } from "./components";
import { observer } from 'mobx-react-lite';
import {
    Droppable,
    Draggable
  } from "react-beautiful-dnd";

import { AGGREGATOR_LIST, DRAGGABLE_STATE_KEYS } from './fieldsContext';
import { useGlobalStore } from '../store';

const rowsAndCols = DRAGGABLE_STATE_KEYS.filter(f => f.id === 'columns' || f.id === 'rows');
const PosFields: React.FC = props => {
    const { vizStore } = useGlobalStore();
    const { draggableFieldState } = vizStore;

    return <div>
        {
            rowsAndCols.map(dkey => <FieldListContainer name={dkey.name} key={dkey.id}>
                <Droppable droppableId={dkey.id} direction="horizontal">
                    {(provided, snapshot) => (
                        <FieldsContainer
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {draggableFieldState[dkey.id].map((f, index) => (
                                <Draggable key={f.id} draggableId={f.id} index={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Pill
                                                ref={provided.innerRef}
                                                // type={f.type}
                                                colType={f.type === 'D' ? 'discrete' : 'continuous'}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {f.name}&nbsp;
                                                {f.type === 'M' && (
                                                    <select
                                                        className="bg-transparent text-gray-700 float-right focus:outline-none focus:border-gray-500"
                                                        value={f.aggName || ''}
                                                        onChange={(e) => { vizStore.setFieldAggregator(dkey.id, index, e.target.value) }}
                                                    >
                                                        {
                                                            AGGREGATOR_LIST.map(op => <option value={op.value} key={op.value}>{op.label}</option>)
                                                        }
                                                    </select>
                                                )}
                                            </Pill>
                                        );
                                    }}
                                </Draggable>
                            ))}
                        </FieldsContainer>
                    )}
                </Droppable>
            </FieldListContainer>)
        }
    </div>
}

export default observer(PosFields);