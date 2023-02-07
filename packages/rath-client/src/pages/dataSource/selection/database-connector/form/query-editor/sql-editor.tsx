import { FC, useCallback, useState } from 'react';
import { PrimaryButton, Stack } from '@fluentui/react';
import styled from 'styled-components';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';
import intl from 'react-intl-universal';
import TablePreview from '../table-preview';
import type { TableData } from '../..';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    > * {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        overflow: auto;
    }
`;

const Editor = styled.div`
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    > *:last-child {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        overflow: auto;
    }
`;

export interface SQLEditorProps {
    setQuery: (q: string) => void;
    preview: TableData | null;
    doPreview: (q: string) => void;
}

const SQLEditor: FC<SQLEditorProps> = ({ setQuery, preview, doPreview }) => {
    const [code, setCode] = useState<string>('');

    const updateCode = useCallback<ChangeHandler>((newValue, e) => {
        setCode(newValue);
    }, []);

    return (
        <Container>
            <div>
                <TablePreview data={preview ?? { columns: [], rows: [] }} />
            </div>
            <Editor>
                <Stack horizontal style={{ marginBlock: '0.5em', paddingInline: '1em' }} horizontalAlign="end">
                    <PrimaryButton
                        onClick={() => {
                            setQuery(code);
                            doPreview(code);
                        }}
                        iconProps={{ iconName: "Play" }}
                        text={intl.get('common.preview')}
                    />
                </Stack>
                <MonacoEditor language="sql" theme="vs" value={code} onChange={updateCode} />
            </Editor>
        </Container>
    );
};

export default SQLEditor;
