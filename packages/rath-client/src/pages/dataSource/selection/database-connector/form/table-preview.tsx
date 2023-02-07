import { FC, memo, CSSProperties, Fragment } from 'react';
import styled from 'styled-components';
import type { TableData } from '../index';


interface TablePreviewProps {
    data: TableData;
}

const styles: Record<string, CSSProperties> & Record<string, any> = {
    Int64: {
        color: 'rgb(38, 139, 210)',
    },
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(calc(var(--n-cols) + 1), max-content);
    grid-template-rows: repeat(calc(var(--n-rows) + 1), max-content);
    gap: 2px;
    padding: 0 4px 50%;
    position: relative;
    overflow: auto;
    > * {
        :not(:first-child):not(label) {
            background-color: #f8f8f8;
        }
        min-width: 2em;
        padding-inline: 0.8em;
    }
    > span:first-child, > label {
        position: sticky;
        top: 0;
        padding-top: 4px;
        font-weight: 600;
        background-color: #fff;
    }
`;

const TablePreview: FC<TablePreviewProps> = memo(function TablePreview ({ data }) {
    const columns = ((data.columns ?? []).length === 0) ? data.rows[0]?.map((_, i) => ({
        key: `col_${i + 1}`,
        colIndex: i,
        dataType: null,
    })) : data.columns;

    return (
        // @ts-expect-error css variable
        <Container style={{ '--n-cols': columns.length, '--n-rows': data.rows.length }}>
            {/* corner */}
            <span />
            {
                columns.map(col => (
                    <label key={col.colIndex}>
                        {col.key}
                    </label>
                ))
            }
            {
                data.rows.map((d, i) => (
                    <Fragment key={i}>
                        <span
                            style={{
                                color: 'rgb(108, 113, 196)',
                                letterSpacing: '0.5px',
                                backgroundColor: '#fff',
                            }}
                        >
                            {i + 1}
                        </span>
                        {
                            d.map((e, j) => (
                                <div
                                    key={j}
                                    style={{ ...styles[data.columns?.[j]?.dataType ?? ''] }}
                                >
                                    {e}
                                </div>
                            ))
                        }
                    </Fragment>
                ))
            }
            {
                data.rows.length === 0 && (
                    <span
                        style={{
                            color: 'rgb(133, 133, 133)',
                            fontStyle: 'italic',
                        }}
                    >
                        (empty)
                    </span>
                )
            }
        </Container>
    );
});


export default TablePreview;
